import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Document from '@/models/Document';
import { verifyToken } from '@/lib/auth-edge';
import { cookies } from 'next/headers';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> } // params is a Promise in newer Next.js versions
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const { userId } = await params;

        await connectToDatabase();

        const documents = await Document.find({ userId }).sort({ createdAt: -1 });

        return NextResponse.json({ documents });
    } catch (error) {
        console.error('Error fetching user documents:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
