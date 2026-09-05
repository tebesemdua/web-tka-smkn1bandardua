'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Bookmark, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  Check, 
  AlertCircle,
  Play,
  ListOrdered,
  ExternalLink,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { ExamSimulation, ExamResult, User } from '../types';

interface ExamSimulationSectionProps {
  exams: ExamSimulation[];
  currentUser: User;
  onSaveExamResult: (result: ExamResult) => void;
  onNavigateToRekap: () => void;
}

export const ExamSimulationSection: React.FC<ExamSimulationSectionProps> = ({
  exams,
  currentUser,
  onSaveExamResult,
  onNavigateToRekap
}) => {
  const [selectedExam, setSelectedExam] = useState<ExamSimulation | null>(null);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [examCompletedResult, setExamCompletedResult] = useState<ExamResult | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const PUSMENDIK_URL = 'https://pusmendik.kemendikdasmen.go.id/';

  // Timer Effect
  useEffect(() => {
    if (!isExamRunning || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamRunning, timeLeftSeconds]);

  const handleStartExam = (exam: ExamSimulation) => {
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeftSeconds(exam.durationMinutes * 60);
    setExamCompletedResult(null);
    setIsExamRunning(true);
  };

  const handleSelectOption = (questionId: string, optionKey: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleFinishExam = () => {
    if (!selectedExam) return;

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    selectedExam.questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans) {
        skippedCount++;
      } else if (ans === q.correctKey) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const totalQ = selectedExam.questions.length;
    const finalScore = Math.round((correctCount / totalQ) * 100);
    const timeSpent = selectedExam.durationMinutes * 60 - timeLeftSeconds;

    const result: ExamResult = {
      id: `res-${Date.now()}`,
      examId: selectedExam.id,
      examTitle: selectedExam.title,
      subject: selectedExam.category,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentNisn: currentUser.nisn || '0067400001',
      studentEmail: currentUser.email,
      classId: currentUser.classId || 'XII TKJ 1',
      major: currentUser.major || 'TKJ',
      score: finalScore,
      totalCorrect: correctCount,
      totalWrong: wrongCount,
      totalSkipped: skippedCount,
      totalQuestions: totalQ,
      timeSpentSeconds: timeSpent,
      submittedAt: new Date().toLocaleString('id-ID'),
      answers: userAnswers
    };

    onSaveExamResult(result);
    setExamCompletedResult(result);
    setIsExamRunning(false);
    setShowConfirmSubmit(false);

    // Confetti celebration!
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 1. CBT Exam Active Runner View
  if (isExamRunning && selectedExam) {
    const currentQ = selectedExam.questions[currentQuestionIndex];
    const isAnswered = !!userAnswers[currentQ.id];
    const isFlagged = !!flaggedQuestions[currentQ.id];

    return (
      <div className="space-y-4 max-w-5xl mx-auto animate-fadeIn">
        {/* Exam Header Strip */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-20 z-30 border border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-yellow-400 bg-yellow-400/20 px-2.5 py-0.5 rounded-full">
              {selectedExam.category}
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-white mt-1">
              {selectedExam.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Timer Box */}
            <div className="bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-sm font-mono font-black text-amber-300">
                {formatTimer(timeLeftSeconds)}
              </div>
            </div>

            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow transition-all cursor-pointer"
            >
              Selesai Ujian
            </button>
          </div>
        </div>

        {/* Question Area & Navigation Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Question Display */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-sm">
                  {currentQuestionIndex + 1}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  dari {selectedExam.questions.length} Soal ({currentQ.topic})
                </span>
              </div>

              <button
                onClick={() => handleToggleFlag(currentQ.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isFlagged
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>{isFlagged ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              {currentQ.questionText}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(currentQ.id, opt.key)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm mt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentQuestionIndex < selectedExam.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(selectedExam.questions.length - 1, prev + 1))}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-green-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Kirim Jawaban Akhir</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Question Palette Grid */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-emerald-700" />
              <span>Nomor Soal CBT</span>
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {selectedExam.questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const flagged = flaggedQuestions[q.id];
                const isCurrent = currentQuestionIndex === idx;

                let btnBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (flagged) {
                  btnBg = 'bg-amber-400 text-slate-950 font-bold';
                } else if (ans) {
                  btnBg = 'bg-emerald-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${btnBg} ${
                      isCurrent ? 'ring-2 ring-offset-2 ring-slate-800 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600"></span>
                <span>Sudah Dijawab ({Object.keys(userAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-400"></span>
                <span>Ragu-ragu ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-200"></span>
                <span>Belum Dijawab ({selectedExam.questions.length - Object.keys(userAnswers).length})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Confirm Submit */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <HelpCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Kirim Lembar Jawaban Ujian?
              </h3>
              <p className="text-xs text-slate-600">
                Anda telah menjawab <strong>{Object.keys(userAnswers).length}</strong> dari <strong>{selectedExam.questions.length}</strong> soal. 
                Pastikan Anda telah memeriksa kembali jawaban sebelum mengakhiri sesi ujian.
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Kembali Periksa
                </button>
                <button
                  onClick={handleFinishExam}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Ya, Kirim Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. Exam Completed & Pembahasan Soal View
  if (examCompletedResult && selectedExam) {
    const isPassed = examCompletedResult.score >= selectedExam.passingGrade;

    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
        {/* Score Summary Card */}
        <div className={`rounded-3xl p-6 sm:p-8 text-center text-white shadow-xl relative overflow-hidden ${
          isPassed ? 'bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900' : 'bg-gradient-to-br from-slate-800 to-slate-900'
        }`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Hasil Simulasi Ujian TKA</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            {selectedExam.title}
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Peserta: {currentUser.name} ({currentUser.email})
          </p>

          <div className="my-6 inline-block bg-white/10 backdrop-blur-md px-8 py-5 rounded-3xl border border-white/20">
            <span className="text-xs uppercase font-bold text-yellow-300 tracking-wider block">
              Nilai Skor CBT
            </span>
            <div className="text-5xl sm:text-6xl font-black text-yellow-400 mt-1">
              {examCompletedResult.score}
            </div>
            <span className="text-xs text-white/80 font-medium">
              Passing Grade KKM: {selectedExam.passingGrade}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto text-center">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
              <span className="text-xs text-emerald-200 font-semibold">Benar</span>
              <div className="text-xl font-bold text-emerald-300">{examCompletedResult.totalCorrect}</div>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
              <span className="text-xs text-rose-200 font-semibold">Salah</span>
              <div className="text-xl font-bold text-rose-300">{examCompletedResult.totalWrong}</div>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
              <span className="text-xs text-slate-200 font-semibold">Waktu</span>
              <div className="text-xl font-bold text-yellow-200">
                {Math.round(examCompletedResult.timeSpentSeconds / 60)} mnt
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleStartExam(selectedExam)}
              className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Simulasi</span>
            </button>
            <button
              onClick={onNavigateToRekap}
              className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-green-950 rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lihat Rekapan Nilai Kelas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Detailed Solutions (Pembahasan Soal) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">
                Pembahasan Lengkap Soal & Kunci Jawaban
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {selectedExam.questions.length} Soal Dianalisis
            </span>
          </div>

          <div className="space-y-6">
            {selectedExam.questions.map((q, idx) => {
              const studentAnswer = examCompletedResult.answers[q.id];
              const isCorrect = studentAnswer === q.correctKey;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800">
                      Soal No. {idx + 1} ({q.topic})
                    </span>

                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{isCorrect ? 'Jawaban Benar' : 'Jawaban Salah'}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mb-4">
                    {q.questionText}
                  </p>

                  {/* Options Comparison */}
                  <div className="space-y-2 mb-4 text-xs">
                    {q.options.map((opt) => {
                      const isCorrectKey = opt.key === q.correctKey;
                      const isChosen = studentAnswer === opt.key;

                      let optStyle = 'bg-white border-slate-200 text-slate-700';
                      if (isCorrectKey) {
                        optStyle = 'bg-emerald-100 border-emerald-400 font-bold text-emerald-950 ring-1 ring-emerald-400';
                      } else if (isChosen && !isCorrectKey) {
                        optStyle = 'bg-rose-100 border-rose-400 font-bold text-rose-950 line-through';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${optStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-[11px]">
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isCorrectKey && (
                            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-200/60 px-2 py-0.5 rounded">
                              Kunci Jawaban
                            </span>
                          )}
                          {isChosen && !isCorrectKey && (
                            <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider bg-rose-200/60 px-2 py-0.5 rounded">
                              Pilihan Anda
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px] block">
                      💡 Pembahasan & Analisis Soal:
                    </span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Exam Catalog / List View with Official Pusmendik Redirect Link
  return (
    <div className="space-y-6">
      {/* Official Pusmendik Link Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-blue-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg border border-blue-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 text-blue-300 rounded-2xl border border-blue-400/30">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-300 uppercase tracking-wider bg-blue-900/60 px-2 py-0.5 rounded-full mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Resmi Pusat Asesmen Pendidikan</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Pusat Asesmen Pendidikan (Pusmendik Kemendikdasmen)
            </h3>
            <p className="text-xs text-blue-100">
              Akses informasi resmi kisi-kisi, simulasi asesmen nasional, dan instrumen TKA SMK 2026 langsung di portal Pusmendik.
            </p>
          </div>
        </div>

        <a
          href={PUSMENDIK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
        >
          <span>Kunjungi Portal Pusmendik</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 text-purple-800 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Pusat Simulasi Ujian CBT Pusmendik SMK 2026
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Uji kesiapan akademik Anda dengan paket simulasi soal berstandar Pusmendik Kemendikdasmen jenjang SMK
            </p>
          </div>

          <button
            onClick={onNavigateToRekap}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto border border-slate-200"
          >
            <span>Buka Rekapan Nilai</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Exams List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between card-hover-effect relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                    {exam.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{exam.durationMinutes} Menit</span>
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug mb-2">
                  {exam.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 font-medium text-slate-600">
                  <div>📝 Soal: <strong>{exam.totalQuestions} Butir</strong></div>
                  <div>🎯 KKM: <strong>{exam.passingGrade} Poin</strong></div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleStartExam(exam)}
                  className="w-full py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Mulai Kerjakan Simulasi</span>
                </button>

                <a
                  href={PUSMENDIK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-3 h-3 text-blue-600" />
                  <span>Referensi Pusmendik Kemendikdasmen</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
