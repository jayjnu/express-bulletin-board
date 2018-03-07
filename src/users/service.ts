import { Request, Response, NextFunction } from 'express';
import { Pool } from 'mysql';
import DataAccess from './data-access';

type ServiceOption = {
  dbPool: Pool
};

type UserLoginQuery = {
    userId: string
    userPass: string
};

class Service {
    db: DataAccess;
    constructor({ dbPool }: ServiceOption) {
        this.db = new DataAccess({ dbPool });
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {

    }

    async getUserById(req: Request, res: Response, next: NextFunction) {

    }

    async userSignUp(req: Request, res: Response, next: NextFunction) {

    }

    async userLogin(query: UserLoginQuery) {
        return await this.db.getUserByUserId(query.userId);
    }
}

export default Service;
