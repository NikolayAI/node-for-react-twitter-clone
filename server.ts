import dotenv from 'dotenv';

dotenv.config();
import express from 'express';

import './core/db';
import { TweetCtrl, UserCtrl } from './controllers';
import { createTweetValidators, registerValidators } from './validations';
import { passport } from './core/passport';
import multer from 'multer';
import { UploadFileCtrl } from './controllers/UploadFileController';

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());
app.use(passport.initialize());

app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);

app.get('/tweets', TweetCtrl.index);
app.get('/tweets/:id', TweetCtrl.show);
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetCtrl.delete);
app.patch('/tweets/:id', passport.authenticate('jwt'), createTweetValidators, TweetCtrl.update);
app.post('/tweets', passport.authenticate('jwt'), createTweetValidators, TweetCtrl.create);

app.get('/auth/verify', registerValidators, UserCtrl.verify);
app.post('/auth/register', registerValidators, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.post('/upload', upload.single('avatar'), UploadFileCtrl.upload);

app.listen(process.env.PORT, (): void => {
  console.log(`SERVER RUNNING! PORT: ${process.env.PORT}`);
});