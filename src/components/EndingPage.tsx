import React from 'react';
import { BOOK_METADATA } from '../data/novelData';
import { PaperTheme } from '../types';
import { BookOpen, RotateCcw } from 'lucide-react';

interface EndingPageProps {
  theme?: PaperTheme;
  onRestart: () => void;
  onOpenTOC: () => void;
}

export const EndingPage: React.FC<EndingPageProps> = ({ theme = 'cream', onRestart, onOpenTOC }) => {
  const isDark = theme === 'midnight';
  const isSepia = theme === 'sepia';

  const paperClass = isDark ? 'paper-midnight text-[#F5F5F5]' : isSepia ? 'paper-sepia text-[#F5F5F5]' : 'paper-cream text-[#F5F5F5]';
  const cardBgClass = isDark ? 'bg-[#16171a] border-[#2A2D31]' : 'bg-[#FCF9F3] border-[#E5DEC9]';
  const titleClass = 'text-amber-100';
  const subtextClass = isDark ? 'text-gray-300' : 'text-[#8C7355]';
  const bodyTextClass = 'text-[#F5F5F5]';
  const borderClass = isDark ? 'border-[#2A2D31]' : 'border-[#E5DEC9]';
  const creditBoxClass = isDark ? 'bg-[#121315] border-[#2A2D31] text-[#E5DEC9]' : 'bg-[#F4ECD8] border-[#C5A059]/40 text-[#8C7355]';
  const buttonSecClass = isDark ? 'bg-[#2A2D31] hover:bg-[#3a3d42] text-[#E5DEC9]' : 'bg-[#EBE5DA] hover:bg-[#dfd7c7] text-[#1B1B1D]';

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

      {/* Main Epilogue Card */}
      <div className={`max-w-2xl w-full my-4 md:my-auto p-5 sm:p-8 md:p-14 rounded-lg border book-page-shadow space-y-6 md:space-y-8 text-center relative shrink-0 ${cardBgClass}`}>
        <div className="space-y-3">
          <span className="text-[11px] text-[#C5A059] uppercase tracking-[0.35em] font-cinzel font-bold block">
            The Epilogue & Final Reflection
          </span>
          <h1 className={`text-3xl md:text-4xl font-cinzel font-bold tracking-tight ${titleClass}`}>
            The End
          </h1>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto opacity-80" />
        </div>

        {/* Ending Text preserved 100% */}
        <div className={`space-y-5 font-cormorant text-lg md:text-xl leading-relaxed text-center italic ${bodyTextClass}`}>
          <p>Kuch kahaniyan ek baat se shuru hoti hain. Aur kuch… sirf ek dua se.</p>
          <p>Unki kahani bhi… ek dua se shuru hui thi.</p>
          <p>Na unhone ek dusre ka peecha kiya. Na kabhi taqdeer se ladne ki koshish ki.</p>
          <p>Unhone sirf itna kiya… Har mod par Allah se wahi maanga… Jisme un dono ki khair ho.</p>
          <p>Aur jab waqt poora hua… Allah ne do dilon ko… Us tareeqe se mila diya… Jaisa sirf Woh hi mila sakte hain.</p>
          <p>Shayad… Mohabbat ka asli matlab bhi yahi hai. Kisi ko paakar apni kami poori karna nahi… Balki kisi aise insaan ko paana… Jo har baar tumhe Allah ki yaad dilaye.</p>
          <p>Aur agar is kahani se ek baat yaad rakhni ho… Toh bas itni si baat yaad rakhna… Apni duaon se kabhi umeed mat khona.</p>
          <p className={`text-xl md:text-2xl font-bold not-italic pt-2 ${titleClass}`}>
            Kyunki… Aaj jo dua tum aansuon ke saath Allah se maang rahe ho… Ho sakta hai… Kal wahi dua tumhari zindagi ki sabse khoobsurat haqeeqat ban jaaye.
          </p>
          <p className={`text-sm font-cinzel uppercase tracking-widest not-italic pt-4 ${subtextClass}`}>
            – The End –
          </p>
        </div>

        {/* Mandatory Credits Card */}
        <div className={`border p-6 rounded-md space-y-2 font-cinzel text-xs uppercase tracking-wider ${creditBoxClass}`}>
          <div className={`font-bold text-sm mb-1 ${titleClass}`}>{BOOK_METADATA.title}</div>
          <div className={`flex justify-center items-center gap-4 ${subtextClass}`}>
            <span>Written by <strong className={titleClass}>{BOOK_METADATA.author}</strong></span>
            <span>•</span>
            <span>Edited by <strong className={titleClass}>{BOOK_METADATA.editor}</strong></span>
          </div>
        </div>

        {/* Buttons */}
        <div className={`pt-4 border-t ${borderClass} flex flex-col sm:flex-row gap-3 justify-center`}>
          <button
            onClick={onRestart}
            className="px-6 py-3 rounded bg-[#121315] hover:bg-[#1f2125] text-[#C5A059] border border-[#C5A059]/50 font-cinzel text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-[#C5A059]" />
            Read From Beginning
          </button>

          <button
            onClick={onOpenTOC}
            className={`px-6 py-3 rounded font-cinzel text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${buttonSecClass}`}
          >
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
            Table of Contents
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
