const bids = [];

function createBid({ auctionId, userId, amount }) {
    const bid = {
        id: Date.now(),
        auctionId,
        userId,
        amount,
    };

    bids.push(bid);
    return bid;
}

function getBids(userId) {
    if (!userId) {
        return bids;
    }

    return bids.filter((bid) => bid.userId === userId);
}

function getBidById(id) {
    return bids.find((b) => String(b.id) === String(id));
}

module.exports = {
    createBid,
    getBids,
    getBidById,
};

