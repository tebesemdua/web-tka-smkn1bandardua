'use client';

import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, Eye, Smartphone, Monitor, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { VisitorStat } from '../types';

interface VisitorAnalyticsChartProps {
  stats: VisitorStat[];
}

export const VisitorAnalyticsChart: React.FC<VisitorAnalyticsChartProps> = ({ stats }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  // Device Breakdown Mock
  const deviceData = [
    { name: 'Smartphone (Android / iOS)', value: 68, color: '#10b981' },
    { name: 'Laptop / PC Desktop', value: 27, color: '#3b82f6' },
    { name: 'Tablet / iPad', value: 5, color: '#f59e0b' },
  ];

  // Subject Access Frequency Mock
  const subjectAccessData = [
    { name: 'Penalaran MTK', views: 4200, fill: '#10b981' },
    { name: 'TPS Skolastik', views: 3850, fill: '#3b82f6' },
    { name: 'Literasi Indo', views: 2700, fill: '#f59e0b' },
    { name: 'Literasi Inggris', views: 2400, fill: '#8b5cf6' },
    { name: 'Saintek & Soshum', views: 1900, fill: '#ec4899' },
  ];

  // Calculate totals
  const totalVisitors = stats.reduce((acc, curr) => acc + curr.visitors, 0);
  const totalPageViews = stats.reduce((acc, curr) => acc + curr.pageViews, 0);
  const latestActive = stats[stats.length - 1]?.activeStudents || 940;

  return (
    <div className="space-y-6">
      {/* Overview Analytics Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Statistik & Grafik Pengunjung Portal Les TKA
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Data analitik pengunjung unik, lalu lintas halaman modul, dan interaksi peserta bimbingan
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === '7d' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 Hari Terakhir
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === '30d' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30 Hari
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Pengunjung Unik</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                +18.4% <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-2">
              {totalVisitors.toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Akumulasi siswa & guru</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Total Tayangan Halaman</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                +24.1% <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-2">
              {totalPageViews.toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Akses modul, kuis & materi</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Siswa Aktif Hari Ini</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 mt-2">
              {latestActive.toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Sedang membuka materi/ujian</span>
          </div>
        </div>

        {/* Area Chart: Visitors and Page Views */}
        <div className="mt-6">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
            Tren Pertumbuhan Pengunjung Harian (Minggu Ini)
          </h4>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="visitors" name="Pengunjung Unik" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="pageViews" name="Tayangan Halaman (Views)" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2-Column Analytics Sub-grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Accessed Subject Modules */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Materi TKA Paling Sering Dipelajari
              </h4>
              <p className="text-xs text-slate-500">Berdasarkan total akses modul dan kuis</p>
            </div>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAccessData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} width={95} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="views" name="Total Akses" radius={[0, 8, 8, 0]}>
                  {subjectAccessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Distribusi Perangkat Pengguna
              </h4>
              <p className="text-xs text-slate-500">Perangkat yang digunakan siswa & guru</p>
            </div>
            <Smartphone className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 text-xs">
              {deviceData.map((dev) => (
                <div key={dev.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dev.color }}></span>
                    <span className="font-semibold text-slate-700">{dev.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{dev.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Optimal pada seluruh perangkat mobile, tablet, dan desktop</span>
          </div>
        </div>
      </div>
    </div>
  );
};
