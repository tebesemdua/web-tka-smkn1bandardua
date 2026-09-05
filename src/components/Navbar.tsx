'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  UserCheck, 
  Briefcase, 
  FileSpreadsheet, 
  Download, 
  BarChart3, 
  Award, 
  LogIn, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onReopenIntro: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onReopenIntro,
  onLogout,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState({
    day: '',
    date: '',
    time: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];

      const day = days[now.getDay()];
      const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      setCurrentDateTime({
        day,
        date,
        time: `${hours}:${minutes}:${seconds} WIB`
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home, roles: ['admin', 'guru', 'siswa', 'guest'] },
    { id: 'media', label: 'Media Interaktif', icon: BookOpen, roles: ['admin', 'guru', 'siswa'], badge: 'Classroom' },
    { id: 'simulasi', label: 'CBT Pusmendik SMK', icon: Award, roles: ['admin', 'guru', 'siswa'], badge: 'TKA 2026' },
    { id: 'absensi-siswa', label: 'Absensi Siswa', icon: UserCheck, roles: ['admin', 'guru'] },
    { id: 'absensi-guru', label: 'Absensi 31 Guru', icon: Briefcase, roles: ['admin', 'guru'] },
    { id: 'rekap-nilai', label: 'Rekap Nilai', icon: FileSpreadsheet, roles: ['admin', 'guru'] },
    { id: 'download-hub', label: 'Download Hub', icon: Download, roles: ['admin', 'guru'], badge: 'Admin' },
    { id: 'grafik-analytics', label: 'Grafik & Status', icon: BarChart3, roles: ['admin', 'guru'] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(currentUser.role));

  const roleColors: Record<UserRole, { bg: string; text: string; label: string }> = {
    admin: { bg: 'bg-red-500/15 border-red-500/30 text-red-700', text: 'text-red-700', label: 'Administrator' },
    guru: { bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700', text: 'text-emerald-700', label: 'Guru Pengajar' },
    siswa: { bg: 'bg-blue-500/15 border-blue-500/30 text-blue-700', text: 'text-blue-700', label: 'Siswa Peserta' },
    guest: { bg: 'bg-slate-100 border-slate-300 text-slate-700', text: 'text-slate-700', label: 'Belum Login' }
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onReopenIntro}
                title="Buka Sambutan Portal"
                className="group relative flex items-center shrink-0 cursor-pointer focus:outline-none"
              >
                <img
                  src="/logo_smk.png"
                  alt="Logo SMK Negeri 1 Bandar Dua"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform group-hover:scale-105 drop-shadow-sm"
                />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    SMK Negeri 1 Bandar Dua
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Les Malam (20:15 WIB)</span>
                  </span>
                </div>
                <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  PERSIAPAN MENUJU TKA 2026 — SMK NEGERI 1 BANDAR DUA
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block font-medium">
                  Portal Bimbingan Belajar Les TKA Malam Hari • 31 Guru Pengajar • 7 Kelas XII
                </p>
              </div>
            </div>

            {/* Right: Clock & User Profile Bar */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Indonesian Realtime Clock */}
              <div className="text-right border-r border-slate-200 pr-5">
                <div className="text-xs font-semibold text-slate-500">
                  {currentDateTime.day}, {currentDateTime.date}
                </div>
                <div className="text-sm font-extrabold text-emerald-700 font-mono tracking-tight">
                  {currentDateTime.time}
                </div>
              </div>

              {/* User badge and actions */}
              {currentUser.role === 'guest' ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-700">
                      Tamu (Belum Login)
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Silakan Pilih Peran Akun
                    </div>
                  </div>

                  <button
                    onClick={onOpenAuth}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ring-2 ring-emerald-500/20"
                    title="Masuk ke Portal (Admin / Guru / Siswa)"
                  >
                    <LogIn className="w-4 h-4 text-yellow-300" />
                    <span>Masuk Portal</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800 truncate max-w-[170px]">
                      {currentUser.name}
                    </div>
                    <div className="flex items-center justify-end gap-1.5 mt-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleColors[currentUser.role].bg}`}>
                        {roleColors[currentUser.role].label}
                      </span>
                    </div>
                  </div>

                  <div className="relative group">
                    <img
                      src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full border-2 border-emerald-600 object-cover shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>

                  <button
                    onClick={onLogout}
                    title="Keluar / Logout Akun"
                    className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-red-200 flex items-center gap-1.5 text-xs font-bold shadow-xs"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Header Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {currentUser.role === 'guest' ? (
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 text-xs font-bold bg-emerald-700 text-white rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Masuk</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 text-[11px] font-bold rounded-lg border ${roleColors[currentUser.role].bg}`}
                  >
                    {roleColors[currentUser.role].label}
                  </span>
                  <button
                    onClick={onLogout}
                    title="Keluar"
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar (Green Strip) */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 px-4 sm:px-6 lg:px-8 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1 scrollbar-none">
            <div className="flex items-center gap-1 min-w-max">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-yellow-400 text-green-950 shadow-md font-bold'
                        : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-green-950' : 'text-emerald-300'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-green-950 text-yellow-300' : 'bg-emerald-950 text-yellow-300 border border-yellow-300/40'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 shadow-xl animate-fadeIn">
            {currentUser.role !== 'guest' ? (
              <div className="p-3 bg-slate-50 rounded-xl mb-3 flex items-center justify-between border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{currentUser.name}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">{currentUser.email}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleColors[currentUser.role].bg}`}>
                  {roleColors[currentUser.role].label}
                </span>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50/70 rounded-xl mb-3 flex items-center justify-between border border-emerald-200">
                <div>
                  <div className="text-xs font-bold text-emerald-950">Status: Belum Login</div>
                  <div className="text-[11px] text-emerald-700">Silakan pilih peran untuk masuk</div>
                </div>
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Masuk Portal
                </button>
              </div>
            )}

            <div className="space-y-1">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-emerald-600" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200">
              {currentUser.role === 'guest' ? (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs font-bold text-center bg-emerald-700 text-white rounded-xl shadow-xs"
                >
                  Masuk Portal (Pilih Identitas)
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs font-bold text-center bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar dari Akun</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
