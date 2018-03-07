import express from 'express';
import path from 'path';
import url from 'url';
import mysql from 'mysql';

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

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/users', Users.Controllers({ dbPool }));
app.use('/bbs', BBS.Controllers({ dataSource: dbPool }));
app.get('/', (req, res) => {
   res.render('home', { title: 'Home' });
});


export default app;