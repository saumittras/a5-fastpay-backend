# 📚 Fast Pay Digital Wallet System Backend

This is a backend server built with **Express**, **TypeScript**, **Mongoose**, and **MongoDB** to manage a library system. It supports features like managing books, borrowing books, and validation with centralized error handling.

---

## 🚀 Features

- CRUD operations for books and borrowings
- Validation with Mongoose
- Centralized global error handling
- Clean code with TypeScript interfaces
- Environment-based configuration
- RESTful API architecture

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Dotenv**
- **ESLint + Prettier** (optional)

---

## 📁 Project Structure

```
digital-wallet-api/
├── src/
│   ├── app.ts                      # Express app config & middleware loader
│   ├── server.ts                   # Entry point (start server)
│
│   ├── config/                     # Global configurations (DB, env)
│   │   ├── database.ts
│   │   └── env.ts
│
│   ├── constants/                  # Constant values (roles, status, etc.)
│   │   └── roles.ts
│
│   ├── modules/                    # Feature-wise modules
│   │   ├── auth/                   # Auth: login, register
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   ├── user/                   # User module (User + Agent + Admin)
│   │   │   ├── user.model.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.routes.ts
│   │   │   └── user.validation.ts
│   │   │
│   │   ├── wallet/
│   │   │   ├── wallet.model.ts
│   │   │   ├── wallet.controller.ts
│   │   │   ├── wallet.service.ts
│   │   │   ├── wallet.routes.ts
│   │   │   └── wallet.validation.ts
│   │   │
│   │   ├── transaction/
│   │   │   ├── transaction.model.ts
│   │   │   ├── transaction.controller.ts
│   │   │   ├── transaction.service.ts
│   │   │   ├── transaction.routes.ts
│   │   │   └── transaction.validation.ts
│   │
│   ├── middlewares/               # Middleware (auth, error handling, role check)
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── error.middleware.ts
│
│   ├── utils/                      # Reusable helper functions
│   │   ├── jwt.ts
│   │   ├── bcrypt.ts
│   │   └── response.ts
│
│   ├── interfaces/                # TypeScript interfaces & types
│   │   ├── user.interface.ts
│   │   ├── wallet.interface.ts
│   │   └── transaction.interface.ts
│
│   └── routes/                     # All combined route handlers
│       └── index.ts
│
├── .env                            # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json                   # TypeScript config
└── README.md

```

---

## 📦 Installation

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/saumittras/fastPay.git
cd fastPay

```

### ✅ 2.Install Dependencies

```
npm install
```

### ✅ 3. Create `.env` File

<p>Create a .env file in the root and add:</p>

```
PORT=5000
NODE_ENV=development
MONGO_DB = Your_credintials

#JWT
JWT_ACCESS_SECRET = access_secret
JWT_ACCESS_EXPIRE = 1h
JWT_REFRESH_SECRET = JWT_REFRESH_SECRET
JWT_REFRESH_EXPIRE = 1d

#BCRYPT
BCRYPT_SALT_ROUND = 5

#SUPER_ADMIN
SUPER_ADMIN_PHONE = Phone Number
SUPER_ADMIN_PASSWORD = 'Your_credintials'
```

<p>You can replace DATABASE_URL with your own MongoDB Atlas URL as well.</p>

### ✅ 4. Build and Run

<p>Development Mode (with hot-reload):</p>

```
npm run dev
```

<p>Production Build:</p>

```
bash
Copy
Edit
npm run build
npm start
```

## 📘 API Endpoints

### 👤 User Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/user/create` | Create a new user |

---

### 🔐 Auth Routes

| Method | Endpoint                   | Description                             |
| ------ | -------------------------- | --------------------------------------- |
| POST   | `/api/auth/login`          | Login as Super Admin, Agent, or User    |
| POST   | `/api/auth/reset-password` | Reset password (requires Authorization) |
| POST   | `/api/auth/logout`         | Logout user                             |
| POST   | `/api/auth/refresh-token`  | Generate new access token               |

---

### 🛠️ Admin Routes

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| GET    | `/api/admin/users`        | Get all users               |
| GET    | `/api/admin/wallets`      | Get all wallets             |
| GET    | `/api/admin/transactions` | Get all transactions        |
| POST   | `/api/admin/user-action`  | Block or Unblock a user     |
| POST   | `/api/admin/agent-action` | Approve or Suspend an agent |

---

### 💼 Agent Wallet Routes

| Method | Endpoint                     | Description       |
| ------ | ---------------------------- | ----------------- |
| POST   | `/api/agent-wallet/cash-in`  | Cash in by agent  |
| POST   | `/api/agent-wallet/cash-out` | Cash out by agent |

---

### 💳 User Wallet / Test Routes

| Method | Endpoint                   | Description                           |
| ------ | -------------------------- | ------------------------------------- |
| POST   | `/api/test/test`           | Test user creation                    |
| POST   | `/api/test/send-money`     | Send money                            |
| POST   | `/api/test/withdraw-Money` | Withdraw money                        |
| GET    | `/api/test/Transactions`   | Get all transactions by wallet number |

### Important Links

GitHub Repository: <a href='https://github.com/saumittras/fastPay'>Link</a><br>
Live Deployment: <a href='fastpay-b5a5.vercel.app'>Link</a></br>
Explanation Video: <a href='https://drive.google.com/drive/folders/1jSynwgexK76BIwUbgvSenjC11EOYRTDD?usp=sharing'>Link</a>
Video Link: https://drive.google.com/drive/folders/1jSynwgexK76BIwUbgvSenjC11EOYRTDD?usp=sharing
Readme:<a href='https://github.com/saumittras/fastPay/blob/main/README.md'>Link</a>
Postman JSON:<a href='https://github.com/saumittras/fastPay/blob/main/Fast%20Pay.postman_collection.json'>Link</a>
