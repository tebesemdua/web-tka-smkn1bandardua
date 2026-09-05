'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  BookOpen, 
  Plus, 
  Search, 
  Calendar, 
  UserCheck, 
  Award, 
  FileText,
  AlertCircle,
  Edit3,
  Trash2,
  Save,
  X,
  UserCog,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { Teacher, TeacherAttendanceRecord, User } from '../types';
import { UserAvatar } from './UserAvatar';

interface AttendanceGuruSectionProps {
  teachers: Teacher[];
  teacherAttendanceRecords: TeacherAttendanceRecord[];
  currentUser: User;
  onRecordTeacherAttendance: (record: TeacherAttendanceRecord) => void;
  onAddTeacher?: (teacher: Teacher) => void;
  onEditTeacher?: (teacher: Teacher) => void;
  onDeleteTeacher?: (teacherId: string) => void;
  onOpenEditProfile?: () => void;
}

export const AttendanceGuruSection: React.FC<AttendanceGuruSectionProps> = ({
  teachers,
  teacherAttendanceRecords,
  currentUser,
  onRecordTeacherAttendance,
  onAddTeacher,
  onEditTeacher,
  onDeleteTeacher,
  onOpenEditProfile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'master-guru' | 'presensi-jurnal'>('master-guru');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    currentUser.role === 'guru' ? (teachers.find(t => t.email === currentUser.email)?.id || teachers[0]?.id || '') : teachers[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [checkInTime, setCheckInTime] = useState<string>('20:15 WIB');
  const [selectedClassId, setSelectedClassId] = useState('XII TKJ 1');
  const [room, setRoom] = useState('Lab Komputer TKJ');
  const [subject, setSubject] = useState('KEJURUAN TKJ');
  const [topic, setTopic] = useState('Pembahasan Soal Pusmendik TKA SMK 2026 & Pemecahan Masalah');
  const [status, setStatus] = useState<'hadir' | 'izin' | 'pengganti'>('hadir');
  const [notes, setNotes] = useState('Siswa sangat aktif dan seluruh materi tersampaikan sesuai target silabus malam hari.');
  const [showSuccessToast, setShowSuccessToast] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Admin Modals for Add/Edit/Delete Teacher
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deleteConfirmTeacher, setDeleteConfirmTeacher] = useState<Teacher | null>(null);

  // Form states for Add/Edit Teacher
  const [formNip, setFormNip] = useState('');
  const [formName, setFormName] = useState('');
  const [formSubject, setFormSubject] = useState('KEJURUAN TKJ');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('081269000100');
  const [formStatus, setFormStatus] = useState<'active' | 'in_class' | 'offline'>('active');

  const currentTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();

    const record: TeacherAttendanceRecord = {
      id: `tatt-${Date.now()}`,
      date: selectedDate,
      checkInTime,
      teacherId: currentTeacher?.id || 'tch-01',
      teacherName: currentTeacher?.name || 'GURU',
      subject,
      classId: selectedClassId,
      room,
      topic,
      status,
      notes,
      timestamp: Date.now()
    };

    onRecordTeacherAttendance(record);
    setShowSuccessToast('Absensi guru dan jurnal mengajar berhasil dicatat di sistem!');
    setTimeout(() => setShowSuccessToast(''), 3000);
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.nip.includes(searchQuery) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecords = teacherAttendanceRecords.filter(r => 
    r.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.classId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Add Teacher Modal
  const openAddTeacherModal = () => {
    setFormNip(`199${Math.floor(100000000000000 + Math.random() * 90000000000000)}`);
    setFormName('');
    setFormSubject('KEJURUAN TKJ');
    setFormEmail('');
    setFormPhone('081269000100');
    setFormStatus('active');
    setShowAddTeacherModal(true);
  };

  // Open Edit Teacher Modal
  const openEditTeacherModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormNip(teacher.nip);
    setFormName(teacher.name);
    setFormSubject(teacher.subject);
    setFormEmail(teacher.email);
    setFormPhone(teacher.phone);
    setFormStatus(teacher.status);
  };

  const handleNameInput = (val: string) => {
    setFormName(val);
    if (!editingTeacher) {
      const cleanSlug = val.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/^\.|\.$/g, '');
      setFormEmail(cleanSlug ? `${cleanSlug}@smkn1bandardua.sch.id` : '');
    }
  };

  // Save Add Teacher
  const handleSaveAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newTeacher: Teacher = {
      id: `GRU-${(teachers.length + 1).toString().padStart(3, '0')}`,
      nip: formNip.trim() || '198501012010011001',
      name: formName.trim(),
      email: formEmail.trim() || `${formName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@smkn1bandardua.sch.id`,
      subject: formSubject.trim(),
      phone: formPhone.trim() || '081269000100',
      avatar: '',
      status: formStatus
    };

    if (onAddTeacher) {
      onAddTeacher(newTeacher);
    }
    setShowAddTeacherModal(false);
    setShowSuccessToast(`Guru ${newTeacher.name} berhasil ditambahkan!`);
    setTimeout(() => setShowSuccessToast(''), 3000);
  };

  // Save Edit Teacher
  const handleSaveEditTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    const updated: Teacher = {
      ...editingTeacher,
      nip: formNip.trim(),
      name: formName.trim(),
      subject: formSubject.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      status: formStatus
    };

    if (onEditTeacher) {
      onEditTeacher(updated);
    }
    setEditingTeacher(null);
    setShowSuccessToast(`Data guru ${updated.name} berhasil diperbarui!`);
    setTimeout(() => setShowSuccessToast(''), 3000);
  };

  // Delete Teacher
  const handleConfirmDeleteTeacher = () => {
    if (deleteConfirmTeacher && onDeleteTeacher) {
      onDeleteTeacher(deleteConfirmTeacher.id);
      setShowSuccessToast(`Data guru ${deleteConfirmTeacher.name} telah dihapus.`);
      setDeleteConfirmTeacher(null);
      setTimeout(() => setShowSuccessToast(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Data Master 31 Guru Pengajar & Jurnal Mengajar Malam
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manajemen biodata 31 guru pengampu TKA SMK Negeri 1 Bandar Dua dan pencatatan presensi mengajar malam (20:15 WIB)
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Sub-tab Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveSubTab('master-guru')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSubTab === 'master-guru'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👨‍🏫 Master Guru ({teachers.length})
              </button>
              <button
                onClick={() => setActiveSubTab('presensi-jurnal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSubTab === 'presensi-jurnal'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📋 Form Presensi & Jurnal
              </button>
            </div>

            {/* Admin Add Teacher Button */}
            {currentUser.role === 'admin' && (
              <button
                onClick={openAddTeacherModal}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Guru</span>
              </button>
            )}

            {/* Teacher Self Edit Button */}
            {currentUser.role === 'guru' && onOpenEditProfile && (
              <button
                onClick={onOpenEditProfile}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <UserCog className="w-4 h-4" />
                <span>Edit Profil Saya</span>
              </button>
            )}
          </div>
        </div>

        {showSuccessToast && (
          <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{showSuccessToast}</span>
          </div>
        )}

        {/* Search Toolbar */}
        <div className="mt-4">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama guru, NIP, mapel, atau email..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: MASTER 31 GURU LENGKAP (ADMIN BISA TAMBAH, EDIT, HAPUS) */}
      {activeSubTab === 'master-guru' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Daftar Lengkap 31 Guru Pengajar SMKN 1 Bandar Dua ({filteredTeachers.length} Guru Ditampilkan)
              </h4>
              <p className="text-xs text-slate-500">
                {currentUser.role === 'admin'
                  ? '🛡️ Mode Admin: Tambah, edit biodata guru, atau hapus data pengampu bimbingan.'
                  : 'Guru pengampu bimbingan les malam TKA 2026 (TBSM, TKRO, TP, DPB, TKJ, Matematika, B. Indonesia, B. Inggris).'}
              </p>
            </div>

            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
              Total 31 Guru Pengajar
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5">No</th>
                  <th className="p-3.5">Profil Guru</th>
                  <th className="p-3.5">NIP / NUPTK & Belajar.id</th>
                  <th className="p-3.5">Mata Pelajaran Diampu</th>
                  <th className="p-3.5">No. WhatsApp / HP</th>
                  <th className="p-3.5">Status</th>
                  {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
                    <th className="p-3.5 text-center">Aksi Profil</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map((t, idx) => {
                  const isCurrentLoggedInGuru = currentUser.role === 'guru' && (currentUser.email === t.email || currentUser.id === t.id);
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={t.name} role="guru" size="sm" />
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                              <span>{t.name}</span>
                              {isCurrentLoggedInGuru && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-bold">
                                  Anda
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500">SMK Negeri 1 Bandar Dua</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-slate-800">{t.nip || '-'}</div>
                        <div className="text-[11px] text-emerald-700 font-semibold">{t.email}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                          {t.subject}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">
                        {t.phone || '081269000100'}
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-block px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          t.status === 'in_class'
                            ? 'bg-emerald-100 text-emerald-800'
                            : t.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {t.status === 'in_class' ? 'Sedang Mengajar' : 'Aktif'}
                        </span>
                      </td>
                      {(currentUser.role === 'admin' || isCurrentLoggedInGuru) && (
                        <td className="p-3.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                if (isCurrentLoggedInGuru && onOpenEditProfile) {
                                  onOpenEditProfile();
                                } else {
                                  openEditTeacherModal(t);
                                }
                              }}
                              className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg border border-amber-300 transition-colors cursor-pointer"
                              title="Edit Profil Guru"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {currentUser.role === 'admin' && (
                              <button
                                onClick={() => setDeleteConfirmTeacher(t)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-300 transition-colors cursor-pointer"
                                title="Hapus Guru"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PRESENSI & JURNAL MENGAJAR GURU */}
      {activeSubTab === 'presensi-jurnal' && (
        <div className="space-y-6">
          {/* Input Form for Teacher Attendance */}
          {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Plus className="w-4 h-4 text-emerald-700" />
                <span>Form Input Kehadiran & Jurnal Mengajar Guru Les Malam</span>
              </h4>

              <form onSubmit={handleSubmitAttendance} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pilih Guru Pengampu</label>
                    <select
                      value={selectedTeacherId}
                      onChange={(e) => {
                        setSelectedTeacherId(e.target.value);
                        const t = teachers.find(item => item.id === e.target.value);
                        if (t) setSubject(t.subject);
                      }}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                    >
                      {teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tanggal</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Jam Mengajar Les</label>
                    <input
                      type="text"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 font-mono"
                      placeholder="20:15 WIB"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ruang Kelas SMKN 1</label>
                    <select
                      value={selectedClassId}
                      onChange={(e) => {
                        setSelectedClassId(e.target.value);
                        if (e.target.value === 'XII TKJ 1' || e.target.value === 'XII TKJ 2') setRoom(`Lab Komputer TKJ (${e.target.value})`);
                        else if (e.target.value === 'XII TBSM 1' || e.target.value === 'XII TBSM 2') setRoom(`Bengkel Otomotif TBSM (${e.target.value})`);
                        else if (e.target.value === 'XII TKR') setRoom(`Bengkel Otomotif TKR (${e.target.value})`);
                        else if (e.target.value === 'XII TP') setRoom(`Bengkel Pemesinan TP (${e.target.value})`);
                        else if (e.target.value === 'XII DPB') setRoom(`Studio Gambar DPB (${e.target.value})`);
                      }}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                    >
                      <option value="XII TKJ 1">XII TKJ 1 (Teknik Komputer Jaringan)</option>
                      <option value="XII TKJ 2">XII TKJ 2 (Teknik Komputer Jaringan)</option>
                      <option value="XII TBSM 1">XII TBSM 1 (Sepeda Motor)</option>
                      <option value="XII TBSM 2">XII TBSM 2 (Sepeda Motor)</option>
                      <option value="XII TKR">XII TKR (Kendaraan Ringan)</option>
                      <option value="XII TP">XII TP (Teknik Pemesinan)</option>
                      <option value="XII DPB">XII DPB (Desain Pemodelan Bangunan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ruang Pembelajaran</label>
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Materi / Topik Silabus</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                      placeholder="Topik pembelajaran malam ini..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Status Kehadiran</label>
                    <select
                      value={status}
                      onChange={(e: any) => setStatus(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                    >
                      <option value="hadir">Hadir Mengajar</option>
                      <option value="izin">Izin / Tugas Dinas</option>
                      <option value="pengganti">Guru Pengganti</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jurnal / Catatan Pelaksanaan Mengajar</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                    placeholder="Catatan keaktifan siswa, kendala, atau capaian..."
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simpan Absensi Guru & Aktifkan Sesi</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table of History */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <h4 className="text-base font-bold text-slate-900">
              Riwayat Presensi & Jurnal Mengajar Guru Terdata ({filteredRecords.length} Catatan)
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3.5">Tanggal & Jam</th>
                    <th className="p-3.5">Nama Guru & Mapel</th>
                    <th className="p-3.5">Kelas & Ruang</th>
                    <th className="p-3.5">Materi / Topik</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Jurnal Mengajar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{r.date}</div>
                        <div className="text-[11px] text-emerald-700 font-semibold">{r.checkInTime}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{r.teacherName}</div>
                        <div className="text-[11px] text-slate-500">{r.subject}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">{r.classId}</span>
                        <div className="text-[11px] text-slate-500 mt-0.5">{r.room}</div>
                      </td>
                      <td className="p-3.5 font-medium text-slate-700 max-w-xs">
                        {r.topic}
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          r.status === 'hadir' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.status === 'hadir' ? 'Hadir Mengajar' : r.status === 'pengganti' ? 'Guru Pengganti' : 'Izin'}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px] italic max-w-xs">
                        {r.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ADMIN TAMBAH GURU */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 text-red-800 rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Tambah Guru Baru (Admin)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Masukkan data guru pengampu TKA SMKN 1 Bandar Dua
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddTeacherModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddTeacher} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Lengkap & Gelar Guru <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => handleNameInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  placeholder="Contoh: RIZKI PRATAMA, S.T"
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
                    value={formNip}
                    onChange={(e) => setFormNip(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    placeholder="198501012010011001"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    No. WhatsApp / HP
                  </label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="081269000100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mata Pelajaran Diampu <span className="text-red-500">*</span>
                </label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
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
                  Email Akun Belajar.id
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="nama.guru@smkn1bandardua.sch.id"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Guru Baru</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADMIN EDIT GURU */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Edit Profil Guru (Admin)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Perbarui profil data guru {editingTeacher.name}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingTeacher(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditTeacher} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Lengkap Guru
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
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
                    value={formNip}
                    onChange={(e) => setFormNip(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    No. WhatsApp / HP
                  </label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mata Pelajaran Diampu
                </label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="KEJURUAN TKJ">KEJURUAN TKJ</option>
                  <option value="KEJURUAN TBSM">KEJURUAN TBSM</option>
                  <option value="KEJURUAN TKRO">KEJURUAN TKRO</option>
                  <option value="KEJURUAN TP">KEJURUAN TP</option>
                  <option value="KEJURUAN DPB">KEJURUAN DPB</option>
                  <option value="MATEMATIKA">MATEMATIKA</option>
                  <option value="B. INDONESIA">B. INDONESIA</option>
                  <option value="B. INGGRIS">B. INGGRIS</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Belajar.id
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADMIN KONFIRMASI HAPUS GURU */}
      {deleteConfirmTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Hapus Data Guru Pengajar Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Apakah Anda yakin ingin menghapus data <strong>{deleteConfirmTeacher.name}</strong> ({deleteConfirmTeacher.subject}) dari master data pengajar?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmTeacher(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Batalkan
              </button>
              <button
                onClick={handleConfirmDeleteTeacher}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Ya, Hapus Guru
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
