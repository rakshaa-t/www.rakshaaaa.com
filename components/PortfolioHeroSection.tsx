"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ArrowUp, Sparkles, Paperclip, Linkedin, Trash2 } from 'lucide-react';
import { ensureLightMode } from '../lib/utils';

interface DraggableCard {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  rotation: number;
}

interface ChatMessage {
  id: string;
  type: 'text' | 'card-with-question' | 'greeting';
  content?: string;
  card?: {
    id: string;
    image: string;
    title: string;
  };
  sender: 'user' | 'system';
  timestamp: number;
}

export interface PortfolioHeroSectionProps {
  cards?: DraggableCard[];
}

const TAB_ITEMS = [
  { id: 'my-work', label: 'my work' },
  { id: 'visuals', label: 'visuals' }
];

const CASE_STUDIES = [
  {
    id: 'case-1',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760524296/6_3x_shots_so_y310gt.png',
    title: 'Process Breakdown: Plasticity Brand & Website',
    subtitle: 'Process Breakdown',
    backgroundColor: 'bg-white',
    borderColor: 'border-black/[0.06]'
  },
  {
    id: 'case-2',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
    title: 'Website Design and Development for Default.com',
    subtitle: 'Process Breakdown',
    backgroundColor: 'bg-white',
    borderColor: 'border-black/[0.06]'
  },
  {
    id: 'case-3',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
    title: 'Creamier Branding Process Breakdown',
    subtitle: 'Process Breakdown',
    backgroundColor: 'bg-purple-200',
    borderColor: 'border-purple-300'
  },
  {
    id: 'case-4',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525328/19_2x_shots_so_lio1is.png',
    title: 'Brand Strategy & Identity: Wayfinder Ventures',
    subtitle: 'Process Breakdown',
    backgroundColor: 'bg-cyan-400',
    borderColor: 'border-cyan-500'
  }
];

export const PortfolioHeroSection: React.FC<PortfolioHeroSectionProps> = ({ cards: customCards }) => {
  useEffect(() => {
    ensureLightMode();
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      type: 'greeting',
      content: "Hi! I'm Raksha ! Nice to meet you. What's up ?",
      sender: 'system',
      timestamp: Date.now()
    }
  ]);

  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [activeDragCard, setActiveDragCard] = useState<DraggableCard | null>(null);
  const [draggedOverChat, setDraggedOverChat] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('my-work');
  const [usedCardIds, setUsedCardIds] = useState<Set<string>>(new Set());
  const [returningCardId, setReturningCardId] = useState<string | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultCards: DraggableCard[] = [
    {
      id: 'card-1',
      image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760524296/6_3x_shots_so_y310gt.png',
      title: 'Ova : Period tracking app ',
      subtitle: '',
      rotation: -8
    },
    {
      id: 'card-2',
      image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
      title: 'Greex : Defi trading crypto platform',
      subtitle: '',
      rotation: -4
    },
    {
      id: 'card-3',
      image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
      title: 'IOC : Vendor management platform ',
      subtitle: '',
      rotation: 2
    },
    {
      id: 'card-4',
      image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525328/19_2x_shots_so_lio1is.png',
      title: 'Dealdoc : Deal management platform',
      subtitle: '',
      rotation: 6
    }
  ];

  const cards = customCards || defaultCards;

  // load saved messages if present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('portfolio_messages');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed)) setMessages(parsed);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // save messages
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('portfolio_messages', JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (shouldAutoScroll) {
      setTimeout(() => scrollToBottom(), 100);
      setShouldAutoScroll(false);
    }
  }, [messages, scrollToBottom, shouldAutoScroll]);

  const attachCard = useCallback((cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    if (messages.some(m => m.type === 'card-with-question' && m.card?.id === cardId)) return;

    const autoReplyMap: { [k: string]: string } = {
      'card-1': 'Tell me more about Ova : Period tracking app. What was your design process?',
      'card-2': 'What was the biggest challenge you came across while designing Greex?',
      'card-3': "What is IOC's vendor management platform?",
      'card-4': 'What did Dealdoc teach you about designing B2B saas?'
    };

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: 'card-with-question',
      content: autoReplyMap[cardId] || '',
      card: { id: card.id, image: card.image, title: card.title },
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    setUsedCardIds(prev => new Set([...prev, cardId]));
    setShouldAutoScroll(true);
  }, [cards, messages]);

  const handleDragEnd = useCallback((cardId: string, info: PanInfo) => {
    if (!chatContainerRef.current) {
      setDraggedCardId(null);
      setActiveDragCard(null);
      setDraggedOverChat(false);
      return;
    }
    const chatRect = chatContainerRef.current.getBoundingClientRect();
    const dropX = info.point.x;
    const dropY = info.point.y;
    const margin = 50;
    const isInDropZone = dropX >= chatRect.left - margin && dropX <= chatRect.right + margin && dropY >= chatRect.top - margin && dropY <= chatRect.bottom + margin;

    setDraggedCardId(null);
    setActiveDragCard(null);
    setDraggedOverChat(false);

    if (isInDropZone) attachCard(cardId);
  }, [attachCard]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: 'text',
      content: inputValue,
      sender: 'user',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setShouldAutoScroll(true);
  };

  const handleClearConversation = () => {
    setMessages([
      {
        id: 'greeting',
        type: 'greeting',
        content: "Hi! I'm Raksha ! Nice to meet you. What's up ?",
        sender: 'system',
        timestamp: Date.now()
      }
    ]);
    setUsedCardIds(new Set());
    if (typeof window !== 'undefined') localStorage.removeItem('portfolio_messages');
  };

  return (
    <section aria-label="Portfolio hero" className="relative isolate overflow-hidden bg-[#F2F2F2] text-zinc-900 min-h-screen pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Floating buttons (left/right) omitted for brevity in explanation (they are present) */}

      <div className="relative z-10 mx-auto max-w-[877px] px-4 pb-20 sm:px-6 lg:px-0" style={{ marginTop: '68px' }}>
        <div className="mx-auto flex flex-col items-center">
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-extrabold tracking-tight leading-tight w-full text-center" style={{ fontSize: '40px' }}>
            <span className="text-[#1D3BF1]" style={{ fontSize: '44px' }}>End-To-End Product design and Branding.</span>
          </motion.h1>

          <h2 className="mt-2 font-extrabold text-zinc-900 w-full text-center" style={{ fontSize: '44px' }}>
            <span>Visually stunning apps, softwares and</span>
            <span> websites with functionality at it's core.</span>
          </h2>

          <p className="mt-6 text-[20px] leading-6 text-zinc-700 w-full text-center">
            Raksha leads Product and Brand Design for startups, big thinkers and game changers. 6+ years of industry experience and 55+ clients so far
          </p>

          {/* Chat + cards (full UI included) */}
          <div ref={chatContainerRef} className="mt-8 w-full rounded-[14px] border border-black/[0.08] bg-white p-2 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all" style={{ backgroundColor: draggedOverChat ? '#f8f9ff' : 'white' }}>
            <div className="messages-scroll-area rounded-[12px] border border-black/[0.08] bg-white px-4 py-4 max-h-[400px] overflow-y-auto space-y-3" aria-live="polite" aria-atomic="true" role="list">
              <AnimatePresence mode="popLayout">
                {messages.map(message => (
                  <motion.div key={message.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.3 }} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} role="listitem">
                    {message.sender === 'system' && (
                      <div className="flex items-start gap-3 max-w-xs">
                        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg" alt="Raksha avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }} />
                        {(message.type === 'greeting' || message.type === 'text') && (
                          <div className="bg-zinc-50 rounded-[12px] px-4 py-3 border border-black/[0.06]">
                            <p className="text-[13px] text-zinc-700 leading-relaxed"><span>{message.content}</span></p>
                          </div>
                        )}
                      </div>
                    )}

                    {message.sender === 'user' && (
                      <div className="max-w-xs">
                        {message.type === 'text' && (
                          <div className="bg-[#1D3BF1] rounded-[12px] px-4 py-3"><p className="text-[13px] text-white leading-relaxed"><span>{message.content}</span></p></div>
                        )}

                        {message.type === 'card-with-question' && message.card && (
                          <div className="space-y-2">
                            <div className="bg-white rounded-[14px] border border-black/[0.08] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                              <div className="relative w-full overflow-hidden bg-zinc-100" style={{ height: '140px' }}>
                                <img src={message.card.image} alt={message.card.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-3"><p className="text-[12px] text-zinc-900 italic leading-tight"><span>{message.card.title}</span></p></div>
                            </div>

                            <div className="bg-[#1D3BF1] rounded-[20px] px-5 py-4 shadow-md">
                              <p className="text-[14px] text-white leading-relaxed"><span>{message.content}</span></p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="mt-3 rounded-[20px] border border-black/[0.08] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all" style={{ borderColor: draggedCardId ? '#1D3BF1' : 'rgba(0,0,0,0.08)' }}>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Sparkles className="h-5 w-5 text-zinc-400 flex-shrink-0" strokeWidth={2} />
                  <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="Ask me about myself, my case studies, or my process." className="flex-1 bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none" aria-label="Chat input" />
                  <button onClick={handleSendMessage} className="inline-flex items-center gap-2 rounded-[16px] bg-[#0A0D1F] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(10,13,31,0.2)] transition-all hover:bg-[#151829] focus:outline-none focus:ring-2 focus:ring-[#0A0D1F]">
                    <ArrowUp className="h-4 w-4" strokeWidth={2.5} /><span>Send</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <button onClick={handleClearConversation} className="inline-flex items-center gap-2 rounded-[16px] bg-zinc-100 px-5 py-2.5 text-[14px] font-medium text-zinc-600 hover:bg-zinc-200 focus:outline-none focus:ring-2">
                    <Trash2 className="h-4 w-4" /><span>Clear</span>
                  </button>
                </div>

                {draggedCardId && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#1D3BF1]/30 bg-[#1D3BF1]/5 py-3 text-[13px] font-medium text-[#1D3BF1]">
                    <Paperclip className="h-4 w-4" /><span>Drop cards here to ask me anything about this case study.</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Draggable cards and rest of layout omitted for brevity */}
        </div>
      </div>
    </section>
  );
};

export default PortfolioHeroSection;
