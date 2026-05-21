const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Service to interface with Google Gemini API
 */
class GeminiService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      console.warn("WARNING: GEMINI_API_KEY is not configured or is using the placeholder. AI Chatbot features will fail.");
      this.genAI = null;
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  /**
   * Helper to clean and map client chat history to Gemini's expected format
   */
  mapHistory(history) {
    if (!Array.isArray(history)) return [];

    return history
      .map((msg) => {
        let role = "user";
        if (msg.role === "assistant" || msg.role === "model" || msg.role === "bot") {
          role = "model";
        }
        
        // Gemini expects the text to be inside parts
        return {
          role: role,
          parts: [{ text: msg.text || msg.content || "" }],
        };
      })
      .filter((item) => item.parts[0].text.trim().length > 0);
  }

  /**
   * Generates a response from Gemini
   * @param {string} message - Current user message
   * @param {Array} history - Previous chat history
   * @param {string} mode - 'general' or 'mock'
   * @param {string} resumeText - Pasted resume content (optional)
   * @param {object} userContext - Current user metadata (optional, e.g. name)
   */
  async generateChatResponse(message, history = [], mode = "general", resumeText = "", userContext = null) {
    if (!this.genAI) {
      throw new Error(
        "Gemini API Key is not configured on the server. Please add GEMINI_API_KEY to your server/.env file to enable the AI Interview Assistant."
      );
    }

    // Use gemini-1.5-flash as default because of its speed, quality, and generous rate limits
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 1. Build beautiful, high-fidelity system instructions depending on the chatbot mode
    let systemInstruction = "";
    
    if (mode === "mock") {
      systemInstruction = `You are "InterviewPrep Mock Interviewer", a highly experienced Technical and HR Interviewer. 
Your goal is to conduct a realistic, high-quality, and interactive mock interview.

CRITICAL BEHAVIORAL INSTRUCTIONS:
1. Conduct the interview step-by-step. Ask ONLY ONE question at a time. Do NOT list multiple questions at once.
2. If this is the START of the interview (no prior message history), greet the candidate professionally. Ask a suitable, single opening question based on their resume (if provided) or their chosen technical focus (e.g. Frontend, Backend, Fullstack, DSA).
3. If the candidate answers a question, you MUST:
   - Provide a brief, constructive feedback/evaluation (grade or highlight what was strong and what could be improved).
   - Then, ask the NEXT relevant question (can be a follow-up or a new topic).
4. Keep your responses structured, clear, and highly professional.
5. If the candidate asks you to write code or explain something, briefly clarify, then guide them back into the mock interview.
6. The interview should cover a healthy mix of: resume projects, technical/language concepts, system design, coding logic, and HR/behavioral questions.

Candidate details:
- Name: ${userContext?.name || "Candidate"}
- Resume Context: ${resumeText ? `[Candidate pasted resume below]\n${resumeText}` : "No resume provided yet."}`;
    } else {
      systemInstruction = `You are "InterviewPrep AI Career Mentor", a world-class, multi-disciplinary tech industry mentor, DSA tutor, HR expert, and resume analyzer.
Your mission is to help candidates build key skills, master computer science fundamentals, optimize resumes, and feel fully prepared to ace their interviews.

CRITICAL RESPONSE GUIDELINES:
1. Tone: Professional, highly encouraging, beginner-friendly, structured, and insightful.
2. Coding & DSA: When explaining data structures, algorithms, or coding problems, always provide:
   - Clear explanation of the concept or logic.
   - Time & Space Complexity analysis (Big O notation).
   - Clean, elegant, and production-ready code examples wrapped in appropriate markdown code blocks with syntax specifying the language (e.g., \`\`\`javascript or \`\`\`cpp).
3. Resumes: Provide highly actionable, metric-oriented feedback (e.g., suggest using the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]").
4. Formatting: Use structured headers, markdown lists, bold accents, and code block wrapping to make your outputs incredibly legible and beautiful.
5. Personalization: Address the user warmly. ${userContext?.name ? `Their name is ${userContext.name}.` : ""}
6. If the user pastes resume details, perform a swift, deep analysis of their tech stack, project impacts, and potential improvement areas.

User Details:
- Name: ${userContext?.name || "User"}`;
    }

    // 2. Format history for Gemini SDK
    const formattedHistory = this.mapHistory(history);

    // 3. Initialize Gemini Chat Session with system instructions
    const chatSession = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: mode === "mock" ? 0.7 : 0.8, // lower temperature for more consistent interviewer behavior
      },
      // Note: System instruction is passed as systemInstruction in Gemini API
      systemInstruction: systemInstruction,
    });

    // 4. Send message to chat session
    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    return response.text();
  }
}

module.exports = new GeminiService();
