import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  FileSpreadsheet,
  GraduationCap,
  Lock,
  Moon,
  PlayCircle,
  Scale,
  ShieldCheck,
  Sun,
  UserCheck,
  Users,
} from 'lucide-react';
import { ApprenticeRecord } from '../types/induction';
import { SenaLogo, SENA_LOGO_DATA_URI } from './SenaLogo';

interface RoleLandingPageProps {
  cohort: ApprenticeRecord[];
  selectedApprenticeId: string;
  onSelectApprentice: (apprenticeId: string) => void;
  onEnterAsApprentice: (apprenticeId: string) => void;
  onEnterAsInstructor: () => void;
  onAddNewApprentice: (newApprentice: { name: string; documentId: string; email: string; ficha: string }) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isThemeSwitching?: boolean;
  onOpenVideoManual?: () => void;
}

export const RoleLandingPage: React.FC<RoleLandingPageProps> = ({
  cohort,
  selectedApprenticeId,
  onSelectApprentice,
  onEnterAsApprentice,
  onEnterAsInstructor,
  onAddNewApprentice,
  isDarkMode,
  onToggleTheme,
  isThemeSwitching = false,
  onOpenVideoManual,
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDoc, setNewDoc] = useState('');
  const [newFicha, setNewFicha] = useState('');
  const [newPass, setNewPass] = useState('');
  const [loginDoc, setLoginDoc] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [instructorUser, setInstructorUser] = useState('');
  const [instructorPassword, setInstructorPassword] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleCreateApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDoc.trim() || !newFicha.trim() || newPass !== newDoc.slice(-4)) return;

    onAddNewApprentice({
      name: newName.trim(),
      documentId: newDoc.trim(),
      email: `${newName.toLowerCase().replace(/\s+/g, '.')}@soy.sena.edu.co`,
      ficha: newFicha.trim(),
    });
  };

  const handleLoginApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    const apprentice = cohort.find(a => a.documentId === loginDoc && loginPass === a.documentId.slice(-4));
    if (apprentice) {
        onEnterAsApprentice(apprentice.id);
    } else {
        setPinError(true);
        setTimeout(() => setPinError(false), 2500);
    }
  };

  const handleInstructorSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (instructorPassword === 'admon1234') {
      onEnterAsInstructor();
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F8] dark:bg-[#070D09] text-[#111C16] dark:text-[#E8F3ED] transition-colors duration-300">
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1510]/95 backdrop-blur-md border-b border-[#E1E7E4] dark:border-[#1E3027] transition-colors">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={SENA_LOGO_DATA_URI} alt="Logo oficial SENA" className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] object-contain shrink-0" />
            <div className="flex flex-col text-left leading-none">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-[#111C16] dark:text-[#E8F3ED]">SENA</span>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#526058] dark:text-[#90A59B]">Portal de Inducción Institucional · Ficha 3409041</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenVideoManual && (
              <button
                type="button"
                onClick={onOpenVideoManual}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#1F5C00] dark:text-[#8CE063] bg-[#E9F7E2] dark:bg-[#13301D] border border-[#39A900]/40 hover:bg-[#D9F2CE] transition-colors cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-[#39A900] shrink-0" />
                <span>Video Manual</span>
              </button>
            )}
            <button
              type="button"
              onClick={onToggleTheme}
              disabled={isThemeSwitching}
              aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer shadow-xs bg-white dark:bg-[#16291F] border-[#C5D4CC] dark:border-[#385B48] text-[#111C16] dark:text-[#E8F3ED] hover:bg-[#F2F6F4] dark:hover:bg-[#20392B]"
            >
              {isDarkMode ? <><Sun className="w-4 h-4 text-[#EAB308]" /><span className="hidden sm:inline">Modo Claro</span></> : <><Moon className="w-4 h-4 text-[#39A900]" /><span className="hidden sm:inline">Modo Oscuro</span></>}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E9F7E2] dark:bg-[#13301D] text-[#1F5C00] dark:text-[#8CE063] mb-4 border border-[#39A900]/30">
              <Scale className="w-3.5 h-3.5 shrink-0" />
              <span>Reglamento del Aprendiz · Acuerdo 009 de 2024</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-3">Bienvenido al Proceso de Inducción SENA</h1>
            <p className="text-sm text-[#425048] dark:text-[#A7BAAF] mb-6 max-w-xl mx-auto">
              Plataforma interactiva para la Ficha <strong className="text-[#111C16] dark:text-[#E8F3ED]">3409041</strong> (Gestión Empresarial). Selecciona tu rol para ingresar.
            </p>

            {onOpenVideoManual && (
              <button
                type="button"
                onClick={onOpenVideoManual}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-[#39A900] hover:bg-[#2B7F00] shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <PlayCircle className="w-5 h-5 shrink-0" />
                <span>Ver Video Manual de Navegación</span>
              </button>
            )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white dark:bg-[#0E1A14] rounded-2xl border-2 p-6">
                <h2 className="text-2xl font-bold mb-4">Soy Aprendiz</h2>
                <div className="flex gap-4 mb-4">
                    <button onClick={() => setIsRegistering(true)} className={`px-4 py-2 rounded ${isRegistering ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Registrar</button>
                    <button onClick={() => setIsRegistering(false)} className={`px-4 py-2 rounded ${!isRegistering ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Ingresar</button>
                </div>
                {isRegistering ? (
                    <form onSubmit={handleCreateApprentice} className="space-y-3">
                        <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nombre completo" className="w-full p-2 border rounded" />
                        <input type="text" required value={newDoc} onChange={(e) => setNewDoc(e.target.value)} placeholder="Documento" className="w-full p-2 border rounded" />
                        <input type="text" required value={newFicha} onChange={(e) => setNewFicha(e.target.value)} placeholder="Número de ficha" className="w-full p-2 border rounded" />
                        <input type="password" required value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Contraseña (últimos 4 dígitos doc)" className="w-full p-2 border rounded" />
                        <button type="submit" className="w-full p-3 bg-green-600 text-white rounded">Registrar</button>
                    </form>
                ) : (
                    <form onSubmit={handleLoginApprentice} className="space-y-3">
                        <input type="text" required value={loginDoc} onChange={(e) => setLoginDoc(e.target.value)} placeholder="Documento" className="w-full p-2 border rounded" />
                        <input type="password" required value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="Contraseña" className="w-full p-2 border rounded" />
                        {pinError && <p className="text-red-500 text-sm">Credenciales incorrectas.</p>}
                        <button type="submit" className="w-full p-3 bg-green-600 text-white rounded">Ingresar</button>
                    </form>
                )}
            </section>
            <section className="bg-white dark:bg-[#0E1A14] rounded-2xl border-2 p-6">
                <h2 className="text-2xl font-bold mb-4">Soy Instructor</h2>
                <form onSubmit={handleInstructorSubmit} className="space-y-4">
                    <input type="text" required value={instructorUser} onChange={(e) => setInstructorUser(e.target.value)} placeholder="Usuario (documento)" className="w-full p-2 border rounded" />
                    <input type="password" required value={instructorPassword} onChange={(e) => setInstructorPassword(e.target.value)} placeholder="Contraseña" className="w-full p-2 border rounded" />
                    {pinError && <p className="text-red-500 text-sm">Credenciales incorrectas.</p>}
                    <button type="submit" className="w-full p-3 bg-gray-800 text-white rounded">Ingresar</button>
                </form>
            </section>
        </div>
      </main>
      <footer className="p-6 border-t text-center text-xs">
          <span>Servicio Nacional de Aprendizaje SENA · Ficha 3409041</span>
      </footer>
    </div>
  );
};
