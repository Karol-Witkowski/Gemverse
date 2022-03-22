const app = require('../app');
const { populateData } = require('./seed/seedFn');
const supertest = require('supertest');
const { roomsSeedData, usersSeedData } = require('./seed/seedData');

let request = supertest(app);
let response;
let room;
let token;
let user;

beforeAll(async () => {
  jest.setTimeout(30000);
  response = await request.post('/api/authentication/login').send({
    email: usersSeedData[3].email,
    password: usersSeedData[3].password,
  });

  user = response.body.data;
  token = response.body.token;
  response = await request.get(`/api/room/${roomsSeedData[2].name}`).set('Authorization', token);
  room = response.body.data;
});

afterAll(async () => {
  await populateData();
});

describe('Room route test - GET', () => {
  it('Should get all rooms', async () => {
    response = await request.get('/api/room').set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data[1].name).toEqual(roomsSeedData[1].name);
  });

  it('Should get room', async () => {
    response = await request.get(`/api/room/${roomsSeedData[1].name}`).set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data.name).toEqual(roomsSeedData[1].name);
  });

  it('Should send error - room does not exist', async () => {
    response = await request.get('/api/room/none').set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Room not found');
  });
});

describe('Room route test - POST', () => {
  it('Should save new room', async () => {
    response = await request
      .post('/api/room')
      .send({
        name: 'newRoom',
        password: '123456',
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(201);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data.name).toEqual('newRoom');
    expect(response.body.data.access).toEqual('private');
  });

  it('Should now save room when name is already in use', async () => {
    response = await request
      .post('/api/room')
      .send({
        name: roomsSeedData[1].name,
        password: '',
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(422);
    expect(response.body.success).toBeFalsy();
    expect(response.body.data.errors).not.toBeNull();
  });

  it('Should verify a private room password', async () => {
    response = await request
      .post('/api/room/verification')
      .send({
        name: roomsSeedData[0].name,
        password: roomsSeedData[0].password,
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
  });

  it('Should fail password verification on invalid password', async () => {
    response = await request
      .post('/api/room/verification')
      .send({
        name: roomsSeedData[0].name,
        password: '',
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Invalid password');
  });

  it('Should fail password verification - room does not exist', async () => {
    response = await request
      .post('/api/room/verification')
      .send({
        name: 'newRoom1',
        password: 'password',
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('No room with name newRoom1 found');
  });

  it('Should remove user from room', async () => {
    response = await request
      .post('/api/room/remove/user')
      .send({
        slug: roomsSeedData[1].name,
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
  });

  it('Should fail remove user from room - room does not exist', async () => {
    response = await request
      .post('/api/room/remove/user')
      .send({
        slug: 'invalidRoom',
      })
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Room not found');
  });
});

describe('Room route test - DELETE', () => {
  it('Should prevent removing room by guest user', async () => {
    response = await request.post('/api/authentication/login').send({
      email: usersSeedData[2].email,
      password: usersSeedData[2].password,
    });

    const guestUser = response.body.data;

    response = await request
      .delete(`/api/room/${room._id}`)
      .send(guestUser)
      .set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(403);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Users are allowed to delete only their rooms');
  });

  it('Should delete room', async () => {
    response = await request.delete(`/api/room/${room._id}`).send(user).set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toEqual('Room deleted');

    // Check if room was deleted successfully
    response = await request.get(`/api/room/${room.name}`).set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Room not found');
  });

  it('Should not delete room - room does not exist', async () => {
    response = await request.delete(`/api/room/${room._id}`).send(user).set('Authorization', token);

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Room not found');
  });
});
