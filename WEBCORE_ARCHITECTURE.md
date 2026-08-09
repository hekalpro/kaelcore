# WEBCORE — Architecture & Development Specification

Version: 1.0
Status: Approved Foundation
Architecture: Vanilla HTML / CSS / JavaScript ES Modules
Deployment: GitHub Pages

---

# 1. PROJECT VISION

Webcore adalah sebuah pengalaman web interaktif yang terinspirasi dari desktop komputer dan estetika webcore/retro computing.

Tujuan utamanya bukan sekadar membuat website yang terlihat seperti Windows lama.

Tujuan Webcore adalah membuat pengunjung merasa seperti sedang memasuki sebuah komputer lama yang benar-benar dapat digunakan.

Pengalaman utama:

Landing Page
    ↓
PLAY
    ↓
Webcore Desktop
    ↓
Interaksi dengan aplikasi dan sistem
    ↓
SHUTDOWN
    ↓
Kembali ke Landing Page

Prinsip utama:

> Setiap elemen yang terlihat seperti bagian dari sistem harus memiliki perilaku yang nyata dan masuk akal.

Contoh:
- tombol minimize benar-benar meminimalkan window
- taskbar benar-benar menampilkan aplikasi aktif
- close benar-benar menutup window
- clock benar-benar berjalan
- theme benar-benar berubah
- setting yang dipilih dapat dipertahankan

---

# 2. PROJECT CHARACTER

Webcore harus memiliki karakter:

- retro
- nostalgic
- sedikit misterius
- nostalgic computing
- webcore
- imperfect tetapi intentional
- alive
- interactive
- desktop-oriented

Visual tidak boleh terasa seperti dashboard SaaS modern.

Hindari:
- modern card-heavy UI
- terlalu banyak rounded corners
- desain minimalis modern
- gradient modern yang berlebihan
- framework-style UI

Referensi rasa:
- komputer desktop lama
- Windows era klasik
- CRT monitor
- old web
- pixel/terminal aesthetic
- glitch
- scanline
- chrome/bevel UI

Namun Webcore bukan clone literal dari sistem operasi tertentu.

Ia mengambil inspirasi nostalgia tanpa menjadi salinan identitas visual produk tertentu.

---

# 3. TECHNOLOGY

Gunakan:

- HTML5
- CSS3
- Vanilla JavaScript
- ES Modules

Tidak menggunakan framework frontend.

Tidak menggunakan:
- React
- Vue
- Angular
- Svelte
- Bootstrap
- Tailwind
- jQuery

Tidak menggunakan build system atau dependency npm kecuali suatu saat memang diperlukan dan disetujui.

Project harus tetap dapat dijalankan sebagai static website.

---

# 4. DEPLOYMENT

Target deployment:

GitHub Pages.

Karena itu project harus tetap kompatibel dengan static hosting.

Tidak bergantung pada:
- backend
- database
- server-side rendering
- server API

Semua fungsi versi awal harus dapat bekerja sepenuhnya di browser.

---

# 5. CURRENT FOUNDATION

Project sudah memiliki:

- `index.html`
- `README.md`
- desain desktop mockup yang telah disetujui
- stylesheet dasar
- JavaScript entry point

`index.html` yang sudah ada adalah baseline visual.

Jangan mengganti baseline tersebut tanpa alasan teknis yang kuat.

Mockup yang sudah disetujui dianggap sebagai visual source of truth.

---

# 6. TARGET PROJECT STRUCTURE

Struktur target:

/
├── index.html
├── README.md
│
└── assets/
    │
    ├── css/
    │   └── style.css
    │
    ├── js/
    │   ├── app.js
    │   │
    │   ├── core/
    │   │   ├── WindowManager.js
    │   │   ├── DesktopManager.js
    │   │   └── StateManager.js
    │   │
    │   ├── system/
    │   │   ├── ThemeManager.js
    │   │   ├── WallpaperManager.js
    │   │   ├── Clock.js
    │   │   └── Calendar.js
    │   │
    │   ├── apps/
    │   │   ├── AboutMe.js
    │   │   ├── Media.js
    │   │   └── Music.js
    │   │
    │   └── effects/
    │       ├── CRT.js
    │       ├── Glitch.js
    │       └── Transitions.js
    │
    ├── images/
    ├── wallpapers/
    ├── videos/
    └── music/

Catatan:

Struktur di atas adalah target architecture.

JANGAN membuat seluruh file tersebut sekaligus.

File dibuat hanya ketika fase implementasinya membutuhkan file tersebut.

Hindari premature abstraction.

---

# 7. ARCHITECTURE LAYERS

Webcore dibagi menjadi beberapa tanggung jawab.

## Core

Berisi mekanisme utama desktop.

### WindowManager

Mengatur:
- open
- close
- minimize
- maximize
- restore
- focus
- z-index
- drag
- window state

WindowManager tidak boleh mengandung logic khusus aplikasi.

---

### DesktopManager

Mengatur:
- desktop icons
- selection
- click/double click
- membuka aplikasi
- interaksi desktop

DesktopManager tidak boleh mengandung logic internal aplikasi.

---

### StateManager

Mengatur state global yang perlu dipertahankan.

Contoh:
- theme
- wallpaper preference
- UI preferences

Persistence menggunakan browser storage jika diperlukan.

---

# 8. SYSTEM LAYER

System berisi fitur yang dianggap bagian dari Webcore OS.

## ThemeManager

Versi awal hanya:

- Light
- Dark

Theme harus persistent.

Jika user memilih Dark:

browser ditutup
↓
website dibuka kembali
↓
Dark tetap aktif

Gunakan `localStorage` atau mekanisme browser storage yang sesuai.

---

## WallpaperManager

Wallpaper merupakan bagian dari visual system.

Wallpaper default ditentukan oleh pemilik project.

Public user tidak boleh memiliki mekanisme untuk mengubah atau meng-upload wallpaper ke repository.

Wallpaper yang tersedia berasal dari local assets.

Pemilik project dapat mengganti wallpaper dengan mengubah asset/configuration di repository.

Jika suatu saat public wallpaper selection ditambahkan, pilihan hanya boleh berasal dari wallpaper yang sudah disediakan oleh owner.

Tidak ada upload system publik.

---

## Clock

Clock harus:
- menampilkan waktu aktual
- melakukan update secara berkala
- terintegrasi dengan taskbar
- tidak menggunakan hard-coded time

---

## Calendar

Calendar merupakan aplikasi/system utility.

Implementasi awal dapat berupa kalender lokal berbasis browser.

Tidak membutuhkan backend.

---

# 9. APPLICATION LAYER

Aplikasi adalah fitur yang berjalan di dalam Window System.

Aplikasi awal:

- About Me
- Media
- Music
- Calendar
- Clock
- Settings

Aplikasi tidak boleh mengambil alih tanggung jawab WindowManager.

Contoh:

AboutMe mengetahui kontennya.

WindowManager mengetahui bagaimana window AboutMe dibuka, dipindahkan, diminimalkan, dan ditutup.

---

# 10. WINDOW SYSTEM

Window System adalah salah satu komponen terpenting Webcore.

Window harus mendukung:

- Open
- Close
- Minimize
- Maximize
- Restore
- Drag
- Focus
- Z-index
- Taskbar integration

Resize tidak menjadi prioritas versi awal.

Window harus memiliki state yang jelas.

Contoh:

CLOSED
↓
OPEN
↓
ACTIVE
↓
MINIMIZED
↓
RESTORED
↓
ACTIVE
↓
CLOSED

---

# 11. WINDOW BEHAVIOR

### Open

Ketika aplikasi dibuka:
- window muncul
- menjadi active
- mendapatkan focus
- z-index berada di atas window lain

### Close

Ketika ditutup:
- window dihapus/disembunyikan
- taskbar entry terkait ikut diperbarui

### Minimize

Window:
- menghilang dari desktop view
- tetap tercatat sebagai aplikasi aktif
- tetap memiliki taskbar entry

### Restore

Klik taskbar pada aplikasi minimized:
- window kembali muncul
- menjadi active
- focus kembali

### Maximize

Window mengisi area desktop yang tersedia.

Restore mengembalikannya ke ukuran/posisi sebelumnya.

### Drag

Window dapat dipindahkan menggunakan titlebar.

Window tidak boleh dapat dipindahkan keluar dari area desktop secara tidak masuk akal.

---

# 12. TASKBAR

Taskbar berfungsi sebagai sistem navigasi aplikasi.

Taskbar harus dapat:
- menunjukkan aplikasi yang aktif
- menunjukkan aplikasi minimized
- mengaktifkan kembali window
- membedakan active/inactive state

Menu button dapat menjadi entry point untuk system navigation di fase berikutnya.

---

# 13. LANDING PAGE

Landing Page merupakan state terpisah dari desktop.

Tujuan:
- memperkenalkan Webcore
- membangun atmosfer
- memberikan akses menuju desktop

Minimal memiliki:
- Welcome / Selamat Datang
- visual glitch/ambient effect
- PLAY

PLAY:
Landing
↓
Desktop

SHUTDOWN:
Desktop
↓
Landing

---

# 14. MEDIA

Media menggunakan local assets.

Target konten:
- images
- GIF
- videos

Public hanya dapat melihat/mengakses media yang disediakan oleh owner.

Tidak ada:
- upload
- delete
- edit
- repository modification

Konten media sebaiknya dipisahkan dari logic aplikasi.

---

# 15. MUSIC

Music menggunakan local assets.

Fitur awal:
- playlist
- play
- pause
- next
- previous
- progress jika diperlukan

Audio berasal dari local assets.

Tidak menggunakan external streaming service pada versi awal.

---

# 16. ABOUT ME

About Me berisi konten personal yang disediakan oleh owner.

Struktur dapat berkembang menjadi:
- profile
- bio
- skills
- projects
- contact

Konten harus mudah diperbarui tanpa perlu mengubah core system.

---

# 17. VISUAL EFFECT SYSTEM

Webcore harus terasa hidup.

Visual effects direncanakan meliputi:

- CRT
- scanlines
- glitch
- screen flicker
- window transitions
- hover/focus feedback
- boot/loading effect
- shutdown effect
- ambient visual details

Effects harus:
- modular
- dapat diaktifkan/nonaktifkan jika diperlukan
- tidak mengganggu usability
- tidak menyebabkan performa buruk

Effects bukan sekadar dekorasi; mereka merupakan bagian dari atmosphere Webcore.

---

# 18. PERFORMANCE

Prioritas:

1. Stability
2. Maintainability
3. User experience
4. Performance
5. Visual complexity

Jangan menambahkan efek hanya karena terlihat keren jika efek tersebut:
- menyebabkan lag
- mengganggu navigasi
- membuat text sulit dibaca
- membuat device low-end kesulitan

---

# 19. ACCESSIBILITY

Walaupun Webcore memiliki aesthetic retro, basic accessibility tetap harus diperhatikan.

Gunakan:
- semantic HTML
- button untuk interactive controls
- accessible labels
- keyboard focus jika memungkinkan
- `aria-*` hanya ketika memang diperlukan

Jangan mengorbankan usability hanya demi nostalgia.

---

# 20. SECURITY / CONTENT BOUNDARY

Webcore adalah static website.

Public user:
- dapat menggunakan UI
- dapat membuka aplikasi
- dapat memainkan media
- dapat mengubah setting yang memang disediakan
- tidak dapat mengubah repository
- tidak dapat meng-upload asset
- tidak dapat mengedit source melalui Webcore

Owner:
- mengubah source melalui repository
- mengganti wallpaper
- mengganti media
- mengganti music
- mengubah konten About Me

Tidak membuat fitur CMS/admin panel pada versi awal.

---

# 21. PERSISTENT STATE

Gunakan browser storage untuk preference yang memang perlu diingat.

Contoh:
- theme
- wallpaper preference jika diperlukan
- setting UI

Jangan menyimpan data yang tidak diperlukan.

State harus memiliki default value yang aman jika storage kosong atau rusak.

---

# 22. CODING PRINCIPLES

Gunakan prinsip:

- simple over clever
- explicit over magical
- modular over monolithic
- minimal dependencies
- incremental development
- progressive enhancement

Jangan membuat abstraction hanya untuk terlihat profesional.

Jika sebuah fitur dapat dibuat dengan 50 baris kode yang jelas, jangan membuat framework internal 500 baris.

---

# 23. DEVELOPMENT ORDER

Implementasi dilakukan secara bertahap.

## Phase 0 — Foundation

- index.html
- style.css
- app.js
- deployment

Status: baseline.

---

## Phase 1 — Desktop System

- DesktopManager
- WindowManager
- Taskbar behavior
- basic application opening

---

## Phase 2 — Window System

- focus
- z-index
- drag
- minimize
- maximize
- restore
- close
- taskbar synchronization

---

## Phase 3 — System Features

- Clock
- Calendar
- Settings
- ThemeManager
- StateManager
- persistence

---

## Phase 4 — Content Applications

- About Me
- Media
- Music

---

## Phase 5 — Atmosphere

- WallpaperManager
- CRT
- glitch
- transitions
- boot
- shutdown
- ambient effects

---

## Phase 6 — Polish

- accessibility
- performance
- responsive improvements
- edge cases
- visual consistency
- browser compatibility

---

## Phase 7 — Mobile

Mobile adaptation dilakukan setelah desktop experience stabil.

---

# 24. DEFINITION OF DONE

Sebuah fase dianggap selesai jika:

- fitur bekerja sesuai spesifikasi
- tidak merusak fitur sebelumnya
- tidak mengubah visual yang sudah disetujui tanpa alasan
- tidak menambahkan dependency yang tidak diperlukan
- kode dapat dipahami
- tidak terdapat placeholder yang tidak disengaja
- tidak terdapat console error
- GitHub Pages tetap dapat menjalankan project

---

# 25. IMPORTANT DEVELOPMENT RULE

Jangan mengimplementasikan fase berikutnya sebelum fase sebelumnya stabil.

Jangan membuat seluruh architecture sekaligus.

Jangan membuat file hanya karena file tersebut sudah tercantum di target structure.

Architecture adalah blueprint.

Implementasi dilakukan secara incremental.

---

# 26. OWNER / TECHNICAL LEAD / IMPLEMENTER

Project ownership:

Owner:
- menentukan konten
- menentukan keputusan final
- mengelola repository

Technical Lead:
- menentukan architecture
- menentukan roadmap
- melakukan technical review

Implementer:
- mengimplementasikan kode berdasarkan specification
- tidak mengubah architecture tanpa persetujuan
- tidak membuat asumsi besar tentang product direction

---

# 27. CORE PRINCIPLE

Webcore bukan sekadar website dengan tema retro.

Webcore adalah pengalaman desktop interaktif yang dirancang untuk membangkitkan nostalgia terhadap komputer dan internet era lama.

Prioritas utama:

AUTHENTIC FEEL
+
REAL INTERACTION
+
STABILITY
+
SIMPLICITY
+
MAINTAINABILITY