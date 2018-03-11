import { IStrategyOptionsWithRequest, Strategy as LocalStrategy } from 'passport-local';
import * as Users from '../users';
import {DBReq} from '../mysql-middleware/interfaces';

export const localStrategy = (options: IStrategyOptionsWithRequest) => {
  return new LocalStrategy(options, (req: DBReq, username, password, done) => {
    Users.userProfile({userId: username, userPass: password}, req.db.query)
         .then((dbResult) => {
           const userData = dbResult.result[0];
           console.log(userData);
           if (!userData) {
             return done(null, false);
           }

           if (userData.password !== password) {
             return done(null, false);
           }

           return done(null, dbResult);
         })
        .catch((reason) => {
          done(reason);
        });
  });
};