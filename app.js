/* ===== GMPos 库存系统 v1 - 永平版 ===== */
(function() {
  'use strict';

  // ============================================================
  // 国际化
  // ============================================================
  const LANG = {
    zh: {
      // 登录
      login: '登录',
      username: '用户名',
      password: '密码',
      loginSub: '请登录以继续',
      loginBtn: '登录',
      loginErr: '请输入用户名和密码',
      userNotFound: '用户不存在',
      wrongPwd: '密码错误',
      loggingIn: '登录中...',
      welcome: '欢迎，',
      logout: '退出',
      // 导航
      home: '主页',
      products: '产品',
      stockin: '进货',
      orders: '出货',
      report: '业绩',
      suppliers: '供应商',
      // 主页
      totalProducts: '产品总类',
      totalStock: '总库存',
      stockinRecords: '进货记录',
      stockOverview: '库存概览',
      recentStockin: '最近进货',
      noProducts: '暂无产品',
      noStockin: '暂无进货记录',
      grade: '等级',
      unit_pcs: '件',
      search: '搜索',
      noProductFound: '没有找到产品',
      noSupplier: '暂无供应商',
      sufficient: '充足',
      medium: '偏低',
      low: '告急',
      loading: '加载中...',
      synced: '已同步',
      loadFailed: '加载失败',
      // 进货
      newStockin: '新增进货',
      confirmStockin: '确认进货',
      submitting: '提交中...',
      stockinSuccess: '进货成功！',
      qty: '数量',
      cancel: '取消',
      supplier: '供应商',
      product: '产品',
      searchDO: '搜索 DO 号码...',
      noPermission: '无权操作',
      submitFail: '提交失败: ',
      // 出货
      newOrder: '出货',
      confirmOrder: '出货',
      ordering: '出货中...',
      orderSuccess: '出货 已创建！',
      orderPending: '待确认',
      orderDone: '已完成',
      orderCancelled: '已取消',
      orderConfirm: '确认完成',
      orderCancel: '取消',
      orderEdit: '编辑',
      editOrder: '编辑出货',
      orderUpdated: '订单已更新！',
      addOrderItem: '添加产品',
      chooseProduct: '选择产品',
      unitPrice: '单价',
      lineTotal: '小计',
      itemTotal: '明细合计',
      priceRequired: '请输入单价',
      searchInvoice: '搜索 Invoice No...',
      totalAmount: '总金额 (RM)',
      invoiceNo: 'Invoice No',
      autoGenerate: '自动生成',
      noOrders: '暂无出货记录',
      // 产品
      newProduct: '新增产品',
      addProduct: '添加产品',
      adding: '添加中...',
      productAdded: '产品已添加！',
      productName: '产品名称',
      // 供应商
      newSupplier: '新增供应商',
      addSupplier: '添加供应商',
      supplierAdded: '供应商已添加！',
      supplierName: '供应商名称',
      phone: '联系电话（可选）',
      note: '备注（可选）',
      // 业绩
      reportTitle: '业绩报表',
      query: '查询',
      selectDate: '选择日期查询业绩',
      orderDetail: '出货明细',
      productSummary: '产品汇总',
      invoiceDetail: '单据明细',
      totalBoxes: '总箱数',
      avgOrder: '平均每单',
      totalRevenue: '总销售额',
      noOrdersDate: '该日期没有出货记录',
      queryFail: '查询失败: ',
      orders_n: '单',
      // 通用
      delete: '删除',
      confirmDelete: '确定要删除吗？此操作不可撤销。',
      deleteSuccess: '删除成功',
      deleteFail: '删除失败: ',
      // 用户管理
      addUser: '新增用户',
      addUserBtn: '添加用户',
      addingUser: '添加中...',
      userAdded: ' 已添加！',
      userExists: '用户名已存在',
      displayName: '显示名称',
      role: '角色',
      admin: '管理员',
      sales: '销售员',
      changePwd: '修改密码',
      currentPwd: '当前密码',
      newPwd: '新密码',
      confirmPwd: '确认新密码',
      pwdChanged: '密码修改成功！',
      pwdMismatch: '两次新密码不一致',
      wrongCurrentPwd: '当前密码错误',
      fillAll: '请填写所有字段',
      // 印尼文专用
      langName: '中文'
    },
    id: {
      login: 'Masuk',
      username: 'Nama Pengguna',
      password: 'Kata Sandi',
      loginSub: 'Silakan masuk untuk melanjutkan',
      loginBtn: 'Masuk',
      loginErr: 'Masukkan nama pengguna dan kata sandi',
      userNotFound: 'Pengguna tidak ditemukan',
      wrongPwd: 'Kata sandi salah',
      loggingIn: 'Memproses...',
      welcome: 'Selamat datang, ',
      logout: 'Keluar',
      home: 'Beranda',
      products: 'Produk',
      stockin: 'Stok Masuk',
      orders: 'Stok Keluar',
      report: 'Kinerja',
      suppliers: 'Pemasok',
      totalProducts: 'Total Produk',
      totalStock: 'Total Stok',
      stockinRecords: 'Catatan Masuk',
      stockOverview: 'Ringkasan Stok',
      recentStockin: 'Terbaru Masuk',
      noProducts: 'Belum ada produk',
      noStockin: 'Belum ada catatan masuk',
      grade: 'Grade',
      unit_pcs: 'item',
      search: 'Cari',
      noProductFound: 'Produk tidak ditemukan',
      noSupplier: 'Belum ada pemasok',
      sufficient: 'Tersedia',
      medium: 'Sedang',
      low: 'Menipis',
      loading: 'Memuat...',
      synced: 'Sinkron',
      loadFailed: 'Gagal muat',
      newStockin: 'Tambah Stok Masuk',
      confirmStockin: 'Simpan Masuk',
      submitting: 'Mengirim...',
      stockinSuccess: 'Stok masuk berhasil!',
      qty: 'Jumlah',
      cancel: 'Batal',
      supplier: 'Pemasok',
      product: 'Produk',
      searchDO: 'Cari DO...',
      noPermission: 'Tidak ada akses',
      submitFail: 'Gagal kirim: ',
      newOrder: 'Stok Keluar',
      confirmOrder: 'Stok Keluar',
      ordering: 'Memproses...',
      orderSuccess: 'Stok keluar berhasil!',
      orderPending: 'Menunggu',
      orderDone: 'Selesai',
      orderCancelled: 'Dibatalkan',
      orderConfirm: 'Selesaikan',
      orderCancel: 'Batal',
      orderEdit: 'Edit',
      editOrder: 'Edit Stok Keluar',
      orderUpdated: 'Pesanan diperbarui!',
      addOrderItem: 'Tambah Produk',
      chooseProduct: 'Pilih Produk',
      unitPrice: 'Harga',
      lineTotal: 'Subtotal',
      itemTotal: 'Total Item',
      priceRequired: 'Masukkan harga',
      searchInvoice: 'Cari Invoice...',
      totalAmount: 'Total (RM)',
      invoiceNo: 'Invoice No',
      autoGenerate: 'Otomatis',
      noOrders: 'Belum ada catatan keluar',
      newProduct: 'Tambah Produk',
      addProduct: 'Tambah Produk',
      adding: 'Menambah...',
      productAdded: 'Produk ditambahkan!',
      productName: 'Nama Produk',
      newSupplier: 'Tambah Pemasok',
      addSupplier: 'Tambah Pemasok',
      supplierAdded: 'Pemasok ditambahkan!',
      supplierName: 'Nama Pemasok',
      phone: 'Telepon (opsional)',
      note: 'Catatan (opsional)',
      reportTitle: 'Laporan Kinerja',
      query: 'Cari',
      selectDate: 'Pilih tanggal untuk melihat laporan',
      orderDetail: 'Detail Stok Keluar',
      productSummary: 'Ringkasan Produk',
      invoiceDetail: 'Detail Invoice',
      totalBoxes: 'Total Box',
      avgOrder: 'Rata-rata',
      totalRevenue: 'Total Jualan',
      noOrdersDate: 'Tidak ada catatan pada tanggal ini',
      queryFail: 'Gagal cari: ',
      orders_n: ' pesanan',
      delete: 'Hapus',
      confirmDelete: 'Yakin hapus? Tindakan ini tidak bisa dibatalkan.',
      deleteSuccess: 'Berhasil dihapus',
      deleteFail: 'Gagal hapus: ',
      addUser: 'Tambah Pengguna',
      addUserBtn: 'Tambah Pengguna',
      addingUser: 'Menambah...',
      userAdded: ' ditambahkan!',
      userExists: 'Nama pengguna sudah ada',
      displayName: 'Nama Tampilan',
      role: 'Peran',
      admin: 'Admin',
      sales: 'Sales',
      changePwd: 'Ganti Kata Sandi',
      currentPwd: 'Kata Sandi Saat Ini',
      newPwd: 'Kata Sandi Baru',
      confirmPwd: 'Konfirmasi Kata Sandi',
      pwdChanged: 'Kata sandi berhasil diganti!',
      pwdMismatch: 'Kata sandi baru tidak cocok',
      wrongCurrentPwd: 'Kata sandi saat ini salah',
      fillAll: 'Isi semua bidang',
      langName: 'Indonesia'
    },
    en: {
      login: 'Login',
      username: 'Username',
      password: 'Password',
      loginSub: 'Please login to continue',
      loginBtn: 'Login',
      loginErr: 'Enter username and password',
      userNotFound: 'User not found',
      wrongPwd: 'Wrong password',
      loggingIn: 'Logging in...',
      welcome: 'Welcome, ',
      logout: 'Logout',
      home: 'Dashboard',
      products: 'Products',
      stockin: 'Stock In',
      orders: 'Stock Out',
      report: 'Report',
      suppliers: 'Suppliers',
      totalProducts: 'Total Products',
      totalStock: 'Total Stock',
      stockinRecords: 'Stock In Records',
      stockOverview: 'Stock Overview',
      recentStockin: 'Recent Stock In',
      noProducts: 'No products',
      noStockin: 'No stock in records',
      grade: 'Grade',
      unit_pcs: 'item',
      search: 'Search',
      noProductFound: 'No products found',
      noSupplier: 'No suppliers',
      sufficient: 'Sufficient',
      medium: 'Medium',
      low: 'Low',
      loading: 'Loading...',
      synced: 'Synced',
      loadFailed: 'Load failed',
      newStockin: 'New Stock In',
      confirmStockin: 'Confirm Stock In',
      submitting: 'Submitting...',
      stockinSuccess: 'Stock in successful!',
      qty: 'Qty',
      cancel: 'Cancel',
      supplier: 'Supplier',
      product: 'Product',
      searchDO: 'Search DO number...',
      noPermission: 'No permission',
      submitFail: 'Submit failed: ',
      newOrder: 'New Order',
      confirmOrder: 'Confirm Order',
      ordering: 'Processing order...',
      orderSuccess: 'Order created!',
      orderPending: 'Pending',
      orderDone: 'Done',
      orderCancelled: 'Cancelled',
      orderConfirm: 'Mark Done',
      orderCancel: 'Cancel',
      orderEdit: 'Edit',
      editOrder: 'Edit Order',
      orderUpdated: 'Order updated!',
      addOrderItem: 'Add Product',
      chooseProduct: 'Choose Product',
      unitPrice: 'Unit Price',
      lineTotal: 'Line Total',
      itemTotal: 'Item Total',
      priceRequired: 'Enter unit price',
      searchInvoice: 'Search Invoice No...',
      totalAmount: 'Total Amount (RM)',
      invoiceNo: 'Invoice No',
      autoGenerate: 'Auto generate',
      noOrders: 'No orders yet',
      newProduct: 'New Product',
      addProduct: 'Add Product',
      adding: 'Adding...',
      productAdded: 'Product added!',
      productName: 'Product Name',
      newSupplier: 'New Supplier',
      addSupplier: 'Add Supplier',
      supplierAdded: 'Supplier added!',
      supplierName: 'Supplier Name',
      phone: 'Phone (optional)',
      note: 'Note (optional)',
      reportTitle: 'Sales Report',
      query: 'Query',
      selectDate: 'Select date to view report',
      orderDetail: 'Order Details',
      productSummary: 'Product Summary',
      invoiceDetail: 'Invoice Details',
      totalBoxes: 'Total Boxes',
      avgOrder: 'Average Order',
      totalRevenue: 'Total Sales',
      noOrdersDate: 'No orders on this date',
      queryFail: 'Query failed: ',
      orders_n: ' order(s)',
      delete: 'Delete',
      confirmDelete: 'Delete? This cannot be undone.',
      deleteSuccess: 'Delete successful',
      deleteFail: 'Delete failed: ',
      addUser: 'Add User',
      addUserBtn: 'Add User',
      addingUser: 'Adding...',
      userAdded: ' added!',
      userExists: 'Username already exists',
      displayName: 'Display Name',
      role: 'Role',
      admin: 'Admin',
      sales: 'Sales',
      changePwd: 'Change Password',
      currentPwd: 'Current Password',
      newPwd: 'New Password',
      confirmPwd: 'Confirm New Password',
      pwdChanged: 'Password changed!',
      pwdMismatch: 'New passwords do not match',
      wrongCurrentPwd: 'Current password is wrong',
      fillAll: 'Fill all fields',
      langName: 'English'
    }
  };

  let currentLang = localStorage.getItem('gmpos_lang') || 'zh';
  function t(key) { return (LANG[currentLang] || LANG.zh)[key] || key; }

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
  let orderDraftRows = [];
  let poDetailsAmountColumnsReady = true;

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
    if (role === 'sales') return !['suppliers'].includes(page);
    return true;
  }

  function canShowFab(page) {
    if (!currentUser) return false;
    const role = currentUser.Role;
    // 只在有对应 modal 的页面显示 + 号
    const fabPages = ['stockin', 'products', 'orders', 'suppliers'];
    if (!fabPages.includes(page)) return false;
    if (role === 'admin') return true;
    if (role === 'sales') return ['orders', 'stockin', 'products'].includes(page);
    return false;
  }

  function canUseModal(modalId) {
    if (!currentUser) return false;
    const role = currentUser.Role;
    // 所有 modal 只能 admin 操作，除了进货（purchase）和出货（sales）
    if (role === 'admin') return true;
    if (role === 'sales') return ['modal-si', 'modal-order', 'modal-prod'].includes(modalId);
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
    ud.textContent = '👤 ' + currentUser.DisplayName + ' (' + t('logout') + ')';
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
    errEl.textContent = t('loginErr');
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';

    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = t('loggingIn');
    try {
      const users = await sbGetFiltered('users', 'Username', username, { select: '*' });
      if (!users || users.length === 0) {
        errEl.textContent = t('userNotFound');
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = t('loginBtn');
        return;
      }
      const user = users[0];
      if (user.Password !== password) {
        errEl.textContent = t('wrongPwd');
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = t('loginBtn');
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
      showToast(t('welcome') + currentUser.DisplayName + '！', 'ok');
      loadAll();
    } catch (e) {
      errEl.textContent = t('submitFail') + e.message;
      errEl.style.display = 'block';
    }
    btn.disabled = false;
    btn.textContent = t('loginBtn');
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
    showToast(t('logout'), 'ok');
  }

  // ============================================================
  // 数据加载
  // ============================================================
  async function loadAll() {
    if (state.loading) return;
    state.loading = true;
    const btn = document.getElementById('sync-btn');
    btn.disabled = true;
    btn.textContent = t('loading');

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

      const now = new Date();
      document.getElementById('sync-time').textContent = t('synced') + ' ' + now.toTimeString().slice(0,5);
    } catch (e) {
      showToast(t('loadFailed') + ': ' + e.message, 'err');
      document.getElementById('sync-time').textContent = t('loadFailed');
    }

    btn.disabled = false;
    btn.textContent = '↻ ' + t('刷新');
    state.loading = false;
  }

  // ============================================================
  // 数据解析
  // ============================================================
  function buildIndexes(data) {
    state.products = new Map((data.products || []).map(p => [p.ProductID, p]));
    state.suppliers = new Map((data.suppliers || []).map(s => [s.SupplierID, s]));
    state.stockIns = data.stockIns || [];
    state.stockInDetails = new Map();
    (data.stockInDetails || []).forEach(d => {
      if (!state.stockInDetails.has(d.StockInID)) state.stockInDetails.set(d.StockInID, []);
      state.stockInDetails.get(d.StockInID).push(d);
    });
    state.orders = data.orders || [];
    state.orderDetails = new Map();
    (data.orderDetails || []).forEach(d => {
      if (!state.orderDetails.has(d.POID)) state.orderDetails.set(d.POID, []);
      state.orderDetails.get(d.POID).push(d);
    });

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

    ['f-prod'].forEach(id => {
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

  function getOrderDetails(poID) {
    const details = state.orderDetails.get(poID);
    if (!details) return [];
    return Array.isArray(details) ? details : [details];
  }

  function getFirstOrderDetail(poID) {
    return getOrderDetails(poID)[0] || null;
  }

  function getStockInDetails(siID) {
    const details = state.stockInDetails.get(siID);
    if (!details) return [];
    return Array.isArray(details) ? details : [details];
  }

  function getFirstStockInDetail(siID) {
    return getStockInDetails(siID)[0] || null;
  }

  function renderOrderDetailsHtml(poID) {
    const details = getOrderDetails(poID);
    if (details.length === 0) return '<div style="font-size:13px">-</div>';
    return details.map(d => {
      const productName = escapeHTML(getProdName(d.ProductID));
      const unit = getProdUnit(d.ProductID);
      const amount = Number(d.LineAmount || d.Amount || 0);
      const money = amount ? `<em>RM ${amount.toFixed(2)}</em>` : '';
      return `<div class="order-detail-line">
        <span>${productName}</span>
        <strong>${Number(d.QTY || 0)} ${unit}${money}</strong>
      </div>`;
    }).join('');
  }

  function renderStockInDetailsHtml(siID) {
    const details = getStockInDetails(siID);
    if (details.length === 0) return '<div style="font-size:13px">-</div>';
    return details.map(d => {
      const productName = escapeHTML(getProdName(d.ProductID));
      const unit = getProdUnit(d.ProductID);
      return `<div class="order-detail-line">
        <span>${productName}</span>
        <strong>${Number(d.Qty || 0)} ${unit}</strong>
      </div>`;
    }).join('');
  }

  function orderMatchesSearch(order, query) {
    if (!query) return true;
    const haystack = [
      order.POID,
      order.Date,
      order.Status,
      order.TotalAmount,
      ...getOrderDetails(order.POID).flatMap(d => [
        d.ProductID,
        getProdName(d.ProductID),
        d.QTY
      ])
    ].join(' ').toLowerCase();
    return haystack.includes(query);
  }

  function productOptions(selectedID) {
    const placeholder = `<option value="" ${selectedID ? '' : 'selected'} disabled>${t('chooseProduct')}</option>`;
    return placeholder + Array.from(state.products.values())
      .map(p => `<option value="${p.ProductID}" ${p.ProductID === selectedID ? 'selected' : ''}>${escapeHTML(p.ProductName)} (${escapeHTML(p.Grade || '')})</option>`)
      .join('');
  }

  function makeOrderDraftRow(detail) {
    const productID = detail && detail.ProductID ? detail.ProductID : '';
    const qty = Number((detail && detail.QTY) || 1);
    const savedPrice = Number((detail && (detail.UnitPrice || detail.Price)) || 0);
    const savedAmount = Number((detail && (detail.LineAmount || detail.Amount)) || 0);
    const unitPrice = savedPrice || (qty > 0 && savedAmount ? savedAmount / qty : '');
    return {
      id: (detail && detail.DetailID) || Math.random().toString(36).slice(2, 10),
      detailID: detail && detail.DetailID,
      productID,
      qty,
      unitPrice
    };
  }

  function resetOrderDraft(details) {
    orderDraftRows = (details && details.length ? details : [null]).map(makeOrderDraftRow);
    renderOrderEditorRows();
  }

  function calculateOrderTotal() {
    return orderDraftRows.reduce((sum, row) => sum + (Number(row.qty || 0) * Number(row.unitPrice || 0)), 0);
  }

  function syncOrderTotal() {
    const amount = document.getElementById('o-amount');
    if (amount) amount.value = calculateOrderTotal().toFixed(2);
    const submit = document.getElementById('btn-order');
    if (submit) submit.disabled = orderDraftRows.length === 0 || calculateOrderTotal() <= 0;
  }

  function updateOrderDraftFromDom() {
    document.querySelectorAll('.order-edit-row').forEach(rowEl => {
      const id = rowEl.dataset.rowId;
      const row = orderDraftRows.find(r => r.id === id);
      if (!row) return;
      row.productID = rowEl.querySelector('.order-product-select').value;
      row.qty = Number(rowEl.querySelector('.order-qty-input').value || 0);
      const priceValue = rowEl.querySelector('.order-price-input').value;
      row.unitPrice = priceValue === '' ? '' : Number(priceValue || 0);
      const line = rowEl.querySelector('.order-line-total');
      if (line) line.textContent = row.qty && row.unitPrice ? 'RM ' + (row.qty * row.unitPrice).toFixed(2) : 'RM --';
    });
    syncOrderTotal();
  }

  function renderOrderEditorRows() {
    const container = document.getElementById('order-item-editor');
    if (!container) return;
    container.innerHTML = orderDraftRows.map(row => `
      <div class="order-edit-row" data-row-id="${row.id}">
        <div class="order-edit-grid">
          <div class="form-group">
            <label class="form-label">${t('product')}</label>
            <select class="order-product-select">${productOptions(row.productID)}</select>
          </div>
          <div class="form-group">
            <label class="form-label">${t('qty')}</label>
            <input class="order-qty-input" type="number" min="1" inputmode="numeric" value="${Number(row.qty || 1)}">
          </div>
          <div class="form-group">
            <label class="form-label">${t('unitPrice')} (RM)</label>
            <input class="order-price-input" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0.00" value="${row.unitPrice === '' ? '' : Number(row.unitPrice || 0).toFixed(2)}">
          </div>
          <div class="form-group">
            <label class="form-label">${t('lineTotal')}</label>
            <div class="order-line-total">${row.qty && row.unitPrice ? 'RM ' + (Number(row.qty || 0) * Number(row.unitPrice || 0)).toFixed(2) : 'RM --'}</div>
          </div>
        </div>
        <button class="order-row-remove" type="button" aria-label="Remove">×</button>
      </div>
    `).join('');

    container.querySelectorAll('select, input').forEach(el => {
      el.addEventListener('input', updateOrderDraftFromDom);
      el.addEventListener('change', updateOrderDraftFromDom);
    });
    container.querySelectorAll('.order-row-remove').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.closest('.order-edit-row').dataset.rowId;
        if (orderDraftRows.length <= 1) {
          showToast(t('fillAll'), 'err');
          return;
        }
        orderDraftRows = orderDraftRows.filter(r => r.id !== id);
        renderOrderEditorRows();
      });
    });
    syncOrderTotal();
  }

  function collectOrderRows() {
    updateOrderDraftFromDom();
    const rows = orderDraftRows.map(row => ({
      detailID: row.detailID,
      ProductID: row.productID,
      QTY: Number(row.qty || 0),
      UnitPrice: Number(row.unitPrice || 0),
      LineAmount: Number(row.qty || 0) * Number(row.unitPrice || 0)
    })).filter(row => row.ProductID);
    if (rows.length === 0 || rows.some(row => !row.QTY || row.QTY < 1)) {
      throw new Error(t('qty'));
    }
    if (rows.some(row => !row.UnitPrice || row.UnitPrice <= 0)) {
      throw new Error(t('priceRequired'));
    }
    return rows;
  }

  function hasOrderDraftData() {
    const invoice = (document.getElementById('o-poid')?.value || '').trim();
    if (invoice) return true;
    return orderDraftRows.some(row =>
      row.productID ||
      Number(row.qty || 0) !== 1 ||
      Number(row.unitPrice || 0) > 0
    );
  }

  async function postOrderDetail(detail) {
    const fullPayload = {
      DetailID: detail.DetailID,
      POID: detail.POID,
      ProductID: detail.ProductID,
      QTY: detail.QTY,
      UnitPrice: detail.UnitPrice,
      LineAmount: detail.LineAmount
    };
    if (poDetailsAmountColumnsReady) {
      try {
        return await sbPost('po_details', fullPayload);
      } catch (e) {
        if (!String(e.message || '').includes('UnitPrice') && !String(e.message || '').includes('LineAmount')) throw e;
        poDetailsAmountColumnsReady = false;
      }
    }
    return sbPost('po_details', {
      DetailID: detail.DetailID,
      POID: detail.POID,
      ProductID: detail.ProductID,
      QTY: detail.QTY
    });
  }

  function stockBadge(n) {
    n = Number(n);
    if (n > 200) return '<span class="badge bg">' + t('sufficient') + '</span>';
    if (n > 50)  return '<span class="badge ba">' + t('medium') + '</span>';
    return '<span class="badge br">' + t('low') + '</span>';
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
      fLabel.textContent = t('qty') + ' (' + unit + ')';
    }
    if (oProd && oLabel) {
      const unit = getProdUnit(oProd.value);
      oLabel.textContent = t('qty') + ' (' + unit + ')';
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
    document.getElementById('s-stock').innerHTML = total + ' <span class="stat-unit">' + t('unit_pcs') + '</span>';
    document.getElementById('s-stockin').textContent = state.stockIns.length;
    document.getElementById('s-suppliers').textContent = state.suppliers.size;

    const prodContainer = document.getElementById('dash-products');
    if (state.products.size === 0) {
      prodContainer.innerHTML = '<div class="empty">' + t('noProducts') + '</div>';
    } else {
      prodContainer.innerHTML = Array.from(state.products.values()).map(p =>
        `<div class="card row-flex">
          <div>
            <div class="row-title">${escapeHTML(p.ProductName)}</div>
            <div class="row-sub">${t('grade')} ${p.Grade || '-'} · ${stockBadge(p.StockBalance)}</div>
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
      recentContainer.innerHTML = '<div class="empty">' + t('noStockin') + '</div>';
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
      container.innerHTML = '<div class="empty">' + t('noProductFound') + '</div>';
      return;
    }
    container.innerHTML = list.map(p =>
      `<div class="card row-flex">
        <div>
          <div class="row-title">${escapeHTML(p.ProductName)}</div>
          <div class="row-sub">${p.ProductID} · ${t('grade')} ${p.Grade || '-'} · ${stockBadge(p.StockBalance)}</div>
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
      container.innerHTML = '<div class="empty">' + t('noSupplier') + '</div>';
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
    const q = (document.getElementById('stockin-search').value || '').toLowerCase();
    const container = document.getElementById('stockin-list');
    const list = state.stockIns.filter(s =>
      s.StockInID.toLowerCase().includes(q) ||
      getSupName(s.SupplierID).toLowerCase().includes(q)
    );
    if (list.length === 0) {
      container.innerHTML = '<div class="empty">' + t('noStockin') + '</div>';
      return;
    }
    container.innerHTML = [...list].reverse().map(s => {
      const date = String(s.Date).slice(0,10);
      const status = s.Status || 'pending';
      let statusBadge = '';
      let actions = '';
      if (status === 'pending') {
        statusBadge = '<span class="badge badge-pending">等待确认</span>';
        actions += `<button class="btn-sm btn-ok" onclick="window.confirmStockIn('${s.StockInID}')">${t('confirmStockin')}</button>`;
        actions += `<button class="btn-sm btn-edit" onclick="window.editStockIn('${s.StockInID}')">${t('orderEdit')}</button>`;
        if (isAdmin()) {
          actions += `<button class="btn-sm btn-cancel" onclick="window.cancelStockIn('${s.StockInID}')">${t('orderCancel')}</button>`;
        }
      } else if (status === 'cancelled') {
        statusBadge = '<span class="badge badge-cancelled">' + t('orderCancelled') + '</span>';
      } else {
        statusBadge = '<span class="badge badge-done">' + t('orderDone') + '</span>';
      }

      return `<div class="card">
        <div class="row-flex" style="margin-bottom:5px">
          <span class="mono">${s.StockInID}</span>
          ${statusBadge}
          ${isAdmin() && status === 'pending' ? `<button class="del-btn sm" onclick="window.deleteStockIn('${s.StockInID}')">✕</button>` : ''}
        </div>
        <div class="order-detail-list">${renderStockInDetailsHtml(s.StockInID)}</div>
        <div class="row-sub">${escapeHTML(getSupName(s.SupplierID))} · ${date}${s.TotalAmount ? ' · RM' + Number(s.TotalAmount).toFixed(2) : ''}</div>
        ${status === 'pending' ? `<div class="row-actions">${actions}</div>` : ''}
      </div>`;
    }).join('');
  }

  function renderOrders() {
    const q = (document.getElementById('order-search').value || '').toLowerCase();
    const container = document.getElementById('orders-list');
    const list = state.orders.filter(o => orderMatchesSearch(o, q));
    if (list.length === 0) {
      container.innerHTML = '<div class="empty">' + t('noOrders') + '</div>';
      return;
    }

    container.innerHTML = [...list].reverse().map(o => {
      const date = String(o.Date).slice(0,10);
      const status = o.Status || 'pending';
      let statusBadge = '';
      let actions = '';
      if (status === 'pending') {
        statusBadge = '<span class="badge badge-pending">' + t('orderPending') + '</span>';
        actions += `<button class="btn-sm btn-ok" onclick="window.confirmOrder('${o.POID}')">${t('orderConfirm')}</button>`;
        actions += `<button class="btn-sm btn-edit" onclick="window.editOrder('${o.POID}')">${t('orderEdit')}</button>`;
        if (isAdmin()) {
          actions += `<button class="btn-sm btn-cancel" onclick="window.cancelOrder('${o.POID}')">${t('orderCancel')}</button>`;
        }
      } else if (status === 'cancelled') {
        statusBadge = '<span class="badge badge-cancelled">' + t('orderCancelled') + '</span>';
      } else {
        statusBadge = '<span class="badge badge-done">' + t('orderDone') + '</span>';
      }

      return `<div class="card">
        <div class="row-flex" style="margin-bottom:5px">
          <span class="mono">${o.POID}</span>
          ${statusBadge}
          ${isAdmin() && status === 'pending' ? `<button class="del-btn sm" onclick="window.deleteOrder('${o.POID}')">✕</button>` : ''}
        </div>
        <div class="order-detail-list">${renderOrderDetailsHtml(o.POID)}</div>
        <div class="row-sub">${date} · RM${Number(o.TotalAmount || 0).toFixed(2)}</div>
        ${status === 'pending' ? `<div class="row-actions">${actions}</div>` : ''}
      </div>`;
    }).join('');
    attachDeleteHandlers(container);
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
    if (!dateStr) { container.innerHTML = '<div class="empty">' + t('selectDate') + '</div>'; return; }
    container.innerHTML = '<div class="loading">' + t('loading') + '</div>';

    try {
      const url = SB + '/purchase_orders?Date=eq.' + encodeURIComponent(dateStr) + '&Status=eq.done&select=POID,Time,TotalAmount&order=Time';
      const res = await fetch(url, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      });
      if (!res.ok) throw new Error(await res.text());
      const orders = await res.json();
      let total = 0, count = 0, totalBoxes = 0;
      const productSummary = new Map();
      const orderRows = [];
      for (const o of orders) {
        total += Number(o.TotalAmount || 0);
        count++;
        const url2 = SB + '/po_details?POID=eq.' + encodeURIComponent(o.POID) + '&select=ProductID,QTY';
        const res2 = await fetch(url2, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        const orderItems = [];
        if (res2.ok) {
          const details = await res2.json();
          for (const d of details) {
            const qty = Number(d.QTY || 0);
            const name = getProdName(d.ProductID);
            const unit = getProdUnit(d.ProductID);
            totalBoxes += qty;
            orderItems.push({ ProductID: d.ProductID, name, unit, qty });

            const key = d.ProductID;
            const current = productSummary.get(key) || { ProductID: key, name, unit, qty: 0 };
            current.qty += qty;
            productSummary.set(key, current);
          }
        }
        orderRows.push({ POID: o.POID, Time: o.Time, TotalAmount: Number(o.TotalAmount || 0), items: orderItems });
      }

      if (count === 0) {
        container.innerHTML = '<div class="empty">' + t('noOrdersDate') + '</div>';
        return;
      }

      const productHtml = Array.from(productSummary.values())
        .sort((a, b) => b.qty - a.qty || a.name.localeCompare(b.name))
        .map(p => `<div class="report-line">
          <span>${escapeHTML(p.name)}</span>
          <strong>${p.qty} ${escapeHTML(p.unit)}</strong>
        </div>`)
        .join('');

      const orderHtml = orderRows.map(o => {
        const itemHtml = o.items.map(item => `<div class="report-order-item">
          <span>${escapeHTML(item.name)}</span>
          <strong>${item.qty} ${escapeHTML(item.unit)}</strong>
        </div>`).join('');
        return `<div class="card report-order-card">
          <div class="row-flex">
            <span class="mono">${escapeHTML(o.POID)}</span>
            <strong>RM ${o.TotalAmount.toFixed(2)}</strong>
          </div>
          <div class="row-sub">${String(o.Time || '').slice(0,5)}</div>
          <div class="report-order-items">${itemHtml || '-'}</div>
        </div>`;
      }).join('');

      container.innerHTML = `<div class="report-summary">
        <div class="report-total-card">
          <div class="report-label">${t('totalRevenue')}</div>
          <div class="report-total">RM ${total.toFixed(2)}</div>
          <div class="report-date">${dateStr}</div>
        </div>
        <div class="report-metrics">
          <div><span>${count}</span><small>${t('orders_n')}</small></div>
          <div><span>${totalBoxes}</span><small>${t('totalBoxes')}</small></div>
          <div><span>RM ${(total / count).toFixed(2)}</span><small>${t('avgOrder')}</small></div>
        </div>
      </div>
      <div class="section-title" style="margin-top:16px">${t('productSummary')}</div>
      <div class="card report-card">${productHtml}</div>
      <div class="section-title" style="margin-top:16px">${t('invoiceDetail')}</div>
      ${orderHtml}`;
    } catch (e) {
      container.innerHTML = '<div class="empty">' + t('queryFail') + e.message + '</div>';
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
  const debouncedRenderStockIn = debounce(renderStockIn, 250);
  const debouncedRenderOrders = debounce(renderOrders, 250);
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
    if (modalId === 'modal-order') {
      document.getElementById('o-editing-poid').value = '';
      document.getElementById('o-editing-detailid').value = '';
      resetOrderDraft();
    }
    // 打开 modal 后更新一次单位标签
    updateQtyLabels();
  }

  function closeModal() {
    const wasOrderEdit = state.currentModal === 'modal-order';
    const wasStockInEdit = state.currentModal === 'modal-si';
    if (wasOrderEdit) {
      const title = document.querySelector('#modal-order .modal-title');
      if (title) title.textContent = t('newOrder');
      document.getElementById('btn-order').textContent = t('confirmOrder');
      document.getElementById('o-poid').value = '';
      document.getElementById('o-editing-poid').value = '';
      document.getElementById('o-editing-detailid').value = '';
      orderDraftRows = [];
    }
    if (wasStockInEdit) {
      const title = document.querySelector('#modal-si .modal-title');
      if (title) title.textContent = '新增进货';
      document.getElementById('btn-si').textContent = t('confirmStockin');
      document.getElementById('f-editing-siid').value = '';
      document.getElementById('si-edit-rows').innerHTML = '';
      document.getElementById('si-new-row-area').style.display = '';
      document.getElementById('f-amount').value = '';
    }
    if (state.currentModal) {
      document.getElementById(state.currentModal).classList.remove('open');
      state.currentModal = null;
    }
  }

  function requestCloseModal() {
    if (state.currentModal === 'modal-order' && hasOrderDraftData()) {
      if (!confirm('确定取消这张出货单？已输入的内容会清空。')) return;
    }
    closeModal();
  }

  // ============================================================
  // 表单提交
  // ============================================================
  async function submitStockIn() {
    if (!canUseModal('modal-si')) { showToast(t('noPermission'), 'err'); return; }
    const editingSIID = document.getElementById('f-editing-siid').value;

    if (editingSIID) {
      // === 编辑模式：更新 pending 进货单 ===
      const btn = document.getElementById('btn-si');
      btn.disabled = true;
      btn.textContent = t('submitting');
      try {
        // 保存供应商和总金额
        await sbPatch('stock_ins', 'StockInID', editingSIID, {
          SupplierID: document.getElementById('f-sup').value,
          TotalAmount: parseFloat(document.getElementById('f-amount').value) || 0
        });
        // 收集所有还留在画面上的 detailId
        const keptDetailIds = new Set();
        const rows = document.querySelectorAll('#si-edit-rows .si-edit-row');
        for (const row of rows) {
          const detailId = row.dataset.detailid;
          const prodEl = row.querySelector('.si-edit-prod');
          const qtyEl = row.querySelector('.si-edit-qty');
          const productID = prodEl.value;
          const qty = parseInt(qtyEl.value);
          if (!qty || qty < 1) continue;
          keptDetailIds.add(detailId);
          await sbPatch('stock_in_details', 'DetailID', detailId, { ProductID: productID, Qty: qty });
        }
        // 删除数据库中不在画面上的明细
        const allDetails = getStockInDetails(editingSIID) || [];
        for (const d of allDetails) {
          if (!keptDetailIds.has(d.DetailID)) {
            await sbDelete('stock_in_details', 'DetailID', d.DetailID);
          }
        }
        showToast(t('orderUpdated'), 'ok');
      } catch (e) {
        showToast(t('submitFail') + e.message, 'err');
        btn.disabled = false;
        btn.textContent = t('confirmStockin');
        return;
      }
    } else {
      // === 新建模式：创建 pending 进货单（不扣库存） ===
      if (siPendingItems.length === 0) { showToast('请至少添加一个产品', 'err'); return; }
      const btn = document.getElementById('btn-si');
      btn.disabled = true;
      btn.textContent = t('submitting');
      try {
        const now = new Date();
        const dateStr = now.toISOString().slice(0,10);
        const timeStr = now.toTimeString().slice(0,8);
        const uid = Math.random().toString(36).slice(2, 6);
        const stockInID = `S01-${dateStr.replace(/-/g,'').slice(2)}-${uid}`;
        const supplierID = document.getElementById('f-sup').value;

        await sbPost('stock_ins', {
          StockInID: stockInID, Date: dateStr, Time: timeStr,
          SupplierID: supplierID, Status: 'pending',
          TotalAmount: parseFloat(document.getElementById('f-amount').value) || 0
        });
        for (const item of siPendingItems) {
          const detailID = Math.random().toString(36).slice(2, 10);
          await sbPost('stock_in_details', {
            DetailID: detailID, StockInID: stockInID, ProductID: item.ProductID, Qty: item.Qty
          });
        }
        siPendingItems = [];
        renderSiPendingItems();
        // NO stock balance change here!
        showToast(t('stockinSuccess'), 'ok');
      } catch (e) {
        showToast(t('submitFail') + e.message, 'err');
        btn.disabled = false;
        btn.textContent = t('confirmStockin');
        return;
      }
    }

    // 重置
    siPendingItems = [];
    renderSiPendingItems();
    document.getElementById('f-qty').value = '';
    document.getElementById('f-amount').value = '';
    document.getElementById('f-editing-siid').value = '';
    document.getElementById('si-edit-rows').innerHTML = '';
    closeModal();
    await loadAll();
  }

  // ============================================================
  // 进货确认 / 取消 / 编辑 / 删除
  // ============================================================
  window.confirmStockIn = async function(stockInID) {
    if (!canUseModal('modal-si')) { showToast(t('noPermission'), 'err'); return; }
    try {
      // 防重复：先检查当前状态
      const si = await sbGetFiltered('stock_ins', 'StockInID', stockInID);
      if (!si || si.length === 0) { showToast('进货单不存在', 'err'); return; }
      if (si[0].Status !== 'pending') { showToast('此进货单已处理', 'err'); return; }

      const details = await sbGetFiltered('stock_in_details', 'StockInID', stockInID);
      if (!details || details.length === 0) { showToast('进货单无明细', 'err'); return; }

      // 先改状态为 done（锁定，防止重复确认）
      await sbPatch('stock_ins', 'StockInID', stockInID, { Status: 'done' });

      // 再逐条加库存
      for (const d of details) {
        const prod = await sbGetFiltered('products', 'ProductID', d.ProductID);
        if (prod && prod.length > 0) {
          const currentStock = Number(prod[0].StockBalance) || 0;
          const newBalance = currentStock + Number(d.Qty || 0);
          await sbPatch('products', 'ProductID', d.ProductID, { StockBalance: newBalance });
        }
      }

      showToast(t('confirmStockin') + ' ✅', 'ok');
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
  };

  window.cancelStockIn = async function(stockInID) {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    if (!confirm('确定取消此进货单？')) return;
    try {
      await sbPatch('stock_ins', 'StockInID', stockInID, { Status: 'cancelled' });
      showToast(t('orderCancel') + ' ✅', 'ok');
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
  };

  window.editStockIn = function(stockInID) {
    const si = state.stockIns.find(s => s.StockInID === stockInID);
    if (!si) { showToast('进货单不存在', 'err'); return; }
    const details = getStockInDetails(stockInID);
    if (!details || details.length === 0) { showToast('进货单无明细', 'err'); return; }

    document.getElementById('si-new-row-area').style.display = 'none';
    document.getElementById('f-editing-siid').value = stockInID;

    const container = document.getElementById('si-edit-rows');
    container.innerHTML = details.map(d => {
      const opts = Array.from(state.products.values()).map(p =>
        `<option value="${p.ProductID}" ${p.ProductID === d.ProductID ? 'selected' : ''}>${escapeHTML(p.ProductName)} (${p.Grade || ''})</option>`
      ).join('');
      return `<div class="form-group si-edit-row" data-detailid="${d.DetailID}" style="display:flex;gap:8px;align-items:end;padding:8px 0;border-top:1px solid var(--border)">
        <div style="flex:1">
          <label class="form-label" style="font-size:11px">产品</label>
          <select class="si-edit-prod">${opts}</select>
        </div>
        <div style="width:100px">
          <label class="form-label" style="font-size:11px">数量</label>
          <input type="number" class="si-edit-qty" value="${d.Qty}" min="1" inputmode="numeric" style="width:100%">
        </div>
        <button class="del-btn" onclick="this.closest('.si-edit-row').remove()" style="margin-bottom:4px">✕</button>
      </div>`;
    }).join('');

    document.getElementById('f-amount').value = si.TotalAmount || '';
    const title = document.querySelector('#modal-si .modal-title');
    if (title) title.textContent = '编辑进货单';
    document.getElementById('btn-si').textContent = '保存更改';
    document.getElementById('f-sup').value = si.SupplierID || '';

    document.getElementById('modal-si').classList.add('open');
    state.currentModal = 'modal-si';
  };

  window.deleteStockIn = async function(stockInID) {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    if (!confirm('确定删除此进货单？不可恢复。')) return;
    try {
      await sbDelete('stock_in_details', 'StockInID', stockInID);
      await sbDelete('stock_ins', 'StockInID', stockInID);
      showToast(t('deleteSuccess'), 'ok');
      await loadAll();
    } catch (e) {
      showToast(t('deleteFail') + e.message, 'err');
    }
  };

  async function submitProduct() {
    if (!canUseModal('modal-prod')) { showToast(t('noPermission'), 'err'); return; }
    const name = document.getElementById('np-name').value.trim();
    if (!name) { showToast(t('submitFail') + t('productName'), 'err'); return; }
    const btn = document.getElementById('btn-prod');
    btn.disabled = true;
    btn.textContent = t('adding');
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
      showToast(t('productAdded'), 'ok');
      document.getElementById('np-name').value = '';
      closeModal();
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = t('addProduct');
  }

  async function submitSupplier() {
    if (!canUseModal('modal-supplier')) { showToast(t('noPermission'), 'err'); return; }
    const name = document.getElementById('ns-name').value.trim();
    if (!name) { showToast(t('submitFail') + t('supplierName'), 'err'); return; }
    const btn = document.getElementById('btn-supplier');
    btn.disabled = true;
    btn.textContent = t('submitting');
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
      showToast(t('supplierAdded'), 'ok');
      document.getElementById('ns-name').value = '';
      document.getElementById('ns-phone').value = '';
      document.getElementById('ns-note').value = '';
      closeModal();
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = t('addSupplier');
  }

  async function submitOrder() {
    if (!canUseModal('modal-order')) { showToast(t('noPermission'), 'err'); return; }
    let rows = [];
    try {
      rows = collectOrderRows();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
      return;
    }
    const btn = document.getElementById('btn-order');
    btn.disabled = true;
    btn.textContent = t('ordering');
    try {
      const now = new Date();
      const dateStr = now.toISOString().slice(0,10);
      const timeStr = now.toTimeString().slice(0,8);
      const uid = Math.random().toString(36).slice(2, 6);
      const requestedPOID = document.getElementById('o-poid').value.trim();
      const poID = requestedPOID || `PO-${dateStr.replace(/-/g,'').slice(2)}-${uid}`;
      const editingPOID = document.getElementById('o-editing-poid').value;
      const totalAmount = rows.reduce((sum, row) => sum + row.LineAmount, 0);

      if (editingPOID) {
        const finalPOID = requestedPOID || editingPOID;
        if (finalPOID !== editingPOID) {
          const existing = await sbGetFiltered('purchase_orders', 'POID', finalPOID, { select: 'POID' });
          if (existing && existing.length > 0) throw new Error('Invoice No 已存在');
        }
        await sbPatch('purchase_orders', 'POID', editingPOID, { POID: finalPOID, TotalAmount: totalAmount });
        await sbDelete('po_details', 'POID', editingPOID).catch(() => {});
        await sbDelete('po_details', 'POID', finalPOID).catch(() => {});
        for (const row of rows) {
          await postOrderDetail({
            DetailID: row.detailID || Math.random().toString(36).slice(2, 10),
            POID: finalPOID,
            ProductID: row.ProductID,
            QTY: row.QTY,
            UnitPrice: row.UnitPrice,
            LineAmount: row.LineAmount
          });
        }
        showToast(t('orderUpdated'), 'ok');
      } else {
        const existing = await sbGetFiltered('purchase_orders', 'POID', poID, { select: 'POID' });
        if (existing && existing.length > 0) throw new Error('Invoice No 已存在');
        await sbPost('purchase_orders', { POID: poID, Date: dateStr, Time: timeStr, CustomerID: '', Status: 'pending', TotalAmount: totalAmount });
        for (const row of rows) {
          await postOrderDetail({
            DetailID: Math.random().toString(36).slice(2, 10),
            POID: poID,
            ProductID: row.ProductID,
            QTY: row.QTY,
            UnitPrice: row.UnitPrice,
            LineAmount: row.LineAmount
          });
        }
        showToast(t('orderSuccess'), 'ok');
      }

      document.getElementById('o-poid').value = '';
      document.getElementById('o-amount').value = '';
      document.getElementById('o-editing-poid').value = '';
      document.getElementById('o-editing-detailid').value = '';
      orderDraftRows = [];
      closeModal();
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    } finally {
      btn.disabled = false;
      btn.textContent = t('confirmOrder');
    }
  }

  // ============================================================
  // 确认完成 / 取消 / 编辑订单
  // ============================================================
  window.confirmOrder = async function(poID) {
    if (!canUseModal('modal-order')) { showToast(t('noPermission'), 'err'); return; }
    try {
      // 获取订单详情
      const details = await sbGetFiltered('po_details', 'POID', poID);
      if (!details || details.length === 0) { showToast('订单无明细', 'err'); return; }

      // 逐条扣库存 — 从数据库拉最新库存
      for (const d of details) {
        const prod = await sbGetFiltered('products', 'ProductID', d.ProductID);
        if (prod && prod.length > 0) {
          const currentStock = Number(prod[0].StockBalance) || 0;
          const newBalance = currentStock - d.QTY;
          await sbPatch('products', 'ProductID', d.ProductID, { StockBalance: newBalance });
        }
      }

      // 改状态为 done
      await sbPatch('purchase_orders', 'POID', poID, { Status: 'done' });
      showToast(t('orderConfirm') + ' ✅', 'ok');
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
  }; 

  window.cancelOrder = async function(poID) {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    if (!confirm('确定取消此订单？')) return;
    try {
      await sbPatch('purchase_orders', 'POID', poID, { Status: 'cancelled' });
      showToast(t('orderCancel') + ' ✅', 'ok');
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
  };

  window.editOrder = function(poID) {
    const order = state.orders.find(o => o.POID === poID);
    if (!order) { showToast('订单不存在', 'err'); return; }
    const details = getOrderDetails(poID);
    if (!details.length) { showToast('订单无明细', 'err'); return; }

    // 预填 modal
    document.getElementById('o-poid').value = poID;
    document.getElementById('o-amount').value = order.TotalAmount || '';
    document.getElementById('o-editing-poid').value = poID;
    document.getElementById('o-editing-detailid').value = '';
    resetOrderDraft(details);

    // 更新标题与按钮文字
    const title = document.querySelector('#modal-order .modal-title');
    if (title) title.textContent = t('editOrder');
    document.getElementById('btn-order').textContent = t('orderUpdated') + ' ✓';

    // 打开 modal
    document.getElementById('modal-order').classList.add('open');
    state.currentModal = 'modal-order';
  }; 

  // 删除订单（admin，硬删除 purchase_orders + po_details）
  window.deleteOrder = async function(poID) {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    if (!confirm('确定删除此订单？不可恢复。')) return;
    try {
      await sbDelete('po_details', 'POID', poID);
      await sbDelete('purchase_orders', 'POID', poID);
      showToast(t('deleteSuccess'), 'ok');
      await loadAll();
    } catch (e) {
      showToast(t('deleteFail') + e.message, 'err');
    }
  };

  // ============================================================
  // 删除功能（仅 admin）
  // ============================================================
  function attachDeleteHandlers(container) {
    container.querySelectorAll('.del-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
        if (!confirm(t('confirmDelete'))) return;

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
          }
          showToast(t('deleteSuccess'), 'ok');
          await loadAll();
        } catch (e) {
          showToast(t('deleteFail') + e.message, 'err');
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
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    const username = document.getElementById('au-user').value.trim();
    const display = document.getElementById('au-display').value.trim();
    const password = document.getElementById('au-pass').value.trim();
    const role = document.getElementById('au-role').value;
    if (!username || !display || !password) { showToast(t('fillAll'), 'err'); return; }
    const btn = document.getElementById('btn-adduser');
    btn.disabled = true;
    btn.textContent = t('addingUser');
    try {
      // 检查用户名是否已存在
      const exist = await sbGetFiltered('users', 'Username', username, { select: 'Username' });
      if (exist && exist.length > 0) { showToast(t('userExists'), 'err'); btn.disabled = false; btn.textContent = t('addUserBtn'); return; }
      await sbPost('users', { Username: username, DisplayName: display, Password: password, Role: role });
      showToast(display + t('userAdded'), 'ok');
      document.getElementById('au-user').value = '';
      document.getElementById('au-display').value = '';
      document.getElementById('au-pass').value = '';
      closeModal();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = t('addUserBtn');
  }

  // ============================================================
  // 修改密码（所有人可用）
  // ============================================================
  async function submitChangePassword() {
    const oldPw = document.getElementById('cp-old').value.trim();
    const newPw = document.getElementById('cp-new').value.trim();
    const confirmPw = document.getElementById('cp-confirm').value.trim();
    if (!oldPw || !newPw || !confirmPw) { showToast(t('fillAll'), 'err'); return; }
    if (newPw !== confirmPw) { showToast(t('pwdMismatch'), 'err'); return; }
    const btn = document.getElementById('btn-changepw');
    btn.disabled = true;
    btn.textContent = t('submitting');
    try {
      // 验证当前密码
      const users = await sbGetFiltered('users', 'Username', currentUser.Username, { select: '*' });
      if (!users || users.length === 0) { showToast(t('userNotFound'), 'err'); btn.disabled = false; btn.textContent = t('changePwd'); return; }
      if (users[0].Password !== oldPw) { showToast(t('wrongCurrentPwd'), 'err'); btn.disabled = false; btn.textContent = t('changePwd'); return; }
      await sbPatch('users', 'Username', currentUser.Username, { Password: newPw });
      showToast(t('pwdChanged'), 'ok');
      document.getElementById('cp-old').value = '';
      document.getElementById('cp-new').value = '';
      document.getElementById('cp-confirm').value = '';
      closeModal();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = t('changePwd');
  }

  // ============================================================
  // 国际化 - 应用语言
  // ============================================================
  function applyLang() {
    // 登录页
    document.getElementById('label-user').textContent = t('username');
    document.getElementById('label-pass').textContent = t('password');
    document.getElementById('login-sub').textContent = t('loginSub');
    document.getElementById('login-btn').textContent = t('loginBtn');
    document.getElementById('login-user').placeholder = t('username');

    // 更新语言按钮高亮
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.style.opacity = b.dataset.lang === currentLang ? '1' : '0.5';
    });

    // 导航按钮
    const navMap = {
      dashboard: t('home'),
      products: t('products'),
      stockin: t('stockin'),
      orders: t('orders'),
      report: t('report'),
      suppliers: t('suppliers')
    };
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const page = btn.dataset.page;
      if (navMap[page]) {
        const icon = btn.querySelector('.nav-icon');
        if (icon) btn.innerHTML = icon.outerHTML + navMap[page];
      }
    });

    // 主页 stat 标签
    document.getElementById('s-products').previousElementSibling.textContent = t('totalProducts');
    // 找到 stat-label 元素
    document.querySelectorAll('.stat-card .stat-label')[0].textContent = t('totalProducts');
    document.querySelectorAll('.stat-card .stat-label')[1].textContent = t('totalStock');
    document.querySelectorAll('.stat-card .stat-label')[2].textContent = t('stockinRecords');
    document.querySelectorAll('.stat-card .stat-label')[3].textContent = t('suppliers');

    // section titles
    document.querySelectorAll('.section-title').forEach(el => {
      if (el.textContent === '库存概览' || el.textContent === 'Ringkasan Stok') el.textContent = t('stockOverview');
      if (el.textContent === '最近进货' || el.textContent === 'Terbaru Masuk') el.textContent = t('recentStockin');
    });

    // 进货 modal
    const siTitle = document.querySelector('#modal-si .modal-title');
    if (siTitle) siTitle.textContent = t('newStockin');
    document.getElementById('btn-si').textContent = t('confirmStockin');
    const siCancel = document.querySelector('#modal-si .btn-cancel');
    if (siCancel) siCancel.textContent = t('cancel');
    const lblSiSup = document.getElementById('lbl-si-supplier');
    if (lblSiSup) lblSiSup.textContent = t('supplier');
    const lblSiProd = document.getElementById('lbl-si-product');
    if (lblSiProd) lblSiProd.textContent = t('product');

    // 产品 modal
    const prodTitle = document.querySelector('#modal-prod .modal-title');
    if (prodTitle) prodTitle.textContent = t('newProduct');
    document.getElementById('btn-prod').textContent = t('addProduct');
    const prodCancel = document.querySelector('#modal-prod .btn-cancel');
    if (prodCancel) prodCancel.textContent = t('cancel');
    const lblProdName = document.getElementById('lbl-prod-name');
    if (lblProdName) lblProdName.textContent = t('productName');
    const lblProdGrade = document.getElementById('lbl-prod-grade');
    if (lblProdGrade) lblProdGrade.textContent = t('grade');
    const lblProdUnit = document.getElementById('lbl-prod-unit');
    if (lblProdUnit) lblProdUnit.textContent = t('unit_pcs');

    // 供应商 modal
    const supTitle = document.querySelector('#modal-supplier .modal-title');
    if (supTitle) supTitle.textContent = t('newSupplier');
    document.getElementById('btn-supplier').textContent = t('addSupplier');
    const supCancel = document.querySelector('#modal-supplier .btn-cancel');
    if (supCancel) supCancel.textContent = t('cancel');
    const lblSupName = document.getElementById('lbl-sup-name');
    if (lblSupName) lblSupName.textContent = t('supplierName');
    const lblSupPhone = document.getElementById('lbl-sup-phone');
    if (lblSupPhone) lblSupPhone.textContent = t('phone');
    const lblSupNote = document.getElementById('lbl-sup-note');
    if (lblSupNote) lblSupNote.textContent = t('note');

    // 出货 modal
    const orderTitle = document.querySelector('#modal-order .modal-title');
    if (orderTitle) orderTitle.textContent = t('newOrder');
    document.getElementById('btn-order').textContent = t('confirmOrder');
    const orderCancel = document.querySelector('#modal-order .btn-cancel');
    if (orderCancel) orderCancel.textContent = t('cancel');
    const lblOrderProd = document.getElementById('lbl-order-product');
    if (lblOrderProd) lblOrderProd.textContent = t('product');
    const lblOrderAmt = document.getElementById('lbl-order-amount');
    if (lblOrderAmt) lblOrderAmt.textContent = t('totalAmount');
    const lblOrderInvoice = document.getElementById('lbl-order-invoice');
    if (lblOrderInvoice) lblOrderInvoice.textContent = t('invoiceNo');
    const orderPOID = document.getElementById('o-poid');
    if (orderPOID) orderPOID.placeholder = t('autoGenerate');
    const btnOrderAddItem = document.getElementById('btn-order-add-item');
    if (btnOrderAddItem) btnOrderAddItem.textContent = '+ ' + t('addOrderItem');

    // 新增用户 modal
    const auTitle = document.querySelector('#modal-adduser .modal-title');
    if (auTitle) auTitle.textContent = t('addUser');
    document.getElementById('btn-adduser').textContent = t('addUserBtn');
    const auCancel = document.querySelector('#modal-adduser .btn-cancel');
    if (auCancel) auCancel.textContent = t('cancel');
    const lblAuUser = document.getElementById('lbl-au-user');
    if (lblAuUser) lblAuUser.textContent = t('username');
    const lblAuDisplay = document.getElementById('lbl-au-display');
    if (lblAuDisplay) lblAuDisplay.textContent = t('displayName');
    const lblAuPass = document.getElementById('lbl-au-pass');
    if (lblAuPass) lblAuPass.textContent = t('password');
    const lblAuRole = document.getElementById('lbl-au-role');
    if (lblAuRole) lblAuRole.textContent = t('role');
    // 角色选项
    const auRole = document.getElementById('au-role');
    if (auRole) {
      const opts = auRole.options;
      if (opts[0]) opts[0].text = '👑 ' + t('admin');
      if (opts[1]) opts[1].text = '📋 ' + t('sales');
    }

    // 修改密码 modal
    const cpTitle = document.querySelector('#modal-changepw .modal-title');
    if (cpTitle) cpTitle.textContent = t('changePwd');
    document.getElementById('btn-changepw').textContent = t('changePwd');
    const cpCancel = document.querySelector('#modal-changepw .btn-cancel');
    if (cpCancel) cpCancel.textContent = t('cancel');
    const lblCpOld = document.getElementById('lbl-cp-old');
    if (lblCpOld) lblCpOld.textContent = t('currentPwd');
    const lblCpNew = document.getElementById('lbl-cp-new');
    if (lblCpNew) lblCpNew.textContent = t('newPwd');
    const lblCpConfirm = document.getElementById('lbl-cp-confirm');
    if (lblCpConfirm) lblCpConfirm.textContent = t('confirmPwd');

    // 搜索框 placeholder
    document.getElementById('product-search').placeholder = t('search');
    document.getElementById('supplier-search').placeholder = t('search');
    document.getElementById('stockin-search').placeholder = t('searchDO');
    document.getElementById('order-search').placeholder = t('searchInvoice');

    // 业绩报表
    const reportTitle = document.querySelector('#page-report .section-title');
    if (reportTitle) reportTitle.textContent = t('reportTitle');
    document.getElementById('btn-report-query').textContent = t('query');

    // 如果已登录，重新渲染当前页面
    if (currentUser) {
      renderCurrentPage();
    }

    localStorage.setItem('gmpos_lang', currentLang);
  }

  // ============================================================
  // 初始化
  // ============================================================
  function init() {
    // 语言切换
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        currentLang = this.dataset.lang;
        applyLang();
      });
    });

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
    document.getElementById('stockin-search').addEventListener('input', debouncedRenderStockIn);
    document.getElementById('order-search').addEventListener('input', debouncedRenderOrders);

    // 产品选择 change 事件 → 更新数量单位标签
    document.getElementById('f-prod').addEventListener('change', updateQtyLabels);

    // 按钮
    document.getElementById('fab').addEventListener('click', openModal);
    document.getElementById('sync-btn').addEventListener('click', () => loadAll());
    document.getElementById('btn-order-add-item').addEventListener('click', function() {
      orderDraftRows.push(makeOrderDraftRow());
      renderOrderEditorRows();
    });
    document.getElementById('btn-si-add-item').addEventListener('click', function() {
      const prodEl = document.getElementById('f-prod');
      const qtyEl = document.getElementById('f-qty');
      const productID = prodEl.value;
      const productName = prodEl.options[prodEl.selectedIndex]?.text || productID;
      const qty = parseInt(qtyEl.value);
      if (!qty || qty < 1) { showToast('请输入数量', 'err'); return; }
      siPendingItems.push({ ProductID: productID, productName, Qty: qty });
      renderSiPendingItems();
      qtyEl.value = '';
      showToast(`已添加: ${productName} x${qty}`, 'ok');
    });

    // Modal 背景点击关闭；出货和进货单禁止点背景关闭
    document.querySelectorAll('.modal-bg').forEach(m => {
      m.addEventListener('click', function(e) {
        if (e.target !== this) return;
        if (this.id === 'modal-order' || this.id === 'modal-si') return;
        closeModal();
      });
    });

    // 表单提交
    document.getElementById('btn-si').addEventListener('click', submitStockIn);
    document.getElementById('btn-prod').addEventListener('click', submitProduct);
    document.getElementById('btn-supplier').addEventListener('click', submitSupplier);
    document.getElementById('btn-order').addEventListener('click', submitOrder);
    document.getElementById('btn-adduser').addEventListener('click', submitAddUser);
    document.getElementById('btn-changepw').addEventListener('click', submitChangePassword);

    // 取消按钮关闭
    document.querySelectorAll('.btn-cancel').forEach(btn => {
      btn.addEventListener('click', requestCloseModal);
    });

    // 应用当前语言
    applyLang();

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
