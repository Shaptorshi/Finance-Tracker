import mongoose,{ ObjectId,Schema } from 'mongoose'

interface categoryType{
    _id:ObjectId,
    userId:ObjectId,
    name:string,
    icon:string,
    type:"income"|"expense"
}

const categorySchema = new Schema<categoryType>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String,
    },
    type:{
        type:String,
        enum:['income','expense']
    }
})

export const category = mongoose.model('categories',categorySchema)