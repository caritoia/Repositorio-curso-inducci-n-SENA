import React from 'react';
import { ArrowLeftRight, ArrowRight, BookOpen, CheckCircle2, PlayCircle, Users } from 'lucide-react';
import { UserRole, ViewSection } from '../types/induction';
import { SenaLogo } from './SenaLogo';

interface InductionHeroProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  overallPercent: number;
  completedModulesCount: number;
  totalModulesCount: number;
  averageScore: number | null;
  onNavigate: (section: ViewSection) => void;
  activeApprenticeName?: string;
  onBackToLanding?: () => void;
  onOpenVideoManual?: () => void;
}

export const InductionHero: React.FC<InductionHeroProps> = ({
  role,
  onRoleChange,
  overallPercent,
  completedModulesCount,
  totalModulesCount,
  averageScore,
  onNavigate,
  activeApprenticeName,
  onBackToLanding,
  onOpenVideoManual,
}) => {
  return (
    <section className="bg-white dark:bg-[#0E1A14] border-b border-[#E1E7E4] dark:border-[#1E3027] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 py-10 lg:py-12">
        {/* Workspace Role Switcher Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E1E7E4] dark:border-[#1E3027]">
          <div className="flex items-center gap-2.5 text-xs text-[#526058] dark:text-[#90A59B]">
            <SenaLogo className="w-5 h-5 object-contain shrink-0" />
            <span className="font-medium">Servicio Nacional de Aprendizaje</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Ficha 3409041</span>
            <span aria-hidden="true">·</span>
            <span>Gestión empresarial</span>
            {role === 'aprendiz' && activeApprenticeName && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#1F5C00] dark:text-[#8CE063] bg-[#E9F7E2] dark:bg-[#13301D] px-2 py-0.5 rounded">
                  Aprendiz: {activeApprenticeName}
                </span>
              </>
            )}
            {role === 'instructor' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-white bg-[#132A20] dark:bg-[#1E3B2D] px-2 py-0.5 rounded">
                  Instructora Encargada: Carolina Cardona Flórez
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#D4DFD9] dark:border-[#284033] bg-[#F7F9F8] dark:bg-[#15251D] text-[#111C16] dark:text-[#E8F3ED] hover:bg-[#EAEFEC] dark:hover:bg-[#1E3328] transition-colors cursor-pointer shrink-0"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" aria-hidden="true" />
                <span>Cambiar de Rol / Aprendiz</span>
              </button>
            )}

            <div
              role="group"
              aria-label="Cambiar vista de usuario"
              className="inline-flex items-center gap-1 p-1 bg-[#F2F5F3] dark:bg-[#15251D] rounded-lg border border-[#E1E7E4] dark:border-[#243B2E]"
            >
              <button
                type="button"
                onClick={() => onRoleChange('aprendiz')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  role === 'aprendiz'
                    ? 'bg-white dark:bg-[#1E3328] text-[#111C16] dark:text-[#E8F3ED] shadow-sm'
                    : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
                }`}
              >
                Vista Aprendiz
              </button>
              <button
                type="button"
                onClick={() => {
                  onRoleChange('instructor');
                  onNavigate('seguimiento');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  role === 'instructor'
                    ? 'bg-white dark:bg-[#1E3328] text-[#111C16] dark:text-[#E8F3ED] shadow-sm'
                    : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
                }`}
              >
                Vista Instructor
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#39A900] dark:text-[#52C41A] tracking-wide mb-3">
                Proceso de Inducción Institucional
              </p>
              <h1
                className="font-display font-bold text-[#111C16] dark:text-[#E8F3ED] tracking-tight leading-[1.12] mb-5"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3.1rem)', textWrap: 'balance' }}
              >
                Normativa, símbolos e identidad SENA en un recorrido interactivo.
              </h1>
              <p className="text-base text-[#425048] dark:text-[#A7BAAF] leading-relaxed max-w-2xl mb-8">
                Aprende el Reglamento del Aprendiz, explora el Manual de Imagen Institucional y
                los símbolos patrios del SENA mediante contenido multimedia dinámico, mientras
                instructores y aprendices hacen seguimiento en tiempo real del avance de la ficha.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onOpenVideoManual && (
                <button
                  type="button"
                  onClick={onOpenVideoManual}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                >
                  <PlayCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Ver Video Manual</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onNavigate('ruta')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#111C16] dark:text-[#E8F3ED] bg-[#F2F5F3] dark:bg-[#15251D] hover:bg-[#E5ECE8] dark:hover:bg-[#1D3227] border border-[#D4DFD9] dark:border-[#284033] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Explorar Ruta</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('multimedia')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#111C16] dark:text-[#E8F3ED] bg-[#F2F5F3] dark:bg-[#15251D] hover:bg-[#E5ECE8] dark:hover:bg-[#1D3227] border border-[#D4DFD9] dark:border-[#284033] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-[#39A900] dark:text-[#52C41A] shrink-0" aria-hidden="true" />
                <span>Laboratorio Multimedia</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-64 lg:h-full min-h-[260px] rounded-xl overflow-hidden border border-[#E1E7E4] dark:border-[#243B2E] bg-[#132A20]">
              <img
                src="/src/assets/images/hero_sena_campus_1794325214676.jpg"
                alt="Aprendices SENA colaborando en un centro de formación"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5">
                <p className="text-xs text-white/85 font-medium mb-1">
                  Formación Profesional Integral
                </p>
                <p className="font-display text-base font-semibold text-white">
                  33 Regionales · 117 Centros de Formación
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip below Hero Split */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-[#E1E7E4] dark:border-[#1E3027]">
          <div className="p-4 rounded-xl bg-[#F7F9F8] dark:bg-[#13231A] border border-[#E1E7E4] dark:border-[#1E3027]">
            <div className="flex items-center justify-between text-xs text-[#526058] dark:text-[#90A59B] mb-1.5">
              <span>Avance de Inducción</span>
              <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#52C41A]" aria-hidden="true" />
            </div>
            <p className="font-mono text-2xl font-semibold text-[#111C16] dark:text-[#E8F3ED] tabular-nums">
              {overallPercent}%
            </p>
            <p className="text-xs text-[#526058] dark:text-[#889E92] mt-1">
              Meta de certificación: 100%
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F9F8] dark:bg-[#13231A] border border-[#E1E7E4] dark:border-[#1E3027]">
            <div className="flex items-center justify-between text-xs text-[#526058] dark:text-[#90A59B] mb-1.5">
              <span>Módulos Completados</span>
              <BookOpen className="w-4 h-4 text-[#526058] dark:text-[#90A59B]" aria-hidden="true" />
            </div>
            <p className="font-mono text-2xl font-semibold text-[#111C16] dark:text-[#E8F3ED] tabular-nums">
              {completedModulesCount} / {totalModulesCount}
            </p>
            <p className="text-xs text-[#526058] dark:text-[#889E92] mt-1">
              Normativa e Imagen SENA
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F9F8] dark:bg-[#13231A] border border-[#E1E7E4] dark:border-[#1E3027]">
            <div className="flex items-center justify-between text-xs text-[#526058] dark:text-[#90A59B] mb-1.5">
              <span>Promedio Cuestionarios</span>
              <span className="font-mono text-[11px] text-[#39A900] dark:text-[#52C41A] font-semibold">≥ 75%</span>
            </div>
            <p className="font-mono text-2xl font-semibold text-[#111C16] dark:text-[#E8F3ED] tabular-nums">
              {averageScore !== null ? `${averageScore}%` : '—'}
            </p>
            <p className="text-xs text-[#526058] dark:text-[#889E92] mt-1">
              Evaluación con retroalimentación
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F9F8] dark:bg-[#13231A] border border-[#E1E7E4] dark:border-[#1E3027]">
            <div className="flex items-center justify-between text-xs text-[#526058] dark:text-[#90A59B] mb-1.5">
              <span>Cohorte Activa</span>
              <Users className="w-4 h-4 text-[#526058] dark:text-[#90A59B]" aria-hidden="true" />
            </div>
            <p className="font-mono text-2xl font-semibold text-[#111C16] dark:text-[#E8F3ED] tabular-nums">
              6 Aprendices
            </p>
            <p className="text-xs text-[#526058] dark:text-[#889E92] mt-1">
              Seguimiento de Ficha 3409041
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
