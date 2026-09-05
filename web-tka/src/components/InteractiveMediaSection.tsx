'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink, 
  Search, 
  Plus, 
  Play, 
  Download, 
  Sparkles, 
  GraduationCap, 
  Layers,
  X,
  Share2,
  Tv,
  Link as LinkIcon
} from 'lucide-react';
import { LearningMaterial, User } from '../types';

interface InteractiveMediaSectionProps {
  materials: LearningMaterial[];
  currentUser: User;
  onAddMaterial?: (material: LearningMaterial) => void;
}

// Helper to extract YouTube embed URL from various YouTube formats
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
}

export const InteractiveMediaSection: React.FC<InteractiveMediaSectionProps> = ({
  materials,
  currentUser,
  onAddMaterial
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState<LearningMaterial | null>(null);
  const [activePdfModal, setActivePdfModal] = useState<LearningMaterial | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for adding material
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<string>('Penalaran Matematika');
  const [newType, setNewType] = useState<'video' | 'pdf' | 'interactive' | 'classroom'>('video');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDuration, setNewDuration] = useState('20 Menit Video HD');

  const CLASSROOM_URL = 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=pdn6y7si';

  const filteredMaterials = materials.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();

    let finalUrl = newUrl.trim();
    if (!finalUrl) {
      if (newType === 'video') {
        finalUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // default sample video if empty
      } else {
        finalUrl = CLASSROOM_URL;
      }
    }

    const item: LearningMaterial = {
      id: `mat-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      gradeLevel: 'XII',
      type: newType,
      description: newDesc.trim() || 'Materi pembelajaran dan modul bimbingan TKA SMK.',
      url: finalUrl,
      author: currentUser.name || 'Guru Pengampu TKA',
      durationOrPages: newDuration.trim() || (newType === 'video' ? 'Video Pembahasan' : 'Dokumen PDF'),
      tags: [newCategory, newType.toUpperCase(), 'SMKN 1 Bandar Dua']
    };

    if (onAddMaterial) {
      onAddMaterial(item);
    }
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewUrl('');
  };

  const categories = [
    { id: 'all', label: 'Semua Mata Pelajaran' },
    { id: 'Penalaran Matematika', label: 'Numerasi & Penalaran Matematika' },
    { id: 'Literasi Kejuruan', label: 'Literasi Kejuruan SMK' },
    { id: 'Vocational English', label: 'Vocational English' },
    { id: 'TPS', label: 'TPS Skolastik' },
    { id: 'Kejuruan Otomotif', label: 'Kejuruan Otomotif (TBSM/TKR)' },
    { id: 'Kejuruan TKJ', label: 'Kejuruan TKJ' },
    { id: 'Kejuruan TP & DPB', label: 'Kejuruan TP & DPB' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Google Classroom Highlight (Tanpa Kode Kelas) */}
      <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/60 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-yellow-400/20 text-yellow-300 border border-yellow-300/30 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pusat Pembelajaran Interaktif Google Classroom</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Media Pembelajaran Interaktif TKA 2026
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              Seluruh siswa peserta les bimbingan malam dapat langsung bergabung dan mengakses kelas interaktif yang telah dipersiapkan oleh 31 guru pengampu di Google Classroom resmi SMK Negeri 1 Bandar Dua.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <a
              href={CLASSROOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-7 py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-green-950 font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 text-sm cursor-pointer whitespace-nowrap"
            >
              <span>Buka Google Classroom</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi, judul video, modul rumus..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Modul / Video</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((mat) => {
          const isVideo = mat.type === 'video';
          const isPdf = mat.type === 'pdf';
          const isClassroom = mat.type === 'classroom';

          return (
            <div
              key={mat.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between card-hover-effect relative group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {mat.category}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    {isVideo && <Video className="w-3.5 h-3.5 text-rose-500" />}
                    {isPdf && <FileText className="w-3.5 h-3.5 text-amber-500" />}
                    {isClassroom && <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{mat.durationOrPages}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                  {mat.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {mat.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mat.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-medium">
                  Pengajar: <span className="font-bold text-slate-700">{mat.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isClassroom ? (
                    <a
                      href={CLASSROOM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Masuk Kelas</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : isVideo ? (
                    <button
                      onClick={() => setActiveVideoModal(mat)}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Putar Video</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActivePdfModal(mat)}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Buka Modul</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal Player (Embed Langsung / Buka ke Sumbernya) */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-950 text-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-800">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg">
                  <Tv className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white truncate max-w-md sm:max-w-xl">
                    {activeVideoModal.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Oleh: {activeVideoModal.author} • {activeVideoModal.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="p-5 space-y-4">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 relative flex items-center justify-center">
                {getYouTubeEmbedUrl(activeVideoModal.url) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(activeVideoModal.url) || ''}
                    title={activeVideoModal.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : activeVideoModal.url.endsWith('.mp4') ? (
                  <video
                    src={activeVideoModal.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-rose-600/30 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">
                        Pemutar Video Eksternal
                      </h5>
                      <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                        Video ini tersedia di tautan sumber resmi. Klik tombol di bawah untuk memutar dan membuka video langsung ke sumbernya.
                      </p>
                    </div>
                    <a
                      href={activeVideoModal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Buka & Tonton Video di Sumber Asli</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Description & Action Bar */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-yellow-400 uppercase tracking-wider text-[11px]">
                    Ringkasan Materi & Video:
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Durasi: {activeVideoModal.durationOrPages}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeVideoModal.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate max-w-[260px] font-mono text-[11px] text-slate-400">
                    {activeVideoModal.url}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeVideoModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka ke Sumber Video</span>
                  </a>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF / Document Modal Viewer */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {activePdfModal.title}
                </h4>
              </div>
              <button
                onClick={() => setActivePdfModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {activePdfModal.category}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {activePdfModal.durationOrPages}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activePdfModal.description}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div>📌 <strong>Penyusun:</strong> {activePdfModal.author}</div>
                <div>📌 <strong>Tingkat:</strong> Kelas {activePdfModal.gradeLevel} SMKN 1 Bandar Dua</div>
                <div>📌 <strong>Standar:</strong> Asesmen TKA Pusmendik SMK 2026</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActivePdfModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Tutup
              </button>
              <a
                href={CLASSROOM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <span>Buka di Google Classroom</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Learning Material (Khusus Video: Minta Link Sumber) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Tambah Modul / Video Pembelajaran
                  </h3>
                  <p className="text-xs text-slate-500">
                    Publikasikan media pembelajaran interaktif untuk siswa
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMaterial} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul Materi / Video <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Video Pembahasan Trik Cepat Soal Numerasi Kejuruan"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Mapel</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  >
                    <option value="Penalaran Matematika">Numerasi & Matematika</option>
                    <option value="Literasi Kejuruan">Literasi Kejuruan</option>
                    <option value="Vocational English">Vocational English</option>
                    <option value="TPS">TPS Skolastik</option>
                    <option value="Kejuruan Otomotif">Kejuruan Otomotif</option>
                    <option value="Kejuruan TKJ">Kejuruan TKJ</option>
                    <option value="Kejuruan TP & DPB">Kejuruan TP & DPB</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Media</label>
                  <select
                    value={newType}
                    onChange={(e: any) => {
                      setNewType(e.target.value);
                      if (e.target.value === 'video') setNewDuration('25 Menit Video HD');
                      else if (e.target.value === 'pdf') setNewDuration('35 Halaman Dokumen PDF');
                      else setNewDuration('Modul Interaktif');
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  >
                    <option value="video">🎥 Video Pembahasan (Link YouTube/Drive)</option>
                    <option value="pdf">📄 Dokumen / PDF Modul</option>
                    <option value="interactive">💡 Modul Interaktif</option>
                    <option value="classroom">🏫 Google Classroom Link</option>
                  </select>
                </div>
              </div>

              {/* Khusus Bagian Video: Minta Link Sumber Video */}
              {newType === 'video' ? (
                <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
                  <label className="block font-bold text-rose-950 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-rose-600" />
                    <span>Link / URL Sumber Video <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... atau link video Google Drive/MP4"
                    className="w-full p-2.5 bg-white border border-rose-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-rose-500"
                    required
                  />
                  <p className="text-[10px] text-rose-700">
                    💡 Masukkan URL YouTube, Google Drive, atau link video web. Sistem akan langsung memutar video atau menyediakan tombol pengalihan ke sumber aslinya.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tautan / URL Dokumen / Sumber Modul
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://docs.google.com/... atau link modul"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Durasi / Jumlah Halaman</label>
                <input
                  type="text"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="Contoh: 30 Menit Video / 40 Halaman PDF"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Ringkas Materi</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  placeholder="Jelaskan ringkasan materi atau tujuan pembelajaran..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md"
                >
                  Simpan & Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
