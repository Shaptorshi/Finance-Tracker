import express, { Application } from 'express'
import dotenv from 'dotenv'

dotenv.config();

import { dbConnect } from './config/db';
import cors from 'cors';
import userRoutes from './routes/user.route'

const port = process.env.PORT || 3000
const app: Application = express();

app.use(cors({
    origin: `https://finsense-lyart.vercel.app`,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))
app.use(express.json());
app.use('/api', userRoutes);

const startServer = async () => {
    await dbConnect();
    app.listen(port, () => { console.log(`Server listening on PORT ${port}`) })
}

startServer();