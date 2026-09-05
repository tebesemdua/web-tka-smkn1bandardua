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
  LogIn
} from 'lucide-react';
import { User, UserRole, ActiveClass, Student, Teacher } from '../types';

interface HeroSectionProps {
  currentUser: User;
  students: Student[];
  teachers: Teacher[];
  activeClasses: ActiveClass[];
  onNavigate: (tab: string) => void;
  onSelectRoleLogin: (role: UserRole) => void;
  onLogout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentUser,
  students,
  teachers,
  activeClasses,
  onNavigate,
  onSelectRoleLogin,
  onLogout
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const CLASSROOM_CODE = 'embrt4ws';
  const CLASSROOM_URL = 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CLASSROOM_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

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
              Terintegrasi dengan <strong>31 Guru Pengajar</strong>, <strong>7 Kelas XII</strong>, 
              <strong>5 Konsentrasi Keahlian (TBSM, TKRO, TP, DPB, TKJ)</strong>, Absensi Siswa berbasis Excel, dan Google Classroom.
            </p>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center transform hover:scale-102 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-yellow-300">
                31
              </div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                Guru Pengajar TKA
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center transform hover:scale-102 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{ongoingClassesCount} Sesi</span>
              </div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                Kelas Sedang Berlangsung
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center transform hover:scale-102 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                7 Kelas
              </div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                Target Kelas XII (5 Jurusan)
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

      {/* 2. ROLE SELECTION LOGIN PORTAL (PILIH IDENTITAS PENGGUNA) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <LogIn className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Pilih Identitas Masuk Portal (Login Sesuai Peran)
                </h3>
                <p className="text-xs text-slate-500">
                  Silakan pilih identitas pengguna Anda untuk masuk ke sistem sesuai hak akses masing-masing
                </p>
              </div>
            </div>
          </div>

          {currentUser.role === 'guest' ? (
            <span className="text-[11px] font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-full self-start sm:self-auto border border-amber-300 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Status: <strong>Belum Login (Tamu)</strong></span>
            </span>
          ) : (
            <div className="flex items-center gap-2">
              {currentUser.role === 'admin' ? (
                <span className="text-[11px] font-bold px-3 py-1 bg-red-50 text-red-800 rounded-full border border-red-300 shadow-xs">
                  Peran Aktif: <strong>🛡️ Administrator (Akses Penuh)</strong>
                </span>
              ) : currentUser.role === 'guru' ? (
                <span className="text-[11px] font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-300 shadow-xs">
                  Peran Aktif: <strong>👨‍🏫 Guru Pengajar</strong>
                </span>
              ) : (
                <span className="text-[11px] font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-full border border-blue-300 shadow-xs">
                  Peran Aktif: <strong>🎓 Siswa Peserta</strong>
                </span>
              )}

              <button
                onClick={onLogout}
                className="text-[11px] font-bold px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                title="Keluar dari sesi akun ini"
              >
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1: Siswa */}
          <div
            onClick={() => onSelectRoleLogin('siswa')}
            className={`rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between group ${
              currentUser.role === 'siswa'
                ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                  Siswa
                </span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                🎓 Siswa Peserta Les
              </h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Akses modul materi Google Classroom, kerjakan simulasi CBT Pusmendik, dan lihat rekapan nilai kelas Anda.
              </p>

              <div className="space-y-1 text-[11px] text-slate-500 font-medium mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-600 font-bold">✓</span> Akun <code>@siswa.smk.belajar.id</code>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-600 font-bold">✓</span> Password default: <code>belajar123</code>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-2 group-hover:shadow"
            >
              <span>Masuk sebagai Siswa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Guru */}
          <div
            onClick={() => onSelectRoleLogin('guru')}
            className={`rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between group ${
              currentUser.role === 'guru'
                ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  31 Guru
                </span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                👨‍🏫 Guru Pengajar TKA
              </h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Input presensi siswa, catat jurnal mengajar les malam (20:15 WIB), dan kelola bahan ajar kejuruan.
              </p>

              <div className="space-y-1 text-[11px] text-slate-500 font-medium mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span> Akun <code>@guru.smk.belajar.id</code>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span> Password pribadi masing-masing
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-2 group-hover:shadow"
            >
              <span>Masuk sebagai Guru</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Admin (PIN) */}
          <div
            onClick={() => onSelectRoleLogin('admin')}
            className={`rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between group ${
              currentUser.role === 'admin'
                ? 'bg-red-50/70 border-red-500 ring-2 ring-red-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:border-red-400 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Key className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800">
                  PIN Khusus
                </span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-red-700 transition-colors">
                🛡️ Administrator (PIN)
              </h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Kelola master data, upload roster Excel 4 kolom, dan unduh seluruh rekapitulasi nilai serta absensi.
              </p>

              <div className="space-y-1 text-[11px] text-slate-500 font-medium mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-red-600 font-bold">✓</span> Login Cepat via PIN Rahasia
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-600 font-bold">✓</span> Tanpa perlu email & password
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-2 group-hover:shadow"
            >
              <span>Masuk via PIN Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Google Classroom Special Integration Card */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-7 text-slate-900 shadow-lg border border-amber-400 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-800 shadow-md flex items-center justify-center shrink-0">
              <GraduationCap className="w-8 h-8 text-emerald-800" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/10 rounded-full text-xs font-bold text-slate-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                Media Pembelajaran Interaktif Aktif
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                Google Classroom: Les TKA SMKN 1 Bandar Dua
              </h3>
              <p className="text-xs sm:text-sm text-slate-900/90 mt-1 max-w-xl">
                Akses video pembelajaran interaktif, materi soal kejuruan (TBSM, TKRO, TP, DPB, TKJ), 
                numerasi terapan, literasi membaca, dan penugasan mandiri 31 guru pengajar.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            {/* Class Code Box */}
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-amber-300 shadow-sm flex items-center justify-between gap-3 w-full sm:w-auto">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Kode Kelas
                </div>
                <div className="text-base font-black font-mono text-emerald-800 tracking-wider">
                  {CLASSROOM_CODE}
                </div>
              </div>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                title="Salin Kode Kelas"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Launch Classroom Button */}
            <a
              href={CLASSROOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
            >
              <span>Buka Google Classroom</span>
              <ExternalLink className="w-4 h-4 text-yellow-400" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Quick Menu Action Cards (Tampil Sesuai Hak Akses Login) */}
      {currentUser.role !== 'guest' && (
        <div className="animate-fadeIn">
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Menu Fitur Aktif — {currentUser.role === 'siswa' ? 'Siswa Peserta' : currentUser.role === 'guru' ? 'Guru Pengajar' : 'Administrator'}
            </h3>
            <p className="text-xs text-slate-500">
              {currentUser.role === 'siswa' 
                ? 'Akses modul materi Google Classroom dan kerjakan simulasi ujian CBT Pusmendik 2026'
                : 'Kelola aktivitas les malam, presensi siswa & guru, CBT simulasi, rekap nilai, serta pusat unduh data'}
            </p>
          </div>

          {/* Untuk Siswa: Hanya Media Interaktif & CBT Pusmendik SMK */}
          {currentUser.role === 'siswa' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => onNavigate('media')}
                className="card-hover-effect bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                    Media Interaktif (Google Classroom)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modul kejuruan, video materi, dan penugasan mandiri 31 guru
                  </p>
                </div>
              </div>

              <div
                onClick={() => onNavigate('simulasi')}
                className="card-hover-effect bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700">
                    CBT Pusmendik SMK 2026
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ujian simulasi Numerasi Terapan, Literasi Kejuruan & English
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Untuk Admin & Guru: Semua Fitur Lengkap */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div
                onClick={() => onNavigate('media')}
                className="card-hover-effect bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                  Media Interaktif
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Google Classroom</p>
              </div>

              <div
                onClick={() => onNavigate('simulasi')}
                className="card-hover-effect bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-purple-700">
                  CBT Pusmendik
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">TKA SMK 2026</p>
              </div>

              <div
                onClick={() => onNavigate('absensi-siswa')}
                className="card-hover-effect bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                  Absensi Siswa
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Upload 4 Kolom</p>
              </div>

              <div
                onClick={() => onNavigate('absensi-guru')}
                className="card-hover-effect bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                  Absensi 31 Guru
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Log Les Malam</p>
              </div>

              <div
                onClick={() => onNavigate('rekap-nilai')}
                className="card-hover-effect bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-rose-700">
                  Rekap Nilai
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Peringkat 7 Kelas</p>
              </div>

              <div
                onClick={() => onNavigate('download-hub')}
                className="card-hover-effect bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-cyan-700">
                  Download Hub
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Khusus Admin</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
