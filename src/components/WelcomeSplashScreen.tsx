'use client';

import React from 'react';
import { ArrowRight, Key, UserCheck, GraduationCap, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface WelcomeSplashScreenProps {
  onOpenAuth: (role?: UserRole) => void;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({ onOpenAuth }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-b from-[#0e5c33] via-[#094d29] to-[#04331a] text-white px-4 py-8 relative overflow-hidden select-none">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-yellow-400/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Spacer */}
      <div className="w-full max-w-5xl flex justify-between items-center opacity-80 text-xs">
        <span className="text-emerald-200/80 font-medium tracking-wide">
          Pemerintah Aceh — Dinas Pendidikan
        </span>
        <span className="text-emerald-200/80 font-medium">
          SMK Negeri 1 Bandar Dua
        </span>
      </div>

      {/* Center Main Presentation Block */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto my-auto z-10 animate-fadeIn space-y-6">
        {/* Dual Logos: Pancacita (Pemerintah Aceh) & SMKN 1 Bandar Dua */}
        <div className="flex items-center justify-center gap-4 drop-shadow-xl">
          <img
            src="/logo_prov.png"
            alt="Logo Pancacita Pemerintah Aceh"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain transition-transform hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="h-16 w-[1px] bg-emerald-400/40"></div>
          <img
            src="/logo_smk.png"
            alt="Logo SMK Negeri 1 Bandar Dua"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain transition-transform hover:scale-105"
          />
        </div>

        {/* Arabic Salam Calligraphy Text */}
        <div className="pt-2">
          <p className="arabic-text text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-wide drop-shadow-md leading-relaxed">
            السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </p>
        </div>

        {/* Subtitle & Main Title */}
        <div className="space-y-1.5 pt-1">
          <p className="text-sm sm:text-base text-emerald-100 font-normal tracking-wide">
            Selamat Datang di Aplikasi
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wider uppercase drop-shadow-lg">
            PERSIAPAN MENUJU TKA 2026 — SMK NEGERI 1 BANDAR DUA
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 font-medium pt-1 max-w-lg mx-auto">
            Program Bimbingan Belajar Les TKA Malam Hari (20:15 - 21:00 WIB) • 31 Guru Pengajar • 7 Kelas XII
          </p>
        </div>

        {/* Primary Yellow Pill Button (Exact Match) */}
        <div className="pt-4 flex flex-col items-center gap-4 w-full">
          <button
            onClick={() => onOpenAuth('siswa')}
            className="px-8 py-3 bg-[#f5be18] hover:bg-[#e2ad0c] active:scale-95 text-[#0d3f23] font-extrabold text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group min-w-[200px]"
          >
            <span>Masuk Aplikasi</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Quick Role Selection Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <button
              onClick={() => onOpenAuth('siswa')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs font-semibold"
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
              <span>Login Siswa</span>
            </button>

            <button
              onClick={() => onOpenAuth('guru')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs font-semibold"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Login Guru</span>
            </button>

            <button
              onClick={() => onOpenAuth('admin')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs font-semibold"
            >
              <Key className="w-3.5 h-3.5 text-yellow-300" />
              <span>Login Admin (PIN)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center text-[11px] text-emerald-200/70 border-t border-white/10 pt-4 gap-2 text-center sm:text-left">
        <div>
          © 2026 SMK Negeri 1 Bandar Dua — Cabang Dinas Pendidikan Wilayah Pidie & Pidie Jaya
        </div>
        <div className="flex items-center gap-3">
          <span>Kode Classroom: <strong>embrt4ws</strong></span>
          <span>•</span>
          <span>Les Malam: <strong>20:15 - 21:00 WIB</strong></span>
        </div>
      </div>
    </div>
  );
};
