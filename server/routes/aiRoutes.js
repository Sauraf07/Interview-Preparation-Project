const express = require("express");
const router = express.Router();
const { handleChat } = require("../controllers/aiController");
const jwt = require("jsonwebtoken");

/**
 * Optional Authentication Middleware
 * Decodes JWT token if present, but does not block the request if absent or invalid.
 */
const optionalProtect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
      };
    } catch {
      // Log warning but continue as guest
      console.warn("AI Chat: Invalid authorization token. Proceeding as guest.");
    }
  }

  next();
};

// POST /api/ai/chat
router.post("/chat", optionalProtect, handleChat);

module.exports = router;
