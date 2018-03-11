import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('posts/list');
});

router.get('/:postId', (req, res) => {
  res.render('posts/post');
});

router.get('/posts/new', (req, res) => {
  res.send('posts/write');
});

router.get('/posts/:postId/modify', (req, res) => {
  res.send('posts/modify');
});

router.post('/', (req, res) => {

});

router.put('/:postId', (req, res) => {

});

router.delete('/:postId', (req, res) => {

});

export default router;