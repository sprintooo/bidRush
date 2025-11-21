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

module.exports = {
    createAuction,
    getAuctions,
};

