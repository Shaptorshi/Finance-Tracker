import mongoose, { Schema, ObjectId } from 'mongoose'

interface recordType {
    _id: ObjectId,
    type: "income" | "expense",
    category: string,
    amount: number,
    date: Date,
    userId: string
    createdAt: Date
    updatedAt:Date
}

const recordSchema = new Schema<recordType>({
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: String,
    }
}, {
    timestamps: true
})

export const userRecords = mongoose.model<recordType>('records', recordSchema)