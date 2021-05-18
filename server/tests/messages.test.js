const app = require('../app');
const supertest = require('supertest');
const { roomsSeedData, usersSeedData } = require('./seed/seedData');

let request = supertest(app);
let response;
let roomId;
let token;
let userId;

describe('Messages route test - POST', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    response = await request.post('/api/authentication/login').send({
      email: usersSeedData[1].email,
      password: usersSeedData[1].password,
    });

    userId = response.body.data._id;
    token = response.body.token;

    response = await request.get(`/api/room/${roomsSeedData[1].name}`).set('Authorization', token);

    roomId = response.body.data._id;
  });

  it('Should post new message', async () => {
    response = await request
      .post(`/api/messages/${roomsSeedData[1].name}`)
      .send({
        message: 'message',
        room: roomId,
        user: userId,
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(201);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data.message).toEqual('message');
  });

  it('Should not post an empty message', async () => {
    response = await request
      .post(`/api/messages/${roomsSeedData[1].name}`)
      .send({
        message: '',
        room: roomId,
        user: userId,
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(422);
    expect(response.body.success).toBeFalsy();
    expect(response.body.data.errors).not.toBeNull();
  });
});
