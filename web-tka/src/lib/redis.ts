import { Redis } from '@upstash/redis';

// Mendukung konfigurasi otomatis Vercel Storage:
// 1. Vercel KV: KV_REST_API_URL & KV_REST_API_TOKEN
// 2. Upstash Redis Marketplace: UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN

const redisUrl = 
  process.env.KV_REST_API_URL || 
  process.env.UPSTASH_REDIS_REST_URL || 
  '';

const redisToken = 
  process.env.KV_REST_API_TOKEN || 
  process.env.UPSTASH_REDIS_REST_TOKEN || 
  '';

export const isRedisConfigured = Boolean(redisUrl && redisToken && redisUrl.startsWith('http'));

export const redis = isRedisConfigured
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null;

// Prefix keys untuk database SMKN 1 Bandar Dua di Redis
export const REDIS_KEYS = {
  STUDENTS: 'tka:smkn1:students',
  TEACHERS: 'tka:smkn1:teachers',
  ATTENDANCE: 'tka:smkn1:attendance',
  TEACHER_ATTENDANCE: 'tka:smkn1:teacher_attendance',
  EXAMS: 'tka:smkn1:exams',
  EXAM_RESULTS: 'tka:smkn1:exam_results',
  MATERIALS: 'tka:smkn1:materials',
  ACTIVE_CLASSES: 'tka:smkn1:active_classes',
  VISITOR_STATS: 'tka:smkn1:visitor_stats'
};
