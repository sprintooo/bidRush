const express = require('express');
const router = express.Router();

const auctionsService = require('../services/auctionsService');

router.post('/', (req, res) => {
    const { title, description, startingBid, duration } = req.body;

    if (!title || !description || startingBid === undefined || duration === undefined) {
        return res.status(400).json({
            message: 'Missing required fields: title, description, startingBid, duration',
        });
    }

    const parsedStartingBid = Number(startingBid);
    const parsedDuration = Number(duration);

    if (Number.isNaN(parsedStartingBid) || parsedStartingBid <= 0) {
        return res.status(400).json({
            message: 'Starting bid must be a number greater than 0',
        });
    }

    if (Number.isNaN(parsedDuration) || parsedDuration <= 0) {
        return res.status(400).json({
            message: 'Duration must be a number greater than 0',
        });
    }

    const auction = auctionsService.createAuction({
        title,
        description,
        startingBid: parsedStartingBid,
        duration: parsedDuration,
    });

    res.json({
        message: 'Auction created successfully!',
        auction,
    });
});

router.get('/', (req, res) => {
    const auctions = auctionsService.getAuctions();
    res.json(auctions);
});

module.exports = router;