# 🕷️ Dev Tracker – Friendly Neighborhood Productivity App

> “With great power comes great productivity.”

A production-ready full-stack MERN application that helps developers track daily coding hours, problems solved, streaks, and performance with GitHub-style analytics.

---

## 🕸️ Live in the Multiverse

**🕷️ Frontend (Netlify)**  
👉 https://dev-tracker-mern.netlify.app 

**🕸️ Backend API (Render)**  
👉 https://dev-tracker-api-0f6x.onrender.com  

---

## 🧬 Powers & Abilities

- 🕷️ Secure JWT Authentication (Register / Login)
- ⏳ Track daily coding hours
- 🧠 Track problems solved
- 🔥 Automatic streak calculation
- 📊 Weekly analytics chart (Recharts)
- 🟩 1-year GitHub-style contribution heatmap
- ⚡ Productivity score system
- 🌙 Dark “Night Patrol” UI
- 🌍 Fully deployed production environment

---

## 🧠 Power Level Formula

```js
Productivity Score = 
(totalHours × 5) + 
(totalProblems × 3) + 
(currentStreak × 10)
```

---

## 🛠️ Tech Suit (Tech Stack)

### 🕷️ Frontend – The Web Shooter

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,css" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/axios/axios-plain.svg" width="48" height="48"/>
</p>

- React (Vite)
- Axios
- React Router
- Recharts
- Custom CSS (Dark UI)

---

### 🧪 Backend – The Lab

<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />
</p>

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

## 🏙️ Deployment Across the City

<p align="left">
  <img src="https://skillicons.dev/icons?i=netlify" />
  <img src="https://skillicons.dev/icons?i=render" />
</p>

- 🕷️ Frontend → Netlify  
- 🕸️ Backend → Render  
- 🗄️ Database → MongoDB Atlas  

---

## 📂 Project Structure (Spider-Lair)

```
dev-tracker/
│
├── client/                       # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/                  # Axios configuration
│   │   ├── components/           # ProtectedRoute, reusable components
│   │   ├── pages/                # Login, Register, Dashboard
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                       # Express Backend
│   ├── models/                   # Mongoose models (User, DailyLog)
│   │   ├── User.js
│   │   └── DailyLog.js
│   │
│   ├── routes/                   # Auth & Log routes
│   │   ├── auth.js
│   │   └── logs.js
│   │
│   ├── middleware/               # JWT auth middleware
│   │   └── authMiddleware.js
│   │
│   ├── server.js                 # Express entry point
│   └── package.json
│
└── README.md
```

---

## 🔐 Security Shield (Authentication Flow)

1. User registers  
2. Password hashed using bcrypt  
3. JWT generated (7-day expiry)  
4. Token stored in localStorage  
5. Axios interceptor attaches token  
6. Protected routes verified via middleware  

---

## 🚀 Deployment Setup

### 🧪 Backend (Render)

- Root Directory → `server`
- Build Command → `npm install`
- Start Command → `node server.js`
- Environment Variables:
  - `MONGO_URI`
  - `JWT_SECRET`

---

### 🕸️ Frontend (Netlify)

- Base directory → `client`
- Build command → `npm run build`
- Publish directory → `client/dist`

Add `_redirects` file inside `client/public`:

```
/* /index.html 200
```

---

## 🔮 Future Upgrades (Next Spider Suit)

- ✏️ Edit/Delete logs
- 🎯 Weekly goals
- 📆 Monthly statistics
- 👤 Profile dashboard
- 🌗 Light/Dark theme toggle
- 📱 PWA support
- 📤 Data export (CSV)

---

## 💥 What This Project Demonstrates

- Full-stack MERN architecture
- Secure JWT authentication
- Protected API routes
- Production deployment workflow
- MongoDB Atlas integration
- API debugging & token handling
- Real-world state management
- Data visualization integration

---

## 👨‍💻 Author

**Papneet**  
*🕷️ Friendly Neighborhood Developer*

---

⭐ If this project helped you level up, give it a star!


