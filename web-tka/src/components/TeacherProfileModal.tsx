'use client';

import React, { useState, useEffect } from 'react';
import { X, UserCheck, Save, CheckCircle2, Phone, Mail, BookOpen, ShieldCheck } from 'lucide-react';
import { User, Teacher } from '../types';
import { UserAvatar } from './UserAvatar';

interface TeacherProfileModalProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
  onSaveProfile: (updatedUser: User, updatedTeacher?: Teacher) => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onSaveProfile
}) => {
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [nip, setNip] = useState(currentUser.nip || '');
  const [phone, setPhone] = useState(currentUser.phone || '081269000100');
  const [subject, setSubject] = useState(currentUser.major || 'KEJURUAN TKJ');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setNip(currentUser.nip || '');
      setPhone(currentUser.phone || '081269000100');
      setSubject(currentUser.major || 'KEJURUAN TKJ');
      setSavedSuccess(false);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: User = {
      ...currentUser,
      name: name.trim(),
      email: email.trim(),
      nip: nip.trim(),
      phone: phone.trim(),
      major: subject.trim()
    };

    const updatedTeacher: Teacher = {
      id: currentUser.id.startsWith('tch-') ? currentUser.id : `tch-${currentUser.id}`,
      nip: nip.trim(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      phone: phone.trim(),
      avatar: '',
      status: 'active'
    };

    onSaveProfile(updatedUser, updatedTeacher);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Edit Profil Guru Pengajar
              </h3>
              <p className="text-xs text-slate-500">
                Perbarui biodata akun pengajar Anda di portal bimbingan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar Initials Preview */}
        <div className="flex flex-col items-center justify-center p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-center">
          <UserAvatar name={name || 'Guru'} role="guru" size="lg" showStatus />
          <div className="mt-2.5 font-bold text-slate-900 text-sm">
            {name || 'Nama Lengkap Guru'}
          </div>
          <div className="text-xs text-emerald-700 font-semibold mt-0.5">
            {email || 'guru002@smkn1bandardua.sch.id'}
          </div>
          <span className="text-[10px] text-slate-500 mt-1">
            (Ikon profil otomatis menggunakan inisial nama Anda)
          </span>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profil Guru berhasil diperbarui!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Lengkap & Gelar <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              placeholder="Contoh: Guru Inisial G-02, S.Pd"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                NIP / NUPTK
              </label>
              <input
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
                placeholder="198501012010011002"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nomor WhatsApp / HP
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                placeholder="081269000102"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Mata Pelajaran yang Diampu <span className="text-red-500">*</span>
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              required
            >
              <option value="KEJURUAN TKJ">KEJURUAN TKJ</option>
              <option value="KEJURUAN TBSM">KEJURUAN TBSM</option>
              <option value="KEJURUAN TKRO">KEJURUAN TKRO</option>
              <option value="KEJURUAN TP">KEJURUAN TP</option>
              <option value="KEJURUAN DPB">KEJURUAN DPB</option>
              <option value="MATEMATIKA">MATEMATIKA (Numerasi Terapan)</option>
              <option value="B. INDONESIA">B. INDONESIA (Literasi Membaca)</option>
              <option value="B. INGGRIS">B. INGGRIS (Vocational English)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Akun Email Guru
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              placeholder="guru002@smkn1bandardua.sch.id"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
