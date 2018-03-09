import express from 'express';
import path from 'path';
import url from 'url';
import mysql from 'mysql';
import morgan from 'morgan';

import db from './db';

import Users from './users';
import {UserProfileReq} from "./users/middleware/user-profile";

const dbURL = url.parse(process.env.CLEARDB_DATABASE_URL);
const dbPool = db.MySQLPool(mysql.createPool({
    connectionLimit : 10,
    host: dbURL.host,
    user: dbURL.auth.split(':')[0],
    password: dbURL.auth.split(':')[1],
    database: dbURL.pathname.slice(1)
}));

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
   res.render('home', { title: 'Home' });
});
app.get('/users/:userId', dbPool, Users.middleware.userProfile, (req: UserProfileReq, res) => {
    res.render('user-info', { userName: req.users.userName });
});
app.post('/users', dbPool, Users.middleware.userRegister, (req, res) => {
    res.redirect('/');
});
app.get('/signup', (req, res) => {
   res.render('signup');
});
app.get('/login', (req, res) => {
   res.render('login');
});
app.get('*', (req, res) => {
   res.status(404).render('not-found');
});

export default app;