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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Hide pulse after first open
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    const trimmed = input.trim();
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
        content: "I'm having trouble connecting right now. Please call us at +91 98260 35454 or try again in a moment."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What's the cost of solar?",
    "PM Surya Ghar subsidy?",
    "Installation process?",
  ];

  return (
    <>
      {/* Chat Widget Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-trigger"
        aria-label="Open chat assistant"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '90px',
          zIndex: 9998,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1)',
        }}
        onMouseEnter={(e) => { e.target.style.transform = isOpen ? 'scale(0.95) rotate(90deg)' : 'scale(1.1)'; e.target.style.boxShadow = '0 6px 28px rgba(249, 115, 22, 0.55)'; }}
        onMouseLeave={(e) => { e.target.style.transform = isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1)'; e.target.style.boxShadow = '0 4px 20px rgba(249, 115, 22, 0.4)'; }}
      >
        {isOpen ? (
          <X style={{ width: '24px', height: '24px', color: 'white' }} />
        ) : (
          <MessageCircle style={{ width: '24px', height: '24px', color: 'white' }} />
        )}
        {/* Pulse Ring */}
        {showPulse && !isOpen && (
          <span style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid rgba(249, 115, 22, 0.5)',
            animation: 'chatPulse 2s ease-in-out infinite',
          }} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          zIndex: 9999,
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '520px',
          maxHeight: 'calc(100vh - 120px)',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          animation: 'chatSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          background: '#ffffff',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Sparkles style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: 'white', fontWeight: 700, fontSize: '15px', margin: 0, lineHeight: 1.3 }}>SCA Solar Assistant</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0, fontWeight: 500 }}>Powered by AI • Typically replies instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X style={{ width: '16px', height: '16px', color: 'rgba(255,255,255,0.6)' }} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#f8fafc',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  animation: 'chatFadeIn 0.3s ease-out',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: msg.role === 'user' ? '#0f172a' : 'linear-gradient(135deg, #f97316, #ea580c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {msg.role === 'user' 
                    ? <User style={{ width: '14px', height: '14px', color: 'white' }} />
                    : <Bot style={{ width: '14px', height: '14px', color: 'white' }} />
                  }
                </div>
                {/* Bubble */}
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? '#0f172a' : '#ffffff',
                  color: msg.role === 'user' ? '#ffffff' : '#1e293b',
                  fontSize: '13.5px',
                  lineHeight: '1.55',
                  boxShadow: msg.role === 'user' ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
                  border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0',
                  wordBreak: 'break-word',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', animation: 'chatFadeIn 0.3s ease-out' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Bot style={{ width: '14px', height: '14px', color: 'white' }} />
                </div>
                <div style={{
                  padding: '12px 18px', borderRadius: '16px 16px 16px 4px',
                  background: '#ffffff', border: '1px solid #e2e8f0',
                  display: 'flex', gap: '4px', alignItems: 'center',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'chatDot 1.4s ease-in-out infinite', animationDelay: '0s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'chatDot 1.4s ease-in-out infinite', animationDelay: '0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'chatDot 1.4s ease-in-out infinite', animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            {/* Quick Questions (show only if just welcome msg) */}
            {messages.length === 1 && !isTyping && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(q); }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: '1px solid #e2e8f0',
                      background: 'white',
                      color: '#475569',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.target.style.borderColor = '#f97316'; e.target.style.color = '#f97316'; }}
                    onMouseLeave={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.color = '#475569'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{
            padding: '12px 16px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            background: '#ffffff',
            flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about solar..."
              disabled={isTyping}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                fontSize: '13.5px',
                outline: 'none',
                color: '#1e293b',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#f97316'; }}
              onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                border: 'none',
                background: input.trim() && !isTyping ? 'linear-gradient(135deg, #f97316, #ea580c)' : '#e2e8f0',
                cursor: input.trim() && !isTyping ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              {isTyping
                ? <Loader2 style={{ width: '18px', height: '18px', color: '#94a3b8', animation: 'spin 1s linear infinite' }} />
                : <Send style={{ width: '18px', height: '18px', color: input.trim() ? 'white' : '#94a3b8' }} />
              }
            </button>
          </form>

          {/* Powered by footer */}
          <div style={{
            textAlign: 'center',
            padding: '6px',
            background: '#f8fafc',
            borderTop: '1px solid #f1f5f9',
            flexShrink: 0,
          }}>
            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
              SCA Tech Solar • AI-Powered Support
            </p>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0; }
        }
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
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
