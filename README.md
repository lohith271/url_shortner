# Shortly - URL Shortener

A simple, modern, full-stack URL shortener application built with React, Node.js (Express), and MongoDB.

## Project Structure

- **`backend/`**: Node.js/Express REST API that handles shortening URLs, logging click analytics, and redirecting short codes.
- **`frontend/`**: Vite-powered React client that allows users to shorten URLs and view analytics dashboards.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (running locally or a MongoDB Atlas URI)

### Setup & Installation

1. Clone the repository.
2. In the `backend/` directory, copy `.env.example` to `.env` and fill in your connection details (e.g., MongoDB URI, Port).
3. In the `frontend/` directory, copy `.env.example` to `.env` and set the `VITE_API_URL` to match your backend port.
4. Run `npm install` in both `backend/` and `frontend/` directories to install dependencies.

### Running the Application

- **Backend**:
  ```bash
  cd backend
  npm run dev
  ```

- **Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```
