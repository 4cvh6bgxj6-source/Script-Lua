
import React from 'react';
import { AppTab } from '../types';
import { Terminal, Search, Cpu, Home, Star } from 'lucide-react';
import { translations, Language } from '../translations';

interface NavbarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, language, onLanguageChange }) => {
  const t = translations[language];
  const navItems = [
    { id: AppTab.HOME, label: t.navHome, icon: Home },
    { id: AppTab.BROWSE, label: t.navScripts, icon: Search },
    { id: AppTab.AI_ASSISTANT, label: t.navAI, icon: Cpu },
    { id: AppTab.CUSTOM_SCRIPTS, label: t.navCustom, icon: Star },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange(AppTab.HOME)}>
        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
          <Terminal size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          DELTA SCRIPT
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-all ${
                isActive ? 'text-blue-400 scale-105' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon size={18} className={item.id === AppTab.CUSTOM_SCRIPTS && isActive ? 'text-yellow-400' : ''} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1 mr-2">
          <button 
            onClick={() => onLanguageChange('it')}
            className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${language === 'it' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            ITA
          </button>
          <button 
            onClick={() => onLanguageChange('en')}
            className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${language === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            ENG
          </button>
        </div>
        <button className="hidden sm:block text-xs font-semibold px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-all border border-zinc-700">
          {t.signIn}
        </button>
        <button className="text-xs font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-all text-white shadow-lg shadow-blue-600/20">
          {t.getDelta}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
