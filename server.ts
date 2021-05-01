import express from 'express';
import dotenv from 'dotenv';

import { UserCtrl } from './controllers';
import { registerValidators } from './validations';


dotenv.config();

const app = express();

app.use(express.json());

app.get('/users', UserCtrl.index);
app.post('/users', registerValidators, UserCtrl.create);
// app.patch('/users', UserCtrl.index);
// app.delete('/users', UserCtrl.index);

app.listen(8888, (): void => {
  console.log('SERVER RUNNING!');
});