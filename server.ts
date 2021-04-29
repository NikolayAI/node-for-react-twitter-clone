import express from 'express';


export const app = express();

app.get('/users');

app.listen(8888, (): void => {
  console.log('SERVER RUNNING!');
});