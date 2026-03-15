import mongoose, { ObjectId, Schema } from 'mongoose'

interface debtType {
    userId: string,
    name: string,
    balance: number,
    interestRate: number,
    minimumPayment: number,
    createdAt: Date
}

const debtSchema = new Schema<debtType>({
    // userId: { type: String, required: true },
    userId: String,
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    minimumPayment: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() }
}, { timestamps: true })

export const debt = mongoose.model<debtType>('budgets', debtSchema)