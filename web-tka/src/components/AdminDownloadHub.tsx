'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Users, 
  Briefcase, 
  Award, 
  BookOpen,
  Sparkles,
  Printer,
  FileCode
} from 'lucide-react';
import { 
  Student, 
  Teacher, 
  AttendanceRecord, 
  TeacherAttendanceRecord, 
  ExamResult, 
  ExamSimulation, 
  LearningMaterial,
  User 
} from '../types';

interface AdminDownloadHubProps {
  students: Student[];
  teachers: Teacher[];
  attendanceRecords: AttendanceRecord[];
  teacherAttendanceRecords: TeacherAttendanceRecord[];
  examResults: ExamResult[];
  exams: ExamSimulation[];
  materials: LearningMaterial[];
  currentUser: User;
  onOpenAuth?: () => void;
}

export const AdminDownloadHub: React.FC<AdminDownloadHubProps> = ({
  students,
  teachers,
  attendanceRecords,
  teacherAttendanceRecords,
  examResults,
  exams,
  materials,
  currentUser,
  onOpenAuth
}) => {
  const [downloadSuccessToast, setDownloadSuccessToast] = useState('');

  const showToast = (message: string) => {
    setDownloadSuccessToast(message);
    setTimeout(() => setDownloadSuccessToast(''), 3500);
  };

  // 1. Download Master 160 Siswa Terdaftar (.xlsx)
  const handleDownloadMasterSiswa = () => {
    const data = students.map((s, i) => ({
      'No': i + 1,
      'ID Siswa': s.id,
      'NIS Dummy': s.nisn,
      'Nama Inisial Siswa': s.name,
      'Kelas': s.classId,
      'Jurusan': s.major,
      'Username Dummy': s.email.split('@')[0],
      'Email Dummy': s.email,
      'Password Dummy': 'siswapass123',
      'Jenis Kelamin': s.gender === 'L' ? 'Laki-Laki' : 'Perempuan',
      'Sekolah': s.schoolName || 'SMK Negeri 1 Bandar Dua'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Master 160 Siswa');
    XLSX.writeFile(wb, `Master_160_Siswa_TKA_SMKN1BandarDua_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast(`Master Data ${students.length} Siswa (.xlsx) berhasil diunduh!`);
  };

  // 2. Download Master 31 Guru Pengajar (.xlsx)
  const handleDownloadMasterGuru = () => {
    const data = teachers.map((t, i) => ({
      'No': i + 1,
      'ID Guru': t.id,
      'Nama Inisial Guru': t.name,
      'Mata Pelajaran': t.subject,
      'NIP Dummy': t.nip,
      'Username Dummy': t.email.split('@')[0],
      'Email Dummy': t.email,
      'Password Dummy': `gurupass${(i + 1).toString().padStart(3, '0')}`,
      'Status': t.status === 'in_class' ? 'Sedang Mengajar' : 'Aktif',
      'No. WhatsApp': t.phone
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Master 31 Guru');
    XLSX.writeFile(wb, `Master_31_Guru_TKA_SMKN1BandarDua_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast(`Master Data ${teachers.length} Guru (.xlsx) berhasil diunduh!`);
  };

  // 3. Download Rekap Absensi Siswa
  const handleDownloadAbsensiSiswa = () => {
    const data = attendanceRecords.map((r, i) => ({
      No: i + 1,
      Tanggal: r.date,
      Waktu: r.time,
      NISN: r.nisn,
      'Nama Siswa': r.studentName,
      Kelas: r.classId,
      Jurusan: r.major,
      Sesi: r.session,
      Status: r.status.toUpperCase(),
      Catatan: r.notes || '-',
      'Pencatat Presensi': r.recordedBy
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rekap Absensi Siswa');
    XLSX.writeFile(wb, `Rekap_Absensi_Siswa_TKA_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('File Rekap Absensi Siswa (.xlsx) berhasil diunduh!');
  };

  // 4. Download Rekap Absensi Guru
  const handleDownloadAbsensiGuru = () => {
    const data = teacherAttendanceRecords.map((r, i) => ({
      No: i + 1,
      Tanggal: r.date,
      'Jam Check-in': r.checkInTime,
      'Nama Guru': r.teacherName,
      'Mata Pelajaran': r.subject,
      'Kelas yang Diajar': r.classId,
      Ruang: r.room,
      'Topik / Materi': r.topic,
      Status: r.status.toUpperCase(),
      'Jurnal Mengajar': r.notes || '-'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Absensi Guru');
    XLSX.writeFile(wb, `Rekap_Absensi_Guru_TKA_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('File Rekap Absensi Guru (.xlsx) berhasil diunduh!');
  };

  // 5. Download Rekap Nilai Ujian
  const handleDownloadRekapNilai = () => {
    const data = examResults.map((r, i) => ({
      No: i + 1,
      'Nama Paket Ujian': r.examTitle,
      'Mata Pelajaran': r.subject,
      NISN: r.studentNisn,
      'Nama Siswa': r.studentName,
      'Email Siswa': r.studentEmail,
      Kelas: r.classId,
      Jurusan: r.major,
      'Skor Akhir': r.score,
      'Benar': r.totalCorrect,
      'Salah': r.totalWrong,
      'Waktu Pengerjaan': `${Math.round(r.timeSpentSeconds / 60)} Menit`,
      'Waktu Submit': r.submittedAt,
      'Status Kelulusan': r.score >= 75 ? 'Tuntas' : 'Remedial'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rekap Nilai Siswa');
    XLSX.writeFile(wb, `Rekap_Nilai_CBT_TKA_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('File Rekap Nilai Simulasi Ujian (.xlsx) berhasil diunduh!');
  };

  // 6. Download Bank Materi Pelajaran
  const handleDownloadMateri = () => {
    const data = materials.map((m, i) => ({
      No: i + 1,
      'Judul Materi': m.title,
      Kategori: m.category,
      Tingkat: `Kelas ${m.gradeLevel}`,
      Tipe: m.type.toUpperCase(),
      'Durasi / Halaman': m.durationOrPages,
      Penyusun: m.author,
      Deskripsi: m.description,
      'Link Akses / Video / Classroom': m.url,
      'Status Akses': 'Terbuka / Terdaftar'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Katalog Materi TKA');
    XLSX.writeFile(wb, `Katalog_Materi_Interaktif_TKA_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('Katalog & Arsip Materi Pelajaran (.xlsx) berhasil diunduh!');
  };

  // 7. Download Soal dan Pembahasan Lengkap
  const handleDownloadSoalPembahasan = () => {
    const compiledRows: any[] = [];
    exams.forEach((exam) => {
      exam.questions.forEach((q) => {
        compiledRows.push({
          'Paket Ujian': exam.title,
          Kategori: exam.category,
          'No Soal': q.questionNumber,
          'Topik Materi': q.topic,
          'Teks Butir Soal': q.questionText,
          'Opsi A': q.options.find(o => o.key === 'A')?.text || '',
          'Opsi B': q.options.find(o => o.key === 'B')?.text || '',
          'Opsi C': q.options.find(o => o.key === 'C')?.text || '',
          'Opsi D': q.options.find(o => o.key === 'D')?.text || '',
          'Opsi E': q.options.find(o => o.key === 'E')?.text || '',
          'Kunci Jawaban': q.correctKey,
          'Pembahasan Lengkap': q.explanation
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(compiledRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Soal dan Pembahasan TKA');
    XLSX.writeFile(wb, `Bank_Soal_dan_Pembahasan_TKA_DisdikAceh_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('Bank Soal & Pembahasan Lengkap (.xlsx) berhasil diunduh!');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-cyan-100 text-cyan-800 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Pusat Unduh & Export Data Resmi (Khusus Admin & Guru)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fasilitas pengunduhan terintegrasi untuk Master Data 160 Siswa & 31 Guru, rekap absensi, rekapan nilai CBT, materi pembelajaran, dan bank soal
            </p>
          </div>

          {currentUser.role === 'admin' ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-600 text-white self-start md:self-auto shadow-xs">
              🛡️ Hak Akses Administrator Aktif
            </span>
          ) : currentUser.role === 'guru' ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-600 text-white self-start md:self-auto shadow-xs">
              👨‍🏫 Akses Guru Pengajar
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                🔒 Mode Preview (Belum Login Admin)
              </span>
              {onOpenAuth && (
                <button
                  onClick={onOpenAuth}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-xs transition-all"
                >
                  Masuk PIN Admin
                </button>
              )}
            </div>
          )}
        </div>

        {downloadSuccessToast && (
          <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccessToast}</span>
          </div>
        )}

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {/* Card 1: Master 160 Siswa */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Master Data 160 Siswa
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh master data lengkap 160 akun siswa peserta 7 kelas XII (TBSM, TKRO, TP, DPB, TKJ) berformat aman inisial.
              </p>
              <div className="text-[11px] font-semibold text-slate-500 mb-4">
                🎓 Total Data: <strong>{students.length} Siswa Terdaftar</strong>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleDownloadMasterSiswa}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Data Siswa (.xlsx)</span>
              </button>
              <a
                href="/data_160_siswa_tka.csv"
                download="data_160_siswa_tka.csv"
                className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Unduh Format CSV (.csv)</span>
              </a>
            </div>
          </div>

          {/* Card 2: Master 31 Guru */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Master Data 31 Guru Pengajar
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh master data lengkap 31 akun guru pengampu TKA malam hari berformat aman inisial dan mata pelajaran diampu.
              </p>
              <div className="text-[11px] font-semibold text-slate-500 mb-4">
                👨‍🏫 Total Data: <strong>{teachers.length} Guru Pengajar</strong>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleDownloadMasterGuru}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Data Guru (.xlsx)</span>
              </button>
              <a
                href="/data_31_guru_tka.csv"
                download="data_31_guru_tka.csv"
                className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Unduh Format CSV (.csv)</span>
              </a>
            </div>
          </div>

          {/* Card 3: Rekap Absensi Siswa */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Rekap Absensi Siswa
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh riwayat kehadiran siswa seluruh 7 kelas XII dan jurusan beserta rincian status (Hadir, Sakit, Izin, Alpa) dan catatan guru.
              </p>
              <div className="text-[11px] font-semibold text-slate-500 mb-4">
                📊 Total Data: <strong>{attendanceRecords.length} Catatan Presensi</strong>
              </div>
            </div>

            <button
              onClick={handleDownloadAbsensiSiswa}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Rekap Absensi (.xlsx)</span>
            </button>
          </div>

          {/* Card 4: Rekap Absensi & Jurnal Guru */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Rekap Absensi & Jurnal Guru
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh log jam mengajar guru pendamping, ruang kelas, mata pelajaran, materi pokok yang diajarkan, dan status presensi mengajar.
              </p>
              <div className="text-[11px] font-semibold text-slate-500 mb-4">
                👨‍🏫 Total Data: <strong>{teacherAttendanceRecords.length} Sesi Jurnal Mengajar</strong>
              </div>
            </div>

            <button
              onClick={handleDownloadAbsensiGuru}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Jurnal Guru (.xlsx)</span>
            </button>
          </div>

          {/* Card 5: Rekap Nilai Simulasi Ujian */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Rekap Nilai Simulasi Ujian
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh data lengkap skor CBT siswa, rincian butir benar/salah, peringkat per kelas, serta status kelulusan standar KKM.
              </p>
              <div className="text-[11px] font-semibold text-slate-500 mb-4">
                🎯 Total Data: <strong>{examResults.length} Lembar Hasil CBT</strong>
              </div>
            </div>

            <button
              onClick={handleDownloadRekapNilai}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Rekap Nilai (.xlsx)</span>
            </button>
          </div>

          {/* Card 6: Bank Soal & Pembahasan */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Bank Soal & Kunci Jawaban
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh kumpulan paket soal Pusmendik TKA SMK 2026 lengkap dengan opsi pilihan (A-E), kunci jawaban, dan pembahasan rinci.
              </p>
              <div className="text-[11px] font-semibold text-slate-500 mb-4">
                📚 Total Soal: <strong>{exams.reduce((acc, e) => acc + e.questions.length, 0)} Butir Soal Terstandar</strong>
              </div>
            </div>

            <button
              onClick={handleDownloadSoalPembahasan}
              className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Bank Soal (.xlsx)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
