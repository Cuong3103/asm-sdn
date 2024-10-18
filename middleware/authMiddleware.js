const jwt = require("jsonwebtoken");
const secretKey = "myverysecretkey";

const authenticateJWT = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateJWT;
