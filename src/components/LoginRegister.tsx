import React, { useState } from 'react';
import { Mail, Lock, User, UserCheck, ArrowRight, Eye, EyeOff, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginRegisterProps {
  type: 'login' | 'register';
  setActiveView: (view: any) => void;
  setUserRole: (role: 'guest' | 'mahasiswa' | 'admin') => void;
  setUserProfile: (profile: { name: string; email: string; nim: string }) => void;
  addNotification: (msg: string) => void;
}

export default function LoginRegister({
  type,
  setActiveView,
  setUserRole,
  setUserProfile,
  addNotification
}: LoginRegisterProps) {
  // Common States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Register Specific States
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Validation / Feedback UI states
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick Account Login Helper (to guide the prototype inspector)
  const handleQuickLogin = (role: 'mahasiswa' | 'admin') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'mahasiswa') {
        setUserRole('mahasiswa');
        setUserProfile({
          name: 'Andi Wijaya',
          email: 'andi.wijaya@mahasiswa.ac.id',
          nim: '22010199042'
        });
        addNotification('Selamat datang kembali, Andi Wijaya! Memuat dashboard akademik Anda...');
        setActiveView('dashboard-student');
      } else {
        setUserRole('admin');
        setUserProfile({
          name: 'Ibu Saraswati, M.B.A (Admin)',
          email: 'saraswati.cdc@universitas.ac.id',
          nim: 'NIDN1029495'
        });
        addNotification('Dashboard Administrator CDC berhasil dimuat.');
        setActiveView('dashboard-admin');
      }
    }, 850);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Harap isi seluruh kolom email dan password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      // Auto routing based on email keyword or defaults
      if (email.toLowerCase().includes('admin')) {
        setUserRole('admin');
        setUserProfile({
          name: 'Ibu Saraswati, M.B.A (Admin)',
          email: email,
          nim: 'NIDN1029495'
        });
        addNotification('Masuk sukses sebagai Administrator CDC.');
        setActiveView('dashboard-admin');
      } else {
        setUserRole('mahasiswa');
        setUserProfile({
          name: name || 'Andi Wijaya',
          email: email,
          nim: nim || '22010199042'
        });
        addNotification('Masuk sukses sebagai Mahasiswa/Alumni.');
        setActiveView('dashboard-student');
      }
    }, 900);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nim || !email || !password || !confirmPassword) {
      setErrorMsg('Semua kolom pendaftaran harus diisi.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi password tidak cocok dengan password.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Anda harus menyetujui Ketentuan Penggunaan & Privasi CDC.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      setUserRole('mahasiswa');
      setUserProfile({
        name,
        email,
        nim
      });
      addNotification(`Akun CDC atas nama ${name} berhasil didaftarkan!`);
      setActiveView('dashboard-student');
    }, 1000);
  };

  return (
    <div className="flex-1 bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-slate-100 p-8 space-y-6 text-left relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>

        {/* Form Title */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {type === 'login' ? 'Masuk ke Portal CDC' : 'Daftar Akun Baru CDC'}
          </h2>
          <p className="text-xs text-slate-500">
            {type === 'login' 
              ? 'Selamat datang! Akses ribuan karier profesional sekarang' 
              : 'Gabung dan mulai persiapkan masa depan kariermu sekarang'
            }
          </p>
        </div>

        {/* Demo Assistant Guidance Box */}
        <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl space-y-2 text-xs">
          <p className="font-bold text-blue-800">💡 Mode Demo Cepat (Senior Designer Recommendation):</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('mahasiswa')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-2 rounded-lg transition cursor-pointer text-center text-[10px]"
            >
              Simulasi Mahasiswa
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-1.5 px-2 rounded-lg transition cursor-pointer text-center text-[10px]"
            >
              Simulasi Admin CDC
            </button>
          </div>
        </div>

        {/* Error Notification Alert */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-xs p-3 rounded-xl font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Actual Form */}
        <form onSubmit={type === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
          
          {/* Register Fields (Name, NIM) */}
          {type === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nama Lengkap</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Andi Wijaya"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9.5 pr-4 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nomor Induk Mahasiswa (NIM)</label>
                <div className="relative">
                  <UserCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 22010199042"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9.5 pr-4 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Email Kampus / Personal</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="andi@mahasiswa.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9.5 pr-4 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="• • • • • • • •"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9.5 pr-10 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register Only) */}
          {type === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Konfirmasi Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="• • • • • • • •"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9.5 pr-10 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
                />
              </div>
            </div>
          )}

          {/* Remember Me or Checkbox Agree */}
          {type === 'login' ? (
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                {rememberMe ? (
                  <CheckSquare size={16} className="text-blue-600" />
                ) : (
                  <Square size={16} className="text-slate-300" />
                )}
                Ingat Saya
              </button>
              <a href="#" className="text-blue-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); alert('Instruksi pemulihan password dikirim ke email kampus Anda.'); }}>
                Lupa Password?
              </a>
            </div>
          ) : (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setAgreeTerms(!agreeTerms)}
                className="flex items-start gap-2.5 text-xs text-slate-600 hover:text-slate-900 leading-tight cursor-pointer"
              >
                {agreeTerms ? (
                  <CheckSquare size={16} className="text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <Square size={16} className="text-slate-300 shrink-0 mt-0.5" />
                )}
                <span>Saya menyetujui segala <strong className="text-blue-600">Syarat Ketentuan</strong> dan <strong className="text-blue-600">Kebijakan Privasi</strong> pendaftaran CDC Universitas.</span>
              </button>
            </div>
          )}

          {/* Primary Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl text-xs transition shadow-md shadow-blue-100 flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {isLoading ? (
              <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {type === 'login' ? 'Masuk ke Akun' : 'Daftar Sekarang'}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-150"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">Atau masuk dengan</span>
          <div className="flex-grow border-t border-slate-150"></div>
        </div>

        {/* Google OAuth Simulation button */}
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setUserRole('mahasiswa');
              setUserProfile({
                name: 'Andi Wijaya',
                email: 'andi.wijaya@mahasiswa.ac.id',
                nim: '22010199042'
              });
              addNotification('Berhasil melakukan otentikasi Google SSO Kampus.');
              setActiveView('dashboard-student');
            }, 800);
          }}
          className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          {/* Simple google SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.125C18.25 1.583 15.525 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.74-.08-1.302-.176-1.859H12.24z"
            />
          </svg>
          Google SSO Universitas
        </button>

        {/* Register Toggle Link */}
        <div className="text-center pt-2">
          {type === 'login' ? (
            <p className="text-xs text-slate-500">
              Belum punya akun CDC?{' '}
              <button 
                onClick={() => setActiveView('register')} 
                className="text-blue-600 hover:underline font-bold cursor-pointer"
              >
                Daftar Akun Baru
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Sudah memiliki akun?{' '}
              <button 
                onClick={() => setActiveView('login')} 
                className="text-blue-600 hover:underline font-bold cursor-pointer"
              >
                Masuk di Sini
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
