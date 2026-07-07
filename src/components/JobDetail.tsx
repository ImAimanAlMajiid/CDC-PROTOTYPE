import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, DollarSign, Briefcase, FileText, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import { Job } from '../types';

interface JobDetailProps {
  job: Job | undefined;
  userRole: 'guest' | 'mahasiswa' | 'admin';
  onBack: () => void;
  onApply: (jobId: string, coverLetter: string) => void;
  setActiveView: (view: any) => void;
}

export default function JobDetail({
  job,
  userRole,
  onBack,
  onApply,
  setActiveView
}: JobDetailProps) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) {
    return (
      <div className="flex-grow p-12 text-center bg-slate-50 space-y-4">
        <p className="text-slate-500 font-medium text-sm">Lowongan kerja tidak ditemukan.</p>
        <button onClick={onBack} className="text-blue-600 hover:underline text-xs font-bold">Kembali ke Daftar</button>
      </div>
    );
  }

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onApply(job.id, coverLetter);
      setIsSubmitting(false);
      setShowApplyModal(false);
    }, 1000);
  };

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-bold transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Lowongan
        </button>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: WORK DESCRIPTION, REQS, BENEFITS, SKILLS (70%) */}
          <article className="lg:col-span-8 bg-white rounded-[20px] p-6 sm:p-8 shadow-xs border border-slate-100 space-y-8">
            
            {/* Header section inside left column (mobile layout optimization) */}
            <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-4 items-center">
                <img
                  src={job.logo}
                  alt={job.companyName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                />
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{job.category}</span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">{job.position}</h1>
                  <p className="text-xs font-medium text-slate-500 mt-1">{job.companyName}</p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold shrink-0 self-start sm:self-auto uppercase tracking-wide">
                {job.jobType}
              </span>
            </div>

            {/* Deskripsi Pekerjaan */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider border-l-4 border-blue-600 pl-3">Deskripsi Pekerjaan</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {job.description}
              </p>
            </div>

            {/* Persyaratan */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider border-l-4 border-blue-600 pl-3">Persyaratan Jabatan</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-600 font-medium">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefit */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider border-l-4 border-blue-600 pl-3">Keuntungan & Benefit</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2 items-center text-xs text-slate-600 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skill yang Dibutuhkan */}
            <div className="space-y-3 pb-2">
              <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider border-l-4 border-blue-600 pl-3">Keahlian Utama yang Dibutuhkan</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono font-bold text-slate-700 bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-xl shadow-inner"
                  >
                    🛠️ {skill}
                  </span>
                ))}
              </div>
            </div>

          </article>

          {/* RIGHT COLUMN: QUICK INFO & ACTION (30%) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Quick Specs Card */}
            <div className="bg-white rounded-[20px] p-6 shadow-xs border border-slate-100 space-y-5">
              <div className="text-center pb-4 border-b border-slate-50">
                <img
                  src={job.logo}
                  alt={job.companyName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover mx-auto bg-slate-50 border border-slate-100 p-1 mb-3"
                />
                <h4 className="font-bold text-sm text-slate-900">{job.companyName}</h4>
                <p className="text-[10px] text-slate-400 font-medium">Mitra Resmi Terverifikasi CDC</p>
              </div>

              <div className="space-y-4 text-xs font-medium text-slate-600">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">📍 Lokasi</span>
                  <span className="text-slate-800 font-bold">{job.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">📅 Batas Akhir</span>
                  <span className="text-red-500 font-bold">{job.deadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">💵 Estimasi Gaji</span>
                  <span className="text-slate-800 font-bold text-right">{job.salary}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">💼 Level Pengalaman</span>
                  <span className="text-slate-800 font-bold">{job.experience}</span>
                </div>
              </div>

              {/* Major CTA Button */}
              {job.isApplied ? (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs text-center py-3.5 rounded-xl font-bold">
                  ✓ Anda Sudah Melamar Lowongan Ini
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (userRole === 'guest') {
                      alert('Untuk melamar lowongan, silakan masuk/daftar akun terlebih dahulu.');
                      setActiveView('login');
                    } else {
                      setShowApplyModal(true);
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-md shadow-blue-100 text-center block cursor-pointer"
                >
                  Lamar Sekarang
                </button>
              )}
            </div>

            {/* Safety Tips widget */}
            <div className="bg-slate-900 text-slate-300 p-5 rounded-[20px] space-y-3 text-xs">
              <h4 className="font-bold text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-400" />
                Jaminan Perlindungan CDC
              </h4>
              <p className="leading-relaxed text-slate-400 text-[10px]">
                Seluruh lowongan kerja yang tayang di portal ini telah melalui pemeriksaan administrasi resmi oleh dewan CDC Universitas. Mitra dijamin tidak memungut biaya apapun (palsu/penipuan) selama tahapan rekrutmen.
              </p>
            </div>

          </aside>

        </div>

      </div>

      {/* DETAILED COVER LETTER / CV SUBMISSION MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4.5 text-left border border-slate-100 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Formulir Pengajuan Lamaran Pekerjaan</h3>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Pekerjaan yang Dilamar</p>
              <h4 className="font-bold text-sm text-slate-800">{job.position}</h4>
              <p className="text-xs text-slate-500">{job.companyName}</p>
            </div>

            <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide flex items-center gap-1.5">
                <FileText size={14} className="text-blue-600" />
                CV Utama Anda (Akan Terkirim)
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">CV_Andi_Wijaya_ATS2026.pdf</p>
                  <p className="text-[10px] text-slate-400">PDF Document • 2.4 MB • Diupload 3 hari yang lalu</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">ATS Terverifikasi</span>
              </div>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Surat Pengantar / Cover Letter (Opsional)</label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan perkenalan singkat mengenai keunggulan Anda dan mengapa Anda bersemangat untuk melamar posisi ini..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition shadow-md shadow-blue-100 flex items-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    'Kirim Lamaran Pekerjaan 📨'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
