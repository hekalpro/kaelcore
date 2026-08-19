// ============================================
// WEBCORE OS — APP ENTRY POINT
// Phase 1A: Window Manager
// ============================================
//
// app.js tetap menjadi entry point tipis.
// Seluruh logic WindowManager berada di assets/js/core/WindowManager.js —
// file ini hanya menginisialisasinya.
//
// System module lain (DesktopManager, ThemeManager, dll) akan
// ditambahkan pada fase-fase berikutnya sesuai roadmap di
// WEBCORE_ARCHITECTURE.md.

import { WindowManager } from './core/WindowManager.js';

function init() {
  const windowManager = new WindowManager();
  windowManager.init();
}

document.addEventListener('DOMContentLoaded', init);
