import express from 'express';
import dotenv from 'dotenv';
import { DB } from './config/db.js';
import router from './routes/route.js';
import cors from 'cors';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(notFound);

// app.use((req, res, next) => {
//     const err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// })

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    DB();
})