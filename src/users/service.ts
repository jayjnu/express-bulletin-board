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

type UserDataUpdateQuery = {
    userId: string
    email: string
    userPass: string
}

class Service {
    db: DataAccess;
    constructor({ dbPool }: ServiceOption) {
        this.db = new DataAccess({ dbPool });
    }

    async userLogin(query: UserLoginQuery) {
        return await this.db.getUserByUserId(query.userId);
    }

    async updateUserData(updateQuery: UserDataUpdateQuery) {
        return await this.db.updateUserData(updateQuery);
    }
}

export default Service;
