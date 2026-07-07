import React, { useState } from 'react';
import { 
  LayoutDashboard, Briefcase, Calendar, Award, FileText, User, 
  Bell, ChevronRight, CheckCircle2, Clock, CalendarDays, BookOpen, AlertCircle
} from 'lucide-react';
import { Job, CareerEvent } from '../types';
import { careerTips } from '../mockData';

interface StudentDashboardProps {
  jobs: Job[];
  events: CareerEvent[];
  userProfile: { name: string; email: string; nim: string };
  setActiveView: (view: any) => void;
  setSelectedJobId: (id: string) => void;
}

export default function StudentDashboard({
  jobs,
  events,
  userProfile,
  setActiveView,
  setSelectedJobId
}: StudentDashboardProps) {
  // We can track a secondary tab inside the dashboard just in case, but let's provide a fully integrated view
  const appliedJobs = jobs.filter(job => job.isApplied);

  const stats = [
    { label: 'Total Lamaran', value: appliedJobs.length, color: 'bg-blue-600', text: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Tahap Review', value: appliedJobs.filter(j => j.appliedStatus === 'Review').length, color: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Undangan Wawancara', value: appliedJobs.filter(j => j.appliedStatus === 'Interview').length, color: 'bg-purple-600', text: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Diterima Bekerja', value: appliedJobs.filter(j => j.appliedStatus === 'Accepted').length, color: 'bg-emerald-600', text: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  // Latest matching jobs
  const recommendedJobs = jobs.slice(0, 3);

  // Next events
  const nextEvents = events.slice(1, 3);

  return (
    <div className="flex-1 bg-slate-50 flex flex-col md:flex-row min-h-screen text-left">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-5 space-y-6 shrink-0">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-3">Portal Mahasiswa</p>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {userProfile.name.charAt(0)}
            </div>
            <div className="truncate">
              <h4 className="font-bold text-xs text-slate-900 truncate">{userProfile.name}</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">NIM: {userProfile.nim}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Menu Links */}
        <nav className="space-y-1">
          <button
            onClick={() => setActiveView('dashboard-student')}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50 transition text-left cursor-pointer"
          >
            <LayoutDashboard size={16} />
            <span>Dashboard Utama</span>
          </button>
          
          <button
            onClick={() => setActiveView('lowongan-list')}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <Briefcase size={16} className="text-slate-400" />
            <span>Cari Lowongan</span>
          </button>

          <button
            onClick={() => setActiveView('program-cdc')}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <Award size={16} className="text-slate-400" />
            <span>Program CDC & Coaching</span>
          </button>

          <button
            onClick={() => setActiveView('profil-mahasiswa')}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <User size={16} className="text-slate-400" />
            <span>Profil CV & Portfolio</span>
          </button>
        </nav>

        {/* Support Card */}
        <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 p-4 rounded-2xl text-white space-y-2 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
          <p className="font-bold text-xs">Butuh Review CV?</p>
          <p className="text-[10px] text-slate-300 leading-relaxed">Dapatkan penilaian kelayakan ATS CV kamu gratis oleh konselor karir kami.</p>
          <button 
            onClick={() => setActiveView('program-cdc')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] py-2 rounded-lg transition mt-1"
          >
            Unggah CV Sekarang
          </button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Halo, {userProfile.name}! 👋</h1>
            <p className="text-xs text-slate-500 mt-1">Selamat datang kembali. Berikut adalah perkembangan status lamaran & rekomendasi karir Anda.</p>
          </div>
          
          <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Otentikasi CDC Sukses</span>
          </div>
        </div>

        {/* STATISTIK LAMARAN CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((st, i) => (
            <div key={i} className="bg-white p-4.5 rounded-[20px] shadow-xs border border-slate-100 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{st.label}</span>
                <span className={`w-2 h-2 rounded-full ${st.color}`}></span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-950 tracking-tight">{st.value}</span>
                <span className="text-[10px] text-slate-400 font-semibold">Lamaran</span>
              </div>
              <div className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-block ${st.bg} ${st.text}`}>
                Update Hari Ini
              </div>
            </div>
          ))}
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: ACTIVE APPLICATIONS & LATEST JOBS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* ACTIVE APPLICATIONS STATUS */}
            <div className="bg-white rounded-[20px] p-5 shadow-xs border border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" />
                  Status Lamaran Pekerjaan Saya
                </h3>
                <span className="text-xs text-slate-400 font-semibold">{appliedJobs.length} Aktif</span>
              </div>

              <div className="space-y-3">
                {appliedJobs.length === 0 ? (
                  <div className="p-8 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
                    <p className="text-xs text-slate-400">Anda belum melamar ke lowongan manapun saat ini.</p>
                    <button
                      onClick={() => setActiveView('lowongan-list')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl transition inline-block cursor-pointer"
                    >
                      Cari Lowongan Kerja
                    </button>
                  </div>
                ) : (
                  appliedJobs.map((j) => (
                    <div key={j.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-white hover:border-blue-100 transition">
                      <div className="flex items-center gap-3">
                        <img src={j.logo} alt={j.companyName} className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{j.position}</h4>
                          <p className="text-[10px] text-slate-500">{j.companyName}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[10px] font-mono text-slate-400">Dilamar: {j.appliedDate}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          j.appliedStatus === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          j.appliedStatus === 'Interview' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                          j.appliedStatus === 'Review' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-blue-50 text-blue-700 border border-blue-100'
                        }`}>
                          {j.appliedStatus === 'Accepted' ? 'Diterima ✓' :
                           j.appliedStatus === 'Interview' ? 'Wawancara 📞' :
                           j.appliedStatus === 'Review' ? 'Direview 👀' : 'Terkirim 📨'}
                        </span>
                        <button
                          onClick={() => { setSelectedJobId(j.id); setActiveView('lowongan-detail'); }}
                          className="p-1 text-slate-400 hover:text-blue-600 transition"
                          title="Detail Pekerjaan"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RECOMMENDED LATEST JOBS */}
            <div className="bg-white rounded-[20px] p-5 shadow-xs border border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900">Lowongan yang Cocok Untuk Anda</h3>
                <button onClick={() => setActiveView('lowongan-list')} className="text-xs text-blue-600 font-semibold hover:underline">
                  Lihat Semua
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedJobs.map((j) => (
                  <div key={j.id} className="p-4 bg-slate-50 hover:bg-white hover:shadow-xs border border-slate-100 hover:border-blue-100 rounded-xl transition flex flex-col justify-between group">
                    <div>
                      <div className="flex gap-2.5 items-center mb-3">
                        <img src={j.logo} alt={j.companyName} className="w-8 h-8 rounded-lg object-cover bg-slate-200" referrerPolicy="no-referrer" />
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 uppercase tracking-wider">{j.jobType}</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition truncate">{j.position}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold truncate mb-2">{j.companyName}</p>
                      <p className="text-[10px] text-slate-400 truncate mb-3">📍 {j.location}</p>
                    </div>

                    <button
                      onClick={() => { setSelectedJobId(j.id); setActiveView('lowongan-detail'); }}
                      className="w-full bg-white group-hover:bg-blue-600 text-slate-700 group-hover:text-white text-[11px] font-bold py-1.5 rounded-lg border border-slate-150 group-hover:border-blue-600 transition text-center"
                    >
                      Lamar Sekarang
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: NOTIFICATIONS, EVENTS & TIPS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* UPCOMING EVENTS */}
            <div className="bg-white rounded-[20px] p-5 shadow-xs border border-slate-100 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <CalendarDays size={16} className="text-blue-600" />
                Event Kampus Terdekat
              </h3>

              <div className="space-y-3">
                {nextEvents.map((ev) => (
                  <div key={ev.id} className="p-3 bg-slate-50 rounded-xl space-y-2 hover:bg-white hover:border border-blue-50 transition">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 uppercase">{ev.type}</span>
                    <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">{ev.title}</h4>
                    <p className="text-[10px] text-slate-400">📅 {ev.date}</p>
                    <button 
                      onClick={() => setActiveView('program-cdc')}
                      className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                    >
                      Daftar Sekarang <ChevronRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CAREER TIPS BENTO */}
            <div className="bg-white rounded-[20px] p-5 shadow-xs border border-slate-100 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BookOpen size={16} className="text-blue-600" />
                Tips Persiapan Karier
              </h3>

              <div className="space-y-3.5">
                {careerTips.slice(0, 2).map((tip) => (
                  <div key={tip.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{tip.category}</span>
                      <span className="text-[9px] text-slate-400">{tip.readTime}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 hover:text-blue-600 transition cursor-pointer">{tip.title}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{tip.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ASSISTANT SUPPORT WIDGET */}
            <div className="bg-blue-600 text-white p-4.5 rounded-[20px] text-xs space-y-3 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-15">
                <LayoutDashboard size={120} />
              </div>
              <h4 className="font-bold text-sm">Konseling Karir Terjadwal?</h4>
              <p className="leading-relaxed text-[11px] text-blue-100">Booking sesi privat 1-on-1 dengan konselor CDC untuk merancang peta jalan karir dan simulasi wawancara psikologi.</p>
              <button
                onClick={() => setActiveView('program-cdc')}
                className="bg-white text-blue-700 font-bold px-3 py-2 rounded-xl hover:bg-blue-50 transition cursor-pointer w-full text-center text-[10px]"
              >
                Booking Jadwal Mentor
              </button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
