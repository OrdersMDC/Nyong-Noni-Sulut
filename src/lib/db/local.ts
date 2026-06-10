import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

let db: Database.Database | null = null

export function getLocalDb(): Database.Database {
  if (!db) {
    const dbDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }
    const dbPath = path.join(dbDir, 'nyong-noni.db')
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initSchema(db)
  }
  return db
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
      avatar_url TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS applicants (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      user_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      province TEXT NOT NULL,
      height_cm REAL NOT NULL,
      weight_kg REAL NOT NULL,
      occupation TEXT NOT NULL,
      education TEXT NOT NULL,
      photo_url TEXT,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'finalist')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS news (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      image_url TEXT,
      author_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      published INTEGER NOT NULL DEFAULT 0,
      published_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      category TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'Kegiatan Sosial' CHECK (category IN ('Audisi', 'Karantina', 'Grand Final', 'Kegiatan Sosial', 'Promosi Wisata')),
      image_url TEXT,
      published INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS finalist_profiles (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      applicant_id TEXT NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
      instagram TEXT,
      photo_url TEXT,
      bio TEXT,
      tahun TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS hall_of_fame (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      tahun INTEGER NOT NULL,
      nyong_name TEXT NOT NULL,
      noni_name TEXT NOT NULL,
      nyong_photo_url TEXT,
      noni_photo_url TEXT,
      kabupaten_kota TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS alumni_achievements (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      alumni_name TEXT NOT NULL,
      achievement_type TEXT NOT NULL CHECK (achievement_type IN ('ASN', 'Dokter', 'Pengusaha', 'Influencer', 'Duta Nasional')),
      description TEXT NOT NULL,
      tahun TEXT NOT NULL,
      photo_url TEXT,
      instagram TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)
}

export function isUsingLocalDb(): boolean {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co'
}

// Helper types for local DB operations
export type LocalQueryResult<T> = T[]

export function localQuery<T>(table: string, options?: {
  where?: Record<string, unknown>
  orderBy?: { column: string; direction?: 'ASC' | 'DESC' }
  limit?: number
}): T[] {
  const database = getLocalDb()
  let sql = `SELECT * FROM ${table}`
  const params: unknown[] = []

  if (options?.where) {
    const conditions = Object.entries(options.where)
      .filter(([, v]) => v !== undefined)
      .map(([k]) => `${k} = ?`)
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`
      params.push(...Object.entries(options.where)
        .filter(([, v]) => v !== undefined)
        .map(([, v]) => v))
    }
  }

  if (options?.orderBy) {
    sql += ` ORDER BY ${options.orderBy.column} ${options.orderBy.direction || 'ASC'}`
  }

  if (options?.limit) {
    sql += ` LIMIT ?`
    params.push(options.limit)
  }

  return database.prepare(sql).all(...params) as T[]
}

export function localInsert<T>(table: string, data: Record<string, unknown>): T {
  const database = getLocalDb()
  const keys = Object.keys(data)
  const values = Object.values(data)
  const placeholders = keys.map(() => '?').join(', ')

  const stmt = database.prepare(
    `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`
  )
  stmt.run(...values)
  return localQuery<T>(table, {
    where: { id: data.id as string },
    orderBy: { column: 'created_at', direction: 'DESC' },
    limit: 1,
  })[0]
}

export function localUpdate<T>(table: string, id: string, data: Record<string, unknown>): T | null {
  const database = getLocalDb()
  const keys = Object.keys(data)
  const values = Object.values(data)

  const setClause = keys.map(k => `${k} = ?`).join(', ')
  database.prepare(`UPDATE ${table} SET ${setClause} WHERE id = ?`).run(...values, id)

  const result = localQuery<T>(table, { where: { id } })
  return result[0] || null
}

export function localDelete(table: string, id: string): boolean {
  const database = getLocalDb()
  const result = database.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id)
  return result.changes > 0
}
