const geoip = require('geoip-lite');

// Function to get the country of the user based on IP geolocation or other methods
exports.getCountry = (req, res, next) => {
  // Logic to determine the country of the user based on IP geolocation or other methods
  const ip = req.ip; // Assuming Express.js sets the client IP in the req.ip property

  // Example using geoip-lite package to get the country from the IP
  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : 'Unknown';

  // Store the country in the session for pre-filling fields or other purposes
  req.session.country = country;

  next();
};
