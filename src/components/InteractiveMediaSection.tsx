'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Plus, 
  Play, 
  Download, 
  Sparkles, 
  GraduationCap, 
  Layers,
  X,
  Share2
} from 'lucide-react';
import { LearningMaterial, User } from '../types';

interface InteractiveMediaSectionProps {
  materials: LearningMaterial[];
  currentUser: User;
  onAddMaterial?: (material: LearningMaterial) => void;
}

export const InteractiveMediaSection: React.FC<InteractiveMediaSectionProps> = ({
  materials,
  currentUser,
  onAddMaterial
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedClassCode, setCopiedClassCode] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<LearningMaterial | null>(null);
  const [activePdfModal, setActivePdfModal] = useState<LearningMaterial | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for adding material
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'TPS' | 'Literasi Bahasa' | 'Penalaran Matematika' | 'Saintek' | 'Soshum'>('Penalaran Matematika');
  const [newType, setNewType] = useState<'video' | 'pdf' | 'interactive' | 'classroom'>('interactive');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDuration, setNewDuration] = useState('20 Menit Interaktif');

  const CLASSROOM_CODE = 'embrt4ws';
  const CLASSROOM_URL = 'https://classroom.google.com/c/ODY5MzMxNTM0ODI0?cjc=embrt4ws';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CLASSROOM_CODE);
    setCopiedClassCode(true);
    setTimeout(() => setCopiedClassCode(false), 2000);
  };

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
    const item: LearningMaterial = {
      id: `mat-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      gradeLevel: 'XII',
      type: newType,
      description: newDesc,
      url: newUrl || CLASSROOM_URL,
      author: currentUser.name,
      durationOrPages: newDuration,
      tags: [newCategory, newType.toUpperCase(), 'Disdik Aceh']
    };

    if (onAddMaterial) {
      onAddMaterial(item);
    }
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const categories = [
    { id: 'all', label: 'Semua Mata Pelajaran' },
    { id: 'Penalaran Matematika', label: 'Penalaran Matematika' },
    { id: 'TPS', label: 'TPS Skolastik' },
    { id: 'Literasi Bahasa', label: 'Literasi Bahasa Indo & Inggris' },
    { id: 'Saintek', label: 'Saintek (IPA)' },
    { id: 'Soshum', label: 'Soshum (IPS)' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Google Classroom Highlight */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-700/60 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/20 text-yellow-300 border border-yellow-300/30 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pusat Pembelajaran Interaktif Google Classroom</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Media Pembelajaran Interaktif TKA 2026
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              Seluruh siswa dapat mengakses kelas interaktif yang telah dipersiapkan guru-guru pendamping 
              di Google Classroom dengan kode gabung kelas <strong className="text-yellow-300 underline font-mono">embrt4ws</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center justify-between gap-4 w-full sm:w-auto">
              <div>
                <span className="text-[10px] text-emerald-200 uppercase font-bold block">Kode Kelas</span>
                <span className="text-lg font-black font-mono text-yellow-300 tracking-wider">embrt4ws</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors cursor-pointer"
                title="Salin Kode"
              >
                {copiedClassCode ? <Check className="w-4 h-4 text-yellow-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a
              href={CLASSROOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-green-950 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
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
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Masuk Kelas</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : isVideo ? (
                    <button
                      onClick={() => setActiveVideoModal(mat)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Tonton Video</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActivePdfModal(mat)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
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

      {/* Video Modal Preview */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-4 bg-slate-800/90 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-400" />
                <h4 className="text-sm font-bold text-white truncate max-w-md">
                  {activeVideoModal.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-center space-y-4">
              <div className="aspect-video bg-black rounded-2xl flex flex-col items-center justify-center p-6 border border-slate-800 relative group">
                <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <p className="text-xs text-slate-400 mt-4 font-medium">
                  Video Pembahasan Interaktif TKA - Dosen & Guru Pengembang Disdik Aceh
                </p>
                <span className="text-[11px] bg-slate-800 px-3 py-1 rounded-full text-emerald-400 font-mono mt-2">
                  Durasi: {activeVideoModal.durationOrPages}
                </span>
              </div>

              <div className="text-left bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
                <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">
                  Deskripsi & Pembahasan
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeVideoModal.description}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  Tutup
                </button>
                <a
                  href={CLASSROOM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <span>Buka di Google Classroom</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
                <div>📌 <strong>Tingkat:</strong> Kelas {activePdfModal.gradeLevel} SMA/MA</div>
                <div>📌 <strong>Standar:</strong> Kurikulum TKA Aceh & SNBT 2026</div>
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
                <span>Unduh Modul Lengkap</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Learning Material */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Tambah Modul / Media Pembelajaran Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMaterial} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Materi / Modul</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Modul Rumus Cepat Penalaran Kuantitatif"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Mapel</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Penalaran Matematika">Penalaran Matematika</option>
                    <option value="TPS">TPS Skolastik</option>
                    <option value="Literasi Bahasa">Literasi Bahasa</option>
                    <option value="Saintek">Saintek</option>
                    <option value="Soshum">Soshum</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Media</label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="interactive">Interaktif / Slides</option>
                    <option value="video">Video Pembahasan</option>
                    <option value="pdf">Dokumen / PDF Modul</option>
                    <option value="classroom">Google Classroom Post</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Durasi / Jumlah Halaman</label>
                <input
                  type="text"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="Contoh: 35 Menit Video / 40 Halaman PDF"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Ringkas</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  placeholder="Jelaskan ringkasan isi modul..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md"
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
