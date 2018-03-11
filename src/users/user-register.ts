import { Request, Response, NextFunction } from 'express';
import { DataAccess } from './data-access';

export interface UserRegisterReq extends Request {
  db: {
    query: any
  };
  users: any;
}

export async function userRegister(req: UserRegisterReq, res: Response, next: NextFunction) {
  const dataAccess = new DataAccess(req.db.query);
  const userInput = {
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userPass: req.body.userPass,
    email: req.body.email
  };

  try {
    await dataAccess.registerUser(userInput);
    next();
  } catch (e) {
    next(e);
  }
}