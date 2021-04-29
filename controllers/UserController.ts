import express from 'express';

import { UserModel } from '../models/UserModel';


class UserController {
  async index(_: unknown, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();

      res.json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
}

export const UserCtrl = new UserController();