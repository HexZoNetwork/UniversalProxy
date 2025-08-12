# 🚀 Universal API Proxy by HexZo Not Devz

![HexZo Banner](https://via.placeholder.com/1200x400/007bff/ffffff?text=Universal+API+Proxy+by+HexZo+Not+Devz)

> **"API fleksibel untuk semua kebutuhan - dari pelajar untuk developer"**  
> **Dibuat dengan ❤️ oleh HexZo Not Devz**
## 🎁 API Langsung Jika Malas Deploy/Run
```bash

```
## 📋 Daftar Isi
- [🌟 Tentang](#-tentang)
- [✨ Fitur Unggulan](#-fitur-unggulan)
- [🚀 Cara Menggunakan](#-cara-menggunakan)
- [📡 API Built-in](#-api-built-in)
- [🔧 Instalasi](#-instalasi)
- [💡 Contoh Penggunaan](#-contoh-penggunaan)
- [🛡️ Keamanan](#-keamanan)
- [📞 Kontak](#-kontak)

## 🌟 About

**Universal API Proxy by HexZo Not Devz** adalah solusi proxy API yang dirancang khusus untuk developer Indonesia yang membutuhkan fleksibilitas maksimal dalam mengakses berbagai jenis API tanpa ribet.

Dibuat oleh **HexZo Not Devz**, proxy ini menawarkan:
- ✅ Kompatibilitas universal dengan semua jenis API
- ✅ Error handling yang ramah untuk developer Indonesia
- ✅ Dokumentasi dalam bahasa yang mudah dipahami
- ✅ Support untuk komunitas developer lokal

## ✨ Fitur Unggulan

| Fitur | Deskripsi |
|-------|-----------|
| 🔗 **Universal** | Bekerja dengan REST, GraphQL, SOAP, XML, JSON |
| 🌐 **CORS Enabled** | Full support untuk semua origin |
| ⚡ **Cepat** | Timeout 30 detik dengan retry otomatis |
| 🛡️ **Aman** | Validasi input dan sanitasi otomatis |
| 📊 **Monitoring** | Error tracking yang detail |
| 🎯 **Presisi** | URL validation yang ketat |

## 🚀 Cara Menggunakan

### 1. Instalasi Cepat
```bash
# Clone repository
git clone https://github.com/HexZoNetwork/UniversalProxy.git
cd UniversalProxy

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### 2. Deploy ke Netlify
```bash
# Deploy otomatis
netlify deploy --prod
```

## 📡 API Built-in

### 🔍 Info APIs
```bash
# IP & Geolokasi
GET /.netlify/functions/universal-proxy?api=info.ip
GET /.netlify/functions/universal-proxy?api=info.geoip

# Waktu & Headers
GET /.netlify/functions/universal-proxy?api=info.time
GET /.netlify/functions/universal-proxy?api=info.headers
```

### 😄 Fun APIs
```bash
# Hiburan
GET /.netlify/functions/universal-proxy?api=fun.joke
GET /.netlify/functions/universal-proxy?api=fun.cat_fact
GET /.netlify/functions/universal-proxy?api=fun.meme
```

### 💻 Dev APIs
```bash
# GitHub
GET /.netlify/functions/universal-proxy?api=dev.github_user&username=octocat
GET /.netlify/functions/universal-proxy?api=dev.github_repos&username=octocat

# Testing
GET /.netlify/functions/universal-proxy?api=dev.jsonplaceholder_post
```

### 🌦️ Weather APIs
```bash
# Cuaca
GET /.netlify/functions/universal-proxy?api=weather.current&location=Jakarta
GET /.netlify/functions/universal-proxy?api=weather.forecast&lat=-6.2&lon=106.8
```

## 💡 Contoh Penggunaan

### JavaScript (Browser)
```javascript
// Contoh 1: Mendapatkan IP
fetch('/.netlify/functions/universal-proxy?api=info.ip')
  .then(res => res.json())
  .then(data => console.log('IP Anda:', data.ip));

// Contoh 2: POST request
fetch('/.netlify/functions/universal-proxy?web=https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Post dari HexZo',
    body: 'Hello dari Indonesia!',
    userId: 1
  })
})
.then(res => res.json())
.then(data => console.log('Response:', data));
```

### Python
```python
import requests

# Contoh 1: Mendapatkan joke
response = requests.get('https://your-domain.netlify.app/.netlify/functions/universal-proxy?api=fun.joke')
print(response.json())

# Contoh 2: GitHub user info
response = requests.get('https://your-domain.netlify.app/.netlify/functions/universal-proxy?api=dev.github_user&username=octocat')
print(response.json())
```

### cURL
```bash
# Mendapatkan informasi IP
curl "https://your-domain.netlify.app/.netlify/functions/universal-proxy?api=info.ip"

# POST request dengan data
curl -X POST "https://your-domain.netlify.app/.netlify/functions/universal-proxy?web=https://httpbin.org/post" \
  -H "Content-Type: application/json" \
  -d '{"pesan": "Hello dari Indonesia!"}'
```

## 🔧 Instalasi

### Prasyarat
- Node.js versi 18 atau lebih baru
- Akun Netlify (gratis)

### Langkah-langkah
1. **Fork repository** ini
2. **Connect ke Netlify** melalui GitHub
3. **Deploy otomatis** dengan satu klik
4. **Gunakan API** dengan URL yang dihasilkan

### Environment Variables (Opsional)
```bash
# Untuk konfigurasi lanjutan
NETLIFY_SITE_ID=your-site-id
NETLIFY_AUTH_TOKEN=your-auth-token
```

## 🛡️ Keamanan

### Fitur Keamanan
- ✅ **URL Validation**: Validasi URL otomatis
- ✅ **Input Sanitization**: Sanitasi input otomatis
- ✅ **Header Filtering**: Filter header berbahaya
- ✅ **Timeout Protection**: Proteksi timeout
- ✅ **Rate Limiting**: Batasan rate otomatis

### Best Practices
```javascript
// Selalu validasi input
const url = 'https://api.example.com/data';
if (isValidUrl(url)) {
  // Gunakan proxy
}
```
### 💬 **Komunitas**
- **Telegram**: [t.me/hexzo_not_devz](https://t.me/wynexishere)

### 🆘 **Support**
Untuk pertanyaan atau bantuan:
1. Buka issue di GitHub
2. Bergabung dengan telegram kami
## 🏆 Penghargaan

Dibuat dengan ❤️ oleh **HexZo Not Devz** untuk komunitas developer Indonesia.
---

<div align="center">
  <p>
    <strong>Made with ❤️ by HexZo Not Devz</strong><br>
    <em>"From Indonesia, for the world"</em>
  </p>
  <p>
    <a href="https://github.com/HexZoNetwork/UniversalProxy">⭐ Star di GitHub</a> |
    <a href="https://t.me/wynexishere">🐦 Follow Channel Telegram</a> |
    <a href="https://t.me/hexzo_not_devz">🎭 Support Di Telegramm</a>
  </p>
</div>
