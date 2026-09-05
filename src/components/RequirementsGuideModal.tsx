'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  X, 
  Copy, 
  Check, 
  Terminal, 
  Globe, 
  Sparkles, 
  FileSpreadsheet, 
  Key, 
  UploadCloud,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface RequirementsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequirementsGuideModal: React.FC<RequirementsGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const vercelSteps = `# Langkah 1: Hubungkan project ke Git Repository (GitHub)
git init
git add .
git commit -m "Deploy portal TKA SMKN 1 Bandar Dua"
git branch -M main
git remote add origin https://github.com/USERNAME/web-tka-smkn1bandardua.git
git push -u origin main

# Langkah 2: Deploy di Vercel (Gratis & 1 Menit Selesai)
1. Buka https://vercel.com/new
2. Import repository GitHub Anda 'web-tka-smkn1bandardua'
3. Framework Preset: Next.js (Terdeteksi otomatis)
4. Masukkan Environment Variables (dari Supabase):
   - NEXT_PUBLIC_SUPABASE_URL = https://xyzcompany.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOi...
5. Klik 'Deploy' -> Website langsung online dan tersinkronisasi database!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-900 p-6 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-yellow-400 text-slate-950 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Panduan Deploy Vercel & Penyesuaian Data SMKN 1 Bandar Dua
                </h3>
                <p className="text-xs text-emerald-200">
                  Semua data 31 guru, 7 kelas XII, jadwal malam 20:15 WIB & soal Pusmendik SMK 2026 telah terpasang
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-emerald-200 hover:text-white rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          {/* Section 1: Data Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                1
              </span>
              <h4>Data Real yang Sudah Berhasil Dimuat & Diterapkan ke Sistem:</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <Key className="w-4 h-4 text-emerald-700" />
                  <span>✓ 31 Guru Pengajar & Akun @belajar.id</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Semua 31 guru dari Google Spreadsheet jadwal les Anda (WAN ABDUL MANAN, FAISAL, SYAUQI RIDHA, MARHAMAH, AGUSSAMI, dll.) telah tersimpan lengkap dengan akun <code>@guru.smk.belajar.id</code> masing-masing.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <FileSpreadsheet className="w-4 h-4 text-blue-700" />
                  <span>✓ 7 Rombel Kelas XII & 5 Kejuruan</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Kelas XII TBSM 1, XII TBSM 2, XII TKR, XII TP, XII DPB, XII TKJ 1, dan XII TKJ 2 serta roster malam (20:15 - 21:00 WIB, 07-28 Sept 2026) telah aktif.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <Globe className="w-4 h-4 text-purple-700" />
                  <span>✓ Soal Pusmendik SMK 2026</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Bank soal dan simulasi CBT mengacu ke domain Numerasi Terapan SMK, Literasi Kejuruan & SOP K3, Vocational English, dan Troubleshooting Mesin/Jaringan lengkap dengan kunci & pembahasan detail.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <UploadCloud className="w-4 h-4 text-amber-700" />
                  <span>✓ Import Siswa Excel (4 Kolom Saja)</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Fitur upload Excel siswa disederhanakan sesuai permintaan Anda: <strong>NISN, Nama Lengkap, Kelas, Jurusan</strong>. Email siswa otomatis dibuatkan dan password seragam default adalah <code>belajar123</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Panduan Deploy ke Vercel */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                  2
                </span>
                <h4>Panduan 3 Menit Deploy ke Vercel (vercel.com):</h4>
              </div>

              <button
                onClick={() => copyText(vercelSteps, 'vercel')}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSection === 'vercel' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin Perintah Deploy</span>
              </button>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <div className="text-emerald-400 font-bold mb-2"># Langkah Praktis Deploy Tanpa Perlu Beli Domain Sendiri:</div>
              <p className="text-slate-300 mb-2">
                1. Buat repository baru di GitHub akun Anda (contoh: <code>web-tka-smkn1bandardua</code>).<br/>
                2. Upload / push source code ini ke repository tersebut.<br/>
                3. Buka <strong>vercel.com</strong> &rarr; Login &rarr; Klik <strong>Add New... Project</strong>.<br/>
                4. Pilih repo Anda &rarr; Klik <strong>Deploy</strong>.<br/>
                5. Vercel otomatis memberikan URL gratis aktif seperti <strong>https://tka-smkn1bandardua.vercel.app</strong> dengan sertifikat SSL/HTTPS aktif permanen.
              </p>
            </div>
          </div>

          {/* Section 3: Database Cloud Storage - Upstash for Redis on Vercel */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs">
                  3
                </span>
                <h4>Integrasi 1-Klik: Upstash for Redis di Vercel.com (Data Permanen):</h4>
              </div>
            </div>

            <div className="p-4 bg-red-50/70 border border-red-200 rounded-2xl space-y-3">
              <p className="text-xs text-red-950 leading-relaxed font-medium">
                Vercel menyediakan <strong>Upstash for Redis (Vercel KV)</strong> bawaan yang dapat diaktifkan dalam <strong>1 klik tanpa perlu setup tabel SQL manual</strong>. Seluruh data Excel siswa, presensi malam, dan nilai CBT otomatis tersimpan permanen di cloud Redis:
              </p>

              <ol className="list-decimal list-inside space-y-2 text-xs text-red-900 leading-relaxed pl-1 font-normal">
                <li>Buka Dashboard Project Anda di <strong>vercel.com</strong> &rarr; Klik tab <strong>Storage</strong> di menu atas.</li>
                <li>Klik tombol <strong>Create Database</strong> &rarr; Pilih <strong>KV (Serverless Redis powered by Upstash)</strong> atau <strong>Upstash Redis</strong> di Marketplace.</li>
                <li>Pilih nama database (contoh: <code>tka-redis-db</code>) &rarr; Pilih region <strong>Singapore (sin1)</strong> &rarr; Klik <strong>Create</strong>.</li>
                <li>Pilih opsi <strong>Connect to Project</strong> &rarr; Hubungkan database tersebut ke project <code>web-tka-smkn1bandardua</code> Anda.</li>
                <li>Vercel akan <strong>otomatis menambahkan Environment Variables</strong> (<code>KV_REST_API_URL</code> & <code>KV_REST_API_TOKEN</code> / <code>UPSTASH_REDIS_REST_URL</code> & <code>UPSTASH_REDIS_REST_TOKEN</code>) tanpa perlu Anda copy-paste manual!</li>
                <li>Lakukan <strong>Redeploy</strong> di Vercel &rarr; Data otomatis tersinkronisasi dan tersimpan permanen di Upstash Redis!</li>
              </ol>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Tutup Panduan & Mulai Gunakan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
