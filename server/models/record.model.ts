import mongoose, { Schema, ObjectId } from 'mongoose'

interface recordType {
    userId: string
    type: "income" | "expense",
    category: ObjectId,
    amount: number,
    date: Date,
    createdAt: Date
    updatedAt: Date
}

const recordSchema = new Schema<recordType>({
    userId: { type: String, required: true },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
})

export const userRecords = mongoose.model<recordType>('records', recordSchema)