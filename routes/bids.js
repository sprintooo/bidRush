const express = require('express');
const router = express.Router();

const bidsService = require('../services/bidsService');
const auctionsService = require('../services/auctionsService');

router.get('/', (req, res) => {
    const userId = req.query.userId;
    const bids = bidsService.getBids(userId);
    res.json(bids);
});

router.get('/:id', (req, res) => {
    const bidId = req.params.id;
    const bid = bidsService.getBidById(bidId);

    if (!bid) {
        return res.status(404).json({ message: 'Bid not found' });
    }

    res.json(bid);
});

router.post('/', (req, res) => {
    const { auctionId, userId, amount } = req.body;

    if (!auctionId || !userId || amount === undefined) {
        return res
            .status(400)
            .json({ message: 'Missing required fields: auctionId, userId, amount' });
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        return res
            .status(400)
            .json({ message: 'Bid amount must be a number greater than 0' });
    }

    // Validate auction exists
    const auctions = auctionsService.getAuctions();
    const auction = auctions.find((a) => String(a.id) === String(auctionId));

    if (!auction) {
        return res.status(404).json({ message: 'Auction not found for this bid' });
    }

    // Determine the minimum allowed bid: max(current highest bid, startingBid)
    const highestBid = bidsService.getHighestBidAmountForAuction(auctionId);
    const currentMin = Math.max(highestBid || 0, auction.startingBid);

    if (parsedAmount <= currentMin) {
        return res.status(400).json({
            message: `Bid amount must be greater than current highest bid (${currentMin})`,
        });
    }

    const bid = bidsService.createBid({ auctionId, userId, amount: parsedAmount });

    res.json({
        message: 'Bid placed successfully!',
        bid,
    });
});

module.exports = router;
