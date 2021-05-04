import dotenv from 'dotenv';


dotenv.config();
import express from 'express';

import './core/db';
import { UserCtrl } from './controllers';
import { registerValidators } from './validations';
import { passport } from './core/passport';


const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get('/users', UserCtrl.index);
app.get('/users/:id', registerValidators, UserCtrl.show);
app.get('/auth/verify', registerValidators, UserCtrl.verify);
app.post('/auth/register', registerValidators, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});
// app.patch('/users', UserCtrl.index);
// app.delete('/users', UserCtrl.index);

app.listen(process.env.PORT, (): void => {
  console.log(`SERVER RUNNING! PORT: ${process.env.PORT}`);
});