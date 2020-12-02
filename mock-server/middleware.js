module.exports = (req, res, next) => {
  // mock response for login
  if (req.method === 'POST' && req.url === '/users') {
    res.jsonp({
      username: req.body.username,
      role: 'user',
      firstName: `Mr ${req.body.username}`,
      lastName: `Mr ${req.body.username}`,
      jwtAuth: 'My secure JWT token',
      jwtRefresh: 'My secure JWT refresh token'
    });
  } else {
    // let db.json handle any other requests
    next();
  }
};
