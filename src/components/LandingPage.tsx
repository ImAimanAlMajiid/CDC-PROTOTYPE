import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Calendar, Users, Building, GraduationCap, ArrowRight, Star, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Job, CareerEvent, Testimonial } from '../types';

interface LandingPageProps {
  jobs: Job[];
  events: CareerEvent[];
  testimonials: Testimonial[];
  setActiveView: (view: any) => void;
  setSelectedJobId: (id: string) => void;
  setSearchFilters: (filters: { query: string; location: string; category: string }) => void;
  registerForEvent: (id: string) => void;
  isRegisteredEvent: (id: string) => boolean;
}

export default function LandingPage({
  jobs,
  events,
  testimonials,
  setActiveView,
  setSelectedJobId,
  setSearchFilters,
  registerForEvent,
  isRegisteredEvent
}: LandingPageProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [localLocation, setLocalLocation] = useState('');
  const [localCategory, setLocalCategory] = useState('');

  // Handle Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters({
      query: localSearch,
      location: localLocation,
      category: localCategory
    });
    setActiveView('lowongan-list');
  };

  // Filter Magang
  const magangJobs = jobs.filter(job => job.jobType === 'Magang').slice(0, 3);

  // Get next 3 upcoming events
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="flex-1 bg-[#F8FAFC]">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Subtle Background Art */}
          <div className="absolute right-[-60px] bottom-[-60px] w-[380px] h-[380px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-10 left-1/3 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-40"></div>

          <div className="relative z-10 md:w-3/5 text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-[#2563EB] uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse"></span>
              Pusat Pengembangan Karier Mahasiswa & Alumni
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Raih Karier Impianmu <br />
              <span className="text-[#2563EB]">Bersama CDC Universitas</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Jelajahi ribuan lowongan kerja eksklusif, program magang bersertifikat, bimbingan karier personal, review CV kilat, dan campus hiring langsung dengan mitra industri terkemuka.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveView('lowongan-list')}
                className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-blue-200 cursor-pointer flex items-center gap-2 group"
              >
                Cari Lowongan Kerja
                <ArrowRight size={15} className="group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => setActiveView('program-cdc')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs px-6 py-3.5 rounded-xl transition cursor-pointer shadow-xs"
              >
                Layanan Program CDC
              </button>
            </div>
          </div>

          {/* Hero Visual Collage */}
          <div className="relative md:w-2/5 flex justify-center w-full z-10">
            <div className="relative w-full max-w-[320px] aspect-square">
              {/* Floating success metrics card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-lg text-left z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold">LULUS SELEKSI</div>
                    <div className="text-xs font-bold text-slate-800">GoTo • UI/UX Designer</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-lg text-left z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold">COACHING SUKSES</div>
                    <div className="text-xs font-bold text-slate-800">Sesi Coach Saraswati</div>
                  </div>
                </div>
              </motion.div>

              {/* Main abstract circular graphic simulating career path */}
              <div className="w-full h-full rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center p-6">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-50 to-indigo-50 border border-slate-100 p-1 shadow-inner relative flex items-center justify-center overflow-hidden">
                  {/* Graduation student silhouette avatar */}
                  <div className="text-center z-10 space-y-3">
                    <div className="w-20 h-20 rounded-2xl bg-[#2563EB] mx-auto flex items-center justify-center border border-blue-400/20 shadow-lg shadow-blue-200">
                      <GraduationCap size={40} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Ready to Career 🚀</div>
                      <div className="text-[9px] text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full inline-block font-semibold mt-1">Alumni 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTIC CARDS SECTION */}
      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Jumlah Lowongan', value: '1.240+', icon: <Briefcase className="text-blue-600" size={22} />, desc: 'Pekerjaan aktif' },
            { label: 'Perusahaan Mitra', value: '380+', icon: <Building className="text-indigo-600" size={22} />, desc: 'BUMN & Multinasional' },
            { label: 'Alumni Bekerja', value: '88.4%', icon: <GraduationCap className="text-emerald-600" size={22} />, desc: 'Terserap industri' },
            { label: 'Event Karier', value: '50+', icon: <Calendar className="text-amber-600" size={22} />, desc: 'Tahunan & Berkala' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 flex items-center gap-4 text-left hover:shadow-md transition">
              <div className="p-3 bg-slate-50 rounded-xl shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-800">{stat.label}</div>
                <div className="text-[10px] text-slate-400">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PENCARIAN LOWONGAN */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100">
          <div className="text-left mb-4">
            <h3 className="text-base font-bold text-slate-900">Temukan Peluang Anda</h3>
            <p className="text-xs text-slate-500">Filter cepat untuk mengarahkan Anda ke lowongan impian</p>
          </div>
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari posisi, kata kunci, atau perusahaan..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              />
            </div>

            <div className="md:col-span-3 relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition appearance-none cursor-pointer"
              >
                <option value="">Semua Lokasi</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bandung">Bandung</option>
                <option value="Tangerang">Tangerang</option>
                <option value="Remote">Remote (Kerja Jauh)</option>
              </select>
            </div>

            <div className="md:col-span-3 relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={localCategory}
                onChange={(e) => setLocalCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition appearance-none cursor-pointer"
              >
                <option value="">Semua Kategori</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Design">Desain UI/UX</option>
                <option value="Marketing">Pemasaran Digital</option>
                <option value="Finance">Keuangan & Bank</option>
                <option value="Human Resources">HR Development</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-md shadow-blue-100 cursor-pointer"
              >
                Cari
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. PROGRAM MAGANG (INTERNSHIP RECO) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Rekomendasi Program Magang</h2>
            <p className="text-xs text-slate-500 mt-1">Langkah awal terbaik untuk memulai karier bagi mahasiswa tingkat akhir</p>
          </div>
          <button
            onClick={() => {
              setSearchFilters({ query: '', location: '', category: '' });
              setActiveView('lowongan-list');
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition cursor-pointer"
          >
            Lihat Semua Lowongan <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {magangJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-100 p-5 rounded-[20px] shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={job.logo}
                    alt={job.companyName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-slate-500">{job.companyName}</h4>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition truncate max-w-[180px]">
                      {job.position}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-[10px] font-semibold">
                    {job.jobType}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-medium">
                    {job.location}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-semibold">
                    {job.category}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                  {job.description}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Uang Saku</span>
                  <span className="text-xs font-bold text-slate-900">Rp 3.5jt - 6jt / bln</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setActiveView('lowongan-detail');
                  }}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Detail Magang
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. EVENT KARIER SECTION */}
      <section id="event-section" className="py-12 bg-slate-100 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Event Karier Terdekat</h2>
              <p className="text-xs text-slate-500 mt-1">Jangan lewatkan bursa kerja eksklusif, webinar ahli, dan workshop teknis</p>
            </div>
            <button
              onClick={() => setActiveView('program-cdc')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition cursor-pointer"
            >
              Kalender Event <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((ev) => {
              const registered = isRegisteredEvent(ev.id);
              return (
                <div
                  key={ev.id}
                  className="bg-white rounded-[20px] overflow-hidden shadow-xs border border-slate-100 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Event Banner */}
                    <div className="h-40 bg-slate-200 relative">
                      <img
                        src={ev.banner}
                        alt={ev.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold shadow-sm uppercase tracking-wide">
                        {ev.type}
                      </span>
                    </div>

                    {/* Event Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Calendar size={14} className="text-slate-400" />
                        <span>{ev.date}</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                        {ev.title}
                      </h3>
                      {ev.speaker && (
                        <p className="text-xs text-slate-600 font-medium">
                          <span className="text-slate-400">Speaker: </span>
                          {ev.speaker}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="px-5 pb-5 pt-2 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium truncate max-w-[120px]">
                      📍 {ev.location}
                    </span>
                    <button
                      onClick={() => registerForEvent(ev.id)}
                      className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
                        registered
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      }`}
                    >
                      {registered ? 'Terdaftar ✓' : 'Daftar Event'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PROGRAM CDC (SERVICES) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Layanan Program CDC Utama</h2>
          <p className="text-xs text-slate-500 mt-2">
            Kami siap memandu setiap langkah persiapan karier Anda melalui mentoring terarah dan evaluasi portofolio profesional
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Career Coaching',
              desc: 'Sesi konsultasi karir 1-on-1 bersama psikolog dan mentor rekrutmen industri profesional.',
              color: 'bg-blue-500/10 text-blue-700',
              btn: 'Daftar Konsultasi'
            },
            {
              title: 'CV Review Kilat',
              desc: 'Upload CV Anda dan dapatkan analisis mendalam serta panduan ATS-friendly dalam 2x24 jam.',
              color: 'bg-indigo-500/10 text-indigo-700',
              btn: 'Unggah CV'
            },
            {
              title: 'Webinar Pengembangan',
              desc: 'Webinar eksklusif teratur membahas tren industri, gaji, wawancara, hingga pengisian LinkedIn.',
              color: 'bg-amber-500/10 text-amber-700',
              btn: 'Ikut Webinar'
            },
            {
              title: 'Campus Hiring Eksklusif',
              desc: 'Seleksi langsung di lingkungan kampus yang diselenggarakan oleh rekruter korporat nasional.',
              color: 'bg-emerald-500/10 text-emerald-700',
              btn: 'Lihat Jadwal'
            }
          ].map((srv, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${srv.color} mb-4`}>
                  Layanan CDC {i+1}
                </span>
                <h3 className="font-bold text-sm text-slate-950 mb-2">{srv.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">{srv.desc}</p>
              </div>
              <button
                onClick={() => setActiveView('program-cdc')}
                className="w-full bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer"
              >
                {srv.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONI ALUMNI SECTION */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Kisah Sukses Alumni Kami</h2>
            <p className="text-xs text-slate-400 mt-2">
              Dengar langsung bagaimana CDC membantu lulusan Universitas dalam meniti kesuksesan korporat perdana mereka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-800 border border-slate-700 p-6 rounded-[20px] shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Stars decoration */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-700">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover bg-slate-700 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-white">{t.name}</h4>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                    <p className="text-[10px] font-semibold text-blue-400 mt-0.5">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
