import React from 'react';
import { BOOK_METADATA } from '../data/novelData';
import { PaperTheme } from '../types';
import { ShieldCheck } from 'lucide-react';

interface CopyrightPageProps {
  theme?: PaperTheme;
  onNext: () => void;
  onPrev: () => void;
}

export const CopyrightPage: React.FC<CopyrightPageProps> = ({ theme = 'cream', onNext, onPrev }) => {
  const isDark = theme === 'midnight';
  const isSepia = theme === 'sepia';

  const paperClass = isDark ? 'paper-midnight text-[#F5F5F5]' : isSepia ? 'paper-sepia text-[#F5F5F5]' : 'paper-cream text-[#F5F5F5]';
  const cardBgClass = isDark ? 'bg-[#16171a] border-[#2A2D31]' : 'bg-[#FCF9F3] border-[#E5DEC9]';
  const titleClass = 'text-amber-100';
  const subtextClass = isDark ? 'text-gray-300' : 'text-[#8C7355]';
  const bodyTextClass = 'text-[#F5F5F5]';
  const borderClass = isDark ? 'border-[#2A2D31]' : 'border-[#E5DEC9]';
  const creditBoxClass = isDark ? 'bg-[#121315] border-[#2A2D31] text-[#E5DEC9]' : 'bg-[#F4ECD8] border-[#C5A059]/40 text-[#312519]';
  const creditSubBoxClass = isDark ? 'bg-[#1A1C20] border-[#2A2D31]' : 'bg-[#FCF9F3] border-[#E5DEC9]';
  const buttonSecClass = isDark ? 'bg-[#2A2D31] hover:bg-[#3a3d42] text-[#E5DEC9]' : 'bg-[#EBE5DA] hover:bg-[#dfd7c7] text-[#1B1B1D]';

  return (
    <div className={`w-full h-full min-h-full overflow-y-auto overflow-x-hidden flex flex-col justify-between items-center p-3 sm:p-4 md:p-8 relative ${paperClass}`}>
      {/* Top Corner Motif */}
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A059] opacity-30">
          <path d="M100 0 L100 100 L0 0 Z" fill="currentColor" />
          <circle cx="85" cy="15" r="5" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* Running Header */}
      <div className={`w-full text-center py-2 border-b ${borderClass} text-[11px] font-cinzel tracking-[0.2em] ${subtextClass} uppercase font-semibold`}>
        {BOOK_METADATA.runningHeader}
      </div>

      {/* Main Content */}
      <div className={`max-w-2xl w-full my-4 md:my-auto p-5 sm:p-8 md:p-12 rounded-lg border book-page-shadow space-y-6 md:space-y-8 text-center relative shrink-0 ${cardBgClass}`}>
        
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-cinzel text-[#C5A059] font-bold block">
            Copyright & Publication
          </span>
          <h2 className={`text-2xl md:text-3xl font-cinzel font-bold tracking-tight ${titleClass}`}>
            {BOOK_METADATA.title}
          </h2>
          <div className="h-px w-16 bg-[#C5A059] mx-auto" />
          <p className={`font-cormorant italic text-sm ${subtextClass}`}>
            Official Illustrated First Edition (2026)
          </p>
        </div>

        {/* Mandatory Copyright Credits Box */}
        <div className={`border p-6 rounded-md space-y-4 font-cormorant text-base ${creditBoxClass}`}>
          <div className="font-cinzel text-xs uppercase tracking-widest text-[#C5A059] font-bold pb-2 border-b border-[#C5A059]/30">
            Mandatory Credits & Ownership
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className={`p-4 rounded border space-y-1 ${creditSubBoxClass}`}>
              <span className={`text-[10px] uppercase font-cinzel tracking-wider block ${subtextClass}`}>Author</span>
              <strong className={`text-lg font-cinzel block ${titleClass}`}>{BOOK_METADATA.author}</strong>
            </div>
            <div className={`p-4 rounded border space-y-1 ${creditSubBoxClass}`}>
              <span className={`text-[10px] uppercase font-cinzel tracking-wider block ${subtextClass}`}>Editor</span>
              <strong className={`text-lg font-cinzel block ${titleClass}`}>{BOOK_METADATA.editor}</strong>
            </div>
          </div>
        </div>

        {/* Legal & Preservation Statement */}
        <div className={`space-y-4 font-eb-garamond text-sm leading-relaxed ${bodyTextClass}`}>
          <p>
            This literary work and all associated artwork are protected by copyright law. Every paragraph, word, punctuation mark, dialogue, spelling, capitalization, and line break has been preserved 100% in its original authentic form as authored by Shaik Maaz and edited by Mohammed Fayaz.
          </p>
          <p className={`text-xs italic ${subtextClass}`}>
            {BOOK_METADATA.copyrightNotice}
          </p>
        </div>

        <div className={`pt-4 border-t ${borderClass} flex flex-wrap gap-2 sm:gap-4 justify-between items-center text-xs font-cinzel ${subtextClass}`}>
          <button
            onClick={onPrev}
            className={`px-4 py-2 rounded transition-colors cursor-pointer ${buttonSecClass}`}
          >
            ← Cover Page
          </button>
          <span className={`flex items-center gap-1 ${subtextClass}`}>
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Verified Authenticity
          </span>
          <button
            onClick={onNext}
            className="px-4 py-2 rounded bg-[#121315] text-[#C5A059] hover:bg-[#1f2125] transition-colors cursor-pointer font-semibold"
          >
            Table of Contents →
          </button>
        </div>
      </div>

      {/* Running Footer */}
      <div className={`w-full text-center py-2 border-t ${borderClass} text-[10px] font-cinzel tracking-[0.2em] ${subtextClass} uppercase font-semibold`}>
        {BOOK_METADATA.runningHeader}
      </div>

      {/* Bottom Corner Motif */}
      <div className="absolute bottom-0 left-0 w-20 h-20 transform rotate-180 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A059] opacity-30">
          <path d="M100 0 L100 100 L0 0 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};
