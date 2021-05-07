import { body } from 'express-validator';


export const createTweetValidators = [
  body('text', 'Введите текст твита')
    .isString()
    .isLength({ max: 280 })
    .withMessage('Максимальная длина твита 280 символов'),
];