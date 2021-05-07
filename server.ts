import dotenv from 'dotenv';


dotenv.config();
import express from 'express';

import './core/db';
import { TweetCtrl, UserCtrl } from './controllers';
import { createTweetValidators, registerValidators } from './validations';
import { passport } from './core/passport';


const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);

app.get('/tweets', TweetCtrl.index);
app.get('/tweets/:id', TweetCtrl.show);
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetCtrl.delete);
app.post('/tweets', passport.authenticate('jwt'), createTweetValidators, TweetCtrl.create);

app.get('/auth/verify', registerValidators, UserCtrl.verify);
app.post('/auth/register', registerValidators, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.listen(process.env.PORT, (): void => {
  console.log(`SERVER RUNNING! PORT: ${process.env.PORT}`);
});