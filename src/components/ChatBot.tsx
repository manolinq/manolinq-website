import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Bot, ChevronDown, MessageCircle } from 'lucide-react';

const WA_LINK =
  'https://wa.me/32456326720?text=Hey%2C%20I%27m%20interested%20in%20a%20website%20or%20AI%20system.%20Can%20you%20take%20a%20quick%20look%20at%20my%20business%3F';

const WELCOME =
  "Hey, I'm the Manolinq AI Assistant. I can answer questions about websites, landing pages, AI assistants, pricing and how to get started.";

interface Message {
  role: 'bot' | 'user';
  text: string;
}

interface QuickBtn {
  label: string;
  query: string;
}

const QUICK_BTNS: QuickBtn[] = [
  { label: 'What do you build?',           query: 'What do you build?' },
  { label: 'What does it cost?',           query: 'What does it cost?' },
  { label: 'How long does it take?',       query: 'How long does it take?' },
  { label: 'Can you build an AI chatbot?', query: 'Can you build an AI chatbot?' },
  { label: 'I want a free audit',          query: 'I want a free audit' },
];

const RESPONSES: Record<string, string> = {
  services:
    'Manolinq builds premium business websites, landing pages, AI assistants and automation systems designed to help businesses get more leads, bookings and clients.',
  pricing:
    'Our packages start from €500 for a Starter Website, €750 for a Business Website, and €1,250 for a Website + AI System. Final pricing depends on pages, content, integrations and project scope.',
  timeline:
    'Most basic websites can get a first preview within 48 hours. Full project timelines depend on the size of the website, content, revisions and integrations.',
  chatbot:
    'Yes. We can build AI assistants that answer customer questions, qualify leads and guide visitors toward booking or contacting your business.',
  audit:
    "You can request a free website audit through the contact form. We'll review your website, social page or business idea and send clear next-step recommendations.",
  contact:
    'You can use the contact form, email support.manolinq@gmail.com, or message directly on WhatsApp.',
  fallback:
    'Good question. The best next step is to request a free audit so we can look at your business and recommend the right setup.',
};

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (/build|service|offer|make|create|do you do/.test(q)) return RESPONSES.services;
  if (/cost|price|pricing|package|rate|how much|€|euro/.test(q)) return RESPONSES.pricing;
  if (/how long|timeline|time|fast|quick|days|hours|week/.test(q)) return RESPONSES.timeline;
  if (/ai|chatbot|bot|assistant|chat|automat/.test(q)) return RESPONSES.chatbot;
  if (/audit|free|review|look at|check/.test(q)) return RESPONSES.audit;
  if (/contact|email|whatsapp|reach|get in touch|talk/.test(q)) return RESPONSES.contact;
  return RESPONSES.fallback;
}

/* ─────────────────────────────────────────────
   Chat window
───────────────────────────────────────────── */
function ChatWindow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 320);
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setShowQuick(false);
    setMessages((p) => [...p, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((p) => [...p, { role: 'bot', text: getResponse(trimmed) }]);
    }, 820);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden
                 transition-all duration-300 origin-bottom-right"
      style={{
        maxHeight: open ? 560 : 0,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(10px)',
        width: '100%',
        background: 'linear-gradient(160deg, #0f0f20 0%, #09090f 100%)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow:
          '0 32px 80px rgba(0,0,0,0.75),' +
          '0 0 0 1px rgba(12,147,232,0.08),' +
          '0 0 60px rgba(12,147,232,0.07),' +
          'inset 0 1px 0 rgba(255,255,255,0.045)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
        style={{
          background: 'rgba(255,255,255,0.025)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(12,147,232,0.15)',
            border: '1px solid rgba(12,147,232,0.25)',
            boxShadow: '0 0 14px rgba(12,147,232,0.18)',
          }}
        >
          <Bot size={15} strokeWidth={2} style={{ color: '#36aff7' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold leading-none mb-[3px] truncate"
            style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.84rem' }}
          >
            Manolinq AI Assistant
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.7)' }}
            />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem' }}>Online</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150"
          style={{ color: 'rgba(255,255,255,0.3)', background: 'transparent' }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.color = 'rgba(255,255,255,0.7)';
            el.style.background = 'rgba(255,255,255,0.06)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.color = 'rgba(255,255,255,0.3)';
            el.style.background = 'transparent';
          }}
          aria-label="Close chat"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[82%] rounded-2xl px-4 py-2.5"
              style={
                msg.role === 'bot'
                  ? {
                      background: 'rgba(255,255,255,0.045)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'rgba(226,226,232,0.82)',
                      fontSize: '0.84rem',
                      lineHeight: 1.65,
                      borderTopLeftRadius: 6,
                    }
                  : {
                      background: 'linear-gradient(135deg, #1a9ef5 0%, #0a88d8 100%)',
                      color: '#fff',
                      fontSize: '0.84rem',
                      lineHeight: 1.65,
                      borderTopRightRadius: 6,
                      boxShadow: '0 2px 12px rgba(12,147,232,0.3)',
                    }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-[4px]"
              style={{
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderTopLeftRadius: 6,
              }}
            >
              {[0, 160, 320].map((d) => (
                <span
                  key={d}
                  className="w-[6px] h-[6px] rounded-full animate-bounce"
                  style={{
                    background: 'rgba(54,175,247,0.6)',
                    animationDelay: `${d}ms`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {showQuick && !typing && (
          <div className="flex flex-wrap gap-2 pt-1">
            {QUICK_BTNS.map((btn) => (
              <button
                key={btn.label}
                onClick={() => sendMessage(btn.query)}
                className="rounded-full px-3 py-1.5 text-[0.75rem] font-medium transition-all duration-150"
                style={{
                  background: 'rgba(12,147,232,0.1)',
                  border: '1px solid rgba(12,147,232,0.22)',
                  color: 'rgba(147,212,253,0.85)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'rgba(12,147,232,0.18)';
                  el.style.borderColor = 'rgba(12,147,232,0.4)';
                  el.style.color = '#93d4fd';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'rgba(12,147,232,0.1)';
                  el.style.borderColor = 'rgba(12,147,232,0.22)';
                  el.style.color = 'rgba(147,212,253,0.85)';
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {messages.length > 1 && !typing && (
          <div className="flex flex-col gap-2 pt-2">
            <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="flex flex-wrap gap-2">
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5
                           text-[0.75rem] font-semibold text-white transition-all duration-150"
                style={{
                  background: 'linear-gradient(135deg, #1a9ef5 0%, #0a88d8 100%)',
                  boxShadow: '0 2px 10px rgba(12,147,232,0.3)',
                }}
              >
                Request Free Audit
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5
                           text-[0.75rem] font-semibold transition-all duration-150"
                style={{
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.22)',
                  color: 'rgba(134,239,172,0.85)',
                }}
              >
                Message on WhatsApp
              </a>
              <Link
                to="/pricing"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5
                           text-[0.75rem] font-medium transition-all duration-150"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(226,226,232,0.5)',
                }}
              >
                View Packages
                <ChevronDown size={11} strokeWidth={2} style={{ transform: 'rotate(-90deg)' }} />
              </Link>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="flex-1 rounded-xl px-4 py-2.5 text-[0.83rem] outline-none transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(226,226,232,0.85)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = '1px solid rgba(12,147,232,0.4)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(12,147,232,0.08)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150"
            style={{
              background:
                input.trim() && !typing
                  ? 'linear-gradient(135deg, #1a9ef5 0%, #0a88d8 100%)'
                  : 'rgba(255,255,255,0.05)',
              color: input.trim() && !typing ? '#fff' : 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: input.trim() && !typing ? '0 2px 10px rgba(12,147,232,0.3)' : 'none',
              cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
            }}
          >
            <Send size={13} strokeWidth={2} />
          </button>
        </form>
        <p className="text-center mt-2" style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.67rem' }}>
          Demo assistant — for full details, request a free audit.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Floating dock (exported)
───────────────────────────────────────────── */
export default function ChatBot() {
  const [chatOpen, setChatOpen] = useState(false);
  // Mobile expand state: show/hide the two option buttons
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const toggleChat = () => {
    setChatOpen((v) => !v);
    setMobileExpanded(false);
  };

  return (
    /* Fixed dock — bottom-right anchor with safe-area awareness */
    <div
      className="fixed z-50"
      style={{
        right: 'max(16px, env(safe-area-inset-right, 16px))',
        bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* ── Chat window — always rendered, animated open/close ── */}
      <div
        className="mb-3"
        style={{ width: 370, maxWidth: 'calc(100vw - 32px)' }}
      >
        <ChatWindow open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      {/* ══ DESKTOP dock (sm and up) ══ */}
      <div className="hidden sm:flex flex-col items-end gap-2.5">

        {/* WhatsApp — hidden when chat is open */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center rounded-full
                     transition-all duration-200 hover:-translate-y-[2px]"
          style={{
            width: 44,
            height: 44,
            minWidth: 44,
            background: 'rgba(22,163,74,0.15)',
            border: '1px solid rgba(34,197,94,0.28)',
            boxShadow: '0 4px 18px rgba(34,197,94,0.18), 0 0 0 1px rgba(34,197,94,0.1)',
            opacity: chatOpen ? 0 : 1,
            pointerEvents: chatOpen ? 'none' : 'auto',
            transform: chatOpen ? 'scale(0.85) translateY(6px)' : 'scale(1) translateY(0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (chatOpen) return;
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(22,163,74,0.25)';
            el.style.boxShadow = '0 6px 24px rgba(34,197,94,0.28), 0 0 0 1px rgba(34,197,94,0.18)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(22,163,74,0.15)';
            el.style.boxShadow = '0 4px 18px rgba(34,197,94,0.18), 0 0 0 1px rgba(34,197,94,0.1)';
          }}
        >
          <MessageCircle size={18} strokeWidth={2} style={{ color: '#4ade80' }} />
        </a>

        {/* AI Assistant pill — primary CTA */}
        <button
          onClick={toggleChat}
          aria-label="Open AI Assistant"
          className="flex items-center gap-2 font-semibold text-white
                     rounded-full transition-all duration-200 hover:-translate-y-[2px]"
          style={{
            height: 44,
            paddingLeft: 18,
            paddingRight: 20,
            fontSize: '0.82rem',
            letterSpacing: '-0.01em',
            background: chatOpen
              ? 'rgba(255,255,255,0.07)'
              : 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)',
            border: chatOpen
              ? '1px solid rgba(255,255,255,0.12)'
              : '1px solid rgba(12,147,232,0.3)',
            boxShadow: chatOpen
              ? 'none'
              : '0 4px 20px rgba(12,147,232,0.4), 0 1px 0 rgba(255,255,255,0.16) inset',
            color: chatOpen ? 'rgba(255,255,255,0.6)' : '#fff',
            transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
          }}
          onMouseEnter={(e) => {
            if (chatOpen) return;
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = 'linear-gradient(160deg, #2eb0ff 0%, #0c93e8 100%)';
            el.style.boxShadow = '0 6px 28px rgba(12,147,232,0.55), 0 1px 0 rgba(255,255,255,0.18) inset';
          }}
          onMouseLeave={(e) => {
            if (chatOpen) return;
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)';
            el.style.boxShadow = '0 4px 20px rgba(12,147,232,0.4), 0 1px 0 rgba(255,255,255,0.16) inset';
          }}
        >
          {chatOpen ? (
            <X size={15} strokeWidth={2} />
          ) : (
            <Bot size={15} strokeWidth={2} />
          )}
          {chatOpen ? 'Close' : 'AI Assistant'}
        </button>
      </div>

      {/* ══ MOBILE dock (below sm) ══ */}
      <div className="flex sm:hidden flex-col items-end gap-2.5">

        {/* Expanded options */}
        <div
          className="flex flex-col items-end gap-2 transition-all duration-200 origin-bottom-right"
          style={{
            opacity: mobileExpanded ? 1 : 0,
            transform: mobileExpanded ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(8px)',
            pointerEvents: mobileExpanded ? 'auto' : 'none',
          }}
        >
          {/* WhatsApp option */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full px-4 font-medium
                       transition-all duration-150"
            style={{
              height: 42,
              background: 'rgba(22,163,74,0.15)',
              border: '1px solid rgba(34,197,94,0.28)',
              color: '#4ade80',
              fontSize: '0.82rem',
              boxShadow: '0 4px 16px rgba(34,197,94,0.16)',
            }}
          >
            <MessageCircle size={16} strokeWidth={2} />
            WhatsApp
          </a>

          {/* AI Assistant option */}
          <button
            onClick={() => { setChatOpen(true); setMobileExpanded(false); }}
            className="flex items-center gap-2.5 rounded-full px-4 font-semibold text-white
                       transition-all duration-150"
            style={{
              height: 42,
              background: 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)',
              border: '1px solid rgba(12,147,232,0.3)',
              fontSize: '0.82rem',
              boxShadow: '0 4px 18px rgba(12,147,232,0.38)',
            }}
          >
            <Bot size={16} strokeWidth={2} />
            AI Assistant
          </button>
        </div>

        {/* Chat window on mobile — full width */}
        {chatOpen && (
          <div style={{ width: 'calc(100vw - 56px)' }}>
            {/* ChatWindow is already rendered above for desktop; on mobile we hide the
                desktop wrapper and rely on this one. We just keep one instance above
                but the mobile container ensures correct width. */}
          </div>
        )}

        {/* Single toggle button */}
        <button
          onClick={() => {
            if (chatOpen) { setChatOpen(false); setMobileExpanded(false); }
            else setMobileExpanded((v) => !v);
          }}
          aria-label="Contact options"
          className="flex items-center gap-2 font-semibold text-white rounded-full
                     transition-all duration-200"
          style={{
            height: 44,
            paddingLeft: 18,
            paddingRight: 20,
            fontSize: '0.82rem',
            letterSpacing: '-0.01em',
            background:
              chatOpen || mobileExpanded
                ? 'rgba(255,255,255,0.07)'
                : 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)',
            border:
              chatOpen || mobileExpanded
                ? '1px solid rgba(255,255,255,0.12)'
                : '1px solid rgba(12,147,232,0.3)',
            boxShadow:
              chatOpen || mobileExpanded
                ? 'none'
                : '0 4px 20px rgba(12,147,232,0.4), 0 1px 0 rgba(255,255,255,0.16) inset',
            color: chatOpen || mobileExpanded ? 'rgba(255,255,255,0.6)' : '#fff',
          }}
        >
          {chatOpen || mobileExpanded ? (
            <X size={15} strokeWidth={2} />
          ) : (
            <Bot size={15} strokeWidth={2} />
          )}
          {chatOpen ? 'Close' : mobileExpanded ? 'Close' : 'Chat'}
        </button>
      </div>
    </div>
  );
}
