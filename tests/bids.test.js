const request = require('supertest');
const app = require('../app');

describe('Bids endpoints', () => {
  it('should create a bid and fetch by userId', async () => {
    const userId = 'user-1';
    const auctionId = 'auction-1';

    const createRes = await request(app).post('/api/bids').send({
      auctionId,
      userId,
      amount: 100,
    });

    expect(createRes.status).toBe(200);
    expect(createRes.body).toHaveProperty('bid');
    expect(createRes.body.bid).toMatchObject({ auctionId, userId, amount: 100 });

    const listRes = await request(app).get(`/api/bids?userId=${userId}`);

    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThan(0);
    expect(listRes.body[0]).toMatchObject({ auctionId, userId, amount: 100 });
  });

  it('should reject bids that are not higher than current highest bid', async () => {
    const userId = 'user-2';
    const auctionId = 'auction-2';

    // First, place an initial bid
    const firstBidRes = await request(app).post('/api/bids').send({
      auctionId,
      userId,
      amount: 150,
    });

    expect(firstBidRes.status).toBe(200);

    // Try to place a lower or equal bid
    const lowerBidRes = await request(app).post('/api/bids').send({
      auctionId,
      userId,
      amount: 150,
    });

    expect(lowerBidRes.status).toBe(400);
    expect(lowerBidRes.body).toHaveProperty('message');
  });
});

