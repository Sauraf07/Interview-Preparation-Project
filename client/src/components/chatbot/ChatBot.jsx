import React, { useState, useEffect, useRef } from 'react';
import { 
  FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser, 
  FaMicrophone, FaMicrophoneSlash, FaHistory, FaBriefcase, 
  FaGraduationCap, FaCode, FaFileAlt, FaToggleOn, FaToggleOff,
  FaSun, FaMoon
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import ChatMessage from './ChatMessage';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Advanced Features
  const [isMockMode, setIsMockMode] = useState(false);
  const [showResumePanel, setShowResumePanel] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLocalDarkMode, setIsLocalDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('interview_chat_theme');
    return savedTheme !== 'light';
  });
  
  useEffect(() => {
    localStorage.setItem('interview_chat_theme', isLocalDarkMode ? 'dark' : 'light');
  }, [isLocalDarkMode]);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Suggested Prompts configuration
  const suggestedPrompts = [
    { label: 'HR Questions', text: 'Help me prepare for standard behavioral and HR interview questions.', icon: <FaBriefcase /> },
    { label: 'DSA Help', text: 'Explain the sliding window technique and show a coding example.', icon: <FaCode /> },
    { label: 'Resume Tips', text: 'What is the XYZ formula for writing high-impact resume bullet points?', icon: <FaFileAlt /> },
    { label: 'Mock Interview', isMockTrigger: true, icon: <FaGraduationCap /> },
    { label: 'Company Prep', text: 'What strategies and topics should I focus on for a Google frontend interview?', icon: <FaRobot /> },
  ];

  // Load chat history and resume from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('interview_chat_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Set a nice default welcome message
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: "Hi there! 👋 I'm your AI Interview Assistant. I can help you master DSA concepts, review your resume, suggest HR mock strategies, or run an interactive mock interview. What would you like to prepare today?",
          timestamp: new Date().toISOString()
        }
      ]);
    }

    const savedResume = localStorage.getItem('interview_user_resume');
    if (savedResume) {
      setResumeText(savedResume);
    }

    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      rec.onerror = (e) => {
        console.error("Speech Recognition Error: ", e);
        setIsListening(false);
        toast.error("Speech recognition failed. Try speaking clearly or use a different browser.");
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('interview_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Toggles Speech Recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.info("Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Triggers API Call to backend
  const sendMessage = async (userMsgText, overrideMode = null) => {
    if (!userMsgText.trim()) return;

    const currentMode = overrideMode !== null ? overrideMode : (isMockMode ? 'mock' : 'general');
    
    // Add user message to UI
    const newMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: userMsgText,
      timestamp: new Date().toISOString()
    };
    
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setLoading(true);

    try {
      // Map history to format suitable for Gemini endpoint
      const response = await api.post('/ai/chat', {
        message: userMsgText,
        history: updatedMessages.slice(-15), // send last 15 messages for context
        mode: currentMode,
        resumeText: resumeText
      });

      if (response.data && response.data.success) {
        const botReply = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: response.data.data.reply,
          timestamp: new Date().toISOString()
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("AI Chatbot Error: ", err);
      const errMsg = err.response?.data?.message || "Oops! I encountered an error connecting to the AI brain. Please verify that the server is running and the Gemini API key is configured correctly.";
      
      const errorReply = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `⚠️ **System Error**: ${errMsg}`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  // Handles text area form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
  };

  // Handles clicking on suggestions
  const handleSuggestionClick = (prompt) => {
    if (prompt.isMockTrigger) {
      // Activate mock mode
      setIsMockMode(true);
      toast.info("Entering Live Mock Interview Mode! The AI will now act as your interviewer.", { autoClose: 2000 });
      
      const mockStartMsg = "I am ready for the mock interview. Let's begin!";
      sendMessage(mockStartMsg, 'mock');
    } else {
      sendMessage(prompt.text);
    }
  };

  // Handles clear chat history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your conversation history?")) {
      const defaultMsg = [
        {
          id: 'welcome',
          role: 'model',
          text: "History cleared! Let's start fresh. I'm your AI Interview Assistant. What are we preparing for today?",
          timestamp: new Date().toISOString()
        }
      ];
      setMessages(defaultMsg);
      localStorage.setItem('interview_chat_messages', JSON.stringify(defaultMsg));
      toast.success("Chat history cleared.");
    }
  };

  // Handles updating and saving resume
  const handleSaveResume = (e) => {
    e.preventDefault();
    localStorage.setItem('interview_user_resume', resumeText);
    toast.success("Resume pasted context successfully saved!");
    setShowResumePanel(false);
  };

  // Toggle mock interview mode manually
  const toggleMockMode = () => {
    const nextMode = !isMockMode;
    setIsMockMode(nextMode);
    
    if (nextMode) {
      toast.info("Switched to Mock Interview Mode. Type 'Start' or write a prompt to begin your session!", { autoClose: 2500 });
    } else {
      toast.info("Switched to General Mentorship Mode.", { autoClose: 2000 });
    }
  };

  return (
    <div className="chatbot-floating-wrapper">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-btn border-0 shadow-lg d-flex align-items-center justify-content-center text-white bg-purple-gradient rounded-circle ${isOpen ? 'active-pulse' : ''}`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <FaTimes size={22} /> : <FaComments size={24} />}
      </button>

      {/* Main Glassmorphic Assistant Widget */}
      <div className={`chatbot-window card border-0 shadow-2xl ${isOpen ? 'show' : ''} ${isLocalDarkMode ? 'dark-theme' : 'light-theme'}`}>
        
        {/* Chat Widget Header */}
        <div className="chatbot-header d-flex align-items-center justify-content-between px-3 py-2 bg-dark-app border-bottom border-secondary text-white rounded-top-3">
          <div className="d-flex align-items-center gap-2">
            <div className="chatbot-header-logo d-flex align-items-center justify-content-center bg-purple-gradient text-white rounded-circle shadow-sm">
              <FaRobot size={15} />
            </div>
            <div>
              <h6 className="m-0 fw-bold fs-7">InterviewPrep AI</h6>
              <span className="fs-9 text-muted d-flex align-items-center gap-1">
                <span className={`status-dot ${loading ? 'status-typing' : 'status-online'}`} />
                {loading ? 'AI is thinking...' : (isMockMode ? 'Mock Interview Active' : 'Career Mentor Online')}
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Mock Interview Mode Toggle Button */}
            <button 
              onClick={toggleMockMode}
              className="btn btn-sm btn-link text-white p-0 d-flex align-items-center gap-1 border-0 decoration-none fs-8"
              title="Toggle Mock Interview Mode"
            >
              {isMockMode ? (
                <>
                  <FaToggleOn size={18} className="text-success" />
                  <span className="text-success fw-semibold">Mock Mode</span>
                </>
              ) : (
                <>
                  <FaToggleOff size={18} className="text-muted" />
                  <span className="text-muted">Mock Mode</span>
                </>
              )}
            </button>

            {/* Theme Toggle - Sun & Moon Icons */}
            <div className="d-flex align-items-center gap-1 bg-black bg-opacity-30 rounded-pill p-1 border border-secondary-subtle ms-1" style={{ height: '26px' }}>
              <button 
                onClick={() => setIsLocalDarkMode(false)}
                className={`btn btn-sm p-0 d-flex align-items-center justify-content-center border-0 rounded-circle ${!isLocalDarkMode ? 'shadow-sm' : 'text-muted'}`}
                title="Switch to Light Mode"
                type="button"
                style={{ 
                  width: '18px', 
                  height: '18px', 
                  transition: 'all 0.2s ease', 
                  cursor: 'pointer',
                  backgroundColor: !isLocalDarkMode ? '#ffc107' : 'transparent',
                  color: !isLocalDarkMode ? '#000000' : 'rgba(255, 255, 255, 0.6)',
                  opacity: !isLocalDarkMode ? '1' : '0.5'
                }}
              >
                <FaSun size={11} />
              </button>
              <button 
                onClick={() => setIsLocalDarkMode(true)}
                className={`btn btn-sm p-0 d-flex align-items-center justify-content-center border-0 rounded-circle ${isLocalDarkMode ? 'shadow-sm' : 'text-muted'}`}
                title="Switch to Night Mode"
                type="button"
                style={{ 
                  width: '18px', 
                  height: '18px', 
                  transition: 'all 0.2s ease', 
                  cursor: 'pointer',
                  backgroundColor: isLocalDarkMode ? '#6366f1' : 'transparent',
                  color: isLocalDarkMode ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                  opacity: isLocalDarkMode ? '1' : '0.5'
                }}
              >
                <FaMoon size={11} />
              </button>
            </div>

            {/* Clear History Icon */}
            <button
              onClick={handleClearHistory}
              className="btn btn-sm btn-outline-secondary border-0 p-1 text-white opacity-75 hover-opacity-100"
              title="Clear History"
            >
              <FaHistory size={13} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-outline-secondary border-0 p-1 text-white"
              title="Close Chat"
            >
              <FaTimes size={15} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Resume vs Chat) */}
        <div className="chatbot-tabs d-flex border-bottom border-secondary-subtle bg-dark-subtle px-2 py-1 gap-1">
          <button
            onClick={() => setShowResumePanel(false)}
            className={`btn btn-sm py-1 px-3 fs-8 border-0 rounded-2 ${!showResumePanel ? 'bg-purple-accent text-white fw-bold' : 'text-muted'}`}
          >
            Assistant Chat
          </button>
          <button
            onClick={() => setShowResumePanel(true)}
            className={`btn btn-sm py-1 px-3 fs-8 border-0 rounded-2 d-flex align-items-center gap-1 ${showResumePanel ? 'bg-purple-accent text-white fw-bold' : 'text-muted'}`}
          >
            <FaFileAlt size={11} />
            Paste Resume
          </button>
        </div>

        {showResumePanel ? (
          /* Resume Upload/Paste Context Panel */
          <div className="chatbot-body bg-dark-bubble p-3 d-flex flex-column justify-content-between" style={{ height: '360px' }}>
            <form onSubmit={handleSaveResume} className="h-100 d-flex flex-column justify-content-between">
              <div>
                <label className="text-white-emphasis fs-8 fw-semibold mb-1 d-block">
                  Paste Resume Context (Text only):
                </label>
                <p className="text-muted fs-9 mb-2">
                  Paste details (Tech stack, experiences, education) below. The AI will read this context automatically to personalize HR questions, analyze DSA alignments, and give mock reviews!
                </p>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your skills, experience highlights, and project bullet points here..."
                  className="form-control form-control-sm bg-black text-light border-secondary text-area-resize-none fs-8"
                  rows="9"
                  style={{ resize: 'none' }}
                />
              </div>
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowResumePanel(false)}
                  className="btn btn-sm btn-outline-secondary fs-8"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-purple fs-8 text-white fw-semibold"
                >
                  Save Context
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Main Interactive Chat Panel */
          <>
            <div className="chatbot-body bg-dark-bubble px-3 py-2 overflow-auto" style={{ height: '310px' }}>
              
              {/* Loop chat message bubbles */}
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Bot typing bubble animated indicator */}
              {loading && (
                <div className="d-flex justify-content-start mb-3 align-items-start gap-2">
                  <div className="chat-avatar bot-avatar d-flex align-items-center justify-content-center bg-purple-gradient text-white rounded-circle shadow-sm">
                    <FaRobot size={15} />
                  </div>
                  <div className="chat-bubble px-3 py-2 rounded-3 bot-bubble bg-dark-card shadow-sm d-flex align-items-center gap-1">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggested Prompts Bar */}
            <div className="chatbot-suggestions d-flex gap-1 overflow-x-auto px-3 py-2 bg-dark-subtle border-top border-bottom border-secondary-subtle scrollbar-hide">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(prompt)}
                  className="btn btn-sm btn-outline-purple flex-shrink-0 d-flex align-items-center gap-1 rounded-pill py-1 px-2.5 fs-8 text-white-50"
                >
                  {prompt.icon}
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>

            {/* User Input Text Area & Tools Box */}
            <form onSubmit={handleSubmit} className="chatbot-input-area p-2 bg-dark-app rounded-bottom-3 border-top border-secondary">
              <div className="input-group align-items-center bg-black rounded-3 border border-secondary px-2 py-1">
                
                {/* Voice Dictation Control Icon */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`btn border-0 p-1 rounded-circle d-flex align-items-center justify-content-center ${isListening ? 'text-success glow-pulse bg-success-subtle' : 'text-secondary hover-text-white'}`}
                  title={isListening ? 'Listening... Click to Stop' : 'Voice Input (Speech-to-Text)'}
                >
                  {isListening ? <FaMicrophone size={14} /> : <FaMicrophoneSlash size={14} />}
                </button>

                {/* Main input text field */}
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={isMockMode ? "Type your interview answer..." : "Ask your coding/career question..."}
                  disabled={loading}
                  className="form-control bg-transparent text-light border-0 shadow-none fs-8"
                  style={{ height: '32px' }}
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="btn btn-link text-purple border-0 p-1 d-flex align-items-center justify-content-center"
                  style={{ cursor: loading || !inputMessage.trim() ? 'not-allowed' : 'pointer' }}
                >
                  <FaPaperPlane size={14} className={loading || !inputMessage.trim() ? 'text-secondary' : 'text-purple-accent'} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
