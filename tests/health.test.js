const request = require('supertest');
const app = require('../app');

describe('Health endpoint', () => {
  it('should return 200 and success status', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'success');
  });
});

