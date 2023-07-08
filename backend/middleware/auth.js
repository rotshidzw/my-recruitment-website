const jwt = require('jsonwebtoken');

// Middleware to verify the authentication token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  jwt.verify(token, '0545471d-a960-4a68-8f37-ffe4c6fe3e53', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Middleware to check if the user is an admin
exports.checkAdmin = (req, res, next) => {
  // Logic to check if the user is an admin

  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  next();
};
