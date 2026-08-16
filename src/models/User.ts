import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
    _id: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    isBlocked: boolean;
    lastActive: Date;
    totalTimeSpent: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            select: false, // Do not select password by default
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        lastActive: {
            type: Date,
            default: Date.now,
        },
        // We'll track total time in seconds (approximate)
        totalTimeSpent: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent OverwriteModelError
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
