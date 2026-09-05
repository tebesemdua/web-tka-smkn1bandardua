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
  CheckCircle2, 
  Sparkles,
  UserCheck,
  Calendar,
  Layers,
  Filter
} from 'lucide-react';
import { ActiveClass, Teacher, User } from '../types';

interface ActiveClassesMonitorProps {
  activeClasses: ActiveClass[];
  teachers: Teacher[];
  currentUser: User;
  onAddActiveClass?: (newClass: ActiveClass) => void;
  onNavigateToClassroom?: () => void;
}

export const ActiveClassesMonitor: React.FC<ActiveClassesMonitorProps> = ({
  activeClasses,
  teachers,
  currentUser,
  onAddActiveClass,
  onNavigateToClassroom
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMajorFilter, setSelectedMajorFilter] = useState<string>('all');
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || '');
  const [className, setClassName] = useState('XII TKJ 1');
  const [gradeLevel, setGradeLevel] = useState('XII');
  const [major, setMajor] = useState('TKJ');
  const [subject, setSubject] = useState('KEJURUAN TKJ');
  const [room, setRoom] = useState('Lab Komputer TKJ (Lt. 2)');
  const [startTime, setStartTime] = useState('20:15 WIB');
  const [endTime, setEndTime] = useState('21:00 WIB');
  const [topic, setTopic] = useState('Pembahasan Soal TKA Pusmendik & Pendalaman Materi Kejuruan');

  const filteredClasses = activeClasses.filter(c => {
    return selectedMajorFilter === 'all' || c.major === selectedMajorFilter;
  });

  const handleCreateActiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];
    const newClass: ActiveClass = {
      id: `act-${Date.now()}`,
      classId: className,
      className: `Kelas ${className} (SMKN 1 Bandar Dua)`,
      gradeLevel,
      major,
      subject,
      teacherName: teacher.name,
      teacherAvatar: teacher.avatar,
      teacherEmail: teacher.email,
      room,
      startTime,
      endTime,
      status: 'ongoing',
      topic,
      totalStudents: 25,
      classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'
    };

    if (onAddActiveClass) {
      onAddActiveClass(newClass);
    }
    setShowAddModal(false);
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
              Monitoring Kelas Aktif & Guru Mengajar Malam Hari
            </h3>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {ongoingCount} Sesi Berlangsung
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Status real-time guru pengajar yang sedang aktif di ruang kelas SMKN 1 Bandar Dua (Sesi Malam 20:15 - 21:00 WIB)
          </p>
        </div>

        <div className="flex items-center gap-2">
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

          {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Input Sesi Mengajar</span>
            </button>
          )}
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
              {/* Status Ribbon */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isOngoing ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isOngoing ? 'text-emerald-800' : 'text-slate-500'}`}>
                    {isOngoing ? 'Sedang Mengajar' : 'Akan Datang'}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-200 font-mono">
                  {ac.startTime} - {ac.endTime}
                </span>
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
                  <img
                    src={ac.teacherAvatar}
                    alt={ac.teacherName}
                    className="w-9 h-9 rounded-full object-cover border border-emerald-400 shadow-xs"
                  />
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
                  href={ac.classroomLink || 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 rounded-xl border border-emerald-200 shadow-xs transition-colors cursor-pointer"
                  title="Buka Google Classroom (embrt4ws)"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Active Class */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Input Sesi Mengajar Les TKA Malam Hari
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateActiveClass} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Guru Pengajar (31 Guru SMKN 1)</label>
                <select
                  value={selectedTeacherId}
                  onChange={(e) => {
                    setSelectedTeacherId(e.target.value);
                    const t = teachers.find(item => item.id === e.target.value);
                    if (t) setSubject(t.subject);
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.subject} — {t.email})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rombongan Belajar (Kelas XII)</label>
                  <select
                    value={className}
                    onChange={(e) => {
                      setClassName(e.target.value);
                      if (e.target.value.includes('TKJ')) setMajor('TKJ');
                      else if (e.target.value.includes('TBSM')) setMajor('TBSM');
                      else if (e.target.value.includes('TKR')) setMajor('TKRO');
                      else if (e.target.value.includes('TP')) setMajor('TP');
                      else if (e.target.value.includes('DPB')) setMajor('DPB');
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
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
                  <label className="block font-bold text-slate-700 mb-1">Konsentrasi Keahlian</label>
                  <input
                    type="text"
                    value={major}
                    readOnly
                    className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ruang / Bengkel / Lab</label>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    placeholder="Contoh: Lab Komputer TKJ"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Mulai</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    placeholder="20:15 WIB"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Selesai</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    placeholder="21:00 WIB"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Topik / Bahasan Pembelajaran</label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  placeholder="Contoh: Pembahasan Soal Pusmendik TKA SMK 2026..."
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md"
                >
                  Aktifkan Sesi Mengajar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
