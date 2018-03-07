import url from 'url';
import { Pool } from 'mysql';

type DataAccessOption = {
    dbPool: Pool
};

class DataAccess {
    dbPool: Pool;
    constructor({ dbPool }: DataAccessOption) {
        this.dbPool = dbPool;
    }

    async query(query: string) {
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
        const query = `SELECT * FROM users WHERE userid = '${userId}'`;
        return await this.query(query);
    }

    async postUser() {
    }
}

export default DataAccess;