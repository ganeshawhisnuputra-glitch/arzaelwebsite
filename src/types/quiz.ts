export interface QuizOption {
  id: string;
  label: string;
  subtext?: string;
  patternKey: string; // e.g. "DISAPPEARING", "PERFECTIONISM", "CONTROL", "PROVOCATION"
}

export interface QuizQuestion {
  id: number;
  question: string;
  note?: string;
  options: QuizOption[];
}

export interface QuizResult {
  patternKey: string;
  patternTitle: string; // e.g. "DISAPPEARING"
  tagline: string;
  observation: string;
  songTitle: string;
  songId: string;
  actionText: string;
}
