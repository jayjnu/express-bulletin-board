import { Pool } from 'mysql';

type DataAccessOption = {
    dbPool: Pool
};

type UpdateQuery = {
    userId: string
    userPass: string
    email: string
};

class DataAccess {
    dbPool: Pool;
    constructor({ dbPool }: DataAccessOption) {
        this.dbPool = dbPool;
    }

    query(query: string) {
        return new Promise((resolve, reject) => {
            this.dbPool.query(query, (err, data, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve( { data, fields } );
                }
            });
        });
    }

    async getUsers({limit = 50}: { limit: number }) {
        const query = `SELECT * from users LIMIT ${limit}`;
        return await this.query(query);
    }

    async getUserByUserId(userId: string|number) {
        const query = `SELECT * FROM users WHERE userId=${userId}`;
        return await this.query(query);
    }

    async updateUserData({ userId, userPass, email }: UpdateQuery) {
        const dataBeforeUpdate = await this.getUserByUserId(userId);
        const newData = Object.assign({}, dataBeforeUpdate, {
            userPass,
            email
        });
        const query = `UPDATE users 
                      SET userPass=${newData.userPass} email=${newData.email} 
                      WHERE userId=${userId}`;
        return await this.query(query);
    }
}

export default DataAccess;