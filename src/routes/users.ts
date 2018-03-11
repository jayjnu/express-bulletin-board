import { Router } from 'express';
import * as Users from '../users';
import { UserProfileReq } from '../users/user-profile';
import passport from 'passport';

const router = Router();

router.get('/:userId', (req: UserProfileReq, res) => {
  res.render('user-info', { userData: req.users });
});

router.post('/', Users.userRegister, (req, res) => {
  res.redirect('/');
});

export default router;