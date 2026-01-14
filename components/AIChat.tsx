
import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { chatWithAI } from '../services/gemini';
import { ChatMessage } from '../types';
import { translations, Language } from '../translations';

interface AIChatProps {
  language: Language;
}

const AIChat: React.FC<AIChatProps> = ({ language }) => {
  const t = translations[language];
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t.aiGreeting }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithAI(messages, userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: language === 'it' ? "Scusa, ho problemi di connessione." : "Sorry, I'm having trouble connecting." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Cpu size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-zinc-100">Delta AI Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{t.aiActive}</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 flex items-center gap-2">
          <Sparkles size={14} className="text-yellow-500" />
          Gemini 3 Pro Enabled
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-zinc-700' : 'bg-blue-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                  : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%] flex-row">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-blue-600">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl text-sm bg-zinc-800 text-zinc-400 rounded-tl-none border border-zinc-700 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Processing request...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.aiPlaceholder}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 pr-14 text-sm focus:outline-none focus:border-blue-500 transition-all placeholder-zinc-500"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-zinc-700 rounded-lg text-white transition-all shadow-lg shadow-blue-600/20"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-zinc-500 mt-4">
          {t.aiWarning}
        </p>
      </div>
    </div>
  );
};

export default AIChat;
