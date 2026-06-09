import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db/local', () => ({
  isUsingLocalDb: () => true,
  localInsert: vi.fn((table: string, data: any) => ({ ...data, id: 'mock-id' })),
  localQuery: vi.fn(() => []),
  localDelete: vi.fn(() => true),
}))

vi.mock('@/lib/supabase/admin', () => ({
  requireAdmin: vi.fn(() => Promise.resolve({
    user: { id: 'admin-1', email: 'admin@test.com' },
    supabase: null,
  })),
  getAdminClient: vi.fn(() => ({})),
}))

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))

describe('createNews', () => {
  it('creates news with valid data', async () => {
    const { createNews } = await import('@/server/actions/content')
    const fd = new FormData()
    fd.append('title', 'Grand Final 2026')
    fd.append('slug', 'grand-final-2026')
    fd.append('content', 'Acara grand final Nyong Noni Sulawesi Utara 2026 akan diselenggarakan di Manado. Acara ini spektakuler.')
    fd.append('excerpt', 'Grand final akan digelar di Manado')
    fd.append('published', 'true')

    const result = await createNews(fd)
    expect(result.error).toBeUndefined()
    expect(result.data).toBeDefined()
  })

  it('rejects missing title', async () => {
    const { createNews } = await import('@/server/actions/content')
    const fd = new FormData()
    fd.append('title', '')
    fd.append('slug', 'test')
    fd.append('content', 'Test content that is long enough to pass validation')
    fd.append('excerpt', 'Test excerpt')

    const result = await createNews(fd)
    expect(result.error).toBeDefined()
    expect(result.error).toContain('title')
  })

  it('rejects short content', async () => {
    const { createNews } = await import('@/server/actions/content')
    const fd = new FormData()
    fd.append('title', 'Valid Title')
    fd.append('slug', 'valid-title')
    fd.append('content', 'Short')
    fd.append('excerpt', 'Excerpt')

    const result = await createNews(fd)
    expect(result.error).toBeDefined()
    expect(result.error).toContain('content')
  })
})

describe('createEvent', () => {
  it('creates event with valid data', async () => {
    const { createEvent } = await import('@/server/actions/content')
    const fd = new FormData()
    fd.append('title', 'Grand Final 2026')
    fd.append('slug', 'grand-final-2026')
    fd.append('description', 'Acara puncak Nyong Noni Sulawesi Utara 2026')
    fd.append('date', '2026-08-15')
    fd.append('location', 'Manado Convention Center')
    fd.append('published', 'true')

    const result = await createEvent(fd)
    expect(result.error).toBeUndefined()
    expect(result.data).toBeDefined()
  })

  it('rejects missing date', async () => {
    const { createEvent } = await import('@/server/actions/content')
    const fd = new FormData()
    fd.append('title', 'Event Title')
    fd.append('slug', 'event-title')
    fd.append('description', 'A description that is long enough')
    fd.append('date', '')
    fd.append('location', 'Manado')

    const result = await createEvent(fd)
    expect(result.error).toBeDefined()
  })
})

describe('createGalleryItem', () => {
  it('creates gallery item with valid data', async () => {
    const { createGalleryItem } = await import('@/server/actions/content')
    const fd = new FormData()
    fd.append('title', 'Photo Session')
    fd.append('image_url', 'https://example.com/photo.jpg')
    fd.append('category', 'Photo Shoot')

    const result = await createGalleryItem(fd)
    expect(result.error).toBeUndefined()
    expect(result.data).toBeDefined()
  })

  it('rejects invalid image URL', async () => {
    const { createGalleryItem } = await import('@/server/actions/content')
    const fd = new FormData()
    fd.append('title', 'Photo')
    fd.append('image_url', 'not-a-url')
    fd.append('category', 'Test')

    const result = await createGalleryItem(fd)
    expect(result.error).toBeDefined()
    expect(result.error).toContain('image_url')
  })
})
