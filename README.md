# BidRush

Real-time bidding and auction system built with Node.js and Express.

## Features
- Create and manage auctions
- Place and manage bids
- User-related endpoints
- RESTful JSON API with basic error handling

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sprintooo/bidRush.git
   cd bidRush
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file to override defaults from `config.js` if needed.

### Running the app

- Development mode (with nodemon):
  ```bash
  npm run dev
  ```

- Production mode:
  ```bash
  npm start
  ```

The server starts on the port configured in `config.js` and logs:
`Server is running at http://localhost:<PORT>`.

## API Overview

Base URL: `http://localhost:<PORT>/api`

- `GET /api` – basic test/health route
- `GET /api/auctions` – auctions endpoints
- `GET /api/bids` – bids endpoints
- `GET /api/users` – users endpoints

See the route files in the `routes/` directory for more details.

## Testing

Run all tests with:
```bash
npm test
```

Tests are located in the `tests/` directory and use Jest + Supertest.

