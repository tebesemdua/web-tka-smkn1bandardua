-- ==============================================================================
-- SKEMA DATABASE CLOUD SUPABASE (POSTGRESQL) - PORTAL TKA SMKN 1 BANDAR DUA
-- Jalankan query ini di SQL Editor (Supabase Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. TABEL SISWA (STUDENTS)
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    nisn VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    class_id VARCHAR(50) NOT NULL,
    grade_level VARCHAR(10) DEFAULT 'XII',
    major VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(25) DEFAULT '',
    gender CHAR(1) DEFAULT 'L',
    school_name VARCHAR(255) DEFAULT 'SMK Negeri 1 Bandar Dua',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL GURU PENGAJAR (TEACHERS)
CREATE TABLE IF NOT EXISTS public.teachers (
    id TEXT PRIMARY KEY,
    nip VARCHAR(30) DEFAULT '',
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    subject VARCHAR(100) NOT NULL,
    phone VARCHAR(25) DEFAULT '',
    avatar TEXT DEFAULT '',
    status VARCHAR(20) DEFAULT 'active',
    current_class VARCHAR(50) DEFAULT '',
    current_room VARCHAR(100) DEFAULT '',
    current_subject VARCHAR(100) DEFAULT '',
    start_time VARCHAR(20) DEFAULT '20:15 WIB',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL ABSENSI SISWA (ATTENDANCE)
CREATE TABLE IF NOT EXISTS public.attendance_records (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    student_id TEXT NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    nisn VARCHAR(20) NOT NULL,
    class_id VARCHAR(50) NOT NULL,
    major VARCHAR(50) NOT NULL,
    session VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL, -- 'hadir', 'sakit', 'izin', 'alpa'
    notes TEXT DEFAULT '',
    recorded_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL JURNAL & ABSENSI GURU (TEACHER ATTENDANCE)
CREATE TABLE IF NOT EXISTS public.teacher_attendance_records (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    check_in_time VARCHAR(20) NOT NULL,
    check_out_time VARCHAR(20) DEFAULT '',
    teacher_id TEXT NOT NULL,
    teacher_name VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    class_id VARCHAR(50) NOT NULL,
    room VARCHAR(100) NOT NULL,
    topic TEXT NOT NULL,
    status VARCHAR(20) NOT NULL, -- 'hadir', 'izin', 'pengganti'
    notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABEL HASIL UJIAN & CBT SISWA (EXAM RESULTS)
CREATE TABLE IF NOT EXISTS public.exam_results (
    id TEXT PRIMARY KEY,
    exam_id TEXT NOT NULL,
    exam_title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    student_id TEXT NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    student_nisn VARCHAR(20) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    class_id VARCHAR(50) NOT NULL,
    major VARCHAR(50) NOT NULL,
    score NUMERIC(5, 2) NOT NULL,
    total_correct INT NOT NULL,
    total_wrong INT NOT NULL,
    total_skipped INT NOT NULL,
    total_questions INT NOT NULL,
    time_spent_seconds INT NOT NULL,
    submitted_at VARCHAR(50) NOT NULL,
    answers JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABEL MATERI & MEDIA PEMBELAJARAN (LEARNING MATERIALS)
CREATE TABLE IF NOT EXISTS public.learning_materials (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    grade_level VARCHAR(10) DEFAULT 'XII',
    type VARCHAR(20) NOT NULL, -- 'classroom', 'pdf', 'video', 'interactive'
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    download_url TEXT DEFAULT '',
    author VARCHAR(255) NOT NULL,
    duration_or_pages VARCHAR(100) NOT NULL,
    classroom_code VARCHAR(20) DEFAULT 'embrt4ws',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    thumbnail TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AKTIFKAN ROW LEVEL SECURITY (RLS) & IZINKAN AKSES PUBLIK/ANON
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_materials ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses: Izinkan Baca & Tulis untuk Portal Siswa, Guru & Admin
CREATE POLICY "Public Read Students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Public Insert Students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Students" ON public.students FOR UPDATE USING (true);

CREATE POLICY "Public Read Teachers" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Public Insert Teachers" ON public.teachers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Teachers" ON public.teachers FOR UPDATE USING (true);

CREATE POLICY "Public Read Attendance" ON public.attendance_records FOR SELECT USING (true);
CREATE POLICY "Public Insert Attendance" ON public.attendance_records FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Teacher Attendance" ON public.teacher_attendance_records FOR SELECT USING (true);
CREATE POLICY "Public Insert Teacher Attendance" ON public.teacher_attendance_records FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Exam Results" ON public.exam_results FOR SELECT USING (true);
CREATE POLICY "Public Insert Exam Results" ON public.exam_results FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Materials" ON public.learning_materials FOR SELECT USING (true);
CREATE POLICY "Public Insert Materials" ON public.learning_materials FOR INSERT WITH CHECK (true);
