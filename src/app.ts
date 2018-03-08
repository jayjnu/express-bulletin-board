import express from 'express';
import path from 'path';
import url from 'url';
import mysql from 'mysql';
import morgan from 'morgan';

import Users from './users';
import BBS from './bbs';

const dbURL = url.parse(process.env.CLEARDB_DATABASE_URL);
const dbPool = mysql.createPool({
    connectionLimit : 10,
    host: dbURL.host,
    user: dbURL.auth.split(':')[0],
    password: dbURL.auth.split(':')[1],
    database: dbURL.pathname.slice(1)
});

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use('/users', Users.Controllers({ dbPool }));
app.use('/bbs', BBS.Controllers({ dataSource: dbPool }));

app.get('/', (req, res) => {
   res.render('home', { title: 'Home' });
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