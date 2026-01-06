
export interface UnitContent {
  id: number;
  title: string;
  theme: string;
  vocabulary: string[];
  grammar: string[];
  description: string;
  color: string;
  icon: string;
}

export interface PracticeQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
