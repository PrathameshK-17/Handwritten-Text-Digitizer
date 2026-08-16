import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import DocumentModel from '@/models/Document';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-edge';

export async function GET() {
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

        await connectToDatabase();

        const users = await User.find().sort({ createdAt: -1 }).lean();

        // Enhance with document count (activity)
        const usersWithStats = await Promise.all(users.map(async (user) => {
            const docCount = await DocumentModel.countDocuments({ userId: user._id });
            // Calculate time spent roughly (e.g. from lastActive vs createdAt or stored totalTimeSpent)
            // For now, we use the stored totalTimeSpent
            return {
                ...user,
                documentCount: docCount,
            };
        }));

        return NextResponse.json({ users: usersWithStats }, { status: 200 });
    } catch (error) {
        console.error('Admin users fetch error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
