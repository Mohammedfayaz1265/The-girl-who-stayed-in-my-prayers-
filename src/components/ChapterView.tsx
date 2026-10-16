import React, { useEffect, useRef, useState } from 'react';
import { Chapter, PaperTheme, FontSize, ViewMode, TextHighlight } from '../types';
import { BOOK_METADATA } from '../data/novelData';
import { Bookmark, Sparkles, ChevronLeft, ChevronRight, Feather, ShieldCheck, Highlighter, Check } from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  theme: PaperTheme;
  fontSize: FontSize;
  fontFamily: string;
  lineHeight: string;
  viewMode: ViewMode;
  isBookmarked: boolean;
  highlights: TextHighlight[];
  onToggleBookmark: () => void;
  onAddHighlight: (highlight: TextHighlight) => void;
  onNextChapter: () => void;
  onPrevChapter: () => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  chapterIndex,
  totalChapters,
  theme,
  fontSize,
  fontFamily,
  lineHeight,
  viewMode,
  isBookmarked,
  highlights,
  onToggleBookmark,
  onAddHighlight,
  onNextChapter,
  onPrevChapter,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState<string>('');
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [chapter.id]);

  // Touch Swipe Gesture Handlers for changing chapters
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleTextSelection();

    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    if (e.changedTouches.length === 0) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchStartXRef.current - touchEndX;
    const deltaY = touchStartYRef.current - touchEndY;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Minimum swipe horizontal distance threshold
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        // Swiped Left -> Next Chapter
        if (chapterIndex < totalChapters - 1) {
          onNextChapter();
        }
      } else {
        // Swiped Right -> Previous Chapter
        if (chapterIndex > 0) {
          onPrevChapter();
        }
      }
    }
  };

  // Handle text selection within chapter story container
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setPopoverPos(null);
      setSelectedText('');
      return;
    }

    const text = selection.toString().trim();
    if (text.length > 2) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSelectedText(text);
        setPopoverPos({
          x: rect.left + rect.width / 2,
          y: rect.top - 45,
        });
      }
    } else {
      setPopoverPos(null);
      setSelectedText('');
    }
  };

  const saveCurrentHighlight = () => {
    if (!selectedText) return;

    const newHighlight: TextHighlight = {
      id: Date.now().toString(),
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      text: selectedText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    onAddHighlight(newHighlight);
    setPopoverPos(null);
    setSelectedText('');

    window.getSelection()?.removeAllRanges();

    setToastMessage('Highlight saved to localStorage!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getPaperThemeClass = () => {
    switch (theme) {
      case 'sepia':
        return 'paper-sepia';
      case 'midnight':
        return 'paper-midnight';
      case 'cream':
      default:
        return 'paper-cream';
    }
  };

  const getStoryTextColorClass = () => {
    switch (theme) {
      case 'midnight':
        return 'story-text-midnight';
      case 'sepia':
        return 'story-text-sepia';
      case 'cream':
      default:
        return 'story-text-cream';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-sm sm:text-base';
      case 'lg':
        return 'text-xl sm:text-2xl';
      case 'xl':
        return 'text-2xl sm:text-3xl';
      case '2xl':
        return 'text-3xl sm:text-4xl';
      case 'base':
      default:
        return 'text-lg sm:text-xl';
    }
  };

  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'amiri':
        return 'font-amiri';
      case 'eb-garamond':
        return 'font-eb-garamond';
      case 'cormorant':
      default:
        return 'font-cormorant';
    }
  };

  const getLineHeightClass = () => {
    switch (lineHeight) {
      case 'loose':
        return 'leading-[2.2]';
      case 'relaxed':
        return 'leading-[1.9]';
      case 'normal':
      default:
        return 'leading-[1.75]';
    }
  };

  const currentChapterHighlights = highlights.filter((h) => h.chapterId === chapter.id);

  const renderParagraphWithHighlights = (text: string) => {
    if (currentChapterHighlights.length === 0) return text;

    let matches: { text: string }[] = [];
    currentChapterHighlights.forEach((h) => {
      if (text.includes(h.text)) {
        matches.push(h);
      }
    });

    if (matches.length === 0) return text;

    let parts: (string | React.ReactNode)[] = [text];
    matches.forEach((m) => {
      const nextParts: (string | React.ReactNode)[] = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const splitParts = part.split(m.text);
          splitParts.forEach((sp, idx) => {
            nextParts.push(sp);
            if (idx < splitParts.length - 1) {
              nextParts.push(
                <mark
                  key={`${m.text}-${idx}`}
                  className="bg-[#C5A059]/40 text-inherit px-1 rounded shadow-sm border-b border-[#C5A059]"
                  title="Saved Highlight"
                >
                  {m.text}
                </mark>
              );
            }
          });
        } else {
          nextParts.push(part);
        }
      });
      parts = nextParts;
    });

    return parts;
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseUp={handleTextSelection}
      className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center p-2 sm:p-4 md:p-8 relative select-text"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#121315] text-[#C5A059] border border-[#C5A059] px-4 py-2.5 rounded-full shadow-2xl font-cinzel text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Floating Selection Toolbar */}
      {popoverPos && (
        <div
          style={{
            position: 'fixed',
            left: `${popoverPos.x}px`,
            top: `${popoverPos.y}px`,
            transform: 'translateX(-50%)',
          }}
          className="z-50 bg-[#121315] border border-[#C5A059] rounded-lg shadow-2xl p-1.5 flex items-center gap-2 animate-fade-in"
        >
          <button
            onClick={saveCurrentHighlight}
            className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#d4af37] text-[#121315] font-cinzel font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Sparkles className="w-3.5 h-3.5 fill-[#121315]" />
            Save Highlight
          </button>
        </div>
      )}

      {/* Paper Page Container with Book Shadow */}
      <div
        className={`w-full max-w-4xl min-h-[85vh] my-2 md:my-6 p-4 sm:p-10 md:p-16 rounded-lg border ${
          theme === 'midnight' ? 'border-[#2A2D31]' : 'border-[#E5DEC9]'
        } ${getPaperThemeClass()} book-page-shadow relative flex flex-col justify-between transition-all duration-300`}
      >
        {/* Top Corner Motif */}
        <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A059] opacity-30">
            <path d="M100 0 L100 100 L0 0 Z" fill="currentColor" />
            <circle cx="85" cy="15" r="5" fill="currentColor" opacity="0.2" />
          </svg>
        </div>

        {/* Top Running Header */}
        <div className={`w-full pb-4 mb-8 border-b ${
          theme === 'midnight' ? 'border-[#2A2D31] text-[#9A8973]' : 'border-[#E5DEC9] text-[#3A2F24]'
        } flex items-center justify-between text-[11px] font-cinzel tracking-[0.2em] uppercase font-semibold select-none shrink-0`}>
          <span className="truncate max-w-[80%]">{BOOK_METADATA.runningHeader}</span>
          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Chapter'}
            className="p-1 rounded hover:bg-black/5 transition-colors cursor-pointer"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-[#C5A059] text-[#C5A059]' : 'text-[#3A2F24]'
              }`}
            />
          </button>
        </div>

        {/* Complete Chapter Header Block - STRICT SEPARATION FROM BODY TEXT */}
        <header className="w-full mb-10 pb-6 border-b border-[#C5A059]/30 text-center space-y-4 relative select-none shrink-0">
          <div className={`text-[11px] uppercase tracking-[0.35em] font-cinzel font-bold ${
            theme === 'midnight' ? 'text-[#C5A059]' : 'text-[#2B2B2B]'
          }`}>
            Chapter {chapter.id} of {totalChapters}
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-tight leading-tight ${
            theme === 'midnight' ? 'text-amber-100' : 'text-[#2B2B2B]'
          }`}>
            {chapter.title}
          </h1>

          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto opacity-80 my-2" />

          {/* Author & Editor Credits */}
          <div className={`flex flex-wrap items-center justify-center gap-6 py-2 font-cinzel text-xs uppercase tracking-wider ${
            theme === 'midnight' ? 'text-[#A38C67]' : 'text-[#2B2B2B]'
          }`}>
            <div className="flex items-center gap-2">
              <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Written by <strong className={theme === 'midnight' ? 'text-amber-200' : 'text-[#2B2B2B]'}>{BOOK_METADATA.author}</strong></span>
            </div>
            <span className="text-[#C5A059]">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Edited by <strong className={theme === 'midnight' ? 'text-amber-200' : 'text-[#2B2B2B]'}>{BOOK_METADATA.editor}</strong></span>
            </div>
          </div>
        </header>

        {/* Chapter Illustration if available */}
        {chapter.illustration && (
          <div className="w-full mb-10 rounded-lg overflow-hidden border border-[#C5A059]/40 shadow-xl max-w-2xl mx-auto space-y-2 group select-none shrink-0">
            <img
              src={chapter.illustration}
              alt={chapter.title}
              className="w-full h-auto max-h-[420px] object-cover group-hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {chapter.illustrationCaption && (
              <p className="p-3 text-center font-cormorant italic text-xs md:text-sm text-[#8C7355] bg-[#0A0A0B]/5 border-t border-[#C5A059]/20">
                <Sparkles className="w-3 h-3 text-[#C5A059] inline mr-1.5" />
                {chapter.illustrationCaption}
              </p>
            )}
          </div>
        )}

        {/* Story Body Paragraphs - STRICTLY BEGINS BELOW HEADER & CREDITS */}
        <div
          ref={storyRef}
          className={`w-full space-y-6 pt-2 my-4 clear-both ${getFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()} ${getStoryTextColorClass()}`}
        >
          {chapter.content.map((paragraph, index) => {
            const isSeparator = paragraph.trim() === '⸻' || paragraph.trim() === '---';

            if (isSeparator) {
              return (
                <div key={index} className="py-6 text-center text-[#C5A059] font-cinzel tracking-widest text-lg opacity-80 select-none">
                  ✦ ⸻ ✦
                </div>
              );
            }

            // Drop cap only on first opening paragraph if it doesn't start with quote
            const isFirstTextParagraph = index === 0;
            const applyDropCap = isFirstTextParagraph && !paragraph.startsWith('“');

            return (
              <p
                key={index}
                className={`text-justify transition-all duration-200 text-[#F5F5F5] ${
                  applyDropCap ? 'drop-cap-gold' : ''
                } ${paragraph.startsWith('“') ? 'pl-2 md:pl-4 border-l-2 border-[#C5A059]/50 italic' : ''}`}
              >
                {renderParagraphWithHighlights(paragraph)}
              </p>
            );
          })}
        </div>

        {/* Bottom Running Footer with Page Navigation */}
        <div className={`w-full pt-8 mt-12 border-t ${
          theme === 'midnight' ? 'border-[#2A2D31] text-[#9A8973]' : 'border-[#E5DEC9] text-[#8C7355]'
        } flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-cinzel select-none shrink-0`}>
          
          <button
            onClick={onPrevChapter}
            disabled={chapterIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4 text-[#C5A059]" />
            Previous Chapter
          </button>

          <div className="text-center space-y-1">
            <span className="tracking-[0.18em] uppercase font-semibold text-[10px] block">
              {BOOK_METADATA.runningHeader}
            </span>
            <span className="text-[#C5A059] font-bold text-xs">
              Page {chapter.id} of {totalChapters}
            </span>
          </div>

          <button
            onClick={onNextChapter}
            disabled={chapterIndex === totalChapters - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#121315] text-[#C5A059] hover:bg-[#1f2125] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer uppercase tracking-wider font-bold"
          >
            Next Chapter
            <ChevronRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

        {/* Bottom Corner Motif */}
        <div className="absolute bottom-0 left-0 w-20 h-20 transform rotate-180 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A059] opacity-30">
            <path d="M100 0 L100 100 L0 0 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};
