import React, { useState } from 'react';
import { FaCopy, FaCheck, FaUser, FaRobot } from 'react-icons/fa';
import { toast } from 'react-toastify';

/**
 * Component to render code blocks with syntax highlighting container and copy features
 */
const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!", { autoClose: 1500 });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="code-block-container my-3 rounded-3 overflow-hidden shadow-sm">
      <div className="code-block-header d-flex justify-content-between align-items-center px-3 py-2 bg-dark text-light border-bottom border-secondary">
        <span className="code-block-lang text-uppercase font-monospace fs-7 text-muted">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 py-1 px-2 text-white border-0"
          title="Copy Code"
        >
          {copied ? <FaCheck className="text-success" /> : <FaCopy />}
          <span className="fs-8">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="m-0 p-3 bg-black text-start overflow-auto" style={{ maxHeight: '400px' }}>
        <code className="font-monospace text-light-green fs-7" style={{ whiteSpace: 'pre' }}>
          {code}
        </code>
      </pre>
    </div>
  );
};

/**
 * Message element component
 */
const ChatMessage = ({ message }) => {
  const isBot = message.role === 'assistant' || message.role === 'model' || message.role === 'bot';
  const timestamp = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  // Parses inline code `code`
  const parseInlineCode = (text) => {
    if (!text) return '';
    const parts = text.split(/(`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const codeText = part.slice(1, -1);
        return (
          <code key={index} className="inline-code px-2 py-0.5 rounded text-danger bg-dark-subtle fw-semibold fs-7 font-monospace">
            {codeText}
          </code>
        );
      }
      return part;
    });
  };

  // Parses inline bold **bold**
  const parseInlineMarkdown = (text) => {
    if (!text) return '';
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="fw-bold text-white-emphasis">{parseInlineCode(boldText)}</strong>;
      }
      return <span key={index}>{parseInlineCode(part)}</span>;
    });
  };

  // Parses lists (* or -) and block titles line-by-line
  const renderMarkdownText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    const result = [];
    let currentList = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Bullets list items
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const content = trimmed.substring(2);
        currentList.push(<li key={`li-${index}`} className="mb-1">{parseInlineMarkdown(content)}</li>);
      } else {
        // Clear pending list first
        if (currentList.length > 0) {
          result.push(
            <ul key={`ul-${index}`} className="chat-msg-list ps-3 mb-2">
              {currentList}
            </ul>
          );
          currentList = [];
        }

        // Headers
        if (trimmed.startsWith('### ')) {
          result.push(<h6 key={`h3-${index}`} className="fw-bold mt-3 mb-2 text-white">{parseInlineMarkdown(trimmed.substring(4))}</h6>);
        } else if (trimmed.startsWith('## ')) {
          result.push(<h5 key={`h2-${index}`} className="fw-bold mt-3 mb-2 text-purple-accent">{parseInlineMarkdown(trimmed.substring(3))}</h5>);
        } else if (trimmed.startsWith('# ')) {
          result.push(<h4 key={`h1-${index}`} className="fw-bold mt-3 mb-2 text-gradient-purple">{parseInlineMarkdown(trimmed.substring(2))}</h4>);
        } else if (trimmed.length > 0) {
          result.push(<p key={`p-${index}`} className="mb-2 text-light-body">{parseInlineMarkdown(line)}</p>);
        } else {
          result.push(<div key={`br-${index}`} className="py-1" />);
        }
      }
    });

    if (currentList.length > 0) {
      result.push(
        <ul key={`ul-final`} className="chat-msg-list ps-3 mb-2">
          {currentList}
        </ul>
      );
    }

    return result;
  };

  // Splitting text by triple backtick code blocks
  const parseMessageContent = (text) => {
    if (!text) return null;
    const parts = text.split(/```/g);

    return parts.map((part, index) => {
      const isCodeBlock = index % 2 === 1;

      if (isCodeBlock) {
        const lines = part.split('\n');
        const firstLine = lines[0].trim();
        const isKnownLang = ['javascript', 'js', 'html', 'css', 'json', 'python', 'py', 'java', 'cpp', 'c', 'sql', 'bash', 'sh'].includes(firstLine.toLowerCase());

        const language = isKnownLang ? firstLine : 'code';
        const code = isKnownLang ? lines.slice(1).join('\n').trim() : part.trim();

        return <CodeBlock key={index} language={language} code={code} />;
      } else {
        return <React.Fragment key={index}>{renderMarkdownText(part)}</React.Fragment>;
      }
    });
  };

  return (
    <div className={`d-flex ${isBot ? 'justify-content-start' : 'justify-content-end'} mb-3 align-items-start gap-2`}>
      {isBot && (
        <div className="chat-avatar bot-avatar d-flex align-items-center justify-content-center bg-purple-gradient text-white rounded-circle shadow-sm">
          <FaRobot size={15} />
        </div>
      )}
      
      <div className={`chat-bubble-container max-w-75 ${isBot ? 'bot-bubble-wrapper' : 'user-bubble-wrapper'}`}>
        <div className={`chat-bubble px-3 py-2 rounded-3 shadow-sm ${isBot ? 'bot-bubble' : 'user-bubble bg-purple-gradient text-white'}`}>
          <div className="chat-text-content">
            {parseMessageContent(message.text || message.content)}
          </div>
          {timestamp && (
            <div className="chat-timestamp text-end fs-9 mt-1 text-muted opacity-75">
              {timestamp}
            </div>
          )}
        </div>
      </div>

      {!isBot && (
        <div className="chat-avatar user-avatar d-flex align-items-center justify-content-center bg-secondary text-white rounded-circle shadow-sm">
          <FaUser size={13} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
