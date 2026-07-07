import React, { useState, useRef } from 'react';
import { 
  Award, Calendar, Upload, FileText, User, Users, CheckCircle2, 
  Video, ChevronRight, MapPin, ArrowRight, ShieldAlert, Sparkles 
} from 'lucide-react';
import { careerCoaches, mockCampusHiring } from '../mockData';
import { CareerCoaching, CVReviewSession } from '../types';

interface CdcProgramsProps {
  cvReviews: CVReviewSession[];
  onUploadCV: (fileName: string) => void;
  coachingBookings: string[];
  onBookCoaching: (mentorId: string, dateTime: string) => void;
  addNotification: (msg: string) => void;
  userRole: 'guest' | 'mahasiswa' | 'admin';
  setActiveView: (view: any) => void;
}

export default function CdcPrograms({
  cvReviews,
  onUploadCV,
  coachingBookings,
  onBookCoaching,
  addNotification,
  userRole,
  setActiveView
}: CdcProgramsProps) {
  const [activeTab, setActiveTab] = useState<'coaching' | 'cv-review' | 'webinar' | 'hiring'>('coaching');
  
  // States for coaching booking modal
  const [selectedCoach, setSelectedCoach] = useState<CareerCoaching | null>(null);
  const [bookingTime, setBookingTime] = useState('');
  
  // File upload simulation refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Handle Coaching Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === 'guest') {
      alert('Silakan login terlebih dahulu untuk mendaftar coaching.');
      setActiveView('login');
      return;
    }
    if (selectedCoach && bookingTime) {
      onBookCoaching(selectedCoach.id, bookingTime);
      addNotification(`Coaching terjadwal bersama ${selectedCoach.mentorName} pada ${bookingTime}.`);
      setSelectedCoach(null);
      setBookingTime('');
    }
  };

  // Handle CV Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userRole === 'guest') {
      alert('Silakan login terlebih dahulu untuk mengunggah CV.');
      setActiveView('login');
      return;
    }
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        alert('Format file tidak didukung. Silakan unggah dokumen PDF.');
        return;
      }
      onUploadCV(file.name);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  // Handle drag and drop simulation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (userRole === 'guest') {
      alert('Silakan login terlebih dahulu untuk mengunggah CV.');
      setActiveView('login');
      return;
    }
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        alert('Hanya diperbolehkan dokumen PDF.');
        return;
      }
      onUploadCV(file.name);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Title */}
        <div className="text-left space-y-1.5">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Layanan Unggulan Program CDC</h1>
          <p className="text-xs text-slate-500">Mempersiapkan bekal kompetensi Anda melalui rangkaian akselerasi bimbingan, review CV kilat, dan relasi industri.</p>
        </div>

        {/* SERVICE SELECTOR TABS */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-px">
          {[
            { id: 'coaching', label: '👥 Career Coaching' },
            { id: 'cv-review', label: '📄 CV Review Kilat' },
            { id: 'webinar', label: '📹 Webinar Kelas Karir' },
            { id: 'hiring', label: '🏢 Campus Hiring' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs sm:text-sm font-bold px-4 py-3 transition cursor-pointer border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="pt-2">
          
          {/* 1. CAREER COACHING */}
          {activeTab === 'coaching' && (
            <div className="space-y-6">
              <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold">1-ON-1 PERSONAL MENTORING</span>
                  <h2 className="text-lg font-bold text-slate-900">Konsultasikan Peta Jalan Karir Anda</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sesi privat tatap muka/online selama 45 menit bersama HR Analyst bersertifikasi untuk membedah potensi diri, menyusun strategi portofolio teknis, dan mempersiapkan simulasi wawancara psikologi.
                  </p>
                </div>
                <div className="md:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 space-y-2">
                  <div className="flex justify-between"><span>💵 Biaya Sesi:</span> <span className="text-emerald-600">FREE (Khusus Mahasiswa)</span></div>
                  <div className="flex justify-between"><span>🕒 Durasi:</span> <span>45 Menit / Sesi</span></div>
                  <div className="flex justify-between"><span>📍 Media:</span> <span>Zoom / Tatap Muka</span></div>
                </div>
              </div>

              {/* Mentors List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {careerCoaches.map((coach) => {
                  const isBooked = coachingBookings.includes(coach.id);
                  return (
                    <div key={coach.id} className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3.5">
                          <img src={coach.mentorAvatar} alt={coach.mentorName} className="w-12 h-12 rounded-full object-cover bg-slate-100" referrerPolicy="no-referrer" />
                          <div>
                            <h3 className="font-bold text-xs text-slate-900">{coach.mentorName}</h3>
                            <p className="text-[10px] text-slate-500">{coach.mentorTitle}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Spesialisasi Bimbingan:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {coach.specialties.map((sp) => (
                              <span key={sp} className="text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                                {sp}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 text-[10px] text-slate-500 font-semibold">
                          🕒 Jadwal Aktif: <span className="text-slate-800">{coach.schedule}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCoach(coach)}
                        disabled={isBooked}
                        className={`w-full text-xs font-bold py-2.5 rounded-xl transition cursor-pointer mt-5 ${
                          isBooked 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                        }`}
                      >
                        {isBooked ? 'Jadwal Terdaftar ✓' : 'Booking Jadwal'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. CV REVIEW KILAT */}
          {activeTab === 'cv-review' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* UPLOAD FORM (7/12) */}
                <div className="lg:col-span-7 bg-white rounded-[20px] p-6 shadow-xs border border-slate-100 space-y-6">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold">ANALYSIS ATS ACCURACY</span>
                    <h2 className="text-base font-bold text-slate-900">Unggah CV Anda Untuk Direview Konselor</h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Konselor kami akan membedah kelayakan kata kunci, tata letak kronologis, serta tata bahasa CV Anda agar dapat lolos pemindaian ATS sistem HR dengan akurasi 90%+.
                    </p>
                  </div>

                  {/* DRAG AND DROP SIMULATED AREA */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                      dragOver 
                        ? 'border-blue-600 bg-blue-50/40' 
                        : uploadSuccess 
                        ? 'border-emerald-500 bg-emerald-50/20' 
                        : 'border-slate-200 hover:border-blue-500 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".pdf"
                      className="hidden"
                    />
                    <div className="space-y-3.5">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                        <Upload size={22} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-800">
                          {uploadSuccess ? 'CV Berhasil Diunggah! 🎉' : 'Klik atau Tarik file CV PDF Anda di sini'}
                        </p>
                        <p className="text-[10px] text-slate-400">Hanya format dokumen PDF (maksimal 5MB)</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-[10px] font-semibold text-slate-500 leading-relaxed">
                    <ShieldAlert size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <span>Layanan ini 100% gratis untuk mahasiswa aktif dan alumni terdaftar. Review dikirim dalam 2x24 jam dalam bentuk laporan dokumen tertulis ke dashboard ini.</span>
                  </div>
                </div>

                {/* REVIEW HISTORY LIST (5/12) */}
                <div className="lg:col-span-5 bg-white rounded-[20px] p-6 shadow-xs border border-slate-100 space-y-4">
                  <h3 className="font-bold text-sm text-slate-900">Riwayat Pengajuan Review CV</h3>

                  <div className="space-y-3.5">
                    {cvReviews.length === 0 ? (
                      <p className="text-slate-400 text-xs py-8 text-center">Belum ada dokumen CV yang dikirim untuk review.</p>
                    ) : (
                      cvReviews.map((rev) => (
                        <div key={rev.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <FileText size={18} className="text-blue-600" />
                              <div className="truncate max-w-[140px]">
                                <h4 className="font-bold text-xs text-slate-800 truncate">{rev.fileName}</h4>
                                <p className="text-[9px] text-slate-400">Dikirim: {rev.uploadedAt}</p>
                              </div>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                              rev.status === 'Reviewed' 
                                ? 'bg-emerald-50 text-emerald-700' 
                                : 'bg-blue-50 text-blue-700'
                            }`}>
                              {rev.status === 'Reviewed' ? 'Selesai Dibahas' : 'Sedang Diperiksa'}
                            </span>
                          </div>

                          {rev.feedback ? (
                            <div className="pt-2 border-t border-slate-150 text-[11px] text-slate-600 leading-relaxed font-medium bg-white p-2.5 rounded-lg">
                              <span className="font-bold text-slate-800">Ulasan Coach {rev.mentor}: </span>
                              "{rev.feedback}"
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-400 italic">
                              Dokumen Anda sedang diproses oleh Coach Saraswati. Kami akan mengirim notifikasi saat ulasan selesai.
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. WEBINAR KELAS KARIR */}
          {activeTab === 'webinar' && (
            <div className="space-y-6 text-left">
              <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <span className="px-2.5 py-0.5 rounded-lg bg-orange-50 text-orange-700 text-[10px] font-bold">LIVE ONLINE MASTERCLASS</span>
                  <h2 className="text-lg font-bold text-slate-900">Webinar Pengembangan Karir Rutin</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tingkatkan pemahaman teknis dan non-teknis Anda langsung dari narasumber level tinggi perusahaan teknologi terkemuka. Webinar dilengkapi modul, rekam tayangan ulang, dan sertifikat partisipasi.
                  </p>
                </div>
                <div className="md:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 space-y-2">
                  <div className="flex justify-between"><span>🎤 Pembicara:</span> <span className="text-blue-600">Praktisi & HR Eksekutif</span></div>
                  <div className="flex justify-between"><span>🎟️ Akses Kelas:</span> <span>100% Gratis</span></div>
                  <div className="flex justify-between"><span>📜 Output:</span> <span>e-Sertifikat Nasional</span></div>
                </div>
              </div>

              {/* Webinar Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Webinar: Menembus Seleksi CV ATS-Friendly & LinkedIn Hacks',
                    date: '22 Juli 2026',
                    time: '13:00 - 15:30 WIB',
                    speaker: 'Vina A. Muliana (Senior HR Professional & Career Influencer)',
                    banner: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&h=300&q=80',
                  },
                  {
                    title: 'Workshop: Sukses Behavioral Interview Dengan Metode STAR',
                    date: '28 Juli 2026',
                    time: '10:00 - 12:30 WIB',
                    speaker: 'Budi Hartono, M.Psi (Head of Talent Acquisition Traveloka)',
                    banner: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&h=300&q=80',
                  }
                ].map((web, idx) => (
                  <div key={idx} className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                    <div className="h-44 bg-slate-100 relative">
                      <img src={web.banner} alt={web.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase">LIVE ZOOM</span>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                          <Calendar size={12} />
                          <span>{web.date} | {web.time}</span>
                        </div>
                        <h4 className="font-extrabold text-xs text-slate-900 leading-snug">{web.title}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold">👤 {web.speaker}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (userRole === 'guest') {
                            alert('Silakan login terlebih dahulu untuk mendaftar.');
                            setActiveView('login');
                          } else {
                            addNotification(`Pendaftaran Berhasil! Link webinar untuk kelas "${web.title.substring(0, 30)}..." dikirim ke email.`);
                          }
                        }}
                        className="w-full mt-4 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-bold py-2 rounded-lg transition"
                      >
                        Ikuti Webinar Gratis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CAMPUS HIRING */}
          {activeTab === 'hiring' && (
            <div className="space-y-6">
              <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">RECRUITMENT ON CAMPUS</span>
                  <h2 className="text-lg font-bold text-slate-900">Campus Hiring Eksklusif Universitas</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Kesempatan emas bagi mahasiswa tingkat akhir dan alumni baru untuk melakukan tes psikologi tertulis dan wawancara langsung oleh tim rekrutmen mitra korporasi resmi di lingkungan kampus.
                  </p>
                </div>
                <div className="md:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 space-y-2">
                  <div className="flex justify-between"><span>🏢 Lokasi:</span> <span>Aula Serbaguna / Lab FT</span></div>
                  <div className="flex justify-between"><span>📋 Sistem:</span> <span>Walk-in Test / Interview</span></div>
                  <div className="flex justify-between"><span>👤 Syarat:</span> <span>Alumni / Mahasiswa Akhir</span></div>
                </div>
              </div>

              {/* Campus Hiring Table/Cards */}
              <div className="bg-white rounded-[20px] shadow-xs border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-150 text-slate-400 font-bold text-[10px] uppercase grid grid-cols-12 gap-4">
                  <div className="col-span-4 text-slate-700">Perusahaan</div>
                  <div className="col-span-3 text-slate-700">Tanggal & Waktu</div>
                  <div className="col-span-3 text-slate-700">Tempat Seleksi</div>
                  <div className="col-span-2 text-right text-slate-700">Aksi</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {mockCampusHiring.map((h) => (
                    <div key={h.id} className="px-6 py-4.5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-xs font-medium text-slate-600 hover:bg-slate-50/50 transition">
                      <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                        <img src={h.logo} alt={h.companyName} className="w-9 h-9 rounded-lg object-cover bg-slate-100 border" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-bold text-slate-900">{h.companyName}</h4>
                          <span className={`px-2 py-0.2 rounded text-[8px] font-bold inline-block uppercase ${
                            h.status === 'Akan Datang' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {h.status}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-12 md:col-span-3 font-semibold text-slate-700">
                        🗓️ {h.date} <span className="block text-[10px] font-normal text-slate-400">{h.time}</span>
                      </div>

                      <div className="col-span-12 md:col-span-3 text-slate-500">
                        📍 {h.location}
                      </div>

                      <div className="col-span-12 md:col-span-2 text-right">
                        <button
                          disabled={h.status === 'Selesai'}
                          onClick={() => {
                            if (userRole === 'guest') {
                              alert('Silakan login terlebih dahulu untuk memesan tiket.');
                              setActiveView('login');
                            } else {
                              addNotification(`Pendaftaran Campus Hiring untuk ${h.companyName} terkonfirmasi! Silakan bawa print out tiket masuk.`);
                              alert(`Pendaftaran terkonfirmasi! Tiket berkode QR seleksi ${h.companyName} dikirim ke e-mail.`);
                            }
                          }}
                          className={`text-[11px] font-bold px-3.5 py-1.5 rounded-lg transition cursor-pointer w-full text-center ${
                            h.status === 'Selesai'
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {h.status === 'Selesai' ? 'Seleksi Selesai' : 'Pesan Tiket'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* BOOKING MODAL FOR COACHING */}
      {selectedCoach && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4.5 border border-slate-100 shadow-2xl relative text-left">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Form Boking Konsultasi Karir</h3>
              <button onClick={() => setSelectedCoach(null)} className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer">✕</button>
            </div>

            <div className="flex items-center gap-3.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <img src={selectedCoach.mentorAvatar} alt={selectedCoach.mentorName} className="w-10 h-10 rounded-full object-cover bg-slate-200" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-bold text-xs text-slate-800">{selectedCoach.mentorName}</h4>
                <p className="text-[10px] text-slate-500">{selectedCoach.mentorTitle}</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Pilih Waktu Konsultasi</label>
                <select
                  required
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition appearance-none cursor-pointer"
                >
                  <option value="">-- Silakan Pilih Jam --</option>
                  <option value="Senin, 13 Juli 2026 pukul 10:00 WIB">Senin, 13 Juli 2026 (10:00 - 10:45 WIB) - Online Zoom</option>
                  <option value="Selasa, 14 Juli 2026 pukul 14:00 WIB">Selasa, 14 Juli 2026 (14:00 - 14:45 WIB) - Ruang Konselor</option>
                  <option value="Rabu, 15 Juli 2026 pukul 11:00 WIB">Rabu, 15 Juli 2026 (11:00 - 11:45 WIB) - Online Zoom</option>
                  <option value="Kamis, 16 Juli 2026 pukul 15:00 WIB">Kamis, 16 Juli 2026 (15:00 - 15:45 WIB) - Ruang Konselor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Topik Konsultasi</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Uraikan singkat masalah yang ingin dibahas (contoh: Pembuatan CV ATS, Negosiasi gaji pertama, dll.)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedCoach(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-5 rounded-xl transition shadow-xs cursor-pointer"
                >
                  Kirim Booking Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
