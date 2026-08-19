// ============================================
// WEBCORE OS — WINDOW MANAGER
// Phase 1A: Window Manager (Functional OS)
// ============================================
//
// Tanggung jawab modul ini:
//   - open / close
//   - minimize / restore (via taskbar)
//   - maximize / restore
//   - focus & z-index (mekanisme generik, bukan hardcode per window)
//   - drag melalui titlebar, dibatasi agar tidak keluar terlalu jauh
//     dari viewport
//   - state: open, minimized, maximized, active, position, size
//
// Modul ini TIDAK menangani logic aplikasi (About Me, Media, dll) dan
// TIDAK menangani cara window dibuka dari desktop icon — itu tanggung
// jawab DesktopManager pada fase berikutnya.

const TASKBAR_HEIGHT = 40;   // px — harus sinkron dengan .taskbar di style.css
const TITLEBAR_HEIGHT = 28;  // px — harus sinkron dengan .titlebar di style.css
const EDGE_MARGIN = 50;      // px — batas minimum titlebar yang tetap terlihat saat drag
const Z_INDEX_BASE = 10;

class WindowManager {
  constructor() {
    this.windows = new Map(); // windowId -> { el, taskBtn, state }
    this.zCounter = Z_INDEX_BASE;
  }

  // Mendaftarkan semua elemen .window yang punya data-window-id
  // dan memasang seluruh interaksi (focus, drag, kontrol, taskbar).
  init() {
    const windowEls = document.querySelectorAll('.window[data-window-id]');
    windowEls.forEach((el) => this._registerWindow(el));
  }

  _registerWindow(el) {
    const id = el.dataset.windowId;
    const taskBtn = document.querySelector(`.task-btn[data-window-id="${id}"]`);

    const state = {
      open: true,
      minimized: false,
      maximized: false,
      prevRect: null, // { top, left, width, height } sebelum maximize
    };

    this.windows.set(id, { el, taskBtn, state });

    this._bringToFront(id);
    this._attachFocusHandler(id);
    this._attachDragHandler(id);
    this._attachControlHandlers(id);
    this._attachTaskbarHandler(id);
  }

  // --------------------------------------------
  // PUBLIC API — dipakai oleh modul lain (mis. DesktopManager)
  // --------------------------------------------
  // Catatan: kedua method ini murni memanggil ulang logic privat yang
  // sudah ada (_bringToFront, _restoreFromMinimize) plus melepas status
  // closed/hidden bila diperlukan. Tidak ada logic baru untuk drag,
  // minimize, maximize, atau z-index — itu tetap di luar tanggung
  // jawab pemanggil.

  hasWindow(id) {
    return this.windows.has(id);
  }

  openWindow(id) {
    const win = this.windows.get(id);
    if (!win) return false;

    if (!win.state.open) {
      win.state.open = true;
      win.el.classList.remove('is-closed');
      if (win.taskBtn) win.taskBtn.classList.remove('is-hidden');
    }

    if (win.state.minimized) {
      this._restoreFromMinimize(id);
    } else {
      this._bringToFront(id);
    }

    return true;
  }

  // --------------------------------------------
  // FOCUS / Z-INDEX
  // --------------------------------------------
  _bringToFront(id) {
    const win = this.windows.get(id);
    if (!win) return;
    this.zCounter += 1;
    win.el.style.zIndex = String(this.zCounter);
  }

  _attachFocusHandler(id) {
    const win = this.windows.get(id);
    win.el.addEventListener('mousedown', () => {
      if (win.state.open) this._bringToFront(id);
    });
  }

  // --------------------------------------------
  // OPEN / CLOSE / MINIMIZE / MAXIMIZE — kontrol titlebar
  // --------------------------------------------
  _attachControlHandlers(id) {
    const win = this.windows.get(id);
    const buttons = win.el.querySelectorAll('.title-btn[data-action]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'close') this._close(id);
        if (action === 'minimize') this._minimize(id);
        if (action === 'maximize') this._toggleMaximize(id);
      });
    });
  }

  _close(id) {
    const win = this.windows.get(id);
    if (!win) return;
    win.state.open = false;
    win.el.classList.add('is-closed');
    if (win.taskBtn) win.taskBtn.classList.add('is-hidden');
  }

  _minimize(id) {
    const win = this.windows.get(id);
    if (!win) return;
    win.state.minimized = true;
    win.el.classList.add('is-minimized');
  }

  _restoreFromMinimize(id) {
    const win = this.windows.get(id);
    if (!win) return;
    win.state.minimized = false;
    win.el.classList.remove('is-minimized');
    this._bringToFront(id);
  }

  _toggleMaximize(id) {
    const win = this.windows.get(id);
    if (!win) return;
    const { el, state } = win;

    if (!state.maximized) {
      state.prevRect = {
        top: el.style.top || getComputedStyle(el).top,
        left: el.style.left || getComputedStyle(el).left,
        width: el.style.width || getComputedStyle(el).width,
        height: el.style.height || getComputedStyle(el).height,
      };
      el.classList.add('is-maximized');
      el.style.top = '';
      el.style.left = '';
      el.style.width = '';
      el.style.height = '';
      state.maximized = true;
    } else {
      el.classList.remove('is-maximized');
      if (state.prevRect) {
        el.style.top = state.prevRect.top;
        el.style.left = state.prevRect.left;
        el.style.width = state.prevRect.width;
        el.style.height = state.prevRect.height;
      }
      state.maximized = false;
    }

    this._bringToFront(id);
  }

  // --------------------------------------------
  // TASKBAR INTEGRATION
  // --------------------------------------------
  _attachTaskbarHandler(id) {
    const win = this.windows.get(id);
    if (!win.taskBtn) return;
    win.taskBtn.addEventListener('click', () => {
      if (!win.state.open) return;
      if (win.state.minimized) {
        this._restoreFromMinimize(id);
      } else {
        this._bringToFront(id);
      }
    });
  }

  // --------------------------------------------
  // DRAG — hanya melalui titlebar, dibatasi viewport
  // --------------------------------------------
  _attachDragHandler(id) {
    const win = this.windows.get(id);
    const titlebar = win.el.querySelector('.titlebar');
    if (!titlebar) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const onPointerDown = (event) => {
      if (event.target.closest('.title-btn')) return; // klik tombol bukan drag
      if (win.state.maximized) return; // window maximized tidak bisa di-drag

      dragging = true;
      const rect = win.el.getBoundingClientRect();
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;

      this._bringToFront(id);
      document.addEventListener('mousemove', onPointerMove);
      document.addEventListener('mouseup', onPointerUp);
    };

    const onPointerMove = (event) => {
      if (!dragging) return;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      let newLeft = startLeft + deltaX;
      let newTop = startTop + deltaY;

      const winWidth = win.el.offsetWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const minLeft = -(winWidth - EDGE_MARGIN);
      const maxLeft = viewportWidth - EDGE_MARGIN;
      const minTop = 0;
      const maxTop = viewportHeight - TASKBAR_HEIGHT - TITLEBAR_HEIGHT;

      newLeft = Math.min(Math.max(newLeft, minLeft), maxLeft);
      newTop = Math.min(Math.max(newTop, minTop), maxTop);

      win.el.style.left = `${newLeft}px`;
      win.el.style.top = `${newTop}px`;
    };

    const onPointerUp = () => {
      dragging = false;
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
    };

    titlebar.addEventListener('mousedown', onPointerDown);
  }
}

export { WindowManager };
