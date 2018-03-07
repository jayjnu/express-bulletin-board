import { Router } from "express";
import Service from './service';
import { Pool } from "mysql";

type ControllerOption = {
    dbPool: Pool
};

export default function Controllers({ dbPool } : ControllerOption) {

    const router = Router();
    const service = new Service({ dbPool });

    router.get('/', (req, res) => {

    });

    router.post('/', (req, res) => {
        const userLoginQuery = {
            userId: req.body.userId,
            userPass: req.body.userPass
        };

        service.userLogin(userLoginQuery);
    });

    return router;
}