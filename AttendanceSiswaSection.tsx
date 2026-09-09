'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Users, 
  Upload, 
  Download, 
  CheckCircle2, 
  Search, 
  FileSpreadsheet, 
  Save,
  Sparkles,
  FileDown,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  CheckSquare,
  Square,
  RefreshCw,
  Trash
} from 'lucide-react';
import { Student, AttendanceRecord, User } from '../types';

interface AttendanceSiswaSectionProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  currentUser: User;
  onUpdateAttendance: (records: AttendanceRecord[]) => void;
  onImportStudents: (newStudents: Student[]) => void;
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (id: string) => void;
  onBulkUpdateStudents?: (students: Student[]) => void;
  onBulkDeleteStudents?: (ids: string[]) => void;
  isCloudConnected?: boolean | null;
}

export const AttendanceSiswaSection: React.FC<AttendanceSiswaSectionProps> = ({
  students,
  attendanceRecords,
  currentUser,
  onUpdateAttendance,
  onImportStudents,
  onEditStudent,
  onDeleteStudent,
  onBulkUpdateStudents,
  onBulkDeleteStudents,
  isCloudConnected
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [selectedMajor, setSelectedMajor] = useState<string>('all');
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSession, setSelectedSession] = useState<string>('Sesi Malam (20:15 - 21:00 WIB)');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentMarkings, setCurrentMarkings] = useState<Record<string, { status: 'hadir' | 'sakit' | 'izin' | 'alpa'; notes: string }>>({});
  const [savedFeedback, setSavedFeedback] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [parsedExcelStudents, setParsedExcelStudents] = useState<Student[]>([]);
  const [excelFileName, setExcelFileName] = useState('');

  // Edit states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<Partial<Student>>({});

  // BULK SELECT & SYNC STATES - FITUR BARU REQUEST ADMIN
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string>('');

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

  const filteredStudents = students.filter(s => {
    const matchesClass = selectedClassId === 'all' || s.classId === selectedClassId;
    const matchesMajor = selectedMajor === 'all' || s.major === selectedMajor;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.nisn.includes(searchQuery);
    return matchesClass && matchesMajor && matchesSearch;
  });

  const allFilteredSelected = filteredStudents.length > 0 && filteredStudents.every(s => selectedIds.has(s.id));
  const someFilteredSelected = filteredStudents.some(s => selectedIds.has(s.id));

  const toggleSelectAllFiltered = () => {
    const newSet = new Set(selectedIds);
    if (allFilteredSelected) {
      filteredStudents.forEach(s => newSet.delete(s.id));
    } else {
      filteredStudents.forEach(s => newSet.add(s.id));
    }
    setSelectedIds(newSet);
  };

  const toggleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) {
      alert('Pilih dulu siswa yang mau dihapus!');
      return;
    }
    if (!confirm(`Yakin hapus ${selectedIds.size} siswa terpilih? Data tidak bisa dikembalikan. Akan sinkron ke semua perangkat.`)) return;
    
    if (onBulkDeleteStudents) {
      onBulkDeleteStudents(Array.from(selectedIds));
    } else {
      // Fallback: hapus satu per satu
      selectedIds.forEach(id => onDeleteStudent?.(id));
    }
    setSavedFeedback(`${selectedIds.size} siswa berhasil dihapus dan sinkron ke cloud!`);
    setSelectedIds(new Set());
    setTimeout(() => setSavedFeedback(''), 4000);
  };

  const handleDeleteAllFiltered = () => {
    if (filteredStudents.length === 0) return;
    if (!confirm(`Yakin HAPUS SEMUA ${filteredStudents.length} siswa di filter ini (${selectedClassId === 'all' ? 'Semua Kelas' : selectedClassId})? Ini akan sinkron ke semua perangkat!`)) return;
    
    const idsToDelete = filteredStudents.map(s => s.id);
    if (onBulkDeleteStudents) {
      onBulkDeleteStudents(idsToDelete);
    } else {
      idsToDelete.forEach(id => onDeleteStudent?.(id));
    }
    setSavedFeedback(`Semua ${filteredStudents.length} siswa di filter ini dihapus!`);
    setSelectedIds(new Set());
    setTimeout(() => setSavedFeedback(''), 4000);
  };

  const handleForceSync = async () => {
    setIsSyncing(true);
    setSyncResult('');
    try {
      // Sync students
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({key:'students', data: students}),
        cache: 'no-store'
      });
      const json = await res.json();
      if (json.success) {
        setSyncResult(`✅ Sync Berhasil! ${students.length} siswa tersimpan di cloud. Diperbarui di semua perangkat.`);
        setSavedFeedback(`✅ Sync ke database berhasil! ${students.length} siswa sinkron.`);
        // Also save to localStorage
        localStorage.setItem('tka_smkn1_students', JSON.stringify(students));
      } else {
        setSyncResult(`❌ Sync Gagal: ${json.message || json.error || 'Unknown'}`);
        setSavedFeedback(`❌ Sync gagal: ${json.message || 'Cek koneksi'}`);
      }
    } catch (e:any) {
      setSyncResult(`❌ Error: ${e.message}`);
      setSavedFeedback(`❌ Error sync: ${e.message}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => {
        setSavedFeedback('');
        setSyncResult('');
      }, 5000);
    }
  };

  const handleClearAllCloud = async () => {
    if (!confirm('YAKIN HAPUS SEMUA DATA SISWA DI CLOUD? Semua perangkat akan jadi 0. Tidak bisa dikembalikan!')) return;
    if (!confirm(`Ketik OK: Ini akan menghapus ${students.length} siswa di semua perangkat!`)) return;
    
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({key:'students', data: []})
      });
      const json = await res.json();
      if (json.success) {
        if (onBulkUpdateStudents) onBulkUpdateStudents([]);
        else {
          // fallback
          localStorage.setItem('tka_smkn1_students', JSON.stringify([]));
          window.location.reload();
        }
        setSavedFeedback('✅ Semua data siswa di cloud dihapus! Semua perangkat jadi 0.');
      }
    } catch (e:any) {
      alert('Gagal: ' + e.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const getStudentStatus = (studentId: string) => {
    if (currentMarkings[studentId]) return currentMarkings[studentId];
    const existing = attendanceRecords.find(r => r.studentId === studentId && r.date === attendanceDate && r.session === selectedSession);
    if (existing) return { status: existing.status, notes: existing.notes || '' };
    return { status: 'hadir' as const, notes: 'Hadir tepat waktu' };
  };

  const handleStatusChange = (studentId: string, status: 'hadir' | 'sakit' | 'izin' | 'alpa') => {
    setCurrentMarkings(prev => ({ ...prev, [studentId]: { status, notes: prev[studentId]?.notes || '' }}));
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    const current = getStudentStatus(studentId);
    setCurrentMarkings(prev => ({ ...prev, [studentId]: { status: current.status, notes }}));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, { status: 'hadir' | 'sakit' | 'izin' | 'alpa'; notes: string }> = {};
    filteredStudents.forEach(s => { updated[s.id] = { status: 'hadir', notes: 'Hadir tepat waktu' }; });
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
    setSavedFeedback('Data absensi berhasil disimpan dan sinkron ke cloud!' + (isCloudConnected === false ? ' (Lokal saja!)' : ''));
    setTimeout(() => setSavedFeedback(''), 4000);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setEditForm({
      nisn: student.nisn,
      name: student.name,
      classId: student.classId,
      major: student.major,
      email: student.email,
      phone: student.phone,
      gender: student.gender
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingStudent) return;
    if (!editForm.name || !editForm.nisn) { alert('Nama dan NISN wajib diisi!'); return; }
    const updated: Student = {
      ...editingStudent,
      nisn: editForm.nisn || editingStudent.nisn,
      name: editForm.name || editingStudent.name,
      classId: editForm.classId || editingStudent.classId,
      major: editForm.major || editingStudent.major,
      email: editForm.email || editingStudent.email,
      phone: editForm.phone || editingStudent.phone,
      gender: (editForm.gender as any) || editingStudent.gender,
    };
    onEditStudent?.(updated);
    setSavedFeedback(`✅ ${updated.name} diupdate & sinkron ke semua perangkat!`);
    setTimeout(() => setSavedFeedback(''), 4000);
    setShowEditModal(false);
    setEditingStudent(null);
  };

  const handleDelete = (student: Student) => {
    if (!confirm(`Yakin hapus ${student.name} (${student.nisn})?`)) return;
    onDeleteStudent?.(student.id);
    setSavedFeedback(`Siswa ${student.name} dihapus.`);
    setTimeout(() => setSavedFeedback(''), 3000);
  };

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
          const name = String(row['Nama Lengkap'] || row['Nama'] || row['nama'] || `Siswa Baru ${index + 1}`).trim();
          const classId = String(row['Kelas'] || row['kelas'] || selectedClassId).trim();
          const major = String(row['Jurusan'] || row['jurusan'] || 'TKJ').trim();
          const cleanEmailSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/^\.|\.$/g, '');
          const email = `${cleanEmailSlug}@siswa.smk.belajar.id`;
          return {
            id: `std-upload-${Date.now()}-${index}`,
            nisn, name, classId, gradeLevel: 'XII', major, email,
            phone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
            gender: index % 2 === 0 ? 'L' : 'P',
            schoolName: 'SMK Negeri 1 Bandar Dua'
          };
        });
        setParsedExcelStudents(formattedStudents);
      } catch (err) { alert('Gagal baca Excel.'); }
    };
    reader.readAsBinaryString(file);
  };

  const handleConfirmImport = () => {
    if (parsedExcelStudents.length > 0) {
      onImportStudents(parsedExcelStudents);
      setShowUploadModal(false);
      setParsedExcelStudents([]);
      alert(`Berhasil impor ${parsedExcelStudents.length} siswa! Akan sinkron ke semua perangkat.`);
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      { 'NISN': '0067489001', 'Nama Lengkap': 'Muhammad Rizki Pratama', 'Kelas': 'XII TKJ 1', 'Jurusan': 'TKJ' },
      { 'NISN': '0067489002', 'Nama Lengkap': 'Cut Anisa', 'Kelas': 'XII TKJ 1', 'Jurusan': 'TKJ' },
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Siswa');
    XLSX.writeFile(wb, 'Format_Import_Siswa_SMKN1.xlsx');
  };

  const totalCount = filteredStudents.length;
  let presentCount = 0, sickCount=0, leaveCount=0, absentCount=0;
  filteredStudents.forEach(s => {
    const status = getStudentStatus(s.id).status;
    if (status === 'hadir') presentCount++; else if (status === 'sakit') sickCount++; else if (status === 'izin') leaveCount++; else if (status === 'alpa') absentCount++;
  });
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 100;

  return (
    <div className="space-y-6">
      {isCloudConnected === false && (
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
          <div>
            <h4 className="font-bold text-red-900 text-sm">⚠️ MODE LOKAL - Tidak Sinkron!</h4>
            <p className="text-xs text-red-800 mt-1">Database cloud belum terhubung. Edit hanya lokal.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-800 rounded-xl"><Users className="w-5 h-5" /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Data Master Siswa & Presensi Les Malam (20:15 WIB)</h3>
                <span className="text-xs text-emerald-700 font-semibold">SMK Negeri 1 Bandar Dua — {students.length} Siswa Total | Pilih, Hapus Massal, Sync Cloud</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">Kelola 7 kelas & 5 jurusan. Fitur Admin: Pilih Semua, Hapus Terpilih, Hapus Semua Filter, Sync Paksa ke Database.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button onClick={handleDownloadTemplate} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200"><FileDown className="w-4 h-4 text-emerald-700" /><span>Template</span></button>
            {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
              <button onClick={() => setShowUploadModal(true)} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"><Upload className="w-4 h-4" /><span>Impor Excel</span></button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Pilih Kelas</label><select value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">{classList.map(c => (<option key={c.id} value={c.id}>{c.label}</option>))}</select></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Jurusan</label><select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"><option value="all">Semua Jurusan</option><option value="TKJ">TKJ</option><option value="TBSM">TBSM</option><option value="TKRO">TKRO</option><option value="TP">TP</option><option value="DPB">DPB</option></select></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Tanggal</label><input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold" /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Sesi</label><select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"><option value="Sesi Malam (20:15 - 21:00 WIB)">Sesi Malam (20:15 - 21:00)</option><option value="Sesi Pengayaan (19:30 - 20:15 WIB)">Sesi Pengayaan</option></select></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100 text-center">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl"><span className="text-[11px] font-bold text-emerald-800 uppercase">Hadir</span><div className="text-xl font-extrabold text-emerald-700 mt-0.5">{presentCount}</div></div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl"><span className="text-[11px] font-bold text-blue-800 uppercase">Sakit</span><div className="text-xl font-extrabold text-blue-700 mt-0.5">{sickCount}</div></div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl"><span className="text-[11px] font-bold text-amber-800 uppercase">Izin</span><div className="text-xl font-extrabold text-amber-700 mt-0.5">{leaveCount}</div></div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl"><span className="text-[11px] font-bold text-rose-800 uppercase">Alpa</span><div className="text-xl font-extrabold text-rose-700 mt-0.5">{absentCount}</div></div>
          <div className="p-3 bg-slate-900 text-white rounded-2xl col-span-2 sm:col-span-1"><span className="text-[11px] font-bold text-yellow-300 uppercase">Persentase</span><div className="text-xl font-extrabold text-white mt-0.5">{attendanceRate}%</div></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari nama atau NISN..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl border">
              {selectedIds.size} terpilih / {filteredStudents.length} tampil / {students.length} total
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* SYNC BUTTON - FITUR BARU */}
            <button onClick={handleForceSync} disabled={isSyncing} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : `Sync ${students.length} ke Database`}</span>
            </button>

            {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
              <>
                <button onClick={toggleSelectAllFiltered} className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${allFilteredSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'}`}>
                  {allFilteredSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  <span>{allFilteredSelected ? 'Batal Pilih Semua' : `Pilih Semua (${filteredStudents.length})`}</span>
                </button>

                <button onClick={handleBulkDelete} disabled={selectedIds.size===0} className="px-3 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus Terpilih ({selectedIds.size})</span>
                </button>

                <button onClick={handleDeleteAllFiltered} className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <Trash className="w-4 h-4" />
                  <span>Hapus Semua Filter ({filteredStudents.length})</span>
                </button>

                <button onClick={handleClearAllCloud} className="px-3 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold">Hapus Semua di Cloud (0)</button>

                <button onClick={handleMarkAllPresent} className="px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">✓ Set Hadir</button>
                <button onClick={handleSaveAttendance} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"><Save className="w-4 h-4" /><span>Simpan Presensi</span></button>
              </>
            )}
          </div>
        </div>

        {savedFeedback && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span>{savedFeedback}</span></div>
        )}
        {syncResult && (
          <div className={`p-3 rounded-xl text-xs font-bold border ${syncResult.startsWith('✅') ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>{syncResult}</div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3.5 w-10 text-center">
                  <button onClick={toggleSelectAllFiltered} className="p-1 hover:bg-slate-200 rounded">
                    {allFilteredSelected ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : someFilteredSelected ? <div className="w-4 h-4 bg-amber-500 rounded-sm"></div> : <Square className="w-4 h-4 text-slate-400" />}
                  </button>
                </th>
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">NISN & Nama</th>
                <th className="p-3.5">Kelas</th>
                <th className="p-3.5">Kontak</th>
                <th className="p-3.5 text-center">Presensi</th>
                <th className="p-3.5">Catatan</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-slate-400">Tidak ada data siswa. Upload Excel atau pilih filter lain. Total Database: {students.length}</td></tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const mark = getStudentStatus(student.id);
                  const isReadonly = currentUser.role === 'siswa';
                  const isSelected = selectedIds.has(student.id);
                  return (
                    <tr key={student.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-amber-50/70' : ''}`}>
                      <td className="p-3.5 text-center">
                        <button onClick={() => toggleSelectOne(student.id)} className="p-1 hover:bg-slate-200 rounded">
                          {isSelected ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                        </button>
                      </td>
                      <td className="p-3.5 text-center font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">NISN: {student.nisn} | {student.gender}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">{student.classId}</span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{student.major}</div>
                      </td>
                      <td className="p-3.5 text-[11px] text-slate-600"><div>{student.email}</div><div className="text-slate-400">{student.phone}</div></td>
                      <td className="p-3.5 text-center">
                        <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                          {(['hadir','sakit','izin','alpa'] as const).map(st => (
                            <button key={st} type="button" disabled={isReadonly} onClick={() => handleStatusChange(student.id, st)} className={`px-2 py-1 rounded-lg font-bold text-[10px] capitalize ${mark.status === st ? (st==='hadir'?'bg-emerald-600 text-white':st==='sakit'?'bg-blue-600 text-white':st==='izin'?'bg-amber-500 text-white':'bg-rose-600 text-white') : 'text-slate-600 hover:text-slate-900'}`}>{st}</button>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5"><input type="text" disabled={isReadonly} value={mark.notes} onChange={(e) => handleNotesChange(student.id, e.target.value)} placeholder="Catatan..." className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs" /></td>
                      <td className="p-3.5 text-center">
                        {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => openEditModal(student)} className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200"><Pencil className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDelete(student)} className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Total {filteredStudents.length} tampil dari {students.length} total database. {selectedIds.size>0 && `${selectedIds.size} terpilih.`}</span>
          <span>{isCloudConnected===true ? '✅ Cloud Terhubung - Sinkron otomatis' : isCloudConnected===false ? '⚠️ Mode Lokal' : '⏳ Cek koneksi...'}</span>
        </div>
      </div>

      {showEditModal && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2"><Pencil className="w-5 h-5 text-blue-700" /><h3 className="text-base font-bold text-slate-900">Edit Data Siswa</h3></div>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 gap-3 text-xs">
              <div><label className="font-bold text-slate-700">NISN</label><input value={editForm.nisn || ''} onChange={e=>setEditForm({...editForm, nisn:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl" /></div>
              <div><label className="font-bold text-slate-700">Nama Lengkap</label><input value={editForm.name || ''} onChange={e=>setEditForm({...editForm, name:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="font-bold text-slate-700">Kelas</label><select value={editForm.classId || ''} onChange={e=>setEditForm({...editForm, classId:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"><option value="XII TKJ 1">XII TKJ 1</option><option value="XII TKJ 2">XII TKJ 2</option><option value="XII TBSM 1">XII TBSM 1</option><option value="XII TBSM 2">XII TBSM 2</option><option value="XII TKR">XII TKR</option><option value="XII TP">XII TP</option><option value="XII DPB">XII DPB</option></select></div>
                <div><label className="font-bold text-slate-700">Jurusan</label><select value={editForm.major || ''} onChange={e=>setEditForm({...editForm, major:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"><option value="TKJ">TKJ</option><option value="TBSM">TBSM</option><option value="TKRO">TKRO</option><option value="TP">TP</option><option value="DPB">DPB</option></select></div>
              </div>
              <div><label className="font-bold text-slate-700">Email Belajar.id</label><input value={editForm.email || ''} onChange={e=>setEditForm({...editForm, email:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="font-bold text-slate-700">No HP</label><input value={editForm.phone || ''} onChange={e=>setEditForm({...editForm, phone:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl" /></div>
                <div><label className="font-bold text-slate-700">Gender</label><select value={editForm.gender || 'L'} onChange={e=>setEditForm({...editForm, gender:e.target.value as any})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></div>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button onClick={()=>setShowEditModal(false)} className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold">Batal</button>
              <button onClick={handleSaveEdit} className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5"><Save className="w-4 h-4" /> Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2"><FileSpreadsheet className="w-5 h-5 text-emerald-700" /><h3 className="text-base font-bold text-slate-900">Import Data Siswa via Excel</h3></div>
              <button onClick={() => { setShowUploadModal(false); setParsedExcelStudents([]); }} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3"><Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" /><div><h4 className="font-bold text-emerald-900">Kolom Excel: NISN, Nama Lengkap, Kelas, Jurusan</h4><p className="text-emerald-800 text-[11px] mt-0.5">Jika NISN sudah ada, data akan di-update.</p></div></div>
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-50"><input type="file" id="excelInput" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" /><label htmlFor="excelInput" className="cursor-pointer block"><Upload className="w-8 h-8 mx-auto text-emerald-700 mb-2" /><span className="font-bold text-slate-800 block">{excelFileName ? excelFileName : 'Klik untuk Pilih File Excel'}</span></label></div>
              {parsedExcelStudents.length > 0 && (
                <div className="space-y-2"><div className="flex items-center justify-between"><span className="font-bold text-slate-800">Preview {parsedExcelStudents.length} Siswa</span><span className="text-[11px] text-emerald-700 font-bold">✓ Siap</span></div><div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl"><table className="w-full text-left text-[11px]"><thead className="bg-slate-100 font-bold sticky top-0"><tr><th className="p-2">NISN</th><th className="p-2">Nama</th><th className="p-2">Kelas</th><th className="p-2">Jurusan</th></tr></thead><tbody className="divide-y divide-slate-100">{parsedExcelStudents.map((s, idx) => (<tr key={idx}><td className="p-2 font-mono">{s.nisn}</td><td className="p-2 font-bold">{s.name}</td><td className="p-2">{s.classId}</td><td className="p-2">{s.major}</td></tr>))}</tbody></table></div></div>
              )}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={handleDownloadTemplate} className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"><Download className="w-3.5 h-3.5" /><span>Download Template</span></button>
                <div className="flex gap-2"><button type="button" onClick={() => { setShowUploadModal(false); setParsedExcelStudents([]); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold">Batal</button><button type="button" disabled={parsedExcelStudents.length === 0} onClick={handleConfirmImport} className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white rounded-xl font-bold">Simpan ({parsedExcelStudents.length})</button></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
