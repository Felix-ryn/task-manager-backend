# 📋 Simple Personal Task Manager API

## 📖 Deskripsi Project

Simple Personal Task Manager API adalah sebuah RESTful API yang digunakan untuk mengelola tugas pribadi (personal task management).  
API ini memungkinkan pengguna untuk membuat, melihat, memperbarui, dan menghapus task, serta mengelompokkan task menggunakan **tags** agar lebih terorganisir.

Project ini dibuat sebagai bagian dari **Backend Take Home Challenge**, dengan fokus pada desain REST API, struktur data, dan implementasi backend yang bersih serta mudah dikembangkan.

---

## ✨ Fitur yang Diimplementasikan

### ✅ Fitur Wajib (CRUD)
- **Create Task** – Membuat task baru
- **Read Task** – Melihat daftar task & detail task
- **Update Task** – Mengubah data task
- **Delete Task** – Menghapus task (soft delete)

### ⭐ Fitur Tambahan
- **Tagging Task** (Many-to-Many Relationship)
- **Filter & Search Task**
  - Filter berdasarkan status
  - Filter berdasarkan tag
  - Search berdasarkan title & description
- **Pagination**
- **Soft Delete** menggunakan Sequelize `paranoid`

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express.js** – REST API framework

### Database
- **PostgreSQL** – Relational Database
- **Sequelize ORM** – Object Relational Mapping

### Library & Tools Lainnya
- `dotenv` – Environment variable management
- `pg` & `pg-hstore` – PostgreSQL driver
- `nodemon` – Development auto-reload
- `sequelize` – ORM & database abstraction

---

## 🗂️ Struktur Database (Ringkas)

### Tabel `tasks`
- `id` (UUID, Primary Key)
- `title`
- `description`
- `status` (`todo`, `in_progress`, `done`)
- `priority`
- `due_date`
- `created_at`
- `updated_at`
- `deleted_at` (soft delete)

### Tabel `tags`
- `id` (UUID)
- `name` (unique)

### Tabel `task_tags`
- `task_id`
- `tag_id`

Relasi: **Many-to-Many** antara `tasks` dan `tags`

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone <repo-url>
cd task-manager
```
### 2️⃣ Install Dependencies
``` bash
npm install
```
### 3️⃣ Setup Environment Variables

Salin file .env.example menjadi .env:
``` bash
cp .env.example .env
```
Kemudian edit file .env sesuai dengan konfigurasi PostgreSQL lokal kamu.

### 4️⃣ Setup Database

Pastikan PostgreSQL sudah berjalan, lalu buat database secara manual:
``` bash
CREATE DATABASE task_manager;
```
Project ini menggunakan Sequelize sync, sehingga tabel akan dibuat otomatis saat server dijalankan pertama kali.

### 5️⃣ Menjalankan Aplikasi
``` bash
npm run dev
```
Jika berhasil, server akan berjalan di:
``` bash
http://localhost:4000
```
### 🔗 Endpoint API

## 📌 Task

| Method | Endpoint        | Deskripsi              |
|-------:|-----------------|------------------------|
| POST   | `/tasks`        | Membuat task baru      |
| GET    | `/tasks`        | Mengambil semua task   |
| GET    | `/tasks/:id`    | Mengambil detail task  |
| PUT    | `/tasks/:id`    | Mengubah task          |
| DELETE | `/tasks/:id`    | Menghapus task (soft delete) |

## 🏷️ Tag

| Method | Endpoint              | Deskripsi                  |
|-------:|-----------------------|----------------------------|
| POST   | `/tasks/:id/tags`     | Menambahkan tag ke task    |
### 🧪 Contoh Request
Create Task
``` bash
{
  "title": "Belajar Express",
  "description": "Membuat REST API dengan Sequelize",
  "priority": 2,
  "status": "todo",
  "tags": ["backend", "study"],
  "due_date": "2026-03-10T10:00:00Z"
}
```
Add Tags to Task
``` bash
{
  "tags": ["frontend", "meeting"]
}
```
### 📁 File .env.example

Buat file .env.example di root project:
``` bash
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=your_username
DB_PASSWORD=your_password
```
