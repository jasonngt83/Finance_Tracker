// create api's profile , login , register
// for showing profile we need user token to be passed

require("dotenv").config();
const express = require("express");
const db = require("./models/index.js"); // Import database connection and models
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
// const { Pool } = require("pg");
const authRoutes = require("./routes/auth.js");
const sequelize = require("./db/connection.js");
//const bodyParser = require("body-parser");
const path = require("path");

const { User } = require("./models/index.js");

const PORT = process.env.PORT || 3001;



const app = express();

// app.use(cors({
//   origin: "http://localhost:5174", // Allow requests from frontend
//   methods: "GET,POST,PUT,DELETE",  // Allowed HTTP methods
//   credentials: true                // Allow cookies/auth headers
// }));

app.use(express.json());
app.use(cors());

// middleware for serving static file in the client

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.send("Welcome to Budget Buddy API");});


app.use("/api/auth", authRoutes);



//let jwtAuthToken = ""

// // PostgreSQL Connection
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: "localhost",
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: 5432,
// });

// Secret Key
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ** User Registration **

app.post("/users", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await db.User.create({ username, email, password });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get All Users
  app.get("/users", async (req, res) => {
    const users = await db.User.findAll();
    res.json(users);
  });

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // const result = await pool.query(
    //   "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    //   [username, email, hashedPassword]
    // );
    const result = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ** User Login **
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    // if (user.rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ** Protected Route **
app.get("/profile", verifyToken, async (req, res) => {
  try {
    // const user = await pool.query("SELECT id, username, email FROM users WHERE id = $1", 
    //     [req.user.id]);

    const user = await User.findOne(
      { where: { id: req.user.id }, 
      attributes: ['id', 'username',  'email'] }
    );
    if(!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ** Middleware: Verify JWT **
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  console.log(token)
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

// Start Server
// app.listen(5000, () => console.log("Server running on port 5000"));

// serve the index file in the client folder
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
})


sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
