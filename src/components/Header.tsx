import React, { useState } from 'react';
import { Menu, X, Bell, User, LogOut, LayoutDashboard, Briefcase, Calendar, Award, FileText, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: any) => void;
  userRole: 'guest' | 'mahasiswa' | 'admin';
  setUserRole: (role: 'guest' | 'mahasiswa' | 'admin') => void;
  userProfile: { name: string; email: string };
  notifications: string[];
  clearNotifications: () => void;
}

export default function Header({
  activeView,
  setActiveView,
  userRole,
  setUserRole,
  userProfile,
  notifications,
  clearNotifications
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Beranda' },
    { id: 'lowongan-list', label: 'Cari Kerja & Magang' },
    { id: 'program-cdc', label: 'Program CDC' }
  ];

  const handleLogout = () => {
    setUserRole('guest');
    setActiveView('landing');
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          {/* Logo */}
          <div 
            onClick={() => { setActiveView('landing'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-blue-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight block leading-none">CDC Portal</span>
              <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold mt-0.5">Universitas Karier</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`text-sm font-semibold transition cursor-pointer relative py-2 ${
                  activeView === item.id || (item.id === 'lowongan-list' && activeView === 'lowongan-detail')
                    ? 'text-[#2563EB]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
                {(activeView === item.id || (item.id === 'lowongan-list' && activeView === 'lowongan-detail')) && (
                  <motion.div 
                    layoutId="header-active-indicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-4">
            {userRole === 'guest' ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveView('login')}
                  className="text-sm font-semibold text-slate-700 hover:text-[#2563EB] transition cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  onClick={() => setActiveView('register')}
                  className="px-5 py-2.5 text-sm font-semibold bg-[#2563EB] text-white rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition cursor-pointer"
                >
                  Daftar Akun
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3.5 relative">
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
                      setIsProfileDropdownOpen(false);
                    }}
                    className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-50 transition cursor-pointer relative"
                  >
                    <Bell size={20} />
                    {notifications.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    )}
                  </button>

                  <AnimatePresence>
                    {isNotificationDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 text-left"
                      >
                        <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                          <h4 className="font-semibold text-sm text-slate-800">Notifikasi ({notifications.length})</h4>
                          {notifications.length > 0 && (
                            <button 
                              onClick={clearNotifications}
                              className="text-xs text-blue-600 hover:underline cursor-pointer"
                            >
                              Hapus Semua
                            </button>
                          )}
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <p className="text-slate-400 text-xs py-8 text-center">Tidak ada notifikasi baru.</p>
                          ) : (
                            notifications.map((notif, index) => (
                              <div key={index} className="px-4 py-2.5 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition text-xs text-slate-600">
                                {notif}
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-slate-200"></div>

                {/* Profile Widget */}
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    setIsNotificationDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-50 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                    {userProfile.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                    {userProfile.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-44 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 text-left"
                    >
                      <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs text-slate-400">Masuk sebagai</p>
                        <p className="font-semibold text-sm text-slate-800 truncate">{userProfile.name}</p>
                        <p className="text-xs text-slate-500 truncate">{userProfile.email}</p>
                      </div>

                      {userRole === 'mahasiswa' && (
                        <>
                          <button
                            onClick={() => { setActiveView('dashboard-student'); setIsProfileDropdownOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-2.5 cursor-pointer"
                          >
                            <LayoutDashboard size={16} className="text-slate-400" />
                            Dashboard
                          </button>
                          <button
                            onClick={() => { setActiveView('profil-mahasiswa'); setIsProfileDropdownOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-2.5 cursor-pointer"
                          >
                            <User size={16} className="text-slate-400" />
                            Profil Saya
                          </button>
                        </>
                      )}

                      {userRole === 'admin' && (
                        <button
                          onClick={() => { setActiveView('dashboard-admin'); setIsProfileDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-2.5 cursor-pointer"
                        >
                          <Settings size={16} className="text-slate-400" />
                          Dashboard Admin
                        </button>
                      )}

                      <div className="border-t border-slate-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2.5 cursor-pointer"
                      >
                        <LogOut size={16} />
                        Keluar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {userRole !== 'guest' && (
              <button
                onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg relative"
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                )}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveView(item.id); setIsMobileMenuOpen(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeView === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="h-px bg-slate-100 my-2"></div>

              {userRole === 'guest' ? (
                <div className="grid grid-cols-2 gap-2 pt-1.5">
                  <button
                    onClick={() => { setActiveView('login'); setIsMobileMenuOpen(false); }}
                    className="text-center py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => { setActiveView('register'); setIsMobileMenuOpen(false); }}
                    className="text-center py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                  >
                    Daftar
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-2 bg-slate-50 rounded-xl mb-2">
                    <p className="text-[10px] text-slate-400">Masuk sebagai</p>
                    <p className="text-xs font-semibold text-slate-800 truncate">{userProfile.name}</p>
                  </div>

                  {userRole === 'mahasiswa' && (
                    <>
                      <button
                        onClick={() => { setActiveView('dashboard-student'); setIsMobileMenuOpen(false); }}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard Mahasiswa
                      </button>
                      <button
                        onClick={() => { setActiveView('profil-mahasiswa'); setIsMobileMenuOpen(false); }}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <User size={16} />
                        Profil Saya
                      </button>
                    </>
                  )}

                  {userRole === 'admin' && (
                    <button
                      onClick={() => { setActiveView('dashboard-admin'); setIsMobileMenuOpen(false); }}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <Settings size={16} />
                      Dashboard Admin
                    </button>
                  )}

                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
