const app = require('../app');
const { populateData } = require('./seed/seedFn');
const supertest = require('supertest');
const { usersSeedData } = require('./seed/seedData');

beforeAll(() => {
  jest.setTimeout(30000);
});

afterAll(async () => {
  await populateData();
});

describe('Authentication route test - POST', () => {
  let request = supertest(app);

  it('Should register new user and return token', async () => {
    const response = await request.post('/api/authentication/register').send({
      email: 'newUser@test.tt',
      username: 'newUser1',
      password: 'newUserPass',
    });

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(201);
    expect(response.body.success).toBeTruthy();
    expect(response.body.token).not.toBeNull();
    expect(response.body.auth).toBeTruthy();
  });

  it('Should not register user on missing data', async () => {
    const response = await request.post('/api/authentication/register').send({
      email: 'newUser@test.tt',
      username: '',
      password: 'newUserPass',
    });

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(422);
    expect(response.body.success).toBeFalsy();
    expect(response.body.data.errors).not.toBeNull();
  });

  it('Should not register user when data pattern is invalid', async () => {
    const response = await request.post('/api/authentication/register').send({
      email: 'newUsertest.tt',
      username: 'newUser1',
      password: 'newUserPass',
    });

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(422);
    expect(response.body.success).toBeFalsy();
    expect(response.body.data.errors).not.toBeNull();
  });

  it('Should not register user when data is not unique', async () => {
    const response = await request.post('/api/authentication/register').send({
      email: usersSeedData[0].email,
      username: 'newUser1',
      password: 'newUserPass',
    });

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(422);
    expect(response.body.success).toBeFalsy();
    expect(response.body.data.errors).not.toBeNull();
  });

  it('Should log-in user and return token', async () => {
    const response = await request.post('/api/authentication/login').send({
      email: usersSeedData[0].email,
      password: usersSeedData[0].password,
    });

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.token).not.toBeNull();
    expect(response.body.auth).toBeTruthy();
  });

  it('Should not log-in user on wrong email', async () => {
    const response = await request.post('/api/authentication/login').send({
      email: 'newUsertest.tt',
      password: 'newUserPass',
    });

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.user).toEqual('User not found - Try again');
  });

  it('Should not log-in user on wrong password', async () => {
    const response = await request.post('/api/authentication/login').send({
      email: usersSeedData[0].email,
      password: 'newUserPass',
    });

    expect(typeof response.body).toBe('object');
    expect(response.status).toEqual(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.password).toEqual('Invalid password');
  });
});
