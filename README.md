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

### Setup Database

1. Apabila Anda belum memiliki PostgreSQL, Anda dapat menginstalnya pada mesin lokal Anda melalui [PostgreSQL Download](https://www.postgresql.org/download/).

2. Buat database kosong terlebih dahulu sebagai wadah untuk data aplikasi ini. Cukup membuat database baru dan kosong, karena aplikasi akan membuat tabel-tabel secara otomatis melalui migrasi. Untuk membuat database, dapat dilakukan dengan menggunakan CLI PostgreSQL, atau dengan aplikasi pendukung tambahan seperti [DBeaver](https://dbeaver.io/download/) atau [PgAdmin](https://www.pgadmin.org/download/).

*Note: Catat beberapa kredensial penting seperti username database, passwordnya, dan nama database karena akan digunakan pada aplikasi backend*

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

    *Note: JWT secret dapat diisi secara bebas*

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

[API Documentations](https://documenter.getpostman.com/view/17672653/2sAXqtc279)

| Method | Endpoint              | Deskripsi                                             | Data yang Diterima                                 | Data yang Dikirim   |
|--------|-----------------------|-------------------------------------------------------|---------------------------------------------------|---------------------|
| `POST` | `/signup`             | Mendaftarkan pengguna baru                            | `{ "email": "string", "name": "string", "password": "string" }` | `{ "message": "User created successfully" }` |
| `POST` | `/login`              | Login ke sistem dan menerima token JWT                | `{ "email": "string", "password": "string" }`                    | `{ "message": "Login successful", "token": "JWT" }` |
| `GET`  | `/user`               | Mendapatkan informasi pengguna yang login             | Token JWT (dalam header `Authorization`)          | `{ "email": "string", "name": "string" }` |
| `GET`  | `/api/clothings`      | Mendapatkan semua pakaian yang ada di wardrobe        | Token JWT (dalam header `Authorization`)          | List of clothing items |
| `POST` | `/api/orders`         | Membuat pesanan laundry baru                          | `{ "name": "string", "items": "array of clothing ids"}` | Created order |
| `PUT`  | `/api/orders/:id`     | Mengupdate informasi pesanan                          | `{ "is_complete": "boolean" }`                   | Updated order |
| `GET`  | `/api/orders/:id/details` | Mendapatkan semua detail pesanan berdasarkan `order_id` | Token JWT (dalam header `Authorization`)          | List of order details |

---

## Struktur Database

### Tabel `users`

| Kolom      | Tipe Data | Deskripsi         |
|------------|-----------|-------------------|
| `id`       | `UUID`    | Primary key       |
| `email`    | `VARCHAR` | Email pengguna    |
| `name`     | `VARCHAR` | Nama pengguna     |
| `password` | `VARCHAR` | Password          |

### Tabel `orders`

| Kolom      | Tipe Data | Deskripsi         |
|------------|-----------|-------------------|
| `id`       | `UUID`    | Primary key       |
| `name`     | `VARCHAR` | Nama Laundromart  |
| `is_complete` | `BOOLEAN` | Status pesanan |

### Tabel `order_details`

| Kolom         | Tipe Data | Deskripsi         |
|---------------|-----------|-------------------|
| `id`          | `UUID`    | Primary key       |
| `order_id`    | `UUID`    | Foreign key ke tabel orders |
| `clothing_id` | `UUID`    | Foreign key ke tabel clothings |

---

## Screenshot Aplikasi Frontend

1. **Halaman Login**

   ![Screenshot Login](/screenshots/login.png)
   Halaman ini digunakan untuk login ke dalam aplikasi dengan menggunakan email dan password.

2. **Halaman Signup**

   ![Screenshot Signup](/screenshots/signup.png)  
   Pengguna baru bisa mendaftarkan akun mereka di halaman ini.

3. **Halaman Wardrobe**

   ![Screenshot Wardrobe](/screenshots/wardrobe.png)  
   Pengguna dapat mengelola pakaiannya di sini.

4. **Halaman Washlist**

   ![Screenshot Washlist](/screenshots/washlist.png)  
   Pengguna dapat mengelola pesanan laundry-nya di sini.

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

3. **Wardrobe Fetch Flow**:
   - Pengguna dapat melihat semua pakaian di wardrobe setelah login.
   - Frontend melakukan request GET ke endpoint `/api/clothings` dan mengirim token JWT dalam header `Authorization`.
   - Backend merespons dengan daftar pakaian di wardrobe.
   - Flow ini juga digunakan dapat Edit/Add Order, dimana pengguna memilih pakaian yang akan dimasukkan ke dalam order.

4. **Order and Order Detail Flow**:
   - Untuk membuat pesanan laundry, pengguna mengisi nama laundromart dan memilih pakaian dari wardrobe.
   - Frontend mengirim request POST ke endpoint `/api/orders` untuk membuat pesanan.
   - Setelah pesanan dibuat, frontend mengirim POST requests untuk menambahkan `OrderDetail` berdasarkan pakaian yang dipilih.
   - Untuk Edit Order, update akan dilakukan pada `Orders`, kemudian dicari semua `OrderDetail` yang bersangkutan dengan `Order` tersebut. Update akan dilakukan pada baris `OrderDetail` yang valid, kemudian menambahkan baris baru secukupnya, dan/atau menghapus baris yang sudah tidak digunakan lagi.

---
