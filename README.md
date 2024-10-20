# NeediBay App Backend

## Project Overview

NeediBay App Backend is a Node.js application built with Express and TypeScript, designed to serve as the backend for an e-commerce platform. It provides APIs for user authentication, product management, order processing, and more. The application uses Prisma ORM with MongoDB for data persistence.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
4. [Middleware](#middleware)
5. [Error Handling](#error-handling)
6. [Database Schema](#database-schema)
7. [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/partiksingh1/needibay_app_backend.git
   cd needibay_app_backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Generate Prisma client:
   ```
   npx prisma generate
   ```

5. Build the project:
   ```
   npm run build
   ```

## Usage

To start the server in development mode:
```
npm run dev
```

To start the server in production mode:
```
npm start
```

The server will start on the port specified in your `.env` file (default is 5000).

## API Endpoints

### Authentication
- `POST /api/auth/login`: User login
- `POST /api/auth/createAdmin`: Create admin user (admin only)
- `POST /api/auth/create-salesperson`: Create salesperson (admin only)
- `PUT /api/auth/create-distributor`: Create distributor (admin only)

### Admin Routes
- `POST /admin/createProduct`: Create a new product
- `GET /admin/getOrders`: Get all orders
- `GET /admin/getSalespersons`: Get all salespersons
- `GET /admin/getDistributors`: Get all distributors
- `GET /admin/getShops`: Get all shops

### Salesperson Routes
- `POST /salesperson/create-shop`: Create a new shop
- `POST /salesperson/create-order`: Create a new order
- `GET /salesperson/getAllProducts`: Get all products
- `GET /salesperson/getShops`: Get all shops
- `GET /salesperson/getDistributors`: Get all distributors

### Distributor Routes
- `GET /distributor/getOrders`: Get distributor orders
- `PUT /distributor/orders/:orderId/status`: Update order status
- `GET /distributor/orders/:orderId`: Get order by ID

## Middleware

- `authenticate`: Ensures that the user is authenticated
- `authorizeAdmin`: Ensures that the authenticated user is an admin

## Error Handling

The application uses a custom error handling middleware to manage and respond to errors consistently across the application.

## Database Schema

The database schema is defined in `/prisma/schema.prisma` and includes models for:

- Admin
- Salesperson
- Distributor
- Shop
- Product
- Order
- OrderItem
- Payment

Each model includes relevant fields and relationships to other models.


For more detailed information about specific functionalities or to contribute to the project, please refer to the individual files in the repository.
