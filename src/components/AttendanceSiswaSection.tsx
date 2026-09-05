'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Users, 
  Upload, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  UserCheck, 
  Plus,
  Save,
  Trash2,
  Calendar,
  Sparkles,
  FileDown
} from 'lucide-react';
import { Student, AttendanceRecord, User } from '../types';

interface AttendanceSiswaSectionProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  currentUser: User;
  onUpdateAttendance: (records: AttendanceRecord[]) => void;
  onImportStudents: (newStudents: Student[]) => void;
}

export const AttendanceSiswaSection: React.FC<AttendanceSiswaSectionProps> = ({
  students,
  attendanceRecords,
  currentUser,
  onUpdateAttendance,
  onImportStudents
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('XII TKJ 1');
  const [selectedMajor, setSelectedMajor] = useState<string>('all');
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSession, setSelectedSession] = useState<string>('Sesi Malam (20:15 - 21:00 WIB)');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for today's active session markings
  const [currentMarkings, setCurrentMarkings] = useState<Record<string, { status: 'hadir' | 'sakit' | 'izin' | 'alpa'; notes: string }>>({});
  const [savedFeedback, setSavedFeedback] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [parsedExcelStudents, setParsedExcelStudents] = useState<Student[]>([]);
  const [excelFileName, setExcelFileName] = useState('');

  // 7 Kelas Resmi SMKN 1 Bandar Dua
  const classList = [
    { id: 'all', label: 'Semua 7 Kelas XII' },
    { id: 'XII TKJ 1', label: 'XII TKJ 1 (Teknik Komputer & Jaringan)' },
    { id: 'XII TKJ 2', label: 'XII TKJ 2 (Teknik Komputer & Jaringan)' },
    { id: 'XII TBSM 1', label: 'XII TBSM 1 (Sepeda Motor)' },
    { id: 'XII TBSM 2', label: 'XII TBSM 2 (Sepeda Motor)' },
    { id: 'XII TKR', label: 'XII TKR (Kendaraan Ringan Otomotif)' },
    { id: 'XII TP', label: 'XII TP (Teknik Pemesinan)' },
    { id: 'XII DPB', label: 'XII DPB (Desain Pemodelan Bangunan)' },
  ];

  // Filter students based on selected class, major, and search
  const filteredStudents = students.filter(s => {
    const matchesClass = selectedClassId === 'all' || s.classId === selectedClassId;
    const matchesMajor = selectedMajor === 'all' || s.major === selectedMajor;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.nisn.includes(searchQuery);
    return matchesClass && matchesMajor && matchesSearch;
  });

  // Get or initialize status for a student
  const getStudentStatus = (studentId: string) => {
    if (currentMarkings[studentId]) {
      return currentMarkings[studentId];
    }
    const existing = attendanceRecords.find(
      r => r.studentId === studentId && r.date === attendanceDate && r.session === selectedSession
    );
    if (existing) {
      return { status: existing.status, notes: existing.notes || '' };
    }
    return { status: 'hadir' as const, notes: 'Hadir tepat waktu' };
  };

  const handleStatusChange = (studentId: string, status: 'hadir' | 'sakit' | 'izin' | 'alpa') => {
    setCurrentMarkings(prev => ({
      ...prev,
      [studentId]: {
        status,
        notes: prev[studentId]?.notes || ''
      }
    }));
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    const current = getStudentStatus(studentId);
    setCurrentMarkings(prev => ({
      ...prev,
      [studentId]: {
        status: current.status,
        notes
      }
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, { status: 'hadir' | 'sakit' | 'izin' | 'alpa'; notes: string }> = {};
    filteredStudents.forEach(s => {
      updated[s.id] = { status: 'hadir', notes: 'Hadir tepat waktu' };
    });
    setCurrentMarkings(prev => ({ ...prev, ...updated }));
  };

  const handleSaveAttendance = () => {
    const newRecords: AttendanceRecord[] = filteredStudents.map(student => {
      const mark = getStudentStatus(student.id);
      return {
        id: `att-${student.id}-${attendanceDate}-${Date.now()}`,
        date: attendanceDate,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        studentId: student.id,
        studentName: student.name,
        nisn: student.nisn,
        classId: student.classId,
        major: student.major,
        session: selectedSession,
        status: mark.status,
        notes: mark.notes,
        recordedBy: currentUser.name,
        timestamp: Date.now()
      };
    });

    onUpdateAttendance(newRecords);
    setSavedFeedback('Data absensi les malam berhasil disimpan ke sistem!');
    setTimeout(() => setSavedFeedback(''), 3000);
  };

  // Excel Upload Handler with exact requested columns: NISN, Nama Lengkap, Kelas, Jurusan
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json<any>(ws);

        const formattedStudents: Student[] = data.map((row, index) => {
          const nisn = String(row['NISN'] || row['nisn'] || `00674${1000 + index}`);
          const name = String(row['Nama Lengkap'] || row['Nama'] || row['nama'] || row['Nama Siswa'] || `Siswa Baru ${index + 1}`).trim();
          const classId = String(row['Kelas'] || row['kelas'] || selectedClassId).trim();
          const major = String(row['Jurusan'] || row['jurusan'] || 'TKJ').trim();
          
          // Auto generate standard belajar.id email for student
          const cleanEmailSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/^\.|\.$/g, '');
          const email = `${cleanEmailSlug}@siswa.smk.belajar.id`;

          return {
            id: `std-upload-${Date.now()}-${index}`,
            nisn,
            name,
            classId,
            gradeLevel: 'XII',
            major,
            email,
            phone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
            gender: index % 2 === 0 ? 'L' : 'P',
            schoolName: 'SMK Negeri 1 Bandar Dua'
          };
        });

        setParsedExcelStudents(formattedStudents);
      } catch (err) {
        alert('Gagal membaca file Excel. Pastikan format file adalah .xlsx atau .csv yang valid.');
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleConfirmImport = () => {
    if (parsedExcelStudents.length > 0) {
      onImportStudents(parsedExcelStudents);
      setShowUploadModal(false);
      setParsedExcelStudents([]);
      alert(`Berhasil mengimpor ${parsedExcelStudents.length} data siswa SMK Negeri 1 Bandar Dua dari Excel!`);
    }
  };

  // Download Sample Template Excel (Kolom: NISN, Nama Lengkap, Kelas, Jurusan)
  const handleDownloadTemplate = () => {
    const templateData = [
      {
        'NISN': '0067489001',
        'Nama Lengkap': 'Muhammad Rizki Pratama',
        'Kelas': 'XII TKJ 1',
        'Jurusan': 'TKJ'
      },
      {
        'NISN': '0067489002',
        'Nama Lengkap': 'Cut Anisa Zahratunnisa',
        'Kelas': 'XII TKJ 1',
        'Jurusan': 'TKJ'
      },
      {
        'NISN': '0067489003',
        'Nama Lengkap': 'Teuku Ryan Hidayat',
        'Kelas': 'XII TBSM 1',
        'Jurusan': 'TBSM'
      },
      {
        'NISN': '0067489004',
        'Nama Lengkap': 'Ahmad Zulfikar',
        'Kelas': 'XII TKR',
        'Jurusan': 'TKRO'
      },
      {
        'NISN': '0067489005',
        'Nama Lengkap': 'Nurul Khadijah',
        'Kelas': 'XII DPB',
        'Jurusan': 'DPB'
      },
      {
        'NISN': '0067489006',
        'Nama Lengkap': 'Bilal Al-Farizi',
        'Kelas': 'XII TP',
        'Jurusan': 'TP'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Siswa TKA SMKN 1');
    XLSX.writeFile(wb, 'Format_Import_Siswa_SMKN1_BandarDua.xlsx');
  };

  // Calculate stats for current filter
  const totalCount = filteredStudents.length;
  let presentCount = 0;
  let sickCount = 0;
  let leaveCount = 0;
  let absentCount = 0;

  filteredStudents.forEach(s => {
    const status = getStudentStatus(s.id).status;
    if (status === 'hadir') presentCount++;
    else if (status === 'sakit') sickCount++;
    else if (status === 'izin') leaveCount++;
    else if (status === 'alpa') absentCount++;
  });

  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-800 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Presensi & Absensi Siswa Les TKA Malam Hari
                </h3>
                <span className="text-xs text-emerald-700 font-semibold">
                  SMK Negeri 1 Bandar Dua — Periode Les Malam (20:15 - 21:00 WIB)
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Input presensi siswa berdasarakan 7 kelas & 5 jurusan kejuruan, serta fitur import data via upload Excel
            </p>
          </div>

          {/* Action Buttons for Upload / Template */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadTemplate}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
              title="Download contoh format Excel resmi (NISN, Nama Lengkap, Kelas, Jurusan)"
            >
              <FileDown className="w-4 h-4 text-emerald-700" />
              <span>Download Format Template Excel</span>
            </button>

            {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload File Excel Siswa</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Rombongan Belajar (Kelas XII)</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              {classList.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Konsentrasi Keahlian / Jurusan</label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Jurusan</option>
              <option value="TKJ">TKJ (Teknik Komputer & Jaringan)</option>
              <option value="TBSM">TBSM (Teknik & Bisnis Sepeda Motor)</option>
              <option value="TKRO">TKRO (Teknik Kendaraan Ringan Otomotif)</option>
              <option value="TP">TP (Teknik Pemesinan)</option>
              <option value="DPB">DPB (Desain Pemodelan Bangunan)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Les TKA</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Waktu / Sesi Belajar</label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Sesi Malam (20:15 - 21:00 WIB)">Sesi Malam (20:15 - 21:00 WIB | 45 Menit)</option>
              <option value="Sesi Pengayaan (19:30 - 20:15 WIB)">Sesi Pengayaan (19:30 - 20:15 WIB)</option>
            </select>
          </div>
        </div>

        {/* Live Attendance Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100 text-center">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <span className="text-[11px] font-bold text-emerald-800 uppercase">Hadir</span>
            <div className="text-xl font-extrabold text-emerald-700 mt-0.5">{presentCount}</div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl">
            <span className="text-[11px] font-bold text-blue-800 uppercase">Sakit</span>
            <div className="text-xl font-extrabold text-blue-700 mt-0.5">{sickCount}</div>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
            <span className="text-[11px] font-bold text-amber-800 uppercase">Izin</span>
            <div className="text-xl font-extrabold text-amber-700 mt-0.5">{leaveCount}</div>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
            <span className="text-[11px] font-bold text-rose-800 uppercase">Alpa</span>
            <div className="text-xl font-extrabold text-rose-700 mt-0.5">{absentCount}</div>
          </div>
          <div className="p-3 bg-slate-900 text-white rounded-2xl col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-yellow-300 uppercase">Persentase</span>
            <div className="text-xl font-extrabold text-white mt-0.5">{attendanceRate}%</div>
          </div>
        </div>
      </div>

      {/* Student Attendance List Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau NISN siswa..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
              <>
                <button
                  onClick={handleMarkAllPresent}
                  className="px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  ✓ Set Semua Hadir
                </button>
                <button
                  onClick={handleSaveAttendance}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Presensi</span>
                </button>
              </>
            )}
          </div>
        </div>

        {savedFeedback && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{savedFeedback}</span>
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">NISN & Nama Lengkap</th>
                <th className="p-3.5">Kelas & Jurusan</th>
                <th className="p-3.5">Akun Belajar.id</th>
                <th className="p-3.5 text-center w-64">Status Presensi</th>
                <th className="p-3.5">Jurnal / Catatan Guru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Tidak ada data siswa ditemukan untuk filter kelas ini. Silakan gunakan tombol <strong>Upload File Excel Siswa</strong> di atas.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const mark = getStudentStatus(student.id);
                  const isReadonly = currentUser.role === 'siswa';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 text-center font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">NISN: {student.nisn}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {student.classId}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{student.major}</div>
                      </td>
                      <td className="p-3.5 font-medium text-slate-600">
                        {student.email}
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                          <button
                            type="button"
                            disabled={isReadonly}
                            onClick={() => handleStatusChange(student.id, 'hadir')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              mark.status === 'hadir'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'text-slate-600 hover:text-emerald-700'
                            }`}
                          >
                            Hadir
                          </button>
                          <button
                            type="button"
                            disabled={isReadonly}
                            onClick={() => handleStatusChange(student.id, 'sakit')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              mark.status === 'sakit'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'text-slate-600 hover:text-blue-700'
                            }`}
                          >
                            Sakit
                          </button>
                          <button
                            type="button"
                            disabled={isReadonly}
                            onClick={() => handleStatusChange(student.id, 'izin')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              mark.status === 'izin'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'text-slate-600 hover:text-amber-700'
                            }`}
                          >
                            Izin
                          </button>
                          <button
                            type="button"
                            disabled={isReadonly}
                            onClick={() => handleStatusChange(student.id, 'alpa')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              mark.status === 'alpa'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'text-slate-600 hover:text-rose-700'
                            }`}
                          >
                            Alpa
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <input
                          type="text"
                          disabled={isReadonly}
                          value={mark.notes}
                          onChange={(e) => handleNotesChange(student.id, e.target.value)}
                          placeholder="Catatan keaktifan..."
                          className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Upload Excel */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Import Data Siswa SMKN 1 Bandar Dua via Excel
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setParsedExcelStudents([]);
                }}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900">Struktur Kolom Excel yang Dibutuhkan:</h4>
                  <p className="text-emerald-800 text-[11px] mt-0.5">
                    File spreadsheet Excel Anda cukup memuat 4 kolom utama: <strong>NISN</strong>, <strong>Nama Lengkap</strong>, <strong>Kelas</strong> (contoh: <em>XII TKJ 1, XII TBSM 1, XII TKR</em>), dan <strong>Jurusan</strong> (contoh: <em>TKJ, TBSM, TKRO, TP, DPB</em>).
                  </p>
                  <p className="text-emerald-700 text-[10px] mt-1 italic">
                    *Akun email @siswa.smk.belajar.id dan password seragam default (&ldquo;belajar123&rdquo;) akan otomatis dibuatkan oleh sistem untuk seluruh siswa.
                  </p>
                </div>
              </div>

              {/* Upload Input Box */}
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors bg-slate-50">
                <input
                  type="file"
                  id="excelInput"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="excelInput" className="cursor-pointer block">
                  <Upload className="w-8 h-8 mx-auto text-emerald-700 mb-2" />
                  <span className="font-bold text-slate-800 block">
                    {excelFileName ? excelFileName : 'Klik untuk Memilih File Excel (.xlsx / .csv)'}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    File akan langsung dibaca dan divalidasi secara lokal di browser
                  </span>
                </label>
              </div>

              {/* Preview parsed students */}
              {parsedExcelStudents.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">
                      Pratinjau Data Ditemukan ({parsedExcelStudents.length} Siswa):
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold">✓ Siap Diimpor</span>
                  </div>

                  <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-100 font-bold text-slate-700 sticky top-0">
                        <tr>
                          <th className="p-2">NISN</th>
                          <th className="p-2">Nama Lengkap</th>
                          <th className="p-2">Kelas</th>
                          <th className="p-2">Jurusan</th>
                          <th className="p-2">Email Otomatis</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {parsedExcelStudents.map((s, idx) => (
                          <tr key={idx}>
                            <td className="p-2 font-mono">{s.nisn}</td>
                            <td className="p-2 font-bold">{s.name}</td>
                            <td className="p-2">{s.classId}</td>
                            <td className="p-2">{s.major}</td>
                            <td className="p-2 text-slate-500">{s.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Format Template 4 Kolom</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      setParsedExcelStudents([]);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    disabled={parsedExcelStudents.length === 0}
                    onClick={handleConfirmImport}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white rounded-xl font-bold shadow-md cursor-pointer disabled:cursor-not-allowed"
                  >
                    Simpan & Terapkan ({parsedExcelStudents.length} Siswa)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
