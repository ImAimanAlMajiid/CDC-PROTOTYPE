import React, { useState } from 'react';
import { 
  Settings, Users, Building, Briefcase, FileSpreadsheet, Plus, 
  TrendingUp, Calendar, BookOpen, Clock, CheckCircle2, UserCheck, Trash2 
} from 'lucide-react';
import { Job } from '../types';

interface AdminDashboardProps {
  jobs: Job[];
  onAddJob: (newJob: Job) => void;
  onDeleteJob: (id: string) => void;
  addNotification: (msg: string) => void;
}

export default function AdminDashboard({
  jobs,
  onAddJob,
  onDeleteJob,
  addNotification
}: AdminDashboardProps) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'dashboard' | 'kelola-lowongan' | 'kelola-event'>('dashboard');
  
  // States for adding a new job
  const [newPos, setNewPos] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLoc, setNewLoc] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newJobType, setNewJobType] = useState<'Full-time' | 'Magang' | 'Part-time' | 'Kontrak'>('Full-time');
  const [newCategory, setNewCategory] = useState<'IT & Software' | 'Design' | 'Marketing' | 'Finance' | 'Human Resources' | 'Engineering'>('IT & Software');
  const [newExp, setNewExp] = useState<'Fresh Graduate' | '1-3 Tahun' | '3-5 Tahun' | 'Senior'>('Fresh Graduate');
  const [newDeadline, setNewDeadline] = useState('2026-08-30');
  const [newDesc, setNewDesc] = useState('');

  const [formSuccess, setFormSuccess] = useState(false);

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPos || !newCompany || !newLoc || !newDesc) {
      alert('Mohon lengkapi seluruh kolom formulir lowongan.');
      return;
    }

    const createdJob: Job = {
      id: `job-${Date.now()}`,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&h=120&q=80',
      companyName: newCompany,
      position: newPos,
      location: newLoc,
      salary: newSalary || 'Gaji Kompetitif',
      jobType: newJobType,
      category: newCategory,
      experience: newExp,
      deadline: newDeadline,
      description: newDesc,
      requirements: [
        'Minimal gelar S1/D4 relevan dengan IPK minimal 3.00.',
        'Memiliki keahlian komunikasi tertulis dan interpersonal yang kuat.',
        'Mampu beradaptasi cepat dengan lingkungan teknologi industri modern.'
      ],
      benefits: [
        'Kompensasi bulanan kompetitif',
        'Asuransi kesehatan lengkap',
        'Mentoring intensif bimbingan karir'
      ],
      skills: ['Komunikasi', 'Pemecahan Masalah', 'Kerjasama Tim'],
      isBookmarked: false,
      isApplied: false
    };

    onAddJob(createdJob);
    addNotification(`Lowongan baru "${newPos}" di ${newCompany} berhasil diterbitkan.`);
    setFormSuccess(true);
    
    // Clear Form
    setNewPos('');
    setNewCompany('');
    setNewLoc('');
    setNewSalary('');
    setNewDesc('');

    setTimeout(() => setFormSuccess(false), 3000);
  };

  const adminStats = [
    { label: 'Total Mahasiswa', value: '14.850', sub: '+12% bulan ini', icon: <Users className="text-blue-600" size={20} /> },
    { label: 'Perusahaan Terdaftar', value: '382', sub: '+8 Perusahaan baru', icon: <Building className="text-indigo-600" size={20} /> },
    { label: 'Lowongan Kerja Aktif', value: jobs.length, sub: 'Baru ditambahkan', icon: <Briefcase className="text-emerald-600" size={20} /> },
    { label: 'Total Lamaran Masuk', value: '4.892', sub: 'Tingkat konversi 88%', icon: <FileSpreadsheet className="text-purple-600" size={20} /> }
  ];

  const recentActivities = [
    { name: 'Andi Wijaya', action: 'melamar posisi Junior Software Engineer', company: 'PT GoTo Tbk', time: '5 menit yang lalu', status: 'Terkirim' },
    { name: 'Rian Pratama', action: 'melamar posisi Product Design Intern', company: 'Traveloka', time: '12 menit yang lalu', status: 'Interview' },
    { name: 'Siti Rahmawati', action: 'booking Career Coaching', company: 'Coach Gunawan', time: '1 jam yang lalu', status: 'Terjadwal' },
    { name: 'Faisal Akbar', action: 'mengunggah dokumen CV baru', company: 'Review ATS', time: '2 jam yang lalu', status: 'Dalam Proses' }
  ];

  return (
    <div className="flex-1 bg-slate-50 flex flex-col md:flex-row min-h-screen text-left">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-5 space-y-6 shrink-0">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider pl-3">Portal Administrator</p>
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-2xl border border-slate-700">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0">
              AD
            </div>
            <div className="truncate">
              <h4 className="font-bold text-xs text-white truncate">Ibu Saraswati, M.B.A</h4>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">NIDN: 1029495</p>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="space-y-1">
          <button
            onClick={() => setActiveAdminSubTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
              activeAdminSubTab === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings size={16} />
            <span>Statistik & Aktivitas</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('kelola-lowongan')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
              activeAdminSubTab === 'kelola-lowongan'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Briefcase size={16} />
            <span>Kelola Lowongan ({jobs.length})</span>
          </button>
        </nav>

        {/* Info panel */}
        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-[10px] text-slate-400 leading-relaxed space-y-2">
          <p className="font-bold text-white uppercase text-[9px] tracking-wider">💡 Catatan Pengembang:</p>
          <p>Seluruh aksi menambah lowongan pada panel admin ini akan langsung memperbarui daftar lowongan aktif di halaman mahasiswa secara dinamis.</p>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard Admin CDC</h1>
            <p className="text-xs text-slate-500 mt-1">Sistem Pengelolaan Informasi Karir, Kelola Lamaran, serta Terbitkan Lowongan Baru Mitra Industri.</p>
          </div>
          
          <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 flex items-center gap-2 text-xs font-semibold text-amber-800 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Mode Kontrol Admin Aktif</span>
          </div>
        </div>

        {/* 1. MAIN STATISTIK & AKTIVITAS SUBTAB */}
        {activeAdminSubTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* GRID OF ADMIN CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {adminStats.map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-[20px] shadow-xs border border-slate-100 flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">{stat.label}</span>
                    <span className="text-2xl font-extrabold text-slate-950 tracking-tight block mt-0.5">{stat.value}</span>
                    <span className="text-[9px] font-semibold text-emerald-600 block mt-0.5">{stat.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* TWO-COLUMN LAYOUT: ANALYTICS GRAPH (7/12) & RECENT ACTIVITY (5/12) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* GRAPH ANALYTICAL PREVIEW */}
              <div className="lg:col-span-7 bg-white p-5.5 rounded-[20px] border border-slate-100 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-950">Grafik Penyerapan Alumni (6 Bulan Terakhir)</h3>
                    <p className="text-[10px] text-slate-400">Total penyerapan kerja alumni Universitas dalam persentase (%)</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">Rata-rata: 88.4%</span>
                </div>

                {/* Custom Elegant SVG Chart to satisfy "Recharts/D3 representation" but resilient & pixel-perfect */}
                <div className="h-60 w-full bg-slate-50 rounded-xl border border-slate-100 p-4 relative flex flex-col justify-between">
                  <div className="absolute inset-0 flex flex-col justify-between py-6 px-10 select-none">
                    {[100, 75, 50, 25, 0].map((v) => (
                      <div key={v} className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400 w-6 text-right">{v}%</span>
                        <div className="flex-1 border-t border-slate-200/60 border-dashed"></div>
                      </div>
                    ))}
                  </div>

                  {/* SVG Polyline Graph */}
                  <svg className="w-full h-full absolute inset-0 z-10 p-10 overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    {/* Area fill */}
                    <path
                      d="M 20,80 L 100,60 L 180,50 L 260,35 L 340,30 L 420,18 L 420,120 L 20,120 Z"
                      fill="url(#grad)"
                      opacity="0.15"
                    />
                    {/* Line path */}
                    <path
                      d="M 20,80 L 100,60 L 180,50 L 260,35 L 340,30 L 420,18"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Data nodes */}
                    <circle cx="20" cy="80" r="5.5" fill="#2563eb" stroke="#fff" strokeWidth="2.5" />
                    <circle cx="100" cy="60" r="5.5" fill="#2563eb" stroke="#fff" strokeWidth="2.5" />
                    <circle cx="180" cy="50" r="5.5" fill="#2563eb" stroke="#fff" strokeWidth="2.5" />
                    <circle cx="260" cy="35" r="5.5" fill="#2563eb" stroke="#fff" strokeWidth="2.5" />
                    <circle cx="340" cy="30" r="5.5" fill="#2563eb" stroke="#fff" strokeWidth="2.5" />
                    <circle cx="420" cy="18" r="5.5" fill="#2563eb" stroke="#fff" strokeWidth="2.5" />

                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Months Legend */}
                  <div className="mt-auto flex justify-between px-8 text-[9px] font-bold text-slate-400 pt-2 z-20">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>Mei</span>
                    <span>Jun 2026</span>
                  </div>
                </div>
              </div>

              {/* RECENT INCOMING LOGS */}
              <div className="lg:col-span-5 bg-white p-5.5 rounded-[20px] border border-slate-100 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-slate-950">Aktivitas Terkini</h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">Hari Ini</span>
                </div>

                <div className="space-y-3.5">
                  {recentActivities.map((act, idx) => (
                    <div key={idx} className="flex gap-3 text-xs font-semibold text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                      <div className="flex-1 leading-tight">
                        <p className="text-slate-800">{act.name} <span className="font-normal text-slate-500">{act.action}</span> <span className="text-blue-600">{act.company}</span></p>
                        <span className="text-[9px] text-slate-400 font-normal">{act.time}</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded h-fit shrink-0">
                        {act.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. KELOLA LOWONGAN (WITH JOB ADD FORM) */}
        {activeAdminSubTab === 'kelola-lowongan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* NEW JOB FORM (5/12) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-[20px] shadow-xs border border-slate-100 space-y-4.5">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-sm text-slate-950 flex items-center gap-1.5">
                  <Plus size={18} className="text-blue-600" />
                  Terbitkan Lowongan Baru
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">Formulir resmi dewan penilai CDC Universitas untuk mitra industri.</p>
              </div>

              {formSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs p-3 rounded-xl font-bold">
                  ✓ Lowongan Kerja Baru Berhasil Diterbitkan Diri!
                </div>
              )}

              <form onSubmit={handleCreateJobSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 uppercase block">Nama Perusahaan Mitra</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Pertamina Tbk"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 uppercase block">Posisi / Jabatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Digital Marketer Associate"
                    value={newPos}
                    onChange={(e) => setNewPos(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 uppercase block">Lokasi & Sistem Kerja</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jakarta Pusat (Hybrid)"
                    value={newLoc}
                    onChange={(e) => setNewLoc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase block">Tipe Kontrak</label>
                    <select
                      value={newJobType}
                      onChange={(e) => setNewJobType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Magang">Magang</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Kontrak">Kontrak</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase block">Kategori Kerja</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="IT & Software">IT & Software</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase block">Pengalaman</label>
                    <select
                      value={newExp}
                      onChange={(e) => setNewExp(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="Fresh Graduate">Fresh Graduate</option>
                      <option value="1-3 Tahun">1-3 Tahun</option>
                      <option value="3-5 Tahun">3-5 Tahun</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase block">Estimasi Gaji Bulanan</label>
                    <input
                      type="text"
                      placeholder="Rp 6.000.000 - Rp 9.000.000"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 uppercase block">Batas Akhir (Deadline)</label>
                  <input
                    type="date"
                    required
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 uppercase block">Deskripsi Tugas Singkat</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tulis ringkasan tugas dan tanggung jawab posisi pekerjaan..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-blue-100 mt-2"
                >
                  Terbitkan Lowongan Kerja 🚀
                </button>
              </form>
            </div>

            {/* MANAGE ACTIVE LISTS (7/12) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-[20px] shadow-xs border border-slate-100 space-y-4">
              <h3 className="font-extrabold text-sm text-slate-950">Daftar Lowongan Aktif Portal</h3>

              <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {jobs.map((j) => (
                  <div key={j.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center gap-3 hover:bg-white hover:shadow-xs transition">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={j.logo} alt={j.companyName} className="w-9 h-9 rounded-lg object-cover bg-slate-100 shrink-0" referrerPolicy="no-referrer" />
                      <div className="truncate text-xs font-semibold">
                        <h4 className="font-bold text-slate-900 truncate">{j.position}</h4>
                        <p className="text-[10px] text-slate-500 truncate">{j.companyName}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Deadline: {j.deadline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {j.jobType}
                      </span>
                      <button
                        onClick={() => {
                          onDeleteJob(j.id);
                          addNotification(`Lowongan ${j.position} berhasil dihapus.`);
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Hapus Lowongan"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
