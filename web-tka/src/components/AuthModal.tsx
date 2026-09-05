'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, ShieldAlert, KeyRound, Sparkles, CheckCircle2, Key, ShieldCheck, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '../types';
import { DEFAULT_USERS, INITIAL_TEACHERS, INITIAL_STUDENTS } from '../lib/storage';

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
        setEmail('guru002@smkn1bandardua.sch.id');
        setPassword('gurupass002');
      } else {
        setEmail('siswa001@smkn1bandardua.sch.id');
        setPassword('siswapass123');
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
      setEmail('guru002@smkn1bandardua.sch.id');
      setPassword('gurupass002');
    } else {
      setEmail('siswa001@smkn1bandardua.sch.id');
      setPassword('siswapass123');
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

    // 2. SISWA LOGIN VIA DUMMY/INITIAL USERNAME/EMAIL
    if (selectedRole === 'siswa') {
      if (!email) {
        setErrorMsg('Harap masukkan Username / Email Siswa Anda');
        return;
      }

      // Check against initial students list or generate initial
      const formattedInput = email.toLowerCase().trim();
      const matchedStudent = INITIAL_STUDENTS.find(s => 
        s.email.toLowerCase() === formattedInput || 
        s.id.toLowerCase() === formattedInput || 
        s.nisn === formattedInput ||
        s.email.split('@')[0] === formattedInput
      );

      const studentName = matchedStudent ? matchedStudent.name : `Siswa Inisial ${formattedInput.split('@')[0].toUpperCase()}`;
      const studentClass = matchedStudent ? matchedStudent.classId : 'XII TBSM 1';
      const studentMajor = matchedStudent ? matchedStudent.major : 'TBSM';
      const studentNisn = matchedStudent ? matchedStudent.nisn : '0067400001';

      const siswaUser: User = {
        id: matchedStudent ? matchedStudent.id : `SIS-${Date.now().toString().slice(-3)}`,
        name: studentName,
        email: email.includes('@') ? email : `${email}@smkn1bandardua.sch.id`,
        role: 'siswa',
        school: 'SMK Negeri 1 Bandar Dua',
        classId: studentClass,
        major: studentMajor,
        nisn: studentNisn,
        avatar: ''
      };

      setSuccessMsg('Login Siswa Berhasil!');
      setTimeout(() => {
        onLoginSuccess(siswaUser);
        onClose();
      }, 500);
      return;
    }

    // 3. GURU LOGIN VIA DUMMY/INITIAL USERNAME/EMAIL
    if (selectedRole === 'guru') {
      if (!email) {
        setErrorMsg('Harap masukkan Username / Email Guru Pengajar Anda');
        return;
      }

      const formattedInput = email.toLowerCase().trim();
      const matchedTeacher = INITIAL_TEACHERS.find(t => 
        t.email.toLowerCase() === formattedInput || 
        t.id.toLowerCase() === formattedInput || 
        t.email.split('@')[0] === formattedInput
      );

      const teacherName = matchedTeacher ? matchedTeacher.name : `Guru Inisial ${formattedInput.split('@')[0].toUpperCase()}`;
      const teacherSubject = matchedTeacher ? matchedTeacher.subject : 'KEJURUAN TKJ';
      const teacherNip = matchedTeacher ? matchedTeacher.nip : '198501012010011002';

      const guruUser: User = {
        id: matchedTeacher ? matchedTeacher.id : `GRU-${Date.now().toString().slice(-3)}`,
        name: teacherName,
        email: email.includes('@') ? email : `${email}@smkn1bandardua.sch.id`,
        role: 'guru',
        school: 'SMK Negeri 1 Bandar Dua',
        nip: teacherNip,
        major: teacherSubject,
        avatar: ''
      };

      setSuccessMsg('Login Guru Pengajar Berhasil!');
      setTimeout(() => {
        onLoginSuccess(guruUser);
        onClose();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img
              src="/logo_prov.png"
              alt="Logo Pemerintah Aceh"
              className="w-8 h-8 object-contain"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <div className="h-6 w-[1px] bg-slate-300"></div>
            <img
              src="/logo_smk.png"
              alt="Logo SMK Negeri 1 Bandar Dua"
              className="w-9 h-9 object-contain"
            />
          </div>

          <span className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            SMK NEGERI 1 BANDAR DUA
          </span>
          <h2 className="text-lg font-extrabold text-slate-900 mt-1">
            Masuk Portal Les TKA 2026
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih peran pengguna untuk mengakses sistem bimbingan belajar
          </p>
        </div>

        {/* Role Selector Tabs (Siswa, Guru, Admin) */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => handleRoleChange('siswa')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedRole === 'siswa'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎓 Siswa
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('guru')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedRole === 'guru'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            👨‍🏫 Guru
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedRole === 'admin'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🛡️ Admin PIN
          </button>
        </div>

        {/* Role-Specific Instruction Box */}
        <div className="mb-4">
          {selectedRole === 'admin' ? (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-red-900 leading-snug">
                <strong>Otoritas Administrator:</strong> Akses khusus manajemen 160 siswa, 31 guru, dan 133 sesi roster mengajar malam. Masukkan <strong>PIN Rahasia 8-Digit</strong> untuk verifikasi.
              </div>
            </div>
          ) : selectedRole === 'siswa' ? (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-blue-900 leading-snug">
                <strong>Akun Peserta Siswa:</strong> Siswa login menggunakan Akun/Username Inisial (Contoh: <code>siswa001@smkn1bandardua.sch.id</code> atau ID <code>SIS-001</code>).
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-[11px] text-emerald-900 leading-snug">
                <strong>Akun Guru Pengajar:</strong> Guru login menggunakan Akun/Username Inisial (Contoh: <code>guru002@smkn1bandardua.sch.id</code> atau ID <code>GRU-002</code>).
              </div>
            </div>
          )}
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3 mb-4 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {selectedRole === 'admin' ? (
            /* Admin Only: PIN INPUT */
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-red-600" />
                <span>Masukkan PIN Rahasia Administrator</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="Masukkan 8-Digit PIN..."
                  maxLength={12}
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold tracking-widest text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:ring-2 focus:ring-red-500 focus:bg-white focus:outline-none font-mono"
                  autoFocus
                />
                <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          ) : (
            /* Siswa & Guru Form */
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {selectedRole === 'siswa' ? 'Username / Email Siswa' : 'Username / Email Guru Pengajar'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      selectedRole === 'siswa' 
                        ? 'siswa001@smkn1bandardua.sch.id / SIS-001' 
                        : 'guru002@smkn1bandardua.sch.id / GRU-002'
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                    required
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password Anda..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-mono"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedRole === 'admin'
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                : selectedRole === 'guru'
                ? 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>
              {selectedRole === 'admin'
                ? 'Verifikasi PIN Administrator'
                : selectedRole === 'guru'
                ? 'Masuk sebagai Guru Pengajar'
                : 'Masuk sebagai Siswa Peserta'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
