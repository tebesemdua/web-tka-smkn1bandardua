'use client';

import React, { useState } from 'react';
import { 
  Radio, 
  Clock, 
  MapPin, 
  BookOpen, 
  Users, 
  ExternalLink, 
  Plus, 
  Edit3,
  Trash2,
  CheckCircle2, 
  Sparkles,
  UserCheck,
  Calendar,
  Layers,
  Filter,
  Save,
  X,
  ShieldCheck
} from 'lucide-react';
import { ActiveClass, Teacher, User } from '../types';
import { UserAvatar } from './UserAvatar';

interface ActiveClassesMonitorProps {
  activeClasses: ActiveClass[];
  teachers: Teacher[];
  currentUser: User;
  onAddActiveClass?: (newClass: ActiveClass) => void;
  onEditActiveClass?: (updatedClass: ActiveClass) => void;
  onDeleteActiveClass?: (classId: string) => void;
  onNavigateToClassroom?: () => void;
}

export const ActiveClassesMonitor: React.FC<ActiveClassesMonitorProps> = ({
  activeClasses,
  teachers,
  currentUser,
  onAddActiveClass,
  onEditActiveClass,
  onDeleteActiveClass,
  onNavigateToClassroom
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ActiveClass | null>(null);
  const [deleteConfirmSchedule, setDeleteConfirmSchedule] = useState<ActiveClass | null>(null);

  const [selectedMajorFilter, setSelectedMajorFilter] = useState<string>('all');
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || '');
  const [className, setClassName] = useState('XII TKJ 1');
  const [gradeLevel, setGradeLevel] = useState('XII');
  const [major, setMajor] = useState('TKJ');
  const [subject, setSubject] = useState('KEJURUAN TKJ');
  const [room, setRoom] = useState('Lab Komputer TKJ (Ruang Les XII TKJ 1)');
  const [startTime, setStartTime] = useState('20:15 WIB');
  const [endTime, setEndTime] = useState('21:00 WIB');
  const [status, setStatus] = useState<'ongoing' | 'upcoming' | 'completed'>('ongoing');
  const [topic, setTopic] = useState('Pembahasan Soal TKA Pusmendik & Pendalaman Materi Kejuruan');
  const [totalStudents, setTotalStudents] = useState(25);
  const [classroomLink, setClassroomLink] = useState('https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si');

  const filteredClasses = activeClasses.filter(c => {
    return selectedMajorFilter === 'all' || c.major === selectedMajorFilter;
  });

  const openAddModal = () => {
    setSelectedTeacherId(teachers[0]?.id || '');
    setClassName('XII TKJ 1');
    setGradeLevel('XII');
    setMajor('TKJ');
    setSubject('KEJURUAN TKJ');
    setRoom('Lab Komputer TKJ (Ruang Les XII TKJ 1)');
    setStartTime('20:15 WIB');
    setEndTime('21:00 WIB');
    setStatus('ongoing');
    setTopic('Pembahasan Soal TKA Pusmendik & Pendalaman Materi Kejuruan');
    setTotalStudents(25);
    setClassroomLink('https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si');
    setShowAddModal(true);
  };

  const openEditModal = (item: ActiveClass) => {
    setEditingSchedule(item);
    const matchedTeacher = teachers.find(t => t.name.toLowerCase() === item.teacherName.toLowerCase());
    setSelectedTeacherId(matchedTeacher ? matchedTeacher.id : (teachers[0]?.id || ''));
    setClassName(item.classId);
    setGradeLevel(item.gradeLevel);
    setMajor(item.major);
    setSubject(item.subject);
    setRoom(item.room);
    setStartTime(item.startTime);
    setEndTime(item.endTime);
    setStatus(item.status);
    setTopic(item.topic);
    setTotalStudents(item.totalStudents || 25);
    setClassroomLink(item.classroomLink || 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si');
  };

  const handleCreateActiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];
    const newClass: ActiveClass = {
      id: `act-${Date.now()}`,
      classId: className,
      className: `Kelas ${className}`,
      gradeLevel,
      major,
      subject,
      teacherName: teacher?.name || 'GURU PENGAMPU',
      teacherAvatar: '',
      teacherEmail: teacher?.email || 'guru@smkn1bandardua.sch.id',
      room,
      startTime,
      endTime,
      status,
      topic,
      totalStudents,
      classroomLink
    };

    if (onAddActiveClass) {
      onAddActiveClass(newClass);
    }
    setShowAddModal(false);
  };

  const handleSaveEditSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchedule) return;

    const teacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];
    const updated: ActiveClass = {
      ...editingSchedule,
      classId: className,
      className: `Kelas ${className}`,
      gradeLevel,
      major,
      subject,
      teacherName: teacher?.name || editingSchedule.teacherName,
      teacherEmail: teacher?.email || editingSchedule.teacherEmail,
      room,
      startTime,
      endTime,
      status,
      topic,
      totalStudents,
      classroomLink
    };

    if (onEditActiveClass) {
      onEditActiveClass(updated);
    }
    setEditingSchedule(null);
  };

  const handleConfirmDeleteSchedule = () => {
    if (deleteConfirmSchedule && onDeleteActiveClass) {
      onDeleteActiveClass(deleteConfirmSchedule.id);
      setDeleteConfirmSchedule(null);
    }
  };

  const ongoingCount = activeClasses.filter(c => c.status === 'ongoing').length;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
      {/* Header with Live Pulse */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Jadwal Mengajar & Monitoring Kelas Aktif (Les Malam 20:15 WIB)
            </h3>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {ongoingCount} Sesi Berlangsung
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Status real-time guru pengajar yang sedang aktif di ruang kelas SMKN 1 Bandar Dua (Sesi Malam 20:15 - 21:00 WIB)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Major Filter */}
          <select
            value={selectedMajorFilter}
            onChange={(e) => setSelectedMajorFilter(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="all">Semua 5 Kejuruan</option>
            <option value="TKJ">TKJ</option>
            <option value="TBSM">TBSM</option>
            <option value="TKRO">TKRO / TKR</option>
            <option value="TP">TP</option>
            <option value="DPB">DPB</option>
          </select>

          {/* Admin / Guru Add Schedule Button */}
          {currentUser.role === 'admin' ? (
            <button
              onClick={openAddModal}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Jadwal (Admin)</span>
            </button>
          ) : currentUser.role === 'guru' ? (
            <button
              onClick={openAddModal}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Input Sesi Mengajar</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Real-time Cards of Active Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((ac) => {
          const isOngoing = ac.status === 'ongoing';
          return (
            <div
              key={ac.id}
              className={`rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                isOngoing
                  ? 'bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border-emerald-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              {/* Status Ribbon & Admin Actions */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isOngoing ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isOngoing ? 'text-emerald-800' : 'text-slate-500'}`}>
                    {isOngoing ? 'Sedang Mengajar' : ac.status === 'completed' ? 'Selesai' : 'Akan Datang'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-200 font-mono">
                    {ac.startTime} - {ac.endTime}
                  </span>

                  {currentUser.role === 'admin' && (
                    <div className="flex items-center gap-1 ml-1">
                      <button
                        onClick={() => openEditModal(ac)}
                        className="p-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md border border-amber-300 transition-colors"
                        title="Edit Jadwal Ini"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmSchedule(ac)}
                        className="p-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-md border border-red-300 transition-colors"
                        title="Hapus Jadwal Ini"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Class & Subject Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {ac.className}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200/70 text-emerald-900">
                    {ac.major}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/60 p-2 rounded-xl">
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
                  <span className="truncate">{ac.subject}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 italic bg-white/80 p-2 rounded-lg border border-slate-200/50">
                  &ldquo;{ac.topic}&rdquo;
                </p>
              </div>

              {/* Teacher Info Card & Location */}
              <div className="pt-3 border-t border-emerald-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <UserAvatar name={ac.teacherName} role="guru" size="sm" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {ac.teacherName}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate max-w-[140px]">{ac.room}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={ac.classroomLink || 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 rounded-xl border border-emerald-200 shadow-xs transition-colors cursor-pointer"
                  title="Buka Google Classroom TKA"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: ADD SCHEDULE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {currentUser.role === 'admin' ? 'Tambah Jadwal Mengajar (Akses Admin)' : 'Input Sesi Mengajar Les Malam'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateActiveClass} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Guru Pengampu</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas Target</label>
                  <select
                    value={className}
                    onChange={(e) => {
                      setClassName(e.target.value);
                      if (e.target.value.includes('TKJ')) { setMajor('TKJ'); setRoom(`Lab Komputer TKJ (${e.target.value})`); }
                      else if (e.target.value.includes('TBSM')) { setMajor('TBSM'); setRoom(`Bengkel Otomotif TBSM (${e.target.value})`); }
                      else if (e.target.value.includes('TKR')) { setMajor('TKRO'); setRoom(`Bengkel Otomotif TKR (${e.target.value})`); }
                      else if (e.target.value.includes('TP')) { setMajor('TP'); setRoom(`Bengkel Pemesinan TP (${e.target.value})`); }
                      else if (e.target.value.includes('DPB')) { setMajor('DPB'); setRoom(`Studio Gambar DPB (${e.target.value})`); }
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                    <option value="XII TBSM 1">XII TBSM 1</option>
                    <option value="XII TBSM 2">XII TBSM 2</option>
                    <option value="XII TKR">XII TKR</option>
                    <option value="XII TP">XII TP</option>
                    <option value="XII DPB">XII DPB</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Mulai & Selesai</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                    <span>-</span>
                    <input
                      type="text"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Sesi</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="ongoing">Sedang Mengajar (Ongoing)</option>
                    <option value="upcoming">Akan Datang (Upcoming)</option>
                    <option value="completed">Selesai (Completed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ruang Pembelajaran</label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Materi / Topik Silabus</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Jadwal Sesi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT SCHEDULE */}
      {editingSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <Edit3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Edit Jadwal Mengajar (Admin)
                </h3>
              </div>
              <button
                onClick={() => setEditingSchedule(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditSchedule} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Guru Pengampu</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas Target</label>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                    <option value="XII TBSM 1">XII TBSM 1</option>
                    <option value="XII TBSM 2">XII TBSM 2</option>
                    <option value="XII TKR">XII TKR</option>
                    <option value="XII TP">XII TP</option>
                    <option value="XII DPB">XII DPB</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Mulai & Selesai</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                    <span>-</span>
                    <input
                      type="text"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Sesi</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="ongoing">Sedang Mengajar</option>
                    <option value="upcoming">Akan Datang</option>
                    <option value="completed">Selesai</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ruang Pembelajaran</label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Materi / Topik Silabus</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSchedule(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Jadwal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CONFIRM DELETE SCHEDULE */}
      {deleteConfirmSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Hapus Jadwal Mengajar Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Apakah Anda yakin ingin menghapus jadwal <strong>{deleteConfirmSchedule.className}</strong> ({deleteConfirmSchedule.subject} - {deleteConfirmSchedule.teacherName})?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmSchedule(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Batalkan
              </button>
              <button
                onClick={handleConfirmDeleteSchedule}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Ya, Hapus Jadwal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
