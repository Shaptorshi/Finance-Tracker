import dns from 'node:dns/promises'
dns.setServers(['8.8.8.8','1.1.1.1'])

import mongoose from 'mongoose'

export const dbConnect = async():Promise<void>=>{
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log(`Connected Successfully`)
    } catch (error) {
        console.log(`Error occurred: ${error}`)
    }
}