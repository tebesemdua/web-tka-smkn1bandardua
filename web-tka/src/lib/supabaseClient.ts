import { createClient } from '@supabase/supabase-js';
import { 
  Student, 
  Teacher, 
  AttendanceRecord, 
  TeacherAttendanceRecord, 
  ExamResult, 
  LearningMaterial 
} from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ============================================================================
// DATA ACCESS & SYNC HELPERS (DENGAN FALLBACK JIKA SUPABASE BELUM DIHUBUNGKAN)
// ============================================================================

// 1. SISWA (STUDENTS)
export async function syncStudentsToCloud(students: Student[]) {
  if (!supabase) return false;
  try {
    const formatted = students.map(s => ({
      id: s.id,
      nisn: s.nisn,
      name: s.name,
      class_id: s.classId,
      grade_level: s.gradeLevel,
      major: s.major,
      email: s.email,
      phone: s.phone || '',
      gender: s.gender || 'L',
      school_name: s.schoolName || 'SMK Negeri 1 Bandar Dua'
    }));
    const { error } = await supabase.from('students').upsert(formatted, { onConflict: 'nisn' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Gagal sinkronisasi siswa ke Supabase:', err);
    return false;
  }
}

export async function fetchStudentsFromCloud(): Promise<Student[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('students').select('*').order('name', { ascending: true });
    if (error) throw error;
    if (!data || data.length === 0) return null;
    return data.map((d: any) => ({
      id: d.id,
      nisn: d.nisn,
      name: d.name,
      classId: d.class_id,
      gradeLevel: d.grade_level,
      major: d.major,
      email: d.email,
      phone: d.phone,
      gender: d.gender,
      schoolName: d.school_name
    }));
  } catch (err) {
    console.error('Gagal memuat siswa dari Supabase:', err);
    return null;
  }
}

// 2. ABSENSI SISWA
export async function syncAttendanceToCloud(records: AttendanceRecord[]) {
  if (!supabase) return false;
  try {
    const formatted = records.map(r => ({
      id: r.id,
      date: r.date,
      time: r.time,
      student_id: r.studentId,
      student_name: r.studentName,
      nisn: r.nisn,
      class_id: r.classId,
      major: r.major,
      session: r.session,
      status: r.status,
      notes: r.notes || '',
      recorded_by: r.recordedBy
    }));
    const { error } = await supabase.from('attendance_records').upsert(formatted, { onConflict: 'id' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Gagal sinkronisasi absensi siswa ke Supabase:', err);
    return false;
  }
}

// 3. JURNAL & ABSENSI GURU
export async function syncTeacherAttendanceToCloud(records: TeacherAttendanceRecord[]) {
  if (!supabase) return false;
  try {
    const formatted = records.map(r => ({
      id: r.id,
      date: r.date,
      check_in_time: r.checkInTime,
      check_out_time: r.checkOutTime || '',
      teacher_id: r.teacherId,
      teacher_name: r.teacherName,
      subject: r.subject,
      class_id: r.classId,
      room: r.room,
      topic: r.topic,
      status: r.status,
      notes: r.notes || ''
    }));
    const { error } = await supabase.from('teacher_attendance_records').upsert(formatted, { onConflict: 'id' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Gagal sinkronisasi absensi guru ke Supabase:', err);
    return false;
  }
}

// 4. HASIL UJIAN CBT
export async function syncExamResultToCloud(result: ExamResult) {
  if (!supabase) return false;
  try {
    const row = {
      id: result.id,
      exam_id: result.examId,
      exam_title: result.examTitle,
      subject: result.subject,
      student_id: result.studentId,
      student_name: result.studentName,
      student_nisn: result.studentNisn,
      student_email: result.studentEmail,
      class_id: result.classId,
      major: result.major,
      score: result.score,
      total_correct: result.totalCorrect,
      total_wrong: result.totalWrong,
      total_skipped: result.totalSkipped,
      total_questions: result.totalQuestions,
      time_spent_seconds: result.timeSpentSeconds,
      submitted_at: result.submittedAt,
      answers: result.answers
    };
    const { error } = await supabase.from('exam_results').upsert([row], { onConflict: 'id' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Gagal sinkronisasi hasil ujian ke Supabase:', err);
    return false;
  }
}
