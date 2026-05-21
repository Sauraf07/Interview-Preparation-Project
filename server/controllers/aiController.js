const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const geminiService = require("../services/geminiService");
const User = require("../models/User");

/**
 * @desc    Get AI assistant chat response
 * @route   POST /api/ai/chat
 * @access  Public (Optional Authentication)
 */
const handleChat = asyncHandler(async (req, res, next) => {
  const { message, history, mode, resumeText } = req.body;

  if (!message) {
    throw new AppError("Message content is required", 400);
  }

  // 1. Load user details from database if authenticated
  let userContext = null;
  if (req.user && req.user.id) {
    try {
      const user = await User.findByPk(req.user.id);
      if (user) {
        userContext = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
    } catch (err) {
      console.error("Error fetching user context for Gemini:", err);
    }
  }

  try {
    // 2. Query the Gemini Service
    const reply = await geminiService.generateChatResponse(
      message,
      history || [],
      mode || "general",
      resumeText || "",
      userContext
    );

    // 3. Return the response
    res.status(200).json({
      success: true,
      data: {
        reply,
      },
    });
  } catch (error) {
    console.error("Gemini service execution error:", error);
    
    // Check if the error is due to an invalid or missing key
    if (error.message && error.message.includes("API Key")) {
      return next(new AppError(error.message, 503));
    }
    
    throw new AppError("Failed to generate AI response. Please try again later.", 500);
  }
});

module.exports = {
  handleChat,
};
