import { NextRequest, NextResponse } from 'next/server';
import { redis, REDIS_KEYS, isRedisConfigured } from '@/lib/redis';

// GET: Ambil semua data atau data tertentu dari Redis Upstash
export async function GET(request: NextRequest) {
  if (!isRedisConfigured || !redis) {
    return NextResponse.json({
      configured: false,
      message: 'Upstash Redis belum dikonfigurasi di Environment Variables Vercel.'
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key && (REDIS_KEYS as any)[key.toUpperCase()]) {
      const redisKey = (REDIS_KEYS as any)[key.toUpperCase()];
      const data = await redis.get(redisKey);
      return NextResponse.json({
        configured: true,
        key: redisKey,
        data: data || null
      });
    }

    // Ambil seluruh master data sekaligus
    const [
      students,
      teachers,
      attendance,
      teacherAttendance,
      examResults,
      activeClasses,
      materials
    ] = await Promise.all([
      redis.get(REDIS_KEYS.STUDENTS),
      redis.get(REDIS_KEYS.TEACHERS),
      redis.get(REDIS_KEYS.ATTENDANCE),
      redis.get(REDIS_KEYS.TEACHER_ATTENDANCE),
      redis.get(REDIS_KEYS.EXAM_RESULTS),
      redis.get(REDIS_KEYS.ACTIVE_CLASSES),
      redis.get(REDIS_KEYS.MATERIALS)
    ]);

    return NextResponse.json({
      configured: true,
      data: {
        students,
        teachers,
        attendance,
        teacherAttendance,
        examResults,
        activeClasses,
        materials
      }
    });
  } catch (error: any) {
    console.error('Error saat membaca data dari Upstash Redis:', error);
    return NextResponse.json(
      { configured: true, error: error.message || 'Gagal membaca Redis' },
      { status: 500 }
    );
  }
}

// POST: Simpan data (Siswa Excel, Absensi, Jurnal Guru, Hasil Ujian) ke Upstash Redis
export async function POST(request: NextRequest) {
  if (!isRedisConfigured || !redis) {
    return NextResponse.json({
      configured: false,
      message: 'Upstash Redis belum dikonfigurasi. Data tersimpan di memori browser lokal.'
    });
  }

  try {
    const body = await request.json();
    const { action, key, data } = body;

    if (!key || data === undefined) {
      return NextResponse.json(
        { error: 'Parameter key dan data wajib diisi' },
        { status: 400 }
      );
    }

    const redisKey = (REDIS_KEYS as any)[key.toUpperCase()] || `tka:smkn1:${key}`;

    if (action === 'append' && Array.isArray(data)) {
      // Append mode: Gabungkan dengan data array yang sudah ada di Redis
      const existing: any[] = (await redis.get(redisKey)) || [];
      const updated = [...existing, ...data];
      await redis.set(redisKey, updated);
      return NextResponse.json({
        success: true,
        configured: true,
        key: redisKey,
        count: updated.length
      });
    }

    // Set / Overwrite mode
    await redis.set(redisKey, data);

    return NextResponse.json({
      success: true,
      configured: true,
      key: redisKey,
      message: 'Data berhasil disimpan ke Upstash Redis Vercel!'
    });
  } catch (error: any) {
    console.error('Error saat menyimpan ke Upstash Redis:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal menyimpan ke Redis' },
      { status: 500 }
    );
  }
}
