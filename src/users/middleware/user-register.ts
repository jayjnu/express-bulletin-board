import { Request, Response, NextFunction } from 'express';
import { DataAccess } from '../data-access';


export interface UserRegisterReq extends Request {
    db: {
        query: any
    }
    users: any
}
export async function userRegister(req: UserRegisterReq, res: Response, next: NextFunction) {
    const db = new DataAccess(req.db.query);

}