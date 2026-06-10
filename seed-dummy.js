const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve('data/nyong-noni.db');
const db = new Database(dbPath);

console.log('Seeding SQLite database at:', dbPath);

// Enable WAL journal mode & foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Function to safely delete existing records
function clearData() {
  console.log('Clearing existing data...');
  // Delete in reverse order of foreign key dependencies
  db.prepare('DELETE FROM alumni_achievements').run();
  db.prepare('DELETE FROM hall_of_fame').run();
  db.prepare('DELETE FROM news').run();
  db.prepare('DELETE FROM finalist_profiles').run();
  db.prepare('DELETE FROM applicants').run();
  db.prepare('DELETE FROM profiles').run();
  db.prepare('DELETE FROM gallery').run();
  db.prepare('DELETE FROM events').run();
  db.prepare('DELETE FROM titleholders').run();
}

function seedData() {
  console.log('Inserting seed data...');

  // 1. Profiles
  const insertProfile = db.prepare(`
    INSERT INTO profiles (id, email, full_name, role, avatar_url)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertProfile.run(
    'admin-uuid-1',
    'admin@nyongnonisulut.org',
    'Administrator Nyong Noni',
    'admin',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
  );
  insertProfile.run(
    'user-uuid-1',
    'christian.l@gmail.com',
    'Christian Lengkey',
    'user',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  );
  insertProfile.run(
    'user-uuid-2',
    'gabriela.m@gmail.com',
    'Gabriela Mandagi',
    'user',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  );

  console.log('✔ Profiles seeded');

  // 2. Applicants
  const insertApplicant = db.prepare(`
    INSERT INTO applicants (
      id, user_id, full_name, email, phone, date_of_birth, address, city, province, 
      height_cm, weight_kg, occupation, education, photo_url, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertApplicant.run(
    'applicant-uuid-nyong1',
    'user-uuid-1',
    'Christian Lengkey',
    'christian.l@gmail.com',
    '081234567890',
    '2002-05-14',
    'Jl. Sam Ratulangi No. 45, Wanea',
    'Manado',
    'Sulawesi Utara',
    182.0,
    74.0,
    'Mahasiswa Universitas Sam Ratulangi',
    'S1 Teknik Informatika',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    'finalist'
  );

  insertApplicant.run(
    'applicant-uuid-noni1',
    'user-uuid-2',
    'Gabriela Mandagi',
    'gabriela.m@gmail.com',
    '087865432109',
    '2003-09-21',
    'Jl. Tomohon-Manado Km. 12, Kakaskasen',
    'Tomohon',
    'Sulawesi Utara',
    171.0,
    55.0,
    'Mahasiswa Universitas Klabat',
    'S1 Manajemen',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    'finalist'
  );

  insertApplicant.run(
    'applicant-uuid-nyong2',
    null,
    'Jonathan Tumando',
    'jonathan.t@gmail.com',
    '085298765432',
    '2001-11-05',
    'Jl. Madidir Indah No. 12',
    'Bitung',
    'Sulawesi Utara',
    179.0,
    70.0,
    'Wirausaha / Pemilik Kafe',
    'D4 Perhotelan',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    'finalist'
  );

  insertApplicant.run(
    'applicant-uuid-noni2',
    null,
    'Alicia Senduk',
    'alicia.senduk@gmail.com',
    '082199887766',
    '2002-03-30',
    'Jl. Wolter Monginsidi, Malalayang',
    'Manado',
    'Sulawesi Utara',
    168.0,
    52.0,
    'Presenter TV Lokal',
    'S1 Ilmu Komunikasi',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    'finalist'
  );

  insertApplicant.run(
    'applicant-uuid-nyong3',
    null,
    'Rafi Assa',
    'rafi.assa@gmail.com',
    '081344556677',
    '2002-08-18',
    'Airmadidi Atas, Kec. Airmadidi',
    'Minahasa Utara',
    'Sulawesi Utara',
    177.0,
    68.0,
    'Pegawai Swasta',
    'S1 Sistem Informasi',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop',
    'verified'
  );

  insertApplicant.run(
    'applicant-uuid-noni3',
    null,
    'Kezia Wowor',
    'kezia.wowor@gmail.com',
    '087788990011',
    '2004-01-12',
    'Kawangkoan, Kec. Tareran',
    'Minahasa Selatan',
    'Sulawesi Utara',
    169.0,
    53.0,
    'Mahasiswa Universitas Negeri Manado',
    'SMA / Sedang Kuliah S1',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    'pending'
  );

  console.log('✔ Applicants seeded');

  // 3. Finalist Profiles
  const insertFinalistProfile = db.prepare(`
    INSERT INTO finalist_profiles (id, applicant_id, instagram, photo_url, bio, tahun)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertFinalistProfile.run(
    'finalist-profile-uuid-1',
    'applicant-uuid-nyong1',
    '@christian_lengkey',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop',
    'Mewakili Kabupaten Minahasa dengan visi mengembangkan ekowisata berbasis digital di Danau Tondano. Hobi membaca, hiking, dan coding.',
    '2026'
  );

  insertFinalistProfile.run(
    'finalist-profile-uuid-2',
    'applicant-uuid-noni1',
    '@gabrielamandagi',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
    'Mewakili Kota Tomohon, bertekad mempromosikan pariwisata holistik dan kelestarian Festival Bunga Tomohon ke tingkat internasional.',
    '2026'
  );

  insertFinalistProfile.run(
    'finalist-profile-uuid-3',
    'applicant-uuid-nyong2',
    '@jontumando',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
    'Mewakili Kota Bitung, fokus pada pengembangan wisata bahari Selat Lembeh dan digitalisasi UMKM kreatif pesisir.',
    '2026'
  );

  insertFinalistProfile.run(
    'finalist-profile-uuid-4',
    'applicant-uuid-noni2',
    '@alicia_senduk',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop',
    'Mewakili Kota Manado, berkomitmen memajukan pariwisata kuliner dan melestarikan cagar budaya Bunaken sebagai warisan dunia.',
    '2026'
  );

  console.log('✔ Finalist Profiles seeded');

  // 4. News
  const insertNews = db.prepare(`
    INSERT INTO news (id, title, slug, content, excerpt, image_url, author_id, published, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertNews.run(
    'news-uuid-1',
    'Pendaftaran Pemilihan Nyong Noni Sulawesi Utara 2026 Resmi Dibuka',
    'pendaftaran-pemilihan-nyong-noni-sulawesi-utara-2026-resmi-dibuka',
    'Ajang bergengsi Pemilihan Nyong Noni Sulawesi Utara tahun 2026 secara resmi membuka pendaftaran bagi putra-putri terbaik di Bumi Nyiur Melambai. Kegiatan tahunan ini bertujuan untuk menjaring duta wisata, budaya, dan investasi yang akan merepresentasikan Sulawesi Utara di kancah nasional maupun internasional. Persyaratan pendaftaran meliputi rentang usia 18-25 tahun, memiliki tinggi badan minimal untuk Nyong (175 cm) dan Noni (165 cm), serta berdomisili atau keturunan Sulawesi Utara. Pendaftaran dapat dilakukan secara online melalui website resmi ini. Ikuti terus akun media sosial kami untuk informasi persyaratan dan timeline selengkapnya.',
    'Ajang pemilihan duta wisata dan budaya Nyong Noni Sulawesi Utara 2026 resmi membuka pendaftaran secara online.',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop',
    'admin-uuid-1',
    1,
    '2026-06-01 10:00:00'
  );

  insertNews.run(
    'news-uuid-2',
    'Sosialisasi dan Roadshow Nyong Noni Sulut 2026 di Kabupaten/Kota',
    'sosialisasi-dan-roadshow-nyong-noni-sulut-2026-di-kabupaten-kota',
    'Panitia Pemilihan Nyong Noni Sulawesi Utara 2026 memulai rangkaian sosialisasi dan roadshow ke 15 Kabupaten/Kota di Sulawesi Utara. Roadshow ini bertujuan untuk memberikan informasi menyeluruh mengenai ajang pemilihan tahun ini serta memotivasi bakat-bakat daerah untuk berpartisipasi. Kunjungan pertama dilakukan di Kota Tomohon dan Kabupaten Minahasa, disambut hangat oleh pemerintah daerah setempat dan generasi muda yang antusias. Sosialisasi ini juga membahas pembekalan materi pariwisata, etika public speaking, dan advokasi sosial.',
    'Panitia melakukan roadshow ke 15 Kabupaten/Kota untuk sosialisasi pemilihan Nyong Noni Sulut 2026.',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=450&fit=crop',
    'admin-uuid-1',
    1,
    '2026-06-05 14:30:00'
  );

  insertNews.run(
    'news-uuid-3',
    'Malam Bakat Nyong Noni Sulut 2026 Menampilkan Kreativitas Finalis',
    'malam-bakat-nyong-noni-sulut-2026-menampilkan-kreativitas-finalis',
    'Panggung Malam Bakat Nyong Noni Sulawesi Utara 2026 sukses memukau para juri dan penonton yang hadir secara langsung maupun virtual. Seluruh finalis menampilkan keahlian mereka masing-masing, mulai dari tarian tradisional Maengket, permainan musik kolintang, monolog teater, hingga presentasi karya tulis ilmiah bertema pariwisata berkelanjutan. Dewan juri memberikan apresiasi tinggi atas kualitas penampilan para finalis tahun ini yang menunjukkan kecintaan mendalam pada budaya daerah.',
    'Para finalis memukau juri dalam Malam Bakat dengan membawakan tarian tradisional hingga musik kolintang.',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=450&fit=crop',
    'admin-uuid-1',
    1,
    '2026-06-09 20:00:00'
  );

  console.log('✔ News seeded');

  // 5. Gallery
  const insertGallery = db.prepare(`
    INSERT INTO gallery (id, title, description, image_url, category)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertGallery.run(
    'gallery-uuid-1',
    'Official Photoshoot Nyong Noni Sulut 2026',
    'Sesi foto studio resmi para finalis Nyong Noni Sulut 2026 dengan mengenakan pakaian adat modifikasi.',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
    'Photo Shoot'
  );

  insertGallery.run(
    'gallery-uuid-2',
    'Aksi Peduli Lingkungan di Pantai Bunaken',
    'Kegiatan bersih-bersih pantai oleh ikatan Nyong Noni Sulut sebagai bagian dari program kampanye wisata berkelanjutan.',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop',
    'Activities'
  );

  insertGallery.run(
    'gallery-uuid-3',
    'Momen Penobatan Juara Nyong Noni Sulut 2025',
    'Ekspresi kebahagiaan pemenang saat dinobatkan pada Malam Grand Final tahun lalu di MCC Manado.',
    'https://images.unsplash.com/photo-1523580494863-6f3031224509?w=800&h=600&fit=crop',
    'Grand Final'
  );

  insertGallery.run(
    'gallery-uuid-4',
    'Kunjungan Sosial ke Panti Asuhan Manado',
    'Berbagi keceriaan dan memberikan donasi serta edukasi literasi budaya kepada anak-anak panti asuhan.',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    'Activities'
  );

  console.log('✔ Gallery seeded');

  // 6. Events
  const insertEvent = db.prepare(`
    INSERT INTO events (id, title, slug, description, date, location, category, image_url, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertEvent.run(
    'event-uuid-1',
    'Audisi Tahap I Nyong Noni Sulut 2026',
    'audisi-tahap-i-nyong-noni-sulut-2026',
    'Proses seleksi administrasi, tinggi badan, wawancara kepribadian dan pengetahuan umum bagi seluruh pendaftar daerah.',
    '2026-06-25',
    'Kantor Dinas Pariwisata Daerah Provinsi Sulawesi Utara, Manado',
    'Audisi',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop',
    1
  );

  insertEvent.run(
    'event-uuid-2',
    'Masa Karantina Terbuka & Pembekalan',
    'masa-karantina-terbuka-dan-pembekalan',
    'Finalis akan dikarantina selama satu minggu untuk menerima materi dari berbagai narasumber ahli tentang kepariwisataan, budaya, kepemimpinan, dan etika.',
    '2026-08-08',
    'Hotel Grand Luley, Manado',
    'Karantina',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=450&fit=crop',
    1
  );

  insertEvent.run(
    'event-uuid-3',
    'Malam Grand Final Pemilihan Nyong Noni Sulut 2026',
    'malam-grand-final-pemilihan-nyong-noni-sulut-2026',
    'Malam puncak penentuan dan penobatan Nyong dan Noni Sulawesi Utara 2026 yang akan dihadiri oleh Gubernur dan tokoh-tokoh penting daerah.',
    '2026-08-15',
    'Grand Kawanua Convention Center, Manado',
    'Grand Final',
    'https://images.unsplash.com/photo-1523580494863-6f3031224509?w=800&h=450&fit=crop',
    1
  );

  console.log('✔ Events seeded');

  // 7. Hall of Fame
  const insertHOF = db.prepare(`
    INSERT INTO hall_of_fame (id, tahun, nyong_name, noni_name, nyong_photo_url, noni_photo_url, kabupaten_kota)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertHOF.run(
    'hof-uuid-1',
    2025,
    'Stenly Lonteng',
    'Brenda Kawengian',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop',
    'Minahasa Utara'
  );

  insertHOF.run(
    'hof-uuid-2',
    2024,
    'Andrew Pangalila',
    'Fiorenza Lumempow',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
    'Manado'
  );

  insertHOF.run(
    'hof-uuid-3',
    2023,
    'Garry Senduk',
    'Vanessa Pangalila',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop',
    'Bitung'
  );

  console.log('✔ Hall of Fame seeded');

  // 8. Alumni Achievements
  const insertAlumniAchievement = db.prepare(`
    INSERT INTO alumni_achievements (id, alumni_name, achievement_type, description, tahun, photo_url, instagram)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertAlumniAchievement.run(
    'alumni-ach-uuid-1',
    'Andrew Pangalila',
    'ASN',
    'Saat ini mengabdi di Bidang Pemasaran Dinas Pariwisata Provinsi Sulawesi Utara.',
    '2024',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    '@andrewpangalila'
  );

  insertAlumniAchievement.run(
    'alumni-ach-uuid-2',
    'Brenda Kawengian',
    'Dokter',
    'Aktif sebagai dokter residen dan mendirikan program penyuluhan kesehatan pedesaan "Kawanua Sehat".',
    '2025',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    '@brenda_kawengian'
  );

  insertAlumniAchievement.run(
    'alumni-ach-uuid-3',
    'Garry Senduk',
    'Pengusaha',
    'Founder startup pariwisata SulutGo dan co-owner jaringan warkop lokal di Manado.',
    '2023',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop',
    '@garrysenduk'
  );

  console.log('✔ Alumni Achievements seeded');

  // 9. Titleholders
  const insertTitleholder = db.prepare(`
    INSERT INTO titleholders (
      id, tahun, category, nyong_name, noni_name, region, motto, biography, 
      nyong_photo_url, noni_photo_url, nyong_instagram, noni_instagram, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertTitleholder.run(
    'titleholder-uuid-1',
    2025,
    'Juara Utama',
    'Stenly Lonteng',
    'Brenda Kawengian',
    'Minahasa Utara',
    'Melayani dengan integritas dan mempromosikan Sulawesi Utara melampaui batas.',
    'Stenly Lonteng dan Brenda Kawengian dinobatkan sebagai Juara Utama Nyong Noni Sulawesi Utara 2025 atas kecerdasan, advokasi, serta penampilan memukau mereka.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
    '@stenlylonteng',
    '@brenda_kawengian',
    1
  );

  insertTitleholder.run(
    'titleholder-uuid-2',
    2025,
    'Wakil I',
    'Fallen Rondonuwu',
    'Tasya Pandeiroot',
    'Manado',
    'Menjadi inspirasi perubahan bagi kaum muda pariwisata.',
    'Fallen dan Tasya mewakili Kota Manado dengan program advokasi wisata bahari urban.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop',
    '@fallen_r',
    '@tasyapandeiroot',
    2
  );

  insertTitleholder.run(
    'titleholder-uuid-3',
    2025,
    'Berbakat',
    'Gerald Sumolang',
    'Angelina Polii',
    'Tomohon',
    'Kesenian adalah bahasa universal jiwa.',
    'Gerald dan Angelina memukau panggung malam bakat dengan kepiawaian musik tradisional.',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop',
    '@geraldsumolang',
    '@angelinapolii',
    10
  );

  console.log('✔ Titleholders seeded');
}

try {
  db.transaction(() => {
    clearData();
    seedData();
  })();
  console.log('🎉 Seeding successfully completed!');
} catch (error) {
  console.error('❌ Error during seeding:', error);
} finally {
  db.close();
}
