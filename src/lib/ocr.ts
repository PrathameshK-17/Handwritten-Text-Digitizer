import { GoogleGenerativeAI } from '@google/generative-ai';

export async function extractTextFromBuffer(imageBuffer: Buffer): Promise<string> {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
        throw new Error('Gemini API Key is missing');
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    try {
        // Use Gemini 2.5 Flash model with vision capability (supports multimodal)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Convert buffer to base64
        const base64Image = imageBuffer.toString('base64');

        // Detect MIME type based on buffer signature
        let mimeType = 'image/png';
        if (imageBuffer[0] === 0xFF && imageBuffer[1] === 0xD8) {
            mimeType = 'image/jpeg';
        } else if (imageBuffer[0] === 0x47 && imageBuffer[1] === 0x49) {
            mimeType = 'image/gif';
        } else if (imageBuffer[0] === 0x52 && imageBuffer[1] === 0x49) {
            mimeType = 'image/webp';
        }

        const prompt = `Extract all text from this image. 
Return ONLY the raw text exactly as it appears in the image, preserving line breaks and formatting.
Do not add any commentary, explanations, or corrections - just extract the text verbatim.
If no text is found, return "NO_TEXT_FOUND".`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Image
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        if (text.trim() === 'NO_TEXT_FOUND' || text.trim().length === 0) {
            throw new Error('No text found in image');
        }

        return text.trim();
    } catch (error: any) {
        console.error('Gemini OCR Error:', error);
        throw new Error(error.message || 'Failed to extract text from image');
    }
}
