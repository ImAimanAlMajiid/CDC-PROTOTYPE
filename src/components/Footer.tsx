import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: any) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveView('landing')}>
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-blue-900/30">
                C
              </div>
              <div>
                <span className="font-bold text-base text-white tracking-tight block">CDC Portal</span>
                <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-semibold -mt-1">Universitas Karier</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Career Development Center (CDC) Universitas berkomitmen menjembatani mahasiswa dan alumni menuju gerbang kesuksesan karier profesional dengan mitra industri terpercaya.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white transition flex items-center justify-center text-slate-400">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 hover:text-white transition flex items-center justify-center text-slate-400">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-400 hover:text-white transition flex items-center justify-center text-slate-400">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 hover:text-white transition flex items-center justify-center text-slate-400">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tautan Pintas</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('landing')} className="hover:text-white hover:underline transition cursor-pointer">
                  Beranda Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('lowongan-list')} className="hover:text-white hover:underline transition cursor-pointer">
                  Cari Lowongan Kerja & Magang
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('program-cdc')} className="hover:text-white hover:underline transition cursor-pointer">
                  Layanan Career Coaching
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('program-cdc')} className="hover:text-white hover:underline transition cursor-pointer">
                  Layanan Review CV Gratis
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('landing'); setTimeout(() => {
                  const el = document.getElementById('event-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100); }} className="hover:text-white hover:underline transition cursor-pointer">
                  Event Kampus & Webinar
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Hubungi Kami</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Gedung Pusat Layanan Mahasiswa, Lantai 2, Jl. Pendidikan No. 45, Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-500 shrink-0" />
                <span>+62 (21) 7890-1234</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-500 shrink-0" />
                <span>cdc@universitas.ac.id</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter or Partner Quote */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Mitra Perusahaan</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Apakah perusahaan Anda sedang mencari talenta muda terbaik dari kampus kami? Segera berkolaborasi dengan CDC.
            </p>
            <button 
              onClick={() => {
                setActiveView('login');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2.5 px-4 rounded-xl transition cursor-pointer shadow-md shadow-blue-900/30"
            >
              Daftar Sebagai Mitra Industri
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Career Development Center Universitas. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="mt-2 sm:mt-0">Dirancang oleh Senior UI/UX Front-End Team</p>
        </div>
      </div>
    </footer>
  );
}
