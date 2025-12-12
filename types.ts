
export type ViewMode = 'LANDING' | 'AUTH' | 'DASHBOARD' | 'MENTOR' | 'PRACTICE' | 'PROFILE';

export interface UserProfile {
  id?: string;
  user_id?: string;
  email?: string;
  name: string;
  role: string;
  bio: string;
  goals: string[];
  skills: string[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface ActivityMetric {
  day: string;
  solved: number;
  hours: number;
}

export interface ConnectionState {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number;
}

export interface ToolContext {
  updateMindmap: (content: string) => void;
  updateFlowchart: (content: string) => void;
  updateWhiteboard: (content: string) => void;
  writeCode: (code: string) => void;
  setActiveLine: (line: number) => void;
  moveCursor: (x: number, y: number) => void;
  showTopicInfo: (title: string, description: string) => void;
  changeProblem: (topic: string, difficulty: string) => Promise<void>;
  highlightSection: (section: 'problem' | 'visualizer' | 'editor' | 'console') => void;
  // Profile Builder Tool
  updateProfile?: (data: Partial<UserProfile>) => void;
}

// Mermaid Graph Data
export interface MermaidState {
  code: string;
  type: 'mindmap' | 'flowchart';
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface CodingProblem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  testCases: string; // JSON string of test cases hidden from user
}

export interface ExecutionResult {
  passed: boolean;
  output: string;
  details: {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
}
