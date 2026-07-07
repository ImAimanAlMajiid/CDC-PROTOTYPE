import React, { useState } from 'react';
import { 
  User, Mail, Phone, GraduationCap, Award, FileText, Globe, 
  Plus, Edit3, Trash2, CheckCircle2, History, Percent, Clock
} from 'lucide-react';
import { UserProfile, Job } from '../types';

interface StudentProfileProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  jobs: Job[];
  addNotification: (msg: string) => void;
  setActiveView: (view: any) => void;
}

export default function StudentProfile({
  profile,
  setProfile,
  jobs,
  addNotification,
  setActiveView
}: StudentProfileProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  
  // Temporary Form States for Profile Edit
  const [tempName, setTempName] = useState(profile.name);
  const [tempPhone, setTempPhone] = useState(profile.phone);
  const [tempEducation, setTempEducation] = useState(profile.education);
  const [tempGPA, setTempGPA] = useState(profile.gpa);
  
  // Skill Add state
  const [newSkill, setNewSkill] = useState('');
  
  // Portfolio form states
  const [portName, setPortName] = useState('');
  const [portUrl, setPortUrl] = useState('');

  // Experience form states
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expDuration, setExpDuration] = useState('');

  // Handle Save Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: tempName,
      phone: tempPhone,
      education: tempEducation,
      gpa: tempGPA
    });
    addNotification('Informasi profil akademik berhasil diperbarui.');
    setIsEditModalOpen(false);
  };

  // Handle Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      addNotification(`Keahlian "${newSkill}" ditambahkan.`);
      setNewSkill('');
    }
  };

  // Handle Delete Skill
  const handleDeleteSkill = (skillToDelete: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skillToDelete)
    });
  };

  // Handle Add Experience
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (expRole && expCompany) {
      setProfile({
        ...profile,
        experience: [
          ...profile.experience,
          {
            role: expRole,
            company: expCompany,
            duration: expDuration || 'Sekarang',
            description: 'Melaksanakan tugas koordinasi teknis serta pengembangan target profesional divisi terkait.'
          }
        ]
      });
      addNotification(`Pengalaman kerja di ${expCompany} ditambahkan.`);
      setExpRole('');
      setExpCompany('');
      setExpDuration('');
    }
  };

  // Handle Add Portfolio
  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (portName && portUrl) {
      setProfile({
        ...profile,
        portfolioUrl: portUrl
      });
      addNotification(`Tautan portofolio "${portName}" berhasil diperbarui.`);
      setIsPortfolioModalOpen(false);
      setPortName('');
      setPortUrl('');
    }
  };

  // Filter list of jobs applied by this student
  const appliedList = jobs.filter(j => j.isApplied);

  return (
    <div className="flex-grow bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* UPPER MAIN HEADER CARD */}
        <div className="bg-white rounded-[20px] p-6 shadow-xs border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Student Avatar */}
            <div className="w-20 h-20 rounded-full bg-blue-100 border-4 border-blue-50 text-blue-700 flex items-center justify-center font-bold text-3xl shadow-md shrink-0 select-none">
              {profile.name.charAt(0)}
            </div>
            
            <div className="text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h2>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">Mahasiswa Aktif</span>
              </div>
              <p className="text-xs text-slate-500 font-mono">NIM: {profile.nim} • Jurusan: {profile.education}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                <span className="flex items-center gap-1">✉️ {profile.email}</span>
                <span className="flex items-center gap-1">📞 {profile.phone}</span>
                <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-[10px]">GPA: {profile.gpa}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setTempName(profile.name);
              setTempPhone(profile.phone);
              setTempEducation(profile.education);
              setTempGPA(profile.gpa);
              setIsEditModalOpen(true);
            }}
            className="w-full md:w-auto border border-blue-600 hover:bg-blue-50 text-blue-700 font-bold text-xs py-2.5 px-5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Edit3 size={14} />
            Edit Data Profil
          </button>
        </div>

        {/* TWO COLUMN GRID: DATA RESUME (8/12) vs PORTFOLIO/CV HISTORY (4/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: RESUME & EXPERIENCES (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* EDUCATION & INFO */}
            <div className="bg-white rounded-[20px] p-5.5 shadow-xs border border-slate-100 space-y-4">
              <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap size={16} className="text-blue-600" />
                Pendidikan Akademik
              </h3>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Universitas Negeri Komputasi</h4>
                  <p className="text-xs text-slate-500">S1 - {profile.education}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Tahun Masuk: 2023 • Angkatan Terdaftar</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] block text-slate-400 uppercase font-bold">Indeks Prestasi</span>
                  <span className="text-base font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 mt-1 inline-block">
                    {profile.gpa} / 4.0
                  </span>
                </div>
              </div>
            </div>

            {/* EXPERIENCE (with Add Form) */}
            <div className="bg-white rounded-[20px] p-5.5 shadow-xs border border-slate-100 space-y-5">
              <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <Award size={16} className="text-blue-600" />
                Pengalaman Organisasi & Kerja
              </h3>

              {/* Add experience mini-form inline */}
              <form onSubmit={handleAddExperience} className="p-3.5 bg-slate-50 rounded-xl border border-slate-150 grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Jabatan/Peran</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Web Designer"
                    value={expRole}
                    onChange={(e) => setExpRole(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Instansi/Perusahaan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Himpunan Mahasiswa"
                    value={expCompany}
                    onChange={(e) => setExpCompany(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="space-y-1 flex-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase block">Durasi (Tahun)</label>
                    <input
                      type="text"
                      placeholder="2024 - 2025"
                      value={expDuration}
                      onChange={(e) => setExpDuration(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs font-bold transition h-[34px] flex items-center justify-center cursor-pointer shrink-0"
                    title="Tambah pengalaman"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </form>

              {/* Experience list */}
              <div className="space-y-3 pt-2">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="p-3.5 border border-slate-100 rounded-xl relative group">
                    <button
                      onClick={() => {
                        setProfile({
                          ...profile,
                          experience: profile.experience.filter((_, i) => i !== idx)
                        });
                        addNotification('Pengalaman berhasil dihapus.');
                      }}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="space-y-1">
                      <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{exp.duration}</span>
                      <h4 className="font-bold text-xs text-slate-900 pt-1">{exp.role}</h4>
                      <p className="text-xs font-semibold text-slate-500">{exp.company}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed pt-1 font-medium">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SKILLS TAGS SECTION (with inline add) */}
            <div className="bg-white rounded-[20px] p-5.5 shadow-xs border border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider">🛠️ Daftar Keahlian (Skills)</h3>
                <span className="text-[10px] font-mono font-bold text-slate-400">{profile.skills.length} Terdaftar</span>
              </div>

              {/* Add Tag inline form */}
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik keahlian (contoh: React, UI Design, SQL, dll.)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:outline-hidden focus:border-blue-600 focus:bg-white transition flex-1"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4.5 rounded-xl transition cursor-pointer shrink-0"
                >
                  Tambah Keahlian
                </button>
              </form>

              {/* Render tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl group"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill)}
                      className="text-slate-400 hover:text-red-500 transition-all font-bold cursor-pointer text-[10px] ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: COMPLEMENTS / CV / PORTFOLIO & HISTORIES (4/12) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* PORTFOLIO & CV DOCUMENT STATUS */}
            <div className="bg-white rounded-[20px] p-5 shadow-xs border border-slate-100 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Berkas Pendukung</h3>

              <div className="space-y-3 text-xs font-medium">
                {/* CV Block */}
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />
                    <div className="truncate">
                      <p className="font-bold text-slate-800">CV_Andi_Wijaya_ATS2026.pdf</p>
                      <p className="text-[10px] text-slate-400">PDF • 2.4MB • Aktif</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveView('program-cdc')}
                    className="w-full bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold py-1.5 rounded-lg border text-center transition"
                  >
                    Unggah CV Baru
                  </button>
                </div>

                {/* Portfolio Link block */}
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-indigo-600" />
                    <div className="truncate">
                      <p className="font-bold text-slate-800">Tautan Portofolio Karya</p>
                      <p className="text-[10px] text-slate-400 truncate text-indigo-600 underline">
                        {profile.portfolioUrl || 'Belum ditambahkan'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPortfolioModalOpen(true)}
                    className="w-full bg-white hover:bg-indigo-50 text-indigo-700 text-[10px] font-bold py-1.5 rounded-lg border text-center transition border-indigo-150"
                  >
                    Perbarui Tautan
                  </button>
                </div>
              </div>
            </div>

            {/* CERTIFICATE LIST */}
            <div className="bg-white rounded-[20px] p-5 shadow-xs border border-slate-100 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Sertifikasi & Penghargaan</h3>

              <div className="space-y-3 text-xs font-semibold">
                {profile.certificates.map((cert, i) => (
                  <div key={i} className="flex gap-2.5 items-start p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <Award size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div className="leading-tight">
                      <p className="text-slate-800">{cert}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">Diverifikasi Akademik</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* APPLICATIONS HISTORY PANEL */}
            <div className="bg-white rounded-[20px] p-5 shadow-xs border border-slate-100 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <History size={16} className="text-blue-600" />
                Histori Lamaran Kerja
              </h3>

              <div className="space-y-2 text-xs">
                {appliedList.length === 0 ? (
                  <p className="text-slate-400 text-xs py-4 text-center">Belum ada lamaran terkirim.</p>
                ) : (
                  appliedList.map((j) => (
                    <div key={j.id} className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center border border-slate-100">
                      <div className="truncate">
                        <p className="font-bold text-slate-800 truncate">{j.position}</p>
                        <p className="text-[9px] text-slate-400 truncate">{j.companyName}</p>
                      </div>
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full shrink-0">
                        {j.appliedStatus}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </aside>

        </div>

      </div>

      {/* EDIT PROFILE DATA MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-100 shadow-2xl relative text-left">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Perbarui Data Diri Akademik</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nomor Telepon</label>
                <input
                  type="text"
                  required
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Program Studi</label>
                <input
                  type="text"
                  required
                  value={tempEducation}
                  onChange={(e) => setTempEducation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">IPK Terakhir (GPA)</label>
                <input
                  type="text"
                  required
                  value={tempGPA}
                  onChange={(e) => setTempGPA(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-5 rounded-xl transition shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PORTFOLIO UPDATED MODAL */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-100 shadow-2xl relative text-left">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Perbarui Tautan Portofolio</h3>
              <button onClick={() => setIsPortfolioModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddPortfolio} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nama Portofolio / Judul</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Portofolio Figma UI/UX 2026"
                  value={portName}
                  onChange={(e) => setPortName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">URL / Link Web Portofolio</label>
                <input
                  type="url"
                  required
                  placeholder="https://behance.net/andi_wijaya"
                  value={portUrl}
                  onChange={(e) => setPortUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-5 rounded-xl transition shadow-xs"
                >
                  Simpan Tautan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
