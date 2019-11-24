require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('meme routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a meme', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'password' });
    
    return agent
      .post('/api/v1/memes')
      .send({ top: 'hi', imageUrl: 'my image', bottom: 'bye' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'hi',
          imageUrl: 'my image',
          bottom: 'bye',
          user: expect.any(String),
          __v: 0
        });
      });
  });
});
