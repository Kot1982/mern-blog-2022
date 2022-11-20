import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);

// async function start() {
//   try {
//     await mongoose.connect(DB_HOST, () => console.log('DB is connect'));
//     app.listen(PORT, () => console.log('Server is running'));
//   } catch (error) {
//     console.log(error);
//   }
// }

// start();
mongoose.connect(DB_HOST, () => console.log('DB is connect'));

app.listen(PORT, () => console.log('Server is running'));
