# 🛒 E-commerce API

Backend API for an e-commerce platform.
Provides authentication, product management, cart, orders, and user-related features.

---

## 🚀 Features

* 🔐 Authentication (JWT-based)
* 👤 User management
* 🛍️ Products & categories
* 🎨 Artists
* 🛒 Cart system
* ❤️ Wishlist
* 📦 Orders
* 💳 Payment methods
* 📍 Addresses

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:axelintu/ecommerce-api.git
cd ecommerce-api
npm install
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Add them to:

* `JWT_SECRET`
* `JWT_REFRESH_TOKEN`

> ⚠️ Make sure to also configure your database connection (MongoDB / SQL / etc.)

---

## ▶️ Running the Project

Development:

```bash
npm run dev
```

Development & Documentation (at http://localhost/api-docs):

```bash
npm run dev-docs
```
---

## 🔐 Authentication

This API uses **JWT authentication**.

Typical flow:

1. Register:

```http
POST /auth/register
```

2. Login:

```http
POST /auth/login
```

3. Use token in headers:

```http
Authorization: Bearer <your_token>
```

---

## 📚 API Overview

Base URL:

```
http://localhost:3000/api
```

### 🔑 Auth

* `POST /auth/register`
* `POST /auth/login`

### 👤 Users

* `GET /users` Requires admin role
* `POST /users` Requires admin role
* `GET /users/{id}` Requires admin role/ non-admin only has hacces to own data
* `PUT /users/{id}` Requires admin role
* `DELETE /users/{id}`Requires admin role

### 📍 Addresses

* `GET /addresses` Get User Addresses
* `POST /addresses` Requires admin role
* `GET /addresses/{id}` Requires admin role/ non-admin only has hacces to own data
* `PUT /addresses/{id}` Requires admin role/ non-admin only has hacces to own data
* `DELETE /addresses/{id}` Requires admin role/ non-admin only has hacces to own data

### 🛍️ Products

* `GET /products` No auth required
* `POST /products`
* `GET /products/{id}`
* `PUT /products/{id}`
* `DELETE /products/{id}`


---

### 🗂️ Categories

* `GET /categories` No auth required
* `POST /categories`
* `GET /categories/{id}`
* `PUT /categories/{id}`
* `DELETE /categories/{id}`

---

### 🎨 Artists

* `GET /artists` No auth required
* `POST /artists`
* `GET /artists/{id}`
* `PUT /artists/{id}`
* `DELETE /artists/{id}`

---

### 🛒 Cart

* `GET /cart`
* `POST /cart`
* `GET /cart/{id}`
* `PUT /cart/{id}`
* `DELETE /cart/{id}`
* `GET /cart/user/{id}`

---

### ❤️ Wishlist

* `GET /wishlist`
* `POST /wishlist`
* `GET /wishlist/user/{userId}`
* `DELETE /wishlist/{id}`
* `DELETE /wishlist/{id}/product`

---

### 📦 Orders

* `GET /orders`
* `POST /orders`
* `GET /orders/{id}`
* `PUT /orders/{id}`

---

### 💳 Payment Methods

* `GET /payment-methods`
* `POST /payment-methods`
* `GET /payment-methods/{id}`
* `PUT /payment-methods/{id}`
* `DELETE /payment-methods/{id}`

---

## 🧪 API Documentation (Swagger)

This project includes OpenAPI documentation.


* When dev rut as dev-docs basic documentation available at http://localhost/api-docs
```bash
npm run dev-docs
```

---

## 🛠️ Tech Stack

* Node.js
* Express
* JWT Authentication
* MongoDB

---

## 📌 Notes

* All endpoints return standard HTTP status codes

---
