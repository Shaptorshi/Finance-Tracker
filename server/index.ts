import express, { Application } from 'express'
import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config();

import { dbConnect } from './config/db';
import cors from 'cors';
import userRoutes from './routes/user.route'

const port = process.env.PORT || 3000
const app: Application = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true
}))
app.use(express.json());
app.use('/api',userRoutes);
// app.use(session({
//     name:`sid`,
//     secret:process.env.SESSION_SECRET as string,
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         httpOnly:true,
//         maxAge:1000 * 60 * 60 * 24
//     }
// }))

const startServer = async() => {
    await dbConnect();
    app.listen(port, () => { console.log(`Server listening on PORT ${port}`) })
}

startServer();