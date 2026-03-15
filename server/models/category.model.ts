import mongoose, { ObjectId, Schema } from 'mongoose'

interface categoryType {
    userId: string,
    name: string,
    type: "income" | "expense"
    createdAt: Date
}

const categorySchema = new Schema<categoryType>({
    userId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense']
    }
},
    {
        timestamps: true
    })

export const category = mongoose.model<categoryType>('categories', categorySchema)