import { useEffect, useMemo, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { CertificateModal } from './components/CertificateModal';
import { InductionHero } from './components/InductionHero';
import { ModuleExplorer } from './components/ModuleExplorer';
import { MultimediaLab } from './components/MultimediaLab';
import { QuizEngine } from './components/QuizEngine';
import { RoleLandingPage } from './components/RoleLandingPage';
import { SenaLogo } from './components/SenaLogo';
import { TopBar } from './components/TopBar';
import { TrackingDashboard } from './components/TrackingDashboard';
import { VideoManualModal } from './components/VideoManualModal';
import {
  COHORT_APPRENTICES,
  INDUCTION_MODULES,
  INITIAL_APPRENTICE_PROGRESS,
} from './data/senaContent';
import {
  ApprenticeRecord,
  InductionProgressMap,
  ModuleId,
  UserRole,
  ViewSection,
} from './types/induction';

const COHORT_STORAGE_KEY = 'sena_cohort_records_v1';
const THEME_STORAGE_KEY = 'sena_theme_mode';

const buildApprenticeProgressMap = (apr: ApprenticeRecord): InductionProgressMap => {
  const result: InductionProgressMap = { ...INITIAL_APPRENTICE_PROGRESS };
  for (const mod of INDUCTION_MODULES) {
    const modRecord = apr.progress[mod.id];
    if (modRecord && modRecord.completed) {
      result[mod.id] = {
        multimediaCompleted: true,
        slidesViewed: mod.slides.map((s) => s.id),
        quizScore: modRecord.score,
        quizAttempts: 1,
        completedAt: '2026-11-09',
      };
    } else if (modRecord && modRecord.score !== null) {
      result[mod.id] = {
        multimediaCompleted: true,
        slidesViewed: mod.slides.slice(0, 2).map((s) => s.id),
        quizScore: modRecord.score,
        quizAttempts: 1,
        completedAt: null,
      };
    } else {
      result[mod.id] = {
        multimediaCompleted: false,
        slidesViewed: [],
        quizScore: null,
        quizAttempts: 0,
        completedAt: null,
      };
    }
  }
  return result;
};

export default function App() {
  const [isLandingOpen, setIsLandingOpen] = useState(true);
  const [role, setRole] = useState<UserRole>('aprendiz');
  const [selectedApprenticeId, setSelectedApprenticeId] = useState<string>('apr-1');
  const [activeSection, setActiveSection] = useState<ViewSection>('ruta');
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>('identidad');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isVideoManualOpen, setIsVideoManualOpen] = useState(false);

  // Dark Mode state with persistent preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    } catch {
      return false;
    }
  });

  // State to handle the full-screen blur transition effect when switching theme
  const [isTransitioningTheme, setIsTransitioningTheme] = useState(false);
  const [isSettlingTheme, setIsSettlingTheme] = useState(false);

  // Cohort state with persistence
  const [cohort, setCohort] = useState<ApprenticeRecord[]>(() => {
    try {
      const saved = localStorage.getItem(COHORT_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as ApprenticeRecord[];
      }
    } catch {
      // Fallback
    }
    return COHORT_APPRENTICES;
  });

  // Active Apprentice Progress state
  const [progress, setProgress] = useState<InductionProgressMap>(() => {
    const initialApr = cohort[0] || COHORT_APPRENTICES[0];
    try {
      const saved = localStorage.getItem(`sena_apprentice_progress_${initialApr.id}`);
      if (saved) {
        return JSON.parse(saved) as InductionProgressMap;
      }
    } catch {
      // Fallback
    }
    return buildApprenticeProgressMap(initialApr);
  });

  const rutaRef = useRef<HTMLDivElement>(null);
  const multimediaRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const seguimientoRef = useRef<HTMLDivElement>(null);

  // Persist cohort changes
  useEffect(() => {
    try {
      localStorage.setItem(COHORT_STORAGE_KEY, JSON.stringify(cohort));
    } catch {
      // Ignore storage errors
    }
  }, [cohort]);

  // Persist current apprentice progress
  useEffect(() => {
    if (selectedApprenticeId) {
      try {
        localStorage.setItem(
          `sena_apprentice_progress_${selectedApprenticeId}`,
          JSON.stringify(progress)
        );
      } catch {
        // Ignore storage quota errors
      }
    }
  }, [progress, selectedApprenticeId]);

  const currentApprentice = useMemo(
    () => cohort.find((a) => a.id === selectedApprenticeId) ?? cohort[0] ?? null,
    [cohort, selectedApprenticeId]
  );

  // Sync documentElement class with current theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      } catch {
        // Ignore storage errors
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
      } catch {
        // Ignore storage errors
      }
    }
  }, [isDarkMode]);

  // Handle dark mode toggle with blur animation requested by user
  const handleToggleTheme = () => {
    if (isTransitioningTheme || isSettlingTheme) return;

    // Step 1: Trigger blur animation across screen
    setIsTransitioningTheme(true);

    // Step 2: At peak blur (250ms), change theme classes
    setTimeout(() => {
      setIsDarkMode((prev) => !prev);
      setIsTransitioningTheme(false);
      setIsSettlingTheme(true);

      // Step 3: Settle back smoothly to sharp view
      setTimeout(() => {
        setIsSettlingTheme(false);
      }, 350);
    }, 250);
  };


  // Landing Page Role Selection Handlers
  const handleEnterAsApprentice = (apprenticeId: string) => {
    setSelectedApprenticeId(apprenticeId);
    setRole('aprendiz');
    const targetApr = cohort.find((a) => a.id === apprenticeId);
    if (targetApr) {
      try {
        const saved = localStorage.getItem(`sena_apprentice_progress_${apprenticeId}`);
        if (saved) {
          setProgress(JSON.parse(saved));
        } else {
          setProgress(buildApprenticeProgressMap(targetApr));
        }
      } catch {
        setProgress(buildApprenticeProgressMap(targetApr));
      }
    }
    setIsLandingOpen(false);
    setActiveSection('ruta');
  };

  const handleEnterAsInstructor = () => {
    setRole('instructor');
    setIsLandingOpen(false);
    setActiveSection('seguimiento');
  };

  const handleAddNewApprentice = (newApprentice: {
    name: string;
    documentId: string;
    email: string;
    ficha: string;
  }) => {
    const newId = `apr-${Date.now()}`;
    const newRecord: ApprenticeRecord = {
      id: newId,
      name: newApprentice.name,
      documentId: newApprentice.documentId,
      email: newApprentice.email,
      ficha: newApprentice.ficha,
      program: 'Gestión empresarial',
      progress: {
        identidad: { completed: false, score: null },
        simbolos: { completed: false, score: null },
        reglamento: { completed: false, score: null },
        normativa: { completed: false, score: null },
        bienestar: { completed: false, score: null },
      },
      attendanceVerified: false,
      lastActivity: 'Hoy, recién registrado',
      instructorNote: 'Nuevo aprendiz registrado en inducción.',
    };

    setCohort((prev) => [newRecord, ...prev]);
    setSelectedApprenticeId(newId);
    setProgress(INITIAL_APPRENTICE_PROGRESS);
    setRole('aprendiz');
    setIsLandingOpen(false);
    setActiveSection('ruta');
  };

  const navigateToSection = (section: ViewSection) => {
    setActiveSection(section);
    const refMap: Record<ViewSection, React.RefObject<HTMLDivElement | null>> = {
      ruta: rutaRef,
      multimedia: multimediaRef,
      cuestionarios: quizRef,
      seguimiento: seguimientoRef,
    };
    const targetRef = refMap[section];
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSlideViewed = (moduleId: ModuleId, slideId: string) => {
    setProgress((prev) => {
      const current = prev[moduleId] || {
        multimediaCompleted: false,
        slidesViewed: [],
        quizScore: null,
        quizAttempts: 0,
        completedAt: null,
      };
      if (current.slidesViewed.includes(slideId)) return prev;
      return {
        ...prev,
        [moduleId]: {
          ...current,
          slidesViewed: [...current.slidesViewed, slideId],
        },
      };
    });
  };

  const handleCompleteMultimedia = (moduleId: ModuleId) => {
    setProgress((prev) => {
      const mod = INDUCTION_MODULES.find((m) => m.id === moduleId);
      const allSlides = mod ? mod.slides.map((s) => s.id) : (prev[moduleId]?.slidesViewed ?? []);
      return {
        ...prev,
        [moduleId]: {
          ...(prev[moduleId] || {
            quizScore: null,
            quizAttempts: 0,
            completedAt: null,
          }),
          multimediaCompleted: true,
          slidesViewed: allSlides,
        },
      };
    });

    if (selectedApprenticeId) {
      setCohort((prev) =>
        prev.map((a) =>
          a.id === selectedApprenticeId
            ? { ...a, lastActivity: 'Hoy, lección completada' }
            : a
        )
      );
    }
  };

  const handleQuizComplete = (moduleId: ModuleId, scorePercent: number) => {
    const isPassed = scorePercent >= 75;
    setProgress((prev) => {
      const current = prev[moduleId] || {
        multimediaCompleted: false,
        slidesViewed: [],
        quizScore: null,
        quizAttempts: 0,
        completedAt: null,
      };
      const bestScore =
        current.quizScore !== null ? Math.max(current.quizScore, scorePercent) : scorePercent;
      return {
        ...prev,
        [moduleId]: {
          ...current,
          quizScore: bestScore,
          quizAttempts: current.quizAttempts + 1,
          completedAt: isPassed ? new Date().toISOString().slice(0, 10) : current.completedAt,
        },
      };
    });

    // Synchronize the cohort record for the selected apprentice
    if (selectedApprenticeId) {
      setCohort((prev) =>
        prev.map((a) => {
          if (a.id !== selectedApprenticeId) return a;
          const currentScore = a.progress[moduleId]?.score;
          const best = currentScore !== null && currentScore !== undefined
            ? Math.max(currentScore, scorePercent)
            : scorePercent;
          return {
            ...a,
            progress: {
              ...a.progress,
              [moduleId]: {
                completed: best >= 75,
                score: best,
              },
            },
            lastActivity: 'Hoy, evaluación presentada',
          };
        })
      );
    }
  };

  const handleCompleteAllDemo = () => {
    const today = new Date().toISOString().slice(0, 10);
    const completedMap = {} as InductionProgressMap;
    for (const mod of INDUCTION_MODULES) {
      completedMap[mod.id] = {
        multimediaCompleted: true,
        slidesViewed: mod.slides.map((s) => s.id),
        quizScore: 100,
        quizAttempts: 1,
        completedAt: today,
      };
    }
    setProgress(completedMap);

    if (selectedApprenticeId) {
      setCohort((prev) =>
        prev.map((a) => {
          if (a.id !== selectedApprenticeId) return a;
          const updatedProgress = { ...a.progress };
          for (const m of INDUCTION_MODULES) {
            updatedProgress[m.id] = { completed: true, score: 100 };
          }
          return {
            ...a,
            progress: updatedProgress,
            lastActivity: 'Hoy, demo completado',
          };
        })
      );
    }
  };

  const handleResetProgress = () => {
    setProgress(INITIAL_APPRENTICE_PROGRESS);
    if (selectedApprenticeId) {
      setCohort((prev) =>
        prev.map((a) => {
          if (a.id !== selectedApprenticeId) return a;
          const resetProgress = { ...a.progress };
          for (const m of INDUCTION_MODULES) {
            resetProgress[m.id] = { completed: false, score: null };
          }
          return {
            ...a,
            progress: resetProgress,
            lastActivity: 'Hoy, progreso reiniciado',
          };
        })
      );
    }
  };

  const handleToggleAttendance = (apprenticeId: string) => {
    setCohort((prev) =>
      prev.map((a) =>
        a.id === apprenticeId ? { ...a, attendanceVerified: !a.attendanceVerified } : a
      )
    );
  };

  const handleUpdateNote = (apprenticeId: string, note: string) => {
    setCohort((prev) =>
      prev.map((a) => (a.id === apprenticeId ? { ...a, instructorNote: note } : a))
    );
  };

  const { completedModulesCount, overallPercent, averageScore } = useMemo(() => {
    let completed = 0;
    const scores: number[] = [];

    for (const mod of INDUCTION_MODULES) {
      const mp = progress[mod.id];
      if (mp?.multimediaCompleted && (mp?.quizScore ?? 0) >= 75) {
        completed += 1;
      }
      if (mp?.quizScore !== null && mp?.quizScore !== undefined) {
        scores.push(mp.quizScore);
      }
    }

    const pct = Math.round((completed / INDUCTION_MODULES.length) * 100);
    const avg =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : null;

    return {
      completedModulesCount: completed,
      overallPercent: pct,
      averageScore: avg,
    };
  }, [progress]);

  const blurTransitionClass = isTransitioningTheme
    ? 'theme-transitioning'
    : isSettlingTheme
      ? 'theme-transition-settling'
      : '';

  // Render Landing Page if active
  if (isLandingOpen) {
    return (
      <div className={blurTransitionClass}>
        <RoleLandingPage
          cohort={cohort}
          selectedApprenticeId={selectedApprenticeId}
          onSelectApprentice={setSelectedApprenticeId}
          onEnterAsApprentice={handleEnterAsApprentice}
          onEnterAsInstructor={handleEnterAsInstructor}
          onAddNewApprentice={handleAddNewApprentice}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          isThemeSwitching={isTransitioningTheme || isSettlingTheme}
          onOpenVideoManual={() => setIsVideoManualOpen(true)}
        />
        <VideoManualModal
          isOpen={isVideoManualOpen}
          onClose={() => setIsVideoManualOpen(false)}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F7F9F8] dark:bg-[#070D09] text-[#111C16] dark:text-[#E8F3ED] transition-colors duration-300 ${blurTransitionClass}`}
    >
      <TopBar
        activeSection={activeSection}
        onNavigate={navigateToSection}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenVideoManual={() => setIsVideoManualOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        isThemeSwitching={isTransitioningTheme || isSettlingTheme}
        currentRole={role}
        activeApprenticeName={currentApprentice?.name}
        onBackToLanding={() => setIsLandingOpen(true)}
      />

      {/* Floating high-priority quick switch in top-right corner to ensure 100% visibility regardless of scroll position */}
      <aside
        aria-label="Acceso directo de modo oscuro"
        className="fixed top-20 right-4 sm:right-6 z-40"
      >
        <button
          type="button"
          onClick={handleToggleTheme}
          disabled={isTransitioningTheme || isSettlingTheme}
          aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full font-semibold text-xs shadow-lg border backdrop-blur-md transition-all cursor-pointer bg-white/95 dark:bg-[#12231A]/95 text-[#111C16] dark:text-[#E8F3ED] border-[#39A900]/40 dark:border-[#52C41A]/50 hover:scale-105 active:scale-95"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-[#FACC15] shrink-0" aria-hidden="true" />
              <span>Modo Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-[#39A900] shrink-0" aria-hidden="true" />
              <span>Modo Oscuro</span>
            </>
          )}
        </button>
      </aside>

      <main className="flex-1">
        <InductionHero
          role={role}
          onRoleChange={setRole}
          overallPercent={overallPercent}
          completedModulesCount={completedModulesCount}
          totalModulesCount={INDUCTION_MODULES.length}
          averageScore={averageScore}
          onNavigate={navigateToSection}
          activeApprenticeName={currentApprentice?.name}
          onBackToLanding={() => setIsLandingOpen(true)}
          onOpenVideoManual={() => setIsVideoManualOpen(true)}
        />

        <div ref={rutaRef} className="scroll-mt-20">
          <ModuleExplorer
            selectedModuleId={selectedModuleId}
            onSelectModule={setSelectedModuleId}
            progress={progress}
            onSlideViewed={handleSlideViewed}
            onCompleteMultimedia={handleCompleteMultimedia}
            onStartQuiz={(modId) => {
              setSelectedModuleId(modId);
              navigateToSection('cuestionarios');
            }}
          />
        </div>

        <div
          ref={multimediaRef}
          className="scroll-mt-20 border-t border-[#E1E7E4] dark:border-[#1E3027] bg-[#F2F5F3] dark:bg-[#0A140E] transition-colors"
        >
          <MultimediaLab />
        </div>

        <div
          ref={quizRef}
          className="scroll-mt-20 border-t border-[#E1E7E4] dark:border-[#1E3027] transition-colors"
        >
          <QuizEngine
            selectedModuleId={selectedModuleId}
            onSelectModule={setSelectedModuleId}
            progress={progress}
            onQuizComplete={handleQuizComplete}
          />
        </div>

        <div
          ref={seguimientoRef}
          className="scroll-mt-20 border-t border-[#E1E7E4] dark:border-[#1E3027] bg-[#F2F5F3] dark:bg-[#0A140E] transition-colors"
        >
          <TrackingDashboard
            role={role}
            onRoleChange={setRole}
            apprenticeProgress={progress}
            onJumpToModule={(modId, target) => {
              setSelectedModuleId(modId);
              navigateToSection(target);
            }}
            onCompleteAllDemo={handleCompleteAllDemo}
            onResetProgress={handleResetProgress}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            cohort={cohort}
            onToggleAttendance={handleToggleAttendance}
            onUpdateNote={handleUpdateNote}
          />
        </div>
      </main>

      <footer className="bg-white dark:bg-[#0B1510] border-t border-[#E1E7E4] dark:border-[#1E3027] transition-colors">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#526058] dark:text-[#90A59B]">
          <div className="flex items-center gap-2.5">
            <SenaLogo className="w-5 h-5 object-contain shrink-0" />
            <span>
              Prototipo de Inducción Institucional SENA · Servicio Nacional de Aprendizaje
            </span>
          </div>
          <span>
            Normativa del Aprendiz · Manual de Imagen Institucional
          </span>
        </div>
      </footer>

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        progress={progress}
        overallPercent={overallPercent}
        averageScore={averageScore}
        apprenticeName={currentApprentice?.name}
        apprenticeDoc={currentApprentice?.documentId}
      />

      <VideoManualModal
        isOpen={isVideoManualOpen}
        onClose={() => setIsVideoManualOpen(false)}
      />
    </div>
  );
}
