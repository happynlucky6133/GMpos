/* ===== GMPos 库存系统 v1 - 永平版 ===== */
(function() {
  'use strict';

  // ============================================================
  // Supabase 配置
  // ============================================================
  const SUPABASE_URL = 'https://mxiiolycxbhrgpssdhtn.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_JMooT9uaCI9jAvaRaYQK8g_9-hJXaQp';
  const SB = SUPABASE_URL + '/rest/v1';

  // ============================================================
  // 状态管理
  // ============================================================
  const state = {
    products:    new Map(),
    suppliers:   new Map(),
    stockIns:    [],
    stockInDetails: new Map(),
    orders:      [],
    orderDetails: new Map(),
    currentPage: 'dashboard',
    currentModal: null,
    loading:     false
  };

  let prodNameCache = new Map();
  let supNameCache = new Map();

  // ============================================================
  // 当前用户
  // ============================================================
  let currentUser = null;

  // 从 localStorage 恢复登录状态
  try {
    const saved = localStorage.getItem('ycpos_user');
    if (saved) currentUser = JSON.parse(saved);
  } catch(e) {}

  // ============================================================
  // 权限工具
  // ============================================================
  function hasRole(roles) {
    if (!currentUser) return false;
    return roles.includes(currentUser.Role);
  }

  function canShowNav(page) {
    if (!currentUser) return true;
    const role = currentUser.Role;
    if (role === 'admin') return true;
    if (role === 'sales') return !['stockin', 'suppliers'].includes(page);
    if (role === 'purchase') return !['orders', 'suppliers'].includes(page);
    return true;
  }

  function canShowFab(page) {
    if (!currentUser) return false;
    const role = currentUser.Role;
    // 只在有对应 modal 的页面显示 + 号
    const fabPages = ['stockin', 'products', 'orders', 'suppliers'];
    if (!fabPages.includes(page)) return false;
    if (role === 'admin') return true;
    if (role === 'sales') return page === 'orders';
    if (role === 'purchase') return page === 'stockin';
    return false;
  }

  function canUseModal(modalId) {
    if (!currentUser) return false;
    const role = currentUser.Role;
    // 所有 modal 只能 admin 操作，除了进货（purchase）和出货（sales）
    if (role === 'admin') return true;
    if (role === 'purchase') return modalId === 'modal-si';
    if (role === 'sales') return modalId === 'modal-order';
    return false;
  }

function applyPermissions() {
    if (!currentUser) return;

    // 隐藏越权的导航按钮
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const page = btn.dataset.page;
      btn.style.display = canShowNav(page) ? '' : 'none';
    });

    // 控制 FAB
    const fab = document.getElementById('fab');
    fab.style.display = canShowFab(state.currentPage) ? 'flex' : 'none';

    // 用户显示
    const ud = document.getElementById('user-display');
    ud.textContent = '👤 ' + currentUser.DisplayName + ' (退出)';
    ud.style.display = 'inline';

    // admin 专用按钮（👤+ 添加用户）
    const adminActions = document.getElementById('admin-actions');
    adminActions.style.display = 'inline';
    document.getElementById('btn-add-user').style.display = isAdmin() ? 'inline' : 'none';
  }

  // ============================================================
  // Supabase API
  // ============================================================
  async function sbGet(table, opts = {}) {
    const params = new URLSearchParams();
    if (opts.select) params.set('select', opts.select);
    if (opts.order)  params.set('order', opts.order);
    const url = SB + '/' + table + '?' + params.toString();
    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async function sbPost(table, data) {
    const url = SB + '/' + table;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + await res.text());
    try { return await res.json(); } catch { return { success: true }; }
  }

  async function sbPatch(table, idCol, idVal, data) {
    const url = SB + '/' + table + '?' + idCol + '=eq.' + encodeURIComponent(idVal);
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return true;
  }

  async function sbGetFiltered(table, col, val, opts = {}) {
    const params = new URLSearchParams();
    params.set(col, 'eq.' + encodeURIComponent(val));
    if (opts.select) params.set('select', opts.select);
    const url = SB + '/' + table + '?' + params.toString();
    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async function sbDelete(table, idCol, idVal) {
    const url = SB + '/' + table + '?' + idCol + '=eq.' + encodeURIComponent(idVal);
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY
      }
    });
    if (!res.ok) throw new Error(await res.text());
    return true;
  }

  // ============================================================
  // 登录 / 登出
  // ============================================================
  async function doLogin() {
    const username = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value.trim();
    const errEl = document.getElementById('login-error');
    if (!username || !password) {
      errEl.textContent = '请输入用户名和密码';
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';

    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = '登录中...';
    try {
      const users = await sbGetFiltered('users', 'Username', username, { select: '*' });
      if (!users || users.length === 0) {
        errEl.textContent = '用户不存在';
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = '登录';
        return;
      }
      const user = users[0];
      if (user.Password !== password) {
        errEl.textContent = '密码错误';
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = '登录';
        return;
      }

      currentUser = {
        Username: user.Username,
        DisplayName: user.DisplayName,
        Role: user.Role
      };
      localStorage.setItem('ycpos_user', JSON.stringify(currentUser));

      // 隐藏登录页，显示主应用
      document.getElementById('page-login').classList.remove('active');
      document.getElementById('app-main').style.display = 'flex';

      applyPermissions();
      showToast('欢迎，' + currentUser.DisplayName + '！', 'ok');
      loadAll();
    } catch (e) {
      errEl.textContent = '登录失败: ' + e.message;
      errEl.style.display = 'block';
    }
    btn.disabled = false;
    btn.textContent = '登录';
  }

  function doLogout() {
    currentUser = null;
    localStorage.removeItem('ycpos_user');
    document.getElementById('app-main').style.display = 'none';
    document.getElementById('page-login').classList.add('active');
    document.getElementById('login-pass').value = '';
    document.getElementById('login-error').style.display = 'none';
    // 重置页面
    document.querySelectorAll('.nav-btn').forEach(b => b.style.display = '');
    document.getElementById('fab').style.display = 'none';
    document.getElementById('user-display').style.display = 'none';
    showToast('已退出登录', 'ok');
  }

  // ============================================================
  // 数据加载
  // ============================================================
  async function loadAll() {
    if (state.loading) return;
    state.loading = true;
    const btn = document.getElementById('sync-btn');
    btn.disabled = true;
    btn.textContent = '加载中...';

    try {
      const [products, suppliers, customers, stockIns, stockInDetails, orders, orderDetails] = await Promise.all([
        sbGet('products', { order: 'id' }),
        sbGet('suppliers', { order: 'id' }),
        sbGet('customers', { order: 'id' }),
        sbGet('stock_ins', { order: 'id' }),
        sbGet('stock_in_details', { order: 'id' }),
        sbGet('purchase_orders', { order: 'id' }),
        sbGet('po_details', { order: 'id' })
      ]);

      buildIndexes({ products, suppliers, customers, stockIns, stockInDetails, orders, orderDetails });
      populateSelects();
      renderCurrentPage();

      const t = new Date();
      document.getElementById('sync-time').textContent = '已同步 ' + t.toTimeString().slice(0,5);
    } catch (e) {
      showToast('加载失败: ' + e.message, 'err');
      document.getElementById('sync-time').textContent = '加载失败';
    }

    btn.disabled = false;
    btn.textContent = '↻ 刷新';
    state.loading = false;
  }

  // ============================================================
  // 数据解析
  // ============================================================
  function buildIndexes(data) {
    state.products = new Map((data.products || []).map(p => [p.ProductID, p]));
    state.suppliers = new Map((data.suppliers || []).map(s => [s.SupplierID, s]));
    state.stockIns = data.stockIns || [];
    state.stockInDetails = new Map((data.stockInDetails || []).map(d => [d.StockInID, d]));
    state.orders = data.orders || [];
    state.orderDetails = new Map((data.orderDetails || []).map(d => [d.POID, d]));

    prodNameCache = new Map();
    state.products.forEach((p, id) => prodNameCache.set(id, p.ProductName));
    supNameCache = new Map();
    state.suppliers.forEach((s, id) => supNameCache.set(id, s.SupplierName));
  }

  // ============================================================
  // 选择框填充
  // ============================================================
  function populateSelects() {
    const sup = document.getElementById('f-sup');
    if (sup) sup.innerHTML = Array.from(state.suppliers.values())
      .map(s => `<option value="${s.SupplierID}">${escapeHTML(s.SupplierName)}</option>`).join('');

    ['f-prod', 'o-prod'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = Array.from(state.products.values())
        .map(p => `<option value="${p.ProductID}">${escapeHTML(p.ProductName)} (${p.Grade || ''})</option>`).join('');
    });

    // 初始化数量单位标签
    updateQtyLabels();
  }

  // ============================================================
  // 工具函数
  // ============================================================
  function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({ '&':'&','<':'<','>':'>','"':'"',"'":'&#39;'})[m]);
  }

  function getProdName(id) { return prodNameCache.get(id) || id; }
  function getSupName(id)  { return supNameCache.get(id) || id; }
  function getProd(id)     { return state.products.get(id); }
  function getProdUnit(id) {
    const p = state.products.get(id);
    return p ? (p.Unit || 'kg') : 'kg';
  }

  function stockBadge(n) {
    n = Number(n);
    if (n > 200) return '<span class="badge bg">充足</span>';
    if (n > 50)  return '<span class="badge ba">偏低</span>';
    return '<span class="badge br">告急</span>';
  }

  let toastTimer = null;
  function showToast(msg, type) {
    const t = document.getElementById('toast');
    if (!t) return;
    clearTimeout(toastTimer);
    t.textContent = msg;
    t.className = 'toast ' + (type || 'ok');
    t.style.display = 'block';
    t.style.opacity = '1';
    toastTimer = setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.style.display = 'none', 300);
    }, 3000);
  }

  // 审计日志
  async function auditLog(action, target, detail) {
    try {
      const now = new Date();
      const ts = now.toISOString().replace('T', ' ').slice(0, 19);
      await sbPost('audit_logs', {
        Timestamp: ts,
        User: currentUser ? currentUser.DisplayName : 'unknown',
        Action: action,
        Target: target || '',
        Detail: detail || ''
      });
    } catch (e) { /* 审计日志记录失败不打断主流程 */ }
  }

  async function loadAuditLogs() {
    const container = document.getElementById('audit-list');
    try {
      const logs = await sbGet('audit_logs', { order: 'id.desc' });
      renderAuditLog(logs, container);
    } catch (e) {
      container.innerHTML = '<div class="empty">加载失败: ' + escapeHTML(e.message) + '</div>';
    }
  }

  function renderAuditLog(logs, container) {
    if (!logs || logs.length === 0) {
      container.innerHTML = '<div class="empty">暂无审计记录</div>';
      return;
    }
    container.innerHTML = logs.map(l => {
      const ts = String(l.Timestamp || '').slice(0, 16).replace('T', ' ');
      return `<div class="card audit-row">
        <div class="row-flex">
          <span class="mono" style="font-size:11px;color:var(--text2)">${escapeHTML(ts)}</span>
          <span class="chip" style="background:var(--blue-light);color:var(--blue);font-size:11px">${escapeHTML(l.Action)}</span>
        </div>
        <div style="font-size:13px;margin-top:4px">
          <strong>${escapeHTML(l.User)}</strong>
          ${l.Target ? ' · ' + escapeHTML(l.Target) : ''}
        </div>
        ${l.Detail ? '<div class="row-sub">' + escapeHTML(l.Detail) + '</div>' : ''}
      </div>`;
    }).join('');
  }

  // 根据所选产品动态更新数量单位的标签
  function updateQtyLabels() {
    const fProd = document.getElementById('f-prod');
    const oProd = document.getElementById('o-prod');
    const fLabel = document.getElementById('f-qty-label');
    const oLabel = document.getElementById('o-qty-label');
    if (fProd && fLabel) {
      const unit = getProdUnit(fProd.value);
      fLabel.textContent = '数量 (' + unit + ')';
    }
    if (oProd && oLabel) {
      const unit = getProdUnit(oProd.value);
      oLabel.textContent = '数量 (' + unit + ')';
    }
  }

  function debounce(fn, ms) {
    let timer = null;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // ============================================================
  // 页面渲染
  // ============================================================
  function renderCurrentPage() {
    const page = state.currentPage;
    if (page === 'dashboard')   renderDashboard();
    else if (page === 'products')  renderProducts();
    else if (page === 'stockin')   renderStockIn();
    else if (page === 'orders')    renderOrders();
    else if (page === 'report')    initReportPage();
    else if (page === 'suppliers') renderSuppliers();
    else if (page === 'customers') renderCustomers();
    else if (page === 'audit')     loadAuditLogs();
  }

  function renderDashboard() {
    const total = Array.from(state.products.values())
      .reduce((a, p) => a + Number(p.StockBalance || 0), 0);

    document.getElementById('s-products').textContent = state.products.size;
    document.getElementById('s-stock').innerHTML = total + ' <span class="stat-unit">件</span>';
    document.getElementById('s-stockin').textContent = state.stockIns.length;
    document.getElementById('s-suppliers').textContent = state.suppliers.size;

    const prodContainer = document.getElementById('dash-products');
    if (state.products.size === 0) {
      prodContainer.innerHTML = '<div class="empty">暂无产品</div>';
    } else {
      prodContainer.innerHTML = Array.from(state.products.values()).map(p =>
        `<div class="card row-flex">
          <div>
            <div class="row-title">${escapeHTML(p.ProductName)}</div>
            <div class="row-sub">等级 ${p.Grade || '-'} · ${stockBadge(p.StockBalance)}</div>
          </div>
          <div>
            <div class="stock-num">${Number(p.StockBalance || 0)}</div>
            <div class="stock-unit">${p.Unit || 'kg'}</div>
          </div>
        </div>`
      ).join('');
    }

    const recentContainer = document.getElementById('dash-recent');
    const recent = state.stockIns.slice(-3).reverse();
    if (recent.length === 0) {
      recentContainer.innerHTML = '<div class="empty">暂无进货记录</div>';
    } else {
      recentContainer.innerHTML = recent.map(s => {
        const d = state.stockInDetails.get(s.StockInID);
        return `<div class="card">
          <div class="row-flex" style="margin-bottom:5px">
            <span class="mono">${s.StockInID}</span>
            <span style="font-size:11px;color:var(--text2)">${String(s.Date).slice(0,10)}</span>
          </div>
          <div style="font-size:13px">
            ${d ? escapeHTML(getProdName(d.ProductID)) : '-'} · <strong>${d ? d.Qty + ' ' + getProdUnit(d.ProductID) : '-'}</strong>
          </div>
          <div class="row-sub">${escapeHTML(getSupName(s.SupplierID))}</div>
        </div>`;
      }).join('');
    }
  }

  const isAdmin = () => currentUser && currentUser.Role === 'admin';

  function renderProducts() {
    const q = (document.getElementById('product-search').value || '').toLowerCase();
    const list = Array.from(state.products.values())
      .filter(p => p.ProductName.toLowerCase().includes(q));
    const container = document.getElementById('product-list');
    if (list.length === 0) {
      container.innerHTML = '<div class="empty">没有找到产品</div>';
      return;
    }
    container.innerHTML = list.map(p =>
      `<div class="card row-flex">
        <div>
          <div class="row-title">${escapeHTML(p.ProductName)}</div>
          <div class="row-sub">${p.ProductID} · 等级 ${p.Grade || '-'} · ${stockBadge(p.StockBalance)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="text-align:right">
            <div class="stock-num">${Number(p.StockBalance || 0)}</div>
            <div class="stock-unit">${p.Unit || 'kg'}</div>
          </div>
          ${isAdmin() ? `<button class="del-btn" data-type="product" data-id="${p.ProductID}">✕</button>` : ''}
        </div>
      </div>`
    ).join('');
    attachDeleteHandlers(container);
  }

  function renderSuppliers() {
    const q = (document.getElementById('supplier-search').value || '').toLowerCase();
    const list = Array.from(state.suppliers.values())
      .filter(s => (s.SupplierName || '').toLowerCase().includes(q));
    const container = document.getElementById('supplier-list');
    if (list.length === 0) {
      container.innerHTML = '<div class="empty">暂无供应商</div>';
      return;
    }
    container.innerHTML = list.map(s => {
      let sub = s.SupplierID;
      if (s.Phone) sub += ' · 📞 ' + escapeHTML(s.Phone);
      if (s.Note)  sub += ' · ' + escapeHTML(s.Note);
      return `<div class="card row-flex">
        <div>
          <div class="row-title">${escapeHTML(s.SupplierName)}</div>
          <div class="row-sub">${sub}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:22px">🏭</span>
          ${isAdmin() ? `<button class="del-btn" data-type="supplier" data-id="${s.SupplierID}">✕</button>` : ''}
        </div>
      </div>`;
    }).join('');
    attachDeleteHandlers(container);
  }

  function renderStockIn() {
    const container = document.getElementById('stockin-list');
    if (state.stockIns.length === 0) {
      container.innerHTML = '<div class="empty">暂无进货记录</div>';
      return;
    }
    container.innerHTML = [...state.stockIns].reverse().map(s => {
      const d = state.stockInDetails.get(s.StockInID);
      return `<div class="card">
        <div class="row-flex" style="margin-bottom:5px">
          <span class="mono">${s.StockInID}</span>
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-size:11px;color:var(--text2)">${String(s.Date).slice(0,10)}</span>
            ${isAdmin() ? `<button class="del-btn sm" data-type="stockin" data-id="${s.StockInID}">✕</button>` : ''}
          </div>
        </div>
        <div style="font-size:13px">
          ${d ? escapeHTML(getProdName(d.ProductID)) : '-'} · <strong>${d ? d.Qty + ' ' + getProdUnit(d.ProductID) : '-'}</strong>
        </div>
        <div class="row-sub">${escapeHTML(getSupName(s.SupplierID))}</div>
      </div>`;
    }).join('');
    attachDeleteHandlers(container);
  }

  function renderOrders() {
    const container = document.getElementById('orders-list');
    if (state.orders.length === 0) {
      container.innerHTML = '<div class="empty">暂无出货记录</div>';
      return;
    }

    container.innerHTML = [...state.orders].reverse().map(o => {
      const d = state.orderDetails.get(o.POID);
      const productName = d ? escapeHTML(getProdName(d.ProductID)) : '-';
      const qty = d ? d.QTY : '-';
      const date = String(o.Date).slice(0,10);
      const unit = d ? getProdUnit(d.ProductID) : 'kg';

      return `<div class="card">
        <div class="row-flex" style="margin-bottom:5px">
      <span class="mono">${o.POID}</span>
          ${isAdmin() ? `<button class="del-btn sm" data-type="order" data-id="${o.POID}">✕</button>` : ''}
        </div>
        <div style="font-size:13px">${productName} · <strong>${qty} ${unit}</strong></div>
        <div class="row-sub">${date} · RM${Number(o.TotalAmount || 0).toFixed(2)}</div>
      </div>`;
    }).join('');
  }

  // ============================================================
  // 业绩报表
  // ============================================================
  function initReportPage() {
    const dateInput = document.getElementById('report-date');
    // 默认今天
    const today = new Date().toISOString().slice(0,10);
    dateInput.value = today;
    queryReport(today);

    document.getElementById('btn-report-query').onclick = function() {
      queryReport(dateInput.value);
    };
    dateInput.onchange = function() {
      queryReport(dateInput.value);
    };
  }

  async function queryReport(dateStr) {
    const container = document.getElementById('report-result');
    if (!dateStr) { container.innerHTML = '<div class="empty">请选择日期</div>'; return; }
    container.innerHTML = '<div class="loading">查询中...</div>';

    try {
      const url = SB + '/purchase_orders?Date=eq.' + encodeURIComponent(dateStr) + '&select=POID,TotalAmount';
      const res = await fetch(url, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      });
      if (!res.ok) throw new Error(await res.text());
      const orders = await res.json();
      let total = 0, count = 0, totalBoxes = 0, items = [];
      for (const o of orders) {
        total += Number(o.TotalAmount || 0);
        count++;
        const url2 = SB + '/po_details?POID=eq.' + encodeURIComponent(o.POID) + '&select=ProductID,QTY';
        const res2 = await fetch(url2, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        if (res2.ok) {
          const details = await res2.json();
          for (const d of details) {
            items.push({ POID: o.POID, ProductID: d.ProductID, QTY: d.QTY });
            totalBoxes += d.QTY;
          }
        }
      }

      if (count === 0) {
        container.innerHTML = '<div class="empty">该日期没有出货记录</div>';
        return;
      }

      let detailHtml = items.map(d => {
        const name = getProdName(d.ProductID);
        const unit = getProdUnit(d.ProductID);
        return `<div style="font-size:13px;padding:4px 0;border-bottom:1px solid var(--border)">${escapeHTML(name)} · ${d.QTY} ${unit}</div>`;
      }).join('');

      container.innerHTML = `<div class="card" style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:14px;color:var(--text2)">${dateStr}</span>
          <span style="font-size:14px;color:var(--text2)">${count} 单</span>
        </div>
        <div style="font-size:28px;font-weight:bold;color:var(--blue);margin:8px 0">RM ${total.toFixed(2)}</div>
        <div style="font-size:16px;color:var(--text2)">总箱数: ${totalBoxes}</div>
      </div>
      <div class="section-title" style="margin-top:16px">出货明细</div>
      ${detailHtml}`;
    } catch (e) {
      container.innerHTML = '<div class="empty">查询失败: ' + e.message + '</div>';
    }
  }

  function renderCustomers() {
    const q = (document.getElementById('customer-search').value || '').toLowerCase();
    const list = Array.from(state.customers.values())
      .filter(c => (c.CustomerName || '').toLowerCase().includes(q));
    const container = document.getElementById('customer-list');
    if (list.length === 0) {
      container.innerHTML = '<div class="empty">暂无客户</div>';
      return;
    }
    container.innerHTML = list.map(c => {
      let sub = c.CustomerID;
      if (c.Phone) sub += ' · 📞 ' + escapeHTML(c.Phone);
      if (c.Note)  sub += ' · ' + escapeHTML(c.Note);
      return `<div class="card row-flex">
        <div>
          <div class="row-title">${escapeHTML(c.CustomerName)}</div>
          <div class="row-sub">${sub}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:22px">👤</span>
          ${isAdmin() ? `<button class="del-btn" data-type="customer" data-id="${c.CustomerID}">✕</button>` : ''}
        </div>
      </div>`;
    }).join('');
    attachDeleteHandlers(container);
  }

  const debouncedRenderProducts = debounce(renderProducts, 250);
  const debouncedRenderSuppliers = debounce(renderSuppliers, 250);
  const debouncedRenderCustomers = debounce(renderCustomers, 250);

  // ============================================================
  // 页面切换
  // ============================================================
  function switchPage(page, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    if (btn) btn.classList.add('active');
    state.currentPage = page;
    renderCurrentPage();

    // 根据页面控制 FAB
    const fab = document.getElementById('fab');
    fab.style.display = canShowFab(page) ? 'flex' : 'none';
  }

  // ============================================================
  // Modal 控制
  // ============================================================
  const PAGE_MODAL_MAP = {
    dashboard:  'modal-si',
    stockin:    'modal-si',
    products:   'modal-prod',
    orders:     'modal-order',
    suppliers:  'modal-supplier',
    customers:  'modal-customer'
  };

  function openModal() {
    const modalId = PAGE_MODAL_MAP[state.currentPage];
    if (!modalId) return;
    // 权限检查
    if (!canUseModal(modalId)) {
      showToast('你没有权限执行此操作', 'err');
      return;
    }
    state.currentModal = modalId;
    document.getElementById(modalId).classList.add('open');
    // 打开 modal 后更新一次单位标签
    updateQtyLabels();
  }

  function closeModal() {
    if (state.currentModal) {
      document.getElementById(state.currentModal).classList.remove('open');
      state.currentModal = null;
    }
  }

  // ============================================================
  // 表单提交
  // ============================================================
  async function submitStockIn() {
    if (!canUseModal('modal-si')) { showToast('无权操作', 'err'); return; }
    const qty = parseInt(document.getElementById('f-qty').value);
    if (!qty || qty < 1) { showToast('请输入正确数量', 'err'); return; }
    const btn = document.getElementById('btn-si');
    btn.disabled = true;
    btn.textContent = '提交中...';
    try {
      const now = new Date();
      const dateStr = now.toISOString().slice(0,10);
      const timeStr = now.toTimeString().slice(0,8);
      const uid = Math.random().toString(36).slice(2, 6);
      const stockInID = `S01-${dateStr.replace(/-/g,'').slice(2)}-${uid}`;
      const detailID = Math.random().toString(36).slice(2, 10);
      const supplierID = document.getElementById('f-sup').value;
      const productID = document.getElementById('f-prod').value;
      const unit = getProdUnit(productID);

      await sbPost('stock_ins', { StockInID: stockInID, Date: dateStr, Time: timeStr, SupplierID: supplierID });
      await sbPost('stock_in_details', { DetailID: detailID, StockInID: stockInID, ProductID: productID, Qty: qty });

      const prod = getProd(productID);
      if (prod) {
        await sbPatch('products', 'ProductID', productID, { StockBalance: (Number(prod.StockBalance) || 0) + qty });
      }

      showToast('进货成功！', 'ok');
      document.getElementById('f-qty').value = '';
      closeModal();
      await loadAll();
    } catch (e) {
      showToast('提交失败: ' + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = '确认进货';
  }

  async function submitProduct() {
    if (!canUseModal('modal-prod')) { showToast('无权操作', 'err'); return; }
    const name = document.getElementById('np-name').value.trim();
    if (!name) { showToast('请输入产品名称', 'err'); return; }
    const btn = document.getElementById('btn-prod');
    btn.disabled = true;
    btn.textContent = '添加中...';
    try {
      const ts = Date.now().toString(36).slice(-4);
      const rnd = Math.random().toString(36).slice(2, 4);
      const newPID = 'p' + ts + rnd;
      await sbPost('products', {
        ProductID: newPID,
        ProductName: name,
        Grade: document.getElementById('np-grade').value,
        Unit: document.getElementById('np-unit').value,
        StockBalance: 0
      });
      showToast('产品已添加！', 'ok');
      document.getElementById('np-name').value = '';
      closeModal();
      await loadAll();
    } catch (e) {
      showToast('提交失败: ' + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = '添加产品';
  }

  async function submitCustomer() {
    if (!canUseModal('modal-customer')) { showToast('无权操作', 'err'); return; }
    const name = document.getElementById('nc-name').value.trim();
    if (!name) { showToast('请输入客户名称', 'err'); return; }
    const btn = document.getElementById('btn-customer');
    btn.disabled = true;
    btn.textContent = '添加中...';
    try {
      const ts = Date.now().toString(36).slice(-4).toUpperCase();
      const rnd = Math.random().toString(36).slice(2, 4).toUpperCase();
      const newCID = 'C' + ts + rnd;
      await sbPost('customers', {
        CustomerID: newCID,
        CustomerName: name,
        Phone: document.getElementById('nc-phone').value.trim(),
        Note: document.getElementById('nc-note').value.trim()
      });
      showToast('客户已添加！', 'ok');
      document.getElementById('nc-name').value = '';
      document.getElementById('nc-phone').value = '';
      document.getElementById('nc-note').value = '';
      closeModal();
      auditLog('新增客户', newCID, name);
      await loadAll();
    } catch (e) {
      showToast('提交失败: ' + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = '添加客户';
  }

  async function submitSupplier() {
    if (!canUseModal('modal-supplier')) { showToast('无权操作', 'err'); return; }
    const name = document.getElementById('ns-name').value.trim();
    if (!name) { showToast('请输入供应商名称', 'err'); return; }
    const btn = document.getElementById('btn-supplier');
    btn.disabled = true;
    btn.textContent = '添加中...';
    try {
      const ts = Date.now().toString(36).slice(-4).toUpperCase();
      const rnd = Math.random().toString(36).slice(2, 4).toUpperCase();
      const newSID = 'S' + ts + rnd;
      await sbPost('suppliers', {
        SupplierID: newSID,
        SupplierName: name,
        Phone: document.getElementById('ns-phone').value.trim(),
        Note: document.getElementById('ns-note').value.trim()
      });
      showToast('供应商已添加！', 'ok');
      document.getElementById('ns-name').value = '';
      document.getElementById('ns-phone').value = '';
      document.getElementById('ns-note').value = '';
      closeModal();
      await loadAll();
    } catch (e) {
      showToast('提交失败: ' + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = '添加供应商';
  }

  async function submitOrder() {
    if (!canUseModal('modal-order')) { showToast('无权操作', 'err'); return; }
    const qty = parseInt(document.getElementById('o-qty').value);
    if (!qty || qty < 1) { showToast('请输入正确数量', 'err'); return; }
    const btn = document.getElementById('btn-order');
    btn.disabled = true;
    btn.textContent = '出货中...';
    try {
      const now = new Date();
      const dateStr = now.toISOString().slice(0,10);
      const timeStr = now.toTimeString().slice(0,8);
      const uid = Math.random().toString(36).slice(2, 6);
      const poID = `PO-${dateStr.replace(/-/g,'').slice(2)}-${uid}`;
      const detailID = Math.random().toString(36).slice(2, 10);
      const productID = document.getElementById('o-prod').value;
      const unit = getProdUnit(productID);

      await sbPost('purchase_orders', { POID: poID, Date: dateStr, Time: timeStr, CustomerID: '', Status: 'done', TotalAmount: parseFloat(document.getElementById('o-amount').value) || 0 });
      await sbPost('po_details', { DetailID: detailID, POID: poID, ProductID: productID, QTY: qty });

      // 创建即扣库存
      const prod = getProd(productID);
      if (prod) {
        const newBalance = (Number(prod.StockBalance) || 0) - qty;
        await sbPatch('products', 'ProductID', productID, { StockBalance: newBalance });
      }

      showToast('出货 已创建！', 'ok');
      document.getElementById('o-qty').value = '';
      closeModal();
      await loadAll();
    } catch (e) {
      showToast('提交失败: ' + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = '创建出货';
  }

  // ============================================================
  // 删除功能（仅 admin）
  // ============================================================
  function attachDeleteHandlers(container) {
    container.querySelectorAll('.del-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        if (!isAdmin()) { showToast('无权操作', 'err'); return; }
        if (!confirm('确定要删除吗？此操作不可撤销。')) return;

        const type = this.dataset.type;
        const id = this.dataset.id;
        this.disabled = true;
        this.textContent = '...';

        try {
          if (type === 'product') {
            await sbDelete('products', 'ProductID', id);
          } else if (type === 'supplier') {
            await sbDelete('suppliers', 'SupplierID', id);
          } else if (type === 'stockin') {
            await sbDelete('stock_ins', 'StockInID', id);
            await sbDelete('stock_in_details', 'StockInID', id).catch(() => {});
          } else if (type === 'order') {
            await sbDelete('purchase_orders', 'POID', id);
            await sbDelete('po_details', 'POID', id).catch(() => {});
          }
          showToast('删除成功', 'ok');
          await loadAll();
        } catch (e) {
          showToast('删除失败: ' + e.message, 'err');
          this.disabled = false;
          this.textContent = '✕';
        }
      });
    });
  }

  // ============================================================
  // 新增用户（仅 admin）
  // ============================================================
  async function submitAddUser() {
    if (!isAdmin()) { showToast('无权操作', 'err'); return; }
    const username = document.getElementById('au-user').value.trim();
    const display = document.getElementById('au-display').value.trim();
    const password = document.getElementById('au-pass').value.trim();
    const role = document.getElementById('au-role').value;
    if (!username || !display || !password) { showToast('请填写所有字段', 'err'); return; }
    const btn = document.getElementById('btn-adduser');
    btn.disabled = true;
    btn.textContent = '添加中...';
    try {
      // 检查用户名是否已存在
      const exist = await sbGetFiltered('users', 'Username', username, { select: 'Username' });
      if (exist && exist.length > 0) { showToast('用户名已存在', 'err'); btn.disabled = false; btn.textContent = '添加用户'; return; }
      await sbPost('users', { Username: username, DisplayName: display, Password: password, Role: role });
      showToast('用户 ' + display + ' 已添加！', 'ok');
      document.getElementById('au-user').value = '';
      document.getElementById('au-display').value = '';
      document.getElementById('au-pass').value = '';
      closeModal();
    } catch (e) {
      showToast('添加失败: ' + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = '添加用户';
  }

  // ============================================================
  // 修改密码（所有人可用）
  // ============================================================
  async function submitChangePassword() {
    const oldPw = document.getElementById('cp-old').value.trim();
    const newPw = document.getElementById('cp-new').value.trim();
    const confirmPw = document.getElementById('cp-confirm').value.trim();
    if (!oldPw || !newPw || !confirmPw) { showToast('请填写所有字段', 'err'); return; }
    if (newPw !== confirmPw) { showToast('两次新密码不一致', 'err'); return; }
    const btn = document.getElementById('btn-changepw');
    btn.disabled = true;
    btn.textContent = '修改中...';
    try {
      // 验证当前密码
      const users = await sbGetFiltered('users', 'Username', currentUser.Username, { select: '*' });
      if (!users || users.length === 0) { showToast('用户不存在', 'err'); btn.disabled = false; btn.textContent = '修改密码'; return; }
      if (users[0].Password !== oldPw) { showToast('当前密码错误', 'err'); btn.disabled = false; btn.textContent = '修改密码'; return; }
      await sbPatch('users', 'Username', currentUser.Username, { Password: newPw });
      showToast('密码修改成功！', 'ok');
      document.getElementById('cp-old').value = '';
      document.getElementById('cp-new').value = '';
      document.getElementById('cp-confirm').value = '';
      closeModal();
    } catch (e) {
      showToast('修改失败: ' + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = '修改密码';
  }

  // ============================================================
  // 初始化
  // ============================================================
  function init() {
    // 处理登录/登出
    document.getElementById('login-btn').addEventListener('click', doLogin);
    document.getElementById('login-pass').addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
    document.getElementById('user-display').addEventListener('click', doLogout);

    // 添加用户 / 修改密码按钮
    document.getElementById('btn-add-user').addEventListener('click', function() {
      state.currentModal = 'modal-adduser';
      document.getElementById('modal-adduser').classList.add('open');
    });
    document.getElementById('btn-change-pw').addEventListener('click', function() {
      state.currentModal = 'modal-changepw';
      document.getElementById('modal-changepw').classList.add('open');
    });

    // 导航
    document.querySelector('.nav').addEventListener('click', function(e) {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      e.preventDefault();
      const page = btn.dataset.page;
      if (page) switchPage(page, btn);
    });

    // 搜索
    document.getElementById('product-search').addEventListener('input', debouncedRenderProducts);
    document.getElementById('supplier-search').addEventListener('input', debouncedRenderSuppliers);
    document.getElementById('customer-search').addEventListener('input', debouncedRenderCustomers);

    // 产品选择 change 事件 → 更新数量单位标签
    document.getElementById('f-prod').addEventListener('change', updateQtyLabels);
    document.getElementById('o-prod').addEventListener('change', updateQtyLabels);

    // 按钮
    document.getElementById('fab').addEventListener('click', openModal);
    document.getElementById('sync-btn').addEventListener('click', () => loadAll());

    // Modal 背景点击关闭
    document.querySelectorAll('.modal-bg').forEach(m => {
      m.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
      });
    });

    // 表单提交
    document.getElementById('btn-si').addEventListener('click', submitStockIn);
    document.getElementById('btn-prod').addEventListener('click', submitProduct);
    document.getElementById('btn-customer').addEventListener('click', submitCustomer);
    document.getElementById('btn-supplier').addEventListener('click', submitSupplier);
    document.getElementById('btn-order').addEventListener('click', submitOrder);
    document.getElementById('btn-adduser').addEventListener('click', submitAddUser);
    document.getElementById('btn-changepw').addEventListener('click', submitChangePassword);

    // 取消按钮关闭
    document.querySelectorAll('.btn-cancel').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    // Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }

    // 检查登录状态
    if (currentUser) {
      // 已登录，直接加载
      document.getElementById('page-login').classList.remove('active');
      document.getElementById('app-main').style.display = 'flex';
      applyPermissions();
      loadAll();
    } else {
      // 未登录，显示登录页
      document.getElementById('page-login').classList.add('active');
      document.getElementById('app-main').style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
