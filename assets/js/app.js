// ============================================
// WEBCORE OS — APP ENTRY POINT
// Phase 3C: Settings UI + Theme Toggle
// ============================================
//
// app.js tetap menjadi entry point tipis.
// Logic ada di masing-masing manager:
//   - assets/js/core/WindowManager.js
//   - assets/js/core/DesktopManager.js
//   - assets/js/core/StateManager.js
//   - assets/js/core/ThemeManager.js
//   - assets/js/apps/SettingsApp.js
// File ini hanya menginisialisasi dengan urutan dependency yang benar:
// StateManager harus siap sebelum ThemeManager, dan ThemeManager harus
// siap sebelum SettingsApp (yang membaca/mengubah theme lewatnya).

import { WindowManager } from './core/WindowManager.js';
import { DesktopManager } from './core/DesktopManager.js';
import { StateManager } from './core/StateManager.js';
import { ThemeManager } from './core/ThemeManager.js';
import { SettingsApp } from './apps/SettingsApp.js';

function init() {
  const stateManager = new StateManager();

  const themeManager = new ThemeManager(stateManager);
  themeManager.init();

  const settingsApp = new SettingsApp(themeManager);
  settingsApp.init();

  const windowManager = new WindowManager();
  windowManager.init();

  const desktopManager = new DesktopManager(windowManager);
  desktopManager.init();
}

document.addEventListener('DOMContentLoaded', init);
