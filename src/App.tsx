import React, { useState, useEffect } from 'react';
import { CHAPTERS, BOOK_METADATA } from './data/novelData';
import { PaperTheme, FontSize, ViewMode, ReaderSettings, TextHighlight } from './types';
import { CoverPage } from './components/CoverPage';
import { CopyrightPage } from './components/CopyrightPage';
import { TableOfContents } from './components/TableOfContents';
import { ChapterView } from './components/ChapterView';
import { EndingPage } from './components/EndingPage';
import { ReaderControls } from './components/ReaderControls';
import { HighlightsModal } from './components/HighlightsModal';
import {
  BookOpen,
  Bookmark,
  SlidersHorizontal,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Feather,
  Sparkles,
  Info,
  Highlighter
} from 'lucide-react';

type ScreenState = 'cover' | 'copyright' | 'toc' | 'reader' | 'ending';

export function App() {
  const [screen, setScreen] = useState<ScreenState>('cover');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [highlights, setHighlights] = useState<TextHighlight[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showControlsModal, setShowControlsModal] = useState(false);
  const [showHighlightsModal, setShowHighlightsModal] = useState(false);

  const [readerSettings, setReaderSettings] = useState<ReaderSettings>({
    theme: 'midnight',
    fontSize: 'base',
    fontFamily: 'cormorant',
    lineHeight: 'relaxed',
    showRunningHeader: true,
  });

  // Load saved bookmarks & highlights from localStorage on mount
  useEffect(() => {
    try {
      const savedBm = localStorage.getItem('novel_bookmarks');
      if (savedBm) {
        setBookmarks(JSON.parse(savedBm));
      }
      const savedHl = localStorage.getItem('novel_highlights');
      if (savedHl) {
        setHighlights(JSON.parse(savedHl));
      }
    } catch (e) {
      console.debug('LocalStorage error', e);
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (chapterId: number) => {
    setBookmarks((prev) => {
      const updated = prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId];
      try {
        localStorage.setItem('novel_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.debug('LocalStorage save error', e);
      }
      return updated;
    });
  };

  // Add new text highlight
  const handleAddHighlight = (newHighlight: TextHighlight) => {
    setHighlights((prev) => {
      const updated = [newHighlight, ...prev];
      try {
        localStorage.setItem('novel_highlights', JSON.stringify(updated));
      } catch (e) {
        console.debug('LocalStorage highlight save error', e);
      }
      return updated;
    });
  };

  // Delete highlight
  const handleDeleteHighlight = (id: string) => {
    setHighlights((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      try {
        localStorage.setItem('novel_highlights', JSON.stringify(updated));
      } catch (e) {
        console.debug('LocalStorage highlight delete error', e);
      }
      return updated;
    });
  };

  // Clear all highlights
  const handleClearAllHighlights = () => {
    setHighlights([]);
    try {
      localStorage.removeItem('novel_highlights');
    } catch (e) {
      console.debug('LocalStorage clear error', e);
    }
  };

  const handleUpdateSettings = (newSettings: Partial<ReaderSettings>) => {
    setReaderSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const currentChapter = CHAPTERS[currentChapterIndex];

  return (
    <div className="flex h-screen w-screen bg-studio-dark overflow-hidden font-cinzel text-white selection:bg-[#C5A059]/30 selection:text-amber-100 relative">
      {/* LEFT SIDEBAR: Meta Information & Navigation (Sophisticated Dark Aesthetic) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed md:relative z-40 inset-y-0 left-0 w-[300px] bg-sidebar-dark border-r border-studio flex flex-col justify-between p-6 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Header Branding */}
          <div className="space-y-2 border-b border-studio pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em]">
                Publication Status
              </span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-px w-8 bg-[#C5A059]" />
            <div className="text-xs text-gray-300 font-jakarta font-medium">
              Premium Print Edition
            </div>
            <div className="text-[11px] text-gray-500 font-jakarta">
              Layout Refined for 16:9 Screen
            </div>
          </div>

          {/* Book Title & Credits */}
          <div className="space-y-3 bg-[#16171a] p-4 rounded-lg border border-studio">
            <h1 className="font-cinzel text-sm font-bold text-[#FCF6BA] leading-snug">
              {BOOK_METADATA.title}
            </h1>
            <div className="space-y-1 font-jakarta text-[11px] text-gray-400 border-t border-studio/60 pt-2">
              <div className="flex items-center gap-1.5">
                <Feather className="w-3 h-3 text-[#C5A059]" />
                <span>Written by: <strong className="text-gray-200">{BOOK_METADATA.author}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
                <span>Edited by: <strong className="text-gray-200">{BOOK_METADATA.editor}</strong></span>
              </div>
            </div>
          </div>

          {/* Navigation Quick Links */}
          <nav className="space-y-1.5 font-cinzel text-xs uppercase tracking-wider">
            <button
              onClick={() => {
                setScreen('cover');
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded transition-colors flex items-center gap-2.5 cursor-pointer ${
                screen === 'cover'
                  ? 'bg-[#C5A059] text-[#121315] font-bold'
                  : 'text-gray-300 hover:bg-[#1A1C20] hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Cover Page
            </button>

            <button
              onClick={() => {
                setScreen('copyright');
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded transition-colors flex items-center gap-2.5 cursor-pointer ${
                screen === 'copyright'
                  ? 'bg-[#C5A059] text-[#121315] font-bold'
                  : 'text-gray-300 hover:bg-[#1A1C20] hover:text-white'
              }`}
            >
              <Info className="w-4 h-4" /> Copyright Page
            </button>

            <button
              onClick={() => {
                setScreen('toc');
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded transition-colors flex items-center gap-2.5 cursor-pointer ${
                screen === 'toc'
                  ? 'bg-[#C5A059] text-[#121315] font-bold'
                  : 'text-gray-300 hover:bg-[#1A1C20] hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Table of Contents
            </button>

            <button
              onClick={() => {
                setShowHighlightsModal(true);
                setIsSidebarOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded text-gray-300 hover:bg-[#1A1C20] hover:text-white transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <Highlighter className="w-4 h-4 text-[#C5A059]" /> Saved Highlights
              </span>
              {highlights.length > 0 && (
                <span className="bg-[#C5A059] text-[#121315] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {highlights.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setShowControlsModal(true);
                setIsSidebarOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded text-gray-300 hover:bg-[#1A1C20] hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" /> Customize Reader
            </button>
          </nav>

          {/* Bookmarks Quick List */}
          {bookmarks.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-studio">
              <span className="text-[10px] uppercase font-cinzel text-[#C5A059] tracking-widest font-bold flex items-center gap-1">
                <Bookmark className="w-3 h-3 fill-[#C5A059]" /> Saved Bookmarks ({bookmarks.length})
              </span>
              <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                {bookmarks.map((bId) => {
                  const ch = CHAPTERS.find((c) => c.id === bId);
                  if (!ch) return null;
                  return (
                    <button
                      key={bId}
                      onClick={() => {
                        setCurrentChapterIndex(ch.id - 1);
                        setScreen('reader');
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded bg-[#1A1C20] hover:bg-[#2A2D31] text-[11px] font-jakarta text-amber-100 truncate flex items-center justify-between"
                    >
                      <span className="truncate">Ch {ch.id}: {ch.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer: Source Preservation Metadata */}
        <div className="border-t border-studio pt-4 space-y-2 text-[10px] text-gray-500 font-jakarta uppercase tracking-widest leading-relaxed">
          <div className="text-[#C5A059] font-bold">Source Preservation</div>
          <div>100% Content Accuracy</div>
          <div>Original Dialogue Retained</div>
          <div>LocalStorage Sync Enabled</div>
        </div>
      </aside>

      {/* RIGHT MAIN AREA: Studio Canvas displaying Luxury Book Pages */}
      <main className="flex-1 bg-canvas-dark flex flex-col relative overflow-hidden">
        {/* Top Control Bar for Mobile or Desktop shortcuts */}
        <header className="h-14 bg-sidebar-dark border-b border-studio px-4 flex items-center justify-between z-10 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded text-gray-300 hover:text-white hover:bg-[#1A1C20]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="font-cinzel text-xs font-semibold text-[#C5A059] uppercase tracking-wider truncate mx-2">
            {screen === 'cover' && 'Cover Page'}
            {screen === 'copyright' && 'Copyright & Credits'}
            {screen === 'toc' && 'Table of Contents'}
            {screen === 'reader' && `Chapter ${currentChapter.id}: ${currentChapter.title}`}
            {screen === 'ending' && 'The Epilogue'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHighlightsModal(true)}
              title="Saved Story Highlights"
              className="p-2 rounded text-gray-300 hover:text-[#C5A059] hover:bg-[#1A1C20] transition-colors cursor-pointer relative"
            >
              <Highlighter className="w-4 h-4 text-[#C5A059]" />
              {highlights.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] text-[#121315] rounded-full text-[9px] font-bold flex items-center justify-center">
                  {highlights.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowControlsModal(true)}
              className="p-2 rounded text-gray-300 hover:text-[#C5A059] hover:bg-[#1A1C20] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Viewer Workspace */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col md:items-center md:justify-center">
          {screen === 'cover' && (
            <CoverPage
              theme={readerSettings.theme}
              onStartReading={() => {
                setCurrentChapterIndex(0);
                setScreen('reader');
              }}
              onOpenTOC={() => setScreen('toc')}
              onOpenCopyright={() => setScreen('copyright')}
            />
          )}

          {screen === 'copyright' && (
            <CopyrightPage
              theme={readerSettings.theme}
              onNext={() => setScreen('toc')}
              onPrev={() => setScreen('cover')}
            />
          )}

          {screen === 'toc' && (
            <TableOfContents
              theme={readerSettings.theme}
              currentChapterId={currentChapter.id}
              onSelectChapter={(id) => {
                setCurrentChapterIndex(id - 1);
                setScreen('reader');
              }}
              onClose={() => setScreen('reader')}
              onOpenCover={() => setScreen('cover')}
              onOpenCopyright={() => setScreen('copyright')}
              bookmarks={bookmarks}
            />
          )}

          {screen === 'reader' && (
            <ChapterView
              chapter={currentChapter}
              chapterIndex={currentChapterIndex}
              totalChapters={CHAPTERS.length}
              theme={readerSettings.theme}
              fontSize={readerSettings.fontSize}
              fontFamily={readerSettings.fontFamily}
              lineHeight={readerSettings.lineHeight}
              viewMode="single"
              isBookmarked={bookmarks.includes(currentChapter.id)}
              highlights={highlights}
              onToggleBookmark={() => toggleBookmark(currentChapter.id)}
              onAddHighlight={handleAddHighlight}
              onNextChapter={() => {
                if (currentChapterIndex < CHAPTERS.length - 1) {
                  setCurrentChapterIndex((prev) => prev + 1);
                } else {
                  setScreen('ending');
                }
              }}
              onPrevChapter={() => {
                if (currentChapterIndex > 0) {
                  setCurrentChapterIndex((prev) => prev - 1);
                }
              }}
            />
          )}

          {screen === 'ending' && (
            <EndingPage
              theme={readerSettings.theme}
              onRestart={() => {
                setCurrentChapterIndex(0);
                setScreen('reader');
              }}
              onOpenTOC={() => setScreen('toc')}
            />
          )}
        </div>
      </main>

      {/* Highlights Modal */}
      {showHighlightsModal && (
        <HighlightsModal
          highlights={highlights}
          onSelectChapter={(chapterId) => {
            setCurrentChapterIndex(chapterId - 1);
            setScreen('reader');
          }}
          onDeleteHighlight={handleDeleteHighlight}
          onClearAllHighlights={handleClearAllHighlights}
          onClose={() => setShowHighlightsModal(false)}
        />
      )}

      {/* Reader Controls Customization Modal */}
      {showControlsModal && (
        <ReaderControls
          settings={readerSettings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setShowControlsModal(false)}
        />
      )}
    </div>
  );
}

export default App;
