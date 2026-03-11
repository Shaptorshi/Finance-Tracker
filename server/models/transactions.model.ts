import mongoose, { ObjectId, Schema } from 'mongoose'

interface transactionsType {
    _id: ObjectId,
    userId: ObjectId,
    amount: number,
    type: "income" | "expense",
    categoryId: ObjectId,
    note: string,
    date: Date,
    createdAt: Date
}

const transactionSchema = new Schema<transactionsType>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    note: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export const transactions =  mongoose.model('transactions',transactionSchema)