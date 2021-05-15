import { body } from 'express-validator';


export const registerValidators = [
  body('email', 'Введите E-Mail')
    .isEmail()
    .withMessage('Неверный E-Mail')
    .isLength({ min: 10, max: 40 })
    .withMessage('Количество символов в почте от 10 до 40'),
  body('fullName', 'Введите имя')
    .isString()
    .isLength({ min: 2, max: 40 })
    .withMessage('Количество символов в имени от 2 до 40'),
  body('userName', 'Введите логин')
    .isString()
    .isLength({ min: 2, max: 40 })
    .withMessage('Количество символов в логине от 2 до 40'),
  body('password', 'Введите пароль')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Минимальная длина пароля 6 символов')
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    }),
];