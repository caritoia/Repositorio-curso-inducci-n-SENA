import React from 'react';
import { Award, CheckCircle2, Printer, X } from 'lucide-react';
import { INDUCTION_MODULES } from '../data/senaContent';
import { InductionProgressMap } from '../types/induction';
import { SenaLogo } from './SenaLogo';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: InductionProgressMap;
  overallPercent: number;
  averageScore: number | null;
  apprenticeName?: string;
  apprenticeDoc?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  progress,
  overallPercent,
  averageScore,
  apprenticeName,
  apprenticeDoc,
}) => {
  if (!isOpen) return null;

  const isEligible = overallPercent === 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] max-w-2xl w-full overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E1E7E4] dark:border-[#1E3027]">
          <div className="flex items-center gap-2.5">
            <SenaLogo className="w-5 h-5 object-contain shrink-0" />
            <h3 id="certificate-title" className="font-display text-base font-bold text-[#111C16] dark:text-[#E8F3ED]">
              Constancia de Inducción Institucional SENA
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-1.5 rounded-lg text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED] hover:bg-[#F2F5F3] dark:hover:bg-[#15251D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {isEligible ? (
            <div className="border-2 border-[#39A900] dark:border-[#52C41A] rounded-xl p-6 sm:p-8 bg-[#FAFDF9] dark:bg-[#122419] text-center space-y-4">
              <div className="flex justify-center mb-1">
                <SenaLogo className="w-14 h-14 object-contain" />
              </div>
              <p className="text-xs font-semibold text-[#39A900] dark:text-[#52C41A] tracking-wide">
                SERVICIO NACIONAL DE APRENDIZAJE — SENA
              </p>
              <h4 className="font-display text-2xl font-bold text-[#111C16] dark:text-[#E8F3ED]">
                Constancia de Inducción Aprobada
              </h4>
              <p className="text-sm text-[#425048] dark:text-[#A7BAAF] leading-relaxed max-w-lg mx-auto">
                Se certifica que el(la) aprendiz{' '}
                <strong className="text-[#111C16] dark:text-[#E8F3ED]">
                  {apprenticeName || 'el aprendiz'}
                </strong>{' '}
                identificado(a) con{' '}
                <span className="font-mono font-semibold text-[#111C16] dark:text-[#E8F3ED]">
                  {apprenticeDoc || 'documento oficial'}
                </span>
                , ha completado satisfactoriamente los 5 módulos de inducción institucional (Imagen
                Corporativa, Símbolos e Himno, Reglamento del Aprendiz Acuerdo 009 de 2024, Debido
                Proceso y Bienestar al Aprendiz) en la{' '}
                <strong className="font-mono text-[#111C16] dark:text-[#E8F3ED]">Ficha 3409041</strong>.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E1E7E4] dark:border-[#1E3027] text-left">
                <div>
                  <p className="text-[11px] text-[#526058] dark:text-[#889E92]">Avance Total</p>
                  <p className="font-mono text-base font-bold text-[#111C16] dark:text-[#E8F3ED] tabular-nums">
                    {overallPercent}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#526058] dark:text-[#889E92]">Promedio Evaluaciones</p>
                  <p className="font-mono text-base font-bold text-[#39A900] dark:text-[#52C41A] tabular-nums">
                    {averageScore ?? 100}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#526058] dark:text-[#889E92]">Código de Verificación</p>
                  <p className="font-mono text-xs font-semibold text-[#111C16] dark:text-[#E8F3ED]">
                    SENA-IND-3409041
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#425048] dark:text-[#A7BAAF] leading-relaxed">
                Aún tienes módulos pendientes para generar tu constancia oficial de inducción.
                Completa las lecciones multimedia y aprueba cada cuestionario con mínimo{' '}
                <strong className="font-mono text-[#111C16] dark:text-[#E8F3ED]">75%</strong>:
              </p>
              <div className="space-y-2">
                {INDUCTION_MODULES.map((m) => {
                  const mp = progress[m.id] || { multimediaCompleted: false, quizScore: null };
                  const done = mp.multimediaCompleted && (mp.quizScore ?? 0) >= 75;
                  return (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#F7F9F8] dark:bg-[#13231A] border border-[#E1E7E4] dark:border-[#1E3027] text-sm"
                    >
                      <span className="font-medium text-[#111C16] dark:text-[#E8F3ED]">
                        {m.number}. {m.title}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          done ? 'text-[#39A900] dark:text-[#52C41A]' : 'text-[#526058] dark:text-[#90A59B]'
                        }`}
                      >
                        {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                        <span>{done ? 'Aprobado' : 'Pendiente'}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[#F7F9F8] dark:bg-[#111E16] border-t border-[#E1E7E4] dark:border-[#1E3027] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#425048] dark:text-[#A7BAAF] hover:text-[#111C16] dark:hover:text-[#E8F3ED] cursor-pointer"
          >
            Cerrar
          </button>
          {isEligible && (
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Imprimir Constancia</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
