'use client';

import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_USERS, 
  GUEST_USER,
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS, 
  INITIAL_ACTIVE_CLASSES, 
  INITIAL_EXAMS, 
  INITIAL_EXAM_RESULTS, 
  INITIAL_MATERIALS, 
  INITIAL_VISITOR_STATS, 
  INITIAL_ATTENDANCE, 
  INITIAL_TEACHER_ATTENDANCE,
  getStoredData,
  setStoredData
} from '../lib/storage';
import { 
  syncStudentsToCloud, 
  fetchStudentsFromCloud, 
  syncAttendanceToCloud, 
  syncTeacherAttendanceToCloud, 
  syncExamResultToCloud,
  isSupabaseConfigured
} from '../lib/supabaseClient';
import { 
  fetchAllDataFromRedis, 
  syncRedis 
} from '../lib/upstashClient';
import { 
  User, 
  UserRole, 
  Student, 
  Teacher, 
  ActiveClass, 
  ExamSimulation, 
  ExamResult, 
  LearningMaterial, 
  VisitorStat, 
  AttendanceRecord, 
  TeacherAttendanceRecord 
} from '../types';

import { IntroModal } from '../components/IntroModal';
import { Navbar } from '../components/Navbar';
import { AuthModal } from '../components/AuthModal';
import { HeroSection } from '../components/HeroSection';
import { ActiveClassesMonitor } from '../components/ActiveClassesMonitor';
import { VisitorAnalyticsChart } from '../components/VisitorAnalyticsChart';
import { InteractiveMediaSection } from '../components/InteractiveMediaSection';
import { AttendanceSiswaSection } from '../components/AttendanceSiswaSection';
import { AttendanceGuruSection } from '../components/AttendanceGuruSection';
import { ExamSimulationSection } from '../components/ExamSimulationSection';
import { GradeRecapSection } from '../components/GradeRecapSection';
import { AdminDownloadHub } from '../components/AdminDownloadHub';
import { WelcomeSplashScreen } from '../components/WelcomeSplashScreen';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User>(GUEST_USER);
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('siswa');

  // Core Data States
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [activeClasses, setActiveClasses] = useState<ActiveClass[]>(INITIAL_ACTIVE_CLASSES);
  const [exams, setExams] = useState<ExamSimulation[]>(INITIAL_EXAMS);
  const [examResults, setExamResults] = useState<ExamResult[]>(INITIAL_EXAM_RESULTS);
  const [materials, setMaterials] = useState<LearningMaterial[]>(INITIAL_MATERIALS);
  const [visitorStats, setVisitorStats] = useState<VisitorStat[]>(INITIAL_VISITOR_STATS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [teacherAttendanceRecords, setTeacherAttendanceRecords] = useState<TeacherAttendanceRecord[]>(INITIAL_TEACHER_ATTENDANCE);

  const [isCloudConnected, setIsCloudConnected] = useState<boolean | null>(null);
  const [cloudStatusMessage, setCloudStatusMessage] = useState<string>('');

  // Initialize data from localStorage & Upstash Redis on client mount
  useEffect(() => {
    // Check if user actively logged in previously with is_authenticated flag
    const isAuthenticated = getStoredData<boolean>('is_authenticated', false);
    const savedUser = getStoredData<User>('current_user', GUEST_USER);

    if (isAuthenticated && savedUser && savedUser.role !== 'guest') {
      setCurrentUser(savedUser);
    } else {
      // Default to guest (Belum Login) on fresh session
      setCurrentUser(GUEST_USER);
      setStoredData('current_user', GUEST_USER);
      setStoredData('is_authenticated', false);
    }

    // Load local storage initial data first
    const localStudents = getStoredData<Student[]>('students', INITIAL_STUDENTS);
    const localTeachers = getStoredData<Teacher[]>('teachers', INITIAL_TEACHERS);
    const localActiveClasses = getStoredData<ActiveClass[]>('active_classes', INITIAL_ACTIVE_CLASSES);
    const localExams = getStoredData<ExamSimulation[]>('exams', INITIAL_EXAMS);
    const localExamResults = getStoredData<ExamResult[]>('exam_results', INITIAL_EXAM_RESULTS);
    const localMaterials = getStoredData<LearningMaterial[]>('materials', INITIAL_MATERIALS);
    const localAttendance = getStoredData<AttendanceRecord[]>('attendance', INITIAL_ATTENDANCE);
    const localTeacherAttendance = getStoredData<TeacherAttendanceRecord[]>('teacher_attendance', INITIAL_TEACHER_ATTENDANCE);
    const localVisitorStats = getStoredData<VisitorStat[]>('visitor_stats', INITIAL_VISITOR_STATS);

    setStudents(localStudents);
    setTeachers(localTeachers);
    setActiveClasses(localActiveClasses);
    setExams(localExams);
    setExamResults(localExamResults);
    setMaterials(localMaterials);
    setAttendanceRecords(localAttendance);
    setTeacherAttendanceRecords(localTeacherAttendance);
    setVisitorStats(localVisitorStats);

    // Background fetch from Upstash Redis Cloud + check connection status
    fetch('/api/sync', { cache: 'no-store' })
      .then(res => res.json())
      .then(json => {
        if (json.configured === false) {
          setIsCloudConnected(false);
          setCloudStatusMessage(json.message || 'Database belum terhubung');
        } else if (json.configured === true) {
          setIsCloudConnected(true);
          setCloudStatusMessage('Terhubung ke Cloud Database');
        }
      })
      .catch(() => {
        setIsCloudConnected(false);
        setCloudStatusMessage('Gagal cek koneksi database');
      });

    fetchAllDataFromRedis().then((remoteData) => {
      if (remoteData) {
        // FIX: Izinkan array kosong [] sebagai data valid agar hapus semua bisa sinkron ke semua perangkat
        // Sebelumnya cek length >0, jadi kalau cloud [] tidak pernah di-sync dan fallback ke INITIAL (19 siswa)
        if (remoteData.students && Array.isArray(remoteData.students)) {
          setStudents(remoteData.students);
          setStoredData('students', remoteData.students);
        }
        if (remoteData.attendance && Array.isArray(remoteData.attendance)) {
          setAttendanceRecords(remoteData.attendance);
          setStoredData('attendance', remoteData.attendance);
        }
        if (remoteData.teacherAttendance && Array.isArray(remoteData.teacherAttendance)) {
          setTeacherAttendanceRecords(remoteData.teacherAttendance);
          setStoredData('teacher_attendance', remoteData.teacherAttendance);
        }
        if (remoteData.examResults && Array.isArray(remoteData.examResults)) {
          setExamResults(remoteData.examResults);
          setStoredData('exam_results', remoteData.examResults);
        }
      }
    }).catch((e) => console.warn('Upstash Redis sync check:', e));
  }, []);

  // Handlers for Data Updates
  const handleUpdateAttendance = (newRecords: AttendanceRecord[]) => {
    const updated = [...newRecords, ...attendanceRecords.filter(r => 
      !newRecords.some(nr => nr.studentId === r.studentId && nr.date === r.date && nr.session === r.session)
    )];
    setAttendanceRecords(updated);
    setStoredData('attendance', updated);
    syncAttendanceToCloud(newRecords);
    syncRedis.saveAttendance(updated);
  };

  const handleImportStudents = (newStudents: Student[]) => {
    // Deduplikasi berdasarkan NISN agar tidak dobel saat import berulang
    const existingNisnSet = new Set(students.map(s => s.nisn));
    const uniqueNew = newStudents.filter(s => !existingNisnSet.has(s.nisn));
    const merged = [...students, ...uniqueNew];
    // Jika NISN sudah ada, update data lamanya (untuk kasus edit via Excel)
    const finalList = merged.map(s => {
      const updatedVersion = newStudents.find(ns => ns.nisn === s.nisn);
      return updatedVersion ? { ...s, ...updatedVersion, id: s.id } : s;
    });
    // Tambahkan yang benar-benar baru yang tidak ada di merged sebelumnya
    const trulyNew = newStudents.filter(ns => !students.some(s => s.nisn === ns.nisn));
    const finalWithNew = [...finalList, ...trulyNew.filter(ns => !finalList.some(s => s.nisn === ns.nisn))];
    
    // Simpler: buat map by nisn
    const mapByNisn = new Map<string, Student>();
    students.forEach(s => mapByNisn.set(s.nisn, s));
    newStudents.forEach(ns => {
      const existing = mapByNisn.get(ns.nisn);
      if (existing) {
        mapByNisn.set(ns.nisn, { ...existing, ...ns, id: existing.id });
      } else {
        mapByNisn.set(ns.nisn, ns);
      }
    });
    const updated = Array.from(mapByNisn.values());
    
    setStudents(updated);
    setStoredData('students', updated);
    syncStudentsToCloud(updated);
    syncRedis.saveStudents(updated);
  };

  const handleEditStudent = (updatedStudent: Student) => {
    const updated = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    setStudents(updated);
    setStoredData('students', updated);
    // Sync ke cloud - PENTING: ini yang bikin sinkron antar perangkat
    syncStudentsToCloud(updated);
    syncRedis.saveStudents(updated);
  };

  const handleDeleteStudent = (studentId: string) => {
    const updated = students.filter(s => s.id !== studentId);
    setStudents(updated);
    setStoredData('students', updated);
    syncStudentsToCloud(updated);
    syncRedis.saveStudents(updated);
  };

  const handleBulkUpdateStudents = (updatedList: Student[]) => {
    setStudents(updatedList);
    setStoredData('students', updatedList);
    syncStudentsToCloud(updatedList);
    syncRedis.saveStudents(updatedList);
  };

  const handleBulkDeleteStudents = (ids: string[]) => {
    const updated = students.filter(s => !ids.includes(s.id));
    setStudents(updated);
    setStoredData('students', updated);
    syncStudentsToCloud(updated);
    syncRedis.saveStudents(updated);
  };

  // Guru handlers - baru untuk fitur admin bulk
  const handleEditTeacher = (updatedTeacher: Teacher) => {
    const updated = teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t);
    setTeachers(updated);
    setStoredData('teachers', updated);
    syncRedis.saveStudents([]); // trigger sync - teachers disimpan terpisah, tapi pakai saveStudents untuk demo, nanti bisa tambah REDIS_KEYS.TEACHERS
    // Simpan teachers ke Redis
    fetch('/api/sync', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({key:'teachers', data: updated})});
  };

  const handleDeleteTeacher = (teacherId: string) => {
    const updated = teachers.filter(t => t.id !== teacherId);
    setTeachers(updated);
    setStoredData('teachers', updated);
    fetch('/api/sync', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({key:'teachers', data: updated})});
  };

  const handleBulkDeleteTeachers = (ids: string[]) => {
    const updated = teachers.filter(t => !ids.includes(t.id));
    setTeachers(updated);
    setStoredData('teachers', updated);
    fetch('/api/sync', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({key:'teachers', data: updated})});
  };

  const handleBulkUpdateTeachers = (updatedList: Teacher[]) => {
    setTeachers(updatedList);
    setStoredData('teachers', updatedList);
    fetch('/api/sync', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({key:'teachers', data: updatedList})});
  };

  const handleRecordTeacherAttendance = (record: TeacherAttendanceRecord) => {
    const updated = [record, ...teacherAttendanceRecords];
    setTeacherAttendanceRecords(updated);
    setStoredData('teacher_attendance', updated);
    syncTeacherAttendanceToCloud([record]);
    syncRedis.saveTeacherAttendance(updated);

    // Also update active classes to reflect live teaching
    const existingClassIdx = activeClasses.findIndex(c => c.classId === record.classId);
    if (existingClassIdx >= 0) {
      const updatedClasses = [...activeClasses];
      updatedClasses[existingClassIdx] = {
        ...updatedClasses[existingClassIdx],
        teacherName: record.teacherName,
        subject: record.subject,
        topic: record.topic,
        room: record.room,
        status: 'ongoing'
      };
      setActiveClasses(updatedClasses);
      setStoredData('active_classes', updatedClasses);
      syncRedis.saveActiveClasses(updatedClasses);
    }
  };

  const handleAddActiveClass = (newClass: ActiveClass) => {
    const updated = [newClass, ...activeClasses];
    setActiveClasses(updated);
    setStoredData('active_classes', updated);
    syncRedis.saveActiveClasses(updated);
  };

  const handleSaveExamResult = (result: ExamResult) => {
    const updated = [result, ...examResults];
    setExamResults(updated);
    setStoredData('exam_results', updated);
    syncExamResultToCloud(result);
    syncRedis.saveExamResults(updated);
  };

  const handleAddMaterial = (material: LearningMaterial) => {
    const updated = [material, ...materials];
    setMaterials(updated);
    setStoredData('materials', updated);
  };

  const handleRoleSwitch = (role: UserRole) => {
    if (role === 'admin') {
      setAuthInitialRole('admin');
      setIsAuthModalOpen(true);
      return;
    }
    if (role === 'guest') {
      handleLogout();
      return;
    }
    const user = DEFAULT_USERS[role];
    setCurrentUser(user);
    setStoredData('current_user', user);
    setStoredData('is_authenticated', true);
  };

  const handleSelectRoleLogin = (role: UserRole) => {
    setAuthInitialRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setStoredData('current_user', user);
    setStoredData('is_authenticated', true);
  };

  const handleLogout = () => {
    setCurrentUser(GUEST_USER);
    setStoredData('current_user', GUEST_USER);
    setStoredData('is_authenticated', false);
    setActiveTab('beranda');
  };

  // TAMPILAN AWAL PERTAMA KALI DIBUKA (GUEST / BELUM LOGIN): FULL SCREEN WELCOME SPLASH GATE
  if (currentUser.role === 'guest') {
    return (
      <>
        {/* Full-Screen Welcome Gate persis seperti gambar lampiran */}
        <WelcomeSplashScreen
          onOpenAuth={(role) => {
            setAuthInitialRole(role || 'siswa');
            setIsAuthModalOpen(true);
          }}
        />

        {/* Modal Login Autentikasi */}
        <AuthModal
          isOpen={isAuthModalOpen}
          initialRole={authInitialRole}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          currentUser={currentUser}
        />
      </>
    );
  }

  // TAMPILAN SETELAH LOGIN SESUAI PERAN (ADMIN, GURU, SISWA)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Intro Modal (Dapat dibuka sewaktu-waktu lewat tombol Sambutan) */}
      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />

      {/* Auth Modal with PIN for Admin, Email+Password for Guru & Siswa */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialRole={authInitialRole}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentUser={currentUser}
      />

      {/* Navbar & Header */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => {
          setAuthInitialRole(currentUser.role === 'guest' ? 'siswa' : currentUser.role);
          setIsAuthModalOpen(true);
        }}
        onReopenIntro={() => setIsIntroOpen(true)}
        onLogout={handleLogout}
      />

      {/* Cloud Connection Warning Banner - PENTING UNTUK FIX BUG */}
      {isCloudConnected === false && (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <h4 className="font-bold text-amber-900 text-sm">Database Cloud Belum Terhubung - Data Hanya Tersimpan di Perangkat Ini!</h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Penyebab edit tidak sinkron: <strong>{cloudStatusMessage}</strong>. Vercel belum punya ENV <code>KV_REST_API_URL</code> / <code>UPSTASH_REDIS_REST_URL</code>. 
                Solusi: Masuk ke Vercel Dashboard → Project web-tka-three → Storage → Create Database → Upstash Redis / Vercel KV → Connect → Redeploy.
                Setelah itu edit siswa akan sinkron ke semua perangkat.
              </p>
            </div>
          </div>
        </div>
      )}
      {isCloudConnected === true && (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="font-bold text-emerald-800">Cloud Database Terhubung: {cloudStatusMessage} - Data sinkron antar perangkat</span>
          </div>
        </div>
      )}

      {/* Main Content Body: Tampilan Setelah Login */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: BERANDA */}
        {activeTab === 'beranda' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Banner & Role Selection Cards */}
            <HeroSection
              currentUser={currentUser}
              students={students}
              teachers={teachers}
              activeClasses={activeClasses}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectRoleLogin={handleSelectRoleLogin}
              onLogout={handleLogout}
            />

            {/* Live Active Classes Monitor */}
            <ActiveClassesMonitor
              activeClasses={activeClasses}
              teachers={teachers}
              currentUser={currentUser}
              onAddActiveClass={handleAddActiveClass}
            />

            {/* Visitor & Traffic Analytics Chart */}
            <VisitorAnalyticsChart stats={visitorStats} />
          </div>
        )}

        {/* TAB 2: MEDIA INTERAKTIF */}
        {activeTab === 'media' && (
          <div className="animate-fadeIn">
            <InteractiveMediaSection
              materials={materials}
              currentUser={currentUser}
              onAddMaterial={handleAddMaterial}
            />
          </div>
        )}

        {/* TAB 3: ABSENSI SISWA */}
        {activeTab === 'absensi-siswa' && (
          <div className="animate-fadeIn">
            <AttendanceSiswaSection
              students={students}
              attendanceRecords={attendanceRecords}
              currentUser={currentUser}
              onUpdateAttendance={handleUpdateAttendance}
              onImportStudents={handleImportStudents}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudent}
              onBulkUpdateStudents={handleBulkUpdateStudents}
              onBulkDeleteStudents={handleBulkDeleteStudents}
              isCloudConnected={isCloudConnected}
            />
          </div>
        )}

        {/* TAB 4: ABSENSI GURU */}
        {activeTab === 'absensi-guru' && (
          <div className="animate-fadeIn">
            <AttendanceGuruSection
              teachers={teachers}
              teacherAttendanceRecords={teacherAttendanceRecords}
              currentUser={currentUser}
              onRecordTeacherAttendance={handleRecordTeacherAttendance}
              onEditTeacher={handleEditTeacher}
              onDeleteTeacher={handleDeleteTeacher}
              onBulkDeleteTeachers={handleBulkDeleteTeachers}
              onBulkUpdateTeachers={handleBulkUpdateTeachers}
              isCloudConnected={isCloudConnected}
            />
          </div>
        )}

        {/* TAB 5: SIMULASI UJIAN TKA */}
        {activeTab === 'simulasi' && (
          <div className="animate-fadeIn">
            <ExamSimulationSection
              exams={exams}
              currentUser={currentUser}
              onSaveExamResult={handleSaveExamResult}
              onNavigateToRekap={() => setActiveTab('rekap-nilai')}
            />
          </div>
        )}

        {/* TAB 6: REKAP NILAI */}
        {activeTab === 'rekap-nilai' && (
          <div className="animate-fadeIn">
            <GradeRecapSection
              examResults={examResults}
              currentUser={currentUser}
              onNavigateToExam={() => setActiveTab('simulasi')}
            />
          </div>
        )}

        {/* TAB 7: DOWNLOAD HUB (KHUSUS ADMIN & GURU) */}
        {activeTab === 'download-hub' && (
          <div className="animate-fadeIn">
            <AdminDownloadHub
              students={students}
              teachers={teachers}
              attendanceRecords={attendanceRecords}
              teacherAttendanceRecords={teacherAttendanceRecords}
              examResults={examResults}
              exams={exams}
              materials={materials}
              currentUser={currentUser}
              onOpenAuth={() => {
                setAuthInitialRole('admin');
                setIsAuthModalOpen(true);
              }}
            />
          </div>
        )}

        {/* TAB 8: GRAFIK & STATUS MONITOR */}
        {activeTab === 'grafik-analytics' && (
          <div className="space-y-6 animate-fadeIn">
            <ActiveClassesMonitor
              activeClasses={activeClasses}
              teachers={teachers}
              currentUser={currentUser}
              onAddActiveClass={handleAddActiveClass}
            />
            <VisitorAnalyticsChart stats={visitorStats} />
          </div>
        )}
      </main>

      {/* Footer with Side-by-Side Dual Logos */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Side-by-Side Dual Logos */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <img
                src="/logo_prov.png"
                alt="Logo Pemerintah Aceh"
                className="w-10 h-10 object-contain drop-shadow-xs"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="h-8 w-[1px] bg-slate-300"></div>
              <img
                src="/logo_smk.png"
                alt="Logo SMK Negeri 1 Bandar Dua"
                className="w-11 h-11 object-contain drop-shadow-sm"
              />
            </div>
            
            <div>
              <p className="font-extrabold text-slate-900 text-sm">
                SMK NEGERI 1 BANDAR DUA
              </p>
              <p className="text-[11px] text-slate-600 font-medium">
                Pemerintah Aceh — Cabang Dinas Pendidikan Wilayah Pidie & Pidie Jaya
              </p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                Program Bimbingan Belajar Les TKA Malam Hari (20:15 - 21:00 WIB) TA 2026/2027
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-emerald-700 font-medium"
            >
              Google Classroom (embrt4ws)
            </a>
            <span>•</span>
            <button
              onClick={() => setIsIntroOpen(true)}
              className="text-slate-600 hover:text-emerald-700 cursor-pointer font-medium"
            >
              Sambutan Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
