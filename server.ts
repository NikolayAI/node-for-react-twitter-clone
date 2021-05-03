import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import './core/db';
import { UserCtrl } from './controllers';
import { registerValidators } from './validations';


const app = express();

app.use(express.json());

app.get('/users', UserCtrl.index);
app.post('/users', registerValidators, UserCtrl.create);
app.get('/users/:id', registerValidators, UserCtrl.show);
app.get('/users/verify', registerValidators, UserCtrl.verify);
// app.patch('/users', UserCtrl.index);
// app.delete('/users', UserCtrl.index);

app.listen(process.env.PORT, (): void => {
  console.log(`SERVER RUNNING! PORT: ${process.env.PORT}`);
});