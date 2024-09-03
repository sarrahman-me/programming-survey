# Survey Bahasa Pemrograman Favorit

## Deskripsi singkat

Akhir-akhir ini, banyak YouTuber dan influencer di dunia coding yang berbagi pendapat tentang bahasa pemrograman yang mereka kurang sukai. Untuk itu, saya membuat proyek sederhana ini untuk mengetahui mana bahasa pemrograman yang paling banyak disukai dan mana yang paling jarang diminati.

Perlu diingat, hasil survei ini bukan berarti bahasa yang kurang populer itu buruk. Mungkin saja di Indonesia, bahasa tersebut belum banyak digunakan atau dikenal.

## Algoritma

saya menyadari bahwa banyak programmer memiliki lebih dari satu bahasa pemrograman favorit. Jika saya hanya meminta mereka untuk memilih satu bahasa, hasilnya mungkin bias dan tidak sepenuhnya mencerminkan preferensi mereka.

**Untuk mengatasi hal ini, saya menggunakan pendekatan perbandingan langsung:**

1. **Proses Perbandingan:** Alih-alih meminta pengguna memilih satu bahasa favorit, saya meminta mereka untuk membandingkan setiap bahasa dengan bahasa yang mereka sukai. Dengan cara ini, saya memperoleh preferensi relatif di antara bahasa-bahasa yang mereka sukai.

2. **Pemberian Poin:** Setiap kali dua bahasa dibandingkan, masing-masing mendapatkan poin. Bahasa yang memenangkan perbandingan memperoleh 1 poin kemenangan, sedangkan bahasa yang kalah mendapatkan 1 poin kekalahan.

3. **Hasil Akhir:** Dengan mengulangi proses ini untuk berbagai pasangan bahasa, saya dapat menentukan bahasa mana yang paling sering menang dalam perbandingan. Ini membantu saya untuk memahami bahasa mana yang benar-benar paling disukai oleh programmer dari semua bahasa yang mereka pilih.

**Visualisasi Proses:**

- **Langkah 1:** Programmer membandingkan dua bahasa, misalnya Python vs. JavaScript.
- **Langkah 2:** Jika Python menang, Python mendapatkan 1 poin kemenangan dan JavaScript mendapatkan 1 poin kekalahan.
- **Langkah 3:** Proses ini diulang untuk berbagai pasangan bahasa.
- **Hasil Akhir:** Bahasa dengan poin kemenangan terbanyak dianggap sebagai bahasa yang paling disukai.

Dengan pendekatan ini, saya dapat menghasilkan hasil yang lebih akurat dan mencerminkan preferensi nyata para programmer, bukan hanya pilihan favorit tunggal.

## Tech Stack 

### Frontend

- Programming language: Typescript
- Framework: Nextjs
- UI Library: Tailwindcss
- Host: AWS Amplify

### Backend

- Programming language: Python
- Framework: -
- Database: Supabase
- Server: AWS Lambda & AWS Api Gateway

## Masalah Performa

Saya menyadari bahwa aplikasi ini terkadang lambat dan waktu responsnya tidak stabil. Saat ini, saya menggunakan AWS Lambda, di mana kode saya dijalankan berdasarkan fungsi yang dipanggil.

AWS Lambda memungkinkan saya menghemat biaya server karena saya hanya membayar untuk fungsi yang dijalankan. Namun, ini berdampak pada performa, menyebabkan waktu respons yang tidak selalu stabil.

AWS Lambda memiliki konsep "cold start", di mana ada jeda waktu saat fungsi pertama kali dipanggil. Jeda ini akan berkurang pada pemanggilan fungsi berikutnya, tetapi tetap bisa menyebabkan ketidakstabilan.

Alternatifnya, saya bisa menggunakan server EC2 atau sejenisnya agar server selalu siap. Namun, karena proyek ini hanya untuk bersenang-senang, saya tidak ingin mengeluarkan biaya besar untuk itu. Hehe.

## Entity Relationship Diagram

![Entity Relationship Diagram](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-09-03%20at%2023.16.25.png?updatedAt=1725380209839)

## Infrastruktur

![Infrastruktur](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-09-04%20at%2000.12.33.png?updatedAt=1725383567171)

## Aplikasi

URL aplikasi : https://main.dns66h5rapcke.amplifyapp.com

## Screen Shot Tampilan Aplikasi

![HomePage](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-09-04%20at%2000.17.29.png?updatedAt=1725383867672)

![Winner](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-09-04%20at%2000.19.26.png?updatedAt=1725383982360)

![Statistic](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-09-04%20at%2000.20.32.png?updatedAt=1725384090015)

