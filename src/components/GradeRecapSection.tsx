'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  FileSpreadsheet, 
  Trophy, 
  TrendingUp, 
  Search, 
  Download, 
  Filter, 
  Award, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  Eye
} from 'lucide-react';
import { ExamResult, User } from '../types';

interface GradeRecapSectionProps {
  examResults: ExamResult[];
  currentUser: User;
  onNavigateToExam?: () => void;
}

export const GradeRecapSection: React.FC<GradeRecapSectionProps> = ({
  examResults,
  currentUser,
  onNavigateToExam
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalResult, setActiveModalResult] = useState<ExamResult | null>(null);

  // Filter results
  const filteredResults = examResults.filter((r) => {
    const matchesClass = selectedClass === 'all' || r.classId === selectedClass;
    const matchesSubject = selectedSubject === 'all' || r.subject === selectedSubject;
    const matchesSearch = 
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentNisn.includes(searchQuery) ||
      r.examTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  // Sort by score descending for ranking
  const rankedResults = [...filteredResults].sort((a, b) => b.score - a.score);

  // Calculate statistics
  const totalSubmissions = rankedResults.length;
  const averageScore = totalSubmissions > 0 
    ? Math.round(rankedResults.reduce((acc, curr) => acc + curr.score, 0) / totalSubmissions)
    : 0;
  const highestScore = totalSubmissions > 0 ? Math.max(...rankedResults.map(r => r.score)) : 0;
  const lowestScore = totalSubmissions > 0 ? Math.min(...rankedResults.map(r => r.score)) : 0;
  const passCount = rankedResults.filter(r => r.score >= 75).length;
  const passRate = totalSubmissions > 0 ? Math.round((passCount / totalSubmissions) * 100) : 0;

  // Export to Excel handler
  const handleExportExcel = () => {
    const exportData = rankedResults.map((r, idx) => ({
      'Peringkat (Rank)': idx + 1,
      'NISN Siswa': r.studentNisn,
      'Nama Lengkap': r.studentName,
      'Akun Belajar.id': r.studentEmail,
      'Kelas': r.classId,
      'Jurusan': r.major,
      'Ujian / Mapel': r.examTitle,
      'Skor Akhir': r.score,
      'Jawaban Benar': r.totalCorrect,
      'Jawaban Salah': r.totalWrong,
      'Status Kelulusan': r.score >= 75 ? 'Lulus (Memenuhi KKM)' : 'Belum Memenuhi KKM',
      'Waktu Pengerjaan': `${Math.round(r.timeSpentSeconds / 60)} menit`,
      'Tanggal Submit': r.submittedAt
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rekap Nilai TKA');
    XLSX.writeFile(wb, `Rekap_Nilai_Simulasi_TKA_DisdikAceh_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-xl">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Rekapan Nilai & Peringkat Simulasi Ujian TKA
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Hasil evaluasi pengerjaan CBT peserta bimbingan belajar TKA se-Provinsi Aceh
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Nilai ke Excel (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200 rounded-2xl p-4 text-center">
            <span className="text-[11px] font-bold text-amber-900 uppercase">Nilai Tertinggi</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-1">
              {highestScore}
            </div>
            <span className="text-[10px] text-amber-800/80 mt-0.5 block">Skor Maksimal</span>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200 rounded-2xl p-4 text-center">
            <span className="text-[11px] font-bold text-emerald-900 uppercase">Rata-rata Kelas</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">
              {averageScore}
            </div>
            <span className="text-[10px] text-emerald-800/80 mt-0.5 block">Dari {totalSubmissions} Peserta</span>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/60 border border-blue-200 rounded-2xl p-4 text-center">
            <span className="text-[11px] font-bold text-blue-900 uppercase">Kelulusan KKM (≥75)</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 mt-1">
              {passRate}%
            </div>
            <span className="text-[10px] text-blue-800/80 mt-0.5 block">{passCount} Siswa Tuntas</span>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-4 text-center">
            <span className="text-[11px] font-bold text-slate-700 uppercase">Total Ujian Selesai</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
              {totalSubmissions}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Lembar Jawaban Masuk</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Filter Rombel / Kelas</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
            >
              <option value="all">Semua Kelas</option>
              <option value="XII-MIPA-1">Kelas XII MIPA 1</option>
              <option value="XII-MIPA-2">Kelas XII MIPA 2</option>
              <option value="XII-IPS-1">Kelas XII IPS 1</option>
              <option value="XI-MIPA-1">Kelas XI MIPA 1</option>
              <option value="X-1">Kelas X 1</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Filter Mata Ujian</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
            >
              <option value="all">Semua Mata Pelajaran</option>
              <option value="Penalaran Matematika">Penalaran Matematika</option>
              <option value="TPS">TPS Skolastik</option>
              <option value="Literasi Bahasa">Literasi Bahasa</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Cari Nama / NISN</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama siswa..."
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Tabel Peringkat & Rekapitulasi Nilai Siswa</span>
          </h4>
          <span className="text-xs text-slate-500 font-medium">
            Menampilkan {rankedResults.length} Rekapitulasi
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3.5 w-16 text-center">Rank</th>
                <th className="p-3.5">NISN & Nama Siswa</th>
                <th className="p-3.5">Kelas</th>
                <th className="p-3.5">Paket Ujian</th>
                <th className="p-3.5 text-center">Skor Akhir</th>
                <th className="p-3.5 text-center">B / S</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rankedResults.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    Belum ada data rekapan nilai untuk filter ini. Silakan kerjakan simulasi terlebih dahulu.
                  </td>
                </tr>
              ) : (
                rankedResults.map((res, idx) => {
                  const rank = idx + 1;
                  const isPassed = res.score >= 75;

                  return (
                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 text-center">
                        {rank === 1 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black shadow-xs">
                            🥇
                          </span>
                        ) : rank === 2 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black shadow-xs">
                            🥈
                          </span>
                        ) : rank === 3 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white font-black shadow-xs">
                            🥉
                          </span>
                        ) : (
                          <span className="font-bold text-slate-500">#{rank}</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{res.studentName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          NISN: {res.studentNisn} | <span className="text-emerald-700">{res.studentEmail}</span>
                        </div>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {res.classId}
                      </td>
                      <td className="p-3.5 font-medium text-slate-700 max-w-xs">
                        <div className="truncate">{res.examTitle}</div>
                        <span className="text-[10px] text-slate-400">{res.submittedAt}</span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-base font-black text-slate-900">
                          {res.score}
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-semibold text-slate-600">
                        <span className="text-emerald-700">{res.totalCorrect} B</span> / <span className="text-rose-600">{res.totalWrong} S</span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isPassed ? 'TUNTAS KKM' : 'REMEDIAL'}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => setActiveModalResult(res)}
                          className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg transition-colors cursor-pointer"
                          title="Lihat Detail Jawaban"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Jawaban Siswa */}
      {activeModalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Lembar Hasil CBT: {activeModalResult.studentName}
              </h3>
              <button
                onClick={() => setActiveModalResult(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-2">
                <div>NISN: <strong>{activeModalResult.studentNisn}</strong></div>
                <div>Kelas: <strong>{activeModalResult.classId} ({activeModalResult.major})</strong></div>
                <div>Paket: <strong>{activeModalResult.examTitle}</strong></div>
                <div>Skor: <strong className="text-emerald-700 text-sm font-black">{activeModalResult.score} / 100</strong></div>
                <div>Waktu: <strong>{Math.round(activeModalResult.timeSpentSeconds / 60)} Menit</strong></div>
                <div>Waktu Selesai: <strong>{activeModalResult.submittedAt}</strong></div>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 mb-2">Jawaban Siswa per Butir Soal:</h5>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(activeModalResult.answers).map(([qid, ansKey], i) => (
                    <div key={qid} className="p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-center min-w-[70px]">
                      <span className="text-[10px] text-slate-500 block">Soal #{i + 1}</span>
                      <span className="font-black text-sm text-slate-900">Opsi {ansKey}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  onClick={() => setActiveModalResult(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-xl"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
