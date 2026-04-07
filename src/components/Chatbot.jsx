"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from 'lucide-react';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hey there! ☀️ I'm SCA Solar Assistant. Ask me anything about solar panels, installation costs, subsidies, or our services. How can I help you go solar today?"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);
  useEffect(() => { if (isOpen) setShowPulse(false); }, [isOpen]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isTyping) return;

    const userMsg = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.filter(m => m !== WELCOME_MESSAGE) }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please call us at +91 98260 35454 or try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "Solar panel cost?",
    "PM Surya Ghar subsidy?",
    "Installation timeline?",
  ];

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat assistant"
        className="chatbot-trigger-btn"
      >
        {isOpen
          ? <X className="chatbot-trigger-icon" />
          : <MessageCircle className="chatbot-trigger-icon" />
        }
        {showPulse && !isOpen && <span className="chatbot-pulse-ring" />}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">
              <Sparkles style={{ width: 18, height: 18, color: '#fff' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="chatbot-header-title">SCA Solar Assistant</p>
              <p className="chatbot-header-sub">AI-Powered • Replies instantly</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="chatbot-header-close">
              <X style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg-row ${msg.role === 'user' ? 'chatbot-msg-user' : 'chatbot-msg-bot'}`}>
                <div className={`chatbot-avatar ${msg.role === 'user' ? 'chatbot-avatar-user' : 'chatbot-avatar-bot'}`}>
                  {msg.role === 'user'
                    ? <User style={{ width: 13, height: 13, color: '#fff' }} />
                    : <Bot style={{ width: 13, height: 13, color: '#fff' }} />
                  }
                </div>
                <div className={`chatbot-bubble ${msg.role === 'user' ? 'chatbot-bubble-user' : 'chatbot-bubble-bot'}`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg-row chatbot-msg-bot">
                <div className="chatbot-avatar chatbot-avatar-bot">
                  <Bot style={{ width: 13, height: 13, color: '#fff' }} />
                </div>
                <div className="chatbot-bubble chatbot-bubble-bot chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {messages.length === 1 && !isTyping && (
              <div className="chatbot-quick-wrap">
                {quickQuestions.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)} className="chatbot-quick-btn">{q}</button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="chatbot-input-bar">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about solar..."
              disabled={isTyping}
              className="chatbot-input"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`chatbot-send-btn ${input.trim() && !isTyping ? 'active' : ''}`}
            >
              {isTyping
                ? <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} />
                : <Send style={{ width: 16, height: 16 }} />
              }
            </button>
          </form>

          <div className="chatbot-footer">
            SCA Tech Solar • AI-Powered Support
          </div>
        </div>
      )}

      <style jsx global>{`
        /* ── Trigger Button ── */
        .chatbot-trigger-btn {
          position: fixed; bottom: 20px; right: 20px; z-index: 9998;
          width: 52px; height: 52px; border-radius: 50%;
          background: #171717; border: 2px solid rgba(255,255,255,0.1);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .chatbot-trigger-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 32px rgba(0,0,0,0.4);
          background: #262626;
        }
        .chatbot-trigger-icon { width: 22px; height: 22px; color: #e5e5e5; }
        .chatbot-pulse-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid rgba(115,115,115,0.4);
          animation: chatPulse 2s ease-in-out infinite;
        }

        /* ── Chat Window ── */
        .chatbot-window {
          position: fixed; bottom: 82px; right: 16px; z-index: 9999;
          width: 360px; max-width: calc(100vw - 32px);
          height: 500px; max-height: calc(100vh - 110px);
          border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
          animation: chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: #fafafa;
        }

        /* ── Header ── */
        .chatbot-header {
          background: #0a0a0a; padding: 14px 16px;
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .chatbot-header-avatar {
          width: 36px; height: 36px; border-radius: 10px;
          background: #262626; border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .chatbot-header-title {
          color: #f5f5f5; font-weight: 600; font-size: 14px;
          margin: 0; line-height: 1.2; letter-spacing: -0.01em;
        }
        .chatbot-header-sub {
          color: rgba(255,255,255,0.35); font-size: 11px;
          margin: 0; font-weight: 500;
        }
        .chatbot-header-close {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px; width: 30px; height: 30px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4); transition: all 0.2s;
        }
        .chatbot-header-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

        /* ── Messages ── */
        .chatbot-messages {
          flex: 1; overflow-y: auto; padding: 14px;
          display: flex; flex-direction: column; gap: 10px;
          background: #fafafa;
        }
        .chatbot-msg-row {
          display: flex; gap: 7px; align-items: flex-end;
          animation: chatFadeIn 0.25s ease-out;
        }
        .chatbot-msg-user { flex-direction: row-reverse; }

        .chatbot-avatar {
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .chatbot-avatar-bot { background: #171717; }
        .chatbot-avatar-user { background: #404040; }

        .chatbot-bubble {
          max-width: 78%; padding: 9px 13px;
          font-size: 13px; line-height: 1.5; word-break: break-word;
        }
        .chatbot-bubble-bot {
          background: #fff; color: #171717;
          border-radius: 14px 14px 14px 4px;
          border: 1px solid #e5e5e5;
        }
        .chatbot-bubble-user {
          background: #171717; color: #f5f5f5;
          border-radius: 14px 14px 4px 14px;
        }

        /* Typing dots */
        .chatbot-typing {
          display: flex; gap: 5px; align-items: center;
          padding: 12px 18px;
        }
        .chatbot-typing span {
          width: 6px; height: 6px; border-radius: 50%;
          background: #a3a3a3;
          animation: chatDot 1.4s ease-in-out infinite;
        }
        .chatbot-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-typing span:nth-child(3) { animation-delay: 0.4s; }

        /* Quick questions */
        .chatbot-quick-wrap {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px;
        }
        .chatbot-quick-btn {
          padding: 5px 11px; border-radius: 20px;
          border: 1px solid #d4d4d4; background: #fff;
          color: #525252; font-size: 11.5px; cursor: pointer;
          font-weight: 500; transition: all 0.2s;
        }
        .chatbot-quick-btn:hover {
          border-color: #171717; color: #171717; background: #f5f5f5;
        }

        /* ── Input Bar ── */
        .chatbot-input-bar {
          padding: 10px 12px; border-top: 1px solid #e5e5e5;
          display: flex; gap: 8px; align-items: center;
          background: #fff; flex-shrink: 0;
        }
        .chatbot-input {
          flex: 1; padding: 9px 12px; border-radius: 10px;
          border: 1px solid #e5e5e5; background: #fafafa;
          font-size: 13px; outline: none; color: #171717;
          transition: border-color 0.2s;
        }
        .chatbot-input:focus { border-color: #404040; }
        .chatbot-input::placeholder { color: #a3a3a3; }

        .chatbot-send-btn {
          width: 36px; height: 36px; border-radius: 10px;
          border: none; background: #e5e5e5; cursor: default;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0; color: #a3a3a3;
        }
        .chatbot-send-btn.active {
          background: #171717; cursor: pointer; color: #fff;
        }
        .chatbot-send-btn.active:hover { background: #262626; }

        /* ── Footer ── */
        .chatbot-footer {
          text-align: center; padding: 6px;
          background: #f5f5f5; border-top: 1px solid #ebebeb;
          font-size: 10px; color: #a3a3a3; font-weight: 500;
          flex-shrink: 0;
        }

        /* ── Mobile: Compact floating dialog ── */
        @media (max-width: 480px) {
          .chatbot-trigger-btn {
            bottom: 16px; right: 16px;
            width: 48px; height: 48px;
          }
          .chatbot-trigger-icon { width: 20px; height: 20px; }
          .chatbot-window {
            bottom: 74px; right: 12px; left: auto;
            width: calc(100vw - 24px); max-width: 340px;
            height: 420px; max-height: calc(100vh - 100px);
            border-radius: 16px;
            animation: chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }

        /* ── Animations ── */
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatSlideUpMobile {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
