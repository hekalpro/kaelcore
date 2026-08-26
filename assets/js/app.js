// ============================================
// WEBCORE OS — APP ENTRY POINT
// Phase 3A: State Manager
// ============================================
//
// app.js tetap menjadi entry point tipis.
// Logic ada di masing-masing manager:
//   - assets/js/core/WindowManager.js
//   - assets/js/core/DesktopManager.js
//   - assets/js/core/StateManager.js
// File ini hanya menginisialisasi manager yang ada.
//
// Catatan: StateManager belum punya consumer pada Phase 3A ini
// (ThemeManager, WallpaperManager, dll belum diimplementasikan).
// Inisialisasi di sini murni supaya instance siap dipakai begitu
// consumer pertamanya dibuat di fase berikutnya.

import { WindowManager } from './core/WindowManager.js';
import { DesktopManager } from './core/DesktopManager.js';
import { StateManager } from './core/StateManager.js';

function init() {
  const stateManager = new StateManager();

  const windowManager = new WindowManager();
  windowManager.init();

  const desktopManager = new DesktopManager(windowManager);
  desktopManager.init();
}

document.addEventListener('DOMContentLoaded', init);
