import React from 'react';
import { ArrowLeftRight, Award, Moon, PlayCircle, Sun, User } from 'lucide-react';
import { UserRole, ViewSection } from '../types/induction';
import { SenaLogo, SENA_LOGO_DATA_URI } from './SenaLogo';

interface TopBarProps {
  activeSection: ViewSection;
  onNavigate: (section: ViewSection) => void;
  onOpenCertificate: () => void;
  onOpenVideoManual?: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isThemeSwitching?: boolean;
  currentRole?: UserRole;
  activeApprenticeName?: string;
  onBackToLanding?: () => void;
}

const NAV_ITEMS: { id: ViewSection; label: string }[] = [
  { id: 'ruta', label: 'Ruta de Inducción' },
  { id: 'multimedia', label: 'Multimedia' },
  { id: 'cuestionarios', label: 'Cuestionarios' },
  { id: 'seguimiento', label: 'Seguimiento' },
];

export const TopBar: React.FC<TopBarProps> = ({
  activeSection,
  onNavigate,
  onOpenCertificate,
  onOpenVideoManual,
  isDarkMode,
  onToggleTheme,
  isThemeSwitching = false,
  currentRole,
  activeApprenticeName,
  onBackToLanding,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B1510]/95 backdrop-blur-md border-b border-[#E1E7E4] dark:border-[#1E3027] transition-colors shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand with official SENA logo in the top-left */}
        <button
          type="button"
          onClick={() => onNavigate('ruta')}
          className="flex items-center gap-3 font-display text-lg font-bold tracking-tight text-[#111C16] dark:text-[#E8F3ED] whitespace-nowrap shrink-0 hover:text-[#39A900] dark:hover:text-[#52C41A] transition-colors cursor-pointer group"
        >
          <img
            src={SENA_LOGO_DATA_URI}
            alt="Logo oficial SENA"
            className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col text-left leading-none">
            <span className="font-display font-extrabold text-base sm:text-lg tracking-tight">SENA</span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#526058] dark:text-[#90A59B]">Inducción Institucional</span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#39A900] text-[#111C16] dark:text-[#E8F3ED] font-semibold'
                    : 'border-transparent text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED] hover:border-[#C5D1CA] dark:hover:border-[#2F473B]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Zone: Role Switcher + Video Manual + Certificate + Theme Switch */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {onOpenVideoManual && (
            <button
              type="button"
              onClick={onOpenVideoManual}
              aria-label="Ver Video Manual de la plataforma"
              title="Ver Video Manual con guía de navegación"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 text-xs font-bold text-[#1F5C00] dark:text-[#8CE063] bg-[#E9F7E2] dark:bg-[#13301D] hover:bg-[#D9F2CE] dark:hover:bg-[#1C4229] border border-[#39A900]/40 dark:border-[#52C41A]/50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <PlayCircle className="w-4 h-4 text-[#39A900] dark:text-[#52C41A] shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Video Manual</span>
              <span className="sm:hidden">Video</span>
            </button>
          )}

          {onBackToLanding && (
            <button
              type="button"
              onClick={onBackToLanding}
              aria-label="Volver al inicio"
              title="Volver a la página de inicio"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg border border-[#D4DFD9] dark:border-[#284033] bg-[#F2F5F3] dark:bg-[#15251D] text-[#111C16] dark:text-[#E8F3ED] hover:bg-[#E5ECE8] dark:hover:bg-[#1E3328] transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52C41A]" aria-hidden="true" />
              <span className="hidden sm:inline">Volver al Inicio</span>
              <span className="text-[11px] text-[#526058] dark:text-[#90A59B] hidden md:inline ml-1">
                (Landing)
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenCertificate}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2B7F00] dark:bg-[#39A900] dark:hover:bg-[#43BF09] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900]"
          >
            <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Mi Certificado</span>
            <span className="sm:hidden">Certificado</span>
          </button>

          {/* Prominent Theme Toggle in top right corner with text label + icon */}
          <button
            type="button"
            onClick={onToggleTheme}
            disabled={isThemeSwitching}
            aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#39A900] disabled:opacity-60 bg-white dark:bg-[#16291F] border-[#C5D4CC] dark:border-[#385B48] text-[#111C16] dark:text-[#E8F3ED] hover:bg-[#F2F6F4] dark:hover:bg-[#20392B]"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-[#EAB308] shrink-0" aria-hidden="true" />
                <span className="hidden lg:inline text-xs">Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#39A900] shrink-0" aria-hidden="true" />
                <span className="hidden lg:inline text-xs">Modo Oscuro</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation strip */}
      <nav
        aria-label="Navegación móvil"
        className="flex md:hidden items-center justify-between gap-2 px-4 py-2 border-t border-[#E1E7E4] dark:border-[#1E3027] overflow-x-auto bg-[#F7F9F8] dark:bg-[#0D1912]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#16271E] text-[#111C16] dark:text-[#E8F3ED] shadow-sm border border-[#E1E7E4] dark:border-[#294235]'
                  : 'text-[#526058] dark:text-[#90A59B] hover:text-[#111C16] dark:hover:text-[#E8F3ED]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
