import request from 'supertest';
import app from '../src/app';
import {Response} from 'superagent';

describe('GET /login', () => {
  it('respond with 200', (done) => {
    request(app)
      .get('/login')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /login', () => {
  it('redirect to last page', (done) => {
    request(app)
      .post('/login')
      .field('userId', 'admin')
      .field('userPass', '1111')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('redirect to /login again', (done) =>{
    request(app)
      .post('/login')
      .field('userId', 'adasdasdasdasdasdsad')
      .field('userPass', '213213123123123')
      .expect(401)
      .end(err => {
        if (err) return done(err);
        done();
      })
  });
});