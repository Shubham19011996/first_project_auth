const jwt = require("jsonwebtoken");
function middleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    res.status(403).send({ message: "you are not logged in" });
    return;
  }
  const decode = jwt.verify(token, "shubham96");
  const username = decode.username;

  if (!username) {
    res.status(403).json({ message: "malformed token" });
    return;
  }

  req.username = username;
  next();
}
module.exports = {
  middleware,
};
