import express from 'express';
import path from 'path';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.render('home', { title: 'Home' });
});

export default app;