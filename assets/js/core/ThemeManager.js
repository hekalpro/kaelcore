// ============================================
// WEBCORE OS — THEME MANAGER
// Phase 3B: Theme Manager & Theme Persistence
// ============================================
//
// Tanggung jawab modul ini:
//   - membaca theme awal dari StateManager
//   - menerapkan theme ke DOM (atribut data-theme di <html>)
//   - mengganti theme (setTheme / toggleTheme)
//   - menyimpan perubahan theme lewat StateManager
//
// ThemeManager TIDAK:
//   - mengatur WindowManager/DesktopManager atau window state apapun
//   - mengakses localStorage langsung — semua baca/tulis lewat
//     stateManager.get()/stateManager.set()
//   - membuat persistence mechanism baru

const VALID_THEMES = ['dark', 'light'];
const DEFAULT_THEME = 'dark'; // keputusan produk: baseline visual Webcore sejak Phase 0
const STATE_KEY = 'theme';

class ThemeManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.theme = DEFAULT_THEME;
  }

  // Baca preference tersimpan lewat StateManager, validasi, lalu
  // terapkan ke DOM. Nilai invalid/corrupt jatuh ke DEFAULT_THEME
  // tanpa menimpa data tersimpan (tidak menulis apapun di sini —
  // hanya membaca).
  init() {
    const stored = this.stateManager.get(STATE_KEY, DEFAULT_THEME);
    const theme = VALID_THEMES.includes(stored) ? stored : DEFAULT_THEME;
    this._applyTheme(theme);
  }

  getTheme() {
    return this.theme;
  }

  // Ganti theme + simpan lewat StateManager. Nilai di luar
  // "dark"/"light" ditolak dengan aman — tidak mengubah DOM maupun
  // state tersimpan.
  setTheme(theme) {
    if (!VALID_THEMES.includes(theme)) return;
    this._applyTheme(theme);
    this.stateManager.set(STATE_KEY, theme);
  }

  toggleTheme() {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  // --------------------------------------------
  // INTERNAL
  // --------------------------------------------
  _applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export { ThemeManager };
