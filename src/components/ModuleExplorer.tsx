import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  FileCheck2,
  Filter,
  Scale,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ACUERDO_009_ARTICLES, INDUCTION_MODULES } from '../data/senaContent';
import { InductionProgressMap, ModuleId } from '../types/induction';

interface ModuleExplorerProps {
  selectedModuleId: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  progress: InductionProgressMap;
  onSlideViewed: (moduleId: ModuleId, slideId: string) => void;
  onCompleteMultimedia: (moduleId: ModuleId) => void;
  onStartQuiz: (moduleId: ModuleId) => void;
}

export const ModuleExplorer: React.FC<ModuleExplorerProps> = ({
  selectedModuleId,
  onSelectModule,
  progress,
  onSlideViewed,
  onCompleteMultimedia,
  onStartQuiz,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [acuerdoSearch, setAcuerdoSearch] = useState('');
  const [acuerdoCategory, setAcuerdoCategory] = useState<string>('todos');
  const [copiedArticle, setCopiedArticle] = useState<string | null>(null);

  const activeModule =
    INDUCTION_MODULES.find((m) => m.id === selectedModuleId) ?? INDUCTION_MODULES[0];
  const activeSlide = activeModule.slides[slideIndex] ?? activeModule.slides[0];
  const modProgress =
    progress[activeModule.id] || {
      multimediaCompleted: false,
      slidesViewed: [],
      quizScore: null,
      quizAttempts: 0,
      completedAt: null,
    };

  useEffect(() => {
    setSlideIndex(0);
    stopNarration();
  }, [selectedModuleId]);

  useEffect(() => {
    if (activeSlide) {
      onSlideViewed(activeModule.id, activeSlide.id);
    }
  }, [activeModule.id, activeSlide?.id]);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  const stopNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const toggleNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    if (isSpeaking) {
      stopNarration();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeSlide.narrationText);
    utterance.lang = 'es-CO';
    utterance.rate = 0.98;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const filteredAcuerdoArticles = useMemo(() => {
    return ACUERDO_009_ARTICLES.filter((art) => {
      const matchesSearch =
        acuerdoSearch === '' ||
        art.article.toLowerCase().includes(acuerdoSearch.toLowerCase()) ||
        art.title.toLowerCase().includes(acuerdoSearch.toLowerCase()) ||
        art.summary.toLowerCase().includes(acuerdoSearch.toLowerCase()) ||
        art.chapter.toLowerCase().includes(acuerdoSearch.toLowerCase()) ||
        art.keyTakeaway.toLowerCase().includes(acuerdoSearch.toLowerCase());

      const matchesCategory =
        acuerdoCategory === 'todos' || art.category === acuerdoCategory;

      return matchesSearch && matchesCategory;
    });
  }, [acuerdoSearch, acuerdoCategory]);

  const handleCopyArticle = (articleId: string, text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedArticle(articleId);
      setTimeout(() => setCopiedArticle(null), 2000);
    } catch {
      // Ignore clipboard write error
    }
  };

  const handleNextSlide = () => {
    stopNarration();
    if (slideIndex < activeModule.slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    stopNarration();
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const isLastSlide = slideIndex === activeModule.slides.length - 1;

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111C16] dark:text-[#E8F3ED] tracking-tight">
            Ruta de Aprendizaje Institucional
          </h2>
          <p className="text-sm text-[#526058] dark:text-[#90A59B] mt-1">
            Selecciona cada módulo para recorrer las lecciones multimedia y presentar su evaluación.
          </p>
        </div>
        <div className="text-xs text-[#526058] dark:text-[#889E92] font-mono tabular-nums">
          Módulo {activeModule.number} de {String(INDUCTION_MODULES.length).padStart(2, '0')} · {activeModule.durationMinutes} min estimados
        </div>
      </div>

      {/* Module Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-8">
        {INDUCTION_MODULES.map((mod) => {
          const mp = progress[mod.id] || { multimediaCompleted: false, slidesViewed: [], quizScore: null };
          const isSelected = mod.id === activeModule.id;
          const isDone = mp.multimediaCompleted && (mp.quizScore ?? 0) >= 75;

          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onSelectModule(mod.id)}
              className={`text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-[#13231A] border-[#39A900] dark:border-[#52C41A] ring-1 ring-[#39A900] dark:ring-[#52C41A]'
                  : 'bg-white dark:bg-[#0E1A14] border-[#E1E7E4] dark:border-[#1E3027] hover:border-[#B6C5BD] dark:hover:border-[#2C4A3A]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs text-[#526058] dark:text-[#90A59B] mb-2">
                <span className="font-mono font-semibold text-[#111C16] dark:text-[#E8F3ED]">
                  Módulo {mod.number}
                </span>
                <span className="font-medium">
                  {isDone
                    ? 'Aprobado'
                    : mp.multimediaCompleted
                      ? 'Lección vista'
                      : `${mod.durationMinutes} min`}
                </span>
              </div>
              <p className="font-display text-sm font-semibold text-[#111C16] dark:text-[#E8F3ED] leading-snug mb-2">
                {mod.shortTitle}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#526058] dark:text-[#90A59B]">
                <span className="tabular-nums">
                  {mp.slidesViewed.length}/{mod.slides.length} diapositivas
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  Quiz: {mp.quizScore !== null ? `${mp.quizScore}%` : 'Pendiente'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Two-Zone Educational Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] overflow-hidden">
        {/* Left/Top Stage: Visual & Dynamic Slide Content */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative h-64 sm:h-72 bg-[#132A20] overflow-hidden">
            <img
              src={activeModule.imageUrl}
              alt={activeModule.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6">
              <p className="text-xs font-medium text-white/85 mb-1">
                {activeSlide.kicker}
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                {activeSlide.title}
              </h3>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-base text-[#233029] dark:text-[#C5D7CC] leading-relaxed mb-5">
                {activeSlide.summary}
              </p>

              <div className="space-y-3 mb-6">
                <p className="text-xs font-semibold text-[#526058] dark:text-[#90A59B]">
                  Puntos clave para el aprendiz
                </p>
                <ul className="space-y-2.5">
                  {activeSlide.keyPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-[#2C3A32] dark:text-[#B6CBC0] leading-relaxed"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#39A900] dark:text-[#52C41A] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E7E4] dark:border-[#1E3027] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#526058] dark:text-[#889E92]">
                Referencia: {activeSlide.normativeRef}
              </span>

              <button
                type="button"
                onClick={toggleNarration}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#132A20] text-white border-[#132A20] dark:bg-[#1E3B2D] dark:border-[#38624C]'
                    : 'bg-[#F7F9F8] dark:bg-[#15251D] text-[#111C16] dark:text-[#E8F3ED] border-[#D4DFD9] dark:border-[#284033] hover:bg-[#EBF0ED] dark:hover:bg-[#1C3127]'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Detener narración</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A] shrink-0" aria-hidden="true" />
                    <span>Escuchar narración</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right/Bottom Zone: Control & Progress Deck */}
        <div className="lg:col-span-5 bg-[#F7F9F8] dark:bg-[#111E16] border-t lg:border-t-0 lg:border-l border-[#E1E7E4] dark:border-[#1E3027] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#526058] dark:text-[#90A59B] mb-4">
              <span className="font-semibold text-[#111C16] dark:text-[#E8F3ED]">
                Control de Lección
              </span>
              <span className="font-mono tabular-nums">
                Diapositiva {slideIndex + 1} / {activeModule.slides.length}
              </span>
            </div>

            {/* Slide Stepper List */}
            <div className="space-y-2 mb-6">
              {activeModule.slides.map((s, idx) => {
                const isCurrent = idx === slideIndex;
                const isViewed = modProgress.slidesViewed.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      stopNarration();
                      setSlideIndex(idx);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-white dark:bg-[#172B20] border-[#39A900] dark:border-[#52C41A] text-[#111C16] dark:text-[#E8F3ED]'
                        : 'bg-white/60 dark:bg-[#13231A]/60 border-[#E1E7E4] dark:border-[#1E3027] text-[#425048] dark:text-[#A7BAAF] hover:bg-white dark:hover:bg-[#172B20]'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-[#526058] dark:text-[#889E92]">
                        0{idx + 1}. {s.kicker}
                      </p>
                      <p className="text-sm font-semibold truncate">{s.title}</p>
                    </div>
                    {isViewed ? (
                      <CheckCircle2
                        className="w-4 h-4 text-[#39A900] dark:text-[#52C41A] shrink-0"
                        aria-label="Vista"
                      />
                    ) : (
                      <Clock
                        className="w-4 h-4 text-[#94A39B] dark:text-[#5B7567] shrink-0"
                        aria-label="Pendiente"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Slide Prev / Next Controls */}
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={handlePrevSlide}
                disabled={slideIndex === 0}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#D4DFD9] dark:border-[#284033] bg-white dark:bg-[#15251D] text-[#111C16] dark:text-[#E8F3ED] hover:bg-[#F2F5F3] dark:hover:bg-[#1C3127] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Anterior</span>
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                disabled={isLastSlide}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#D4DFD9] dark:border-[#284033] bg-white dark:bg-[#15251D] text-[#111C16] dark:text-[#E8F3ED] hover:bg-[#F2F5F3] dark:hover:bg-[#1C3127] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Module Completion & Quiz CTA */}
          <div className="pt-5 border-t border-[#E1E7E4] dark:border-[#1E3027] space-y-3">
            <button
              type="button"
              onClick={() => onCompleteMultimedia(activeModule.id)}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                modProgress.multimediaCompleted
                  ? 'bg-[#E9F7E2] dark:bg-[#13301D] border-[#39A900]/40 dark:border-[#52C41A]/50 text-[#1F5C00] dark:text-[#8CE063]'
                  : 'bg-white dark:bg-[#15251D] border-[#D4DFD9] dark:border-[#284033] text-[#111C16] dark:text-[#E8F3ED] hover:bg-[#EEF2F0] dark:hover:bg-[#1D3227]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                {modProgress.multimediaCompleted
                  ? 'Lección completada'
                  : 'Marcar lección como completada'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onStartQuiz(activeModule.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] rounded-lg transition-colors cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                {modProgress.quizScore !== null
                  ? `Repetir cuestionario (Último: ${modProgress.quizScore}%)`
                  : 'Presentar cuestionario del módulo'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Acuerdo 009 de 2024 Normative Explorer */}
      <div className="mt-10 bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] p-6 sm:p-8 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E1E7E4] dark:border-[#1E3027]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E9F7E2] dark:bg-[#13301D] text-[#1F5C00] dark:text-[#8CE063] mb-2">
              <Scale className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Acuerdo 009 de 2024 · Consejo Directivo Nacional del SENA</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#111C16] dark:text-[#E8F3ED]">
              Compendio Normativo: Reglamento del Aprendiz SENA
            </h3>
            <p className="text-xs text-[#526058] dark:text-[#90A59B] mt-1 max-w-2xl leading-relaxed">
              Consulta los artículos clave que derogaron el Acuerdo 07 de 2012 y unificaron los derechos,
              deberes, causales de deserción, alternativas de etapa productiva y el debido proceso.
            </p>
          </div>

          <div className="relative min-w-[260px] max-w-md w-full">
            <Search className="w-4 h-4 text-[#6A7870] dark:text-[#7A9588] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={acuerdoSearch}
              onChange={(e) => setAcuerdoSearch(e.target.value)}
              placeholder="Buscar artículo, falta, deber o término..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9F8] dark:bg-[#13231A] border border-[#D4DFD9] dark:border-[#284033] rounded-lg text-[#111C16] dark:text-[#E8F3ED] focus:outline-none focus:border-[#39A900] dark:focus:border-[#52C41A]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-5 pb-6">
          <span className="text-xs font-medium text-[#526058] dark:text-[#90A59B] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            Capítulos:
          </span>
          {[
            ['todos', 'Todos los Artículos'],
            ['principios', 'Principios y Alcance'],
            ['derechos', 'Cap. II: Derechos y Vocería'],
            ['deberes', 'Cap. III: Deberes y Prohibiciones'],
            ['novedades', 'Cap. IV: Permanencia y Etapa Productiva'],
            ['faltas', 'Cap. V: Faltas y Medidas'],
            ['debido-proceso', 'Debido Proceso y Comité'],
          ].map(([cat, label]) => (
            <button
              key={cat}
              type="button"
              onClick={() => setAcuerdoCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                acuerdoCategory === cat
                  ? 'bg-[#132A20] dark:bg-[#1E3B2D] text-white border-[#132A20] dark:border-[#38624C]'
                  : 'bg-[#F7F9F8] dark:bg-[#13231A] text-[#425048] dark:text-[#A7BAAF] border-[#E1E7E4] dark:border-[#1E3027] hover:border-[#B6C5BD] dark:hover:border-[#335643]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAcuerdoArticles.map((art, idx) => {
            const isCopied = copiedArticle === art.article;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-4 rounded-xl border border-[#E1E7E4] dark:border-[#1E3027] bg-[#FAFBFB] dark:bg-[#112017] hover:border-[#39A900]/40 dark:hover:border-[#52C41A]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <span className="font-mono font-bold text-[#39A900] dark:text-[#52C41A]">
                      {art.article}
                    </span>
                    <span className="text-[11px] text-[#526058] dark:text-[#889E92] truncate max-w-[170px]">
                      {art.chapter}
                    </span>
                  </div>

                  <h4 className="font-display text-sm font-bold text-[#111C16] dark:text-[#E8F3ED] mb-2 leading-snug">
                    {art.title}
                  </h4>

                  <p className="text-xs text-[#425048] dark:text-[#A7BAAF] leading-relaxed mb-3">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E1E7E4] dark:border-[#1E3027] flex items-center justify-between gap-2">
                  <div className="text-[11px] text-[#1F5C00] dark:text-[#8CE063] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{art.keyTakeaway}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopyArticle(
                        art.article,
                        `${art.article} · ${art.title} (Acuerdo 009 de 2024 SENA): ${art.summary}`
                      )
                    }
                    aria-label={`Copiar referencia de ${art.article}`}
                    className="p-1 rounded text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED] transition-colors cursor-pointer shrink-0"
                    title="Copiar referencia"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAcuerdoArticles.length === 0 && (
          <div className="text-center py-10 text-xs text-[#526058] dark:text-[#90A59B]">
            No se encontraron artículos que coincidan con la búsqueda "{acuerdoSearch}".
          </div>
        )}
      </div>
    </section>
  );
};
