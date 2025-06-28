const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'secret', (err, user) => {
      if (err || (roles.length && !roles.includes(user.role))) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
};