import {Pool} from "mysql";
import {NextFunction, Response} from "express";
import {DBReq} from "./interfaces";

function MySQLPool(dbPool: Pool) {
    return (req: DBReq, res: Response, next: NextFunction) => {
        console.log('[MySQLPool] making db connection..');
        dbPool.getConnection((err, connection) => {
            if (err) {
                return next(err);
            }
            req.db = {
                query: (q: string) => new Promise((resolve, reject) => {
                    connection.query(q, (err, result, fields) => {
                        if (err) {
                            return reject(err);
                        } else {
                            resolve({ result, fields });
                        }
                    });
                }),
                pool: dbPool
            };
            next();
        });
    };
}

export default MySQLPool;