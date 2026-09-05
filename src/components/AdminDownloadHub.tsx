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
  Printer
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

  // 1. Download Rekap Absensi Siswa
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

  // 2. Download Rekap Absensi Guru
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

  // 3. Download Rekap Nilai Ujian
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

  // 4. Download Bank Materi Pelajaran
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
      'Link Akses / Classroom': m.url,
      'Kode Kelas': m.classroomCode || 'embrt4ws'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Katalog Materi TKA');
    XLSX.writeFile(wb, `Katalog_Materi_Interaktif_TKA_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('Katalog & Arsip Materi Pelajaran (.xlsx) berhasil diunduh!');
  };

  // 5. Download Soal dan Pembahasan Lengkap
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
              Fasilitas pengunduhan terintegrasi untuk rekap absensi, rekapan nilai CBT, materi pembelajaran, serta bank soal dan pembahasan lengkap
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

        {/* 5 Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {/* 1. Rekap Absensi Siswa */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Rekap Absensi Siswa
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh riwayat kehadiran siswa seluruh kelas (X, XI, XII) dan jurusan beserta rincian status (Hadir, Sakit, Izin, Alpa) dan catatan guru.
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

          {/* 2. Rekap Absensi Guru */}
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

          {/* 3. Rekap Nilai Simulasi Ujian */}
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

          {/* 4. Bank Materi & Modul */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Katalog Materi Pelajaran
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh daftar materi, link modul Google Classroom [embrt4ws], slide interaktif, dan video pembelajaran kurikulum TKA Aceh.
              </p>
              <div className="text-[11px] font-semibold text-slate-500 mb-4">
                📚 Total Data: <strong>{materials.length} Modul & Media Terdaftar</strong>
              </div>
            </div>

            <button
              onClick={handleDownloadMateri}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Katalog Materi (.xlsx)</span>
            </button>
          </div>

          {/* 5. Bank Soal dan Pembahasan */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover-effect lg:col-span-2">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Bank Soal dan Pembahasan Lengkap TKA
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Unduh master naskah soal simulasi beserta pilihan jawaban A-E, kunci jawaban resmi, dan pembahasan langkah demi langkah (solusi HOTS).
              </p>
              <div className="text-[11px] font-semibold text-slate-500 mb-4">
                📝 Total Data: <strong>{exams.reduce((acc, curr) => acc + curr.questions.length, 0)} Butir Soal & Kunci Solusi</strong>
              </div>
            </div>

            <button
              onClick={handleDownloadSoalPembahasan}
              className="w-full py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Bank Soal & Pembahasan Lengkap (.xlsx)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
