# API Documentation

## Overview

RESTful API built with Express.js, deployed on Google Cloud or AWS EC2.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://api.example.com/api`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "status": "success",
  "data": { /* actual data */ },
  "message": "Operation successful",
  "timestamp": 1704067200000
}
```

### Error Response
```json
{
  "status": "error",
  "error": "INVALID_EMAIL",
  "message": "The provided email is invalid",
  "timestamp": 1704067200000
}
```

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| INVALID_CREDENTIALS | 401 | Email or password is incorrect |
| USER_NOT_FOUND | 404 | Requested user does not exist |
| USER_ALREADY_EXISTS | 409 | User with this email already exists |
| INVALID_TOKEN | 401 | Token is invalid or expired |
| UNAUTHORIZED | 403 | User doesn't have permission |
| VALIDATION_ERROR | 400 | Request validation failed |
| INTERNAL_ERROR | 500 | Server error occurred |

## Endpoints

### Authentication

#### Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 3600
  }
}
```

#### Register
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}

Response: 201 Created
{
  "user": { /* user object */ },
  "token": { /* token object */ }
}
```

#### Logout
```
POST /api/v1/auth/logout
Authorization: Bearer <token>

Response: 200 OK
{ "message": "Logged out successfully" }
```

### Users

#### Get Profile
```
GET /api/v1/users/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://...",
  "role": "user"
}
```

#### Update Profile
```
PUT /api/v1/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "avatar": "https://..."
}

Response: 200 OK
{ /* updated user object */ }
```

### Products

#### Get All Products
```
GET /api/v1/products?page=1&pageSize=20&category=electronics

Response: 200 OK
{
  "items": [ /* products */ ],
  "total": 150,
  "page": 1,
  "pageSize": 20,
  "hasMore": true
}
```

#### Get Product by ID
```
GET /api/v1/products/123

Response: 200 OK
{
  "id": "123",
  "name": "Product Name",
  "description": "...",
  "price": 99.99,
  "image": "https://...",
  "category": "electronics",
  "stock": 50
}
```

### Orders

#### Create Order
```
POST /api/v1/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "123",
      "quantity": 2
    }
  ]
}

Response: 201 Created
{
  "id": "order_123",
  "userId": "user_123",
  "items": [ /* order items */ ],
  "total": 199.98,
  "status": "pending"
}
```

#### Get Orders
```
GET /api/v1/orders?status=pending&page=1

Response: 200 OK
{ /* paginated orders */ }
```

## Rate Limiting

- Rate limit: 100 requests per minute per IP
- Rate limit headers in response:
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 95
  - `X-RateLimit-Reset`: 1704067260

## Pagination

For endpoints that return lists:

```
GET /api/v1/products?page=1&pageSize=20
```

Parameters:
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 20, max: 100)

