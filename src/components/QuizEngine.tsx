import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { INDUCTION_MODULES, QUIZ_QUESTIONS } from '../data/senaContent';
import { InductionProgressMap, ModuleId } from '../types/induction';

interface QuizEngineProps {
  selectedModuleId: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  progress: InductionProgressMap;
  onQuizComplete: (moduleId: ModuleId, scorePercent: number) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  selectedModuleId,
  onSelectModule,
  progress,
  onQuizComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);

  const moduleQuestions = useMemo(
    () => QUIZ_QUESTIONS.filter((q) => q.moduleId === selectedModuleId),
    [selectedModuleId]
  );

  const activeModule =
    INDUCTION_MODULES.find((m) => m.id === selectedModuleId) ?? INDUCTION_MODULES[0];
  const currentQuestion = moduleQuestions[currentIndex];

  const handleModuleSwitch = (id: ModuleId) => {
    onSelectModule(id);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setConfirmedQuestions({});
    setShowSummary(false);
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (confirmedQuestions[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleConfirmAnswer = () => {
    if (!currentQuestion) return;
    setConfirmedQuestions((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const handleNextOrFinish = () => {
    if (currentIndex < moduleQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const correctCount = moduleQuestions.reduce((acc, q) => {
        return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
      }, 0);
      const scorePercent = Math.round((correctCount / moduleQuestions.length) * 100);
      onQuizComplete(selectedModuleId, scorePercent);
      setShowSummary(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setConfirmedQuestions({});
    setShowSummary(false);
  };

  const correctTotal = moduleQuestions.reduce(
    (acc, q) => acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0),
    0
  );
  const finalScore = Math.round((correctTotal / moduleQuestions.length) * 100);

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111C16] dark:text-[#E8F3ED] tracking-tight">
            Cuestionarios Interactivos de Evaluación
          </h2>
          <p className="text-sm text-[#526058] dark:text-[#90A59B] mt-1">
            Valida tus conocimientos sobre normativa e imagen institucional. Se requiere mínimo 75% para aprobar cada módulo.
          </p>
        </div>

        <div className="text-xs font-mono text-[#526058] dark:text-[#889E92] tabular-nums">
          {moduleQuestions.length} preguntas · Retroalimentación inmediata
        </div>
      </div>

      {/* Module Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {INDUCTION_MODULES.map((mod) => {
          const isActive = mod.id === selectedModuleId;
          const score = progress[mod.id]?.quizScore ?? null;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => handleModuleSwitch(mod.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#132A20] dark:bg-[#1E3B2D] text-white border-[#132A20] dark:border-[#38624C]'
                  : 'bg-white dark:bg-[#0E1A14] text-[#425048] dark:text-[#A7BAAF] border-[#E1E7E4] dark:border-[#1E3027] hover:border-[#B6C5BD] dark:hover:border-[#335643]'
              }`}
            >
              <span>
                {mod.number}. {mod.shortTitle}
              </span>
              {score !== null && (
                <span
                  className={`font-mono tabular-nums ${
                    isActive
                      ? 'text-[#8CE063]'
                      : score >= 75
                        ? 'text-[#39A900] dark:text-[#52C41A]'
                        : 'text-[#D97706] dark:text-[#FBBF24]'
                  }`}
                >
                  {score}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quiz Card */}
      {!showSummary && currentQuestion ? (
        <div className="bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] p-6 sm:p-8 max-w-3xl">
          <div className="flex items-center justify-between text-xs text-[#526058] dark:text-[#90A59B] pb-4 mb-6 border-b border-[#E1E7E4] dark:border-[#1E3027]">
            <span className="font-semibold text-[#111C16] dark:text-[#E8F3ED]">
              Módulo {activeModule.number}: {activeModule.title}
            </span>
            <span className="font-mono tabular-nums">
              Pregunta {currentIndex + 1} de {moduleQuestions.length}
            </span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold text-[#111C16] dark:text-[#E8F3ED] leading-snug mb-6">
            {currentQuestion.prompt}
          </h3>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestion.id] === idx;
              const isConfirmed = Boolean(confirmedQuestions[currentQuestion.id]);
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let style =
                'bg-[#F7F9F8] dark:bg-[#13231A] border-[#E1E7E4] dark:border-[#1E3027] text-[#111C16] dark:text-[#E8F3ED] hover:border-[#9EB3A7] dark:hover:border-[#385B48]';
              if (!isConfirmed && isSelected) {
                style =
                  'bg-[#E9F7E2] dark:bg-[#153421] border-[#39A900] dark:border-[#52C41A] text-[#153D00] dark:text-[#8CE063] font-medium';
              } else if (isConfirmed) {
                if (isCorrectOption) {
                  style =
                    'bg-[#E9F7E2] dark:bg-[#153421] border-[#39A900] dark:border-[#52C41A] text-[#153D00] dark:text-[#8CE063] font-medium';
                } else if (isSelected && !isCorrectOption) {
                  style =
                    'bg-[#FEF2F2] dark:bg-[#341616] border-[#DC2626] dark:border-[#EF4444] text-[#7F1D1D] dark:text-[#FCA5A5]';
                } else {
                  style =
                    'bg-[#F7F9F8] dark:bg-[#13231A] border-[#E1E7E4] dark:border-[#1E3027] text-[#6A7870] dark:text-[#6E887B] opacity-75';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isConfirmed}
                  onClick={() => handleSelectOption(currentQuestion.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm leading-relaxed flex items-center justify-between gap-3 transition-colors cursor-pointer disabled:cursor-default ${style}`}
                >
                  <span>{option}</span>
                  {isConfirmed && isCorrectOption && (
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#52C41A] shrink-0" />
                  )}
                  {isConfirmed && isSelected && !isCorrectOption && (
                    <XCircle className="w-4 h-4 text-[#DC2626] dark:text-[#EF4444] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback Banner */}
          {confirmedQuestions[currentQuestion.id] && (
            <div
              className={`p-4 rounded-xl border mb-6 text-sm leading-relaxed ${
                selectedAnswers[currentQuestion.id] === currentQuestion.correctIndex
                  ? 'bg-[#F2FAEE] dark:bg-[#102919] border-[#39A900]/40 dark:border-[#52C41A]/50 text-[#153D00] dark:text-[#8CE063]'
                  : 'bg-[#FFFBEB] dark:bg-[#2C2110] border-[#D97706]/40 dark:border-[#F59E0B]/50 text-[#78350F] dark:text-[#FDE68A]'
              }`}
            >
              <p className="font-semibold mb-1">
                {selectedAnswers[currentQuestion.id] === currentQuestion.correctIndex
                  ? 'Respuesta Correcta'
                  : 'Retroalimentación Normativa'}
              </p>
              <p className="mb-1.5">{currentQuestion.explanation}</p>
              <p className="font-mono text-xs opacity-85">
                Fuente: {currentQuestion.reference}
              </p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E1E7E4] dark:border-[#1E3027]">
            <div className="flex items-center gap-1.5">
              {moduleQuestions.map((q, idx) => {
                const answered = confirmedQuestions[q.id];
                const correct = answered && selectedAnswers[q.id] === q.correctIndex;
                return (
                  <span
                    key={q.id}
                    className={`h-2 w-6 rounded-full transition-colors ${
                      idx === currentIndex
                        ? 'bg-[#111C16] dark:bg-[#E8F3ED]'
                        : answered
                          ? correct
                            ? 'bg-[#39A900] dark:bg-[#52C41A]'
                            : 'bg-[#DC2626] dark:bg-[#EF4444]'
                          : 'bg-[#DCE3DF] dark:bg-[#263D31]'
                    }`}
                  />
                );
              })}
            </div>

            {!confirmedQuestions[currentQuestion.id] ? (
              <button
                type="button"
                disabled={selectedAnswers[currentQuestion.id] === undefined}
                onClick={handleConfirmAnswer}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] disabled:opacity-45 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
              >
                Verificar respuesta
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextOrFinish}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#132A20] hover:bg-[#1E3F31] dark:bg-[#1E3B2D] dark:hover:bg-[#284F3D] rounded-lg transition-colors cursor-pointer"
              >
                <span>
                  {currentIndex < moduleQuestions.length - 1
                    ? 'Siguiente pregunta'
                    : 'Finalizar cuestionario'}
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Summary Card */
        <div className="bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] p-6 sm:p-8 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Award
              className={`w-8 h-8 ${
                finalScore >= 75
                  ? 'text-[#39A900] dark:text-[#52C41A]'
                  : 'text-[#D97706] dark:text-[#FBBF24]'
              }`}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold text-[#526058] dark:text-[#90A59B]">
                Resultado · Módulo {activeModule.number}
              </p>
              <h3 className="font-display text-2xl font-bold text-[#111C16] dark:text-[#E8F3ED]">
                {finalScore >= 75 ? 'Cuestionario Aprobado' : 'Requiere Repaso'}
              </h3>
            </div>
          </div>

          <p className="text-sm text-[#425048] dark:text-[#A7BAAF] leading-relaxed mb-6">
            Obtuviste{' '}
            <strong className="font-mono tabular-nums text-[#111C16] dark:text-[#E8F3ED]">
              {correctTotal} de {moduleQuestions.length}
            </strong>{' '}
            respuestas correctas ({finalScore}%).{' '}
            {finalScore >= 75
              ? 'Tu resultado ha sido registrado en el seguimiento de inducción.'
              : 'Te recomendamos revisar las diapositivas del módulo e intentar nuevamente para alcanzar al menos 75%.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#111C16] dark:text-[#E8F3ED] bg-[#F2F5F3] dark:bg-[#15251D] hover:bg-[#E4EBE7] dark:hover:bg-[#1C3127] border border-[#D4DFD9] dark:border-[#284033] rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Reintentar cuestionario</span>
            </button>

            {INDUCTION_MODULES.findIndex((m) => m.id === selectedModuleId) <
              INDUCTION_MODULES.length - 1 && (
              <button
                type="button"
                onClick={() => {
                  const nextIdx =
                    INDUCTION_MODULES.findIndex((m) => m.id === selectedModuleId) + 1;
                  handleModuleSwitch(INDUCTION_MODULES[nextIdx].id);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] rounded-lg transition-colors cursor-pointer"
              >
                <span>Siguiente módulo</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
