import {
  Student,
  Teacher,
  AttendanceRecord,
  TeacherAttendanceRecord,
  ActiveClass,
  ExamSimulation,
  ExamResult,
  LearningMaterial,
  VisitorStat,
  User
} from '../types';

// Default Initial Users for SMK Negeri 1 Bandar Dua
export const GUEST_USER: User = {
  id: 'guest',
  name: 'Tamu (Belum Login)',
  email: 'portal@smknegeri1bandardua.sch.id',
  role: 'guest',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  school: 'SMK Negeri 1 Bandar Dua'
};

export const DEFAULT_USERS: Record<string, User> = {
  guest: GUEST_USER,
  admin: {
    id: 'user-admin-1',
    name: 'Administrator TKA SMKN 1 Bandar Dua',
    email: 'admin.tka@smknegeri1bandardua.sch.id',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    school: 'SMK Negeri 1 Bandar Dua'
  },
  guru: {
    id: 'user-guru-1',
    name: 'FAISAL (Guru Kejuruan TKJ)',
    email: 'faisal481@guru.smk.belajar.id',
    role: 'guru',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    school: 'SMK Negeri 1 Bandar Dua',
    nip: '198205102008011012'
  },
  siswa: {
    id: 'user-siswa-1',
    name: 'Muhammad Farhan (Siswa XII TKJ 1)',
    email: 'muhammad.farhan@siswa.smk.belajar.id',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    school: 'SMK Negeri 1 Bandar Dua',
    classId: 'XII TKJ 1',
    major: 'TKJ',
    nisn: '0067489211'
  }
};

// 31 Guru Lengkap dari Google Sheet SMK Negeri 1 Bandar Dua
export const INITIAL_TEACHERS: Teacher[] = [
  { id: 'tch-01', nip: '198105102008011001', name: 'WAN ABDUL MANAN', email: 'wanmanan85@guru.smk.belajar.id', subject: 'KEJURUAN TP', phone: '081269000101', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', status: 'active', currentClass: 'XII TP', currentRoom: 'Ruang Les XII TP', currentSubject: 'KEJURUAN TP', startTime: '20:15 WIB' },
  { id: 'tch-02', nip: '198205102008011002', name: 'FAISAL', email: 'faisal481@guru.smk.belajar.id', subject: 'KEJURUAN TKJ', phone: '081269000102', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII TKJ 1', currentRoom: 'Lab Komputer TKJ', currentSubject: 'KEJURUAN TKJ', startTime: '20:15 WIB' },
  { id: 'tch-03', nip: '198305102008011003', name: 'SYAUQI RIDHA', email: 'syauqiridha10@guru.smk.belajar.id', subject: 'KEJURUAN TKJ', phone: '081269000103', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII TKJ 2', currentRoom: 'Ruang Les XII TKJ 2', currentSubject: 'KEJURUAN TKJ', startTime: '20:15 WIB' },
  { id: 'tch-04', nip: '198405102008011004', name: 'HELMI', email: 'helmi91@guru.smk.belajar.id', subject: 'KEJURUAN TP', phone: '081269000104', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-05', nip: '198505102008011005', name: 'MUNAWIR', email: 'munawir59@guru.smk.belajar.id', subject: 'KEJURUAN TP', phone: '081269000105', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-06', nip: '198605102008012006', name: 'NURHAFNI', email: 'nurhafni22@guru.smk.belajar.id', subject: 'KEJURUAN DPB', phone: '081269000106', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-07', nip: '198705102008012007', name: 'NURHAYATI', email: 'nurhayati973@guru.smk.belajar.id', subject: 'KEJURUAN DPB', phone: '081269000107', avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-08', nip: '198805102008012008', name: 'JULIGAWATI', email: 'juligawati37@guru.smk.belajar.id', subject: 'KEJURUAN DPB', phone: '081269000108', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-09', nip: '198905102008012009', name: 'FAZILLA ZAHARA', email: 'fazillazahara21@guru.smk.belajar.id', subject: 'KEJURUAN DPB', phone: '081269000109', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-10', nip: '199005102008012010', name: 'IZZATUL JANNAH', email: 'izzatul.jannah470@guru.smk.belajar.id', subject: 'KEJURUAN DPB', phone: '081269000110', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-11', nip: '199105102008012011', name: 'RIZAYANI', email: 'rizayani42@guru.smk.belajar.id', subject: 'KEJURUAN DPB', phone: '081269000111', avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-12', nip: '199205102008012012', name: 'WARDATUTTIFLAH', email: 'wardatuttiflah.45@guru.smk.belajar.id', subject: 'KEJURUAN DPB', phone: '081269000112', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-13', nip: '197905102005012013', name: 'MARHAMAH', email: 'marhamah03@guru.smk.belajar.id', subject: 'MATEMATIKA', phone: '081269000113', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII DPB', currentRoom: 'Ruang Les XII DPB', currentSubject: 'MATEMATIKA', startTime: '20:15 WIB' },
  { id: 'tch-14', nip: '198005102005012014', name: 'NAZARIYAH', email: 'nazariyah66@guru.smk.belajar.id', subject: 'MATEMATIKA', phone: '081269000114', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-15', nip: '198405102008012015', name: 'SONITA ARINI', email: 'sonitaarini20@guru.smk.belajar.id', subject: 'MATEMATIKA', phone: '081269000115', avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII TKR', currentRoom: 'Ruang Les XII TKR', currentSubject: 'MATEMATIKA', startTime: '20:15 WIB' },
  { id: 'tch-16', nip: '198505102008012016', name: 'JULIYANTI', email: 'juliyanti.686@guru.smk.belajar.id', subject: 'MATEMATIKA', phone: '081269000116', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-17', nip: '198605102008012017', name: 'LINDAWATI', email: 'lindawati42@guru.smk.belajar.id', subject: 'MATEMATIKA', phone: '081269000117', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-18', nip: '198705102008012018', name: 'RUHAMA', email: 'ruhama85@guru.smk.belajar.id', subject: 'MATEMATIKA', phone: '081269000118', avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-19', nip: '197505102002011019', name: 'MUKHLIS ABDUL HAMID', email: 'mukhlishamid54@guru.smk.belajar.id', subject: 'B. INDONESIA', phone: '081269000119', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-20', nip: '197605102002011020', name: 'T. BAKHTIAR EFFENDI', email: 'tbakhtiareffendi49@guru.smk.belajar.id', subject: 'B. INDONESIA', phone: '081269000120', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII TP', currentRoom: 'Ruang Les XII TP', currentSubject: 'B. INDONESIA', startTime: '20:15 WIB' },
  { id: 'tch-21', nip: '198305102006012021', name: 'RADHIAH', email: 'radhiah01@guru.smk.belajar.id', subject: 'B. INDONESIA', phone: '081269000121', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII TKJ 1', currentRoom: 'Ruang Les XII TKJ 1', currentSubject: 'B. INDONESIA', startTime: '20:15 WIB' },
  { id: 'tch-22', nip: '198505102008012022', name: 'MARLINA', email: 'marlina811@guru.smk.belajar.id', subject: 'B. INDONESIA', phone: '081269000122', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-23', nip: '198805102010012023', name: 'CUT AJA NURLAINI', email: 'cutnurlaini40@guru.smk.belajar.id', subject: 'B. INGGRIS', phone: '081269000123', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII TBSM 2', currentRoom: 'Ruang Les XII TBSM 2', currentSubject: 'B. INGGRIS', startTime: '20:15 WIB' },
  { id: 'tch-24', nip: '198905102012012024', name: 'CUT NANA YULIANA', email: 'cut.nana30@guru.smk.belajar.id', subject: 'B. INGGRIS', phone: '081269000124', avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII TKJ 2', currentRoom: 'Ruang Les XII TKJ 2', currentSubject: 'B. INGGRIS', startTime: '20:15 WIB' },
  { id: 'tch-25', nip: '198005102005011025', name: 'AGUSSAMI', email: 'agussami78@guru.smk.belajar.id', subject: 'KEJURUAN TBSM', phone: '081269000125', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'in_class', currentClass: 'XII TBSM 1', currentRoom: 'Bengkel Otomotif TBSM', currentSubject: 'KEJURUAN TBSM', startTime: '20:15 WIB' },
  { id: 'tch-26', nip: '199005102015011026', name: 'MUHAMMAD RISKI', email: 'muhammad9337@guru.smk.belajar.id', subject: 'KEJURUAN TBSM', phone: '081269000126', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-27', nip: '199105102016011027', name: 'FAJRI', email: 'fajri16@guru.smk.belajar.id', subject: 'KEJURUAN TBSM', phone: '081269000127', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-28', nip: '199205102017011028', name: 'BARRAL MUHARRAM', email: 'barralmuharram86@guru.smk.belajar.id', subject: 'KEJURUAN TBSM', phone: '081269000128', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-29', nip: '198405102008011029', name: 'TEUKU IRWAN', email: 'teukuirwan06@guru.smk.belajar.id', subject: 'KEJURUAN TKRO', phone: '081269000129', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-30', nip: '199305102018011030', name: 'RIZKY NANDA', email: 'rizkynanda69@guru.smk.belajar.id', subject: 'KEJURUAN TKRO', phone: '081269000130', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', status: 'active' },
  { id: 'tch-31', nip: '199405102019011031', name: 'KHAIRUL RIJAL', email: 'khairul762@guru.smk.belajar.id', subject: 'KEJURUAN TKRO', phone: '081269000131', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', status: 'active' }
];

// 7 Kelas XII Target SMKN 1 Bandar Dua
export const INITIAL_STUDENTS: Student[] = [
  // XII TKJ 1
  { id: 'std-tkj1-01', nisn: '0067489101', name: 'Muhammad Farhan', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'muhammad.farhan@siswa.smk.belajar.id', phone: '081269110001', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tkj1-02', nisn: '0067489102', name: 'Siti Sarah Munawwarah', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siti.sarah@siswa.smk.belajar.id', phone: '081269110002', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tkj1-03', nisn: '0067489103', name: 'Teuku Rizki Ramadhan', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'teuku.rizki@siswa.smk.belajar.id', phone: '081269110003', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tkj1-04', nisn: '0067489104', name: 'Cut Putri Rahmania', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'cut.putri@siswa.smk.belajar.id', phone: '081269110004', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  
  // XII TKJ 2
  { id: 'std-tkj2-01', nisn: '0067489201', name: 'Ahmad Raihan Al-Faruq', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'ahmad.raihan@siswa.smk.belajar.id', phone: '081269110005', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tkj2-02', nisn: '0067489202', name: 'Nabila Syakira', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'nabila.syakira@siswa.smk.belajar.id', phone: '081269110006', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tkj2-03', nisn: '0067489203', name: 'Fajar Al-Hafiz', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'fajar.hafiz@siswa.smk.belajar.id', phone: '081269110007', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },

  // XII TBSM 1
  { id: 'std-tbsm1-01', nisn: '0067489301', name: 'Muhammad Daffa Pratama', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'daffa.pratama@siswa.smk.belajar.id', phone: '081269110008', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tbsm1-02', nisn: '0067489302', name: 'Zulfa Azkia', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'zulfa.azkia@siswa.smk.belajar.id', phone: '081269110009', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tbsm1-03', nisn: '0067489303', name: 'Alfi Maulana', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'alfi.maulana@siswa.smk.belajar.id', phone: '081269110010', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },

  // XII TBSM 2
  { id: 'std-tbsm2-01', nisn: '0067489401', name: 'Fachrul Razi', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'fachrul.razi@siswa.smk.belajar.id', phone: '081269110011', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tbsm2-02', nisn: '0067489402', name: 'Rania Putri Khadijah', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'rania.putri@siswa.smk.belajar.id', phone: '081269110012', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },

  // XII TKR
  { id: 'std-tkr-01', nisn: '0067489501', name: 'Haidar Ali Wafi', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'haidar.ali@siswa.smk.belajar.id', phone: '081269110013', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tkr-02', nisn: '0067489502', name: 'Cut Meutia Luthfia', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'cut.meutia@siswa.smk.belajar.id', phone: '081269110014', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tkr-03', nisn: '0067489503', name: 'Khalid Basalamah', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'khalid.b@siswa.smk.belajar.id', phone: '081269110015', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },

  // XII TP
  { id: 'std-tp-01', nisn: '0067489601', name: 'Bilal Habibi', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'bilal.habibi@siswa.smk.belajar.id', phone: '081269110016', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-tp-02', nisn: '0067489602', name: 'Syifa Tazkiya', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'syifa.tazkiya@siswa.smk.belajar.id', phone: '081269110017', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },

  // XII DPB
  { id: 'std-dpb-01', nisn: '0067489701', name: 'Raudhatul Jannah', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'raudhatul.jannah@siswa.smk.belajar.id', phone: '081269110018', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'std-dpb-02', nisn: '0067489702', name: 'Intan Nuraini', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'intan.nuraini@siswa.smk.belajar.id', phone: '081269110019', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' }
];

// 7 Sesi Kelas Aktif Malam SMKN 1 Bandar Dua
export const INITIAL_ACTIVE_CLASSES: ActiveClass[] = [
  {
    id: 'act-001',
    classId: 'XII TBSM 1',
    className: 'Kelas XII TBSM 1',
    gradeLevel: 'XII',
    major: 'TBSM',
    subject: 'KEJURUAN TBSM',
    teacherName: 'AGUSSAMI',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    teacherEmail: 'agussami78@guru.smk.belajar.id',
    room: 'Bengkel Otomotif TBSM (Ruang Les XII TBSM 1)',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Sistem Injeksi PGM-FI, Troubleshooting Kelistrikan Bodi & Servis Rutin Sepeda Motor',
    totalStudents: 26,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'
  },
  {
    id: 'act-002',
    classId: 'XII TBSM 2',
    className: 'Kelas XII TBSM 2',
    gradeLevel: 'XII',
    major: 'TBSM',
    subject: 'B. INGGRIS',
    teacherName: 'CUT AJA NURLAINI',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    teacherEmail: 'cutnurlaini40@guru.smk.belajar.id',
    room: 'Ruang Les XII TBSM 2',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Vocational English: Technical Manual Comprehension & Workplace Safety SOP',
    totalStudents: 24,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'
  },
  {
    id: 'act-003',
    classId: 'XII TKR',
    className: 'Kelas XII TKR',
    gradeLevel: 'XII',
    major: 'TKRO',
    subject: 'MATEMATIKA',
    teacherName: 'SONITA ARINI',
    teacherAvatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    teacherEmail: 'sonitaarini20@guru.smk.belajar.id',
    room: 'Ruang Les XII TKR',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Numerasi Terapan: Perhitungan Rasio Transmisi Roda Gigi & Efisiensi Bahan Bakar',
    totalStudents: 28,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'
  },
  {
    id: 'act-004',
    classId: 'XII TKJ 1',
    className: 'Kelas XII TKJ 1',
    gradeLevel: 'XII',
    major: 'TKJ',
    subject: 'B. INDONESIA',
    teacherName: 'RADHIAH',
    teacherAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    teacherEmail: 'radhiah01@guru.smk.belajar.id',
    room: 'Ruang Les XII TKJ 1',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Literasi Membaca SMK: Analisis Laporan Kerusakan Jaringan & Dokumen SOP K3',
    totalStudents: 27,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'
  },
  {
    id: 'act-005',
    classId: 'XII TKJ 2',
    className: 'Kelas XII TKJ 2',
    gradeLevel: 'XII',
    major: 'TKJ',
    subject: 'B. INGGRIS',
    teacherName: 'CUT NANA YULIANA',
    teacherAvatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    teacherEmail: 'cut.nana30@guru.smk.belajar.id',
    room: 'Ruang Les XII TKJ 2',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Technical Troubleshooting Reading & Network Configuration Commands',
    totalStudents: 25,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'
  },
  {
    id: 'act-006',
    classId: 'XII TP',
    className: 'Kelas XII TP',
    gradeLevel: 'XII',
    major: 'TP',
    subject: 'B. INDONESIA',
    teacherName: 'T. BAKHTIAR EFFENDI',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    teacherEmail: 'tbakhtiareffendi49@guru.smk.belajar.id',
    room: 'Ruang Les XII TP',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Analisis Diagram Prosedur Kerja Pembubutan Presisi & Kalibrasi Mesin Frais',
    totalStudents: 22,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'
  },
  {
    id: 'act-007',
    classId: 'XII DPB',
    className: 'Kelas XII DPB',
    gradeLevel: 'XII',
    major: 'DPB',
    subject: 'MATEMATIKA',
    teacherName: 'MARHAMAH',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    teacherEmail: 'marhamah03@guru.smk.belajar.id',
    room: 'Ruang Les XII DPB',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Trigonometri & Kalkulasi Volume Struktur Bangunan dalam Estimasi RAB',
    totalStudents: 20,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws'
  }
];

// Soal-Soal TKA Pusmendik Kemendikbudristek Jenjang SMK Tahun 2026
export const INITIAL_EXAMS: ExamSimulation[] = [
  {
    id: 'exam-pusmendik-01',
    title: 'Simulasi Pusmendik TKA SMK 2026 - Numerasi & Penalaran Kuantitatif Terapan',
    category: 'Numerasi Terapan SMK',
    gradeLevel: 'XII',
    durationMinutes: 45,
    totalQuestions: 5,
    passingGrade: 75,
    description: 'Ujian simulasi Numerasi Terapan SMK berstandar Pusmendik 2026: Kalkulasi teknis permesinan, otomotif, jaringan komputer, dan estimasi biaya kejuruan.',
    createdAt: '2026-09-01',
    questions: [
      {
        id: 'num-smk-1',
        questionNumber: 1,
        questionText: 'Sebuah mesin bubut di bengkel Teknik Pemesinan (TP) menggunakan roda gigi transmisi. Roda gigi penggerak memiliki 24 gigi dan berputar pada kecepatan 1.200 rpm. Roda gigi yang digerakkan memiliki 72 gigi. Berapakah kecepatan putaran roda gigi yang digerakkan?',
        options: [
          { key: 'A', text: '300 rpm' },
          { key: 'B', text: '400 rpm' },
          { key: 'C', text: '600 rpm' },
          { key: 'D', text: '2.400 rpm' },
          { key: 'E', text: '3.600 rpm' }
        ],
        correctKey: 'B',
        explanation: 'Rumus perbandingan rasio roda gigi: N1 × Z1 = N2 × Z2, di mana N adalah kecepatan putar (rpm) dan Z adalah jumlah gigi. Maka: 1.200 × 24 = N2 × 72 => N2 = (1.200 × 24) / 72 = 28.800 / 72 = 400 rpm.',
        topic: 'Transmisi Mekanik & Rasio Kecepatan Mesin (TP/Otomotif)',
        points: 20
      },
      {
        id: 'num-smk-2',
        questionNumber: 2,
        questionText: 'Laboratorium Teknik Komputer dan Jaringan (TKJ) memiliki alokasi blok IP Address 192.168.10.0/26. Berapa jumlah maksimal host komputer client yang dapat terhubung secara valid dalam subnet tersebut?',
        options: [
          { key: 'A', text: '30 host' },
          { key: 'B', text: '62 host' },
          { key: 'C', text: '64 host' },
          { key: 'D', text: '126 host' },
          { key: 'E', text: '254 host' }
        ],
        correctKey: 'B',
        explanation: 'Prefix /26 menyisakan host bit = 32 - 26 = 6 bit. Jumlah total IP dalam blok = 2⁶ = 64 IP. Jumlah host yang valid (usable host) = 2⁶ - 2 (dikurangi 1 Network ID dan 1 Broadcast ID) = 64 - 2 = 62 host.',
        topic: 'Subnetting & Kalkulasi Alamat Jaringan (TKJ)',
        points: 20
      },
      {
        id: 'num-smk-3',
        questionNumber: 3,
        questionText: 'Sebuah sepeda motor 150cc pada uji performa bengkel TBSM menempuh jarak 180 km dengan menghabiskan bensin sebanyak 4 liter. Jika tangki bahan bakar berisi penuh 10 liter, berapa estimasi sisa bensin setelah menempuh perjalanan sejauh 360 km?',
        options: [
          { key: 'A', text: '1 liter' },
          { key: 'B', text: '2 liter' },
          { key: 'C', text: '3 liter' },
          { key: 'D', text: '4 liter' },
          { key: 'E', text: '8 liter' }
        ],
        correctKey: 'B',
        explanation: 'Efisiensi konsumsi bahan bakar = 180 km / 4 liter = 45 km/liter. Untuk menempuh 360 km dibutuhkan: 360 / 45 = 8 liter. Karena kapasitas awal tangki adalah 10 liter, maka sisa bensin dalam tangki = 10 - 8 = 2 liter.',
        topic: 'Efisiensi Konsumsi Energi & Perbandingan (TBSM/TKRO)',
        points: 20
      },
      {
        id: 'num-smk-4',
        questionNumber: 4,
        questionText: 'Dalam proyek Desain Pemodelan dan Informasi Bangunan (DPB), diperlukan pengecoran pelat lantai beton bertulang dengan panjang 12 meter, lebar 8 meter, dan tebal 15 cm (0,15 m). Jika harga ready-mix beton adalah Rp900.000,- per m³, berapakah total estimasi biaya pembelian beton tersebut?',
        options: [
          { key: 'A', text: 'Rp10.800.000,-' },
          { key: 'B', text: 'Rp12.960.000,-' },
          { key: 'C', text: 'Rp14.400.000,-' },
          { key: 'D', text: 'Rp16.200.000,-' },
          { key: 'E', text: 'Rp18.000.000,-' }
        ],
        correctKey: 'B',
        explanation: 'Volume pelat lantai beton = Panjang × Lebar × Tebal = 12 m × 8 m × 0,15 m = 14,4 m³. Total estimasi biaya = 14,4 m³ × Rp900.000/m³ = Rp12.960.000,-.',
        topic: 'Perhitungan Volume & Rencana Anggaran Biaya (DPB)',
        points: 20
      },
      {
        id: 'num-smk-5',
        questionNumber: 5,
        questionText: 'Sebuah motor listrik 3-fasa pada kompresor bengkel memiliki daya 2,2 kW (2.200 Watt) dan beroperasi rata-rata 5 jam setiap hari kerja. Jika tarif dasar listrik industri adalah Rp1.500,- per kWh, berapakah biaya listrik motor tersebut selama 20 hari kerja efektif?',
        options: [
          { key: 'A', text: 'Rp165.000,-' },
          { key: 'B', text: 'Rp220.000,-' },
          { key: 'C', text: 'Rp330.000,-' },
          { key: 'D', text: 'Rp440.000,-' },
          { key: 'E', text: 'Rp660.000,-' }
        ],
        correctKey: 'C',
        explanation: 'Konsumsi energi harian = 2,2 kW × 5 jam = 11 kWh/hari. Total konsumsi selama 20 hari = 11 kWh × 20 = 220 kWh. Total biaya listrik = 220 kWh × Rp1.500/kWh = Rp330.000,-.',
        topic: 'Konversi Energi & Kalkulasi Biaya Operasional Bengkel',
        points: 20
      }
    ]
  },
  {
    id: 'exam-pusmendik-02',
    title: 'Simulasi Pusmendik TKA SMK 2026 - Literasi Kejuruan & SOP Industri',
    category: 'Literasi Kejuruan SMK',
    gradeLevel: 'XII',
    durationMinutes: 35,
    totalQuestions: 4,
    passingGrade: 75,
    description: 'Ujian simulasi Literasi Membaca Dokumen Teknis, SOP K3 (Keselamatan dan Kesehatan Kerja), serta Troubleshooting Sistem Kejuruan SMK.',
    createdAt: '2026-09-02',
    questions: [
      {
        id: 'lit-smk-1',
        questionNumber: 1,
        questionText: 'Bacalah petunjuk SOP K3 berikut:\n"Sebelum menyalakan mesin perkakas di area bengkel fabrikasi, operator wajib memastikan sakelar darurat (Emergency Stop) berfungsi normal, menggunakan kacamata pelindung (safety goggles), mengikat rambut panjang, dan tidak mengenakan pakaian longgar atau aksesoris perhiasan yang berpotensi tersangkut putaran spindel."\n\nBerdasarkan teks SOP di atas, mengapa operator dilarang memakai pakaian longgar dan aksesoris di bengkel?',
        options: [
          { key: 'A', text: 'Karena pakaian longgar dapat menyerap panas berlebih dari mesin.' },
          { key: 'B', text: 'Karena aksesoris dan pakaian longgar berisiko tinggi tersangkut pada bagian mesin yang berputar kencang.' },
          { key: 'C', text: 'Agar operator terlihat lebih rapi di hadapan pengawas industri.' },
          { key: 'D', text: 'Karena bahan perhiasan dapat merusak lapisan cat pada mesin bubut.' },
          { key: 'E', text: 'Untuk menghemat biaya pembelian seragam kerja.' }
        ],
        correctKey: 'B',
        explanation: 'Teks SOP secara eksplisit menyatakan bahaya mekanis pakaian longgar dan perhiasan, yaitu "berpotensi tersangkut putaran spindel" yang dapat menimbulkan kecelakaan kerja fatal bagi operator.',
        topic: 'Analisis Prosedur K3 Lingkungan Kerja Industri',
        points: 25
      },
      {
        id: 'lit-smk-2',
        questionNumber: 2,
        questionText: 'Pada manual book motherboard server: "Lampu indikator LED POST (Power-On Self-Test) berwarna ORANYE menyala berkedip 3 kali secara berkala menunjukkan kegagalan inisialisasi pada modul memori utama (RAM)."\n\nTindakan teknis awal yang paling tepat dilakukan oleh teknisi TKJ adalah...',
        options: [
          { key: 'A', text: 'Mengganti unit Power Supply (PSU) dengan watt yang lebih besar.' },
          { key: 'B', text: 'Memasang ulang (reseat) keping RAM pada slotnya dan membersihkan pin tembaga kontak.' },
          { key: 'C', text: 'Melakukan instalasi ulang sistem operasi Windows/Linux.' },
          { key: 'D', text: 'Mengganti kabel kabel SATA harddisk drive.' },
          { key: 'E', text: 'Mengatur ulang kecepatan kipas pendingin processor.' }
        ],
        correctKey: 'B',
        explanation: 'Indikasi POST error 3 kedipan oranye merujuk langsung pada kegagalan memori RAM. Prosedur standar penanganan hardware sebelum penggantian adalah melepas, membersihkan pin kontak dari debu/oksidasi, dan memasang kembali (reseat) pada slot memori.',
        topic: 'Troubleshooting Perangkat Keras & Kode Diagnostik (TKJ)',
        points: 25
      },
      {
        id: 'lit-smk-3',
        questionNumber: 3,
        questionText: 'Sebuah dokumen teknis menyatakan: "Pemeriksaan celah katup (valve clearance) pada sepeda motor 4-tak harus dilakukan saat kondisi mesin DINGIN (di bawah 35°C)." Alasan teknis di balik ketentuan tersebut adalah...',
        options: [
          { key: 'A', text: 'Oli mesin tidak akan menetes saat mesin dalam keadaan dingin.' },
          { key: 'B', text: 'Logama katup dan rocker arm mengalami pemuaian termal saat panas, sehingga pengukuran saat panas tidak akurat.' },
          { key: 'C', text: 'Baut penyetel katup hanya dapat dibuka menggunakan kunci pas saat dingin.' },
          { key: 'D', text: 'Bahan bakar di karburator tidak akan menguap.' },
          { key: 'E', text: 'Tekanan kompresi ruang bakar menjadi nol saat mesin mati.' }
        ],
        correctKey: 'B',
        explanation: 'Secara ilmu fisika dan mekanika motor bakar, logam katup dan pelatuk mengalami pemuaian saat temperatur panas. Standar toleransi celah katup pada spesifikasi pabrik selalu ditentukan pada temperatur ruang/dingin agar celah kerja optimal tercapai saat mesin mencapai suhu kerja operasional.',
        topic: 'Prinsip Termal & Perawatan Berkala Mesin (TBSM/TKRO)',
        points: 25
      },
      {
        id: 'lit-smk-4',
        questionNumber: 4,
        questionText: 'Manakah penulisan istilah dan kata serapan teknis kejuruan di bawah ini yang paling tepat sesuai kaidah Pedoman Umum Ejaan Bahasa Indonesia (PUEBI)?',
        options: [
          { key: 'A', text: 'Teknisi melakukan sinkronisasi sistim jaringan dan standarisasi kwalitas.' },
          { key: 'B', text: 'Teknisi melakukan sinkronisasi sistem jaringan dan standardisasi kualitas.' },
          { key: 'C', text: 'Teknisi melakukan singkronisasi sistem jaringan dan standarisasi kualitas.' },
          { key: 'D', text: 'Teknisi melakukan sinkronisasi sistim jaringan dan standarisasi kualitas.' },
          { key: 'E', text: 'Teknisi melakukan syncronisasi system jaringan dan standarisasi kwalitas.' }
        ],
        correctKey: 'B',
        explanation: 'Bentuk baku menurut KBBI: "sinkronisasi" (bukan singkronisasi/syncronisasi), "sistem" (bukan sistim), "standardisasi" (mengikuti kata dasar standar + disasi), dan "kualitas" (bukan kwalitas).',
        topic: 'Kosakata Baku & Bahasa Indonesia Terapan',
        points: 25
      }
    ]
  },
  {
    id: 'exam-pusmendik-03',
    title: 'Simulasi Pusmendik TKA SMK 2026 - Vocational English in Workplace',
    category: 'Vocational English',
    gradeLevel: 'XII',
    durationMinutes: 30,
    totalQuestions: 3,
    passingGrade: 75,
    description: 'Ujian simulasi Bahasa Inggris Kejuruan SMK: Reading technical manuals, equipment maintenance notices, and workplace instructions.',
    createdAt: '2026-09-02',
    questions: [
      {
        id: 'voc-eng-1',
        questionNumber: 1,
        questionText: 'Read the following technical safety notice:\n"CAUTION: High voltage equipment inside. Disconnect all primary power supplies and wait at least 5 minutes for internal capacitors to discharge completely before opening the service panel."\n\nWhat must a technician do immediately before opening the service panel?',
        options: [
          { key: 'A', text: 'Clean the exterior surface with chemical solvent.' },
          { key: 'B', text: 'Turn off primary power and wait 5 minutes for capacitor discharge.' },
          { key: 'C', text: 'Replace the internal cooling fans.' },
          { key: 'D', text: 'Increase the input voltage to maximum capacity.' },
          { key: 'E', text: 'Connect an external grounding cable directly to the panel door.' }
        ],
        correctKey: 'B',
        explanation: 'The instruction explicitly dictates two mandatory sequential safety actions: "Disconnect all primary power supplies" and "wait at least 5 minutes for internal capacitors to discharge completely" before touching the internal circuitry.',
        topic: 'Technical Safety Notice Interpretation',
        points: 33.33
      },
      {
        id: 'voc-eng-2',
        questionNumber: 2,
        questionText: '"The computerized numerical control (CNC) machine automatically halts its operation ________ the sensor detects an obstruction in the cutting pathway."\n\nChoose the most appropriate conjunction to complete the technical sentence:',
        options: [
          { key: 'A', text: 'whenever' },
          { key: 'B', text: 'although' },
          { key: 'C', text: 'in order that' },
          { key: 'D', text: 'despite' },
          { key: 'E', text: 'unless' }
        ],
        correctKey: 'A',
        explanation: '"Whenever" means "every time that" or "at any time when", which perfectly expresses the automated conditional response of a safety sensor stopping machine operation upon detecting obstacles.',
        topic: 'Workplace Technical Grammar & Conjunctions',
        points: 33.33
      },
      {
        id: 'voc-eng-3',
        questionNumber: 3,
        questionText: 'In a job description for an IT Support technician: "The candidate will be responsible for diagnosing network anomalies, configuring routers, and maintaining system uptime."\n\nThe word "anomalies" is closest in meaning to...',
        options: [
          { key: 'A', text: 'irregularities or faults' },
          { key: 'B', text: 'hardware upgrades' },
          { key: 'C', text: 'routine updates' },
          { key: 'D', text: 'user permissions' },
          { key: 'E', text: 'cable measurements' }
        ],
        correctKey: 'A',
        explanation: 'In IT and technical terminology, an "anomaly" is a deviation from what is standard, normal, or expected—meaning a fault, glitch, or irregularity in system behavior.',
        topic: 'Technical Vocabulary in Context',
        points: 33.34
      }
    ]
  }
];

export const INITIAL_EXAM_RESULTS: ExamResult[] = [
  {
    id: 'res-smk-01',
    examId: 'exam-pusmendik-01',
    examTitle: 'Simulasi Pusmendik TKA SMK 2026 - Numerasi Terapan',
    subject: 'Numerasi Terapan SMK',
    studentId: 'std-tkj1-01',
    studentName: 'Muhammad Farhan',
    studentNisn: '0067489101',
    studentEmail: 'muhammad.farhan@siswa.smk.belajar.id',
    classId: 'XII TKJ 1',
    major: 'TKJ',
    score: 100,
    totalCorrect: 5,
    totalWrong: 0,
    totalSkipped: 0,
    totalQuestions: 5,
    timeSpentSeconds: 1350,
    submittedAt: '2026-09-02 20:55:12',
    answers: { 'num-smk-1': 'B', 'num-smk-2': 'B', 'num-smk-3': 'B', 'num-smk-4': 'B', 'num-smk-5': 'C' }
  },
  {
    id: 'res-smk-02',
    examId: 'exam-pusmendik-01',
    examTitle: 'Simulasi Pusmendik TKA SMK 2026 - Numerasi Terapan',
    subject: 'Numerasi Terapan SMK',
    studentId: 'std-tbsm1-01',
    studentName: 'Muhammad Daffa Pratama',
    studentNisn: '0067489301',
    studentEmail: 'daffa.pratama@siswa.smk.belajar.id',
    classId: 'XII TBSM 1',
    major: 'TBSM',
    score: 80,
    totalCorrect: 4,
    totalWrong: 1,
    totalSkipped: 0,
    totalQuestions: 5,
    timeSpentSeconds: 1520,
    submittedAt: '2026-09-02 20:58:30',
    answers: { 'num-smk-1': 'B', 'num-smk-2': 'A', 'num-smk-3': 'B', 'num-smk-4': 'B', 'num-smk-5': 'C' }
  },
  {
    id: 'res-smk-03',
    examId: 'exam-pusmendik-02',
    examTitle: 'Simulasi Pusmendik TKA SMK 2026 - Literasi Kejuruan & SOP',
    subject: 'Literasi Kejuruan SMK',
    studentId: 'std-tkj1-02',
    studentName: 'Siti Sarah Munawwarah',
    studentNisn: '0067489102',
    studentEmail: 'siti.sarah@siswa.smk.belajar.id',
    classId: 'XII TKJ 1',
    major: 'TKJ',
    score: 100,
    totalCorrect: 4,
    totalWrong: 0,
    totalSkipped: 0,
    totalQuestions: 4,
    timeSpentSeconds: 1100,
    submittedAt: '2026-09-03 20:45:00',
    answers: { 'lit-smk-1': 'B', 'lit-smk-2': 'B', 'lit-smk-3': 'B', 'lit-smk-4': 'B' }
  }
];

export const INITIAL_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-smk-01',
    title: 'Google Classroom Resmi: Bimbingan Belajar Les TKA SMKN 1 Bandar Dua',
    category: 'Google Classroom',
    gradeLevel: 'XII',
    type: 'classroom',
    description: 'Media pembelajaran interaktif resmi Google Classroom untuk 7 kelas XII SMKN 1 Bandar Dua. Dilengkapi modul per kejuruan (TBSM, TKRO, TP, DPB, TKJ), penugasan kuis mandiri, dan materi malam hari.',
    url: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws',
    classroomCode: 'embrt4ws',
    author: 'Tim Kurikulum SMKN 1 Bandar Dua',
    durationOrPages: 'Online 24/7 (Kode embrt4ws)',
    tags: ['Google Classroom', 'Kode embrt4ws', 'SMKN 1 Bandar Dua', 'Modul Utama']
  },
  {
    id: 'mat-smk-02',
    title: 'Kisi-Kisi Resmi Pusmendik TKA Jenjang SMK Tahun 2026',
    category: 'Numerasi Terapan SMK',
    gradeLevel: 'XII',
    type: 'pdf',
    description: 'Panduan lengkap kisi-kisi asesmen kemampuan akademik SMK: domain literasi kejuruan, numerasi terapan, dan penalaran logika pemecahan masalah industri.',
    url: 'https://docs.google.com',
    downloadUrl: '#',
    author: 'Pusat Asesmen Pendidikan (Pusmendik)',
    durationOrPages: '36 Halaman Dokumen PDF',
    tags: ['Pusmendik 2026', 'Kisi-Kisi TKA', 'SMK']
  },
  {
    id: 'mat-smk-03',
    title: 'Video Pembahasan Trik Cepat Soal Numerasi & Kalkulasi Kejuruan',
    category: 'Numerasi Terapan SMK',
    gradeLevel: 'XII',
    type: 'video',
    description: 'Video tutorial trik cepat menghitung rasio gigi, perbandingan efisiensi mesin, kalkulasi subnetting IP, dan estimasi biaya RAB dalam waktu 45 detik.',
    url: 'https://www.youtube.com',
    downloadUrl: '#',
    author: 'MARHAMAH & SONITA ARINI (Guru Matematika)',
    durationOrPages: '40 Menit Video HD',
    tags: ['Video', 'Matematika Terapan', 'Rumus Cepat']
  },
  {
    id: 'mat-smk-04',
    title: 'Modul Interaktif Vocational English & Technical Vocabulary SMK',
    category: 'Vocational English',
    gradeLevel: 'XII',
    type: 'interactive',
    description: 'Latihan interaktif pemahaman technical manual, safety notices, and business workplace correspondence.',
    url: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws',
    classroomCode: 'embrt4ws',
    author: 'CUT AJA NURLAINI & CUT NANA YULIANA',
    durationOrPages: '28 Slide Interaktif',
    tags: ['Vocational English', 'Classroom Post']
  }
];

export const INITIAL_VISITOR_STATS: VisitorStat[] = [
  { date: '28 Agu', visitors: 640, pageViews: 2190, activeStudents: 140 },
  { date: '29 Agu', visitors: 780, pageViews: 2840, activeStudents: 180 },
  { date: '30 Agu', visitors: 950, pageViews: 3410, activeStudents: 210 },
  { date: '31 Agu', visitors: 1120, pageViews: 4120, activeStudents: 260 },
  { date: '01 Sep', visitors: 1380, pageViews: 5240, activeStudents: 310 },
  { date: '02 Sep', visitors: 1650, pageViews: 6150, activeStudents: 380 },
  { date: '03 Sep', visitors: 1890, pageViews: 7400, activeStudents: 430 }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-01', date: '2026-09-02', time: '20:15', studentId: 'std-tkj1-01', studentName: 'Muhammad Farhan', nisn: '0067489101', classId: 'XII TKJ 1', major: 'TKJ', session: 'Sesi Malam (20:15 - 21:00 WIB)', status: 'hadir', notes: 'Hadir tepat waktu di lab', recordedBy: 'RADHIAH', timestamp: Date.now() - 3600000 },
  { id: 'att-02', date: '2026-09-02', time: '20:16', studentId: 'std-tkj1-02', studentName: 'Siti Sarah Munawwarah', nisn: '0067489102', classId: 'XII TKJ 1', major: 'TKJ', session: 'Sesi Malam (20:15 - 21:00 WIB)', status: 'hadir', notes: 'Hadir aktif', recordedBy: 'RADHIAH', timestamp: Date.now() - 3500000 },
  { id: 'att-03', date: '2026-09-02', time: '20:18', studentId: 'std-tbsm1-01', studentName: 'Muhammad Daffa Pratama', nisn: '0067489301', classId: 'XII TBSM 1', major: 'TBSM', session: 'Sesi Malam (20:15 - 21:00 WIB)', status: 'hadir', notes: 'Hadir di bengkel', recordedBy: 'AGUSSAMI', timestamp: Date.now() - 3400000 }
];

export const INITIAL_TEACHER_ATTENDANCE: TeacherAttendanceRecord[] = [
  {
    id: 'tatt-01',
    date: '2026-09-02',
    checkInTime: '20:10 WIB',
    teacherId: 'tch-25',
    teacherName: 'AGUSSAMI',
    subject: 'KEJURUAN TBSM',
    classId: 'XII TBSM 1',
    room: 'Ruang Les XII TBSM 1',
    topic: 'Sistem Injeksi PGM-FI dan Troubleshooting Kelistrikan Sepeda Motor',
    status: 'hadir',
    notes: 'Seluruh siswa kelas XII TBSM 1 hadir dan aktif praktik pemecahan masalah',
    timestamp: Date.now() - 4000000
  },
  {
    id: 'tatt-02',
    date: '2026-09-02',
    checkInTime: '20:12 WIB',
    teacherId: 'tch-02',
    teacherName: 'FAISAL',
    subject: 'KEJURUAN TKJ',
    classId: 'XII TKJ 1',
    room: 'Lab Komputer TKJ',
    topic: 'Konfigurasi Routing Dinamis dan Keamanan Jaringan Komputer',
    status: 'hadir',
    notes: 'Pembahasan 15 soal Pusmendik TKA SMK 2026',
    timestamp: Date.now() - 3500000
  }
];

// Helper functions for LocalStorage persistence
const isClient = typeof window !== 'undefined';

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem(`tka_smkn1_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(`tka_smkn1_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}
