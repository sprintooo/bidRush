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

function getHighestBidAmountForAuction(auctionId) {
    const auctionBids = bids.filter(
        (bid) => String(bid.auctionId) === String(auctionId)
    );

    if (!auctionBids.length) {
        return 0;
    }

    return auctionBids.reduce(
        (max, bid) => (bid.amount > max ? bid.amount : max),
        auctionBids[0].amount
    );
}

module.exports = {
    createBid,
    getBids,
    getBidById,
    getHighestBidAmountForAuction,
};

