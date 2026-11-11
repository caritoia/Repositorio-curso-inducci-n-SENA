import React, { useEffect } from 'react';
import { Film, PlayCircle, ShieldCheck, X } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoManualModal: React.FC<VideoManualModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="video-manual-title"
    >
      <div
        className="relative bg-white dark:bg-[#0B1510] border border-[#39A900]/40 dark:border-[#52C41A]/40 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-[#111C16] dark:text-[#E8F3ED]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 p-4 sm:p-5 border-b border-[#E1E7E4] dark:border-[#1E3027] bg-[#F7F9F8] dark:bg-[#112017]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E9F7E2] dark:bg-[#13301D] text-[#39A900] dark:text-[#52C41A] shrink-0">
              <PlayCircle className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#39A900] dark:text-[#52C41A]">
                  Guía de Navegación Oficial
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#39A900]/10 text-[#1F5C00] dark:text-[#8CE063]">
                  Ficha 3409041
                </span>
              </div>
              <h2
                id="video-manual-title"
                className="font-display font-extrabold text-lg sm:text-xl text-[#111C16] dark:text-[#E8F3ED]"
              >
                Video Manual de la Plataforma de Inducción SENA
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar video manual"
            className="p-2 text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED] hover:bg-[#EAEFEC] dark:hover:bg-[#1E3328] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Video Player Body with full controls */}
        <div className="p-3 sm:p-5 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px]">
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-auto max-h-[62vh] rounded-lg shadow-xl object-contain bg-black focus:outline-none"
            src="/assets/aistudio/2026__5_17_p.m._ff742a10.mp4"
          >
            <p className="text-white text-sm text-center p-4">
              Tu navegador no soporta la reproducción directa de video.
            </p>
          </video>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E1E7E4] dark:border-[#1E3027] bg-[#F7F9F8] dark:bg-[#112017] flex flex-wrap items-center justify-between gap-3 text-xs text-[#526058] dark:text-[#90A59B]">
          <div className="flex items-center gap-2">
            <SenaLogo className="w-4 h-4 object-contain shrink-0" />
            <span>Gestión Empresarial · Instructora Carolina Cardona Flórez</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#16271E] border border-[#E1E7E4] dark:border-[#284033] font-medium text-[#111C16] dark:text-[#E8F3ED]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
              Acuerdo 009 de 2024
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] rounded-lg transition-colors cursor-pointer"
            >
              Cerrar Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
