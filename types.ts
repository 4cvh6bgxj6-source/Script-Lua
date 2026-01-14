
export interface Script {
  id: string;
  title: string;
  game: string;
  description: string;
  author: string;
  code: string;
  stars: number;
  downloads: number;
  tags: string[];
  lastUpdated: string;
  thumbnail: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum AppTab {
  HOME = 'home',
  BROWSE = 'browse',
  AI_ASSISTANT = 'ai_assistant',
  CUSTOM_SCRIPTS = 'custom_scripts'
}
