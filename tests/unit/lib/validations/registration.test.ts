import { describe, it, expect } from 'vitest'
import {
  registrationSchema,
  newsSchema,
  eventSchema,
  gallerySchema,
} from '@/lib/validations/registration'

describe('registrationSchema', () => {
  const validData = {
    full_name: 'John Doe',
    email: 'john@example.com',
    phone: '081234567890',
    date_of_birth: '2000-01-01',
    address: 'Jl. Contoh No. 123, Kelurahan, Kecamatan',
    city: 'Manado',
    province: 'Sulawesi Utara',
    height_cm: 170,
    weight_kg: 60,
    occupation: 'Mahasiswa',
    education: 'Sarjana S1',
  }

  it('validates correct data', () => {
    const result = registrationSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects short name', () => {
    const result = registrationSchema.safeParse({ ...validData, full_name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = registrationSchema.safeParse({ ...validData, email: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('rejects short phone number', () => {
    const result = registrationSchema.safeParse({ ...validData, phone: '123' })
    expect(result.success).toBe(false)
  })

  it('rejects height below minimum', () => {
    const result = registrationSchema.safeParse({ ...validData, height_cm: 100 })
    expect(result.success).toBe(false)
  })

  it('rejects height above maximum', () => {
    const result = registrationSchema.safeParse({ ...validData, height_cm: 250 })
    expect(result.success).toBe(false)
  })

  it('rejects weight below minimum', () => {
    const result = registrationSchema.safeParse({ ...validData, weight_kg: 20 })
    expect(result.success).toBe(false)
  })

  it('rejects empty required fields', () => {
    const result = registrationSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})

describe('newsSchema', () => {
  const validNews = {
    title: 'Grand Final Nyong Noni Sulut 2026',
    slug: 'grand-final-2026',
    content: 'Acara grand final Nyong Noni Sulawesi Utara 2026 akan diselenggarakan di Manado. Acara ini akan menampilkan finalis-finalis terbaik dari seluruh Sulawesi Utara.',
    excerpt: 'Grand final akan digelar di Manado',
    published: true,
  }

  it('validates correct news data', () => {
    const result = newsSchema.safeParse(validNews)
    expect(result.success).toBe(true)
  })

  it('rejects short title', () => {
    const result = newsSchema.safeParse({ ...validNews, title: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects short content', () => {
    const result = newsSchema.safeParse({ ...validNews, content: 'Short' })
    expect(result.success).toBe(false)
  })
})

describe('eventSchema', () => {
  const validEvent = {
    title: 'Grand Final 2026',
    slug: 'grand-final-2026',
    description: 'Acara puncak Nyong Noni Sulawesi Utara 2026',
    date: '2026-08-15',
    location: 'Manado Convention Center',
    published: true,
  }

  it('validates correct event data', () => {
    const result = eventSchema.safeParse(validEvent)
    expect(result.success).toBe(true)
  })

  it('rejects missing date', () => {
    const result = eventSchema.safeParse({ ...validEvent, date: '' })
    expect(result.success).toBe(false)
  })
})

describe('gallerySchema', () => {
  const validGallery = {
    title: 'Photo Shoot Session',
    image_url: 'https://example.com/photo.jpg',
    category: 'Photo Shoot',
  }

  it('validates correct gallery data', () => {
    const result = gallerySchema.safeParse(validGallery)
    expect(result.success).toBe(true)
  })

  it('rejects invalid image url', () => {
    const result = gallerySchema.safeParse({
      ...validGallery,
      image_url: 'not-a-url',
    })
    expect(result.success).toBe(false)
  })
})
