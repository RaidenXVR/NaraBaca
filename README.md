# NaraBaca
NaraBaca adalah aplikasi belajar membaca untuk anak-anak dengan menggunakan teknologi Audio Classification. Repositori ini berisi aplikasi berbasis web NaraBaca menggunakan git subtree.

## Tim Pengembang
- Fitran Alfian Nizar - (ML) 
- Mohamed - (ML)
- Marvi Yoga Pratama - (ML)
- Muhamad Fikri Zaelani - (FEBE)
- Muhammad Farhan Tarigan - (FEBE)
- Tiara Azzahra - (FEBE)

## Fitur
- Aplikasi mendeteksi suara anak saat membaca dan memberikan umpan balik secara langsung.
- Menghadirkan permainan edukatif berbasis bacaan yang disusun dalam tantangan berwaktu.
- Leaderboard dan sistem skor.
- Akses yang mudah melalui Browser.

## Dataset
- [Mozilla Common Voice](https://commonvoice.mozilla.org/id/datasets)
- [INDSpeech04](https://github.com/s-sakti/data_indsp_teldialog_lvcsr)

## Struktur Projek
```
NaraBaca/
├── README.md
├── backend/
│   ├── express-backend/
│   │   ├── .gitignore
│   │   ├── app.js
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── words.txt
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   │       └── leaderboardRouter.js
│   └── ml-backend/
│       ├── .dockerignore
│       ├── .gitignore
│       ├── .python-version
│       ├── dockerfile
│       ├── main.py
│       ├── model_utils.py
│       ├── requirements.txt
│       ├── voice_classifier_finetuned_v1.keras
│       └── words.txt
├── frontend/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/
│   │   ├── book_bg1.svg
│   │   ├── book_bg2.svg
│   │   ├── book_bg3.svg
│   │   ├── book_bg4.svg
│   │   └── ...
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── assets/
│       │   └── ... (file aset gambar, audio, dsb)
│       └── components/
│           ├── Header.jsx
│           ├── MainMenu.jsx
│           ├── Footer.jsx
│           ├── GameCard.jsx
│           ├── EntryPoint.jsx
│           ├── Practice.jsx
│           ├── PracticeWrapper.jsx
│           ├── TestPage.jsx
│           ├── TestPageWrapper.jsx
│           ├── ResultPage.jsx
│           ├── ResultPageTest.jsx
│           ├── LeaderboardPage.jsx
│           ├── AboutPage.jsx
│           ├── RandomStar.jsx
│           ├── RandomCircle.jsx
│           └── ... (komponen lain)
│       └── styles/
│           ├── history-page.css
│           └── ... (file CSS lain)
```

# Instalasi dan Tes Lokal
## Instalasi Machine Learning Backend
- Pastikan anda sudah punya python dengan versi diantara 3.8 sampai 3.12.
- Pindah ke direktori `./backend/ml-backend`.
- Buat virtual environment dengan perintah:
```bash
python -m venv .venv
```
- Aktifkan virtual environment dengan perintah:
```bash
./.venv/scripts/activate
```
- install dependecies dengan perintah:
```bash
pip install -r requirements.txt
```

## Menjalankan Machine Learning Backend secara lokal
- Pastikan anda sudah melakukan proses instalasi dan berada di direktori `./backend/ml-backend`.
- Copy audio untuk test ke dalam working directory.
- Buka file `local_main.py` dan ubah variabel `AUDIO_PATH` dan `AUDIO_FILENAME` sesuai dengan path dan nama file audio.
- Jalankan file local_main.py
- Pastikan file `test_input.json` telah berubah.
- Jalankan file `rp_handler.py` dan tunggu sampai selesai.
- Hasil inferensi ada pada terminal dengan format pada `Job result`:
```python
{'output':{'predicted_keywords': [KATA_KATA_PREDIKSI, '']}}
```

## Instalasi Backend Express.js
- Pastikan anda sudah menginstall Node.js.
- Pindah ke direktori `./backend/express-backend`
- Gunakan perintah `npm install` untuk menginstall dependensi.

## Menjalankan Backend Express.js
- Pastikan anda sudah pada direktori `./backend/express-backend`.
- Gunakan perintah `npm start` untuk memulai server.

## Instalasi Frontend
- Pastikan anda sudah menginstall Node.js.
- Pindah ke direktori `./frontend`
- Gunakan perintah `npm install` untuk menginstall dependensi.

## Menjalankan Frontend
- Pastikan anda sudah pada direktori `./frontend`.
- Gunakan perintah `npm run dev` untuk memulai server.