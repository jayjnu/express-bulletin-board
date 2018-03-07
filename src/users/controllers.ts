import { Router } from 'express';
import Service from './service';
import { Pool } from 'mysql';

type ControllerOption = {
    dbPool: Pool
};

export default function Controllers({ dbPool }: ControllerOption) {

    const router = Router();
    const service = new Service({ dbPool });

    router.get('/', (req, res) => {
        res.render('login');
    });

    router.get('/signup', (req, res) => {
        res.render('signup');
    });

    router.post('/login', async (req, res) => {
        const userLoginQuery = {
            userId: req.body.userId,
            userPass: req.body.userPass
        };

        // TODO: Need To Separate Error Handling
        try {
            const data = await service.userLogin(userLoginQuery);
            res.status(200).send(data);
        } catch (e) {
            res.redirect('/users/signup');
        }
    });

    return router;
}