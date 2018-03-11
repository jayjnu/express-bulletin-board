// import modules
import express from 'express';
// import utils
import path from 'path';
import url from 'url';
// import middleware
import morgan from 'morgan';
import db from './mysql-middleware';
import * as routes from './routes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { localStrategy } from './auth';
import config from './config';
import { IStrategyOptionsWithRequest } from 'passport-local';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve('views'));
app.set('view engine', 'pug');

// Middleware Settings
passport.use(localStrategy(config.passport.strategies.local as IStrategyOptionsWithRequest));
app.use(db.MySQLPool(config.DB_CONFIG));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', routes.home);
app.use('/users', routes.users);
app.use('/signup', routes.signup);
app.use('/login', routes.login);
app.use('/posts', routes.posts);
app.use('*', routes.notFound);

export default app;