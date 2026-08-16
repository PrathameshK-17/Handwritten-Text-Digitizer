'use server';

import { extractTextFromBuffer } from '@/lib/ocr';
import { completeTextWithGemini } from '@/lib/gemini';
import connectToDatabase from '@/lib/db';
import Document from '@/models/Document';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-edge';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function processDocument(formData: FormData) {
    try {
        const images = formData.getAll('images') as File[];
        if (!images || images.length === 0) {
            // Fallback for old single image upload if needed
            const singleImage = formData.get('image') as File;
            if (singleImage) {
                images.push(singleImage);
            } else {
                return { success: false, error: 'No images provided' };
            }
        }

        // Verify user
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (!token) {
            return { success: false, error: 'Unauthorized' };
        }

        const user = await verifyToken(token);
        if (!user || !user.userId) {
            return { success: false, error: 'Invalid token' };
        }

        const imageUrls: string[] = [];
        const imageHashes: string[] = [];
        let combinedOriginalText = '';

        await connectToDatabase();

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const buffer = Buffer.from(await image.arrayBuffer());

            // Calculate Image Hash
            const hashSum = crypto.createHash('sha256');
            hashSum.update(buffer);
            const imageHash = hashSum.digest('hex');
            imageHashes.push(imageHash);

            // Save image locally
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const fileExtension = path.extname(image.name) || '.jpg';
            const fileName = `${imageHash}${fileExtension}`;
            const filePath = path.join(uploadsDir, fileName);
            const publicUrl = `/uploads/${fileName}`;
            imageUrls.push(publicUrl);

            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, buffer);
            }

            const extractedText = await extractTextFromBuffer(buffer);

            // Append with page marker if multiple images
            if (images.length > 1) {
                combinedOriginalText += `--- Page ${i + 1} ---\n${extractedText}\n\n`;
            } else {
                combinedOriginalText = extractedText;
            }
        }

        // 2. Complete/Correct the entire Combined Text
        const completedText = await completeTextWithGemini(combinedOriginalText);

        // 3. Save to DB
        const doc = await Document.create({
            userId: user.userId,
            originalText: combinedOriginalText,
            completedText,
            imageUrls: imageUrls,
            imageHashes: imageHashes,
        });

        return {
            success: true,
            data: {
                originalText: combinedOriginalText,
                completedText,
                documentId: doc._id.toString()
            }
        };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
