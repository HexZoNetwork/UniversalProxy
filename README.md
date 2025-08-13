
-----


# 🚀 Universal API Proxy — by HexZo Beginner

<p align="center">
  <img src="https://picsur.org/i/1e0dc10e-6026-49fb-ab19-54933e5e827b.png" alt="Universal API Proxy Logo" width="150"/>
</p>

<p align="center">
  <strong>Solusi instan untuk masalah CORS dan akses API yang ribet, dibuat oleh sesama pembelajar.</strong>
  <br />
  <em>"Dari pelajar, untuk developer."</em>
</p>

<p align="center">
  <a href="https://github.com/HexZoNetwork/UniversalProxy/stargazers"><img src="https://img.shields.io/github/stars/HexZoNetwork/UniversalProxy?style=for-the-badge&logo=github&color=gold" alt="GitHub Stars"></a>
  <a href="https://github.com/HexZoNetwork/UniversalProxy/issues"><img src="https://img.shields.io/github/issues/HexZoNetwork/UniversalProxy?style=for-the-badge&logo=github&color=red" alt="GitHub Issues"></a>
  <a href="https://t.me/hexzo_not_devz"><img src="https://img.shields.io/badge/Komunitas-Telegram-blue?style=for-the-badge&logo=telegram" alt="Telegram Community"></a>
</p>

---

## 🌟 Kenapa Pakai Proxy Ini?

Gue bikin ini karena sering banget (dan mungkin Anda juga) mentok sama masalah-masalah ini:
* **Benci Error CORS:** Capek lihat error `Cross-Origin Resource Sharing` di console? Proxy ini solusinya.
* **Males Setup Backend:** Butuh data dari API publik tapi males bikin server sendiri cuma buat `fetch`? Pakai ini aja.
* **Eksplorasi & Belajar:** Cocok banget buat yang lagi belajar ngoding dan mau coba-coba berbagai macam API tanpa ribet.
* **Prototipe Cepat:** Butuh bukti konsep atau mau bikin demo cepat? Langsung hajar!

## ⚡ API Siap Pakai (Live Demo)

Gak perlu instalasi. Langsung pakai endpoint publik di bawah ini untuk semua kebutuhan Anda.

```

[https://proxyhexzo.netlify.app/.netlify/functions/proxy](https://proxyhexzo.netlify.app/.netlify/functions/proxy)

````
**Contoh Cepat:**
```bash
# Mendapatkan fakta kucing acak
curl "[https://proxyhexzo.netlify.app/.netlify/functions/proxy?api=fun.cat_fact](https://proxyhexzo.netlify.app/.netlify/functions/proxy?api=fun.cat_fact)"
````

## ✨ Fitur Unggulan

| Fitur | Deskripsi |
|:--- |:--- |
| 🔗 **Fleksibel** | Bisa meneruskan request ke mayoritas API publik (REST, JSON, XML). |
| 🌐 **Anti-CORS** | Didesain khusus untuk jadi "obat" masalah CORS dari origin mana pun. |
| 🚀 **Cukup Cepat**| Dijalankan di infrastruktur Netlify yang cepat dengan logic *retry* otomatis. |
| 🛡️ **Validasi Dasar** | Memvalidasi URL tujuan untuk mencegah pemanggilan ke endpoint yang tidak aman. |
| 👨‍💻 **Ramah Pemula** | Gampang dipakai, dokumentasi jelas, dan ada API bawaan yang seru. |

-----

## 🚀 Cara Penggunaan

Ada dua cara utama: pakai **API bawaan** atau **proxy ke URL custom**.

### 1\. Menggunakan API Bawaan

Pakai parameter `?api=` diikuti nama API yang tersedia.

```javascript
// Mendapatkan info IP publik
fetch('[https://proxyhexzo.netlify.app/.netlify/functions/proxy?api=info.ip](https://proxyhexzo.netlify.app/.netlify/functions/proxy?api=info.ip)')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 2\. Proxy ke URL Kustom

Pakai parameter `?web=` untuk meneruskan request ke URL mana pun.

```javascript
// Melakukan POST request ke API testing
fetch('[https://proxyhexzo.netlify.app/.netlify/functions/proxy?web=https://jsonplaceholder.typicode.com/posts](https://proxyhexzo.netlify.app/.netlify/functions/proxy?web=https://jsonplaceholder.typicode.com/posts)', {
  method: 'POST',
  body: JSON.stringify({ title: 'Coba POST' })
})
.then(res => res.json())
.then(data => console.log(data));
```

-----

## 🔧 Instalasi (Self-Hosting)

Kalau Anda mau proxy ini berjalan di akun Netlify pribadi.

**Prasyarat:**

  * Node.js v18+
  * Akun GitHub & Netlify (yang gratisan cukup)

**Langkah-langkah:**

1.  **Fork** repository ini.
2.  Di dashboard Netlify, impor proyek dari repository yang baru Anda fork.
3.  **(PENTING)** Atur **Environment Variables** berikut di `Site settings > Build & deploy > Environment` jika mau pakai notifikasi Telegram:
      * `TELEGRAM_BOT_TOKEN`: Token bot Telegram Anda.
      * `TELEGRAM_CHAT_ID`: ID chat tujuan notifikasi.
4.  Klik **"Deploy site"**. Selesai\! Anda punya URL proxy pribadi.

-----

## 🛡️ Keamanan & Batasan (Harap Dibaca\!)

Proyek ini dibuat untuk belajar dan development. Penting untuk tahu batasannya.

| Fitur | Status | Catatan |
|:--- |:---:|:--- |
| **URL Validation** | ✅ | Hanya URL `http` & `https` valid yang diproses. |
| **Header Filtering** | ✅ | Beberapa header dari klien disaring untuk keamanan dasar. |
| **Timeout Protection**| ✅ | Fungsi akan timeout sesuai batas Netlify (sekitar 10 detik). |
| **Rate Limiting** | ❌ | **BELUM ADA.** Jangan gunakan untuk aplikasi production yang penting. |

### 🚨 **Peringatan Keras**

Proxy publik yang disediakan **TIDAK MEMILIKI RATE LIMIT**. Artinya, siapa saja bisa memakainya sepuasnya. Gunakan dengan bijak untuk belajar dan prototipe. **Penyalahgunaan akan membuat IP Anda diblokir.**

-----

## 📚 Referensi & Contoh Lengkap

\<details\>
\<summary\>\<strong\>📂 Klik untuk melihat daftar lengkap API Bawaan\</strong\>\</summary\>

### 🔍 Info

  - **IP Address:** `?api=info.ip`
  - **Geo Location:** `?api=info.geoip`
  - **Time:** `?api=info.time`
  - **Request Headers:** `?api=info.headers`

### 😄 Fun

  - **Joke:** `?api=fun.joke`
  - **Cat Fact:** `?api=fun.cat_fact`
  - **Dog Image:** `?api=fun.dog_image`
  - **Meme:** `?api=fun.meme`

### 💻 Dev

  - **GitHub User:** `?api=dev.github_user&username={nama_user}`
  - **GitHub Repos:** `?api=dev.github_repos&username={nama_user}`
  - **JSONPlaceholder Post:** `?api=dev.jsonplaceholder_post&id={post_id}`
  - **HTTPBin Test:** `?api=dev.httpbin`

### 🌦️ Cuaca

  - **Current Weather:** `?api=weather.current&location={kota}`
  - **Forecast:** `?api=weather.forecast&lat={latitude}&lon={longitude}`

\</details\>

\<details\>
\<summary\>\<strong\>💻 Klik untuk melihat Contoh Kode Lengkap (JS, Python, cURL)\</strong\>\</summary\>

### JavaScript (Browser)

```javascript
const API_BASE = '[https://proxyhexzo.netlify.app/.netlify/functions/proxy](https://proxyhexzo.netlify.app/.netlify/functions/proxy)';

// GET GitHub user info
fetch(`${API_BASE}?api=dev.github_user&username=octocat`)
  .then(res => res.json())
  .then(data => console.log('Nama User GitHub:', data.name));
```

### Python

```python
import requests

API_BASE = "[https://proxyhexzo.netlify.app/.netlify/functions/proxy](https://proxyhexzo.netlify.app/.netlify/functions/proxy)"

# GET cuaca di Jakarta
params = {"api": "weather.current", "location": "Jakarta"}
response = requests.get(API_BASE, params=params)

if response.ok:
    print(response.json())
else:
    print("Gagal mengambil data cuaca")
```

### cURL

```bash
# POST request via proxy
curl -X POST "[https://proxyhexzo.netlify.app/.netlify/functions/proxy?web=https://httpbin.org/post](https://proxyhexzo.netlify.app/.netlify/functions/proxy?web=https://httpbin.org/post)" \
  -H "Content-Type: application/json" \
  -d '{"pesan": "Hello dari cURL"}'
```

\</details\>

-----

## 💬 Kontak & Komunitas

Punya ide, nemu bug, atau sekadar mau ngobrol?

  * **Buka Issue di GitHub:** [Klik di sini](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/HexZoNetwork/UniversalProxy/issues)
  * **Gabung Grup Telegram:** [Klik di sini](https://t.me/hexzo_not_devz)

\<div align="center"\>
\<p\>\<strong\>Dibuat dengan ❤️ oleh HexZo Beginner\</strong\>\</p\>
\<em\>"Dari Indonesia untuk semua yang butuh API proxy"\</em\>
\</div\>

```
```
