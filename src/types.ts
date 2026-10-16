export type PaperTheme = 'cream' | 'sepia' | 'midnight';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type ViewMode = 'spread' | 'single' | 'continuous';

export interface Chapter {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  illustration?: string;
  illustrationCaption?: string;
}

export interface TextHighlight {
  id: string;
  chapterId: number;
  chapterTitle: string;
  text: string;
  date: string;
  paragraphIndex?: number;
  color?: string;
}

export interface Bookmark {
  chapterId: number;
  paragraphIndex: number;
  date: string;
  note?: string;
}

export interface ReaderSettings {
  theme: PaperTheme;
  fontSize: FontSize;
  fontFamily: 'cormorant' | 'eb-garamond' | 'amiri';
  lineHeight: 'normal' | 'relaxed' | 'loose';
  showRunningHeader: boolean;
}
