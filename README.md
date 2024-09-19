# Laundry Ledger

## Latar Belakang

Aplikasi **Laundry Ledger** dibuat untuk memudahkan pengguna dalam mengelola wardrobe dan melacak transaksi pesanan laundry. Aplikasi ini berangkat dari permasalahan pribadi developer dimana ketika melakukan pesanan laundry, kerap kali ada pakaian yang hilang atau tertukar. Tujuan utama dari aplikasi ini adalah memberikan sistem pencatatan yang efisien dan terpusat bagi pengguna jasa laundry sehingga dapat memudahkan pelacakan pesanan.

---

## Fitur Utama

- **Akun Pengguna**: Pengguna dapat membuat akun dan masuk ke dalam aplikasi untuk pengelolaan pakaian dan transaksi yang customized.
- **Pencatatan Wardrobe**: Pengguna dapat mencatat pakaian yang dimiliki.
- **Pencatatan Transaksi**: Pengguna dapat mencatat transaksi pesanan laundry.

---

## Tech Stack

- **Backend**: Golang, Gin, Gorm, PostgreSQL
- **Frontend**: React, React Router, TypeScript, Tailwind CSS, Shadcn

---

## Instalasi

**Clone repository** :

   ```bash
   git clone https://github.com/aditydcp/laundry-ledger.git
   ```

### Prasyarat

- **Node.js** (v16 atau lebih baru) dan **npm** (untuk frontend)
- **Go** (v1.18 atau lebih baru) (untuk backend)
- **PostgreSQL** (untuk database)

### Instalasi Backend

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```

2. Setup environment variables dengan membuat file `.env` dan mengisi variabel yang sesuai. Berikut adalah list variabel yang harus diisi:
    - DB_HOST=
    - DB_PORT=
    - DB_USER=
    - DB_PASSWORD=
    - DB_NAME=
    - JWT_SECRET=

3. Install dependensi:
   ```bash
   go mod download
   ```

   atau

   ```
   go mod tidy
   ```

4. Jalankan server backend:
    ```bash
    go run main.go
    ```

    Server akan berjalan di `http://localhost:8080`

    *Catatan: Jalankan server backend pada window terminal yang terpisah dari frontend*

### Instalasi Frontend

1. Masuk ke direktori frontend:
   Jika Anda berada di direktori root, Anda dapat menjalankan perintah berikut:
   ```bash
   cd frontend
   ```
   
   Jika Anda berada di direktori `backend`, Anda dapat menjalankan perintah berikut:
   ```bash
   cd ../frontend
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173` atau sesuai dengan yang tertulis di terminal sebagai alamat Local.
   Kunjungi alamat tersebut untuk mengakses aplikasi.

   *Catatan: Jalankan frontend pada window terminal yang terpisah dari server backend*

---

## Daftar API Endpoints

| Method | Endpoint   | Deskripsi                                   | Data yang Diterima          | Data yang Dikirim   |
|--------|------------|---------------------------------------------|-----------------------------|---------------------|
| `POST` | `/signup`  | Mendaftarkan pengguna baru                  | `{ "email": "string", "name": "string", "password": "string" }` | `{ "message": "User created successfully" }` |
| `POST` | `/login`   | Login ke sistem dan menerima token JWT       | `{ "email": "string", "password": "string" }`                    | `{ "message": "Login successful", "token": "JWT" }` |
| `GET`  | `/user`    | Mendapatkan informasi pengguna yang login    | Token JWT (dalam header `Authorization`) | `{ "email": "string", "name": "string" }` |

---

## Struktur Database

### Tabel `users`

| Kolom     | Tipe Data | Deskripsi         |
|-----------|-----------|-------------------|
| `id`      | `UUID`    | Primary key       |
| `email`   | `VARCHAR` | Email pengguna    |
| `name`    | `VARCHAR` | Nama pengguna     |
| `password`| `VARCHAR` | Password (hashed) |

---

## Screenshot Aplikasi Frontend

1. **Halaman Login**

   ![Screenshot Login](/screenshots/login.png)
   Halaman ini digunakan untuk login ke dalam aplikasi dengan menggunakan email dan password.

2. **Halaman Signup**

   ![Screenshot Signup](/screenshots/signup.png)  
   Pengguna baru bisa mendaftarkan akun mereka di halaman ini.

---

## Flow Interaksi Frontend dengan Backend

1. **Signup Flow**:
   - Pengguna memasukkan data (email, nama, dan password) di frontend.
   - Frontend mengirimkan data ini ke endpoint `/signup` pada backend.
   - Backend membuat akun baru dan mengirimkan pesan sukses ke frontend.

2. **Login Flow**:
   - Pengguna memasukkan email dan password pada halaman login.
   - Frontend mengirimkan data login ke endpoint `/login`.
   - Backend memverifikasi data dan mengirimkan token JWT ke frontend.
   - Frontend menyimpan token JWT dan menggunakannya untuk akses endpoint lain yang membutuhkan autentikasi.

---