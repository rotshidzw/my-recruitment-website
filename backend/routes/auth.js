const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const tokenSecret = process.env.JWT_SECRET;

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    // Generate an authentication token using the token secret from env
    const token = jwt.sign({ userId: newUser._id }, tokenSecret, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set this to true if using HTTPS
      sameSite: 'strict', // Adjust this value based on your requirements
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Generate an authentication token using the token secret from env
    const token = jwt.sign({ userId: user._id }, tokenSecret, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set this to true if using HTTPS
      sameSite: 'strict', // Adjust this value based on your requirements
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  // Accessible only if the authentication token is valid
  res.json({ message: 'Protected route accessed successfully.' });
});

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    req.userId = decoded.userId;
    next();
  });
}
// ...

// GET /api/auth/user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    // Find the user based on the authenticated user ID
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return the user data
    res.json({ email: user.email, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});
// Import necessary modules


// Define a route handler for /api/user
router.get('/user', (req, res) => {
  // Retrieve user data from your data source (e.g., database)
  // Replace this with your logic to retrieve the user data
  const userData = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
  };

  // Send the user data as the response
  res.json(userData);
});

// Export the router
module.exports = router;

// ...


module.exports = router;
