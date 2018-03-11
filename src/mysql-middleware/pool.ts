import mysql, { PoolConfig, PoolConnection } from 'mysql';
import { NextFunction, Response } from 'express';
import { DBReq, DBResult } from './interfaces';
import promisify from '../common/utils/promisify';

function MySQLPool(option: PoolConfig | string) {

  const dbPool = mysql.createPool(option);
  dbPool.on('connection', (connection: PoolConnection) => {
    console.log('[MySQLMiddleware] Connection %d made', connection.threadId);
  });

  dbPool.on('release', (connection: PoolConnection) => {
    console.log('[MySQLMiddleware] Connection %d released', connection.threadId);
  });

  function queryDB(q: string): Promise<DBResult> {
    return new Promise((resolve, reject) => {
      dbPool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(q, (err, result, fields) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve({
            result,
            fields
          });
        });
      });
    });
  }

  const db = {
    query: queryDB,
    pool: dbPool
  };

  return function mySQLMiddleware(req: DBReq, res: Response, next: NextFunction) {
    req.db = db;
    next();
  };
}

export default MySQLPool;