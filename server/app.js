import express, { json, urlencoded } from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import morgan from 'morgan';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1', routes);

export default app;
