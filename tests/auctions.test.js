const request = require('supertest');
const app = require('../app');

describe('Auctions endpoints', () => {
  it('should create and list auctions', async () => {
    const createRes = await request(app).post('/api/auctions').send({
      title: 'Laptop',
      description: 'Brand new laptop',
      startingBid: 500,
      duration: 10,
    });

    expect(createRes.status).toBe(200);
    expect(createRes.body).toHaveProperty('auction');
    expect(createRes.body.auction).toHaveProperty('id');

    const listRes = await request(app).get('/api/auctions');

    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThan(0);
  });
});

