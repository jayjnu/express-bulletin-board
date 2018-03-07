import { Router, Request, Response, NextFunction } from 'express';
import Service from './service';

type ControllerOption = {
    dataSource: any
};

function Controllers({ dataSource }: ControllerOption) {

    const router = Router();
    const service = new Service({ dataSource });

    // GET
    router.get('/', (req, res) => {

    });

    router.get('/:boardId', (req, res) => {

    });

    router.get('/:boardId/:postingId', async (req, res) => {
        const boardId = req.params.boardId;
        const postingId = req.params.postingId;
        const contentPage = await service.getContentPage({ boardId, postingId });

        res.status(200).render('bbs/content', contentPage);
    });


    // POST
    router.post('/', (req, res) => {

    });

    router.post('/:boardId', (req, res) => {

    });


    // PUT
    router.put('/:boardId/:postingId', (req, res) => {

    });

    // DELETE
    router.delete('/:boardId/:postingId', (req, res) => {

    });

    return router;
}

export default Controllers;