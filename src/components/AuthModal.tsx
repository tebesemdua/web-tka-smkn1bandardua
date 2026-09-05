'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, ShieldAlert, KeyRound, Sparkles, CheckCircle2, Key, ShieldCheck } from 'lucide-react';
import { User, UserRole } from '../types';
import { DEFAULT_USERS } from '../lib/storage';

interface AuthModalProps {
  isOpen: boolean;
  initialRole?: UserRole;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  currentUser: User;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialRole = 'siswa',
  onClose,
  onLoginSuccess,
  currentUser
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(initialRole);
      setErrorMsg('');
      setSuccessMsg('');
      setAdminPin('');
      if (initialRole === 'admin') {
        setEmail('');
        setPassword('');
      } else if (initialRole === 'guru') {
        setEmail('faisal481@guru.smk.belajar.id');
        setPassword('');
      } else {
        setEmail('muhammad.farhan@siswa.smk.belajar.id');
        setPassword('belajar123');
      }
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMsg('');
    setSuccessMsg('');
    setAdminPin('');
    if (role === 'admin') {
      setEmail('');
      setPassword('');
    } else if (role === 'guru') {
      setEmail('faisal481@guru.smk.belajar.id');
      setPassword('');
    } else {
      setEmail('muhammad.farhan@siswa.smk.belajar.id');
      setPassword('belajar123'); // Default uniform password for students!
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. ADMIN LOGIN VIA SECRET PIN ONLY
    if (selectedRole === 'admin') {
      if (!adminPin) {
        setErrorMsg('Harap masukkan PIN Administrator');
        return;
      }
      
      // Secret Admin PIN check
      if (adminPin.trim() === '10111806') {
        const adminUser: User = DEFAULT_USERS.admin;
        setSuccessMsg('PIN Terverifikasi! Berhasil Masuk sebagai Administrator.');
        setTimeout(() => {
          onLoginSuccess(adminUser);
          onClose();
        }, 500);
      } else {
        setErrorMsg('PIN Administrator tidak valid. Silakan periksa kembali PIN Anda.');
      }
      return;
    }

    // 2. SISWA LOGIN VIA @siswa.smk.belajar.id + DEFAULT PASSWORD
    if (selectedRole === 'siswa') {
      if (!email) {
        setErrorMsg('Harap masukkan alamat email @siswa.smk.belajar.id Anda');
        return;
      }

      if (password !== 'belajar123' && password !== 'siswa123' && password !== '123456') {
        setErrorMsg('Password default siswa adalah: belajar123');
        return;
      }

      const cleanName = email.split('@')[0].replace(/\./g, ' ').toUpperCase();
      const siswaUser: User = {
        id: `siswa-${Date.now()}`,
        name: cleanName,
        email: email.includes('@') ? email : `${email}@siswa.smk.belajar.id`,
        role: 'siswa',
        school: 'SMK Negeri 1 Bandar Dua',
        classId: 'XII TKJ 1',
        major: 'TKJ',
        nisn: '0067489211',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
      };

      setSuccessMsg('Login Siswa Berhasil!');
      setTimeout(() => {
        onLoginSuccess(siswaUser);
        onClose();
      }, 500);
      return;
    }

    // 3. GURU LOGIN VIA @guru.smk.belajar.id + CUSTOM PASSWORD
    if (selectedRole === 'guru') {
      if (!email) {
        setErrorMsg('Harap masukkan alamat email @guru.smk.belajar.id Anda');
        return;
      }
      if (!password || password.length < 3) {
        setErrorMsg('Password guru minimal 3 karakter (Password kustom)');
        return;
      }

      const cleanName = email.split('@')[0].replace(/\./g, ' ').toUpperCase();
      const guruUser: User = {
        id: `guru-${Date.now()}`,
        name: cleanName,
        email: email.includes('@') ? email : `${email}@guru.smk.belajar.id`,
        role: 'guru',
        school: 'SMK Negeri 1 Bandar Dua',
        nip: '198403152008012004',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      };

      setSuccessMsg('Login Guru Pengajar Berhasil!');
      setTimeout(() => {
        onLoginSuccess(guruUser);
        onClose();
      }, 500);
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 relative">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-emerald-200 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src="/logo_smk.png"
            alt="Logo SMKN 1 Bandar Dua"
            className="w-16 h-16 mx-auto mb-2 object-contain drop-shadow-md"
          />
          <h2 className="text-xl font-bold tracking-tight">Masuk Portal TKA</h2>
          <p className="text-xs text-emerald-200 mt-0.5">
            SMK Negeri 1 Bandar Dua • Sistem Autentikasi Pengguna
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 p-2 bg-slate-100 gap-1.5 border-b border-slate-200">
          <button
            type="button"
            onClick={() => handleRoleChange('siswa')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'siswa'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            🎓 Siswa
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('guru')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'guru'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            👨‍🏫 Guru
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'admin'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            🛡️ Admin (PIN)
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Rule Note for Admin */}
          {selectedRole === 'admin' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-900">
              <Key className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Autentikasi PIN Khusus Admin:</span>
                <p className="text-[11px] text-red-700 mt-0.5">
                  Akses administrator diamankan dengan kode PIN numerik khusus tanpa memerlukan email dan password.
                </p>
              </div>
            </div>
          )}

          {/* Rule Note for Students */}
          {selectedRole === 'siswa' && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2 text-xs text-blue-900">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Ketentuan Login Siswa:</span>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  Siswa login menggunakan akun <strong className="underline">@siswa.smk.belajar.id</strong> dengan password seragam:{' '}
                  <code className="bg-blue-200/70 px-1.5 py-0.5 rounded font-mono font-bold text-blue-950">belajar123</code>
                </p>
              </div>
            </div>
          )}

          {/* Rule Note for Teachers */}
          {selectedRole === 'guru' && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2 text-xs text-emerald-900">
              <KeyRound className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Ketentuan Akun Guru:</span>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Guru login dengan akun <strong className="underline">@guru.smk.belajar.id</strong> dan menggunakan password pribadi masing-masing.
                </p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-semibold animate-fadeIn">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* ADMIN LOGIN: PIN ONLY */}
            {selectedRole === 'admin' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Masukkan PIN Administrator
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Key className="w-4 h-4 text-red-500" />
                    </div>
                    <input
                      type="password"
                      inputMode="numeric"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      placeholder="Masukkan PIN Rahasia Admin..."
                      autoFocus
                      required
                      maxLength={12}
                      className="w-full pl-10 pr-4 py-3 text-base bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-mono tracking-widest text-slate-900 text-center font-bold"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 text-center">
                    Gunakan PIN rahasia pengelola TKA SMKN 1 Bandar Dua
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verifikasi PIN & Masuk Admin</span>
                </button>
              </div>
            ) : (
              /* GURU & SISWA LOGIN: EMAIL + PASSWORD */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alamat Email Akun Belajar.id
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        selectedRole === 'siswa'
                          ? 'nama@siswa.smk.belajar.id'
                          : 'guru@guru.smk.belajar.id'
                      }
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Password
                    </label>
                    {selectedRole === 'siswa' && (
                      <span className="text-[11px] text-blue-600 font-medium">Default: belajar123</span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        selectedRole === 'siswa'
                          ? 'belajar123'
                          : 'Masukkan password pribadi guru...'
                      }
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-sm font-bold text-white shadow-md transition-all cursor-pointer ${
                    selectedRole === 'guru'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Masuk sebagai {selectedRole === 'guru' ? 'Guru' : 'Siswa'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
