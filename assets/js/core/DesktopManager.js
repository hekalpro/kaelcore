// ============================================
// WEBCORE OS — DESKTOP MANAGER
// Phase 1: Desktop System
// ============================================
//
// Tanggung jawab modul ini:
//   - desktop icon selection (single click)
//   - membuka aplikasi (double click / Enter-Space untuk keyboard)
//   - integrasi dengan WindowManager lewat API publiknya
//     (hasWindow / openWindow) — TIDAK mengatur z-index, minimize,
//     maximize, atau drag. Itu tetap tanggung jawab WindowManager.
//
// Jika sebuah icon belum memiliki window target (aplikasi belum
// diimplementasikan), double click tidak melakukan apa-apa. Ini
// keputusan scope yang disengaja untuk Phase 1 — bukan bug.

class DesktopManager {
  constructor(windowManager) {
    this.windowManager = windowManager;
    this.icons = [];
  }

  // Mendaftarkan semua elemen .icon yang punya data-app dan
  // memasang interaksi selection + activation.
  init() {
    this.icons = Array.from(document.querySelectorAll('.icon[data-app]'));
    this.icons.forEach((icon) => this._attachIconHandlers(icon));
  }

  _attachIconHandlers(icon) {
    icon.addEventListener('click', () => this._selectIcon(icon));
    icon.addEventListener('dblclick', () => this._activateIcon(icon));

    // Keyboard accessibility: Enter/Space langsung membuka aplikasi,
    // tanpa perlu emulasi timing double-click untuk keyboard user.
    icon.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this._selectIcon(icon);
        this._activateIcon(icon);
      }
    });
  }

  // --------------------------------------------
  // SELECTION (single click)
  // --------------------------------------------
  _selectIcon(icon) {
    this.icons.forEach((i) => i.classList.remove('is-selected'));
    icon.classList.add('is-selected');
  }

  // --------------------------------------------
  // ACTIVATION (double click / keyboard activate)
  // --------------------------------------------
  _activateIcon(icon) {
    const appId = icon.dataset.app;

    if (this.windowManager.hasWindow(appId)) {
      this.windowManager.openWindow(appId);
    }
    // Jika belum ada window target untuk app ini (mis. Media, Music,
    // Calendar, Clock, Settings pada Phase 1), tidak melakukan apa-apa.
    // Aplikasi tersebut akan dihubungkan pada fase berikutnya saat
    // window/content-nya sudah tersedia.
  }
}

export { DesktopManager };
