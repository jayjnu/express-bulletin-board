import { Request } from 'express';
import { Pool } from 'mysql';

type Q = any;

export interface DBInterface<C> {
  query(query: string): Promise<Q>;
  connect(): Promise<C>;
}

export interface DBResult {
  result: any[];
  fields: any[];
}

export interface DBReq extends Request {
  db: {
    query: DelegatedQueryMethod,
    pool: Pool
  };
}

export type DelegatedQueryMethod = {
  (q: string): Promise<DBResult>
};