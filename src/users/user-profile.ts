import { Request, Response, NextFunction } from 'express';
import { DataAccess } from './data-access';
import { DelegatedQueryMethod } from '../mysql-middleware/interfaces';

export interface UserProfileReq extends Request {
  db: {
    query: any
  };
  users: any;
}

type UserProfileRequest = {
  userId: string,
  userPass: string
};
export function userProfile(req: UserProfileRequest, dataSource: DelegatedQueryMethod) {
  const dataAccess = new DataAccess(dataSource);
  return dataAccess.getUserByUserId(req.userId);
}