import React from 'react';
import { PaperTheme, FontSize, ViewMode, ReaderSettings } from '../types';
import { Type, BookOpen, Layers, X, Sparkles } from 'lucide-react';

interface ReaderControlsProps {
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  onClose: () => void;
}

export const ReaderControls: React.FC<ReaderControlsProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#121315] border border-[#2A2D31] text-[#E5DEC9] max-w-md w-full max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6 shadow-2xl space-y-5 sm:space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2A2D31] pb-4">
          <div className="flex items-center gap-2 text-[#C5A059]">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-cinzel text-base font-bold uppercase tracking-wider">
              Reader Customization
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#2A2D31] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Form Options */}
        <div className="space-y-5 text-xs font-jakarta">

          {/* Paper Texture Theme */}
          <div className="space-y-2">
            <label className="text-[#8C7355] font-cinzel uppercase tracking-wider text-[10px] font-semibold block">
              Paper Texture & Theme
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ theme: 'cream' })}
                className={`p-3 rounded border text-center transition-all cursor-pointer font-cormorant font-semibold text-sm ${
                  settings.theme === 'cream'
                    ? 'bg-[#FCF9F3] text-[#1B1B1D] border-[#C5A059] ring-2 ring-[#C5A059]/40'
                    : 'bg-[#1e2024] text-gray-300 border-[#2A2D31] hover:border-gray-500'
                }`}
              >
                Cream Paper
              </button>

              <button
                onClick={() => onUpdateSettings({ theme: 'sepia' })}
                className={`p-3 rounded border text-center transition-all cursor-pointer font-cormorant font-semibold text-sm ${
                  settings.theme === 'sepia'
                    ? 'bg-[#F4ECD8] text-[#312519] border-[#C5A059] ring-2 ring-[#C5A059]/40'
                    : 'bg-[#1e2024] text-gray-300 border-[#2A2D31] hover:border-gray-500'
                }`}
              >
                Sepia Vintage
              </button>

              <button
                onClick={() => onUpdateSettings({ theme: 'midnight' })}
                className={`p-3 rounded border text-center transition-all cursor-pointer font-cormorant font-semibold text-sm ${
                  settings.theme === 'midnight'
                    ? 'bg-[#16171a] text-[#E5DEC9] border-[#C5A059] ring-2 ring-[#C5A059]/40'
                    : 'bg-[#1e2024] text-gray-300 border-[#2A2D31] hover:border-gray-500'
                }`}
              >
                Midnight Night
              </button>
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="text-[#8C7355] font-cinzel uppercase tracking-wider text-[10px] font-semibold block">
              Typography Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ fontFamily: 'cormorant' })}
                className={`p-2.5 rounded border text-center transition-all cursor-pointer font-cormorant text-base ${
                  settings.fontFamily === 'cormorant'
                    ? 'bg-[#C5A059] text-[#121315] font-bold border-[#C5A059]'
                    : 'bg-[#1e2024] text-gray-300 border-[#2A2D31] hover:border-gray-500'
                }`}
              >
                Cormorant
              </button>

              <button
                onClick={() => onUpdateSettings({ fontFamily: 'eb-garamond' })}
                className={`p-2.5 rounded border text-center transition-all cursor-pointer font-eb-garamond text-base ${
                  settings.fontFamily === 'eb-garamond'
                    ? 'bg-[#C5A059] text-[#121315] font-bold border-[#C5A059]'
                    : 'bg-[#1e2024] text-gray-300 border-[#2A2D31] hover:border-gray-500'
                }`}
              >
                EB Garamond
              </button>

              <button
                onClick={() => onUpdateSettings({ fontFamily: 'amiri' })}
                className={`p-2.5 rounded border text-center transition-all cursor-pointer font-amiri text-base ${
                  settings.fontFamily === 'amiri'
                    ? 'bg-[#C5A059] text-[#121315] font-bold border-[#C5A059]'
                    : 'bg-[#1e2024] text-gray-300 border-[#2A2D31] hover:border-gray-500'
                }`}
              >
                Amiri
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="text-[#8C7355] font-cinzel uppercase tracking-wider text-[10px] font-semibold block">
              Font Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'sm', label: 'Small' },
                { key: 'base', label: 'Medium' },
                { key: 'lg', label: 'Large' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => onUpdateSettings({ fontSize: item.key as FontSize })}
                  className={`py-2.5 rounded border uppercase font-cinzel text-xs font-bold transition-all cursor-pointer ${
                    settings.fontSize === item.key
                      ? 'bg-[#C5A059] text-[#121315] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]'
                      : 'bg-[#1e2024] text-gray-300 border-[#2A2D31] hover:border-gray-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded bg-[#C5A059] text-[#121315] hover:bg-[#d4af37] font-cinzel font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
        >
          Apply & Return to Novel
        </button>
      </div>
    </div>
  );
};
