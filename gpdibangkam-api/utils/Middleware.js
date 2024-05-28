const { createResponse } = require("./Response");
const { verifyToken } = require("./Auth");

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    createResponse(res, 401, false, "Tidak ada Token!");
  } else {
    try {
      verifyToken(token);
      next();
    } catch (error) {
      createResponse(res, 401, false, "Invalid token");
    }
  }
}

module.exports = {
  authenticateToken,
};
