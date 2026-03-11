import mongoose, { ObjectId, Schema } from 'mongoose'

interface budgetType {
    userId:string
    name: string,
    balance: number,
    interestRate: number,
    minimumPayment: number,
    createdAt: Date
}

const budgetSchema = new Schema<budgetType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    minimumPayment: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() }
}, { timestamps: true })

export const debt = mongoose.model('budgets', budgetSchema)