import React, { useState } from 'react';
import { TextHighlight } from '../types';
import { Sparkles, Trash2, Copy, Bookmark, ChevronRight, X, Highlighter, Check } from 'lucide-react';

interface HighlightsModalProps {
  highlights: TextHighlight[];
  onSelectChapter: (chapterId: number) => void;
  onDeleteHighlight: (id: string) => void;
  onClearAllHighlights: () => void;
  onClose: () => void;
}

export const HighlightsModal: React.FC<HighlightsModalProps> = ({
  highlights,
  onSelectChapter,
  onDeleteHighlight,
  onClearAllHighlights,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterChapter, setFilterChapter] = useState<number | 'all'>('all');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredHighlights = filterChapter === 'all'
    ? highlights
    : highlights.filter(h => h.chapterId === filterChapter);

  // Get unique chapter IDs present in highlights
  const uniqueChapterIds = Array.from(new Set(highlights.map(h => h.chapterId))).sort((a: number, b: number) => a - b);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#121315] border border-[#2A2D31] text-[#E5DEC9] max-w-2xl w-full max-h-[90vh] rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-4 sm:space-y-5 relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#2A2D31] pb-4">
          <div className="flex items-center gap-2.5 text-[#C5A059]">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-amber-100">
                Saved Story Highlights
              </h3>
              <p className="text-[11px] font-jakarta text-gray-400">
                Saved locally to your browser ({highlights.length} total)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2A2D31] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        {highlights.length > 0 && (
          <div className="flex items-center justify-between gap-3 text-xs font-jakarta flex-wrap bg-[#1A1C20] p-2.5 rounded-lg border border-[#2A2D31]">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-cinzel text-[10px] uppercase tracking-wider">Filter Chapter:</span>
              <select
                value={filterChapter}
                onChange={(e) => setFilterChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="bg-[#121315] text-amber-100 border border-[#2A2D31] rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#C5A059]"
              >
                <option value="all">All Chapters ({highlights.length})</option>
                {uniqueChapterIds.map(chId => (
                  <option key={chId} value={chId}>Chapter {chId}</option>
                ))}
              </select>
            </div>

            {highlights.length > 0 && (
              <button
                onClick={onClearAllHighlights}
                className="text-red-400 hover:text-red-300 text-[11px] font-cinzel uppercase tracking-wider hover:underline cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
        )}

        {/* Highlights List Container */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredHighlights.map((highlight) => (
            <div
              key={highlight.id}
              className="p-4 rounded-lg bg-[#1A1C20] border border-[#2A2D31] hover:border-[#C5A059]/50 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onSelectChapter(highlight.chapterId);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 font-cinzel text-[11px] font-bold uppercase tracking-wider hover:bg-[#C5A059]/20 transition-colors cursor-pointer"
                >
                  <Bookmark className="w-3 h-3 fill-[#C5A059]" />
                  Chapter {highlight.chapterId}: {highlight.chapterTitle}
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(highlight.id, highlight.text)}
                    title="Copy Highlighted Text"
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#2A2D31] transition-colors cursor-pointer"
                  >
                    {copiedId === highlight.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => onDeleteHighlight(highlight.id)}
                    title="Delete Highlight"
                    className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-[#2A2D31] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Highlighted Quote snippet */}
              <blockquote className="font-cormorant text-lg italic text-amber-100/95 pl-3 border-l-2 border-[#C5A059] leading-relaxed">
                "{highlight.text}"
              </blockquote>

              <div className="text-[10px] text-gray-500 font-jakarta flex justify-between items-center pt-1">
                <span>Saved on {highlight.date}</span>
                <span className="text-[#C5A059] group-hover:underline cursor-pointer" onClick={() => {
                  onSelectChapter(highlight.chapterId);
                  onClose();
                }}>
                  Jump to Chapter →
                </span>
              </div>
            </div>
          ))}

          {highlights.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1A1C20] border border-[#2A2D31] flex items-center justify-center mx-auto text-[#C5A059]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-sm text-gray-300 font-semibold uppercase tracking-wider">
                No Highlights Saved Yet
              </h4>
              <p className="font-cormorant text-base text-gray-400 max-w-sm mx-auto">
                While reading any chapter, simply select text with your mouse or touch to reveal the highlight tool and save your favorite prayers and dialogues to localStorage.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#2A2D31] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded bg-[#C5A059] text-[#121315] hover:bg-[#d4af37] font-cinzel font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
