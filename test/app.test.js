require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/model/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can signup a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'testpassword' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test'
        });
      });
  });

  it('can sign in a user', async() => {
    await User.create({ username: 'test', password: '1234' });
    const res = await request(app)
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });

    expect(res.body).toEqual({
      _id: expect.any(String),
      username: 'test'
    });
  });

});
