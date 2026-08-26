// ============================================
// WEBCORE OS — STATE MANAGER
// Phase 3A: State Manager (Foundation)
// ============================================
//
// Tanggung jawab modul ini:
//   - menyimpan & membaca preference/state yang perlu dipertahankan
//     antar sesi browser (localStorage)
//   - aman terhadap storage kosong, disabled, penuh, atau data corrupt
//   - TIDAK tahu apa-apa tentang theme, wallpaper, desktop shortcut,
//     atau fitur lain — StateManager hanya persistence generik.
//     Consumer (ThemeManager, dll) yang menentukan key & default value
//     mereka sendiri lewat get(key, fallback) / set(key, value).
//
// Modul ini TIDAK mengambil alih responsibility WindowManager atau
// DesktopManager. Window state (open/minimized/maximized/active) tetap
// murni in-memory di WindowManager — tidak dipersist oleh modul ini
// pada Phase 3A.

const STORAGE_KEY = 'webcore-state';

class StateManager {
  constructor() {
    this.state = this._load();
  }

  // Membaca satu preference. fallback WAJIB diisi oleh pemanggil,
  // supaya setiap consumer eksplisit menyatakan default value-nya
  // sendiri (bukan bergantung pada undefined tersembunyi).
  get(key, fallback) {
    if (Object.prototype.hasOwnProperty.call(this.state, key)) {
      return this.state[key];
    }
    return fallback;
  }

  // Menyimpan satu preference dan langsung menulis ke localStorage.
  set(key, value) {
    this.state[key] = value;
    this._save();
  }

  // --------------------------------------------
  // INTERNAL — baca/tulis localStorage dengan aman
  // --------------------------------------------

  // Membaca state dari localStorage. Mengembalikan object kosong jika:
  //   - localStorage tidak tersedia (mis. private mode, disabled)
  //   - belum pernah ada data tersimpan
  //   - data tersimpan corrupt / bukan JSON valid
  //   - data tersimpan bukan object (mis. array, string, angka)
  // Object kosong berarti setiap get() akan jatuh ke fallback
  // masing-masing pemanggil — tidak pernah melempar error ke app.js.
  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};

      const parsed = JSON.parse(raw);
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return {};
      }
      return parsed;
    } catch (error) {
      return {};
    }
  }

  // Menulis state ke localStorage. Kegagalan (storage disabled, penuh,
  // dsb.) diabaikan dengan aman — preference tetap berfungsi untuk
  // sesi berjalan (in-memory), hanya tidak persisten ke sesi berikutnya.
  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (error) {
      // Storage tidak tersedia/penuh — diamkan, jangan sampai
      // mengganggu jalannya aplikasi.
    }
  }
}

export { StateManager };
