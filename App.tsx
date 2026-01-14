
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScriptCard from './components/ScriptCard';
import AIChat from './components/AIChat';
import { MOCK_SCRIPTS } from './constants';
import { AppTab, Script } from './types';
import { Search, Flame, Filter, ChevronRight, MessageSquare, ExternalLink, Terminal as TerminalIcon, Star, Shield, Zap, Headphones, Globe, Sparkles, Rocket } from 'lucide-react';
import { translations, Language } from './translations';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('it');
  const [languageSelected, setLanguageSelected] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);

  const t = translations[language];
  const DISCORD_LINK = "https://discord.gg/tQZbPRbf";

  const filteredScripts = useMemo(() => {
    return MOCK_SCRIPTS.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setLanguageSelected(true);
  };

  const renderHome = () => (
    <div className="space-y-16 pb-12 animate-in fade-in duration-700">
      {/* SEZIONE CUSTOM SCRIPT IN GRANDE - ORA ALL'INIZIO */}
      <section className="relative group overflow-hidden bg-zinc-950 border border-zinc-800 p-12 md:p-24 rounded-[3.5rem] text-center space-y-12 shadow-3xl shadow-blue-900/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-20 blur-3xl w-96 h-96 bg-blue-600 rounded-full"></div>
        
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-black uppercase tracking-[0.3em] animate-pulse">
            <Sparkles size={16} /> {language === 'it' ? 'Servizio Esclusivo' : 'Exclusive Service'}
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none">
            <span className="block">{t.customTitle.split(' ')[0]}</span>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {t.customTitle.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          
          <p className="text-zinc-400 text-xl md:text-3xl max-w-4xl mx-auto font-medium leading-relaxed">
            {t.customSubtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
          <a 
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-6 px-16 py-8 bg-blue-600 hover:bg-blue-500 text-white text-2xl font-black rounded-[2rem] transition-all shadow-[0_25px_60px_-15px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 uppercase tracking-widest"
          >
            {t.customRequest} <Rocket size={32} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
          </a>
        </div>

        {/* Feature Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
           {[
             { icon: Shield, title: t.featurePrivate, color: "text-blue-500" },
             { icon: Zap, title: t.featureOpt, color: "text-yellow-500" },
             { icon: Headphones, title: t.featureSupport, color: "text-green-500" },
           ].map((f, i) => (
             <div key={i} className="flex items-center gap-4 bg-zinc-900/30 p-4 rounded-2xl border border-white/5">
                <f.icon size={24} className={f.color} />
                <span className="text-white font-bold text-sm uppercase tracking-tighter">{f.title}</span>
             </div>
           ))}
        </div>

        <div className="absolute bottom-0 right-0 p-8 opacity-5">
           <TerminalIcon size={300} />
        </div>
      </section>

      {/* Featured Scripts Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 bg-blue-600 h-6 rounded-full"></div>
            <h2 className="text-2xl font-bold text-zinc-100">{t.featuredScripts}</h2>
          </div>
          <button 
            onClick={() => setActiveTab(AppTab.BROWSE)}
            className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:text-blue-300 transition-colors"
          >
            {t.viewAll} <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_SCRIPTS.map(script => (
            <ScriptCard 
              key={script.id} 
              script={script} 
              language={language}
              onClick={(s) => setSelectedScript(s)}
            />
          ))}
        </div>
      </section>
    </div>
  );

  const renderBrowse = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-3xl font-black text-white">{t.navScripts} Library</h2>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-12 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white"
          />
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors text-sm font-medium">
          <Filter size={18} /> {t.filters}
        </button>
      </div>

      {filteredScripts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredScripts.map(script => (
            <ScriptCard 
              key={script.id} 
              script={script} 
              language={language}
              onClick={(s) => setSelectedScript(s)}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <h3 className="text-xl font-bold text-zinc-200">{t.noScripts}</h3>
          <p className="text-zinc-500">{t.noScriptsSub}</p>
        </div>
      )}
    </div>
  );

  const renderCustomScripts = () => (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 py-10">
      <div className="text-center space-y-6 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-20 blur-3xl w-64 h-64 bg-blue-500 rounded-full"></div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-[0.2em]">
          <Sparkles size={14} className="animate-pulse" /> Premium Service
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
          <span className="block">{t.customTitle.split(' ')[0]}</span>
          <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {t.customTitle.split(' ').slice(1).join(' ')}
          </span>
        </h2>
        <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
          {t.customSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Shield, title: t.featurePrivate, desc: t.featurePrivateDesc, color: "text-blue-500", bg: "bg-blue-500/10" },
          { icon: Zap, title: t.featureOpt, desc: t.featureOptDesc, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { icon: Headphones, title: t.featureSupport, desc: t.featureSupportDesc, color: "text-green-500", bg: "bg-green-500/10" },
        ].map((feat, i) => (
          <div key={i} className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-10 rounded-[2.5rem] space-y-6 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className={`w-20 h-20 ${feat.bg} rounded-3xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
              <feat.icon className={feat.color} size={40} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{feat.title}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative group overflow-hidden bg-zinc-950 border border-zinc-800 p-12 md:p-20 rounded-[3rem] text-center space-y-10 shadow-3xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
        <div className="space-y-4 relative z-10">
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            {language === 'it' ? 'Realizza la tua idea' : 'Build your vision'}
          </h3>
          <p className="text-zinc-500 text-xl font-medium">
            {language === 'it' ? 'I nostri esperti sono pronti a scrivere il codice perfetto per te.' : 'Our experts are ready to write the perfect code for you.'}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
          <a 
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-4 px-12 py-7 bg-blue-600 hover:bg-blue-500 text-white text-xl font-black rounded-[1.5rem] transition-all shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 uppercase tracking-widest"
          >
            {t.customRequest} <Rocket size={24} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Language Selector Overlay */}
      {!languageSelected && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-600/30 rotate-3">
                <TerminalIcon size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">DELTA SCRIPT</h2>
              <p className="text-zinc-500 font-medium">Scegli la tua lingua / Choose your language</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => selectLanguage('it')}
                className="group relative flex items-center justify-between p-6 bg-zinc-800/50 hover:bg-blue-600 rounded-2xl border border-zinc-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="text-2xl">🇮🇹</div>
                  <div>
                    <div className="text-white font-bold group-hover:text-white transition-colors">Italiano</div>
                    <div className="text-xs text-zinc-500 group-hover:text-blue-100 transition-colors">Lingua predefinita</div>
                  </div>
                </div>
                <Globe size={20} className="text-zinc-600 group-hover:text-white/50" />
              </button>

              <button 
                onClick={() => selectLanguage('en')}
                className="group relative flex items-center justify-between p-6 bg-zinc-800/50 hover:bg-blue-600 rounded-2xl border border-zinc-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="text-2xl">🇬🇧</div>
                  <div>
                    <div className="text-white font-bold group-hover:text-white transition-colors">English</div>
                    <div className="text-xs text-zinc-500 group-hover:text-blue-100 transition-colors">International access</div>
                  </div>
                </div>
                <Globe size={20} className="text-zinc-600 group-hover:text-white/50" />
              </button>
            </div>
            
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Delta Hub v12.0</p>
          </div>
        </div>
      )}

      <div className={!languageSelected ? 'blur-md pointer-events-none' : ''}>
        <Navbar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          language={language}
          onLanguageChange={setLanguage}
        />

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          {activeTab === AppTab.HOME && renderHome()}
          {activeTab === AppTab.BROWSE && renderBrowse()}
          {activeTab === AppTab.AI_ASSISTANT && (
            <div className="h-[calc(100vh-160px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AIChat language={language} />
            </div>
          )}
          {activeTab === AppTab.CUSTOM_SCRIPTS && renderCustomScripts()}
        </main>

        {/* Script Details Overlay */}
        {selectedScript && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/60 animate-in fade-in duration-300">
            <div 
              className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedScript.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded uppercase tracking-wider">{selectedScript.game}</span>
                    <p className="text-zinc-500 text-xs">By {selectedScript.author}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedScript(null)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors">
                  ✕
                </button>
              </div>

              <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto border border-blue-600/20">
                  <MessageSquare size={32} className="text-blue-500" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-100">{t.modalAccess}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {t.modalSafeMsg}
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <p className="text-zinc-200 font-semibold italic text-lg">
                    "{t.modalDiscordMsg}"
                  </p>
                  <div className="pt-2">
                    <a 
                      href={DISCORD_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-xl shadow-blue-600/40 animate-bounce uppercase"
                    >
                      {t.modalClickHere} <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <div className="flex justify-center gap-6 text-zinc-500 text-xs pt-4 border-t border-zinc-900">
                  <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {selectedScript.stars} Stars</div>
                  <div className="flex items-center gap-1">Verified: {selectedScript.lastUpdated}</div>
                </div>
              </div>

              <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 text-center">
                <button 
                  onClick={() => setSelectedScript(null)}
                  className="text-zinc-500 text-xs hover:text-white transition-colors uppercase tracking-widest font-bold"
                >
                  {t.modalClose}
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-6 mt-12">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <TerminalIcon size={24} className="text-blue-500" />
              <span className="text-xl font-bold text-white tracking-tight">DELTA SCRIPT</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-md mx-auto">
              {t.footerDesc}
            </p>
            <div className="pt-4">
               <a href={DISCORD_LINK} target="_blank" className="text-blue-400 font-bold hover:underline">{t.footerJoin}</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
