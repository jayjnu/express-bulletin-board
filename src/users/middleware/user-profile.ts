import { Request, Response, NextFunction } from 'express';
import { DataAccess } from '../data-access';


export interface UserProfileReq extends Request {
    db: {
        query: any
    }
    users: any
}

export async function userProfile(req: UserProfileReq, res: Response, next: NextFunction) {
    const dataAccess = new DataAccess(req.db.query);
    try {
        req.users = await dataAccess.getUserByUserId(req.query.userId);
        next();
    } catch (e) {
        next(e);
    }
}