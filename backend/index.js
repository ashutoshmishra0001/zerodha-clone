const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv");
const path = require('path');
const passportLocalMongoose = require('passport-local-mongoose');

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// --- CORS Configuration ---
const allowedOrigins = [
    process.env.FRONTEND_URL,  // e.g., https://zerodha-clone-frontend.onrender.com
    process.env.DASHBOARD_URL, // e.g., https://zerodha-clone-dashboard.onrender.com
    'http://localhost:3000',   // For local frontend development
    'http://localhost:3001'    // For local dashboard development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // or if the origin is in our allowed list.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`CORS Error: The origin ${origin} is not allowed.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connection successful."))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(session({
  secret: process.env.SESSION_SECRET || 'a-very-strong-secret-for-your-college-project',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    // SameSite attribute is important for cross-domain cookies
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// This is needed for the sameSite: 'none' cookie setting to work
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}


app.use(passport.initialize());
app.use(passport.session());

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
});
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsModel');
const { OrdersModel } = require('./model/OrdersModel');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Access Denied: Please log in to continue." });
}

app.post('/api/register', (req, res) => {
  User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Registration failed.", error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.status(201).json({ message: "User registered and logged in.", user: req.user });
    });
  });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: "Login successful.", user: req.user });
});

app.post('/api/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({ message: "Logout successful." });
  });
});

app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

app.get('/api/holdings', isAuthenticated, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({ userId: req.user._id });
    res.json(holdings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching holdings.", error: error.message });
  }
});

app.post('/api/trade', isAuthenticated, async (req, res) => {
    const { name, qty, price, mode } = req.body;
    const userId = req.user._id;
    const quantity = parseInt(qty, 10);
    const tradePrice = parseFloat(price);

    const newOrder = new OrdersModel({ name, qty: quantity, price: tradePrice, mode, userId });
    await newOrder.save();

    if (mode === 'BUY') {
        try {
            let holding = await HoldingsModel.findOne({ name: name, userId: userId });

            if (holding) {
                const totalValue = (holding.avg * holding.qty) + (tradePrice * quantity);
                const totalQty = holding.qty + quantity;
                holding.avg = totalValue / totalQty;
                holding.qty = totalQty;
                holding.price = tradePrice;
            } else {
                holding = new HoldingsModel({
                    name,
                    qty: quantity,
                    avg: tradePrice,
                    price: tradePrice,
                    net: "0.00%",
                    day: "0.00%",
                    userId
                });
            }
            const updatedHolding = await holding.save();
            res.status(200).json({ message: 'Buy successful', holding: updatedHolding });
        } catch (error) {
            res.status(500).json({ message: 'Error processing buy order', error: error.message });
        }
    } else if (mode === 'SELL') {
        try {
            let holding = await HoldingsModel.findOne({ name: name, userId: userId });

            if (!holding || holding.qty < quantity) {
                return res.status(400).json({ message: 'Sell failed: Not enough shares to sell.' });
            }

            holding.qty -= quantity;

            if (holding.qty === 0) {
                await HoldingsModel.deleteOne({ _id: holding._id });
                res.status(200).json({ message: 'Sell successful, holding removed.' });
            } else {
                holding.price = tradePrice;
                const updatedHolding = await holding.save();
                res.status(200).json({ message: 'Sell successful', holding: updatedHolding });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error processing sell order', error: error.message });
        }
    } else {
        res.status(400).json({ message: 'Invalid trade mode specified.' });
    }
});

app.listen(port, () => {
  console.log(`Zerodha Clone Backend listening on http://localhost:${port}`);
});