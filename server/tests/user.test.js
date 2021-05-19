const app = require('../app');
const supertest = require('supertest');
const { usersSeedData } = require('./seed/seedData');

let request = supertest(app);
let response;
let token;

describe('User route test - GET', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    response = await request.post('/api/authentication/login').send({
      email: usersSeedData[1].email,
      password: usersSeedData[1].password,
    });

    token = response.body.token;
  });

  it('Should get logged user data', async () => {
    response = await request.get('/api/user/logged').set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    //expect(response.body.data.message).toEqual('message');
  });
});
