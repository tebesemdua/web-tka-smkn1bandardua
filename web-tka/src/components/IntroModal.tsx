'use client';

import React from 'react';
import { ArrowRight, Sparkles, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-950/95 via-green-900/95 to-slate-950/95 backdrop-blur-md p-4 transition-all duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100/50 animate-fadeIn text-center">
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-950 px-6 pt-8 pb-10 text-white relative">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>
          
          {/* Logo SMK Negeri 1 Bandar Dua alongside Logo Pemerintah Aceh */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/logo_prov.png"
              alt="Logo Pemerintah Aceh"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="h-12 w-[1px] bg-white/30"></div>
            <img
              src="/logo_smk.png"
              alt="Logo SMK Negeri 1 Bandar Dua"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-xl transform hover:scale-105 transition-transform"
            />
          </div>

          <p className="arabic-text text-2xl md:text-3xl text-yellow-300 font-bold mb-2">
            اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </p>
          <p className="text-emerald-100 text-xs md:text-sm font-medium tracking-wide uppercase">
            Portal Bimbingan Belajar Les TKA Malam Hari (20:15 - 21:00 WIB)
          </p>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white mt-1 tracking-tight">
            PERSIAPAN MENUJU TKA 2026 — SMK NEGERI 1 BANDAR DUA
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 bg-yellow-400/20 border border-yellow-300/40 rounded-full text-yellow-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            31 Guru Pengajar • 7 Kelas XII • Soal Pusmendik SMK 2026
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 bg-slate-50">
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            Selamat datang di Portal Resmi Bimbingan Belajar dan Simulasi CBT Tes Kemampuan Akademik (TKA) 
            <strong> SMK Negeri 1 Bandar Dua</strong>. Terintegrasi dengan jadwal les malam hari, presensi siswa via upload Excel, dan Google Classroom.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
            <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Media Interaktif</h4>
                <p className="text-[11px] text-slate-500">Google Classroom & Modul Kejuruan</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Absensi 4 Kolom</h4>
                <p className="text-[11px] text-slate-500">Import Excel: NISN, Nama, Kelas, Jurusan</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Akun Portal Terpadu</h4>
                <p className="text-[11px] text-slate-500">31 Guru Pengajar & 160 Siswa Terdaftar</p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-green-950 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-auto text-sm md:text-base cursor-pointer"
          >
            <span>Masuk ke Portal TKA SMKN 1 Bandar Dua</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
