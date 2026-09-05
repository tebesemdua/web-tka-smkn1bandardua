import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PERSIAPAN MENUJU TKA 2026 — SMK NEGERI 1 BANDAR DUA | Portal Bimbingan Belajar & CBT',
  description: 'Portal resmi persiapan Tes Kemampuan Akademik (TKA) SMK Negeri 1 Bandar Dua. Terintegrasi Google Classroom, 31 Guru Pengajar, Absensi Siswa berbasis Excel, Simulasi CBT Pusmendik, dan Rekapan Nilai.',
  icons: {
    icon: '/logo_smk.png',
    apple: '/logo_smk.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <head>
        <link rel="icon" href="/logo_smk.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
