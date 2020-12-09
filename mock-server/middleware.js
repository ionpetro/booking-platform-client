module.exports = (req, res, next) => {
  // mock response for login
  const {username} = req.body;
  if (!(req.method === 'POST' && req.url === '/users')) {
    next();
    return;
  }
  res.jsonp({
    username,
    role: 'user',
    firstName: username,
    lastName: username,
    accessToken: 'My secure JWT token',
    refreshToken: 'My secure JWT refresh token'
  });
};
