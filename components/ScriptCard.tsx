
import React from 'react';
import { Script } from '../types';
import { Star, Download, Clock, ExternalLink, MessageSquare } from 'lucide-react';
import { translations, Language } from '../translations';

interface ScriptCardProps {
  script: Script;
  onClick: (script: Script) => void;
  language: Language;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script, onClick, language }) => {
  const t = translations[language];
  return (
    <div 
      onClick={() => onClick(script)}
      className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-blue-900/10 p-5"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded border border-blue-500/20 uppercase tracking-widest">
          {script.game}
        </span>
        <div className="flex items-center gap-1 text-zinc-500 text-sm">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span>{(script.stars / 1000).toFixed(1)}k</span>
        </div>
      </div>
      
      <h3 className="font-bold text-lg text-zinc-100 group-hover:text-blue-400 transition-colors mb-2">
        {script.title}
      </h3>
      
      <p className="text-zinc-400 text-sm line-clamp-2 mb-4 h-10">
        {script.description}
      </p>

      <div className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 mb-4">
        <p className="text-[11px] text-zinc-500 uppercase font-bold tracking-tight mb-1">{t.navScripts}</p>
        <p className="text-xs text-blue-400 font-medium flex items-center gap-2">
          <MessageSquare size={12} /> {t.heroContact} Discord
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-[11px] text-zinc-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Download size={12} />
            <span>{script.downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{script.lastUpdated}</span>
          </div>
        </div>
        <span className="flex items-center gap-1 text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
          {language === 'it' ? 'Dettagli' : 'Details'} <ExternalLink size={12} />
        </span>
      </div>
    </div>
  );
};

export default ScriptCard;
