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

const PORT =  8000;
const username =process.env.DB_USERNAME;
const password =process.env.DB_PASSWOARD;

connection(username,password);

app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});