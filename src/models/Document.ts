import mongoose, { Schema, Model } from 'mongoose';

export interface IDocument {
    _id: string;
    userId: mongoose.Types.ObjectId;
    imageUrls?: string[];
    originalText: string;
    completedText?: string;
    imageHashes: string[];
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrls: {
            type: [String],
            required: false,
        },
        originalText: {
            type: String,
            required: true,
        },
        completedText: {
            type: String,
            required: false,
        },
        imageHashes: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent OverwriteModelError
// In development, we need to delete the model to ensure schema changes are applied
if (process.env.NODE_ENV === 'development' && mongoose.models.Document) {
    delete mongoose.models.Document;
}

const DocumentModel: Model<IDocument> = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);

export default DocumentModel;
