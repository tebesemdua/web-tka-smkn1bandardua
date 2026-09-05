# 🏫 Portal Web Les TKA 2026 — SMK Negeri 1 Bandar Dua

Sistem Informasi & Pembelajaran Bimbingan Belajar Tes Kemampuan Akademik (TKA) Jenjang SMK berbasis Pusmendik Kemendikbudristek untuk **SMK Negeri 1 Bandar Dua (Pidie Jaya, Aceh)**. 

Terintegrasi dengan **31 Guru Pengajar (@guru.smk.belajar.id)**, **7 Rombel Kelas XII (5 Jurusan: TBSM, TKRO, TP, DPB, TKJ)**, jadwal les malam hari (**20:15 - 21:00 WIB**), media interaktif Google Classroom (`embrt4ws`), absensi siswa 4-kolom berbasis Excel, simulasi CBT Pusmendik SMK 2026, rekapan nilai, grafik analitik pengunjung, pusat unduh admin, serta **Database Cloud Upstash for Redis di Vercel**.

---

## 🌟 Fitur Utama Sistem

1. **Tampilan Beranda Interaktif & Pilihan Login Sesuai Identitas:**
   - **Tamu (Belum Login):** Pengunjung dapat melihat informasi sekolah, jadwal les malam, monitor kelas aktif, dan materi tanpa pop-up yang mengganggu.
   - **🎓 Siswa Peserta:** Akun `@siswa.smk.belajar.id` dengan password seragam `belajar123`.
   - **👨‍🏫 Guru Pengajar:** Akun `@guru.smk.belajar.id` (31 guru terdaftar) dengan password pribadi.
   - **🛡️ Administrator:** Keamanan login menggunakan **PIN Rahasia Khusus** (`10111806`) tanpa memerlukan email/password.

2. **31 Personil Guru Pengajar & Jadwal Les Malam (20:15 - 21:00 WIB):**
   - Roster mengajar 31 guru untuk 7 rombel kelas XII selama periode intensif TKA.

3. **Import Siswa Excel Simpel (4 Kolom):**
   - Kolom: `NISN`, `Nama Lengkap`, `Kelas`, `Jurusan`.
   - Sistem otomatis membuat email `@siswa.smk.belajar.id` dan password `belajar123`.

4. **Simulasi CBT Berstandar Pusmendik SMK 2026:**
   - Numerasi Terapan SMK, Literasi Kejuruan & SOP K3, Vocational English, dan Troubleshooting Mesin/Jaringan lengkap dengan timer, lembar ujian, kunci, dan pembahasan detail (*HOTS solution*).

5. **Penyimpanan Cloud Permanen (Upstash for Redis di Vercel):**
   - Terintegrasi dengan endpoint `/api/sync` dan `@upstash/redis` sehingga setiap unggahan Excel siswa, presensi, dan nilai CBT tersimpan secara terpusat di server cloud.

---

## 🚀 Panduan Deploy ke GitHub & Vercel (100% Gratis)

### Langkah 1: Ekstrak File ZIP
Ekstrak file `web-tka-smkn1bandardua.zip` ke folder di komputer Anda.

### Langkah 2: Upload / Push ke Repository GitHub
Buka terminal / command prompt di dalam folder hasil ekstrak, lalu jalankan:
```bash
git init
git add .
git commit -m "Initial release Portal TKA SMKN 1 Bandar Dua"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/web-tka-smkn1bandardua.git
git push -u origin main
```
*(Ganti `USERNAME-ANDA` dengan nama akun GitHub Anda)*

### Langkah 3: Deploy di Vercel.com
1. Buka **[vercel.com](https://vercel.com)** dan login dengan akun GitHub Anda.
2. Klik tombol **Add New...** &rarr; pilih **Project**.
3. Pilih repository `web-tka-smkn1bandardua` yang baru saja Anda push.
4. Klik **Deploy** (Vercel otomatis mendeteksi Framework Next.js).
5. Tunggu sekitar 1 menit hingga proses build selesai.

### Langkah 4: Aktifkan Database Upstash for Redis (Vercel Storage)
Agar data upload Excel dan presensi tersimpan permanen di cloud:
1. Di Dashboard Project Vercel Anda, buka tab **Storage** (menu atas).
2. Klik tombol **Create Database** atau **Connect Store**.
3. Pilih **KV** *(Serverless Redis powered by Upstash)* atau cari **Upstash for Redis**.
4. Beri nama database (contoh: `tka-redis-db`) dan pilih region **Singapore (sin1)** &rarr; klik **Create**.
5. Hubungkan (*Connect*) ke project `web-tka-smkn1bandardua` Anda (centang Production, Preview, Development).
6. Masuk ke tab **Deployments** di Vercel &rarr; klik tombol titik tiga `...` di deployment terbaru &rarr; pilih **Redeploy**.

Selesai! Website Anda langsung online dan aktif dengan database cloud berkecepatan tinggi.

---

## 📁 Struktur Direktori Proyek

```text
├── database/
│   └── schema.sql              # Skema SQL PostgreSQL (opsional untuk Supabase)
├── public/
│   ├── logo_smk.png            # Logo resmi SMKN 1 Bandar Dua (Transparan)
│   ├── logo_prov.png           # Logo Pemerintah Provinsi Aceh
│   └── images/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── sync/
│   │   │       └── route.ts    # Serverless API Upstash Redis Sync
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx            # Halaman Utama (Beranda & Role Switcher)
│   ├── components/
│   │   ├── ActiveClassesMonitor.tsx
│   │   ├── AdminDownloadHub.tsx
│   │   ├── AttendanceGuruSection.tsx
│   │   ├── AttendanceSiswaSection.tsx
│   │   ├── AuthModal.tsx
│   │   ├── ExamSimulationSection.tsx
│   │   ├── GradeRecapSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── InteractiveMediaSection.tsx
│   │   ├── IntroModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── RequirementsGuideModal.tsx
│   │   └── VisitorAnalyticsChart.tsx
│   ├── lib/
│   │   ├── redis.ts            # Konfigurasi Upstash Redis Serverless
│   │   ├── storage.ts          # Default Mock Data & Storage Helpers
│   │   ├── supabaseClient.ts   # Helper Supabase Cloud (Opsional)
│   │   └── upstashClient.ts    # Frontend Sync Client ke Redis
│   └── types/
│       └── index.ts            # TypeScript Data Definitions
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## 🔑 Kredensial Hak Akses

- **🛡️ Admin:** Klik login Admin &rarr; Masukkan **PIN Rahasia** (`10111806`).
- **👨‍🏫 Guru:** Email `@guru.smk.belajar.id` (31 guru terdaftar) &rarr; Password pribadi guru.
- **🎓 Siswa:** Email `@siswa.smk.belajar.id` &rarr; Password default: `belajar123`.

---
© 2026 SMK Negeri 1 Bandar Dua — Dinas Pendidikan Provinsi Aceh
