const auctions = [];

function createAuction({ title, description, startingBid, duration }) {
    const auction = {
        id: Date.now(),
        title,
        description,
        startingBid,
        duration,
    };

    auctions.push(auction);
    return auction;
}

function getAuctions() {
    return auctions;
}

function getAuctionById(id) {
    return auctions.find((a) => String(a.id) === String(id));
}

module.exports = {
    createAuction,
    getAuctions,
    getAuctionById,
};

