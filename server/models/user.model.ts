import mongoose, { Schema, Document, ObjectId } from 'mongoose'

export interface userType extends Document {
    // userId: ObjectId,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<userType>({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:`user`,
    //     // required:true
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
)

export const USER = mongoose.model<userType>('financeTracker', userSchema)