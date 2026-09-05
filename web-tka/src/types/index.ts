export type UserRole = 'admin' | 'guru' | 'siswa' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  school?: string;
  classId?: string;
  major?: string;
  nip?: string;
  nisn?: string;
  phone?: string;
}

export interface Student {
  id: string;
  nisn: string;
  name: string;
  classId: string; // e.g., "XII TBSM 1", "XII TBSM 2", "XII TKR", "XII TP", "XII DPB", "XII TKJ 1", "XII TKJ 2"
  gradeLevel: string; // "XII"
  major: string; // "TBSM", "TKRO", "TP", "DPB", "TKJ"
  email: string;
  phone: string;
  gender: 'L' | 'P';
  schoolName: string;
}

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
  avatar: string;
  status: 'active' | 'in_class' | 'offline';
  currentClass?: string;
  currentRoom?: string;
  currentSubject?: string;
  startTime?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  studentId: string;
  studentName: string;
  nisn: string;
  classId: string;
  major: string;
  session: string; // e.g., "Sesi Malam (20:15 - 21:00 WIB)"
  status: 'hadir' | 'sakit' | 'izin' | 'alpa';
  notes?: string;
  recordedBy: string;
  timestamp: number;
}

export interface TeacherAttendanceRecord {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  classId: string;
  room: string;
  topic: string;
  status: 'hadir' | 'izin' | 'pengganti';
  notes?: string;
  timestamp: number;
}

export interface ActiveClass {
  id: string;
  classId: string;
  className: string;
  gradeLevel: string;
  major: string;
  subject: string;
  teacherName: string;
  teacherAvatar: string;
  teacherEmail: string;
  room: string;
  startTime: string;
  endTime: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  topic: string;
  totalStudents: number;
  classroomLink?: string;
}

export interface ExamOption {
  key: string; // "A", "B", "C", "D", "E"
  text: string;
}

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  image?: string;
  options: ExamOption[];
  correctKey: string;
  explanation: string;
  topic: string;
  points: number;
}

export interface ExamSimulation {
  id: string;
  title: string;
  category: 'Numerasi Terapan SMK' | 'Literasi Kejuruan SMK' | 'Vocational English' | 'Penalaran & Troubleshooting' | 'Simulasi Akbar TKA SMK';
  gradeLevel: string;
  durationMinutes: number;
  totalQuestions: number;
  passingGrade: number;
  description: string;
  questions: ExamQuestion[];
  createdAt: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  subject: string;
  studentId: string;
  studentName: string;
  studentNisn: string;
  studentEmail: string;
  classId: string;
  major: string;
  score: number;
  totalCorrect: number;
  totalWrong: number;
  totalSkipped: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  submittedAt: string;
  answers: Record<string, string>;
}

export interface LearningMaterial {
  id: string;
  title: string;
  category: string;
  gradeLevel: string;
  type: 'video' | 'pdf' | 'interactive' | 'classroom';
  description: string;
  url: string;
  downloadUrl?: string;
  author: string;
  durationOrPages: string;
  classroomCode?: string;
  tags: string[];
  thumbnail?: string;
}

export interface VisitorStat {
  date: string;
  visitors: number;
  pageViews: number;
  activeStudents: number;
}
