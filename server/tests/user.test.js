const app = require('../app');
const { populateData } = require('./seed/seedFn');
const supertest = require('supertest');
const { usersSeedData } = require('./seed/seedData');

let request = supertest(app);
let response;
let user;
let token;

beforeAll(async () => {
  jest.setTimeout(30000);
  response = await request.post('/api/authentication/login').send({
    email: usersSeedData[2].email,
    password: usersSeedData[2].password,
  });

  user = response.body.data;
  token = response.body.token;
});

afterAll(async () => {
  await populateData();
});

describe('User route test - GET', () => {
  it('Should get logged user data', async () => {
    response = await request.get('/api/user/logged').set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data.username).toEqual(usersSeedData[2].username);
  });
});

describe('User route test - DELETE', () => {
  it('Should remove user data', async () => {
    response = await request
      .delete('/api/user/remove/logged')
      .send(user)
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toEqual('Account deleted');
  });
});
