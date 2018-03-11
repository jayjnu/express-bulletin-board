import { Router } from 'express';
import passport from 'passport'

const router = Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res) => {

  res.redirect('/');
});

export default router;