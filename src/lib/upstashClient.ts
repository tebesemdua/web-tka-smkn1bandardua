import { 
  Student, 
  Teacher, 
  AttendanceRecord, 
  TeacherAttendanceRecord, 
  ExamResult, 
  LearningMaterial,
  ActiveClass 
} from '../types';

export interface RemoteSyncData {
  students?: Student[];
  teachers?: Teacher[];
  attendance?: AttendanceRecord[];
  teacherAttendance?: TeacherAttendanceRecord[];
  examResults?: ExamResult[];
  activeClasses?: ActiveClass[];
  materials?: LearningMaterial[];
}

// 1. Fetch seluruh data dari Upstash Redis Vercel
export async function fetchAllDataFromRedis(): Promise<RemoteSyncData | null> {
  try {
    const res = await fetch('/api/sync', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });

    if (!res.ok) return null;
    const json = await res.json();

    if (json.configured && json.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.warn('Gagal memuat data dari API Redis (menggunakan penyimpanan lokal):', err);
    return null;
  }
}

// 2. Simpan atau Update Key tertentu ke Upstash Redis
export async function saveToRedis(key: string, data: any, action: 'set' | 'append' = 'set'): Promise<boolean> {
  try {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, data, action })
    });

    if (!res.ok) return false;
    const json = await res.json();
    return json.success === true;
  } catch (err) {
    console.warn(`Gagal menyimpan ${key} ke Redis:`, err);
    return false;
  }
}

// 3. Helper khusus untuk masing-masing entitas data
export const syncRedis = {
  saveStudents: (students: Student[]) => saveToRedis('students', students),
  saveAttendance: (records: AttendanceRecord[]) => saveToRedis('attendance', records),
  saveTeacherAttendance: (records: TeacherAttendanceRecord[]) => saveToRedis('teacher_attendance', records),
  saveExamResults: (results: ExamResult[]) => saveToRedis('exam_results', results),
  saveActiveClasses: (classes: ActiveClass[]) => saveToRedis('active_classes', classes),
  saveMaterials: (materials: LearningMaterial[]) => saveToRedis('materials', materials),
};
