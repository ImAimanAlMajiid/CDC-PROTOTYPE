import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Award, Heart, Bookmark, Eye, BookmarkCheck, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Job } from '../types';

interface JobListingsProps {
  jobs: Job[];
  toggleBookmark: (id: string) => void;
  setActiveView: (view: any) => void;
  setSelectedJobId: (id: string) => void;
  searchFilters: { query: string; location: string; category: string };
  setSearchFilters: (filters: { query: string; location: string; category: string }) => void;
}

export default function JobListings({
  jobs,
  toggleBookmark,
  setActiveView,
  setSelectedJobId,
  searchFilters,
  setSearchFilters
}: JobListingsProps) {
  // Filters State
  const [query, setQuery] = useState(searchFilters.query);
  const [selectedLocation, setSelectedLocation] = useState(searchFilters.location);
  const [selectedCategory, setSelectedCategory] = useState(searchFilters.category);
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('');

  // Sync with prop updates (e.g. from Landing Page quick search)
  useEffect(() => {
    setQuery(searchFilters.query);
    setSelectedLocation(searchFilters.location);
    setSelectedCategory(searchFilters.category);
  }, [searchFilters]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedLocation, selectedCategory, selectedJobType, selectedExperience, selectedSalaryRange]);

  // Handle clear filters
  const handleClearFilters = () => {
    setQuery('');
    setSelectedLocation('');
    setSelectedCategory('');
    setSelectedJobType('');
    setSelectedExperience('');
    setSelectedSalaryRange('');
    setSearchFilters({ query: '', location: '', category: '' });
  };

  // Filtering Logic
  const filteredJobs = jobs.filter((job) => {
    // Search query match
    if (query) {
      const q = query.toLowerCase();
      const matchPos = job.position.toLowerCase().includes(q);
      const matchComp = job.companyName.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      if (!matchPos && !matchComp && !matchDesc) return false;
    }

    // Location match
    if (selectedLocation && !job.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }

    // Category match
    if (selectedCategory && job.category !== selectedCategory) {
      return false;
    }

    // Job Type match
    if (selectedJobType && job.jobType !== selectedJobType) {
      return false;
    }

    // Experience match
    if (selectedExperience && job.experience !== selectedExperience) {
      return false;
    }

    // Salary match simulation (Parsing numeric value)
    if (selectedSalaryRange) {
      const salaryStr = job.salary.replace(/[^0-9]/g, ''); // Extract digits
      // Approximate range logic
      if (selectedSalaryRange === 'under-5m') {
        // Find if salary starts small (e.g. 3,500,000 or 4,000,000)
        if (salaryStr.length > 0 && parseInt(salaryStr) > 7000000) return false;
      } else if (selectedSalaryRange === '5m-10m') {
        // e.g. PT Telkom is 3.5jt - 4.5jt, Shopee is 8jt - 11.5jt
        // We'll approximate based on the specific mock jobs
        if (job.salary.includes('12.000') || job.salary.includes('3.500')) return false;
      } else if (selectedSalaryRange === '10m-15m') {
        if (!job.salary.includes('10.000') && !job.salary.includes('12.000') && !job.salary.includes('9.500')) return false;
      } else if (selectedSalaryRange === 'above-15m') {
        if (!job.salary.includes('18.000')) return false;
      }
    }

    return true;
  });

  // Pagination Logic
  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page title header */}
        <div className="text-left space-y-1.5">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Eksplorasi Lowongan Kerja & Magang</h1>
          <p className="text-xs text-slate-500">Temukan kecocokan karier Anda dari perusahaan terkemuka di Indonesia yang bekerja sama dengan CDC.</p>
        </div>

        {/* TOP SEARCH BAR */}
        <div className="bg-white rounded-[20px] p-4.5 shadow-xs border border-slate-100 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari posisi, keahlian, atau nama perusahaan..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={handleClearFilters}
              className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition cursor-pointer"
            >
              Reset Filter
            </button>
            <div className="bg-blue-50 text-blue-700 font-bold text-xs px-4.5 py-3 rounded-xl flex items-center gap-1.5 border border-blue-100">
              <span>{filteredJobs.length}</span> Lowongan Ditemukan
            </div>
          </div>
        </div>

        {/* LAYOUT GRID: LEFT FILTERS (4/12) & RIGHT JOB LISTS (8/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          
          {/* FILTER ACCORDION PANEL */}
          <aside className="lg:col-span-4 bg-white p-6 rounded-[20px] border border-slate-100 shadow-xs h-fit space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-blue-600" />
                Filter Pencarian
              </h3>
            </div>

            {/* Location filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">📍 Lokasi Pekerjaan</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              >
                <option value="">Semua Lokasi</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bandung">Bandung</option>
                <option value="Tangerang">Tangerang</option>
                <option value="Remote">Remote (Kerja Jauh)</option>
              </select>
            </div>

            {/* Category filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">🗂️ Kategori Karir</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              >
                <option value="">Semua Kategori</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Design">Design / UI/UX</option>
                <option value="Marketing">Marketing / Komunikasi</option>
                <option value="Finance">Finance / Perbankan</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            {/* Job Type filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">💼 Jenis Pekerjaan</label>
              <div className="space-y-2 pt-1 text-xs font-medium">
                {['Full-time', 'Magang', 'Part-time', 'Kontrak'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedJobType(selectedJobType === type ? '' : type)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition ${
                      selectedJobType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{type}</span>
                    {selectedJobType === type && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">🎓 Pengalaman Minimal</label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              >
                <option value="">Semua Tingkatan</option>
                <option value="Fresh Graduate">Fresh Graduate</option>
                <option value="1-3 Tahun">Junior (1 - 3 Tahun)</option>
                <option value="3-5 Tahun">Mid-Level (3 - 5 Tahun)</option>
                <option value="Senior">Senior (5+ Tahun)</option>
              </select>
            </div>

            {/* Salary Range filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">💵 Kisaran Gaji Bulanan</label>
              <select
                value={selectedSalaryRange}
                onChange={(e) => setSelectedSalaryRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              >
                <option value="">Semua Kisaran Gaji</option>
                <option value="under-5m">Di bawah Rp 5.000.000</option>
                <option value="5m-10m">Rp 5.000.000 - Rp 10.000.000</option>
                <option value="10m-15m">Rp 10.000.000 - Rp 15.000.000</option>
                <option value="above-15m">Di atas Rp 15.000.000</option>
              </select>
            </div>
          </aside>

          {/* RIGHT JOB CARDS + PAGINATION */}
          <section className="lg:col-span-8 space-y-4">
            {paginatedJobs.length === 0 ? (
              <div className="bg-white p-12 rounded-[20px] border border-slate-100 text-center space-y-3">
                <p className="text-slate-400 text-sm">Tidak ada lowongan yang sesuai dengan filter pencarian Anda.</p>
                <button
                  onClick={handleClearFilters}
                  className="bg-blue-600 text-white text-xs font-bold py-2.5 px-5 rounded-xl hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              paginatedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-100 p-6 rounded-[20px] shadow-xs hover:shadow-md transition flex flex-col sm:flex-row justify-between gap-4 group relative overflow-hidden"
                >
                  {job.isApplied && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                      Sudah Dilamar ✓
                    </div>
                  )}

                  {/* Left core details */}
                  <div className="flex gap-4.5 items-start">
                    <img
                      src={job.logo}
                      alt={job.companyName}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold text-xs text-slate-500 leading-none">{job.companyName}</h4>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition mt-1 leading-tight">
                          {job.position}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-1.5 text-xs font-medium">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
                          job.jobType === 'Magang' ? 'bg-orange-50 text-orange-700' :
                          job.jobType === 'Full-time' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {job.jobType}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px]">
                          📍 {job.location}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          💰 {job.salary}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pr-6 pt-1">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skills.slice(0, 4).map((sk) => (
                          <span key={sk} className="text-[10px] font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side controls / Bookmark & apply */}
                  <div className="flex sm:flex-col justify-between items-end shrink-0 sm:min-w-[140px] pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                    <button
                      onClick={() => toggleBookmark(job.id)}
                      className="p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition cursor-pointer self-start sm:self-end"
                      title={job.isBookmarked ? 'Batal simpan' : 'Simpan Lowongan'}
                    >
                      {job.isBookmarked ? (
                        <Heart size={18} className="fill-red-500 text-red-500" />
                      ) : (
                        <Heart size={18} />
                      )}
                    </button>

                    <div className="space-y-2 text-right">
                      <span className="text-[10px] text-slate-400 font-medium block">
                        Batas Akhir: <strong className="text-red-500">{job.deadline}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setActiveView('lowongan-detail');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl transition shadow-xs cursor-pointer inline-block"
                      >
                        Detail & Lamar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* PAGINATION PANEL */}
            {totalPages > 1 && (
              <div className="pt-6 flex justify-center items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold disabled:opacity-50 cursor-pointer"
                >
                  Sebelumnya
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition cursor-pointer ${
                      currentPage === idx + 1
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold disabled:opacity-50 cursor-pointer"
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </section>

        </div>

      </div>
    </div>
  );
}
