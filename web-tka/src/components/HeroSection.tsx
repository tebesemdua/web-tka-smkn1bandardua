'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  BookOpen, 
  FileSpreadsheet, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Key,
  UserCheck,
  LogIn,
  UserCog
} from 'lucide-react';
import { User, UserRole, ActiveClass, Student, Teacher } from '../types';
import { UserAvatar } from './UserAvatar';

interface HeroSectionProps {
  currentUser: User;
  students: Student[];
  teachers: Teacher[];
  activeClasses: ActiveClass[];
  onNavigate: (tab: string) => void;
  onSelectRoleLogin: (role: UserRole) => void;
  onLogout: () => void;
  onOpenEditProfile?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentUser,
  students,
  teachers,
  activeClasses,
  onNavigate,
  onSelectRoleLogin,
  onLogout,
  onOpenEditProfile
}) => {
  const CLASSROOM_URL = 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si';

  const ongoingClassesCount = activeClasses.filter(c => c.status === 'ongoing').length;

  return (
    <div className="space-y-6">
      {/* 1. Hero Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-900 rounded-3xl text-white shadow-xl border border-emerald-700/60">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative px-6 py-8 sm:px-10 sm:py-10">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <p className="arabic-text text-2xl sm:text-3xl md:text-4xl text-yellow-300 font-bold mb-3 drop-shadow">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-800/80 border border-emerald-600 rounded-full text-xs font-semibold text-emerald-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Program Intensif Les TKA Malam Hari (20:15 - 21:00 WIB) • Periode 07 - 28 Sept 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
              Portal Les TKA 2026 — <span className="text-yellow-400">SMK Negeri 1 Bandar Dua</span>
            </h2>
            <p className="mt-3 text-emerald-100 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              Sistem Bimbingan Belajar Tes Kemampuan Akademik (TKA) Jenjang SMK berbasis Pusmendik Kemendikbudristek. 
              Terintegrasi dengan <strong>{teachers.length} Guru Pengajar</strong>, <strong>7 Kelas XII ({students.length} Siswa Terdaftar)</strong>, 
              <strong>5 Konsentrasi Keahlian (TBSM, TKRO, TP, DPB, TKJ)</strong>, Manajemen Data Siswa/Guru, dan Google Classroom.
            </p>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center transform hover:scale-102 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-yellow-300 font-mono">
                {teachers.length}
              </div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                Guru Pengajar TKA
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center transform hover:scale-102 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center gap-1.5 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{ongoingClassesCount} Sesi</span>
              </div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                Kelas Sedang Berlangsung
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center transform hover:scale-102 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {students.length} Siswa
              </div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                7 Kelas XII (5 Kejuruan)
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center transform hover:scale-102 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                20:15 WIB
              </div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                Jadwal Les Malam Hari
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. USER PROFILE STATUS CARD (IKON INISIAL & NAMA / EMAIL TEPAT DI BAWAHNYA) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <LogIn className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Status Identitas Pengguna Aktif
                </h3>
                <p className="text-xs text-slate-500">
                  Sesi login Anda saat ini dalam portal bimbingan SMKN 1 Bandar Dua
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser.role === 'guru' && onOpenEditProfile && (
              <button
                onClick={onOpenEditProfile}
                className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-300 flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <UserCog className="w-4 h-4" />
                <span>Edit Profil Guru</span>
              </button>
            )}

            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold border border-red-200 flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span>Logout / Ganti Akun</span>
            </button>
          </div>
        </div>

        {/* User Card: Initials Avatar on top, and REAL NAME + EMAIL directly below it */}
        <div className="p-5 bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {/* Center Initials Avatar */}
            <div className="flex flex-col items-center">
              <UserAvatar 
                name={currentUser.name} 
                role={currentUser.role} 
                size="lg" 
                showStatus 
              />
              {/* TEPAT DI BAWAH IKON PROFIL TERTULIS NAMA ASLI / EMAIL */}
              <div className="mt-2 text-center">
                <div className="text-sm font-extrabold text-slate-900">
                  {currentUser.name}
                </div>
                <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                  {currentUser.email}
                </div>
              </div>
            </div>

            <div className="sm:border-l sm:border-slate-200 sm:pl-4 space-y-1 text-xs">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  currentUser.role === 'admin'
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : currentUser.role === 'guru'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}>
                  {currentUser.role === 'admin' ? '🛡️ Administrator Portal (Akses Penuh)' : currentUser.role === 'guru' ? '👨‍🏫 Guru Pengajar TKA' : '🎓 Siswa Peserta Les'}
                </span>
              </div>
              <p className="text-slate-600 text-xs">
                {currentUser.role === 'admin'
                  ? 'Akses khusus: Mengelola master siswa & guru, jadwal mengajar roster malam, serta monitoring progres real.'
                  : currentUser.role === 'guru'
                  ? `Pengampu: ${currentUser.major || 'Mata Pelajaran TKA'} • Anda dapat mengedit profil diri dan mengisi jurnal mengajar.`
                  : `Kelas: ${currentUser.classId || 'XII SMKN 1 Bandar Dua'} • Akses materi interaktif dan simulasi CBT Pusmendik.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {currentUser.role === 'siswa' ? (
              <button
                onClick={() => onNavigate('simulasi')}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Award className="w-4 h-4 text-yellow-300" />
                <span>Mulai CBT Pusmendik</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('absensi-siswa')}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-yellow-300" />
                <span>Kelola Data Siswa</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Role Switcher Cards */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Pilihan Peran Pengguna Cepat
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => onSelectRoleLogin('siswa')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                currentUser.role === 'siswa'
                  ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                🎓
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Siswa Peserta</div>
                <div className="text-[11px] text-slate-500">Media Interaktif & CBT</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectRoleLogin('guru')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                currentUser.role === 'guru'
                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-emerald-400'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                👨‍🏫
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Guru Pengajar</div>
                <div className="text-[11px] text-slate-500">Akses Penuh & Edit Profil</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectRoleLogin('admin')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                currentUser.role === 'admin'
                  ? 'bg-red-50/80 border-red-500 ring-2 ring-red-500/20'
                  : 'bg-white border-slate-200 hover:border-red-400'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-bold">
                🛡️
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Administrator</div>
                <div className="text-[11px] text-slate-500">PIN Rahasia: Kelola Siswa, Guru & Roster</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
