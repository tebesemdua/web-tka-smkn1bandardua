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

// Default Initial Users (Aman & Berbasis Inisial / Dummy)
export const GUEST_USER: User = {
  id: 'guest',
  name: 'Tamu (Belum Login)',
  email: 'portal@smknegeri1bandardua.sch.id',
  role: 'guest',
  avatar: '',
  school: 'SMK Negeri 1 Bandar Dua'
};

export const DEFAULT_USERS: Record<string, User> = {
  guest: GUEST_USER,
  admin: {
    id: 'ADM-01',
    name: 'Administrator TKA SMKN 1 Bandar Dua',
    email: 'admin_tka@smkn1bandardua.sch.id',
    role: 'admin',
    avatar: '',
    school: 'SMK Negeri 1 Bandar Dua'
  },
  guru: {
    id: 'GRU-002',
    name: 'Guru Inisial G-02',
    email: 'guru002@smkn1bandardua.sch.id',
    role: 'guru',
    avatar: '',
    school: 'SMK Negeri 1 Bandar Dua',
    nip: '198501012010011002',
    major: 'KEJURUAN TKJ'
  },
  siswa: {
    id: 'SIS-001',
    name: 'Siswa Inisial S-001',
    email: 'siswa001@smkn1bandardua.sch.id',
    role: 'siswa',
    avatar: '',
    school: 'SMK Negeri 1 Bandar Dua',
    classId: 'XII TBSM 1',
    major: 'TBSM',
    nisn: '0067400001'
  }
};

// 31 Guru Pengajar Lengkap SMKN 1 Bandar Dua (Format Inisial Aman GRU-001 s.d. GRU-031)
export const INITIAL_TEACHERS: Teacher[] = [
  { id: 'GRU-001', nip: '198501012010011001', name: 'Guru Inisial G-01', email: 'guru001@smkn1bandardua.sch.id', subject: 'KEJURUAN TP', phone: '081269000001', avatar: '', status: 'active', },
  { id: 'GRU-002', nip: '198501012010011002', name: 'Guru Inisial G-02', email: 'guru002@smkn1bandardua.sch.id', subject: 'KEJURUAN TKJ', phone: '081269000002', avatar: '', status: 'in_class', currentClass: 'XII TKJ 1', currentRoom: 'Lab Komputer TKJ', currentSubject: 'KEJURUAN TKJ', startTime: '20:15 WIB', },
  { id: 'GRU-003', nip: '198501012010011003', name: 'Guru Inisial G-03', email: 'guru003@smkn1bandardua.sch.id', subject: 'KEJURUAN TKJ', phone: '081269000003', avatar: '', status: 'in_class', currentClass: 'XII TKJ 2', currentRoom: 'Ruang Les XII TKJ 2', currentSubject: 'KEJURUAN TKJ', startTime: '20:15 WIB', },
  { id: 'GRU-004', nip: '198501012010011004', name: 'Guru Inisial G-04', email: 'guru004@smkn1bandardua.sch.id', subject: 'KEJURUAN TP', phone: '081269000004', avatar: '', status: 'active', },
  { id: 'GRU-005', nip: '198501012010011005', name: 'Guru Inisial G-05', email: 'guru005@smkn1bandardua.sch.id', subject: 'KEJURUAN TP', phone: '081269000005', avatar: '', status: 'active', },
  { id: 'GRU-006', nip: '198501012010011006', name: 'Guru Inisial G-06', email: 'guru006@smkn1bandardua.sch.id', subject: 'KEJURUAN DPB', phone: '081269000006', avatar: '', status: 'active', },
  { id: 'GRU-007', nip: '198501012010011007', name: 'Guru Inisial G-07', email: 'guru007@smkn1bandardua.sch.id', subject: 'KEJURUAN DPB', phone: '081269000007', avatar: '', status: 'active', },
  { id: 'GRU-008', nip: '198501012010011008', name: 'Guru Inisial G-08', email: 'guru008@smkn1bandardua.sch.id', subject: 'KEJURUAN DPB', phone: '081269000008', avatar: '', status: 'active', },
  { id: 'GRU-009', nip: '198501012010011009', name: 'Guru Inisial G-09', email: 'guru009@smkn1bandardua.sch.id', subject: 'KEJURUAN DPB', phone: '081269000009', avatar: '', status: 'active', },
  { id: 'GRU-010', nip: '198501012010011010', name: 'Guru Inisial G-10', email: 'guru010@smkn1bandardua.sch.id', subject: 'KEJURUAN DPB', phone: '081269000010', avatar: '', status: 'active', },
  { id: 'GRU-011', nip: '198501012010011011', name: 'Guru Inisial G-11', email: 'guru011@smkn1bandardua.sch.id', subject: 'KEJURUAN DPB', phone: '081269000011', avatar: '', status: 'active', },
  { id: 'GRU-012', nip: '198501012010011012', name: 'Guru Inisial G-12', email: 'guru012@smkn1bandardua.sch.id', subject: 'KEJURUAN DPB', phone: '081269000012', avatar: '', status: 'active', },
  { id: 'GRU-013', nip: '198501012010011013', name: 'Guru Inisial G-13', email: 'guru013@smkn1bandardua.sch.id', subject: 'MATEMATIKA', phone: '081269000013', avatar: '', status: 'in_class', currentClass: 'XII DPB', currentRoom: 'Ruang Les XII DPB', currentSubject: 'MATEMATIKA', startTime: '20:15 WIB', },
  { id: 'GRU-014', nip: '198501012010011014', name: 'Guru Inisial G-14', email: 'guru014@smkn1bandardua.sch.id', subject: 'MATEMATIKA', phone: '081269000014', avatar: '', status: 'active', },
  { id: 'GRU-015', nip: '198501012010011015', name: 'Guru Inisial G-15', email: 'guru015@smkn1bandardua.sch.id', subject: 'MATEMATIKA', phone: '081269000015', avatar: '', status: 'in_class', currentClass: 'XII TKR', currentRoom: 'Ruang Les XII TKR', currentSubject: 'MATEMATIKA', startTime: '20:15 WIB', },
  { id: 'GRU-016', nip: '198501012010011016', name: 'Guru Inisial G-16', email: 'guru016@smkn1bandardua.sch.id', subject: 'MATEMATIKA', phone: '081269000016', avatar: '', status: 'active', },
  { id: 'GRU-017', nip: '198501012010011017', name: 'Guru Inisial G-17', email: 'guru017@smkn1bandardua.sch.id', subject: 'MATEMATIKA', phone: '081269000017', avatar: '', status: 'active', },
  { id: 'GRU-018', nip: '198501012010011018', name: 'Guru Inisial G-18', email: 'guru018@smkn1bandardua.sch.id', subject: 'MATEMATIKA', phone: '081269000018', avatar: '', status: 'active', },
  { id: 'GRU-019', nip: '198501012010011019', name: 'Guru Inisial G-19', email: 'guru019@smkn1bandardua.sch.id', subject: 'B. INDONESIA', phone: '081269000019', avatar: '', status: 'active', },
  { id: 'GRU-020', nip: '198501012010011020', name: 'Guru Inisial G-20', email: 'guru020@smkn1bandardua.sch.id', subject: 'B. INDONESIA', phone: '081269000020', avatar: '', status: 'in_class', currentClass: 'XII TP', currentRoom: 'Ruang Les XII TP', currentSubject: 'B. INDONESIA', startTime: '20:15 WIB', },
  { id: 'GRU-021', nip: '198501012010011021', name: 'Guru Inisial G-21', email: 'guru021@smkn1bandardua.sch.id', subject: 'B. INDONESIA', phone: '081269000021', avatar: '', status: 'in_class', currentClass: 'XII TKJ 1', currentRoom: 'Ruang Les XII TKJ 1', currentSubject: 'B. INDONESIA', startTime: '20:15 WIB', },
  { id: 'GRU-022', nip: '198501012010011022', name: 'Guru Inisial G-22', email: 'guru022@smkn1bandardua.sch.id', subject: 'B. INDONESIA', phone: '081269000022', avatar: '', status: 'active', },
  { id: 'GRU-023', nip: '198501012010011023', name: 'Guru Inisial G-23', email: 'guru023@smkn1bandardua.sch.id', subject: 'B. INGGRIS', phone: '081269000023', avatar: '', status: 'in_class', currentClass: 'XII TBSM 2', currentRoom: 'Ruang Les XII TBSM 2', currentSubject: 'B. INGGRIS', startTime: '20:15 WIB', },
  { id: 'GRU-024', nip: '198501012010011024', name: 'Guru Inisial G-24', email: 'guru024@smkn1bandardua.sch.id', subject: 'B. INGGRIS', phone: '081269000024', avatar: '', status: 'in_class', currentClass: 'XII TKJ 2', currentRoom: 'Ruang Les XII TKJ 2', currentSubject: 'B. INGGRIS', startTime: '20:15 WIB', },
  { id: 'GRU-025', nip: '198501012010011025', name: 'Guru Inisial G-25', email: 'guru025@smkn1bandardua.sch.id', subject: 'KEJURUAN TBSM', phone: '081269000025', avatar: '', status: 'in_class', currentClass: 'XII TBSM 1', currentRoom: 'Bengkel Otomotif TBSM', currentSubject: 'KEJURUAN TBSM', startTime: '20:15 WIB', },
  { id: 'GRU-026', nip: '198501012010011026', name: 'Guru Inisial G-26', email: 'guru026@smkn1bandardua.sch.id', subject: 'KEJURUAN TBSM', phone: '081269000026', avatar: '', status: 'active', },
  { id: 'GRU-027', nip: '198501012010011027', name: 'Guru Inisial G-27', email: 'guru027@smkn1bandardua.sch.id', subject: 'KEJURUAN TBSM', phone: '081269000027', avatar: '', status: 'active', },
  { id: 'GRU-028', nip: '198501012010011028', name: 'Guru Inisial G-28', email: 'guru028@smkn1bandardua.sch.id', subject: 'KEJURUAN TBSM', phone: '081269000028', avatar: '', status: 'active', },
  { id: 'GRU-029', nip: '198501012010011029', name: 'Guru Inisial G-29', email: 'guru029@smkn1bandardua.sch.id', subject: 'KEJURUAN TKRO', phone: '081269000029', avatar: '', status: 'active', },
  { id: 'GRU-030', nip: '198501012010011030', name: 'Guru Inisial G-30', email: 'guru030@smkn1bandardua.sch.id', subject: 'KEJURUAN TKRO', phone: '081269000030', avatar: '', status: 'active', },
  { id: 'GRU-031', nip: '198501012010011031', name: 'Guru Inisial G-31', email: 'guru031@smkn1bandardua.sch.id', subject: 'KEJURUAN TKRO', phone: '081269000031', avatar: '', status: 'active', }
];

// 160 Siswa Terdaftar Lengkap (Format Inisial Aman SIS-001 s.d. SIS-160)
export const INITIAL_STUDENTS: Student[] = [
  { id: 'SIS-001', nisn: '0067400001', name: 'Siswa Inisial S-001', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa001@smkn1bandardua.sch.id', phone: '081269110001', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-002', nisn: '0067400002', name: 'Siswa Inisial S-002', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa002@smkn1bandardua.sch.id', phone: '081269110002', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-003', nisn: '0067400003', name: 'Siswa Inisial S-003', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa003@smkn1bandardua.sch.id', phone: '081269110003', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-004', nisn: '0067400004', name: 'Siswa Inisial S-004', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa004@smkn1bandardua.sch.id', phone: '081269110004', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-005', nisn: '0067400005', name: 'Siswa Inisial S-005', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa005@smkn1bandardua.sch.id', phone: '081269110005', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-006', nisn: '0067400006', name: 'Siswa Inisial S-006', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa006@smkn1bandardua.sch.id', phone: '081269110006', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-007', nisn: '0067400007', name: 'Siswa Inisial S-007', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa007@smkn1bandardua.sch.id', phone: '081269110007', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-008', nisn: '0067400008', name: 'Siswa Inisial S-008', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa008@smkn1bandardua.sch.id', phone: '081269110008', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-009', nisn: '0067400009', name: 'Siswa Inisial S-009', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa009@smkn1bandardua.sch.id', phone: '081269110009', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-010', nisn: '0067400010', name: 'Siswa Inisial S-010', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa010@smkn1bandardua.sch.id', phone: '081269110010', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-011', nisn: '0067400011', name: 'Siswa Inisial S-011', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa011@smkn1bandardua.sch.id', phone: '081269110011', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-012', nisn: '0067400012', name: 'Siswa Inisial S-012', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa012@smkn1bandardua.sch.id', phone: '081269110012', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-013', nisn: '0067400013', name: 'Siswa Inisial S-013', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa013@smkn1bandardua.sch.id', phone: '081269110013', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-014', nisn: '0067400014', name: 'Siswa Inisial S-014', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa014@smkn1bandardua.sch.id', phone: '081269110014', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-015', nisn: '0067400015', name: 'Siswa Inisial S-015', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa015@smkn1bandardua.sch.id', phone: '081269110015', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-016', nisn: '0067400016', name: 'Siswa Inisial S-016', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa016@smkn1bandardua.sch.id', phone: '081269110016', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-017', nisn: '0067400017', name: 'Siswa Inisial S-017', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa017@smkn1bandardua.sch.id', phone: '081269110017', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-018', nisn: '0067400018', name: 'Siswa Inisial S-018', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa018@smkn1bandardua.sch.id', phone: '081269110018', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-019', nisn: '0067400019', name: 'Siswa Inisial S-019', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa019@smkn1bandardua.sch.id', phone: '081269110019', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-020', nisn: '0067400020', name: 'Siswa Inisial S-020', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa020@smkn1bandardua.sch.id', phone: '081269110020', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-021', nisn: '0067400021', name: 'Siswa Inisial S-021', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa021@smkn1bandardua.sch.id', phone: '081269110021', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-022', nisn: '0067400022', name: 'Siswa Inisial S-022', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa022@smkn1bandardua.sch.id', phone: '081269110022', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-023', nisn: '0067400023', name: 'Siswa Inisial S-023', classId: 'XII TBSM 1', gradeLevel: 'XII', major: 'TBSM', email: 'siswa023@smkn1bandardua.sch.id', phone: '081269110023', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-024', nisn: '0067400024', name: 'Siswa Inisial S-024', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa024@smkn1bandardua.sch.id', phone: '081269110024', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-025', nisn: '0067400025', name: 'Siswa Inisial S-025', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa025@smkn1bandardua.sch.id', phone: '081269110025', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-026', nisn: '0067400026', name: 'Siswa Inisial S-026', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa026@smkn1bandardua.sch.id', phone: '081269110026', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-027', nisn: '0067400027', name: 'Siswa Inisial S-027', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa027@smkn1bandardua.sch.id', phone: '081269110027', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-028', nisn: '0067400028', name: 'Siswa Inisial S-028', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa028@smkn1bandardua.sch.id', phone: '081269110028', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-029', nisn: '0067400029', name: 'Siswa Inisial S-029', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa029@smkn1bandardua.sch.id', phone: '081269110029', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-030', nisn: '0067400030', name: 'Siswa Inisial S-030', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa030@smkn1bandardua.sch.id', phone: '081269110030', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-031', nisn: '0067400031', name: 'Siswa Inisial S-031', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa031@smkn1bandardua.sch.id', phone: '081269110031', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-032', nisn: '0067400032', name: 'Siswa Inisial S-032', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa032@smkn1bandardua.sch.id', phone: '081269110032', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-033', nisn: '0067400033', name: 'Siswa Inisial S-033', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa033@smkn1bandardua.sch.id', phone: '081269110033', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-034', nisn: '0067400034', name: 'Siswa Inisial S-034', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa034@smkn1bandardua.sch.id', phone: '081269110034', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-035', nisn: '0067400035', name: 'Siswa Inisial S-035', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa035@smkn1bandardua.sch.id', phone: '081269110035', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-036', nisn: '0067400036', name: 'Siswa Inisial S-036', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa036@smkn1bandardua.sch.id', phone: '081269110036', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-037', nisn: '0067400037', name: 'Siswa Inisial S-037', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa037@smkn1bandardua.sch.id', phone: '081269110037', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-038', nisn: '0067400038', name: 'Siswa Inisial S-038', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa038@smkn1bandardua.sch.id', phone: '081269110038', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-039', nisn: '0067400039', name: 'Siswa Inisial S-039', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa039@smkn1bandardua.sch.id', phone: '081269110039', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-040', nisn: '0067400040', name: 'Siswa Inisial S-040', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa040@smkn1bandardua.sch.id', phone: '081269110040', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-041', nisn: '0067400041', name: 'Siswa Inisial S-041', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa041@smkn1bandardua.sch.id', phone: '081269110041', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-042', nisn: '0067400042', name: 'Siswa Inisial S-042', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa042@smkn1bandardua.sch.id', phone: '081269110042', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-043', nisn: '0067400043', name: 'Siswa Inisial S-043', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa043@smkn1bandardua.sch.id', phone: '081269110043', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-044', nisn: '0067400044', name: 'Siswa Inisial S-044', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa044@smkn1bandardua.sch.id', phone: '081269110044', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-045', nisn: '0067400045', name: 'Siswa Inisial S-045', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa045@smkn1bandardua.sch.id', phone: '081269110045', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-046', nisn: '0067400046', name: 'Siswa Inisial S-046', classId: 'XII TBSM 2', gradeLevel: 'XII', major: 'TBSM', email: 'siswa046@smkn1bandardua.sch.id', phone: '081269110046', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-047', nisn: '0067400047', name: 'Siswa Inisial S-047', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa047@smkn1bandardua.sch.id', phone: '081269110047', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-048', nisn: '0067400048', name: 'Siswa Inisial S-048', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa048@smkn1bandardua.sch.id', phone: '081269110048', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-049', nisn: '0067400049', name: 'Siswa Inisial S-049', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa049@smkn1bandardua.sch.id', phone: '081269110049', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-050', nisn: '0067400050', name: 'Siswa Inisial S-050', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa050@smkn1bandardua.sch.id', phone: '081269110050', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-051', nisn: '0067400051', name: 'Siswa Inisial S-051', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa051@smkn1bandardua.sch.id', phone: '081269110051', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-052', nisn: '0067400052', name: 'Siswa Inisial S-052', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa052@smkn1bandardua.sch.id', phone: '081269110052', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-053', nisn: '0067400053', name: 'Siswa Inisial S-053', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa053@smkn1bandardua.sch.id', phone: '081269110053', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-054', nisn: '0067400054', name: 'Siswa Inisial S-054', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa054@smkn1bandardua.sch.id', phone: '081269110054', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-055', nisn: '0067400055', name: 'Siswa Inisial S-055', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa055@smkn1bandardua.sch.id', phone: '081269110055', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-056', nisn: '0067400056', name: 'Siswa Inisial S-056', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa056@smkn1bandardua.sch.id', phone: '081269110056', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-057', nisn: '0067400057', name: 'Siswa Inisial S-057', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa057@smkn1bandardua.sch.id', phone: '081269110057', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-058', nisn: '0067400058', name: 'Siswa Inisial S-058', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa058@smkn1bandardua.sch.id', phone: '081269110058', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-059', nisn: '0067400059', name: 'Siswa Inisial S-059', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa059@smkn1bandardua.sch.id', phone: '081269110059', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-060', nisn: '0067400060', name: 'Siswa Inisial S-060', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa060@smkn1bandardua.sch.id', phone: '081269110060', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-061', nisn: '0067400061', name: 'Siswa Inisial S-061', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa061@smkn1bandardua.sch.id', phone: '081269110061', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-062', nisn: '0067400062', name: 'Siswa Inisial S-062', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa062@smkn1bandardua.sch.id', phone: '081269110062', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-063', nisn: '0067400063', name: 'Siswa Inisial S-063', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa063@smkn1bandardua.sch.id', phone: '081269110063', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-064', nisn: '0067400064', name: 'Siswa Inisial S-064', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa064@smkn1bandardua.sch.id', phone: '081269110064', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-065', nisn: '0067400065', name: 'Siswa Inisial S-065', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa065@smkn1bandardua.sch.id', phone: '081269110065', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-066', nisn: '0067400066', name: 'Siswa Inisial S-066', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa066@smkn1bandardua.sch.id', phone: '081269110066', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-067', nisn: '0067400067', name: 'Siswa Inisial S-067', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa067@smkn1bandardua.sch.id', phone: '081269110067', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-068', nisn: '0067400068', name: 'Siswa Inisial S-068', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa068@smkn1bandardua.sch.id', phone: '081269110068', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-069', nisn: '0067400069', name: 'Siswa Inisial S-069', classId: 'XII TKR', gradeLevel: 'XII', major: 'TKRO', email: 'siswa069@smkn1bandardua.sch.id', phone: '081269110069', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-070', nisn: '0067400070', name: 'Siswa Inisial S-070', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa070@smkn1bandardua.sch.id', phone: '081269110070', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-071', nisn: '0067400071', name: 'Siswa Inisial S-071', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa071@smkn1bandardua.sch.id', phone: '081269110071', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-072', nisn: '0067400072', name: 'Siswa Inisial S-072', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa072@smkn1bandardua.sch.id', phone: '081269110072', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-073', nisn: '0067400073', name: 'Siswa Inisial S-073', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa073@smkn1bandardua.sch.id', phone: '081269110073', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-074', nisn: '0067400074', name: 'Siswa Inisial S-074', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa074@smkn1bandardua.sch.id', phone: '081269110074', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-075', nisn: '0067400075', name: 'Siswa Inisial S-075', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa075@smkn1bandardua.sch.id', phone: '081269110075', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-076', nisn: '0067400076', name: 'Siswa Inisial S-076', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa076@smkn1bandardua.sch.id', phone: '081269110076', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-077', nisn: '0067400077', name: 'Siswa Inisial S-077', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa077@smkn1bandardua.sch.id', phone: '081269110077', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-078', nisn: '0067400078', name: 'Siswa Inisial S-078', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa078@smkn1bandardua.sch.id', phone: '081269110078', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-079', nisn: '0067400079', name: 'Siswa Inisial S-079', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa079@smkn1bandardua.sch.id', phone: '081269110079', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-080', nisn: '0067400080', name: 'Siswa Inisial S-080', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa080@smkn1bandardua.sch.id', phone: '081269110080', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-081', nisn: '0067400081', name: 'Siswa Inisial S-081', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa081@smkn1bandardua.sch.id', phone: '081269110081', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-082', nisn: '0067400082', name: 'Siswa Inisial S-082', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa082@smkn1bandardua.sch.id', phone: '081269110082', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-083', nisn: '0067400083', name: 'Siswa Inisial S-083', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa083@smkn1bandardua.sch.id', phone: '081269110083', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-084', nisn: '0067400084', name: 'Siswa Inisial S-084', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa084@smkn1bandardua.sch.id', phone: '081269110084', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-085', nisn: '0067400085', name: 'Siswa Inisial S-085', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa085@smkn1bandardua.sch.id', phone: '081269110085', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-086', nisn: '0067400086', name: 'Siswa Inisial S-086', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa086@smkn1bandardua.sch.id', phone: '081269110086', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-087', nisn: '0067400087', name: 'Siswa Inisial S-087', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa087@smkn1bandardua.sch.id', phone: '081269110087', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-088', nisn: '0067400088', name: 'Siswa Inisial S-088', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa088@smkn1bandardua.sch.id', phone: '081269110088', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-089', nisn: '0067400089', name: 'Siswa Inisial S-089', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa089@smkn1bandardua.sch.id', phone: '081269110089', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-090', nisn: '0067400090', name: 'Siswa Inisial S-090', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa090@smkn1bandardua.sch.id', phone: '081269110090', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-091', nisn: '0067400091', name: 'Siswa Inisial S-091', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa091@smkn1bandardua.sch.id', phone: '081269110091', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-092', nisn: '0067400092', name: 'Siswa Inisial S-092', classId: 'XII TP', gradeLevel: 'XII', major: 'TP', email: 'siswa092@smkn1bandardua.sch.id', phone: '081269110092', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-093', nisn: '0067400093', name: 'Siswa Inisial S-093', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa093@smkn1bandardua.sch.id', phone: '081269110093', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-094', nisn: '0067400094', name: 'Siswa Inisial S-094', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa094@smkn1bandardua.sch.id', phone: '081269110094', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-095', nisn: '0067400095', name: 'Siswa Inisial S-095', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa095@smkn1bandardua.sch.id', phone: '081269110095', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-096', nisn: '0067400096', name: 'Siswa Inisial S-096', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa096@smkn1bandardua.sch.id', phone: '081269110096', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-097', nisn: '0067400097', name: 'Siswa Inisial S-097', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa097@smkn1bandardua.sch.id', phone: '081269110097', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-098', nisn: '0067400098', name: 'Siswa Inisial S-098', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa098@smkn1bandardua.sch.id', phone: '081269110098', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-099', nisn: '0067400099', name: 'Siswa Inisial S-099', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa099@smkn1bandardua.sch.id', phone: '081269110099', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-100', nisn: '0067400100', name: 'Siswa Inisial S-100', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa100@smkn1bandardua.sch.id', phone: '081269110100', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-101', nisn: '0067400101', name: 'Siswa Inisial S-101', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa101@smkn1bandardua.sch.id', phone: '081269110101', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-102', nisn: '0067400102', name: 'Siswa Inisial S-102', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa102@smkn1bandardua.sch.id', phone: '081269110102', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-103', nisn: '0067400103', name: 'Siswa Inisial S-103', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa103@smkn1bandardua.sch.id', phone: '081269110103', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-104', nisn: '0067400104', name: 'Siswa Inisial S-104', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa104@smkn1bandardua.sch.id', phone: '081269110104', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-105', nisn: '0067400105', name: 'Siswa Inisial S-105', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa105@smkn1bandardua.sch.id', phone: '081269110105', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-106', nisn: '0067400106', name: 'Siswa Inisial S-106', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa106@smkn1bandardua.sch.id', phone: '081269110106', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-107', nisn: '0067400107', name: 'Siswa Inisial S-107', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa107@smkn1bandardua.sch.id', phone: '081269110107', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-108', nisn: '0067400108', name: 'Siswa Inisial S-108', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa108@smkn1bandardua.sch.id', phone: '081269110108', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-109', nisn: '0067400109', name: 'Siswa Inisial S-109', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa109@smkn1bandardua.sch.id', phone: '081269110109', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-110', nisn: '0067400110', name: 'Siswa Inisial S-110', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa110@smkn1bandardua.sch.id', phone: '081269110110', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-111', nisn: '0067400111', name: 'Siswa Inisial S-111', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa111@smkn1bandardua.sch.id', phone: '081269110111', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-112', nisn: '0067400112', name: 'Siswa Inisial S-112', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa112@smkn1bandardua.sch.id', phone: '081269110112', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-113', nisn: '0067400113', name: 'Siswa Inisial S-113', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa113@smkn1bandardua.sch.id', phone: '081269110113', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-114', nisn: '0067400114', name: 'Siswa Inisial S-114', classId: 'XII DPB', gradeLevel: 'XII', major: 'DPB', email: 'siswa114@smkn1bandardua.sch.id', phone: '081269110114', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-115', nisn: '0067400115', name: 'Siswa Inisial S-115', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa115@smkn1bandardua.sch.id', phone: '081269110115', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-116', nisn: '0067400116', name: 'Siswa Inisial S-116', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa116@smkn1bandardua.sch.id', phone: '081269110116', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-117', nisn: '0067400117', name: 'Siswa Inisial S-117', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa117@smkn1bandardua.sch.id', phone: '081269110117', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-118', nisn: '0067400118', name: 'Siswa Inisial S-118', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa118@smkn1bandardua.sch.id', phone: '081269110118', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-119', nisn: '0067400119', name: 'Siswa Inisial S-119', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa119@smkn1bandardua.sch.id', phone: '081269110119', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-120', nisn: '0067400120', name: 'Siswa Inisial S-120', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa120@smkn1bandardua.sch.id', phone: '081269110120', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-121', nisn: '0067400121', name: 'Siswa Inisial S-121', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa121@smkn1bandardua.sch.id', phone: '081269110121', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-122', nisn: '0067400122', name: 'Siswa Inisial S-122', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa122@smkn1bandardua.sch.id', phone: '081269110122', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-123', nisn: '0067400123', name: 'Siswa Inisial S-123', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa123@smkn1bandardua.sch.id', phone: '081269110123', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-124', nisn: '0067400124', name: 'Siswa Inisial S-124', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa124@smkn1bandardua.sch.id', phone: '081269110124', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-125', nisn: '0067400125', name: 'Siswa Inisial S-125', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa125@smkn1bandardua.sch.id', phone: '081269110125', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-126', nisn: '0067400126', name: 'Siswa Inisial S-126', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa126@smkn1bandardua.sch.id', phone: '081269110126', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-127', nisn: '0067400127', name: 'Siswa Inisial S-127', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa127@smkn1bandardua.sch.id', phone: '081269110127', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-128', nisn: '0067400128', name: 'Siswa Inisial S-128', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa128@smkn1bandardua.sch.id', phone: '081269110128', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-129', nisn: '0067400129', name: 'Siswa Inisial S-129', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa129@smkn1bandardua.sch.id', phone: '081269110129', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-130', nisn: '0067400130', name: 'Siswa Inisial S-130', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa130@smkn1bandardua.sch.id', phone: '081269110130', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-131', nisn: '0067400131', name: 'Siswa Inisial S-131', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa131@smkn1bandardua.sch.id', phone: '081269110131', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-132', nisn: '0067400132', name: 'Siswa Inisial S-132', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa132@smkn1bandardua.sch.id', phone: '081269110132', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-133', nisn: '0067400133', name: 'Siswa Inisial S-133', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa133@smkn1bandardua.sch.id', phone: '081269110133', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-134', nisn: '0067400134', name: 'Siswa Inisial S-134', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa134@smkn1bandardua.sch.id', phone: '081269110134', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-135', nisn: '0067400135', name: 'Siswa Inisial S-135', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa135@smkn1bandardua.sch.id', phone: '081269110135', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-136', nisn: '0067400136', name: 'Siswa Inisial S-136', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa136@smkn1bandardua.sch.id', phone: '081269110136', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-137', nisn: '0067400137', name: 'Siswa Inisial S-137', classId: 'XII TKJ 1', gradeLevel: 'XII', major: 'TKJ', email: 'siswa137@smkn1bandardua.sch.id', phone: '081269110137', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-138', nisn: '0067400138', name: 'Siswa Inisial S-138', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa138@smkn1bandardua.sch.id', phone: '081269110138', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-139', nisn: '0067400139', name: 'Siswa Inisial S-139', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa139@smkn1bandardua.sch.id', phone: '081269110139', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-140', nisn: '0067400140', name: 'Siswa Inisial S-140', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa140@smkn1bandardua.sch.id', phone: '081269110140', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-141', nisn: '0067400141', name: 'Siswa Inisial S-141', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa141@smkn1bandardua.sch.id', phone: '081269110141', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-142', nisn: '0067400142', name: 'Siswa Inisial S-142', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa142@smkn1bandardua.sch.id', phone: '081269110142', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-143', nisn: '0067400143', name: 'Siswa Inisial S-143', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa143@smkn1bandardua.sch.id', phone: '081269110143', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-144', nisn: '0067400144', name: 'Siswa Inisial S-144', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa144@smkn1bandardua.sch.id', phone: '081269110144', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-145', nisn: '0067400145', name: 'Siswa Inisial S-145', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa145@smkn1bandardua.sch.id', phone: '081269110145', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-146', nisn: '0067400146', name: 'Siswa Inisial S-146', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa146@smkn1bandardua.sch.id', phone: '081269110146', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-147', nisn: '0067400147', name: 'Siswa Inisial S-147', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa147@smkn1bandardua.sch.id', phone: '081269110147', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-148', nisn: '0067400148', name: 'Siswa Inisial S-148', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa148@smkn1bandardua.sch.id', phone: '081269110148', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-149', nisn: '0067400149', name: 'Siswa Inisial S-149', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa149@smkn1bandardua.sch.id', phone: '081269110149', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-150', nisn: '0067400150', name: 'Siswa Inisial S-150', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa150@smkn1bandardua.sch.id', phone: '081269110150', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-151', nisn: '0067400151', name: 'Siswa Inisial S-151', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa151@smkn1bandardua.sch.id', phone: '081269110151', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-152', nisn: '0067400152', name: 'Siswa Inisial S-152', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa152@smkn1bandardua.sch.id', phone: '081269110152', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-153', nisn: '0067400153', name: 'Siswa Inisial S-153', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa153@smkn1bandardua.sch.id', phone: '081269110153', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-154', nisn: '0067400154', name: 'Siswa Inisial S-154', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa154@smkn1bandardua.sch.id', phone: '081269110154', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-155', nisn: '0067400155', name: 'Siswa Inisial S-155', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa155@smkn1bandardua.sch.id', phone: '081269110155', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-156', nisn: '0067400156', name: 'Siswa Inisial S-156', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa156@smkn1bandardua.sch.id', phone: '081269110156', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-157', nisn: '0067400157', name: 'Siswa Inisial S-157', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa157@smkn1bandardua.sch.id', phone: '081269110157', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-158', nisn: '0067400158', name: 'Siswa Inisial S-158', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa158@smkn1bandardua.sch.id', phone: '081269110158', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-159', nisn: '0067400159', name: 'Siswa Inisial S-159', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa159@smkn1bandardua.sch.id', phone: '081269110159', gender: 'L', schoolName: 'SMK Negeri 1 Bandar Dua' },
  { id: 'SIS-160', nisn: '0067400160', name: 'Siswa Inisial S-160', classId: 'XII TKJ 2', gradeLevel: 'XII', major: 'TKJ', email: 'siswa160@smkn1bandardua.sch.id', phone: '081269110160', gender: 'P', schoolName: 'SMK Negeri 1 Bandar Dua' }
];

// 7 Sesi Kelas Aktif Les Malam SMKN 1 Bandar Dua (20:15 - 21:00 WIB)
export const INITIAL_ACTIVE_CLASSES: ActiveClass[] = [
  {
    id: 'act-001',
    classId: 'XII TBSM 1',
    className: 'Kelas XII TBSM 1',
    gradeLevel: 'XII',
    major: 'TBSM',
    subject: 'KEJURUAN TBSM',
    teacherName: 'Guru Inisial G-25',
    teacherAvatar: '',
    teacherEmail: 'guru025@smkn1bandardua.sch.id',
    room: 'Bengkel Otomotif TBSM (Ruang Les XII TBSM 1)',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Sistem Injeksi PGM-FI, Troubleshooting Kelistrikan Bodi & Servis Rutin Sepeda Motor',
    totalStudents: 23,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si'
  },
  {
    id: 'act-002',
    classId: 'XII TBSM 2',
    className: 'Kelas XII TBSM 2',
    gradeLevel: 'XII',
    major: 'TBSM',
    subject: 'B. INGGRIS',
    teacherName: 'Guru Inisial G-23',
    teacherAvatar: '',
    teacherEmail: 'guru023@smkn1bandardua.sch.id',
    room: 'Ruang Les XII TBSM 2',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Vocational English: Technical Manual Comprehension & Workplace Safety SOP',
    totalStudents: 23,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si'
  },
  {
    id: 'act-003',
    classId: 'XII TKR',
    className: 'Kelas XII TKR',
    gradeLevel: 'XII',
    major: 'TKRO',
    subject: 'MATEMATIKA',
    teacherName: 'Guru Inisial G-15',
    teacherAvatar: '',
    teacherEmail: 'guru015@smkn1bandardua.sch.id',
    room: 'Ruang Les XII TKR',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Numerasi Terapan: Perhitungan Rasio Transmisi Roda Gigi & Efisiensi Bahan Bakar',
    totalStudents: 23,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si'
  },
  {
    id: 'act-004',
    classId: 'XII TKJ 1',
    className: 'Kelas XII TKJ 1',
    gradeLevel: 'XII',
    major: 'TKJ',
    subject: 'B. INDONESIA',
    teacherName: 'Guru Inisial G-21',
    teacherAvatar: '',
    teacherEmail: 'guru021@smkn1bandardua.sch.id',
    room: 'Ruang Les XII TKJ 1',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Literasi Membaca SMK: Analisis Laporan Kerusakan Jaringan & Dokumen SOP K3',
    totalStudents: 23,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si'
  },
  {
    id: 'act-005',
    classId: 'XII TKJ 2',
    className: 'Kelas XII TKJ 2',
    gradeLevel: 'XII',
    major: 'TKJ',
    subject: 'B. INGGRIS',
    teacherName: 'Guru Inisial G-24',
    teacherAvatar: '',
    teacherEmail: 'guru024@smkn1bandardua.sch.id',
    room: 'Ruang Les XII TKJ 2',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Technical Troubleshooting Reading & Network Configuration Commands',
    totalStudents: 23,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si'
  },
  {
    id: 'act-006',
    classId: 'XII TP',
    className: 'Kelas XII TP',
    gradeLevel: 'XII',
    major: 'TP',
    subject: 'B. INDONESIA',
    teacherName: 'Guru Inisial G-20',
    teacherAvatar: '',
    teacherEmail: 'guru020@smkn1bandardua.sch.id',
    room: 'Ruang Les XII TP',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Analisis Diagram Prosedur Kerja Pembubutan Presisi & Kalibrasi Mesin Frais',
    totalStudents: 23,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si'
  },
  {
    id: 'act-007',
    classId: 'XII DPB',
    className: 'Kelas XII DPB',
    gradeLevel: 'XII',
    major: 'DPB',
    subject: 'MATEMATIKA',
    teacherName: 'Guru Inisial G-13',
    teacherAvatar: '',
    teacherEmail: 'guru013@smkn1bandardua.sch.id',
    room: 'Ruang Les XII DPB',
    startTime: '20:15 WIB',
    endTime: '21:00 WIB',
    status: 'ongoing',
    topic: 'Trigonometri & Kalkulasi Volume Struktur Bangunan dalam Estimasi RAB',
    totalStudents: 22,
    classroomLink: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si'
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
        questionText: 'Dalam gambar bestek bangunan gedung oleh siswa DPB, denah ruang praktik berukuran 12 meter × 8 meter digambar dengan skala 1 : 100. Berapakah luas gambar denah tersebut pada lembar kerja kertas?',
        options: [
          { key: 'A', text: '48 cm²' },
          { key: 'B', text: '96 cm²' },
          { key: 'C', text: '120 cm²' },
          { key: 'D', text: '192 cm²' },
          { key: 'E', text: '960 cm²' }
        ],
        correctKey: 'B',
        explanation: 'Panjang pada gambar = 12 m / 100 = 1.200 cm / 100 = 12 cm. Lebar pada gambar = 8 m / 100 = 800 cm / 100 = 8 cm. Maka Luas pada gambar = 12 cm × 8 cm = 96 cm².',
        topic: 'Skala Gambar Teknik & Kalkulasi Luas Bangunan (DPB)',
        points: 20
      },
      {
        id: 'num-smk-5',
        questionNumber: 5,
        questionText: 'Berdasarkan tabel resistansi kawat tembaga penghantar otomotif, panjang kawat 50 meter memiliki tahanan sebesar 2,5 Ohm. Jika teknisi menggunakan kawat dengan jenis dan luas penampang yang sama sepanjang 120 meter, berapakah besar tahanan totalnya?',
        options: [
          { key: 'A', text: '4,5 Ohm' },
          { key: 'B', text: '5,0 Ohm' },
          { key: 'C', text: '6,0 Ohm' },
          { key: 'D', text: '7,5 Ohm' },
          { key: 'E', text: '12,0 Ohm' }
        ],
        correctKey: 'C',
        explanation: 'Tahanan kawat berbanding lurus dengan panjang kawat (R = ρ × L / A). Maka R2 = (L2 / L1) × R1 = (120 / 50) × 2,5 = 2,4 × 2,5 = 6,0 Ohm.',
        topic: 'Hukum Kelistrikan Dasar & Karakteristik Konduktor (TKRO/TBSM)',
        points: 20
      }
    ]
  },
  {
    id: 'exam-pusmendik-02',
    title: 'Simulasi Pusmendik TKA SMK 2026 - Literasi Kejuruan & Troubleshooting Industri',
    category: 'Literasi Kejuruan SMK',
    gradeLevel: 'XII',
    durationMinutes: 40,
    totalQuestions: 4,
    passingGrade: 75,
    description: 'Ujian simulasi Literasi Kejuruan: Analisis instruksi manual SOP industri, diagram alir kerusakan (troubleshooting flow), dan keselamatan kerja K3.',
    createdAt: '2026-09-01',
    questions: [
      {
        id: 'lit-smk-1',
        questionNumber: 1,
        questionText: 'Dalam prosedur penanganan engine overheat pada kendaraan roda 4, teknisi menemukan bahwa cairan pendingin radiator mendidih dan kipas radiator (cooling fan) tidak berputar saat temperatur kerja mesin telah tercapai. Langkah pemeriksaan pertama yang paling tepat dan aman sesuai SOP K3 adalah:',
        options: [
          { key: 'A', text: 'Langsung membuka tutup radiator saat kondisi mesin masih panas menyala' },
          { key: 'B', text: 'Menunggu mesin dingin, lalu memeriksa sekring (fuse) kipas dan relay cooling fan' },
          { key: 'C', text: 'Menguras seluruh oli mesin sebelum memeriksa radiator' },
          { key: 'D', text: 'Mengganti langsung motor cooling fan tanpa memeriksa arus listrik' },
          { key: 'E', text: 'Menyiram blok mesin dengan air dingin bertekanan tinggi' }
        ],
        correctKey: 'B',
        explanation: 'SOP K3 menyatakan dilarang membuka tutup radiator saat panas karena uap bertekanan tinggi dapat mencederai. Troubleshooting kelistrikan kipas dimulai dari pengecekan fuse dan relay.',
        topic: 'SOP K3 & Sistem Pendingin Kendaraan (TKRO/TBSM)',
        points: 25
      },
      {
        id: 'lit-smk-2',
        questionNumber: 2,
        questionText: 'Perhatikan pesan log sistem jaringan berikut: [ALERT] Router-Core: High CPU utilization (98%), Packet Drop Rate 45%, Interface Gig0/1 flooded with ICMP echo requests from unknown external subnet. Berdasarkan log tersebut, jenis gangguan yang sedang terjadi pada infrastruktur jaringan adalah:',
        options: [
          { key: 'A', text: 'Kerusakan fisik kabel UTP Cat6' },
          { key: 'B', text: 'Serangan Distributed Denial of Service (DDoS/ICMP Flood)' },
          { key: 'C', text: 'Kesalahan alokasi IP DHCP pool' },
          { key: 'D', text: 'Konektor RJ-45 kendor pada switch distribusi' },
          { key: 'E', text: 'Kapasitas RAM router mengalami fragmentasi' }
        ],
        correctKey: 'B',
        explanation: 'Kombinasi CPU 98%, packet drop, dan lonjakan masif ICMP echo request dari subnet luar merupakan indikasi khas serangan ICMP Flood / DDoS pada perangkat router.',
        topic: 'Keamanan Jaringan Komputer & Analisis Log Router (TKJ)',
        points: 25
      },
      {
        id: 'lit-smk-3',
        questionNumber: 3,
        questionText: 'Dalam proses pembubutan poros bertingkat berbahan baja ST-37, hasil permukaan benda kerja kasar dan muncul getaran (chatter) berlebih pada pahat bubut. Analisis penyebab teknis yang paling relevan adalah:',
        options: [
          { key: 'A', text: 'Kecepatan putaran spindel terlalu rendah dan ujung pahat dipasang di atas sumbu senter' },
          { key: 'B', text: 'Overhang (penjuluran) pahat terlalu panjang dari toolpost dan sudut potong tumpul' },
          { key: 'C', text: 'Penggunaan cairan pendingin (coolant) yang terlalu melimpah' },
          { key: 'D', text: 'Pencekaman benda kerja pada chuck 3 rahang terlalu kencang' },
          { key: 'E', text: 'Diameter benda kerja terlalu besar untuk kapasitas mesin' }
        ],
        correctKey: 'B',
        explanation: 'Overhang pahat yang terlalu panjang mengurangi rigiditas pemotongan sehingga menimbulkan getaran (chatter) dan permukaan kasar.',
        topic: 'Parameter Pemotongan & Pengikatan Pahat Bubut (Teknik Pemesinan)',
        points: 25
      },
      {
        id: 'lit-smk-4',
        questionNumber: 4,
        questionText: 'Dalam dokumen Rencana Kerja dan Syarat-syarat (RKS) konstruksi bangunan, mutu beton yang dipersyaratkan untuk balok dan kolom lantai 2 adalah fc 25 MPa (K-300). Berdasarkan standar pengujian PBI/SNI, uji slump beton di lapangan bertujuan untuk mengukur:',
        options: [
          { key: 'A', text: 'Kadar keasaman (pH) air pencampur beton' },
          { key: 'B', text: 'Konsistensi kelecakan dan kemudahan pengerjaan (workability) adukan beton segar' },
          { key: 'C', text: 'Kekuatan tarik lentur baja tulangan beton' },
          { key: 'D', text: 'Waktu ikat akhir semen pada kondisi suhu ruang' },
          { key: 'E', text: 'Kadar lumpur pada pasir agregat halus' }
        ],
        correctKey: 'B',
        explanation: 'Uji slump dilakukan pada beton segar di lokasi pengecoran untuk memastikan kelecakan/workability sesuai spesifikasi.',
        topic: 'Spesifikasi Material & Pengujian Mutu Beton Bangunan (DPB)',
        points: 25
      }
    ]
  }
];

export const INITIAL_EXAM_RESULTS: ExamResult[] = [
  {
    id: 'res-01',
    examId: 'exam-pusmendik-01',
    examTitle: 'Simulasi Pusmendik TKA SMK 2026 - Numerasi & Penalaran Kuantitatif Terapan',
    subject: 'Numerasi Terapan SMK',
    studentId: 'SIS-001',
    studentName: 'Siswa Inisial S-001',
    studentNisn: '0067400001',
    studentEmail: 'siswa001@smkn1bandardua.sch.id',
    classId: 'XII TBSM 1',
    major: 'TBSM',
    score: 100,
    totalCorrect: 5,
    totalWrong: 0,
    totalSkipped: 0,
    totalQuestions: 5,
    timeSpentSeconds: 1420,
    submittedAt: '2026-09-02 20:45 WIB',
    answers: { 'num-smk-1': 'B', 'num-smk-2': 'B', 'num-smk-3': 'B', 'num-smk-4': 'B', 'num-smk-5': 'C' }
  },
  {
    id: 'res-02',
    examId: 'exam-pusmendik-01',
    examTitle: 'Simulasi Pusmendik TKA SMK 2026 - Numerasi & Penalaran Kuantitatif Terapan',
    subject: 'Numerasi Terapan SMK',
    studentId: 'SIS-002',
    studentName: 'Siswa Inisial S-002',
    studentNisn: '0067400002',
    studentEmail: 'siswa002@smkn1bandardua.sch.id',
    classId: 'XII TBSM 1',
    major: 'TBSM',
    score: 80,
    totalCorrect: 4,
    totalWrong: 1,
    totalSkipped: 0,
    totalQuestions: 5,
    timeSpentSeconds: 1650,
    submittedAt: '2026-09-02 20:50 WIB',
    answers: { 'num-smk-1': 'B', 'num-smk-2': 'B', 'num-smk-3': 'B', 'num-smk-4': 'A', 'num-smk-5': 'C' }
  }
];

export const INITIAL_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-smk-01',
    title: 'Google Classroom Terpadu Les Malam TKA 2026',
    category: 'Google Classroom',
    gradeLevel: 'XII',
    type: 'classroom',
    description: 'Media pembelajaran interaktif resmi Google Classroom untuk 7 kelas XII SMKN 1 Bandar Dua. Dilengkapi modul per kejuruan (TBSM, TKRO, TP, DPB, TKJ), penugasan kuis mandiri, dan materi bimbingan malam hari.',
    url: 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si',
    author: 'Tim Kurikulum SMKN 1 Bandar Dua',
    durationOrPages: 'Akses Langsung Classroom',
    tags: ['Google Classroom', 'SMKN 1 Bandar Dua', 'Modul Utama']
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
    author: 'Guru Pengampu Matematika & Kejuruan',
    durationOrPages: '40 Menit Video HD',
    tags: ['Video', 'Matematika Terapan', 'Rumus Cepat']
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-01', date: '2026-09-02', time: '20:15', studentId: 'SIS-001', studentName: 'Siswa Inisial S-001', nisn: '0067400001', classId: 'XII TBSM 1', major: 'TBSM', session: 'Sesi Malam (20:15 - 21:00 WIB)', status: 'hadir', notes: 'Hadir tepat waktu di bengkel', recordedBy: 'Guru Inisial G-25', timestamp: Date.now() - 3600000 },
  { id: 'att-02', date: '2026-09-02', time: '20:16', studentId: 'SIS-002', studentName: 'Siswa Inisial S-002', nisn: '0067400002', classId: 'XII TBSM 1', major: 'TBSM', session: 'Sesi Malam (20:15 - 21:00 WIB)', status: 'hadir', notes: 'Hadir aktif', recordedBy: 'Guru Inisial G-25', timestamp: Date.now() - 3500000 }
];

export const INITIAL_TEACHER_ATTENDANCE: TeacherAttendanceRecord[] = [
  {
    id: 'tatt-01',
    date: '2026-09-02',
    checkInTime: '20:10 WIB',
    teacherId: 'GRU-025',
    teacherName: 'Guru Inisial G-25',
    subject: 'KEJURUAN TBSM',
    classId: 'XII TBSM 1',
    room: 'Ruang Les XII TBSM 1',
    topic: 'Sistem Injeksi PGM-FI dan Troubleshooting Kelistrikan Sepeda Motor',
    status: 'hadir',
    notes: 'Seluruh siswa kelas XII TBSM 1 hadir dan aktif praktik pemecahan masalah',
    timestamp: Date.now() - 4000000
  }
];

// Helper functions for LocalStorage persistence
const isClient = typeof window !== 'undefined';

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem('tka_smkn1_' + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading ' + key + ' from localStorage', e);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem('tka_smkn1_' + key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving ' + key + ' to localStorage', e);
  }
}
