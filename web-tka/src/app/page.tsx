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
import { TeacherProfileModal } from '../components/TeacherProfileModal';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User>(GUEST_USER);
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('siswa');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Core Data States
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [activeClasses, setActiveClasses] = useState<ActiveClass[]>(INITIAL_ACTIVE_CLASSES);
  const [exams, setExams] = useState<ExamSimulation[]>(INITIAL_EXAMS);
  const [examResults, setExamResults] = useState<ExamResult[]>(INITIAL_EXAM_RESULTS);
  const [materials, setMaterials] = useState<LearningMaterial[]>(INITIAL_MATERIALS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [teacherAttendanceRecords, setTeacherAttendanceRecords] = useState<TeacherAttendanceRecord[]>(INITIAL_TEACHER_ATTENDANCE);

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

    setStudents(localStudents);
    setTeachers(localTeachers);
    setActiveClasses(localActiveClasses);
    setExams(localExams);
    setExamResults(localExamResults);
    setMaterials(localMaterials);
    setAttendanceRecords(localAttendance);
    setTeacherAttendanceRecords(localTeacherAttendance);

    // Background fetch from Upstash Redis Cloud
    fetchAllDataFromRedis().then((remoteData) => {
      if (remoteData) {
        if (remoteData.students && remoteData.students.length > 0) {
          setStudents(remoteData.students);
          setStoredData('students', remoteData.students);
        }
        if (remoteData.attendance && remoteData.attendance.length > 0) {
          setAttendanceRecords(remoteData.attendance);
          setStoredData('attendance', remoteData.attendance);
        }
        if (remoteData.teacherAttendance && remoteData.teacherAttendance.length > 0) {
          setTeacherAttendanceRecords(remoteData.teacherAttendance);
          setStoredData('teacher_attendance', remoteData.teacherAttendance);
        }
        if (remoteData.examResults && remoteData.examResults.length > 0) {
          setExamResults(remoteData.examResults);
          setStoredData('exam_results', remoteData.examResults);
        }
      }
    }).catch((e) => console.warn('Upstash Redis sync check:', e));
  }, []);

  // --- CRUD HANDLERS: DATA SISWA (ADMIN) ---
  const handleAddStudent = (newStudent: Student) => {
    const updated = [newStudent, ...students];
    setStudents(updated);
    setStoredData('students', updated);
    syncStudentsToCloud([newStudent]);
    syncRedis.saveStudents(updated);
  };

  const handleEditStudent = (updatedStudent: Student) => {
    const updated = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    setStudents(updated);
    setStoredData('students', updated);
    syncRedis.saveStudents(updated);
  };

  const handleDeleteStudent = (studentId: string) => {
    const updated = students.filter(s => s.id !== studentId);
    setStudents(updated);
    setStoredData('students', updated);
    syncRedis.saveStudents(updated);
  };

  const handleImportStudents = (newStudents: Student[]) => {
    const updated = [...students, ...newStudents];
    setStudents(updated);
    setStoredData('students', updated);
    syncStudentsToCloud(newStudents);
    syncRedis.saveStudents(updated);
  };

  // --- CRUD HANDLERS: DATA GURU (ADMIN) ---
  const handleAddTeacher = (newTeacher: Teacher) => {
    const updated = [newTeacher, ...teachers];
    setTeachers(updated);
    setStoredData('teachers', updated);
    syncRedis.saveTeachers(updated);
  };

  const handleEditTeacher = (updatedTeacher: Teacher) => {
    const updated = teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t);
    setTeachers(updated);
    setStoredData('teachers', updated);
    syncRedis.saveTeachers(updated);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    const updated = teachers.filter(t => t.id !== teacherId);
    setTeachers(updated);
    setStoredData('teachers', updated);
    syncRedis.saveTeachers(updated);
  };

  // --- EDIT PROFIL GURU (OLEH GURU SENDIRI) ---
  const handleSaveTeacherProfile = (updatedUser: User, updatedTeacher?: Teacher) => {
    setCurrentUser(updatedUser);
    setStoredData('current_user', updatedUser);

    if (updatedTeacher) {
      const existingIdx = teachers.findIndex(t => t.email === updatedUser.email || t.nip === updatedUser.nip || t.id === updatedTeacher.id);
      let updatedList = [...teachers];
      if (existingIdx >= 0) {
        updatedList[existingIdx] = {
          ...updatedList[existingIdx],
          name: updatedUser.name,
          nip: updatedUser.nip || updatedList[existingIdx].nip,
          subject: updatedUser.major || updatedList[existingIdx].subject,
          phone: updatedUser.phone || updatedList[existingIdx].phone,
          email: updatedUser.email
        };
      } else {
        updatedList.push(updatedTeacher);
      }
      setTeachers(updatedList);
      setStoredData('teachers', updatedList);
      syncRedis.saveTeachers(updatedList);
    }
  };

  // --- CRUD HANDLERS: JADWAL MENGAJAR / ACTIVE CLASSES (ADMIN) ---
  const handleAddActiveClass = (newClass: ActiveClass) => {
    const updated = [newClass, ...activeClasses];
    setActiveClasses(updated);
    setStoredData('active_classes', updated);
    syncRedis.saveActiveClasses(updated);
  };

  const handleEditActiveClass = (updatedClass: ActiveClass) => {
    const updated = activeClasses.map(c => c.id === updatedClass.id ? updatedClass : c);
    setActiveClasses(updated);
    setStoredData('active_classes', updated);
    syncRedis.saveActiveClasses(updated);
  };

  const handleDeleteActiveClass = (classId: string) => {
    const updated = activeClasses.filter(c => c.id !== classId);
    setActiveClasses(updated);
    setStoredData('active_classes', updated);
    syncRedis.saveActiveClasses(updated);
  };

  // --- PRESENSI & UJIAN ---
  const handleUpdateAttendance = (newRecords: AttendanceRecord[]) => {
    const updated = [...newRecords, ...attendanceRecords.filter(r => 
      !newRecords.some(nr => nr.studentId === r.studentId && nr.date === r.date && nr.session === r.session)
    )];
    setAttendanceRecords(updated);
    setStoredData('attendance', updated);
    syncAttendanceToCloud(newRecords);
    syncRedis.saveAttendance(updated);
  };

  const handleRecordTeacherAttendance = (record: TeacherAttendanceRecord) => {
    const updated = [record, ...teacherAttendanceRecords];
    setTeacherAttendanceRecords(updated);
    setStoredData('teacher_attendance', updated);
    syncTeacherAttendanceToCloud([record]);
    syncRedis.saveTeacherAttendance(updated);

    // Update active classes status to reflect live teaching
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
        {/* Full-Screen Welcome Gate */}
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
      {/* Intro Modal */}
      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialRole={authInitialRole}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentUser={currentUser}
      />

      {/* Modal Edit Profil Guru */}
      <TeacherProfileModal
        isOpen={isEditProfileOpen}
        currentUser={currentUser}
        onClose={() => setIsEditProfileOpen(false)}
        onSaveProfile={handleSaveTeacherProfile}
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
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* Main Content Body: Tampilan Setelah Login */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: BERANDA */}
        {activeTab === 'beranda' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Banner & Role Status Cards */}
            <HeroSection
              currentUser={currentUser}
              students={students}
              teachers={teachers}
              activeClasses={activeClasses}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectRoleLogin={handleSelectRoleLogin}
              onLogout={handleLogout}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
            />

            {/* Live Active Classes Monitor & Schedule */}
            <ActiveClassesMonitor
              activeClasses={activeClasses}
              teachers={teachers}
              currentUser={currentUser}
              onAddActiveClass={handleAddActiveClass}
              onEditActiveClass={handleEditActiveClass}
              onDeleteActiveClass={handleDeleteActiveClass}
            />

            {/* Real Progress Analytics Chart */}
            <VisitorAnalyticsChart
              students={students}
              teachers={teachers}
              activeClasses={activeClasses}
              attendanceRecords={attendanceRecords}
              teacherAttendanceRecords={teacherAttendanceRecords}
              examResults={examResults}
              materials={materials}
            />
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

        {/* TAB 3: DATA & ABSENSI SISWA (ADMIN FULL CRUD) */}
        {activeTab === 'absensi-siswa' && (
          <div className="animate-fadeIn">
            <AttendanceSiswaSection
              students={students}
              attendanceRecords={attendanceRecords}
              currentUser={currentUser}
              onUpdateAttendance={handleUpdateAttendance}
              onImportStudents={handleImportStudents}
              onAddStudent={handleAddStudent}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          </div>
        )}

        {/* TAB 4: MASTER 31 GURU & ABSENSI (ADMIN FULL CRUD & GURU PROFILE EDIT) */}
        {activeTab === 'absensi-guru' && (
          <div className="animate-fadeIn">
            <AttendanceGuruSection
              teachers={teachers}
              teacherAttendanceRecords={teacherAttendanceRecords}
              currentUser={currentUser}
              onRecordTeacherAttendance={handleRecordTeacherAttendance}
              onAddTeacher={handleAddTeacher}
              onEditTeacher={handleEditTeacher}
              onDeleteTeacher={handleDeleteTeacher}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
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

        {/* TAB 8: GRAFIK & STATUS REAL ANALYTICS */}
        {activeTab === 'grafik-analytics' && (
          <div className="space-y-6 animate-fadeIn">
            <ActiveClassesMonitor
              activeClasses={activeClasses}
              teachers={teachers}
              currentUser={currentUser}
              onAddActiveClass={handleAddActiveClass}
              onEditActiveClass={handleEditActiveClass}
              onDeleteActiveClass={handleDeleteActiveClass}
            />
            <VisitorAnalyticsChart
              students={students}
              teachers={teachers}
              activeClasses={activeClasses}
              attendanceRecords={attendanceRecords}
              teacherAttendanceRecords={teacherAttendanceRecords}
              examResults={examResults}
              materials={materials}
            />
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
              href="https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-emerald-700 font-medium"
            >
              Google Classroom TKA
            </a>
            <span>•</span>
            <a
              href="https://pusmendik.kemendikdasmen.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-700 font-medium"
            >
              Pusmendik Kemendikdasmen
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
