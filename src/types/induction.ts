export type ModuleId = 'identidad' | 'simbolos' | 'reglamento' | 'normativa' | 'bienestar';

export interface AcuerdoArticle {
  chapter: string;
  article: string;
  title: string;
  category: 'principios' | 'derechos' | 'deberes' | 'novedades' | 'faltas' | 'debido-proceso';
  summary: string;
  keyTakeaway: string;
}

export type ViewSection = 'ruta' | 'multimedia' | 'cuestionarios' | 'seguimiento';

export type UserRole = 'aprendiz' | 'instructor';

export interface ModuleSlide {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  keyPoints: string[];
  normativeRef: string;
  narrationText: string;
}

export interface InductionModule {
  id: ModuleId;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  durationMinutes: number;
  imageUrl: string;
  imageAlt: string;
  slides: ModuleSlide[];
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId;
  type: 'multiple' | 'boolean' | 'case';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reference: string;
}

export interface SymbolHotspot {
  id: string;
  name: string;
  sector: string;
  meaning: string;
  usageRule: string;
  coordinates: { x: number; y: number };
}

export interface AnthemSection {
  id: string;
  label: string;
  startSec: number;
  endSec: number;
  lines: string[];
}

export interface RegulationScenario {
  id: string;
  title: string;
  context: string;
  question: string;
  choices: {
    label: string;
    isCorrect: boolean;
    feedback: string;
    article: string;
  }[];
}

export interface ModuleProgress {
  multimediaCompleted: boolean;
  slidesViewed: string[];
  quizScore: number | null;
  quizAttempts: number;
  completedAt: string | null;
}

export type InductionProgressMap = Record<ModuleId, ModuleProgress>;

export interface ApprenticeRecord {
  id: string;
  name: string;
  documentId: string;
  email: string;
  ficha: string;
  program: string;
  progress: Record<ModuleId, { completed: boolean; score: number | null }>;
  attendanceVerified: boolean;
  lastActivity: string;
  instructorNote?: string;
}
