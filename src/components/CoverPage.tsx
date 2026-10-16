import React from 'react';
import { BOOK_METADATA } from '../data/novelData';
import { PaperTheme } from '../types';
import { BookOpen, Sparkles, ChevronRight, ShieldCheck, Feather } from 'lucide-react';
import bookCoverArt from '../assets/images/book_cover_art_1786020663124.jpg';

interface CoverPageProps {
  theme?: PaperTheme;
  onStartReading: () => void;
  onOpenTOC: () => void;
  onOpenCopyright: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ theme = 'cream', onStartReading, onOpenTOC, onOpenCopyright }) => {
  const isDark = theme === 'midnight';
  const isSepia = theme === 'sepia';

  const paperClass = isDark ? 'paper-midnight text-[#F5F5F5]' : isSepia ? 'paper-sepia text-[#F5F5F5]' : 'paper-cream text-[#F5F5F5]';
  const cardBgClass = isDark ? 'bg-[#16171a] border-[#2A2D31]' : 'bg-[#FCF9F3] border-[#E5DEC9]';
  const titleClass = isDark ? 'text-amber-100' : 'text-[#2B2B2B]';
  const subtextClass = isDark ? 'text-gray-300' : 'text-[#8C7355]';
  const bodyTextClass = 'text-[#F5F5F5]';
  const borderClass = isDark ? 'border-[#2A2D31]' : 'border-[#E5DEC9]';
  const buttonSecClass = isDark ? 'bg-[#2A2D31] hover:bg-[#3a3d42] text-[#E5DEC9] border-[#3a3d42]' : 'bg-[#EBE5DA] hover:bg-[#ded6c7] text-[#1B1B1D] border-[#d4cbba]';

  return (
    <div className={`w-full h-full min-h-full overflow-y-auto overflow-x-hidden flex flex-col justify-between items-center p-3 sm:p-4 md:p-8 relative ${paperClass}`}>
      {/* Top Corner Motif */}
      <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A059] opacity-30">
          <path d="M100 0 L100 100 L0 0 Z" fill="currentColor" />
          <circle cx="85" cy="15" r="5" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* Running Header */}
      <div className={`w-full text-center py-2 border-b ${borderClass} text-[11px] font-cinzel tracking-[0.2em] ${subtextClass} uppercase font-semibold`}>
        {BOOK_METADATA.runningHeader}
      </div>

      {/* Main Cover Display Container */}
      <div className={`max-w-5xl lg:max-w-6xl w-full my-4 md:my-10 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 p-4 sm:p-8 md:p-12 rounded-xl border book-page-shadow relative shrink-0 ${cardBgClass}`}>
        
        {/* Left: Premium Book Cover Graphic (Enlarged & Vivid Clarity) */}
        <div className="w-full max-w-[280px] sm:max-w-sm md:w-[380px] lg:w-[420px] shrink-0 aspect-[2/3] min-h-[360px] sm:min-h-[460px] md:min-h-[540px] relative rounded-lg overflow-hidden border-4 border-[#C5A059] shadow-2xl flex flex-col justify-between p-5 sm:p-8 bg-gradient-to-b from-[#0A0A0B] via-[#16171A] to-[#0A0A0B] text-amber-50 group transition-all duration-300">
          {/* Background Illustration - Crisp High Resolution & Clear Color */}
          <img
            src={bookCoverArt}
            alt="The Girl Who Stayed in My Prayers Cover Artwork"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-black/25 to-[#0A0A0B]/60 pointer-events-none" />

          {/* Cover Header */}
          <div className="relative z-10 text-center space-y-1.5">
            <span className="text-xs uppercase tracking-[0.35em] font-cinzel text-[#C5A059] font-bold drop-shadow">
              Illustrated Novel
            </span>
            <div className="h-0.5 w-12 bg-[#C5A059] mx-auto opacity-90" />
          </div>

          {/* Cover Title */}
          <div className="relative z-10 text-center my-auto space-y-3 py-4">
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold leading-tight gold-gradient-text tracking-wide drop-shadow-lg">
              The Girl Who Stayed in My Prayers
            </h1>
            <p className="font-cormorant italic text-base sm:text-lg text-amber-100 tracking-wide font-medium drop-shadow-md">
              A story written in prayers before destiny.
            </p>
          </div>

          {/* Mandatory Author & Editor Credits on Cover */}
          <div className="relative z-10 text-center pt-4 border-t border-[#C5A059]/60 bg-black/40 backdrop-blur-xs rounded-b p-2 space-y-1">
            <p className="text-xs sm:text-sm uppercase font-cinzel tracking-wider text-amber-100">
              Written by <span className="font-bold text-[#FCF6BA]">{BOOK_METADATA.author}</span>
            </p>
            <p className="text-xs sm:text-sm uppercase font-cinzel tracking-wider text-amber-200/90">
              Edited by <span className="font-bold text-[#FBF5B7]">{BOOK_METADATA.editor}</span>
            </p>
          </div>
        </div>

        {/* Right: Book Details & Action Buttons */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121315] border border-[#C5A059]/50 text-xs font-cinzel text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              Official Collector's Edition
            </div>

            <h2 className={`text-3xl md:text-4xl font-cinzel font-bold tracking-tight ${titleClass}`}>
              {BOOK_METADATA.title}
            </h2>
            
            {/* Credits Section */}
            <div className={`pt-2 pb-1 border-y ${borderClass} py-3 space-y-2 font-cormorant text-base`}>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Feather className="w-4 h-4 text-[#C5A059]" />
                <span className={`font-cinzel text-xs uppercase tracking-widest ${subtextClass} font-semibold`}>Written by:</span>
                <strong className={`font-cinzel text-sm ${titleClass}`}>{BOOK_METADATA.author}</strong>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span className={`font-cinzel text-xs uppercase tracking-widest ${subtextClass} font-semibold`}>Edited by:</span>
                <strong className={`font-cinzel text-sm ${titleClass}`}>{BOOK_METADATA.editor}</strong>
              </div>
            </div>
          </div>

          <p className={`font-cormorant text-lg leading-relaxed max-w-lg ${bodyTextClass}`}>
            "Kuch log hamari zindagi mein shor ke saath aate hain. Kuch log… sirf ek nazar ke saath. Aur phir… kabhi dil se ja hi nahi paate."
          </p>

          <div className="w-full pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStartReading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-[#121315] hover:bg-[#1f2125] text-[#C5A059] border border-[#C5A059]/60 font-cinzel text-xs font-bold uppercase tracking-widest transition-all shadow-lg group cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#C5A059]" />
              Begin Reading
              <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenTOC}
              className={`px-5 py-3.5 rounded font-cinzel text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer border ${buttonSecClass}`}
            >
              Chapters
            </button>

            <button
              onClick={onOpenCopyright}
              className={`px-4 py-3.5 rounded font-cinzel text-xs font-medium uppercase tracking-wider transition-all cursor-pointer border ${buttonSecClass}`}
            >
              Copyright
            </button>
          </div>
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
