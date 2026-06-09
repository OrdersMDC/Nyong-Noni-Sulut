import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const TEST_DB_PATH = path.join(process.cwd(), 'data', 'test-nyong-noni.db')

describe('Local Database', () => {
  let db: Database.Database

  beforeAll(() => {
    if (fs.existsSync(TEST_DB_PATH)) fs.unlinkSync(TEST_DB_PATH)
    db = new Database(TEST_DB_PATH)
    db.pragma('journal_mode = WAL')
    db.exec(`
      CREATE TABLE IF NOT EXISTS applicants (
        id TEXT PRIMARY KEY,
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
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS news (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        image_url TEXT,
        author_id TEXT NOT NULL,
        published INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `)
  })

  afterAll(() => {
    db.close()
    if (fs.existsSync(TEST_DB_PATH)) fs.unlinkSync(TEST_DB_PATH)
  })

  describe('CRUD operations', () => {
    it('inserts and retrieves an applicant', () => {
      const id = 'test-id-1'
      db.prepare(`INSERT INTO applicants (id, full_name, email, phone, date_of_birth, address, city, province, height_cm, weight_kg, occupation, education, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
        id, 'John Doe', 'john@test.com', '081234567890', '2000-01-01',
        'Jl. Test', 'Manado', 'Sulawesi Utara', 170, 60, 'Mahasiswa', 'S1', 'pending'
      )

      const row = db.prepare('SELECT * FROM applicants WHERE id = ?').get(id) as any
      expect(row).toBeDefined()
      expect(row.full_name).toBe('John Doe')
      expect(row.status).toBe('pending')
    })

    it('updates applicant status', () => {
      db.prepare('UPDATE applicants SET status = ? WHERE id = ?').run('finalist', 'test-id-1')
      const row = db.prepare('SELECT * FROM applicants WHERE id = ?').get('test-id-1') as any
      expect(row.status).toBe('finalist')
    })

    it('deletes an applicant', () => {
      db.prepare('DELETE FROM applicants WHERE id = ?').run('test-id-1')
      const row = db.prepare('SELECT * FROM applicants WHERE id = ?').get('test-id-1')
      expect(row).toBeUndefined()
    })

    it('inserts and retrieves news', () => {
      const id = 'news-1'
      db.prepare(`INSERT INTO news (id, title, slug, content, excerpt, author_id, published)
        VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
        id, 'Grand Final 2026', 'grand-final-2026',
        'Content here', 'Excerpt here', 'author-1', 1
      )

      const row = db.prepare('SELECT * FROM news WHERE id = ?').get(id) as any
      expect(row).toBeDefined()
      expect(row.title).toBe('Grand Final 2026')
      expect(row.published).toBe(1)
    })

    it('queries with ordering', () => {
      const rows = db.prepare('SELECT * FROM applicants ORDER BY created_at DESC').all()
      expect(rows).toBeDefined()
    })
  })
})
