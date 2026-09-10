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
  Edit3,
  Trash2,
  Save, 
  Calendar, 
  Sparkles, 
  FileDown,
  X,
  ShieldCheck,
  Phone,
  Mail,
  GraduationCap,
  CheckSquare,
  Square,
  RefreshCw,
  Trash
} from 'lucide-react';
import { Student, AttendanceRecord, User } from '../types';
import { UserAvatar } from './UserAvatar';

interface AttendanceSiswaSectionProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  currentUser: User;
  onUpdateAttendance: (records: AttendanceRecord[]) => void;
  onImportStudents: (newStudents: Student[]) => void;
  onAddStudent?: (student: Student) => void;
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (studentId: string) => void;
  onBulkDeleteStudents?: (ids: string[]) => void;
  onDeleteAllFiltered?: (filteredIds: string[]) => void;
  onClearAllCloud?: () => void;
}

export const AttendanceSiswaSection: React.FC<AttendanceSiswaSectionProps> = ({
  students,
  attendanceRecords,
  currentUser,
  onUpdateAttendance,
  onImportStudents,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onBulkDeleteStudents,
  onDeleteAllFiltered,
  onClearAllCloud
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'master-siswa' | 'absensi'>('master-siswa');
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
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

  // Admin Modal States for Adding / Editing Student
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteConfirmStudent, setDeleteConfirmStudent] = useState<Student | null>(null);

  // Bulk Admin States
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState('');

  // Form State for Add/Edit Student
  const [formNisn, setFormNisn] = useState('');
  const [formName, setFormName] = useState('');
  const [formClassId, setFormClassId] = useState('XII TKJ 1');
  const [formMajor, setFormMajor] = useState('TKJ');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formGender, setFormGender] = useState<'L' | 'P'>('L');

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

  // Bulk selection helpers
  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAllFiltered = () => {
    if (selectedIds.size === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Hapus ${selectedIds.size} siswa terpilih? Tindakan ini sinkron ke semua perangkat.`)) return;
    const ids = Array.from(selectedIds);
    if (onBulkDeleteStudents) {
      onBulkDeleteStudents(ids);
    } else {
      ids.forEach(id => onDeleteStudent && onDeleteStudent(id));
    }
    setSelectedIds(new Set());
    setSavedFeedback(`${ids.length} siswa terpilih berhasil dihapus dan sinkron cloud!`);
    setTimeout(() => setSavedFeedback(''), 3000);
  };

  const handleDeleteAllFiltered = () => {
    if (filteredStudents.length === 0) return;
    if (!confirm(`Hapus SEMUA ${filteredStudents.length} siswa yang sedang difilter? (mis: ${selectedClassId}) Ini akan sinkron ke semua perangkat!`)) return;
    const ids = filteredStudents.map(s => s.id);
    if (onDeleteAllFiltered) {
      onDeleteAllFiltered(ids);
    } else if (onBulkDeleteStudents) {
      onBulkDeleteStudents(ids);
    }
    setSelectedIds(new Set());
    setSavedFeedback(`${ids.length} siswa terfilter dihapus dari cloud!`);
    setTimeout(() => setSavedFeedback(''), 3000);
  };

  const handleForceSync = async () => {
    setIsSyncing(true);
    setSyncResult('');
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'force_sync', key: 'students', data: students })
      });
      const json = await res.json();
      if (json.success) {
        setSyncResult(`✅ Sync berhasil: ${students.length} siswa terkirim ke database cloud. Data kini sinkron di semua device.`);
        setSavedFeedback(`Sync ${students.length} siswa ke database berhasil!`);
      } else {
        setSyncResult(`❌ Gagal sync: ${json.error || 'unknown'}`);
      }
    } catch (e: any) {
      setSyncResult(`❌ Error sync: ${e.message}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncResult(''), 5000);
      setTimeout(() => setSavedFeedback(''), 3000);
    }
  };

  const handleClearAllCloud = () => {
    if (!confirm(`HAPUS SEMUA ${students.length} data siswa dari DATABASE CLOUD? Semua perangkat akan kosong. Tindakan tidak dapat dibatalkan!`)) return;
    if (onClearAllCloud) {
      onClearAllCloud();
      setSelectedIds(new Set());
      setSavedFeedback(`Semua ${students.length} siswa dihapus dari cloud! Sinkron ke semua device.`);
      setTimeout(() => setSavedFeedback(''), 3000);
    }
  };

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

  // TOMBOL: DOWNLOAD ABSENSI SEKARANG (.xlsx)
  const handleDownloadCurrentAttendance = () => {
    const exportData = filteredStudents.map((s, idx) => {
      const mark = getStudentStatus(s.id);
      return {
        'No': idx + 1,
        'Tanggal Presensi': attendanceDate,
        'Waktu / Sesi': selectedSession,
        'NISN': s.nisn,
        'Nama Lengkap Siswa': s.name,
        'Kelas': s.classId,
        'Jurusan': s.major,
        'Status Kehadiran': mark.status.toUpperCase(),
        'Catatan Presensi': mark.notes || 'Hadir tepat waktu',
        'Petugas / Guru': currentUser.name,
        'Sekolah': 'SMK Negeri 1 Bandar Dua'
      };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rekap Presensi Siswa');
    XLSX.writeFile(wb, `Rekap_Absensi_Siswa_TKA_SMKN1BandarDua_${attendanceDate}.xlsx`);
    setSavedFeedback(`File Rekap Absensi Siswa (${exportData.length} data) berhasil diunduh sekarang!`);
    setTimeout(() => setSavedFeedback(''), 3500);
  };

  // Open Add Student Modal
  const openAddStudentModal = () => {
    setFormNisn(`006740${(students.length + 1).toString().padStart(4, '0')}`);
    setFormName('');
    setFormClassId('XII TKJ 1');
    setFormMajor('TKJ');
    setFormEmail('');
    setFormPhone('081269000000');
    setFormGender('L');
    setShowAddStudentModal(true);
  };

  // Open Edit Student Modal
  const openEditStudentModal = (student: Student) => {
    setEditingStudent(student);
    setFormNisn(student.nisn);
    setFormName(student.name);
    setFormClassId(student.classId);
    setFormMajor(student.major);
    setFormEmail(student.email);
    setFormPhone(student.phone);
    setFormGender(student.gender);
  };

  // Auto-generate email based on name
  const handleNameInput = (val: string) => {
    setFormName(val);
    if (!editingStudent) {
      const cleanSlug = val.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/^\.|\.$/g, '');
      setFormEmail(cleanSlug ? `${cleanSlug}@smkn1bandardua.sch.id` : '');
    }
  };

  // Save Add Student
  const handleSaveAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formNisn.trim()) return;

    const newStudent: Student = {
      id: `SIS-${(students.length + 1).toString().padStart(3, '0')}`,
      nisn: formNisn.trim(),
      name: formName.trim(),
      classId: formClassId,
      gradeLevel: 'XII',
      major: formMajor,
      email: formEmail.trim() || `${formName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@smkn1bandardua.sch.id`,
      phone: formPhone.trim() || '081269000000',
      gender: formGender,
      schoolName: 'SMK Negeri 1 Bandar Dua'
    };

    if (onAddStudent) {
      onAddStudent(newStudent);
    }
    setShowAddStudentModal(false);
    setSavedFeedback(`Siswa ${newStudent.name} berhasil ditambahkan!`);
    setTimeout(() => setSavedFeedback(''), 3000);
  };

  // Save Edit Student
  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const updated: Student = {
      ...editingStudent,
      nisn: formNisn.trim(),
      name: formName.trim(),
      classId: formClassId,
      major: formMajor,
      email: formEmail.trim(),
      phone: formPhone.trim(),
      gender: formGender
    };

    if (onEditStudent) {
      onEditStudent(updated);
    }
    setEditingStudent(null);
    setSavedFeedback(`Data siswa ${updated.name} berhasil diperbarui!`);
    setTimeout(() => setSavedFeedback(''), 3000);
  };

  // Delete Student
  const handleConfirmDelete = () => {
    if (deleteConfirmStudent && onDeleteStudent) {
      onDeleteStudent(deleteConfirmStudent.id);
      setSavedFeedback(`Data siswa ${deleteConfirmStudent.name} telah dihapus.`);
      setDeleteConfirmStudent(null);
      setTimeout(() => setSavedFeedback(''), 3000);
    }
  };

  // Excel Upload Handler
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
          const nisn = String(row['NISN'] || row['nisn'] || `006740${(students.length + index + 1).toString().padStart(4, '0')}`);
          const name = String(row['Nama Lengkap'] || row['Nama'] || row['nama'] || row['Nama Siswa'] || `Siswa Inisial S-${(students.length + index + 1).toString().padStart(3, '0')}`).trim();
          const classId = String(row['Kelas'] || row['kelas'] || selectedClassId).trim();
          const major = String(row['Jurusan'] || row['jurusan'] || 'TKJ').trim();
          
          const cleanEmailSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/^\.|\.$/g, '');
          const email = `${cleanEmailSlug}@smkn1bandardua.sch.id`;

          return {
            id: `SIS-${(students.length + index + 1).toString().padStart(3, '0')}`,
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

  // Download Sample Template Excel
  const handleDownloadTemplate = () => {
    const templateData = [
      { 'NISN': '0067400001', 'Nama Lengkap': 'Siswa Inisial S-001', 'Kelas': 'XII TKJ 1', 'Jurusan': 'TKJ' },
      { 'NISN': '0067400002', 'Nama Lengkap': 'Siswa Inisial S-002', 'Kelas': 'XII TKJ 1', 'Jurusan': 'TKJ' },
      { 'NISN': '0067400003', 'Nama Lengkap': 'Siswa Inisial S-003', 'Kelas': 'XII TBSM 1', 'Jurusan': 'TBSM' },
      { 'NISN': '0067400004', 'Nama Lengkap': 'Siswa Inisial S-004', 'Kelas': 'XII TKR', 'Jurusan': 'TKRO' },
      { 'NISN': '0067400005', 'Nama Lengkap': 'Siswa Inisial S-005', 'Kelas': 'XII DPB', 'Jurusan': 'DPB' },
      { 'NISN': '0067400006', 'Nama Lengkap': 'Siswa Inisial S-006', 'Kelas': 'XII TP', 'Jurusan': 'TP' }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Siswa TKA');
    XLSX.writeFile(wb, 'Format_Impor_Siswa_SMKN1_BandarDua.xlsx');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Sub-tab Switcher & Direct Download Absensi Button */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Data Master Siswa & Presensi Les Malam (20:15 WIB)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manajemen {students.length} siswa peserta bimbingan dari 7 Kelas XII SMKN 1 Bandar Dua (TBSM, TKRO, TP, DPB, TKJ)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sub-tab Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveSubTab('master-siswa')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === 'master-siswa'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👥 Master Data Siswa ({students.length})
              </button>
              <button
                onClick={() => setActiveSubTab('absensi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === 'absensi'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📝 Presensi Sesi Malam
              </button>
            </div>

            {/* TOMBOL UTAMA: DOWNLOAD ABSENSI SEKARANG */}
            <button
              onClick={handleDownloadCurrentAttendance}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer ring-2 ring-emerald-500/20"
              title="Unduh Data Rekap Absensi Siswa Terkini ke Berkas Excel (.xlsx)"
            >
              <Download className="w-4 h-4 text-yellow-300" />
              <span>Download Absensi Sekarang</span>
            </button>

            {/* Admin Add Student Button */}
            {currentUser.role === 'admin' && (
              <button
                onClick={openAddStudentModal}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Siswa</span>
              </button>
            )}

            {/* Impor Excel Button */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Impor Excel</span>
            </button>
          </div>
        </div>

        {savedFeedback && (
          <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedFeedback}</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Filter Kelas</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            >
              {classList.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Filter Jurusan</label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
            >
              <option value="all">Semua 5 Jurusan Kejuruan</option>
              <option value="TKJ">Teknik Komputer & Jaringan (TKJ)</option>
              <option value="TBSM">Teknik Bisnis Sepeda Motor (TBSM)</option>
              <option value="TKRO">Teknik Kendaraan Ringan Otomotif (TKRO)</option>
              <option value="TP">Teknik Pemesinan (TP)</option>
              <option value="DPB">Desain Pemodelan Bangunan (DPB)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Pencarian Siswa</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Nama Inisial / NISN..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: MASTER DATA SISWA (ADMIN BISA TAMBAH, EDIT, HAPUS + BULK) */}
      {activeSubTab === 'master-siswa' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex flex-col gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Daftar Lengkap Profil Siswa ({filteredStudents.length} Siswa Terpilih)
                </h4>
                <p className="text-xs text-slate-500">
                  {currentUser.role === 'admin' 
                    ? '🛡️ Mode Administrator: Pilih Semua • Hapus Terpilih • Sync ke Database (sinkron semua device)' 
                    : 'Daftar data siswa bimbingan belajar TKA 2026 SMK Negeri 1 Bandar Dua.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadCurrentAttendance}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Download Absensi (.xlsx)</span>
                </button>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  Total Database: {students.length} Siswa
                </span>
              </div>
            </div>

            {/* BULK ADMIN TOOLBAR - BARU */}
            {currentUser.role === 'admin' && (
              <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <button
                  onClick={toggleSelectAllFiltered}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 flex items-center gap-1.5 cursor-pointer"
                  title="Pilih semua yang terfilter"
                >
                  {selectedIds.size === filteredStudents.length && filteredStudents.length > 0 ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4" />}
                  <span>Pilih Semua ({filteredStudents.length})</span>
                </button>

                <span className="text-xs font-bold text-slate-600 px-2">
                  {selectedIds.size} terpilih
                </span>

                <button
                  onClick={handleBulkDelete}
                  disabled={selectedIds.size === 0}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-colors ${selectedIds.size > 0 ? 'bg-red-600 hover:bg-red-700 text-white border-red-600 cursor-pointer' : 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Terpilih ({selectedIds.size})</span>
                </button>

                <button
                  onClick={handleDeleteAllFiltered}
                  disabled={filteredStudents.length === 0}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-colors ${filteredStudents.length > 0 ? 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600 cursor-pointer' : 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'}`}
                >
                  <Trash className="w-3.5 h-3.5" />
                  <span>Hapus Filter ({filteredStudents.length})</span>
                </button>

                <button
                  onClick={handleForceSync}
                  disabled={isSyncing}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 border border-blue-600 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : `Sync ${students.length} ke Database`}</span>
                </button>

                <button
                  onClick={handleClearAllCloud}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-900 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-300" />
                  <span>Hapus Semua Cloud</span>
                </button>

                {syncResult && (
                  <span className="text-xs font-bold px-2 py-1 bg-white rounded border border-slate-200">{syncResult}</span>
                )}
              </div>
            )}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                  {currentUser.role === 'admin' && (
                    <th className="p-3.5 w-12 text-center">
                      <button onClick={toggleSelectAllFiltered} className="cursor-pointer">
                        {selectedIds.size === filteredStudents.length && filteredStudents.length > 0 ? <CheckSquare className="w-5 h-5 text-emerald-600 mx-auto" /> : <Square className="w-5 h-5 text-slate-400 mx-auto" />}
                      </button>
                    </th>
                  )}
                  <th className="p-3.5">ID & No</th>
                  <th className="p-3.5">Profil Siswa</th>
                  <th className="p-3.5">NIS Dummy & Akun Email</th>
                  <th className="p-3.5">Kelas & Jurusan</th>
                  <th className="p-3.5">No. WhatsApp</th>
                  <th className="p-3.5">JK</th>
                  {currentUser.role === 'admin' && (
                    <th className="p-3.5 text-center">Aksi Khusus Admin</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s, idx) => (
                  <tr key={s.id} className={`hover:bg-slate-50/80 transition-colors ${selectedIds.has(s.id) ? 'bg-emerald-50/50' : ''}`}>
                    {currentUser.role === 'admin' && (
                      <td className="p-3.5 text-center">
                        <button onClick={() => toggleSelectOne(s.id)} className="cursor-pointer">
                          {selectedIds.has(s.id) ? <CheckSquare className="w-5 h-5 text-emerald-600 mx-auto" /> : <Square className="w-5 h-5 text-slate-300 mx-auto" />}
                        </button>
                      </td>
                    )}
                    <td className="p-3.5">
                      <div className="font-mono font-extrabold text-slate-800">{s.id}</div>
                      <div className="text-[10px] text-slate-400">#{idx + 1}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={s.name} role="siswa" size="sm" />
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs">{s.name}</div>
                          <div className="text-[11px] text-slate-500">{s.schoolName || 'SMK Negeri 1 Bandar Dua'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-mono font-bold text-slate-800">{s.nisn}</div>
                      <div className="text-[11px] text-blue-700 font-semibold">{s.email}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{s.classId}</span>
                      <div className="text-[10px] text-emerald-800 font-bold uppercase mt-1">
                        Jurusan {s.major}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-700">
                      {s.phone}
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        s.gender === 'L' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                      }`}>
                        {s.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}
                      </span>
                    </td>
                    {currentUser.role === 'admin' && (
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openEditStudentModal(s)}
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg border border-amber-300 transition-colors cursor-pointer"
                            title="Edit Profil Siswa"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmStudent(s)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-300 transition-colors cursor-pointer"
                            title="Hapus Siswa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PRESENSI SESI MALAM */}
      {activeSubTab === 'absensi' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Formulir Presensi Siswa Sesi Malam (20:15 - 21:00 WIB)
              </h4>
              <p className="text-xs text-slate-500">
                Tandai kehadiran peserta bimbingan belajar malam hari SMKN 1 Bandar Dua
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* TOMBOL DOWNLOAD ABSENSI SEKARANG */}
              <button
                onClick={handleDownloadCurrentAttendance}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                title="Download Rekap Absensi Terkini ke Excel"
              >
                <Download className="w-3.5 h-3.5 text-yellow-300" />
                <span>Download Absensi Sekarang</span>
              </button>

              <button
                onClick={handleMarkAllPresent}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                ✓ Setel Semua Hadir
              </button>

              <button
                onClick={handleSaveAttendance}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Presensi</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tanggal Presensi</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Pilihan Sesi</label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
              >
                <option value="Sesi Malam (20:15 - 21:00 WIB)">Sesi Malam (20:15 - 21:00 WIB)</option>
                <option value="Sesi Siang (14:00 - 15:30 WIB)">Sesi Siang (14:00 - 15:30 WIB)</option>
                <option value="Simulasi Akbar TKA Akhir Pekan">Simulasi Akbar TKA Akhir Pekan</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5">Nama & NISN</th>
                  <th className="p-3.5">Kelas</th>
                  <th className="p-3.5">Status Presensi</th>
                  <th className="p-3.5">Catatan Kehadiran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => {
                  const currentStatus = getStudentStatus(s.id);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <UserAvatar name={s.name} role="siswa" size="xs" />
                          <div>
                            <div className="font-bold text-slate-900">{s.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{s.nisn}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-slate-700">
                        {s.classId}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          {(['hadir', 'sakit', 'izin', 'alpa'] as const).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleStatusChange(s.id, st)}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] capitalize transition-all cursor-pointer ${
                                currentStatus.status === st
                                  ? st === 'hadir'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : st === 'sakit'
                                    ? 'bg-amber-500 text-white shadow-xs'
                                    : st === 'izin'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-red-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <input
                          type="text"
                          value={currentStatus.notes}
                          onChange={(e) => handleNotesChange(s.id, e.target.value)}
                          placeholder="Catatan..."
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ADMIN TAMBAH SISWA BARU */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 text-red-800 rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Tambah Siswa Baru (Akses Khusus Admin)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Masukkan biodata siswa untuk ditambahkan ke sistem
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddStudentModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddStudent} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    NISN Siswa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formNisn}
                    onChange={(e) => setFormNisn(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800"
                    placeholder="0067400001"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as 'L' | 'P')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Lengkap / Inisial Siswa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => handleNameInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  placeholder="Contoh: Siswa Inisial S-161"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Kelas Target SMKN 1 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formClassId}
                    onChange={(e) => {
                      setFormClassId(e.target.value);
                      if (e.target.value.includes('TKJ')) setFormMajor('TKJ');
                      else if (e.target.value.includes('TBSM')) setFormMajor('TBSM');
                      else if (e.target.value.includes('TKR')) setFormMajor('TKRO');
                      else if (e.target.value.includes('TP')) setFormMajor('TP');
                      else if (e.target.value.includes('DPB')) setFormMajor('DPB');
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
                  <label className="block font-bold text-slate-700 mb-1">
                    Jurusan
                  </label>
                  <select
                    value={formMajor}
                    onChange={(e) => setFormMajor(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="TKJ">TKJ</option>
                    <option value="TBSM">TBSM</option>
                    <option value="TKRO">TKRO</option>
                    <option value="TP">TP</option>
                    <option value="DPB">DPB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Siswa
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  placeholder="siswa001@smkn1bandardua.sch.id"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nomor WhatsApp / HP
                </label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  placeholder="081269110001"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Siswa Baru</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADMIN EDIT PROFIL SISWA */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Edit Profil Siswa (Admin)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Perbarui profil data siswa {editingStudent.name}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingStudent(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    NISN Siswa
                  </label>
                  <input
                    type="text"
                    value={formNisn}
                    onChange={(e) => setFormNisn(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as 'L' | 'P')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Lengkap Siswa
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
                    Kelas
                  </label>
                  <select
                    value={formClassId}
                    onChange={(e) => setFormClassId(e.target.value)}
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
                  <label className="block font-bold text-slate-700 mb-1">
                    Jurusan
                  </label>
                  <select
                    value={formMajor}
                    onChange={(e) => setFormMajor(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="TKJ">TKJ</option>
                    <option value="TBSM">TBSM</option>
                    <option value="TKRO">TKRO</option>
                    <option value="TP">TP</option>
                    <option value="DPB">DPB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Siswa
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
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

      {/* MODAL 3: ADMIN KONFIRMASI HAPUS SISWA */}
      {deleteConfirmStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Hapus Data Siswa Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Apakah Anda yakin ingin menghapus data <strong>{deleteConfirmStudent.name}</strong> ({deleteConfirmStudent.nisn}) dari kelas {deleteConfirmStudent.classId}? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Batalkan
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Ya, Hapus Siswa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: UPLOAD EXCEL SISWA */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Impor Data Siswa via Excel / CSV
                  </h3>
                  <p className="text-xs text-slate-500">
                    Format Kolom: NISN, Nama Lengkap, Kelas, Jurusan
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-950">Unduh Format Contoh Excel</div>
                  <div className="text-[11px] text-emerald-700">Template standar 7 kelas XII SMKN 1 Bandar Dua</div>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Template</span>
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors">
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="excel-file-input"
                />
                <label
                  htmlFor="excel-file-input"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-emerald-600" />
                  <span className="font-bold text-slate-800">
                    {excelFileName ? excelFileName : 'Klik untuk Pilih Berkas Excel (.xlsx, .csv)'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Maksimal 500 baris data siswa sekaligus
                  </span>
                </label>
              </div>

              {parsedExcelStudents.length > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl font-medium">
                  ✓ Berhasil membaca <strong>{parsedExcelStudents.length} calon siswa</strong> dari file Excel. Klik konfirmasi untuk menambahkan ke sistem.
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmImport}
                  disabled={parsedExcelStudents.length === 0}
                  className={`px-5 py-2 rounded-xl font-bold text-white shadow-md flex items-center gap-1.5 ${
                    parsedExcelStudents.length > 0
                      ? 'bg-emerald-700 hover:bg-emerald-800 cursor-pointer'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi Simpan {parsedExcelStudents.length} Siswa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
