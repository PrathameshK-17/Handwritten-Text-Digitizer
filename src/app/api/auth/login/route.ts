import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verifyPassword } from '@/lib/auth';
import { generateToken } from '@/lib/auth-edge';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        if (
            process.env.ADMIN_EMAIL &&
            process.env.ADMIN_PASSWORD &&
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = await generateToken({ userId: 'admin', email, role: 'admin' });
            const response = NextResponse.json(
                { message: 'Admin login successful', user: { email, role: 'admin' } },
                { status: 200 }
            );
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400,
                path: '/',
            });
            return response;
        }

        // Select password because it's excluded by default in schema
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isValid = await verifyPassword(password, user.password!);
        if (!isValid) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        if (user.isBlocked) {
            return NextResponse.json(
                { message: 'Your account has been blocked by the administrator.' },
                { status: 403 }
            );
        }

        // Update lastActive
        user.lastActive = new Date();
        await user.save();

        const token = await generateToken({ userId: user._id.toString(), email: user.email, role: user.role || 'user' });

        const response = NextResponse.json(
            { message: 'Login successful', user: { email: user.email, role: user.role || 'user' } },
            { status: 200 }
        );

        // Set cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
