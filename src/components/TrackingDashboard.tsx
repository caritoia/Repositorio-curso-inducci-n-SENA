import React, { useMemo, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import { INDUCTION_MODULES } from '../data/senaContent';
import {
  ApprenticeRecord,
  InductionProgressMap,
  ModuleId,
  UserRole,
} from '../types/induction';

interface TrackingDashboardProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  apprenticeProgress: InductionProgressMap;
  onJumpToModule: (moduleId: ModuleId, target: 'ruta' | 'cuestionarios') => void;
  onCompleteAllDemo: () => void;
  onResetProgress: () => void;
  onOpenCertificate: () => void;
  cohort: ApprenticeRecord[];
  onToggleAttendance: (apprenticeId: string) => void;
  onUpdateNote: (apprenticeId: string, note: string) => void;
}

type CohortFilter = 'todos' | 'completado' | 'progreso' | 'pendiente';

export const TrackingDashboard: React.FC<TrackingDashboardProps> = ({
  role,
  onRoleChange,
  apprenticeProgress,
  onJumpToModule,
  onCompleteAllDemo,
  onResetProgress,
  onOpenCertificate,
  cohort,
  onToggleAttendance,
  onUpdateNote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<CohortFilter>('todos');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const isAllDone = INDUCTION_MODULES.every(
    (m) =>
      apprenticeProgress[m.id].multimediaCompleted &&
      (apprenticeProgress[m.id].quizScore ?? 0) >= 75
  );

  const filteredCohort = useMemo(() => {
    return cohort.filter((apr) => {
      const matchesSearch =
        apr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apr.documentId.toLowerCase().includes(searchQuery.toLowerCase());

      const completedCount = INDUCTION_MODULES.filter(
        (m) => (apr.progress[m.id]?.completed ?? false) && ((apr.progress[m.id]?.score ?? 0) >= 75)
      ).length;

      if (!matchesSearch) return false;
      if (filter === 'completado') return completedCount === INDUCTION_MODULES.length;
      if (filter === 'progreso') return completedCount > 0 && completedCount < INDUCTION_MODULES.length;
      if (filter === 'pendiente') return completedCount === 0;
      return true;
    });
  }, [cohort, searchQuery, filter]);

  const exportCsv = () => {
    const headers = [
      'Nombre',
      'Documento',
      'Ficha',
      'Asistencia',
      ...INDUCTION_MODULES.map((m) => `Mod ${m.number} (${m.shortTitle})`),
      'Ultima Actividad',
    ];
    const rows = cohort.map((a) => [
      `"${a.name}"`,
      `"${a.documentId}"`,
      a.ficha,
      a.attendanceVerified ? 'Verificada' : 'Pendiente',
      ...INDUCTION_MODULES.map((m) => a.progress[m.id]?.score ?? 'N/A'),
      `"${a.lastActivity}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'seguimiento_induccion_ficha_3409041.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111C16] dark:text-[#E8F3ED] tracking-tight">
            Seguimiento del Proceso de Inducción
          </h2>
          <p className="text-sm text-[#526058] dark:text-[#90A59B] mt-1">
            {role === 'aprendiz'
              ? 'Monitorea tu avance por módulo, puntajes de evaluación y requisitos para tu constancia.'
              : 'Panel de control para instructores: seguimiento de la Ficha 3409041, asistencia y reportes.'}
          </p>
        </div>

        <div
          role="group"
          aria-label="Cambiar modo de seguimiento"
          className="inline-flex items-center gap-1 p-1 bg-[#EAEFEC] dark:bg-[#14251D] rounded-lg border border-[#D4DFD9] dark:border-[#284033]"
        >
          <button
            type="button"
            onClick={() => onRoleChange('aprendiz')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              role === 'aprendiz'
                ? 'bg-white dark:bg-[#1F362A] text-[#111C16] dark:text-[#E8F3ED] shadow-sm'
                : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
            }`}
          >
            Mi Progreso (Aprendiz)
          </button>
          <button
            type="button"
            onClick={() => onRoleChange('instructor')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              role === 'instructor'
                ? 'bg-white dark:bg-[#1F362A] text-[#111C16] dark:text-[#E8F3ED] shadow-sm'
                : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
            }`}
          >
            Gestión de Ficha (Instructor)
          </button>
        </div>
      </div>

      {/* APPRENTICE TRACKING VIEW */}
      {role === 'aprendiz' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] overflow-hidden">
            <div className="p-6 border-b border-[#E1E7E4] dark:border-[#1E3027] flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#39A900] dark:text-[#52C41A]">
                  Aprendiz en Inducción · Ficha 3409041
                </p>
                <h3 className="font-display text-lg font-bold text-[#111C16] dark:text-[#E8F3ED]">
                  Estado Detallado por Módulo
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={onCompleteAllDemo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#111C16] dark:text-[#E8F3ED] bg-[#F2F5F3] dark:bg-[#15251D] hover:bg-[#E4EBE7] dark:hover:bg-[#1D3227] border border-[#D4DFD9] dark:border-[#284033] rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" aria-hidden="true" />
                  <span>Simular 100% completado</span>
                </button>
                <button
                  type="button"
                  onClick={onResetProgress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED] bg-white dark:bg-[#101E17] border border-[#E1E7E4] dark:border-[#1E3027] rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reiniciar</span>
                </button>
                {isAllDone && (
                  <button
                    type="button"
                    onClick={onOpenCertificate}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] rounded-lg transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Descargar Constancia</span>
                  </button>
                )}
              </div>
            </div>

            <div className="divide-y divide-[#E1E7E4] dark:divide-[#1E3027]">
              {INDUCTION_MODULES.map((mod) => {
                const mp = apprenticeProgress[mod.id];
                const quizPassed = (mp.quizScore ?? 0) >= 75;
                const moduleComplete = mp.multimediaCompleted && quizPassed;

                return (
                  <div
                    key={mod.id}
                    className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#526058] dark:text-[#90A59B]">
                        <span className="font-mono font-semibold text-[#111C16] dark:text-[#E8F3ED]">
                          Módulo {mod.number}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {moduleComplete ? 'Completado y Aprobado' : 'En Proceso'}
                        </span>
                      </div>
                      <h4 className="font-display text-base font-bold text-[#111C16] dark:text-[#E8F3ED]">
                        {mod.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#526058] dark:text-[#90A59B] pt-1">
                        <span className="inline-flex items-center gap-1.5">
                          {mp.multimediaCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-[#94A39B] dark:text-[#5B7567]" />
                          )}
                          <span>
                            Lección multimedia:{' '}
                            {mp.multimediaCompleted ? 'Finalizada' : 'Pendiente'}
                          </span>
                        </span>
                        <span className="font-mono tabular-nums">
                          Cuestionario:{' '}
                          {mp.quizScore !== null ? `${mp.quizScore}%` : 'Sin presentar'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onJumpToModule(mod.id, 'ruta')}
                        className="px-3 py-1.5 text-xs font-semibold text-[#111C16] dark:text-[#E8F3ED] bg-[#F7F9F8] dark:bg-[#15251D] hover:bg-[#EAEFEC] dark:hover:bg-[#1D3227] border border-[#D4DFD9] dark:border-[#284033] rounded-lg transition-colors cursor-pointer"
                      >
                        Ir a lección
                      </button>
                      <button
                        type="button"
                        onClick={() => onJumpToModule(mod.id, 'cuestionarios')}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#132A20] hover:bg-[#1E3F31] dark:bg-[#1E3B2D] dark:hover:bg-[#284F3D] rounded-lg transition-colors cursor-pointer"
                      >
                        {mp.quizScore !== null ? 'Repetir Quiz' : 'Presentar Quiz'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* INSTRUCTOR COHORT TRACKING VIEW */}
      {role === 'instructor' && (
        <div className="bg-white dark:bg-[#0E1A14] rounded-2xl border border-[#E1E7E4] dark:border-[#1E3027] overflow-hidden">
          <div className="p-6 border-b border-[#E1E7E4] dark:border-[#1E3027] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[260px]">
              <div className="relative flex-1 max-w-xs">
                <Search
                  className="w-4 h-4 text-[#6A7870] dark:text-[#7A9588] absolute left-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar aprendiz o documento..."
                  aria-label="Buscar aprendiz o documento"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F9F8] dark:bg-[#13231A] border border-[#D4DFD9] dark:border-[#284033] rounded-lg text-[#111C16] dark:text-[#E8F3ED] focus:outline-none focus:border-[#39A900] dark:focus:border-[#52C41A]"
                />
              </div>

              <div className="inline-flex items-center gap-1 p-1 bg-[#F2F5F3] dark:bg-[#15251D] rounded-lg border border-[#E1E7E4] dark:border-[#243B2E]">
                {(
                  [
                    ['todos', 'Todos'],
                    ['completado', 'Certificados'],
                    ['progreso', 'En Progreso'],
                    ['pendiente', 'Sin Iniciar'],
                  ] as [CohortFilter, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      filter === key
                        ? 'bg-white dark:bg-[#1E3328] text-[#111C16] dark:text-[#E8F3ED] shadow-sm'
                        : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#111C16] dark:text-[#E8F3ED] bg-[#F2F5F3] dark:bg-[#15251D] hover:bg-[#E4EBE7] dark:hover:bg-[#1D3227] border border-[#D4DFD9] dark:border-[#284033] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" aria-hidden="true" />
              <span>Exportar CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F7F9F8] dark:bg-[#111F17] border-b border-[#E1E7E4] dark:border-[#1E3027] text-xs font-semibold text-[#526058] dark:text-[#90A59B]">
                  <th className="py-3.5 px-5">Aprendiz</th>
                  <th className="py-3.5 px-4">Avance Global</th>
                  <th className="py-3.5 px-4">Módulos (M1 a M{INDUCTION_MODULES.length})</th>
                  <th className="py-3.5 px-4">Asistencia</th>
                  <th className="py-3.5 px-5">Observación Instructor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E7E4] dark:divide-[#1E3027] text-sm">
                {filteredCohort.map((apr) => {
                  const completedCount = INDUCTION_MODULES.filter(
                    (m) =>
                      (apr.progress[m.id]?.completed ?? false) &&
                      ((apr.progress[m.id]?.score ?? 0) >= 75)
                  ).length;
                  const pct = Math.round((completedCount / INDUCTION_MODULES.length) * 100);

                  return (
                    <tr key={apr.id} className="hover:bg-[#FAFBFB] dark:hover:bg-[#122218] transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-semibold text-[#111C16] dark:text-[#E8F3ED]">{apr.name}</p>
                        <p className="text-xs text-[#526058] dark:text-[#889E92] font-mono tabular-nums">
                          {apr.documentId} · {apr.lastActivity}
                        </p>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-24 h-2 bg-[#EAEFEC] dark:bg-[#1E3027] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#39A900] dark:bg-[#52C41A] rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs font-semibold text-[#111C16] dark:text-[#E8F3ED] tabular-nums">
                            {pct}%
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 font-mono text-xs tabular-nums">
                          {INDUCTION_MODULES.map((m) => {
                            const score = apr.progress[m.id].score;
                            const passed = (score ?? 0) >= 75;
                            return (
                              <span
                                key={m.id}
                                className={`px-1.5 py-0.5 rounded border ${
                                  passed
                                    ? 'bg-[#E9F7E2] dark:bg-[#13301D] border-[#39A900]/30 dark:border-[#52C41A]/40 text-[#1F5C00] dark:text-[#8CE063]'
                                    : 'bg-[#F7F9F8] dark:bg-[#13231A] border-[#E1E7E4] dark:border-[#1E3027] text-[#6A7870] dark:text-[#7A9588]'
                                }`}
                              >
                                M{m.number.slice(1)}:{score !== null ? `${score}` : '--'}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => onToggleAttendance(apr.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                            apr.attendanceVerified
                              ? 'bg-[#E9F7E2] dark:bg-[#13301D] border-[#39A900]/40 dark:border-[#52C41A]/50 text-[#1F5C00] dark:text-[#8CE063]'
                              : 'bg-[#FFFBEB] dark:bg-[#2C2110] border-[#D97706]/40 dark:border-[#F59E0B]/50 text-[#92400E] dark:text-[#FDE68A]'
                          }`}
                        >
                          {apr.attendanceVerified ? (
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                          <span>
                            {apr.attendanceVerified ? 'Verificada' : 'Pendiente'}
                          </span>
                        </button>
                      </td>

                      <td className="py-4 px-5 max-w-xs">
                        {editingNoteId === apr.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              className="flex-1 px-2 py-1 text-xs border border-[#39A900] dark:border-[#52C41A] rounded bg-white dark:bg-[#13231A] text-[#111C16] dark:text-[#E8F3ED]"
                              placeholder="Escribir nota..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateNote(apr.id, noteDraft);
                                setEditingNoteId(null);
                              }}
                              className="px-2 py-1 text-xs font-semibold bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] text-white rounded cursor-pointer"
                            >
                              Guardar
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingNoteId(apr.id);
                              setNoteDraft(apr.instructorNote ?? '');
                            }}
                            className="text-left text-xs text-[#425048] dark:text-[#A7BAAF] hover:text-[#111C16] dark:hover:text-[#E8F3ED] underline decoration-dotted cursor-pointer"
                          >
                            {apr.instructorNote || 'Agregar observación'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredCohort.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-sm text-[#526058] dark:text-[#90A59B]">
                      No se encontraron aprendices con los criterios de búsqueda seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
