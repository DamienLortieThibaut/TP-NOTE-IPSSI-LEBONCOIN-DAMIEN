const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).send("Authorization header manquant");
    }
  
    const token = authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).send("Token manquant");
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send("Token invalide");
    }
  };
  
  module.exports = authMiddleware;