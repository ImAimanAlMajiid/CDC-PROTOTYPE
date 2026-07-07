import { Job, CareerEvent, Testimonial, CareerCoaching, CampusHiringSession } from './types';

export const initialJobs: Job[] = [
  {
    id: 'job-1',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    companyName: 'PT GoTo Gojek Tokopedia Tbk',
    position: 'Junior Software Engineer (Backend)',
    location: 'Jakarta Selatan (Hybrid)',
    salary: 'Rp 12.000.000 - Rp 18.000.000',
    jobType: 'Full-time',
    category: 'IT & Software',
    experience: 'Fresh Graduate',
    deadline: '2026-08-30',
    description: 'Kami mencari lulusan baru yang bersemangat untuk bergabung dengan tim Core Engineering kami. Anda akan merancang, membangun, dan memelihara sistem mikroservis dengan skalabilitas tinggi menggunakan Go dan PostgreSQL.',
    requirements: [
      'Gelar Sarjana Ilmu Komputer, Teknik Informatika, atau bidang terkait.',
      'Pemahaman kuat tentang struktur data, algoritma, dan OOP.',
      'Pengalaman dasar dengan Go, Node.js, atau Java.',
      'Memahami konsep RESTful API dan database relasional.',
      'Sikap pembelajar mandiri yang baik dan kolaboratif.'
    ],
    benefits: [
      'Gaji kompetitif & Bonus Kinerja Tahunan.',
      'Asuransi Kesehatan Swasta Kelas Utama.',
      'Tunjangan Belajar dan Pengembangan Diri.',
      'Lingkungan kerja hybrid yang fleksibel (3 hari WFH, 2 hari WFO).',
      'Subsidi makan siang dan keanggotaan gym.'
    ],
    skills: ['Golang', 'PostgreSQL', 'Docker', 'REST API', 'Git'],
    isBookmarked: false,
    isApplied: false
  },
  {
    id: 'job-2',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    companyName: 'PT Bank Central Asia Tbk (BCA)',
    position: 'IT Trainee (Management Development Program)',
    location: 'Tangerang / Jakarta',
    salary: 'Rp 9.500.000 - Rp 12.500.000',
    jobType: 'Full-time',
    category: 'IT & Software',
    experience: 'Fresh Graduate',
    deadline: '2026-07-25',
    description: 'Program akselerasi karier intensif selama 1 tahun untuk mempersiapkan Anda menjadi pimpinan IT masa depan di bank swasta terbesar di Indonesia. Kurikulum mencakup pelatihan teknis kelas dunia, on-the-job training, dan mentoring langsung oleh eksekutif BCA.',
    requirements: [
      'Lulusan S1/S2 IPK minimal 3.00 dari jurusan Teknik Informatika/Sistem Informasi.',
      'Usia maksimal 24 tahun (S1) atau 26 tahun (S2).',
      'Memiliki minat tinggi dalam pemrograman dan teknologi perbankan.',
      'Kemampuan analitis dan pemecahan masalah yang luar biasa.',
      'Bersedia ditempatkan di Jakarta/Tangerang.'
    ],
    benefits: [
      'Uang saku bulanan yang kompetitif selama pelatihan.',
      'Pengangkatan langsung sebagai karyawan tetap setelah lulus program.',
      'Asuransi kesehatan lengkap termasuk keluarga.',
      'Jenjang karier yang jelas di salah satu institusi keuangan terkemuka.',
      'Pinjaman karyawan bersubsidi tinggi.'
    ],
    skills: ['Java', 'SQL', 'System Analysis', 'Problem Solving', 'Communication'],
    isBookmarked: true,
    isApplied: false
  },
  {
    id: 'job-3',
    logo: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=120&h=120&q=80',
    companyName: 'Traveloka Indonesia',
    position: 'Product Design Intern',
    location: 'Jakarta Barat (Remote)',
    salary: 'Rp 4.000.000 - Rp 6.000.000',
    jobType: 'Magang',
    category: 'Design',
    experience: 'Fresh Graduate',
    deadline: '2026-07-20',
    description: 'Bergabunglah dengan tim Product Design legendaris Traveloka selama 6 bulan. Anda akan berkolaborasi erat dengan Product Manager, Researcher, dan Engineer untuk merancang solusi antarmuka pengguna yang menakjubkan bagi jutaan pelanggan aktif.',
    requirements: [
      'Mahasiswa tingkat akhir atau lulusan baru Desain Komunikasi Visual (DKV), Ilmu Komputer, atau sejenis.',
      'Portofolio desain UI/UX yang menunjukkan pemahaman proses desain berpusat pada pengguna (UCD).',
      'Mahir mengoperasikan Figma dan tool desain modern.',
      'Memiliki kemampuan riset pengguna dasar.',
      'Kemampuan komunikasi tertulis dan lisan yang baik dalam Bahasa Indonesia dan Inggris.'
    ],
    benefits: [
      'Uang saku bulanan kompetitif.',
      'Sertifikat Magang resmi dan rekomendasi kerja.',
      'Kesempatan besar dikonversi menjadi karyawan tetap setelah magang selesai.',
      'Akses ke kursus internal desain tingkat lanjut.',
      'Voucher perjalanan eksklusif Traveloka.'
    ],
    skills: ['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping'],
    isBookmarked: false,
    isApplied: false
  },
  {
    id: 'job-4',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&h=120&q=80',
    companyName: 'Shopee Indonesia',
    position: 'Digital Marketing Associate',
    location: 'Jakarta Selatan',
    salary: 'Rp 8.000.000 - Rp 11.500.000',
    jobType: 'Full-time',
    category: 'Marketing',
    experience: '1-3 Tahun',
    deadline: '2026-08-15',
    description: 'Mengelola kampanye pemasaran digital ujung-ke-ujung untuk kategori e-commerce utama kami. Anda bertanggung jawab memaksimalkan ROI melalui penargetan audiens yang cerdas, desain iklan kreatif, dan analisis data konversi harian.',
    requirements: [
      'Gelar Sarjana dari universitas terkemuka di bidang Komunikasi, Pemasaran, atau Bisnis.',
      'Minimal 1 tahun pengalaman di bidang Digital Marketing (Meta Ads, Google Ads).',
      'Kemampuan analitis yang kuat untuk membaca Google Analytics dan instrumen pelacakan.',
      'Berpikir kreatif dan mampu menulis naskah iklan (copywriting) yang menarik.',
      'Mampu bekerja di bawah tenggat waktu yang ketat.'
    ],
    benefits: [
      'Gaji bersaing + kompensasi lembur.',
      'Subsidi pulsa & device laptop kerja Apple MacBook.',
      'Asuransi kesehatan lengkap (rawat jalan & inap).',
      'Akses ke Shopee Academy untuk sertifikasi Google & Facebook Blueprint.',
      'Makan malam gratis jika lembur.'
    ],
    skills: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'Copywriting', 'SEO'],
    isBookmarked: false,
    isApplied: false
  },
  {
    id: 'job-5',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=120&h=120&q=80',
    companyName: 'PT Telkom Indonesia Tbk',
    position: 'Data Analyst (Internship)',
    location: 'Bandung (Hybrid)',
    salary: 'Rp 3.500.000 - Rp 4.500.000',
    jobType: 'Magang',
    category: 'Finance',
    experience: 'Fresh Graduate',
    deadline: '2026-07-31',
    description: 'Program magang 6 bulan di Divisi Digital Business Telkom. Anda akan membantu dalam mengumpulkan, mengolah, dan memvisualisasikan data interaksi pelanggan aplikasi MyIndiHome untuk menghasilkan wawasan bisnis yang berharga.',
    requirements: [
      'Mahasiswa aktif tingkat akhir jurusan Statistika, Matematika, Sistem Informasi, atau Ekonomi Pembangunan.',
      'Memahami dasar SQL dan manipulasi data menggunakan Python (Pandas) atau R.',
      'Mampu membuat dasbor visualisasi data yang mudah dipahami di Tableau atau Google Looker Studio.',
      'Komunikatif dalam menjelaskan temuan berbasis data.',
      'IPK minimal 3.25.'
    ],
    benefits: [
      'Sertifikat resmi Magang BUMN.',
      'Uang saku bulanan menarik.',
      'Bimbingan langsung oleh Senior Data Scientist Telkom.',
      'Sertifikasi Big Data & Cloud Computing internal gratis.'
    ],
    skills: ['SQL', 'Python', 'Tableau', 'Looker Studio', 'Data Analysis'],
    isBookmarked: false,
    isApplied: false
  },
  {
    id: 'job-6',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    companyName: 'Astra International',
    position: 'Human Resources Development Trainee',
    location: 'Jakarta Utara',
    salary: 'Rp 10.000.000 - Rp 13.000.000',
    jobType: 'Full-time',
    category: 'Human Resources',
    experience: 'Fresh Graduate',
    deadline: '2026-08-05',
    description: 'Temukan potensi penuh Anda di bidang manajemen sumber daya manusia. Program rotasi 18 bulan ini mencakup rekrutmen talenta, hubungan industrial, manajemen kompensasi, hingga inisiatif pengembangan budaya organisasi Astra.',
    requirements: [
      'Lulusan baru S1 dari jurusan Psikologi, Hukum, Manajemen, atau Teknik Industri.',
      'IPK minimal 3.20.',
      'Keterampilan interpersonal, negosiasi, dan kepemimpinan yang kuat.',
      'Aktif berorganisasi di universitas sebagai ketua atau pengurus teras.',
      'Fasih berbahasa Inggris.'
    ],
    benefits: [
      'Jenjang karier manajerial terakselerasi.',
      'Bonus tahunan yang sangat menarik (hingga 3-4 kali gaji).',
      'Asuransi kesehatan rawat jalan/inap full cover.',
      'Fasilitas olahraga dan kesehatan gratis di lingkungan kantor pusat.'
    ],
    skills: ['Psychometric Testing', 'Interpersonal Communication', 'Negotiation', 'Recruiting', 'Public Speaking'],
    isBookmarked: false,
    isApplied: false
  }
];

export const initialEvents: CareerEvent[] = [
  {
    id: 'ev-1',
    title: 'Grand Campus Hiring CDC Universitas 2026',
    date: '15-16 Juli 2026',
    time: '09:00 - 16:00 WIB',
    location: 'Auditorium Utama Universitas, Kampus A',
    type: 'Campus Hiring',
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&h=300&q=80',
    speaker: 'PT GoTo, BCA, Astra International, Shopee, Telkom, Pertamina, dll.',
    isRegistered: false
  },
  {
    id: 'ev-2',
    title: 'Webinar: Menembus Seleksi CV ATS-Friendly & LinkedIn Hacks',
    date: '22 Juli 2026',
    time: '13:00 - 15:30 WIB',
    location: 'Zoom Meeting Online',
    type: 'Webinar',
    banner: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&h=300&q=80',
    speaker: 'Vina A. Muliana (Senior HR Professional & Career Influencer)',
    isRegistered: false
  },
  {
    id: 'ev-3',
    title: 'Workshop Interaktif: Teknik Sukses Behavioral Interview (STAR Method)',
    date: '28 Juli 2026',
    time: '10:00 - 12:30 WIB',
    location: 'Ruang Seminar CDC Gedung Rektorat Lt. 2',
    type: 'Workshop',
    banner: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&h=300&q=80',
    speaker: 'Budi Hartono, M.Psi (Head of Talent Acquisition Traveloka)',
    isRegistered: false
  },
  {
    id: 'ev-4',
    title: 'Campus Hiring BCA: Jalur Khusus Mahasiswa Teknik Informatika',
    date: '02 Agustus 2026',
    time: '08:30 - 14:00 WIB',
    location: 'Lab Komputer Gedung Fakultas Teknik Lt. 3',
    type: 'Campus Hiring',
    banner: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&h=300&q=80',
    speaker: 'BCA HR Recruitment Specialist',
    isRegistered: false
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Andi Wijaya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    company: 'PT GoTo Gojek Tokopedia Tbk',
    role: 'Backend Engineer (Alumni 2024)',
    text: 'Layanan CV Review dan Campus Hiring di CDC sangat membantu saya. Hanya butuh waktu 3 minggu setelah lulus hingga akhirnya diterima di tim GoTo melalui seleksi eksklusif kampus!'
  },
  {
    id: 't-2',
    name: 'Siti Rahmawati',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    company: 'PT Bank Central Asia Tbk',
    role: 'IT Specialist Trainee (Alumni 2025)',
    text: 'Webinar berkala tentang wawancara kerja yang diselenggarakan oleh CDC benar-benar membuka mata saya tentang pentingnya metode STAR. Program bimbingan kariernya nomor satu!'
  },
  {
    id: 't-3',
    name: 'Rian Pratama',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    company: 'Shopee Indonesia',
    role: 'UI/UX Designer (Alumni 2023)',
    text: 'Saya merekomendasikan layanan Career Coaching CDC. Coach yang berpengalaman memberikan masukan portofolio yang sangat mendetail, yang membuat saya menonjol di hadapan rekruter Shopee.'
  }
];

export const careerCoaches: CareerCoaching[] = [
  {
    id: 'coach-1',
    mentorName: 'Saraswati Putri, MBA',
    mentorTitle: 'Senior HR Specialist / Career Coach CDC',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
    specialties: ['CV & Portfolio Building', 'Career Orientation', 'Communication Strategy'],
    schedule: 'Senin & Rabu, 10:00 - 12:00 WIB'
  },
  {
    id: 'coach-2',
    mentorName: 'Gunawan Saputra, M.Psi',
    mentorTitle: 'Psychologist & Leadership Mentor',
    mentorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
    specialties: ['Job Interview Simulation', 'Psychometric Test Prep', 'Mindset & Confidence'],
    schedule: 'Selasa & Kamis, 13:30 - 15:30 WIB'
  },
  {
    id: 'coach-3',
    mentorName: 'Lina Natalia, M.Kom',
    mentorTitle: 'Tech Career & Startup Advisor',
    mentorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80',
    specialties: ['IT Tech Portfolio Review', 'Technical Test Simulation', 'Startup Industry Advice'],
    schedule: 'Jumat, 09:00 - 11:30 WIB'
  }
];

export const mockCampusHiring: CampusHiringSession[] = [
  {
    id: 'ch-1',
    companyName: 'PT Bank Central Asia Tbk',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    date: '18 Juli 2026',
    time: '09:00 - 12:00 WIB',
    location: 'Aula Fakultas Ekonomi, Lt. 2',
    status: 'Akan Datang'
  },
  {
    id: 'ch-2',
    companyName: 'Astra International',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    date: '25 Juli 2026',
    time: '13:00 - 16:00 WIB',
    location: 'Auditorium Rektorat, Lt. 3',
    status: 'Akan Datang'
  },
  {
    id: 'ch-3',
    companyName: 'PT Pertamina Tbk',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&h=120&q=80',
    date: '05 Juni 2026',
    time: '09:00 - 15:00 WIB',
    location: 'Gedung Pusat Kegiatan Mahasiswa',
    status: 'Selesai'
  }
];

export const careerTips = [
  {
    id: 'tip-1',
    title: 'Bagaimana Cara Membuat CV ATS-Friendly?',
    category: 'Persiapan Dokumen',
    readTime: '4 Menit',
    summary: 'Sistem ATS menyaring ribuan CV otomatis. Pastikan format CV Anda menggunakan font standar, bullet points yang jelas, dan kata kunci yang relevan dengan kriteria lowongan.'
  },
  {
    id: 'tip-2',
    title: 'Menguasai Behavioral Interview Dengan Metode STAR',
    category: 'Tips Wawancara',
    readTime: '6 Menit',
    summary: 'Metode STAR (Situation, Task, Action, Result) memudahkan Anda menyampaikan kontribusi nyata dalam pekerjaan atau organisasi terdahulu dengan struktur logis.'
  },
  {
    id: 'tip-3',
    title: 'Strategi Negosiasi Gaji Pertama Untuk Fresh Graduate',
    category: 'Negosiasi',
    readTime: '5 Menit',
    summary: 'Lakukan riset standar gaji rata-rata industri untuk posisi Anda di kota terkait, tekankan nilai yang bisa Anda berikan kepada perusahaan, dan sampaikan dalam intonasi profesional.'
  }
];
