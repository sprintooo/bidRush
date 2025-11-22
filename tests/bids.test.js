const request = require('supertest');
const app = require('../app');

describe('Bids endpoints', () => {
  it('should create a bid and fetch by userId', async () => {
    const userId = 'user-1';

    // First, create an auction so we have a valid startingBid
    const auctionRes = await request(app).post('/api/auctions').send({
      title: 'Phone',
      description: 'New phone',
      startingBid: 50,
      duration: 10,
    });

    expect(auctionRes.status).toBe(200);
    const auctionId = auctionRes.body.auction.id;

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

    const auctionRes = await request(app).post('/api/auctions').send({
      title: 'TV',
      description: 'LCD TV',
      startingBid: 100,
      duration: 10,
    });

    expect(auctionRes.status).toBe(200);
    const auctionId = auctionRes.body.auction.id;

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

  it('should reject initial bids lower than starting bid', async () => {
    const userId = 'user-3';

    const auctionRes = await request(app).post('/api/auctions').send({
      title: 'Car',
      description: 'Used car',
      startingBid: 1000,
      duration: 60,
    });

    expect(auctionRes.status).toBe(200);
    const auctionId = auctionRes.body.auction.id;

    const lowBidRes = await request(app).post('/api/bids').send({
      auctionId,
      userId,
      amount: 500, // lower than startingBid
    });

    expect(lowBidRes.status).toBe(400);
    expect(lowBidRes.body).toHaveProperty('message');
  });
});

