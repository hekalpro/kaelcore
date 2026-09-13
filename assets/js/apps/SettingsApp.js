// ============================================
// WEBCORE OS — SETTINGS APP
// Phase 3C: Settings UI + Theme Toggle
// ============================================
//
// Tanggung jawab modul ini:
//   - membaca theme aktual dari ThemeManager untuk initial state UI
//   - memanggil themeManager.setTheme() saat user memilih radio
//
// Modul ini TIDAK:
//   - mengatur window behavior (open/close/minimize/dll — itu tetap
//     tanggung jawab WindowManager sepenuhnya)
//   - mengakses localStorage langsung
//   - membuat StateManager atau ThemeManager baru
//
// Window Settings sendiri selalu ada di DOM (mulai dalam keadaan
// is-closed), jadi radio input-nya juga selalu ada di DOM sejak load.
// Modul ini cukup di-init sekali di app.js — tidak perlu listener
// "onWindowOpen" terpisah.

class SettingsApp {
  constructor(themeManager) {
    this.themeManager = themeManager;
    this.radios = [];
  }

  init() {
    this.radios = Array.from(
      document.querySelectorAll('.settings-content input[name="theme"]')
    );
    if (this.radios.length === 0) return;

    this._syncFromTheme();

    this.radios.forEach((radio) => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          this.themeManager.setTheme(radio.value);
        }
      });
    });
  }

  // Set radio yang checked sesuai theme aktual dari ThemeManager —
  // ThemeManager tetap menjadi satu-satunya source of truth.
  _syncFromTheme() {
    const current = this.themeManager.getTheme();
    this.radios.forEach((radio) => {
      radio.checked = radio.value === current;
    });
  }
}

export { SettingsApp };

