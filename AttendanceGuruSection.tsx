'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Search, 
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  CheckSquare,
  Square,
  RefreshCw,
  Trash,
  Users
} from 'lucide-react';
import { Teacher, TeacherAttendanceRecord, User } from '../types';

interface AttendanceGuruSectionProps {
  teachers: Teacher[];
  teacherAttendanceRecords: TeacherAttendanceRecord[];
  currentUser: User;
  onRecordTeacherAttendance: (record: TeacherAttendanceRecord) => void;
  onEditTeacher?: (teacher: Teacher) => void;
  onDeleteTeacher?: (id: string) => void;
  onBulkDeleteTeachers?: (ids: string[]) => void;
  onBulkUpdateTeachers?: (teachers: Teacher[]) => void;
  isCloudConnected?: boolean | null;
}

export const AttendanceGuruSection: React.FC<AttendanceGuruSectionProps> = ({
  teachers,
  teacherAttendanceRecords,
  currentUser,
  onRecordTeacherAttendance,
  onEditTeacher,
  onDeleteTeacher,
  onBulkDeleteTeachers,
  onBulkUpdateTeachers,
  isCloudConnected
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    currentUser.role === 'guru' ? (teachers.find(t => t.email === currentUser.email)?.id || teachers[0]?.id || '') : teachers[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [checkInTime, setCheckInTime] = useState<string>(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');
  const [selectedClassId, setSelectedClassId] = useState('XII TBSM 1');
  const [room, setRoom] = useState('Bengkel Otomotif TBSM (Ruang Les XII TBSM 1)');
  const [subject, setSubject] = useState('KEJURUAN TBSM');
  const [topic, setTopic] = useState('Sistem Injeksi PGM-FI, Troubleshooting Kelistrikan Bodi & Servis Rutin Sepeda Motor');
  const [status, setStatus] = useState<'hadir' | 'izin' | 'pengganti'>('hadir');
  const [notes, setNotes] = useState('Seluruh siswa kelas XII TBSM 1 hadir dan aktif praktik pemecahan masalah');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTeacherQuery, setSearchTeacherQuery] = useState('');

  // Edit & Bulk states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editForm, setEditForm] = useState<Partial<Teacher>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState('');

  const currentTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTeacherQuery.toLowerCase()) ||
    t.nip.includes(searchTeacherQuery) ||
    t.subject.toLowerCase().includes(searchTeacherQuery.toLowerCase())
  );

  const allFilteredSelected = filteredTeachers.length > 0 && filteredTeachers.every(t => selectedIds.has(t.id));
  const toggleSelectAll = () => {
    const newSet = new Set(selectedIds);
    if (allFilteredSelected) filteredTeachers.forEach(t => newSet.delete(t.id));
    else filteredTeachers.forEach(t => newSet.add(t.id));
    setSelectedIds(newSet);
  };
  const toggleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) { alert('Pilih dulu guru yang mau dihapus!'); return; }
    if (!confirm(`Yakin hapus ${selectedIds.size} guru terpilih? Akan sinkron ke semua perangkat.`)) return;
    onBulkDeleteTeachers?.(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const handleDeleteAll = () => {
    if (!confirm(`Yakin HAPUS SEMUA ${filteredTeachers.length} guru di filter ini?`)) return;
    onBulkDeleteTeachers?.(filteredTeachers.map(t => t.id));
    setSelectedIds(new Set());
  };

  const handleForceSync = async () => {
    setIsSyncing(true);
    setSyncResult('');
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({key:'teachers', data: teachers})
      });
      const json = await res.json();
      if (json.success) setSyncResult(`✅ Sync Berhasil! ${teachers.length} guru tersimpan di cloud.`);
      else setSyncResult(`❌ Gagal: ${json.message || json.error}`);
    } catch (e:any) { setSyncResult(`❌ Error: ${e.message}`); }
    finally { setIsSyncing(false); setTimeout(()=>setSyncResult(''),4000); }
  };

  const handleClearAllCloud = async () => {
    if (!confirm('YAKIN HAPUS SEMUA DATA GURU DI CLOUD?')) return;
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({key:'teachers', data: []})});
      const json = await res.json();
      if (json.success) { onBulkUpdateTeachers?.([]); alert('Semua guru di cloud dihapus!'); }
    } finally { setIsSyncing(false); }
  };

  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setEditForm({ name: teacher.name, nip: teacher.nip, email: teacher.email, subject: teacher.subject, phone: teacher.phone });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingTeacher) return;
    const updated: Teacher = { ...editingTeacher, name: editForm.name || editingTeacher.name, nip: editForm.nip || editingTeacher.nip, email: editForm.email || editingTeacher.email, subject: editForm.subject || editingTeacher.subject, phone: editForm.phone || editingTeacher.phone };
    onEditTeacher?.(updated);
    setShowEditModal(false);
    setEditingTeacher(null);
  };

  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const record: TeacherAttendanceRecord = {
      id: `tatt-${Date.now()}`, date: selectedDate, checkInTime,
      teacherId: currentTeacher.id, teacherName: currentTeacher.name,
      subject, classId: selectedClassId, room, topic, status, notes, timestamp: Date.now()
    };
    onRecordTeacherAttendance(record);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const filteredRecords = teacherAttendanceRecords.filter(r => 
    r.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl"><Briefcase className="w-5 h-5" /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Master Data Guru & Absensi Mengajar</h3>
                <span className="text-xs text-emerald-700 font-semibold">{teachers.length} Guru | Pilih, Edit, Hapus Massal, Sync Cloud</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">Kelola 31 guru pengajar, edit data, hapus massal, dan sync ke database agar sinkron di semua perangkat.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleForceSync} disabled={isSyncing} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
              <RefreshCw className={`w-4 h-4 ${isSyncing?'animate-spin':''}`} /><span>{isSyncing?'Syncing...':`Sync ${teachers.length} Guru ke Cloud`}</span>
            </button>
          </div>
        </div>

        {syncResult && <div className={`mt-4 p-3 rounded-xl text-xs font-bold border ${syncResult.startsWith('✅')?'bg-blue-50 border-blue-200 text-blue-800':'bg-rose-50 border-rose-200 text-rose-800'}`}>{syncResult}</div>}

        {/* Master Guru Table with Bulk Actions */}
        <div className="mt-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" value={searchTeacherQuery} onChange={e=>setSearchTeacherQuery(e.target.value)} placeholder="Cari guru / NIP / mapel..." className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium w-64" />
              </div>
              <span className="text-xs font-bold bg-slate-100 px-3 py-2 rounded-xl border">{selectedIds.size} terpilih / {filteredTeachers.length} tampil</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={toggleSelectAll} className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${allFilteredSelected?'bg-emerald-600 text-white border-emerald-600':'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'}`}>
                {allFilteredSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}<span>{allFilteredSelected?'Batal Pilih':'Pilih Semua'}</span>
              </button>
              <button onClick={handleBulkDelete} disabled={selectedIds.size===0} className="px-3 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"><Trash2 className="w-4 h-4" /><span>Hapus Terpilih ({selectedIds.size})</span></button>
              <button onClick={handleDeleteAll} className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"><Trash className="w-4 h-4" /><span>Hapus Filter ({filteredTeachers.length})</span></button>
              <button onClick={handleClearAllCloud} className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">Hapus Semua Cloud</button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead><tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3.5 w-10 text-center"><button onClick={toggleSelectAll} className="p-1 hover:bg-slate-200 rounded">{allFilteredSelected ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}</button></th>
                <th className="p-3.5">NIP & Nama Guru</th><th className="p-3.5">Mapel & Kontak</th><th className="p-3.5">Status</th><th className="p-3.5 text-center">Aksi Admin</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map(t => {
                  const isSelected = selectedIds.has(t.id);
                  return (
                    <tr key={t.id} className={`hover:bg-slate-50 ${isSelected?'bg-amber-50/70':''}`}>
                      <td className="p-3.5 text-center"><button onClick={()=>toggleSelectOne(t.id)} className="p-1 hover:bg-slate-200 rounded">{isSelected ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}</button></td>
                      <td className="p-3.5"><div className="font-bold text-slate-900">{t.name}</div><div className="text-[11px] text-slate-500 font-mono">NIP: {t.nip}</div><div className="text-[11px] text-slate-500">{t.email}</div></td>
                      <td className="p-3.5"><span className="font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">{t.subject}</span><div className="text-[11px] text-slate-500 mt-1">{t.phone}</div></td>
                      <td className="p-3.5"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${t.status==='in_class'?'bg-blue-100 text-blue-800':t.status==='active'?'bg-emerald-100 text-emerald-800':'bg-slate-100 text-slate-600'}`}>{t.status}</span>{t.currentClass && <div className="text-[11px] text-slate-500 mt-1">{t.currentClass} - {t.currentRoom}</div>}</td>
                      <td className="p-3.5 text-center"><div className="flex items-center justify-center gap-1"><button onClick={()=>openEditModal(t)} className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200"><Pencil className="w-3.5 h-3.5" /></button><button onClick={()=>{ if(confirm(`Hapus guru ${t.name}?`)) onDeleteTeacher?.(t.id); }} className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
          <div className="mt-8 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5"><Plus className="w-4 h-4 text-emerald-700" /><span>Form Input Kehadiran & Jurnal Mengajar Guru</span></h4>
            {showSuccessToast && <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /><span>Absensi guru tercatat!</span></div>}
            <form onSubmit={handleSubmitAttendance} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Pilih Guru</label><select value={selectedTeacherId} onChange={e=>{ setSelectedTeacherId(e.target.value); const t=teachers.find(x=>x.id===e.target.value); if(t) setSubject(t.subject); }} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold">{teachers.map(t=><option key={t.id} value={t.id}>{t.name} (NIP: {t.nip})</option>)}</select></div>
                <div><label className="block font-bold mb-1">Tanggal</label><input type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} className="w-full p-2.5 bg-white border rounded-xl font-semibold" required /></div>
                <div><label className="block font-bold mb-1">Jam</label><input type="text" value={checkInTime} onChange={e=>setCheckInTime(e.target.value)} className="w-full p-2.5 bg-white border rounded-xl font-semibold" required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div><label className="block font-bold mb-1">Kelas</label><select value={selectedClassId} onChange={e=>setSelectedClassId(e.target.value)} className="w-full p-2.5 bg-white border rounded-xl font-semibold"><option value="XII TBSM 1">XII TBSM 1</option><option value="XII TBSM 2">XII TBSM 2</option><option value="XII TKJ 1">XII TKJ 1</option><option value="XII TKJ 2">XII TKJ 2</option><option value="XII TKR">XII TKR</option><option value="XII TP">XII TP</option><option value="XII DPB">XII DPB</option></select></div>
                <div><label className="block font-bold mb-1">Mapel</label><input type="text" value={subject} onChange={e=>setSubject(e.target.value)} className="w-full p-2.5 bg-white border rounded-xl font-semibold" required /></div>
                <div><label className="block font-bold mb-1">Ruang</label><input type="text" value={room} onChange={e=>setRoom(e.target.value)} className="w-full p-2.5 bg-white border rounded-xl font-semibold" required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2"><label className="block font-bold mb-1">Materi/Topik</label><input type="text" value={topic} onChange={e=>setTopic(e.target.value)} className="w-full p-2.5 bg-white border rounded-xl font-semibold" required /></div>
                <div><label className="block font-bold mb-1">Status</label><select value={status} onChange={(e:any)=>setStatus(e.target.value)} className="w-full p-2.5 bg-white border rounded-xl font-semibold"><option value="hadir">Hadir Mengajar</option><option value="izin">Izin</option><option value="pengganti">Pengganti</option></select></div>
              </div>
              <div><label className="block font-bold mb-1">Jurnal/Catatan</label><textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={2} className="w-full p-2.5 bg-white border rounded-xl font-medium" /></div>
              <div className="flex justify-end"><button type="submit" className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /><span>Simpan Absensi</span></button></div>
            </form>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between"><h4 className="text-sm font-bold text-slate-900">Riwayat Log Presensi & Jurnal Mengajar Guru</h4><div className="relative max-w-xs w-full"><Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Cari guru/mapel..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium" /></div></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200"><table className="w-full text-left border-collapse text-xs"><thead><tr className="bg-slate-100/80 font-bold border-b"><th className="p-3.5">Tanggal & Jam</th><th className="p-3.5">Nama Guru & Mapel</th><th className="p-3.5">Kelas & Ruang</th><th className="p-3.5">Materi</th><th className="p-3.5">Status</th><th className="p-3.5">Jurnal</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredRecords.map(r=><tr key={r.id} className="hover:bg-slate-50"><td className="p-3.5"><div className="font-bold">{r.date}</div><div className="text-[11px] text-emerald-700 font-semibold">{r.checkInTime}</div></td><td className="p-3.5"><div className="font-bold">{r.teacherName}</div><div className="text-[11px] text-slate-500">{r.subject}</div></td><td className="p-3.5"><span className="font-semibold bg-slate-100 px-2 py-0.5 rounded-md">{r.classId}</span><div className="text-[11px] text-slate-500 mt-0.5">{r.room}</div></td><td className="p-3.5 max-w-xs">{r.topic}</td><td className="p-3.5"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${r.status==='hadir'?'bg-emerald-100 text-emerald-800':'bg-amber-100 text-amber-800'}`}>{r.status}</span></td><td className="p-3.5 text-[11px] italic max-w-xs">{r.notes||'-'}</td></tr>)}</tbody></table></div>
      </div>

      {showEditModal && editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b"><div className="flex items-center gap-2"><Pencil className="w-5 h-5 text-blue-700" /><h3 className="text-base font-bold">Edit Data Guru</h3></div><button onClick={()=>setShowEditModal(false)}><X className="w-5 h-5 text-slate-400" /></button></div>
            <div className="grid grid-cols-1 gap-3 text-xs">
              <div><label className="font-bold">NIP</label><input value={editForm.nip||''} onChange={e=>setEditForm({...editForm, nip:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl" /></div>
              <div><label className="font-bold">Nama Lengkap</label><input value={editForm.name||''} onChange={e=>setEditForm({...editForm, name:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl" /></div>
              <div><label className="font-bold">Email</label><input value={editForm.email||''} onChange={e=>setEditForm({...editForm, email:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl" /></div>
              <div><label className="font-bold">Mapel</label><input value={editForm.subject||''} onChange={e=>setEditForm({...editForm, subject:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl" /></div>
              <div><label className="font-bold">No HP</label><input value={editForm.phone||''} onChange={e=>setEditForm({...editForm, phone:e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl" /></div>
            </div>
            <div className="flex gap-2 pt-3 border-t"><button onClick={()=>setShowEditModal(false)} className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={handleSaveEdit} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-1.5"><Save className="w-4 h-4" />Simpan</button></div>
          </div>
        </div>
      )}
    </div>
  );
};
