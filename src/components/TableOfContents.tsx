import React, { useState } from 'react';
import { CHAPTERS, BOOK_METADATA } from '../data/novelData';
import { PaperTheme } from '../types';
import { BookOpen, Search, Sparkles, ChevronRight, Bookmark } from 'lucide-react';

interface TableOfContentsProps {
  theme?: PaperTheme;
  currentChapterId: number;
  onSelectChapter: (id: number) => void;
  onClose: () => void;
  onOpenCover: () => void;
  onOpenCopyright: () => void;
  bookmarks: number[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  theme = 'cream',
  currentChapterId,
  onSelectChapter,
  onClose,
  onOpenCover,
  onOpenCopyright,
  bookmarks
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const isDark = theme === 'midnight';
  const isSepia = theme === 'sepia';

  const paperClass = isDark ? 'paper-midnight text-[#F5F5F5]' : isSepia ? 'paper-sepia text-[#F5F5F5]' : 'paper-cream text-[#F5F5F5]';
  const cardBgClass = isDark ? 'bg-[#16171a] border-[#2A2D31]' : 'bg-[#FCF9F3] border-[#E5DEC9]';
  const titleClass = isDark ? 'text-amber-100' : 'text-[#2B2B2B]';
  const subtextClass = isDark ? 'text-gray-300' : 'text-[#5A4836]';
  const borderClass = isDark ? 'border-[#2A2D31]' : 'border-[#E5DEC9]';
  const inputBgClass = isDark ? 'bg-[#1F2125] border-[#2A2D31] text-amber-50 placeholder:text-gray-400' : 'bg-[#FAF6EE] border-[#DED7C9] text-[#2B2B2B] placeholder:text-[#6E5B48]';
  const buttonSecClass = isDark ? 'bg-[#2A2D31] hover:bg-[#3a3d42] text-[#E5DEC9]' : 'bg-[#EBE5DA] hover:bg-[#dfd7c7] text-[#1B1B1D]';
  const itemNormalClass = isDark ? 'bg-[#1F2125] hover:bg-[#2A2D31] text-gray-100 border-[#2A2D31]' : 'bg-[#FAF6EE] hover:bg-[#f3ece0] text-[#2B2B2B] border-[#E5DEC9]';

  const filteredChapters = CHAPTERS.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.content.some(line => line.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

      {/* Main Table of Contents Panel */}
      <div className={`max-w-3xl w-full my-4 md:my-6 p-4 sm:p-6 md:p-10 rounded-lg border book-page-shadow space-y-5 md:space-y-6 shrink-0 ${cardBgClass}`}>
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[11px] text-[#C5A059] uppercase tracking-[0.3em] font-cinzel font-bold block">
            Table of Contents
          </span>
          <h2 className={`text-2xl md:text-3xl font-cinzel font-bold ${titleClass}`}>
            The 21 Chapters of Prayer & Destiny
          </h2>
          
          {/* Mandatory Credits Banner */}
          <div className={`flex justify-center items-center gap-6 text-xs font-cinzel ${subtextClass} pt-2 pb-1 border-b ${borderClass}`}>
            <span>Written by <strong className={titleClass}>{BOOK_METADATA.author}</strong></span>
            <span>•</span>
            <span>Edited by <strong className={titleClass}>{BOOK_METADATA.editor}</strong></span>
          </div>
        </div>

        {/* Jump to Chapter Dropdown & Search Bar */}
        <div className="space-y-3">
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-md border ${inputBgClass}`}>
            <label htmlFor="jump-chapter-select" className={`text-xs font-cinzel font-bold ${subtextClass} uppercase tracking-wider shrink-0 flex items-center gap-1.5`}>
              <BookOpen className="w-4 h-4 text-[#C5A059]" /> Jump to Chapter:
            </label>
            <select
              id="jump-chapter-select"
              value={currentChapterId}
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                if (selectedId) {
                  onSelectChapter(selectedId);
                  onClose();
                }
              }}
              className={`flex-1 px-3 py-2 rounded border text-xs font-cinzel font-bold focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer shadow-sm ${inputBgClass}`}
            >
              {CHAPTERS.map((ch) => (
                <option key={ch.id} value={ch.id} className={isDark ? 'bg-[#121315] text-amber-100' : ''}>
                  Chapter {ch.id}: {ch.title}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${subtextClass}`} />
            <input
              type="text"
              placeholder="Search chapters or story text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded border focus:border-[#C5A059] focus:outline-none text-sm font-jakarta ${inputBgClass}`}
            />
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className={`flex flex-wrap items-center justify-between gap-2 text-xs font-cinzel ${subtextClass}`}>
          <div className="flex gap-2">
            <button
              onClick={onOpenCover}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${buttonSecClass}`}
            >
              Cover Page
            </button>
            <button
              onClick={onOpenCopyright}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${buttonSecClass}`}
            >
              Copyright Page
            </button>
          </div>
          <span className={isDark ? 'text-[#a38c67]' : 'text-[#5A4836] font-semibold'}>Total Chapters: 21</span>
        </div>

        {/* Chapters List */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {filteredChapters.map((chapter) => {
            const isCurrent = chapter.id === currentChapterId;
            const hasBookmark = bookmarks.includes(chapter.id);

            return (
              <button
                key={chapter.id}
                onClick={() => {
                  onSelectChapter(chapter.id);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-md border transition-all flex items-center justify-between gap-4 group cursor-pointer ${
                  isCurrent
                    ? 'bg-[#121315] text-[#C5A059] border-[#C5A059]/80 shadow-md'
                    : itemNormalClass
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-cinzel text-xs font-bold shrink-0 ${
                    isCurrent ? 'bg-[#C5A059] text-[#121315]' : (isDark ? 'bg-[#2A2D31] text-amber-200' : 'bg-[#E2D9C8] text-[#5c4a38]')
                  }`}>
                    {chapter.id}
                  </span>

                  <div className="min-w-0">
                    <h3 className={`font-cinzel text-sm font-semibold truncate ${
                      isCurrent ? 'text-[#C5A059]' : (isDark ? 'text-amber-100 group-hover:text-[#C5A059]' : 'text-[#2B2B2B] group-hover:text-[#8c6b30]')
                    }`}>
                      {chapter.title}
                    </h3>
                    {chapter.illustration && (
                      <span className={`text-[10px] ${subtextClass} font-jakarta italic flex items-center gap-1 mt-0.5`}>
                        <Sparkles className="w-3 h-3 text-[#C5A059]" /> Illustrated Chapter
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {hasBookmark && (
                    <Bookmark className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                  )}
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isCurrent ? 'text-[#C5A059]' : subtextClass
                  }`} />
                </div>
              </button>
            );
          })}

          {filteredChapters.length === 0 && (
            <div className={`text-center py-8 font-cormorant text-base ${subtextClass}`}>
              No matching chapters found for "{searchTerm}".
            </div>
          )}
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
