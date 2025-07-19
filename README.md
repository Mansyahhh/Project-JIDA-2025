# SekolahKu – Aplikasi Manajemen Data Siswa

Aplikasi CRUD sederhana berbasis Next.js yang digunakan untuk mengelola data siswa, lengkap dengan fitur autentikasi dan penyimpanan ke database nyata (Neon PostgreSQL).

## ✨ Fitur Utama

- 🔐 Login untuk Admin dan Siswa
- 📋 CRUD Data Siswa (Create, Read, Update, Delete)
- ✅ Validasi form dengan Zod + React Hook Form
- 🧠 Struktur modular seperti dunia kerja nyata
- 🧾 Penyimpanan data real ke Neon PostgreSQL (via Prisma)

## 🛠️ Teknologi

- Next.js (App Router)
- Prisma ORM
- PostgreSQL (Neon DB)
- React Hook Form + Zod
- Tailwind CSS + Shadcn UI
- Deployed on Vercel

## 📦 Cara Menjalankan Project

```bash
git clone https://github.com/namamu/sekolahku.git
cd sekolahku

npm install

# Tambahkan file .env
cp .env.example .env

# Jalankan Prisma migration
npx prisma migrate dev

# Jalankan aplikasi
npm run dev
```
