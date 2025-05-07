import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connection from './database/db.js';
import router from './routes/route.js';

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/Uploads', express.static('Uploads'));

app.use('/', router);

const PORT = process.env.PORT || 8000;

connection();

app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});