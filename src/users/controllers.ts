import {Router} from 'express';
import Service from './service';
import {Pool} from 'mysql';

type ControllerOption = {
    dbPool: Pool
};

export default function Controllers({dbPool}: ControllerOption) {

    const router = Router();
    const service = new Service({dbPool});

    router.get('/', (req, res) => {
        res.render('login');
    });

    router.get('/:userId', (req, res) => {
        res.render('user-info', {userName: req.params.userId});
    });

    router.post('/', async (req, res) => {
        const userLoginQuery = {
            userId: req.body.userId,
            userPass: req.body.userPass
        };

        // TODO: Need To Separate Error Handling
        try {
            const data = await service.userLogin(userLoginQuery);
            res.status(200).send(data);
        } catch (e) {
            res.redirect('/signup');
        }
    });

    router.post('/', async (req, res) => {

    });

    router.put('/:userId', (req, res) => {
        const params = req.body;
        service.updateUserData({userId: params.userId, userPass: params.userPass, email: params.email})
            .then(
                (result) => {
                    res.send(result);
                },
                (reason) => {
                    res.send(reason);
                }
            );
    });

    return router;
}