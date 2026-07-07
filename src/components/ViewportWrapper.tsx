import React from 'react';
import { Smartphone, Monitor, SmartphoneNfc, RotateCcw, ChevronRight } from 'lucide-react';

interface ViewportWrapperProps {
  deviceMode: 'desktop' | 'mobile' | 'fluid';
  setDeviceMode: (mode: 'desktop' | 'mobile' | 'fluid') => void;
  activeView: string;
  setActiveView: (view: any) => void;
  userRole: 'guest' | 'mahasiswa' | 'admin';
  setUserRole: (role: 'guest' | 'mahasiswa' | 'admin') => void;
  children: React.ReactNode;
}

export default function ViewportWrapper({
  deviceMode,
  setDeviceMode,
  activeView,
  setActiveView,
  userRole,
  setUserRole,
  children
}: ViewportWrapperProps) {
  const viewsList = [
    { id: 'landing', label: '1. Landing Page' },
    { id: 'login', label: '2. Login' },
    { id: 'register', label: '3. Register' },
    { id: 'dashboard-student', label: '4. Student Dashboard' },
    { id: 'lowongan-list', label: '5. Daftar Lowongan' },
    { id: 'program-cdc', label: '7. Program CDC' },
    { id: 'profil-mahasiswa', label: '8. Profil Mahasiswa' },
    { id: 'dashboard-admin', label: '9. Admin Dashboard' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Dynamic Designer Prototype Controller */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo and Role Indicator */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg font-bold text-sm tracking-tight shadow-inner">
              CDC
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide text-white">CDC Portal Prototype Studio</h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Role: </span>
                <span className={`font-semibold capitalize px-1.5 py-0.5 rounded ${
                  userRole === 'admin' ? 'bg-amber-500/20 text-amber-400' :
                  userRole === 'mahasiswa' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {userRole}
                </span>
                <span className="text-slate-600">•</span>
                <button 
                  onClick={() => {
                    if (userRole === 'guest') {
                      setUserRole('mahasiswa');
                      setActiveView('dashboard-student');
                    } else if (userRole === 'mahasiswa') {
                      setUserRole('admin');
                      setActiveView('dashboard-admin');
                    } else {
                      setUserRole('guest');
                      setActiveView('landing');
                    }
                  }}
                  className="text-blue-400 hover:text-blue-300 transition underline cursor-pointer"
                >
                  Ganti Role
                </button>
              </div>
            </div>
          </div>

          {/* Quick Page Navigator */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {viewsList.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActiveView(v.id);
                  if (v.id === 'dashboard-admin') {
                    setUserRole('admin');
                  } else if (v.id === 'dashboard-student' || v.id === 'profil-mahasiswa') {
                    setUserRole('mahasiswa');
                  }
                }}
                className={`text-[11px] px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeView === v.id || (v.id === 'lowongan-list' && activeView === 'lowongan-detail')
                    ? 'bg-blue-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {v.id === 'lowongan-list' && activeView === 'lowongan-detail' ? '5. Detail Lowongan' : v.label}
              </button>
            ))}
          </div>

          {/* Device Toggles */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-center md:self-auto">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                deviceMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop Mode (1440px)"
            >
              <Monitor size={14} />
              <span className="text-[10px] font-medium hidden sm:inline">1440px Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                deviceMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Mode (390px)"
            >
              <Smartphone size={14} />
              <span className="text-[10px] font-medium hidden sm:inline">390px Mobile</span>
            </button>
            <button
              onClick={() => setDeviceMode('fluid')}
              className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                deviceMode === 'fluid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Responsive Mode"
            >
              <RotateCcw size={14} />
              <span className="text-[10px] font-medium hidden sm:inline">Responsif</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Sandbox Frame Rendering */}
      <main className="flex-1 bg-slate-950 flex justify-center items-start p-2 sm:p-4 overflow-y-auto">
        {deviceMode === 'desktop' && (
          <div className="w-[1440px] max-w-full min-h-[900px] bg-slate-50 text-slate-800 rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden flex flex-col my-4 relative transition-all duration-300">
            {/* Simulated Desktop Browser Frame Header */}
            <div className="bg-slate-800 px-6 py-2.5 flex items-center justify-between border-b border-slate-700">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              </div>
              <div className="bg-slate-900 rounded-lg text-slate-400 px-12 py-1 text-xs font-mono w-1/2 text-center truncate select-none">
                https://cdc.universitas.ac.id/{activeView}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">1440 × 900</div>
            </div>
            <div className="flex-1 bg-slate-50 overflow-y-auto flex flex-col">
              {children}
            </div>
          </div>
        )}

        {deviceMode === 'mobile' && (
          <div className="w-[390px] h-[844px] bg-slate-50 text-slate-800 rounded-[50px] border-[12px] border-slate-800 shadow-2xl overflow-hidden flex flex-col my-4 relative transition-all duration-300">
            {/* Simulated Mobile Status Bar / Notch */}
            <div className="bg-slate-900 text-white h-11 px-6 pt-3 flex justify-between items-center select-none text-[12px] font-medium relative shrink-0">
              <span>09:41</span>
              {/* Speaker Notch */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-5 bg-black rounded-b-2xl flex items-center justify-center">
                <span className="w-12 h-1 bg-slate-800 rounded-full block"></span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <span>5G</span>
                <span className="w-4 h-2.5 border border-white rounded-sm inline-block relative">
                  <span className="absolute top-0.5 left-0.5 bottom-0.5 right-1 bg-white rounded-2xs block"></span>
                </span>
              </div>
            </div>
            {/* Simulated Mobile URL Bar */}
            <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b border-slate-200 shrink-0">
              <span className="text-slate-400 text-xs">🔒</span>
              <div className="bg-white rounded-lg text-slate-600 py-1 text-[11px] flex-1 text-center truncate">
                cdc.universitas.ac.id
              </div>
            </div>
            <div className="flex-1 bg-slate-50 overflow-y-auto flex flex-col">
              {children}
            </div>
            {/* Home Indicator */}
            <div className="bg-slate-50 pt-2 pb-1.5 text-center shrink-0">
              <div className="w-28 h-1 bg-slate-400 rounded-full mx-auto"></div>
            </div>
          </div>
        )}

        {deviceMode === 'fluid' && (
          <div className="w-full max-w-7xl bg-slate-50 text-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[80vh] transition-all duration-300">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}
