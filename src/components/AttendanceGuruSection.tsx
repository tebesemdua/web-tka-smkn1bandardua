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
  AlertCircle
} from 'lucide-react';
import { Teacher, TeacherAttendanceRecord, User } from '../types';

interface AttendanceGuruSectionProps {
  teachers: Teacher[];
  teacherAttendanceRecords: TeacherAttendanceRecord[];
  currentUser: User;
  onRecordTeacherAttendance: (record: TeacherAttendanceRecord) => void;
}

export const AttendanceGuruSection: React.FC<AttendanceGuruSectionProps> = ({
  teachers,
  teacherAttendanceRecords,
  currentUser,
  onRecordTeacherAttendance
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    currentUser.role === 'guru' ? (teachers.find(t => t.email === currentUser.email)?.id || teachers[0]?.id || '') : teachers[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [checkInTime, setCheckInTime] = useState<string>(
    new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
  );
  const [selectedClassId, setSelectedClassId] = useState('XII-MIPA-1');
  const [room, setRoom] = useState('Ruang TKA-01 (Lt. 2)');
  const [subject, setSubject] = useState('Penalaran Matematika & TPS');
  const [topic, setTopic] = useState('Pembahasan Soal HOTS & Pemantapan Konsep TKA');
  const [status, setStatus] = useState<'hadir' | 'izin' | 'pengganti'>('hadir');
  const [notes, setNotes] = useState('Siswa sangat aktif dan seluruh materi tersampaikan sesuai target silabus.');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();

    const record: TeacherAttendanceRecord = {
      id: `tatt-${Date.now()}`,
      date: selectedDate,
      checkInTime,
      teacherId: currentTeacher.id,
      teacherName: currentTeacher.name,
      subject,
      classId: selectedClassId,
      room,
      topic,
      status,
      notes,
      timestamp: Date.now()
    };

    onRecordTeacherAttendance(record);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const filteredRecords = teacherAttendanceRecords.filter(r => 
    r.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.classId.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                Absensi & Jurnal Mengajar Guru Pendamping TKA
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Catatan kehadiran mengajar, materi/topik yang disampaikan, serta sinkronisasi status aktif kelas
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 text-emerald-800 text-xs font-bold self-start md:self-auto">
            <UserCheck className="w-4 h-4" />
            <span>{teachers.length} Guru Terdaftar Aktif</span>
          </div>
        </div>

        {/* Input Form for Teacher Attendance */}
        {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
          <div className="mt-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>Form Input Kehadiran & Jurnal Mengajar Guru</span>
            </h4>

            {showSuccessToast && (
              <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Absensi guru dan jurnal mengajar berhasil tercatat di sistem!</span>
              </div>
            )}

            <form onSubmit={handleSubmitAttendance} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pilih Nama Guru</label>
                  <select
                    value={selectedTeacherId}
                    onChange={(e) => {
                      setSelectedTeacherId(e.target.value);
                      const t = teachers.find(item => item.id === e.target.value);
                      if (t) setSubject(t.subject);
                    }}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name} (NIP: {t.nip})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Masuk / Check-in</label>
                  <input
                    type="text"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Contoh: 08:15 WIB"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas yang Diajar</label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="XII-MIPA-1">Kelas XII MIPA 1</option>
                    <option value="XII-MIPA-2">Kelas XII MIPA 2</option>
                    <option value="XII-IPS-1">Kelas XII IPS 1</option>
                    <option value="XI-MIPA-1">Kelas XI MIPA 1</option>
                    <option value="X-1">Kelas X 1</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ruang Pembelajaran</label>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Ruang TKA-01"
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
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Topik pembelajaran hari ini..."
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Kehadiran</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
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
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Catatan keaktifan siswa, kendala, atau capaian..."
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Absensi & Aktifkan Sesi Guru</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* History Log Table of Teacher Attendance */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h4 className="text-sm font-bold text-slate-900">
            Riwayat Log Presensi & Jurnal Mengajar Guru
          </h4>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama guru / mapel..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>
        </div>

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
  );
};
