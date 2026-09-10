'use client';

import React from 'react';
import { UserRole } from '../types';

interface UserAvatarProps {
  name: string;
  role?: UserRole;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showStatus?: boolean;
}

export function getInitials(name: string): string {
  if (!name || name.trim() === '') return '?';
  
  // Clean up unwanted punctuation and role prefixes if any
  const cleaned = name
    .replace(/\(.*\)/g, '')
    .replace(/^(Dra\.|Drs\.|Dr\.|Ir\.|H\.|Hj\.|M\.Pd|S\.Pd|S\.T|S\.Kom|T\.)\s*/gi, '')
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean);
  
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  
  // First letter of first word and first letter of second word
  return (words[0][0] + words[1][0]).toUpperCase();
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  role = 'guest',
  size = 'md',
  className = '',
  showStatus = false
}) => {
  const initials = getInitials(name);

  const sizeClasses = {
    xs: 'w-7 h-7 text-[10px]',
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base font-extrabold',
    xl: 'w-20 h-20 text-2xl font-black'
  };

  const roleGradients: Record<UserRole, string> = {
    admin: 'bg-gradient-to-br from-red-500 via-rose-600 to-red-700 text-white ring-2 ring-red-400/40 shadow-sm',
    guru: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 text-white ring-2 ring-emerald-400/40 shadow-sm',
    siswa: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-700 text-white ring-2 ring-blue-400/40 shadow-sm',
    guest: 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 text-white ring-2 ring-slate-400/40'
  };

  const statusColors: Record<UserRole, string> = {
    admin: 'bg-red-500 border-white',
    guru: 'bg-emerald-500 border-white',
    siswa: 'bg-blue-500 border-white',
    guest: 'bg-slate-400 border-white'
  };

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`rounded-full flex items-center justify-center font-bold select-none tracking-tight ${sizeClasses[size]} ${roleGradients[role]} ${className}`}
        title={`${name} (${role.toUpperCase()})`}
      >
        <span>{initials}</span>
      </div>

      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${statusColors[role]}`}
        />
      )}
    </div>
  );
};
