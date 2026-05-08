/* ===== GMPos v2 frontend hardening layer ===== */
(function() {
  'use strict';

  const SUPABASE_HOST = 'mxiiolycxbhrgpssdhtn.supabase.co';
  const LANG_TEXT = {
    zh: {
      debt: '欠货',
      debtHint: '允许负库存：表示已出货但库存待补。',
      secureTitle: 'V2 安全提示',
      secureBody: '当前版本仍是前端直连数据库。请确保 Supabase 已开启 RLS，并把用户、库存、订单写入权限限制到可信规则。',
      close: '知道了'
    },
    id: {
      debt: 'Stok Minus',
      debtHint: 'Stok minus diizinkan: barang sudah keluar dan sedang menunggu tambah stok.',
      secureTitle: 'Catatan keamanan V2',
      secureBody: 'Versi ini masih terhubung langsung dari frontend ke database. Pastikan Supabase RLS aktif dan aturan akses tabel sudah dibatasi.',
      close: 'Mengerti'
    },
    en: {
      debt: 'Backorder',
      debtHint: 'Negative stock is allowed: goods shipped first, stock to be replenished later.',
      secureTitle: 'V2 Security Note',
      secureBody: 'This version still connects from the frontend directly to the database. Make sure Supabase RLS is enabled and table write access is restricted.',
      close: 'Got it'
    }
  };

  function currentLang() {
    return localStorage.getItem('gmpos_lang') || 'zh';
  }

  function tx(key) {
    const lang = currentLang();
    return (LANG_TEXT[lang] || LANG_TEXT.zh)[key] || key;
  }

  function isSupabaseRequest(input) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    return url.includes(SUPABASE_HOST);
  }

  const nativeFetch = window.fetch.bind(window);
  window.fetch = function(input, init) {
    if (!isSupabaseRequest(input)) return nativeFetch(input, init);

    const nextInit = Object.assign({}, init || {});
    const headers = new Headers(nextInit.headers || (input && input.headers) || undefined);
    headers.set('Cache-Control', 'no-store');
    headers.set('Pragma', 'no-cache');
    nextInit.headers = headers;
    nextInit.cache = 'no-store';

    return nativeFetch(input, nextInit);
  };

  function injectStyles() {
    if (document.getElementById('gmpos-v2-style')) return;
    const style = document.createElement('style');
    style.id = 'gmpos-v2-style';
    style.textContent = `
      .v2-backorder { color: var(--red) !important; }
      .v2-backorder-note {
        margin-top: 4px;
        color: var(--red);
        font-size: 11px;
        line-height: 1.35;
      }
      .v2-badge-debt {
        background: var(--red-light) !important;
        color: var(--red) !important;
      }
      .v2-secure-note {
        position: fixed;
        left: 50%;
        bottom: 92px;
        transform: translateX(-50%);
        z-index: 120;
        width: min(460px, calc(100vw - 24px));
        background: var(--surface);
        color: var(--text);
        border: 1px solid var(--border);
        border-left: 4px solid var(--amber);
        border-radius: 10px;
        box-shadow: 0 10px 28px rgba(0,0,0,.16);
        padding: 12px 12px 10px;
        font-size: 12px;
      }
      .v2-secure-note strong { display: block; margin-bottom: 4px; font-size: 13px; }
      .v2-secure-note button {
        margin-top: 8px;
        border: 0;
        background: var(--green);
        color: #fff;
        border-radius: 8px;
        padding: 7px 10px;
        font-size: 12px;
        cursor: pointer;
      }
      input[type=password], input[type=date] {
        width: 100%;
        padding: 11px 13px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: var(--bg);
        color: var(--text);
        font-size: 15px;
        font-family: inherit;
        outline: none;
      }
      input[type=password]:focus, input[type=date]:focus { border-color: var(--green); }
    `;
    document.head.appendChild(style);
  }

  function maybeShowSecurityNote() {
    if (localStorage.getItem('gmpos_v2_security_note_seen') === '1') return;
    if (!document.getElementById('app-main')) return;
    if (document.getElementById('page-login')?.classList.contains('active')) return;
    if (document.getElementById('v2-secure-note')) return;

    const note = document.createElement('div');
    note.id = 'v2-secure-note';
    note.className = 'v2-secure-note';
    note.innerHTML = `<strong>${tx('secureTitle')}</strong><div>${tx('secureBody')}</div><button type="button">${tx('close')}</button>`;
    note.querySelector('button').addEventListener('click', function() {
      localStorage.setItem('gmpos_v2_security_note_seen', '1');
      note.remove();
    });
    document.body.appendChild(note);
  }

  function parseNumber(text) {
    const match = String(text || '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
  }

  function markBackorders() {
    document.querySelectorAll('.card, .stat-card').forEach(card => {
      const stockEl = card.querySelector('.stock-num, .stat-value, #s-stock-num');
      if (!stockEl) return;
      const value = parseNumber(stockEl.textContent);
      if (value === null || value >= 0) return;

      stockEl.classList.add('v2-backorder');
      card.querySelectorAll('.badge, .chip').forEach(badge => {
        const text = badge.textContent.trim().toLowerCase();
        if (['告急', 'low', 'menipis'].includes(text)) {
          badge.textContent = tx('debt');
          badge.classList.add('v2-badge-debt');
        }
      });

      if (!card.querySelector('.v2-backorder-note')) {
        const note = document.createElement('div');
        note.className = 'v2-backorder-note';
        card.appendChild(note);
      }
      const note = card.querySelector('.v2-backorder-note');
      if (note) note.textContent = tx('debtHint');
    });
  }

  function refreshV2() {
    injectStyles();
    maybeShowSecurityNote();
    markBackorders();
  }

  document.addEventListener('DOMContentLoaded', function() {
    refreshV2();
    const observer = new MutationObserver(refreshV2);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    window.addEventListener('storage', refreshV2);
  });
})();
