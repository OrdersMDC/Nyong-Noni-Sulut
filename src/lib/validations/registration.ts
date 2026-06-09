import { z } from 'zod'

export const registrationSchema = z.object({
  full_name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  date_of_birth: z.string().min(1, 'Tanggal lahir harus diisi'),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  city: z.string().min(3, 'Kota harus diisi'),
  province: z.string().min(3, 'Provinsi harus diisi'),
  height_cm: z.coerce.number().min(140, 'Tinggi badan minimal 140 cm').max(220, 'Tinggi badan maksimal 220 cm'),
  weight_kg: z.coerce.number().min(35, 'Berat badan minimal 35 kg').max(150, 'Berat badan maksimal 150 kg'),
  occupation: z.string().min(3, 'Pekerjaan harus diisi'),
  education: z.string().min(3, 'Pendidikan harus diisi'),
})

export const registrationStepSchema = [
  // Step 1: Personal Info
  z.object({
    full_name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
    date_of_birth: z.string().min(1, 'Tanggal lahir harus diisi'),
  }),
  // Step 2: Address
  z.object({
    address: z.string().min(10, 'Alamat minimal 10 karakter'),
    city: z.string().min(3, 'Kota harus diisi'),
    province: z.string().min(3, 'Provinsi harus diisi'),
  }),
  // Step 3: Physical & Background
  z.object({
    height_cm: z.coerce.number().min(140, 'Tinggi badan minimal 140 cm').max(220, 'Tinggi badan maksimal 220 cm'),
    weight_kg: z.coerce.number().min(35, 'Berat badan minimal 35 kg').max(150, 'Berat badan maksimal 150 kg'),
    occupation: z.string().min(3, 'Pekerjaan harus diisi'),
    education: z.string().min(3, 'Pendidikan harus diisi'),
  }),
]

export const newsSchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter'),
  slug: z.string().min(3, 'Slug minimal 3 karakter'),
  content: z.string().min(50, 'Konten minimal 50 karakter'),
  excerpt: z.string().min(10, 'Ringkasan minimal 10 karakter'),
  image_url: z.string().url('URL tidak valid').nullable().optional(),
  published: z.boolean().default(false),
})

export const eventSchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter'),
  slug: z.string().min(3, 'Slug minimal 3 karakter'),
  description: z.string().min(20, 'Deskripsi minimal 20 karakter'),
  date: z.string().min(1, 'Tanggal harus diisi'),
  location: z.string().min(3, 'Lokasi harus diisi'),
  category: z.enum(['Audisi', 'Karantina', 'Grand Final', 'Kegiatan Sosial', 'Promosi Wisata'], {
    errorMap: () => ({ message: 'Pilih kategori acara' }),
  }).default('Kegiatan Sosial'),
  image_url: z.string().url('URL tidak valid').nullable().optional(),
  published: z.boolean().default(false),
})

export const gallerySchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  description: z.string().nullable().optional(),
  image_url: z.string().url('URL gambar tidak valid'),
  category: z.string().min(3, 'Kategori harus diisi'),
})

export const finalistProfileSchema = z.object({
  applicant_id: z.string().min(1),
  instagram: z.string().optional(),
  photo_url: z.string().optional(),
  bio: z.string().optional(),
  tahun: z.string().min(4, 'Tahun harus diisi'),
})

export const finalistUpdateSchema = z.object({
  applicant_id: z.string().min(1),
  full_name: z.string().min(3, 'Nama lengkap minimal 3 karakter').optional(),
  email: z.string().email('Email tidak valid').optional(),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit').optional(),
  date_of_birth: z.string().min(1, 'Tanggal lahir harus diisi').optional(),
  address: z.string().min(10, 'Alamat minimal 10 karakter').optional(),
  city: z.string().min(3, 'Kota harus diisi').optional(),
  province: z.string().min(3, 'Provinsi harus diisi').optional(),
  height_cm: z.coerce.number().min(140, 'Tinggi badan minimal 140 cm').max(220, 'Tinggi badan maksimal 220 cm').optional(),
  weight_kg: z.coerce.number().min(35, 'Berat badan minimal 35 kg').max(150, 'Berat badan maksimal 150 kg').optional(),
  occupation: z.string().min(3, 'Pekerjaan harus diisi').optional(),
  education: z.string().min(3, 'Pendidikan harus diisi').optional(),
  instagram: z.string().optional(),
  photo_url: z.string().optional(),
  bio: z.string().optional(),
  tahun: z.string().min(4, 'Tahun harus diisi'),
})

export const hallOfFameSchema = z.object({
  tahun: z.coerce.number().min(2000, 'Tahun minimal 2000').max(2100, 'Tahun maksimal 2100'),
  nyong_name: z.string().min(3, 'Nama Nyong minimal 3 karakter'),
  noni_name: z.string().min(3, 'Nama Noni minimal 3 karakter'),
  nyong_photo_url: z.string().optional(),
  noni_photo_url: z.string().optional(),
  kabupaten_kota: z.string().min(3, 'Kabupaten/Kota harus diisi'),
})

export const alumniAchievementSchema = z.object({
  alumni_name: z.string().min(3, 'Nama minimal 3 karakter'),
  achievement_type: z.enum(['ASN', 'Dokter', 'Pengusaha', 'Influencer', 'Duta Nasional'], {
    errorMap: () => ({ message: 'Pilih tipe prestasi' }),
  }),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  tahun: z.string().min(4, 'Tahun harus diisi'),
  photo_url: z.string().optional(),
  instagram: z.string().optional(),
})

export type RegistrationInput = z.infer<typeof registrationSchema>
export type NewsInput = z.infer<typeof newsSchema>
export type EventInput = z.infer<typeof eventSchema>
export type GalleryInput = z.infer<typeof gallerySchema>
export type HallOfFameInput = z.infer<typeof hallOfFameSchema>
export type AlumniAchievementInput = z.infer<typeof alumniAchievementSchema>
