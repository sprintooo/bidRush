const request = require('supertest');
const app = require('../app');

describe('Users endpoints', () => {
  it('should register a user and not expose password', async () => {
    const res = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).not.toHaveProperty('password');
    expect(res.body.user).toMatchObject({
      name: 'Test User',
      email: 'test@example.com',
    });
  });

  it('should allow a registered user to login', async () => {
    const email = 'login@example.com';
    const password = 'password123';

    await request(app).post('/api/users/register').send({
      name: 'Login User',
      email,
      password,
    });

    const res = await request(app).post('/api/users/login').send({
      email,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).not.toHaveProperty('password');
    expect(res.body.user).toMatchObject({
      name: 'Login User',
      email,
    });
  });
});

