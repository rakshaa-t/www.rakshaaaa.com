"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ArrowUp, Sparkles, Paperclip, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ensureLightMode } from '../lib/utils';
import { sendToAI, GREETING_MESSAGE, type ChatMessage } from '../lib/ai-chat';

interface DraggableCard {
  id: string;
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  rotation: number;
}

export interface PortfolioHeroSectionProps {
  cards?: DraggableCard[];
}

const SUGGESTION_PILLS = [
  "what's your design process?",
  "do you take freelance work?",
  "tell me about yourself"
];

export const PortfolioHeroSection: React.FC<PortfolioHeroSectionProps> = ({ cards: customCards }) => {
  useEffect(() => {
    ensureLightMode();
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      type: 'greeting',
      content: GREETING_MESSAGE,
      sender: 'system',
      timestamp: Date.now()
    }
  ]);

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [draggedOverChat, setDraggedOverChat] = useState(false);
  const [usedCardIds, setUsedCardIds] = useState<Set<string>>(new Set());
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultCards: DraggableCard[] = [
    {
      id: 'card-1',
      slug: 'ova',
      image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760524296/6_3x_shots_so_y310gt.png',
      title: 'Ova : Period tracking app',
      subtitle: 'Product Design',
      rotation: -8
    },
    {
      id: 'card-2',
      slug: 'greex',
      image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
      title: 'Greex : DeFi trading platform',
      subtitle: 'Product Design',
      rotation: -4
    },
    {
      id: 'card-3',
      slug: 'ioc',
      image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
      title: 'IOC : Vendor management platform',
      subtitle: 'Product Design, Team Lead',
      rotation: 2
    },
    {
      id: 'card-4',
      slug: 'dealdoc',
      image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525328/19_2x_shots_so_lio1is.png',
      title: 'Dealdoc : Deal management platform',
      subtitle: 'Product Design',
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
        if (Array.isArray(parsed) && parsed.every(m => m.id && m.type && m.sender)) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
        localStorage.removeItem('portfolio_messages');
      }
    }
  }, []);

  // save messages
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('portfolio_messages', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages to localStorage:', e);
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

  // Get AI response
  const getAIResponse = useCallback(async (userMessage: string, allMessages: ChatMessage[]) => {
    setIsLoading(true);
    try {
      const response = await sendToAI(allMessages, userMessage);
      const aiMessage: ChatMessage = {
        id: `msg-${generateId()}`,
        type: 'text',
        content: response.message,
        sender: 'system',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMessage]);
      setShouldAutoScroll(true);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: ChatMessage = {
        id: `msg-${generateId()}`,
        type: 'text',
        content: "sorry, i'm having trouble connecting right now. try again in a sec",
        sender: 'system',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
      setShouldAutoScroll(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const attachCard = useCallback(async (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    if (messages.some(m => m.type === 'card-with-question' && m.card?.id === cardId)) return;

    const autoReplyMap: { [k: string]: string } = {
      'card-1': 'Tell me more about Ova. What was your design process?',
      'card-2': 'What was the biggest challenge you faced while designing Greex?',
      'card-3': "What is IOC's vendor management platform about?",
      'card-4': 'What did Dealdoc teach you about designing B2B SaaS?'
    };

    const questionContent = autoReplyMap[cardId] || `Tell me about ${card.title}`;

    const newMessage: ChatMessage = {
      id: `msg-${generateId()}`,
      type: 'card-with-question',
      content: questionContent,
      card: { id: card.id, image: card.image, title: card.title },
      sender: 'user',
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setUsedCardIds(prev => new Set([...prev, cardId]));
    setShouldAutoScroll(true);

    // Get AI response for the card question
    await getAIResponse(questionContent, updatedMessages);
  }, [cards, messages, getAIResponse]);

  const handleDragEnd = useCallback((cardId: string, info: PanInfo) => {
    if (!chatContainerRef.current) {
      setDraggedCardId(null);
      setDraggedOverChat(false);
      return;
    }
    const chatRect = chatContainerRef.current.getBoundingClientRect();
    const dropX = info.point.x;
    const dropY = info.point.y;
    const margin = 50;
    const isInDropZone = dropX >= chatRect.left - margin && dropX <= chatRect.right + margin && dropY >= chatRect.top - margin && dropY <= chatRect.bottom + margin;

    setDraggedCardId(null);
    setDraggedOverChat(false);

    if (isInDropZone) attachCard(cardId);
  }, [attachCard]);

  const handleSendMessage = useCallback(async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim() || isLoading) return;

    const newMessage: ChatMessage = {
      id: `msg-${generateId()}`,
      type: 'text',
      content: text,
      sender: 'user',
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setShouldAutoScroll(true);

    // Get AI response
    await getAIResponse(text, updatedMessages);
  }, [inputValue, isLoading, messages, getAIResponse]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    if (usedSuggestions.has(suggestion) || isLoading) return;
    setUsedSuggestions(prev => new Set([...prev, suggestion]));
    handleSendMessage(suggestion);
  }, [usedSuggestions, isLoading, handleSendMessage]);

  const handleClearConversation = () => {
    setMessages([
      {
        id: 'greeting',
        type: 'greeting',
        content: GREETING_MESSAGE,
        sender: 'system',
        timestamp: Date.now()
      }
    ]);
    setUsedCardIds(new Set());
    setUsedSuggestions(new Set());
    if (typeof window !== 'undefined') localStorage.removeItem('portfolio_messages');
  };

  return (
    <section aria-label="Portfolio hero" className="relative isolate overflow-hidden bg-[#F2F2F2] text-zinc-900 min-h-screen pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Floating social links */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow" aria-label="LinkedIn">
          <svg className="w-5 h-5 text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="mailto:hello@rakshaaaa.com" className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow" aria-label="Email">
          <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </a>
      </div>

      <div className="relative z-10 mx-auto max-w-[877px] px-4 pb-20 sm:px-6 lg:px-0" style={{ marginTop: '68px' }}>
        <div className="mx-auto flex flex-col items-center">
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-extrabold tracking-tight leading-tight w-full text-center" style={{ fontSize: '40px' }}>
            <span className="text-[#1D3BF1]" style={{ fontSize: '44px' }}>End-To-End Product design and Branding.</span>
          </motion.h1>

          <h2 className="mt-2 font-extrabold text-zinc-900 w-full text-center" style={{ fontSize: '44px' }}>
            <span>Visually stunning apps, softwares and</span>
            <span> websites with functionality at its core.</span>
          </h2>

          <p className="mt-6 text-[20px] leading-6 text-zinc-700 w-full text-center">
            Raksha leads Product and Brand Design for startups, big thinkers and game changers. 6+ years of industry experience and 55+ clients so far
          </p>

          {/* Chat container */}
          <div ref={chatContainerRef} className="mt-8 w-full rounded-[14px] border border-black/[0.08] bg-white p-2 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all" style={{ backgroundColor: draggedOverChat ? '#f8f9ff' : 'white' }}>
            <div className="messages-scroll-area rounded-[12px] border border-black/[0.08] bg-white px-4 py-4 max-h-[400px] overflow-y-auto space-y-3" aria-live="polite" aria-atomic="true" role="list">
              <AnimatePresence mode="popLayout">
                {messages.map(message => (
                  <motion.div key={message.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.3 }} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} role="listitem">
                    {message.sender === 'system' && (
                      <div className="flex items-start gap-3 max-w-xs">
                        <Image src="https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg" alt="Raksha avatar" width={32} height={32} className="w-8 h-8 rounded-full object-cover flex-shrink-0" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }} />
                        {(message.type === 'greeting' || message.type === 'text') && (
                          <div className="bg-zinc-50 rounded-[12px] px-4 py-3 border border-black/[0.06]">
                            <p className="text-[13px] text-zinc-700 leading-relaxed">{message.content}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {message.sender === 'user' && (
                      <div className="max-w-xs">
                        {message.type === 'text' && (
                          <div className="bg-[#1D3BF1] rounded-[12px] px-4 py-3"><p className="text-[13px] text-white leading-relaxed">{message.content}</p></div>
                        )}

                        {message.type === 'card-with-question' && message.card && (
                          <div className="space-y-2">
                            <div className="bg-white rounded-[14px] border border-black/[0.08] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                              <div className="relative w-full overflow-hidden bg-zinc-100" style={{ height: '140px' }}>
                                <Image src={message.card.image} alt={message.card.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
                              </div>
                              <div className="p-3"><p className="text-[12px] text-zinc-900 italic leading-tight">{message.card.title}</p></div>
                            </div>

                            <div className="bg-[#1D3BF1] rounded-[20px] px-5 py-4 shadow-md">
                              <p className="text-[14px] text-white leading-relaxed">{message.content}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-xs">
                      <Image src="https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg" alt="Raksha avatar" width={32} height={32} className="w-8 h-8 rounded-full object-cover flex-shrink-0" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }} />
                      <div className="bg-zinc-50 rounded-[12px] px-4 py-3 border border-black/[0.06]">
                        <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="mt-3 rounded-[20px] border border-black/[0.08] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all" style={{ borderColor: draggedCardId ? '#1D3BF1' : 'rgba(0,0,0,0.08)' }}>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Sparkles className="h-5 w-5 text-zinc-400 flex-shrink-0" strokeWidth={2} />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    placeholder="talk 2 me"
                    className="flex-1 bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                    aria-label="Chat input"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputValue.trim()}
                    className="inline-flex items-center gap-2 rounded-[16px] bg-[#0A0D1F] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(10,13,31,0.2)] transition-all hover:bg-[#151829] focus:outline-none focus:ring-2 focus:ring-[#0A0D1F] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" strokeWidth={2.5} />}
                    <span>Send</span>
                  </button>
                </div>

                {/* Suggestion pills */}
                <div className="flex flex-wrap gap-2">
                  {SUGGESTION_PILLS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={usedSuggestions.has(suggestion) || isLoading}
                      className="px-3 py-1.5 text-[12px] rounded-full border border-black/[0.08] text-zinc-600 hover:bg-zinc-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {suggestion}
                    </button>
                  ))}
                  <button onClick={handleClearConversation} className="px-3 py-1.5 text-[12px] rounded-full border border-black/[0.08] text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-colors flex items-center gap-1">
                    <Trash2 className="h-3 w-3" /><span>clear</span>
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

          {/* Draggable project cards */}
          <div className="mt-12 w-full">
            <h3 className="text-sm font-medium text-zinc-500 mb-4 text-center">Drag a card to the chat to learn more, or click to view case study</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {cards.filter(card => !usedCardIds.has(card.id)).map((card) => (
                <motion.div
                  key={card.id}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragStart={() => {
                    setDraggedCardId(card.id);
                    setDraggedOverChat(true);
                  }}
                  onDragEnd={(_, info) => handleDragEnd(card.id, info)}
                  whileDrag={{ scale: 1.05, zIndex: 50 }}
                  initial={{ rotate: card.rotation, opacity: 0, y: 20 }}
                  animate={{ rotate: card.rotation, opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <Link href={`/case-studies/${card.slug}`} onClick={(e) => { if (draggedCardId) e.preventDefault(); }}>
                    <div className="w-[200px] bg-white rounded-[14px] border border-black/[0.08] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow">
                      <div className="relative w-full h-[120px] bg-zinc-100">
                        <Image src={card.image} alt={card.title} fill className="object-cover" sizes="200px" />
                      </div>
                      <div className="p-3">
                        <p className="text-[12px] font-medium text-zinc-900 leading-tight">{card.title}</p>
                        {card.subtitle && <p className="text-[10px] text-zinc-500 mt-1">{card.subtitle}</p>}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            {usedCardIds.size > 0 && usedCardIds.size < cards.length && (
              <p className="text-xs text-zinc-400 text-center mt-4">
                {cards.length - usedCardIds.size} more {cards.length - usedCardIds.size === 1 ? 'card' : 'cards'} available
              </p>
            )}
            {usedCardIds.size === cards.length && (
              <p className="text-xs text-zinc-400 text-center mt-4">
                All cards have been added to the conversation
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHeroSection;
