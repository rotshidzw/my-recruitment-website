const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Middleware to verify the authentication token and set user in request
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Middleware to check if the user is an admin
exports.checkAdmin = (req, res, next) => {
  // Assuming you have a User model and the user object is attached to req.user
  const user = req.user;

  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  next();
};

// Middleware to set the authentication token as a cookie
exports.setAuthCookie = (req, res, next) => {
  const token = req.token;

  // Set the token as a cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: true, // Set this to true if using HTTPS
    sameSite: 'strict', // Adjust this value based on your requirements
  });

  next();
};

// Middleware to clear the authentication token cookie
exports.clearAuthCookie = (req, res, next) => {
  res.clearCookie('token');

  next();
};
