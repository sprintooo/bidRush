const express = require('express');
const router = express.Router();

// auction - id, title, description, startingBid, duration.
// sample auction: { id: 1, title: "Laptop", description: "Brand new laptop", startingBid: 500, duration: 10 }
const auctions = [];

router.post('/', (req, res) => {
    var auction = req.body;

    if(!auction.title || !auction.description || !auction.startingBid || !auction.duration) {
        return res.status(400).json({ message: "Missing required fields: title, description, startingBid, duration" });
    }
    if (isNaN(auction.startingBid) || auction.startingBid <= 0) {
        return res.status(400).json({ message: "Starting bid must be a number greater than 0" });
    }
    if (isNaN(auction.duration) || auction.duration <= 0) {
        return res.status(400).json({ message: "Duration must be a number greater than 0" });
    }
       
    auction = {id: Date.now(), ...auction};

    auctions.push(auction);
    res.json({
        message: "Auction created successfully!",
        auction: auction
    });
});

router.get('/', (req, res) => {
    res.json(auctions);
});

module.exports = router;