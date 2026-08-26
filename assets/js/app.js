// ============================================
// WEBCORE OS — APP ENTRY POINT
// Phase 1: Desktop System
// ============================================
//
// app.js tetap menjadi entry point tipis.
// Logic ada di masing-masing manager:
//   - assets/js/core/WindowManager.js
//   - assets/js/core/DesktopManager.js
// File ini hanya menginisialisasi keduanya dan menghubungkan
// DesktopManager dengan instance WindowManager yang sama.
//
// System module lain (ThemeManager, StateManager, dll) akan
// ditambahkan pada fase-fase berikutnya sesuai roadmap di
// WEBCORE_ARCHITECTURE.md.

import { WindowManager } from './core/WindowManager.js';
import { DesktopManager } from './core/DesktopManager.js';

function init() {
  const windowManager = new WindowManager();
  windowManager.init();

  const desktopManager = new DesktopManager(windowManager);
  desktopManager.init();
}

document.addEventListener('DOMContentLoaded', init);
