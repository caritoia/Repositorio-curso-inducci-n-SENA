import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Compass,
  Music,
  Pause,
  Play,
  RotateCcw,
  Scale,
  XCircle,
} from 'lucide-react';
import {
  ANTHEM_SECTIONS,
  REGULATION_SCENARIOS,
  SYMBOL_HOTSPOTS,
} from '../data/senaContent';

type LabTab = 'simbolos' | 'himno' | 'casos';

// Dignified march melody notes (frequency in Hz, duration in seconds)
const ANTHEM_MELODY: [number, number][] = [
  [392.0, 0.5], [392.0, 0.5], [523.25, 1.0], [493.88, 0.5], [440.0, 0.5],
  [392.0, 1.0], [329.63, 0.5], [392.0, 0.5], [440.0, 1.0], [392.0, 1.0],
  [349.23, 0.5], [392.0, 0.5], [440.0, 1.0], [392.0, 0.5], [349.23, 0.5],
  [329.63, 1.5], [293.66, 0.5], [329.63, 0.5], [392.0, 0.5], [523.25, 1.0],
  [440.0, 0.5], [493.88, 0.5], [523.25, 1.5],
];

export const MultimediaLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('simbolos');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>(SYMBOL_HOTSPOTS[0].id);

  // Anthem player state
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [anthemTime, setAnthemTime] = useState(0);
  const anthemDuration = 64;
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noteTimeoutRef = useRef<number | null>(null);

  // Regulation scenario state
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});

  const selectedSymbol =
    SYMBOL_HOTSPOTS.find((s) => s.id === selectedSymbolId) ?? SYMBOL_HOTSPOTS[0];

  useEffect(() => {
    if (!isPlayingAnthem) return;
    const interval = window.setInterval(() => {
      setAnthemTime((prev) => {
        if (prev + 1 >= anthemDuration) {
          setIsPlayingAnthem(false);
          stopAudioSynth();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlayingAnthem]);

  useEffect(() => {
    return () => {
      stopAudioSynth();
    };
  }, []);

  const stopAudioSynth = () => {
    if (noteTimeoutRef.current) {
      window.clearTimeout(noteTimeoutRef.current);
      noteTimeoutRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const playMelodyLoop = (ctx: AudioContext, index: number) => {
    if (ctx.state === 'closed') return;
    const [freq, dur] = ANTHEM_MELODY[index % ANTHEM_MELODY.length];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur * 0.92);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);

    noteTimeoutRef.current = window.setTimeout(() => {
      playMelodyLoop(ctx, index + 1);
    }, dur * 1000);
  };

  const toggleAnthem = () => {
    if (isPlayingAnthem) {
      setIsPlayingAnthem(false);
      stopAudioSynth();
    } else {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
        playMelodyLoop(ctx, 0);
      }
      setIsPlayingAnthem(true);
    }
  };

  const resetAnthem = () => {
    setIsPlayingAnthem(false);
    setAnthemTime(0);
    stopAudioSynth();
  };

  const activeAnthemSection =
    ANTHEM_SECTIONS.find((sec) => anthemTime >= sec.startSec && anthemTime < sec.endSec) ??
    ANTHEM_SECTIONS[0];

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111C16] dark:text-[#E8F3ED] tracking-tight">
            Laboratorio Multimedia SENA
          </h2>
          <p className="text-sm text-[#526058] dark:text-[#90A59B] mt-1">
            Explora de forma interactiva los símbolos institucionales, el Himno oficial y casos reales del Reglamento.
          </p>
        </div>

        {/* Segmented Control */}
        <div
          role="tablist"
          aria-label="Herramientas multimedia"
          className="inline-flex items-center gap-1 p-1 bg-[#EAEFEC] dark:bg-[#14251D] rounded-lg border border-[#D4DFD9] dark:border-[#284033]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'simbolos'}
            onClick={() => setActiveTab('simbolos')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'simbolos'
                ? 'bg-white dark:bg-[#1F362A] text-[#111C16] dark:text-[#E8F3ED] shadow-sm'
                : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" aria-hidden="true" />
            <span>Símbolos SENA</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'himno'}
            onClick={() => setActiveTab('himno')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'himno'
                ? 'bg-white dark:bg-[#1F362A] text-[#111C16] dark:text-[#E8F3ED] shadow-sm'
                : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" aria-hidden="true" />
            <span>Himno Interactivo</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'casos'}
            onClick={() => setActiveTab('casos')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'casos'
                ? 'bg-white dark:bg-[#1F362A] text-[#111C16] dark:text-[#E8F3ED] shadow-sm'
                : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" aria-hidden="true" />
            <span>Casos de Normativa</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Interactive SENA Symbols Explorer */}
      {activeTab === 'simbolos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] p-6">
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-[#F7F9F8] dark:bg-[#13231A] rounded-xl border border-[#E1E7E4] dark:border-[#1E3027] p-6 relative min-h-[380px]">
            <p className="text-xs text-[#526058] dark:text-[#90A59B] mb-4 text-center">
              Haz clic en cada elemento del escudo o logosímbolo para inspeccionar su significado
            </p>

            {/* Interactive SVG Representation of SENA Shield & Logosímbolo */}
            <svg
              viewBox="0 0 320 320"
              className="w-full max-w-[290px] h-auto select-none"
              role="img"
              aria-label="Diagrama interactivo de los símbolos institucionales del SENA"
            >
              {/* Official SENA Shield Image Button & Direct Selector */}
              <g
                onClick={() => setSelectedSymbolId('pinon')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <image
                  href="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                  x="60"
                  y="20"
                  width="200"
                  height="200"
                  preserveAspectRatio="xMidYMid meet"
                  className="drop-shadow-md"
                />
              </g>

              {/* Logosímbolo SENA at bottom with official SVG */}
              <g
                onClick={() => setSelectedSymbolId('logosimbolo')}
                className="cursor-pointer transition-all hover:opacity-95"
              >
                <rect
                  x="75"
                  y="230"
                  width="170"
                  height="84"
                  rx="14"
                  fill={selectedSymbolId === 'logosimbolo' ? '#E9F7E2' : '#FFFFFF'}
                  stroke={selectedSymbolId === 'logosimbolo' ? '#39A900' : '#D4DFD9'}
                  strokeWidth={selectedSymbolId === 'logosimbolo' ? '2.5' : '1.5'}
                />
                <image
                  href="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%201000%201000'%20style='enable-background:new%200%200%201000%201000;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id='path47-5'%20class='st0'%20d='M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z'/%3e%3cg%20id='_x23_000000ff-2'%20transform='matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)'%3e%3c/g%3e%3c/svg%3e"
                  x="115"
                  y="236"
                  width="90"
                  height="72"
                />
              </g>
            </svg>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {SYMBOL_HOTSPOTS.map((item) => {
                  const active = item.id === selectedSymbol.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedSymbolId(item.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#39A900] text-white border-[#39A900] dark:bg-[#39A900] dark:border-[#52C41A]'
                          : 'bg-[#F7F9F8] dark:bg-[#15251D] text-[#425048] dark:text-[#A7BAAF] border-[#E1E7E4] dark:border-[#284033] hover:border-[#B6C5BD] dark:hover:border-[#3A5D4A]'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {selectedSymbol.id !== 'logosimbolo' && (
                <div className="flex items-center gap-3 p-3.5 mb-4 rounded-xl bg-white dark:bg-[#15251D] border border-[#E1E7E4] dark:border-[#243A2E] shadow-xs">
                  <img
                    src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                    alt="Escudo oficial del SENA"
                    className="w-14 h-14 object-contain shrink-0 drop-shadow-xs"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#111C16] dark:text-[#E8F3ED]">Escudo Oficial del SENA</p>
                    <p className="text-[11px] text-[#526058] dark:text-[#90A59B]">Emblema heráldico con los tres sectores productivos</p>
                  </div>
                </div>
              )}

              <p className="text-xs font-semibold text-[#39A900] dark:text-[#52C41A] mb-1">
                {selectedSymbol.sector}
              </p>
              <h3 className="font-display text-2xl font-bold text-[#111C16] dark:text-[#E8F3ED] mb-3">
                {selectedSymbol.name}
              </h3>
              <p className="text-base text-[#2C3A32] dark:text-[#B6CBC0] leading-relaxed mb-6">
                {selectedSymbol.meaning}
              </p>

              <div className="p-4 rounded-xl bg-[#F7F9F8] dark:bg-[#13231A] border border-[#E1E7E4] dark:border-[#1E3027]">
                <p className="text-xs font-semibold text-[#111C16] dark:text-[#E8F3ED] mb-1">
                  Lineamiento de Imagen Institucional
                </p>
                <p className="text-sm text-[#425048] dark:text-[#A7BAAF] leading-relaxed">
                  {selectedSymbol.usageRule}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E1E7E4] dark:border-[#1E3027] flex items-center justify-between text-xs text-[#526058] dark:text-[#889E92]">
              <span>Paleta Oficial: Verde SENA #39A900</span>
              <span className="font-mono">Bandera: Fondo Blanco + Escudo Central</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Dynamic Anthem Player with Official YouTube Video */}
      {activeTab === 'himno' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] overflow-hidden">
          {/* Left: Video Player */}
          <div className="lg:col-span-6 bg-[#132A20] dark:bg-[#0A160F] text-white p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-[#8CE063] uppercase tracking-wider">
                  Video Oficial
                </span>
                <span className="text-[11px] text-white/70 font-mono">
                  Letra: Jesús Briceño · Música: Luis Sarmiento
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">
                Himno Institucional del SENA
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                Canta y entona el himno oficial con audio y coro institucional original de Colombia.
              </p>
            </div>

            {/* Embedded YouTube Player */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/80 border border-white/10 shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/PvwEJWhSjYE?rel=0&modestbranding=1"
                title="Himno Oficial del SENA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span>Servicio Nacional de Aprendizaje</span>
              <a
                href="https://youtu.be/PvwEJWhSjYE?si=CWkL11nAR6YkvEdY"
                target="_blank"
                rel="noreferrer noopener"
                className="underline hover:text-[#8CE063] transition-colors"
              >
                Abrir en YouTube
              </a>
            </div>
          </div>

          {/* Right: Official Synchronized Lyrics */}
          <div className="lg:col-span-6 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#526058] dark:text-[#90A59B] mb-3">
                Letra Oficial del Himno SENA
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ANTHEM_SECTIONS.map((sec) => (
                  <div
                    key={sec.id}
                    className="p-4 rounded-xl border bg-[#F7F9F8] dark:bg-[#13231A] border-[#E1E7E4] dark:border-[#1E3027] hover:border-[#39A900]/60 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-[#2B7F00] dark:text-[#52C41A]">
                        {sec.label}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm text-[#111C16] dark:text-[#E8F3ED] leading-relaxed">
                      {sec.lines.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E1E7E4] dark:border-[#1E3027] text-xs text-[#526058] dark:text-[#889E92] flex items-center justify-between">
              <span>Uso protocolario en ceremonias de inducción y graduación</span>
              <span className="font-mono">Símbolo Patrio SENA</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Interactive Regulation Scenarios */}
      {activeTab === 'casos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {REGULATION_SCENARIOS.map((scen) => {
            const selectedIdx = scenarioAnswers[scen.id];
            const hasAnswered = selectedIdx !== undefined;
            const chosen = hasAnswered ? scen.choices[selectedIdx] : null;

            return (
              <div
                key={scen.id}
                className="bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-[#39A900] dark:text-[#52C41A] mb-1.5">
                    Caso Práctico
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#111C16] dark:text-[#E8F3ED] mb-2">
                    {scen.title}
                  </h3>
                  <p className="text-sm text-[#425048] dark:text-[#A7BAAF] leading-relaxed mb-4">
                    {scen.context}
                  </p>
                  <p className="text-sm font-semibold text-[#111C16] dark:text-[#E8F3ED] mb-3">
                    {scen.question}
                  </p>

                  <div className="space-y-2 mb-4">
                    {scen.choices.map((choice, idx) => {
                      const isSelected = selectedIdx === idx;
                      let btnStyle =
                        'bg-[#F7F9F8] dark:bg-[#13231A] border-[#E1E7E4] dark:border-[#1E3027] text-[#111C16] dark:text-[#E8F3ED] hover:border-[#9EB3A7] dark:hover:border-[#385B48]';
                      if (isSelected) {
                        btnStyle = choice.isCorrect
                          ? 'bg-[#E9F7E2] dark:bg-[#153421] border-[#39A900] dark:border-[#52C41A] text-[#153D00] dark:text-[#8CE063]'
                          : 'bg-[#FEF2F2] dark:bg-[#341616] border-[#DC2626] dark:border-[#EF4444] text-[#7F1D1D] dark:text-[#FCA5A5]';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setScenarioAnswers((prev) => ({ ...prev, [scen.id]: idx }))
                          }
                          className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-colors cursor-pointer ${btnStyle}`}
                        >
                          {choice.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {chosen && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      chosen.isCorrect
                        ? 'bg-[#F2FAEE] dark:bg-[#102919] border-[#39A900]/40 dark:border-[#52C41A]/50 text-[#1B4D00] dark:text-[#8CE063]'
                        : 'bg-[#FEF2F2] dark:bg-[#301414] border-[#DC2626]/40 dark:border-[#EF4444]/50 text-[#7F1D1D] dark:text-[#FCA5A5]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold mb-1">
                      {chosen.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#52C41A] shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#DC2626] dark:text-[#EF4444] shrink-0" />
                      )}
                      <span>{chosen.isCorrect ? 'Decisión Correcta' : 'Requiere Revisión'}</span>
                    </div>
                    <p className="mb-1.5">{chosen.feedback}</p>
                    <p className="font-mono text-[11px] opacity-85">{chosen.article}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
