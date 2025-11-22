const request = require('supertest');
const app = require('../app');

describe('Bids endpoints', () => {
  it('should create a bid and fetch by userId when amount is above starting bid', async () => {
    const userId = 'user-1';

    // First create an auction
    const auctionRes = await request(app).post('/api/auctions').send({
      title: 'Test Auction',
      description: 'Auction for bids test',
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

  it('should reject a bid that is not greater than current highest bid', async () => {
    const userId = 'user-2';

    // Create auction
    const auctionRes = await request(app).post('/api/auctions').send({
      title: 'Bid Validation Auction',
      description: 'Auction for validation',
      startingBid: 100,
      duration: 10,
    });

    expect(auctionRes.status).toBe(200);
    const auctionId = auctionRes.body.auction.id;

    // Place an initial valid bid
    const firstBidRes = await request(app).post('/api/bids').send({
      auctionId,
      userId,
      amount: 150,
    });

    expect(firstBidRes.status).toBe(200);

    // Try to place a lower or equal bid
    const secondBidRes = await request(app).post('/api/bids').send({
      auctionId,
      userId,
      amount: 150,
    });

    expect(secondBidRes.status).toBe(400);
    expect(secondBidRes.body).toHaveProperty('message');
  });
});

