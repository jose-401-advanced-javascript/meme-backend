require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/model/User');
const Meme = require('../lib/model/Meme');

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

  it('gets all memes', async() => {
    const user = await User.create({ username: 'test', password: '1234' });
    const memes = await Meme.create([
      { top: 'hi', imageUrl: 'my image', bottom: 'bye', user: user._id },
      { top: 'hi1', imageUrl: 'my image1', bottom: 'bye1', user: user._id },
      { top: 'hi2', imageUrl: 'my image2', bottom: 'bye2', user: user._id }
    ]);
    
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });

    return agent
      .get('/api/v1/memes')
      .then(res => {
        expect(res.body).toHaveLength(3);
        const parsedMemes = JSON.parse(JSON.stringify(memes));
        parsedMemes.forEach(meme => {
          expect(res.body).toContainEqual(meme);
        });
      });
  });
});
