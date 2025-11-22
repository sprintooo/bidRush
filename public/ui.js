const API_BASE = '/api';

async function fetchJSON(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    const text = await res.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null;
    } catch (e) {
        data = null;
    }

    if (!res.ok) {
        const message = (data && data.message) || `Request failed with status ${res.status}`;
        throw new Error(message);
    }

    return data;
}

async function loadAuctions() {
    const list = document.getElementById('auctions-list');
    list.innerHTML = '<li>Loading...</li>';

    try {
        const [auctions, bids] = await Promise.all([
            fetchJSON(`${API_BASE}/auctions`),
            fetchJSON(`${API_BASE}/bids`),
        ]);

        if (!auctions.length) {
            list.innerHTML = '<li>No auctions yet.</li>';
            return;
        }

        const bidsByAuction = bids.reduce((acc, bid) => {
            const key = String(bid.auctionId);
            if (!acc[key]) acc[key] = [];
            acc[key].push(bid);
            return acc;
        }, {});

        list.innerHTML = '';
        auctions.forEach((a) => {
            const li = document.createElement('li');

            const header = document.createElement('div');
            header.textContent = `#${a.id} - ${a.title} (start: ${a.startingBid}, duration: ${a.duration})`;
            li.appendChild(header);

            const bidsList = document.createElement('ul');
            bidsList.className = 'auction-bids';

            const bidsForAuction = bidsByAuction[String(a.id)] || [];
            if (!bidsForAuction.length) {
                const noBidItem = document.createElement('li');
                noBidItem.textContent = 'No bids yet';
                bidsList.appendChild(noBidItem);
            } else {
                bidsForAuction.forEach((b) => {
                    const bidLi = document.createElement('li');
                    bidLi.textContent = `Bid #${b.id} - ${b.amount} by ${b.userId}`;
                    bidsList.appendChild(bidLi);
                });
            }

            li.appendChild(bidsList);
            list.appendChild(li);
        });
    } catch (err) {
        list.innerHTML = `<li class="error">Error loading auctions: ${err.message}</li>`;
    }
}

function setupCreateAuctionForm() {
    const form = document.getElementById('create-auction-form');
    const message = document.getElementById('create-auction-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        message.textContent = '';
        message.className = 'message';

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const result = await fetchJSON(`${API_BASE}/auctions`, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            message.textContent = (result && result.message) || '';
            message.classList.add('success');
            form.reset();
            loadAuctions();
        } catch (err) {
            message.textContent = err.message;
            message.classList.add('error');
        }
    });
}

function setupPlaceBidForm() {
    const form = document.getElementById('place-bid-form');
    const message = document.getElementById('place-bid-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        message.textContent = '';
        message.className = 'message';

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const result = await fetchJSON(`${API_BASE}/bids`, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            message.textContent = (result && result.message) || '';
            message.classList.add('success');
            form.reset();
        } catch (err) {
            message.textContent = err.message;
            message.classList.add('error');
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('refresh-auctions')
        .addEventListener('click', () => loadAuctions());

    setupCreateAuctionForm();
    setupPlaceBidForm();
    loadAuctions();
});

