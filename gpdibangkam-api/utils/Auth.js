const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenExpirySeconds = parseInt(
  process.env.REFRESH_TOKEN_EXPIRY_SECONDS
);

function generateToken(user, expiresIn = "30m") {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, secretKey, { expiresIn });
}

function generateRefreshToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, refreshTokenSecretKey);
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

function verifyRefreshToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
