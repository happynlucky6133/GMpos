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
      appTitle: 'GMPos 库存',
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
      noItems: '暂无产品',
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
      refresh: '刷新',
      productNamePlaceholder: '输入产品名称',
      gradePlaceholder: '输入等级（如 A、B、C 或自定义）',
      negativeStockNote: '允许负库存：货物已出，等待补货。',
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
      searchAllDates: '正在跨全部日期搜索：',
      noPermission: '无权操作',
      submitFail: '提交失败: ',
      transferIn: '进货',
      transferOut: '出库',
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
      amountMismatch: '金额不符',
      invoiceAmount: '单据金额',
      detailAmount: '明细小计',
      differenceAmount: '差额',
      priceRequired: '请输入单价',
      searchInvoice: '搜索 Invoice No...',
      totalAmount: '总金额 (RM)',
      invoiceNo: 'Invoice No',
      externalInvoiceNo: '母公司 POS Invoice No',
      internalOrderNo: 'GMpos 记录号',
      autoGenerate: '可留空，之后也能补',
      invoiceExists: 'Invoice No 已存在',
      orderType: '单据类型',
      posSale: 'POS 出货',
      branchTransfer: '分行调货',
      doNo: 'DO No',
      fromBranch: 'From Branch',
      toBranch: 'To Branch',
      enterDoNo: '请输入 DO No',
      docExists: 'DO No 已存在',
      noOrders: '暂无出货记录',
      // 产品
      newProduct: '新增产品',
      addProduct: '添加产品',
      adding: '添加中...',
      productAdded: '产品已添加！',
      productName: '产品名称',
      productList: '产品列表',
      editProduct: '编辑产品',
      saveChanges: '保存更改',
      stockQty: '库存数量',
      mergeSku: '合并 SKU',
      mergeSkuDesc: '将旧 SKU 的产品、历史记录和库存合并到目标 SKU，然后删除旧 SKU。此操作不可撤销！',
      oldSku: '旧 SKU (要合并掉的)',
      targetSku: '目标 SKU (合并到它)',
      confirmMerge: '确认合并',
      sameSku: '不能将同一个 SKU 合并到自己',
      mergedHistoryNotice: '历史进货/出货记录将转移到目标 SKU',
      mergedStock: '合并后库存',
      noAccessAction: '你没有权限执行此操作',
      cancelOrderDraft: '确定取消这张出货单？已输入的内容会清空。',
      cancelEditDraft: '确定取消编辑？更改不会保存。',
      cancelStockDraft: '确定取消？已添加的产品清单将清空。',
      stockInProcessed: '此进货单已被处理',
      productNotFoundPrefix: '产品不存在: ',
      cancelStockInConfirm: '确定取消此进货单？',
      deleteStockInConfirm: '确定删除此进货单？不可恢复。',
      orderNoDetails: '订单无明细',
      cancelOrderConfirm: '确定取消此订单？',
      deleteDoneOrderConfirm: '此订单已确认完成！\n确定删除 {id}？\n（库存将不会自动恢复，请手动调整）',
      deleteOrderConfirm: '确定删除此订单 {id}？不可恢复。',
      mergeConfirm: '高风险操作！\n\n将合并以下 SKU：\n\n旧 SKU: {fromName} ({fromID})\n  库存: {fromStock}\n\n目标 SKU: {toName} ({toID})\n  当前库存: {toStock}\n  合并后: {mergedStock}\n\n所有进货/出货记录中的 ProductID 将改为目标 SKU。\n\n确定继续？',
      mergedPrefix: '已合并: ',
      enterQty: '请输入数量',
      stockInNoDetails: '进货单无明细',
      stockInNotFound: '进货单不存在',
      orderProcessed: '此订单已被处理',
      orderNotFound: '订单不存在',
      skuNotFoundPrefix: 'SKU 不存在: ',
      enterProductName: '请输入产品名称',
      enterSupplierName: '请输入供应商名称',
      productUpdated: '产品已更新',
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
      addAtLeastOneProduct: '请至少添加一个产品',
      keepOneRow: '至少保留一行',
      addedPrefix: '已添加: ',
      // 印尼文专用
      langName: '中文'
    },
    id: {
      login: 'Masuk',
      username: 'Nama Pengguna',
      password: 'Kata Sandi',
      loginSub: 'Silakan masuk untuk melanjutkan',
      loginBtn: 'Masuk',
      appTitle: 'GMPos Stok',
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
      noItems: 'Belum ada produk',
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
      refresh: 'Segarkan',
      productNamePlaceholder: 'Masukkan nama produk',
      gradePlaceholder: 'Masukkan grade (mis. A, B, C atau lainnya)',
      negativeStockNote: 'Stok negatif diizinkan: barang sudah keluar dan menunggu pengisian stok.',
      newStockin: 'Tambah Stok Masuk',
      confirmStockin: 'Simpan Masuk',
      submitting: 'Mengirim...',
      stockinSuccess: 'Stok masuk berhasil!',
      qty: 'Jumlah',
      cancel: 'Batal',
      supplier: 'Pemasok',
      product: 'Produk',
      searchDO: 'Cari DO...',
      searchAllDates: 'Mencari semua tanggal: ',
      noPermission: 'Tidak ada akses',
      submitFail: 'Gagal kirim: ',
      transferIn: 'Masuk',
      transferOut: 'Keluar',
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
      amountMismatch: 'Total tidak cocok',
      invoiceAmount: 'Total nota',
      detailAmount: 'Subtotal item',
      differenceAmount: 'Selisih',
      priceRequired: 'Masukkan harga',
      searchInvoice: 'Cari Invoice...',
      totalAmount: 'Total (RM)',
      invoiceNo: 'Invoice No',
      externalInvoiceNo: 'Invoice No POS pusat',
      internalOrderNo: 'No catatan GMpos',
      autoGenerate: 'Boleh kosong, bisa diisi nanti',
      invoiceExists: 'Invoice No sudah ada',
      orderType: 'Jenis Dokumen',
      posSale: 'Stok Keluar POS',
      branchTransfer: 'Transfer Cabang',
      doNo: 'DO No',
      fromBranch: 'Dari Cabang',
      toBranch: 'Ke Cabang',
      enterDoNo: 'Masukkan DO No',
      docExists: 'DO No sudah ada',
      noOrders: 'Belum ada catatan keluar',
      newProduct: 'Tambah Produk',
      addProduct: 'Tambah Produk',
      adding: 'Menambah...',
      productAdded: 'Produk ditambahkan!',
      productName: 'Nama Produk',
      productList: 'Daftar Produk',
      editProduct: 'Edit Produk',
      saveChanges: 'Simpan Perubahan',
      stockQty: 'Jumlah Stok',
      mergeSku: 'Gabung SKU',
      mergeSkuDesc: 'Gabungkan produk, riwayat, dan stok SKU lama ke SKU tujuan, lalu hapus SKU lama. Tindakan ini tidak dapat dibatalkan!',
      oldSku: 'SKU Lama (akan digabung)',
      targetSku: 'SKU Tujuan',
      confirmMerge: 'Konfirmasi Gabung',
      sameSku: 'Tidak bisa menggabungkan SKU yang sama',
      mergedHistoryNotice: 'Riwayat stok masuk/keluar akan dipindahkan ke SKU tujuan',
      mergedStock: 'Stok Setelah Digabung',
      noAccessAction: 'Anda tidak punya akses untuk tindakan ini',
      cancelOrderDraft: 'Batalkan stok keluar ini? Data yang sudah diisi akan kosong.',
      cancelEditDraft: 'Batalkan edit? Perubahan tidak akan disimpan.',
      cancelStockDraft: 'Batalkan? Daftar produk yang sudah ditambahkan akan kosong.',
      stockInProcessed: 'Stok masuk ini sudah diproses',
      productNotFoundPrefix: 'Produk tidak ditemukan: ',
      cancelStockInConfirm: 'Yakin batalkan stok masuk ini?',
      deleteStockInConfirm: 'Yakin hapus stok masuk ini? Tidak bisa dikembalikan.',
      orderNoDetails: 'Order tidak memiliki detail',
      cancelOrderConfirm: 'Yakin batalkan order ini?',
      deleteDoneOrderConfirm: 'Order ini sudah selesai!\nYakin hapus {id}?\n(Stok tidak akan dikembalikan otomatis, perlu ubah manual)',
      deleteOrderConfirm: 'Yakin hapus order {id}? Tidak bisa dikembalikan.',
      mergeConfirm: 'Operasi berisiko tinggi!\n\nSKU berikut akan digabung:\n\nSKU lama: {fromName} ({fromID})\n  Stok: {fromStock}\n\nSKU tujuan: {toName} ({toID})\n  Stok saat ini: {toStock}\n  Setelah digabung: {mergedStock}\n\nSemua riwayat stok masuk/keluar akan dipindahkan ke SKU tujuan.\n\nLanjutkan?',
      mergedPrefix: 'Berhasil digabung: ',
      enterQty: 'Masukkan jumlah',
      stockInNoDetails: 'Stok masuk tidak memiliki detail',
      stockInNotFound: 'Stok masuk tidak ditemukan',
      orderProcessed: 'Order ini sudah diproses',
      orderNotFound: 'Order tidak ditemukan',
      skuNotFoundPrefix: 'SKU tidak ditemukan: ',
      enterProductName: 'Masukkan nama produk',
      enterSupplierName: 'Masukkan nama pemasok',
      productUpdated: 'Produk diperbarui',
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
      addAtLeastOneProduct: 'Tambahkan minimal satu produk',
      keepOneRow: 'Minimal sisakan satu baris',
      addedPrefix: 'Ditambahkan: ',
      langName: 'Indonesia'
    },
    en: {
      login: 'Login',
      username: 'Username',
      password: 'Password',
      loginSub: 'Please login to continue',
      loginBtn: 'Login',
      appTitle: 'GMPos Inventory',
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
      noItems: 'No products',
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
      refresh: 'Refresh',
      productNamePlaceholder: 'Enter product name',
      gradePlaceholder: 'Enter grade (e.g. A, B, C or custom)',
      negativeStockNote: 'Negative stock is allowed: goods are already out and waiting for replenishment.',
      newStockin: 'New Stock In',
      confirmStockin: 'Confirm Stock In',
      submitting: 'Submitting...',
      stockinSuccess: 'Stock in successful!',
      qty: 'Qty',
      cancel: 'Cancel',
      supplier: 'Supplier',
      product: 'Product',
      searchDO: 'Search DO number...',
      searchAllDates: 'Searching all dates: ',
      noPermission: 'No permission',
      submitFail: 'Submit failed: ',
      transferIn: 'Stock In',
      transferOut: 'Stock Out',
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
      amountMismatch: 'Amount mismatch',
      invoiceAmount: 'Invoice total',
      detailAmount: 'Item subtotal',
      differenceAmount: 'Difference',
      priceRequired: 'Enter unit price',
      searchInvoice: 'Search Invoice No...',
      totalAmount: 'Total Amount (RM)',
      invoiceNo: 'Invoice No',
      externalInvoiceNo: 'HQ POS Invoice No',
      internalOrderNo: 'GMpos record no',
      autoGenerate: 'Optional, can be filled later',
      invoiceExists: 'Invoice No already exists',
      orderType: 'Document Type',
      posSale: 'POS Sale',
      branchTransfer: 'Branch Transfer',
      doNo: 'DO No',
      fromBranch: 'From Branch',
      toBranch: 'To Branch',
      enterDoNo: 'Enter DO No',
      docExists: 'DO No already exists',
      noOrders: 'No orders yet',
      newProduct: 'New Product',
      addProduct: 'Add Product',
      adding: 'Adding...',
      productAdded: 'Product added!',
      productName: 'Product Name',
      productList: 'Product List',
      editProduct: 'Edit Product',
      saveChanges: 'Save Changes',
      stockQty: 'Stock Qty',
      mergeSku: 'Merge SKU',
      mergeSkuDesc: 'Merge the old SKU product, history, and stock into the target SKU, then delete the old SKU. This cannot be undone!',
      oldSku: 'Old SKU (to merge away)',
      targetSku: 'Target SKU',
      confirmMerge: 'Confirm Merge',
      sameSku: 'Cannot merge the same SKU into itself',
      mergedHistoryNotice: 'Stock in/out history will be moved to the target SKU',
      mergedStock: 'Merged Stock',
      noAccessAction: 'You do not have permission for this action',
      cancelOrderDraft: 'Cancel this stock out order? Entered data will be cleared.',
      cancelEditDraft: 'Cancel editing? Changes will not be saved.',
      cancelStockDraft: 'Cancel? Added product rows will be cleared.',
      stockInProcessed: 'This stock in has already been processed',
      productNotFoundPrefix: 'Product not found: ',
      cancelStockInConfirm: 'Cancel this stock in?',
      deleteStockInConfirm: 'Delete this stock in? This cannot be undone.',
      orderNoDetails: 'Order has no details',
      cancelOrderConfirm: 'Cancel this order?',
      deleteDoneOrderConfirm: 'This order is already done!\nDelete {id}?\n(Stock will not be restored automatically; adjust manually)',
      deleteOrderConfirm: 'Delete this order {id}? This cannot be undone.',
      mergeConfirm: 'High-risk action!\n\nThe following SKU will be merged:\n\nOld SKU: {fromName} ({fromID})\n  Stock: {fromStock}\n\nTarget SKU: {toName} ({toID})\n  Current stock: {toStock}\n  Merged stock: {mergedStock}\n\nAll stock in/out history will be moved to the target SKU.\n\nContinue?',
      mergedPrefix: 'Merged: ',
      enterQty: 'Enter quantity',
      stockInNoDetails: 'Stock in has no details',
      stockInNotFound: 'Stock in not found',
      orderProcessed: 'This order has already been processed',
      orderNotFound: 'Order not found',
      skuNotFoundPrefix: 'SKU not found: ',
      enterProductName: 'Enter product name',
      enterSupplierName: 'Enter supplier name',
      productUpdated: 'Product updated',
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
      addAtLeastOneProduct: 'Add at least one product',
      keepOneRow: 'Keep at least one row',
      addedPrefix: 'Added: ',
      langName: 'English'
    }
  };

  let currentLang = localStorage.getItem('gmpos_lang') || 'zh';
  function t(key) { return (LANG[currentLang] || LANG.zh)[key] || key; }
  function tf(key, vars = {}) {
    return t(key).replace(/\{(\w+)\}/g, (_, name) => vars[name] == null ? '' : String(vars[name]));
  }


  // ============================================================
  // Supabase 配置
  // ============================================================
  const SUPABASE_URL = window.__supabaseUrl || 'https://mxiiolycxbhrgpssdhtn.supabase.co';
  const SUPABASE_KEY = window.__supabaseAnonKey || 'sb_publishable_JMooT9uaCI9jAvaRaYQK8g_9-hJXaQp';
  const SB = SUPABASE_URL + '/rest/v1';

  // Auth token helper: uses session token if available, falls back to anon key
  let sbAccessToken = null;
  async function getSupabaseClient() {
    if (window.__supabase) return window.__supabase;
    if (window.__supabasePromise) return window.__supabasePromise;
    return null;
  }
  async function refreshAccessToken() {
    try {
      const sb = await getSupabaseClient();
      if (!sb) { sbAccessToken = null; return; }
      const { data: { session } } = await sb.auth.getSession();
      sbAccessToken = session?.access_token || null;
    } catch (e) {
      sbAccessToken = null;
    }
  }
  function authHeaders() {
    return {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + (sbAccessToken || SUPABASE_KEY)
    };
  }

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
  let orderDraftOriginalTotal = null;
  let poDetailsAmountColumnsReady = true;
  let purchaseOrdersInvoiceColumnReady = true;
  let purchaseOrdersTransferColumnsReady = true;
  let stockInsExternalColumnsReady = true;
  let siPendingItems = [];
  // 进货日期筛选
  let stockInFilterDate = '';

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
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async function sbPost(table, data) {
    const url = SB + '/' + table;
    const res = await fetch(url, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json', 'Prefer': 'return=representation' }, authHeaders()),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + await res.text());
    try { return await res.json(); } catch { return { success: true }; }
  }

  async function sbPatch(table, idCol, idVal, data) {
    const url = SB + '/' + table + '?' + idCol + '=eq.' + encodeURIComponent(idVal);
    const res = await fetch(url, {
      method: 'PATCH',
      headers: Object.assign({ 'Content-Type': 'application/json' }, authHeaders()),
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
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async function sbDelete(table, idCol, idVal) {
    const url = SB + '/' + table + '?' + idCol + '=eq.' + encodeURIComponent(idVal);
    const res = await fetch(url, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(await res.text());
    return true;
  }

  async function sbRpc(rpcName, params) {
    const url = SB + '/rpc/' + rpcName;
    const res = await fetch(url, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, authHeaders()),
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('RPC ' + rpcName + ' failed: ' + await res.text());
    return res.json();
  }

  async function sbGetMaybeFiltered(table, col, val, opts = {}) {
    try {
      return await sbGetFiltered(table, col, val, opts);
    } catch (e) {
      if (String(e.message || '').includes(col)) return null;
      throw e;
    }
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
      const sb = await getSupabaseClient();
      if (sb) {
        const { data, error } = await sb.auth.signInWithPassword({
          email: username + '@gmpos.local',
          password: password
        });
        if (!error && data?.session) {
          sbAccessToken = data.session.access_token;
          const resp = await sbGetFiltered('user_profiles', 'id', data.session.user.id, { select: 'username,display_name,role' });
          if (resp && resp.length > 0) {
            const u = resp[0];
            currentUser = { Username: u.username, DisplayName: u.display_name, Role: u.role };
          } else {
            await sb.auth.signOut().catch(() => {});
            sbAccessToken = null;
            errEl.textContent = t('userNotFound');
            errEl.style.display = 'block';
            btn.disabled = false;
            btn.textContent = t('loginBtn');
            return;
          }
          localStorage.setItem('ycpos_user', JSON.stringify(currentUser));
          document.getElementById('page-login').classList.remove('active');
          document.getElementById('app-main').style.display = 'flex';
          applyPermissions(); applyLang();
          showToast(t('welcome') + currentUser.DisplayName + '\uFF01', 'ok');
          loadAll();
          btn.disabled = false; btn.textContent = t('loginBtn');
          return;
        }
        errEl.textContent = error ? t('wrongPwd') : t('userNotFound');
        errEl.style.display = 'block';
      } else {
        errEl.textContent = t('submitFail') + 'Supabase Auth not ready';
        errEl.style.display = 'block';
      }
    } catch (e) {
      errEl.textContent = t('submitFail') + e.message;
      errEl.style.display = 'block';
    }
    btn.disabled = false;
    btn.textContent = t('loginBtn');
  }

  async function doLogout() {
    currentUser = null;
    sbAccessToken = null;
    localStorage.removeItem('ycpos_user');
    const sb = await getSupabaseClient();
    if (sb) {
      sb.auth.signOut().catch(() => {});
    }
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
    btn.textContent = '↻ ' + t('refresh');
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
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function todayLocal() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
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
      const qty = Number(d.QTY || 0);
      const uprice = Number(d.UnitPrice || d.Price || 0);
      const amount = orderLineAmount(d);
      const pricePart = uprice ? ` <span class="price">@RM${uprice.toFixed(2)}</span>` : '';
      const money = amount ? `<em>RM ${amount.toFixed(2)}</em>` : '';
      return `<div class="order-detail-line">
        <span>${productName}${pricePart}</span>
        <strong>${qty} ${unit}${money}</strong>
      </div>`;
    }).join('');
  }

  function orderLineAmount(detail) {
    const qty = Number((detail && detail.QTY) || 0);
    const unitPrice = Number((detail && (detail.UnitPrice || detail.Price)) || 0);
    const savedAmount = Number((detail && (detail.LineAmount || detail.Amount)) || 0);
    if (savedAmount) return savedAmount;
    return qty * unitPrice;
  }

  function orderDetailTotal(poID) {
    return getOrderDetails(poID).reduce((sum, detail) => sum + orderLineAmount(detail), 0);
  }

  function orderAmountCheck(order) {
    const invoiceTotal = Number((order && order.TotalAmount) || 0);
    const detailTotal = orderDetailTotal(order && order.POID);
    const diff = detailTotal - invoiceTotal;
    return {
      invoiceTotal,
      detailTotal,
      diff,
      mismatch: Math.abs(diff) >= 0.01
    };
  }

  function renderAmountMismatchHtml(check) {
    if (!check || !check.mismatch) return '';
    return `<div class="amount-mismatch">
      <strong>${t('amountMismatch')}</strong>
      <span>${t('invoiceAmount')}: RM${check.invoiceTotal.toFixed(2)}</span>
      <span>${t('detailAmount')}: RM${check.detailTotal.toFixed(2)}</span>
      <span>${t('differenceAmount')}: RM${Math.abs(check.diff).toFixed(2)}</span>
    </div>`;
  }

  function renderSiPendingItems() {
    const container = document.getElementById('si-pending-items');
    if (!container) return;
    if (siPendingItems.length === 0) {
      container.innerHTML = '<div style="font-size:12px;color:var(--text2);padding:8px 0">' + t('noItems') + '</div>';
      return;
    }
    container.innerHTML = siPendingItems.map((item, i) => {
      const priceStr = item.UnitPrice ? ` @RM${Number(item.UnitPrice).toFixed(2)}` : '';
      const lineAmt = item.UnitPrice ? Number(item.UnitPrice) * item.Qty : 0;
      const amtStr = lineAmt ? ` = RM${lineAmt.toFixed(2)}` : '';
      return `<div style="display:flex;gap:8px;align-items:center;padding:8px 0;border-top:1px solid var(--border)">
        <span style="flex:1;font-size:13px">${escapeHTML(item.productName)}${priceStr}</span>
        <strong style="font-size:14px">×${item.Qty}${amtStr}</strong>
        <button class="del-btn sm" data-si-pending-index="${i}">✕</button>
      </div>`;
    }).join('');
    container.querySelectorAll('.del-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const idx = parseInt(this.dataset.siPendingIndex);
        siPendingItems.splice(idx, 1);
        renderSiPendingItems();
      });
    });
  }

  function renderStockInDetailsHtml(siID) {
    const details = getStockInDetails(siID);
    if (details.length === 0) return '<div style="font-size:13px">-</div>';
    return details.map(d => {
      const productName = escapeHTML(getProdName(d.ProductID));
      const unit = getProdUnit(d.ProductID);
      const qty = Number(d.Qty || 0);
      const uprice = Number(d.UnitPrice || 0);
      const lineAmount = Number(d.LineAmount || 0);
      const pricePart = uprice ? ` <span class="price">@RM${uprice.toFixed(2)}</span>` : '';
      const amountPart = lineAmount ? `<em>RM ${lineAmount.toFixed(2)}</em>` : (uprice ? `<em>RM ${(qty * uprice).toFixed(2)}</em>` : '');
      return `<div class="order-detail-line">
        <span>${productName}${pricePart}</span>
        <strong>${qty} ${unit}${amountPart}</strong>
      </div>`;
    }).join('');
  }

  function orderInvoiceNo(order) {
    return String((order && (order.InvoiceNo || order.ExternalInvoiceNo)) || '').trim();
  }

  function externalDocNo(record) {
    return String((record && (record.ExternalDocNo || record.DocNo || record.DONo)) || '').trim();
  }

  function routeText(record) {
    const from = String((record && record.FromBranch) || '').trim();
    const to = String((record && record.ToBranch) || '').trim();
    if (from && to) return from + ' → ' + to;
    return from || to || '';
  }

  function orderDisplayNo(order) {
    return externalDocNo(order) || orderInvoiceNo(order) || String((order && order.POID) || '').trim();
  }

  function orderInternalHint(order) {
    const invoice = orderInvoiceNo(order);
    const poid = String((order && order.POID) || '').trim();
    if (!invoice || !poid || invoice === poid) return '';
    return t('internalOrderNo') + ': ' + poid;
  }

  function orderMatchesSearch(order, query) {
    if (!query) return true;
    const invoice = orderInvoiceNo(order);
    const docNo = externalDocNo(order);
    const haystack = [
      docNo,
      invoice,
      order.POID,
      order.OrderType,
      order.FromBranch,
      order.ToBranch,
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
    const calculatedTotal = calculateOrderTotal();
    const amount = document.getElementById('o-amount');
    if (amount) amount.value = calculatedTotal.toFixed(2);
    renderOrderDraftAmountCheck(null);
    const submit = document.getElementById('btn-order');
    if (submit) submit.disabled = orderDraftRows.length === 0 || calculatedTotal <= 0;
  }

  function getOrderDraftWarningEl() {
    let el = document.getElementById('order-amount-warning');
    if (el) return el;
    const amount = document.getElementById('o-amount');
    if (!amount || !amount.closest('.form-group')) return null;
    el = document.createElement('div');
    el.id = 'order-amount-warning';
    el.className = 'amount-mismatch order-amount-warning';
    amount.closest('.form-group').insertAdjacentElement('afterend', el);
    return el;
  }

  function renderOrderDraftAmountCheck(calculatedTotal) {
    const el = getOrderDraftWarningEl();
    if (!el) return;
    if (calculatedTotal == null || orderDraftOriginalTotal == null) {
      el.style.display = 'none';
      el.innerHTML = '';
      return;
    }
    const diff = calculatedTotal - orderDraftOriginalTotal;
    if (Math.abs(diff) < 0.01) {
      el.style.display = 'none';
      el.innerHTML = '';
      return;
    }
    el.style.display = '';
    el.innerHTML = `<strong>${t('amountMismatch')}</strong>
      <span>${t('invoiceAmount')}: RM${orderDraftOriginalTotal.toFixed(2)}</span>
      <span>${t('detailAmount')}: RM${calculatedTotal.toFixed(2)}</span>
      <span>${t('differenceAmount')}: RM${Math.abs(diff).toFixed(2)}</span>`;
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

  function aggregateOrderQty(rows, qtyKey) {
    const totals = new Map();
    (rows || []).forEach(row => {
      const productID = row && row.ProductID;
      if (!productID) return;
      const qty = Number(row[qtyKey] || 0);
      totals.set(productID, (totals.get(productID) || 0) + qty);
    });
    return totals;
  }

  async function applyDoneOrderStockCorrection(oldDetails, newRows) {
    const oldQty = aggregateOrderQty(oldDetails, 'QTY');
    const newQty = aggregateOrderQty(newRows, 'QTY');
    const productIDs = new Set([...oldQty.keys(), ...newQty.keys()]);
    for (const productID of productIDs) {
      const delta = Number(oldQty.get(productID) || 0) - Number(newQty.get(productID) || 0);
      if (Math.abs(delta) < 0.000001) continue;
      const product = getProd(productID);
      if (!product) throw new Error(t('skuNotFoundPrefix') + productID);
      const nextStock = Number(product.StockBalance || 0) + delta;
      await sbPatch('products', 'ProductID', productID, { StockBalance: nextStock });
      product.StockBalance = nextStock;
    }
  }

  function hasOrderDraftData() {
    const invoice = (document.getElementById('o-poid')?.value || '').trim();
    if (invoice) return true;
    const docNo = (document.getElementById('o-docno')?.value || '').trim();
    if (docNo) return true;
    return orderDraftRows.some(row =>
      row.productID ||
      Number(row.qty || 0) !== 1 ||
      Number(row.unitPrice || 0) > 0
    );
  }

  function toggleOrderTypeFields() {
    const type = document.getElementById('o-type')?.value || 'pos_sale';
    const isTransfer = type === 'branch_transfer';
    const invoiceField = document.getElementById('order-invoice-field');
    const transferFields = document.getElementById('order-transfer-fields');
    if (invoiceField) invoiceField.style.display = isTransfer ? 'none' : '';
    if (transferFields) transferFields.style.display = isTransfer ? '' : 'none';
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

  async function patchOrderDetail(detailID, detail) {
    const fullPayload = {
      POID: detail.POID,
      ProductID: detail.ProductID,
      QTY: detail.QTY,
      UnitPrice: detail.UnitPrice,
      LineAmount: detail.LineAmount
    };
    if (poDetailsAmountColumnsReady) {
      try {
        return await sbPatch('po_details', 'DetailID', detailID, fullPayload);
      } catch (e) {
        if (!String(e.message || '').includes('UnitPrice') && !String(e.message || '').includes('LineAmount')) throw e;
        poDetailsAmountColumnsReady = false;
      }
    }
    return sbPatch('po_details', 'DetailID', detailID, {
      POID: detail.POID,
      ProductID: detail.ProductID,
      QTY: detail.QTY
    });
  }

  function isMissingColumnError(e, columnName) {
    const msg = String((e && e.message) || e || '');
    return msg.includes(columnName) || msg.includes('PGRST204');
  }

  async function invoiceExists(invoiceNo, exceptPOID = '') {
    const invoice = String(invoiceNo || '').trim();
    if (!invoice) return false;

    if (purchaseOrdersInvoiceColumnReady) {
      const byInvoice = await sbGetMaybeFiltered('purchase_orders', 'InvoiceNo', invoice, { select: 'POID,InvoiceNo' });
      if (byInvoice === null) {
        purchaseOrdersInvoiceColumnReady = false;
      } else if (byInvoice.some(o => o.POID !== exceptPOID)) {
        return true;
      }
    }

    const byOldPOID = await sbGetFiltered('purchase_orders', 'POID', invoice, { select: 'POID' });
    return byOldPOID.some(o => o.POID !== exceptPOID);
  }

  async function orderDocExists(docNo, exceptPOID = '') {
    const doc = String(docNo || '').trim();
    if (!doc) return false;
    if (purchaseOrdersTransferColumnsReady) {
      const byDoc = await sbGetMaybeFiltered('purchase_orders', 'ExternalDocNo', doc, { select: 'POID,ExternalDocNo' });
      if (byDoc === null) {
        purchaseOrdersTransferColumnsReady = false;
      } else if (byDoc.some(o => o.POID !== exceptPOID)) {
        return true;
      }
    }
    const byOldPOID = await sbGetFiltered('purchase_orders', 'POID', doc, { select: 'POID' });
    return byOldPOID.some(o => o.POID !== exceptPOID);
  }

  function missingAnyColumn(e, columns) {
    return columns.some(col => isMissingColumnError(e, col));
  }

  async function postPurchaseOrderWithInvoice(payload, fallbackPayload) {
    if (purchaseOrdersInvoiceColumnReady) {
      try {
        return await sbPost('purchase_orders', payload);
      } catch (e) {
        if (!missingAnyColumn(e, ['InvoiceNo', 'OrderType', 'ExternalDocNo', 'FromBranch', 'ToBranch'])) throw e;
        purchaseOrdersInvoiceColumnReady = false;
        purchaseOrdersTransferColumnsReady = false;
      }
    }
    return sbPost('purchase_orders', fallbackPayload);
  }

  async function patchPurchaseOrderMeta(poid, meta, totalAmount) {
    if (purchaseOrdersInvoiceColumnReady) {
      try {
        await sbPatch('purchase_orders', 'POID', poid, Object.assign({}, meta, { TotalAmount: totalAmount }));
        return { finalPOID: poid, poidChanged: false };
      } catch (e) {
        if (!missingAnyColumn(e, ['InvoiceNo', 'OrderType', 'ExternalDocNo', 'FromBranch', 'ToBranch'])) throw e;
        purchaseOrdersInvoiceColumnReady = false;
        purchaseOrdersTransferColumnsReady = false;
      }
    }

    const finalPOID = meta.ExternalDocNo || meta.InvoiceNo || poid;
    await sbPatch('purchase_orders', 'POID', poid, { POID: finalPOID, TotalAmount: totalAmount });
    return { finalPOID, poidChanged: finalPOID !== poid };
  }

  async function postStockInWithExternal(payload, fallbackPayload) {
    if (stockInsExternalColumnsReady) {
      try {
        return await sbPost('stock_ins', payload);
      } catch (e) {
        if (!missingAnyColumn(e, ['ExternalDocNo', 'FromBranch', 'ToBranch'])) throw e;
        stockInsExternalColumnsReady = false;
      }
    }
    return sbPost('stock_ins', fallbackPayload);
  }

  async function patchStockInMeta(stockInID, payload, fallbackPayload) {
    if (stockInsExternalColumnsReady) {
      try {
        await sbPatch('stock_ins', 'StockInID', stockInID, payload);
        return;
      } catch (e) {
        if (!missingAnyColumn(e, ['ExternalDocNo', 'FromBranch', 'ToBranch'])) throw e;
        stockInsExternalColumnsReady = false;
      }
    }
    await sbPatch('stock_ins', 'StockInID', stockInID, fallbackPayload);
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
          ${isAdmin() ? `<button class="edit-btn" data-type="product" data-id="${p.ProductID}" style="background:var(--blue-light);color:var(--blue);border:none;width:28px;height:28px;border-radius:8px;font-size:14px;cursor:pointer" title="${t('editProduct')}">✎</button>` : ''}
          ${isAdmin() ? `<button class="del-btn" data-type="product" data-id="${p.ProductID}">✕</button>` : ''}
        </div>
      </div>`
    ).join('');
    attachDeleteHandlers(container);
    attachEditProductHandlers(container);
    renderProductsPageAdditions();
  }

  function renderProductsPageAdditions() {
    const sectionTitle = document.querySelector('#page-products .section-title');
    if (sectionTitle && isAdmin() && !document.getElementById('btn-merge-sku-header')) {
      const mergeBtn = document.createElement('button');
      mergeBtn.id = 'btn-merge-sku-header';
      mergeBtn.textContent = '🔀 ' + t('mergeSku');
      mergeBtn.style.cssText = 'float:right;font-size:11px;background:var(--red-light);color:var(--red);border:1px solid var(--border);border-radius:8px;padding:2px 8px;cursor:pointer;font-weight:500';
      mergeBtn.onclick = window.openMergeSku;
      sectionTitle.appendChild(mergeBtn);
    }
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
    const q = (document.getElementById('stockin-search').value || '').trim().toLowerCase();
    const container = document.getElementById('stockin-list');

    // 日期筛选：有搜索词时忽略日期，跨全部搜索
    const dateInput = document.getElementById('stockin-date');
    const today = todayLocal();
    if (!dateInput.value) dateInput.value = today;
    const filterDate = dateInput.value;
    dateInput.disabled = !!q;
    dateInput.title = q ? '搜索时会跨全部日期；清空搜索后日期筛选恢复' : '';

    const list = state.stockIns.filter(s => {
      if (q) {
        // 有搜索词：跨全部记录，支持模糊匹配（去掉前缀）
        const searchText = [externalDocNo(s), s.StockInID, s.FromBranch, s.ToBranch, getSupName(s.SupplierID)].join(' ').toLowerCase();
        const searchDigits = searchText.replace(/[^0-9]/g, '');
        const qDigits = q.replace(/[^0-9]/g, '');
        const matchesID = searchText.includes(q) || (qDigits && searchDigits.includes(qDigits));
        const matchesSup = getSupName(s.SupplierID).toLowerCase().includes(q);
        return matchesID || matchesSup;
      }
      // 无搜索词：按日期筛选
      const sDate = String(s.Date).slice(0,10);
      return sDate === filterDate;
    });
    const searchNotice = q ? `<div class="empty" style="padding:8px 10px;margin-bottom:8px;text-align:left">${t('searchAllDates')}${escapeHTML(q)}</div>` : '';
    if (list.length === 0) {
      container.innerHTML = searchNotice + '<div class="empty">' + t('noStockin') + '</div>';
      return;
    }
    container.innerHTML = searchNotice + [...list].reverse().map(s => {
      const date = String(s.Date).slice(0,10);
      const status = s.Status || 'pending';
      const displayNo = externalDocNo(s) || s.StockInID;
      const route = routeText(s);
      let statusBadge = '';
      let actions = '';
      if (status === 'pending') {
        statusBadge = '<span class="badge badge-pending">' + t('orderPending') + '</span>';
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
          <span class="mono">${escapeHTML(displayNo)}</span>
          ${statusBadge}
          ${isAdmin() && status === 'pending' ? `<button class="del-btn sm" onclick="window.deleteStockIn('${s.StockInID}')">✕</button>` : ''}
        </div>
        <div class="order-detail-list">${renderStockInDetailsHtml(s.StockInID)}</div>
        <div class="row-sub">${escapeHTML(getSupName(s.SupplierID))} · ${date}${route ? ' · ' + escapeHTML(route) : ''}${s.TotalAmount ? ' · RM' + Number(s.TotalAmount).toFixed(2) : ''}</div>
        ${status === 'pending' ? `<div class="row-actions">${actions}</div>` : ''}
      </div>`;
    }).join('');
  }

  function renderOrders() {
    const q = (document.getElementById('order-search').value || '').trim().toLowerCase();
    const container = document.getElementById('orders-list');

    // 日期筛选：有搜索词时忽略日期，跨全部搜索
    const dateInput = document.getElementById('order-date');
    const today = todayLocal();
    if (!dateInput.value) dateInput.value = today;
    const filterDate = dateInput.value;
    dateInput.disabled = !!q;
    dateInput.title = q ? '搜索时会跨全部日期；清空搜索后日期筛选恢复' : '';

    const list = state.orders.filter(o => {
      if (q) {
        // 有搜索词：跨全部记录，支持模糊匹配（去掉前缀）
        const searchText = [orderDisplayNo(o), o.POID, o.OrderType, o.FromBranch, o.ToBranch].join(' ').toLowerCase();
        const searchDigits = searchText.replace(/[^0-9]/g, '');
        const qDigits = q.replace(/[^0-9]/g, '');
        if (searchText.includes(q) || (qDigits && searchDigits.includes(qDigits))) return true;
        return orderMatchesSearch(o, q);
      }
      // 无搜索词：按日期筛选
      const oDate = String(o.Date).slice(0,10);
      return oDate === filterDate;
    });
    const searchNotice = q ? `<div class="empty" style="padding:8px 10px;margin-bottom:8px;text-align:left">${t('searchAllDates')}${escapeHTML(q)}</div>` : '';
    if (list.length === 0) {
      container.innerHTML = searchNotice + '<div class="empty">' + t('noOrders') + '</div>';
      return;
    }

    container.innerHTML = searchNotice + [...list].reverse().map(o => {
      const date = String(o.Date).slice(0,10);
      const status = o.Status || 'pending';
      const displayNo = orderDisplayNo(o);
      const internalHint = orderInternalHint(o);
      const isTransfer = (o.OrderType || 'pos_sale') === 'branch_transfer';
      const typeLabel = isTransfer ? t('branchTransfer') : t('posSale');
      const route = routeText(o);
      const amountCheck = orderAmountCheck(o);
      const mismatchBadge = amountCheck.mismatch ? '<span class="badge badge-mismatch">' + t('amountMismatch') + '</span>' : '';
      const canEditDone = status === 'done' && isAdmin();
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
        if (canEditDone) {
          actions += `<button class="btn-sm btn-edit" onclick="window.editOrder('${o.POID}')">${t('orderEdit')}</button>`;
        }
      }

      return `<div class="card${amountCheck.mismatch ? ' card-mismatch' : ''}">
        <div class="row-flex" style="margin-bottom:5px">
          <span class="mono">${escapeHTML(displayNo)}</span>
          <span class="order-badges">${statusBadge}${mismatchBadge}</span>
          ${isAdmin() ? `<button class="del-btn sm" onclick="window.deleteOrder('${o.POID}')">✕</button>` : ''}
        </div>
        <div class="order-detail-list">${renderOrderDetailsHtml(o.POID)}</div>
        <div class="row-sub">${date} · ${typeLabel}${route ? ' · ' + escapeHTML(route) : ''} · RM${Number(o.TotalAmount || 0).toFixed(2)}${internalHint ? ' · ' + escapeHTML(internalHint) : ''}</div>
        ${renderAmountMismatchHtml(amountCheck)}
        ${actions ? `<div class="row-actions">${actions}</div>` : ''}
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
    const today = todayLocal();
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
      const url = SB + '/purchase_orders?Date=eq.' + encodeURIComponent(dateStr) + '&Status=eq.done&order=Time';
      const res = await fetch(url, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      });
      if (!res.ok) throw new Error(await res.text());
      const orders = (await res.json()).filter(o => (o.OrderType || 'pos_sale') !== 'branch_transfer');
      let total = 0, count = 0, totalBoxes = 0;
      const productSummary = new Map();
      const orderRows = [];
      for (const o of orders) {
        total += Number(o.TotalAmount || 0);
        count++;
        const url2 = SB + '/po_details?POID=eq.' + encodeURIComponent(o.POID) + '&select=ProductID,QTY,UnitPrice,LineAmount';
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
            const uprice = Number(d.UnitPrice || 0);
            const lineAmt = Number(d.LineAmount || 0);
            totalBoxes += qty;
            orderItems.push({ ProductID: d.ProductID, name, unit, qty, uprice, lineAmt });

            const key = d.ProductID;
            const current = productSummary.get(key) || { ProductID: key, name, unit, qty: 0 };
            current.qty += qty;
            productSummary.set(key, current);
          }
        }
        orderRows.push({ POID: o.POID, InvoiceNo: orderInvoiceNo(o), Time: o.Time, TotalAmount: Number(o.TotalAmount || 0), items: orderItems });
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
        const itemHtml = o.items.map(item => {
          const priceStr = item.uprice ? ' @RM' + item.uprice.toFixed(2) : '';
          const lineAmt = item.lineAmt || (item.uprice ? item.qty * item.uprice : 0);
          const lineStr = lineAmt ? ' RM ' + lineAmt.toFixed(2) : '';
          return '<div class="report-order-item">' +
            '<span>' + escapeHTML(item.name) + priceStr + '</span>' +
            '<strong>' + item.qty + ' ' + escapeHTML(item.unit) + lineStr + '</strong>' +
          '</div>';
        }).join('');
        return `<div class="card report-order-card">
          <div class="row-flex">
            <span class="mono">${escapeHTML(orderDisplayNo(o))}</span>
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
      showToast(t('noAccessAction'), 'err');
      return;
    }
    state.currentModal = modalId;
    document.getElementById(modalId).classList.add('open');
    if (modalId === 'modal-order') {
      orderDraftOriginalTotal = null;
      document.getElementById('o-editing-poid').value = '';
      document.getElementById('o-editing-detailid').value = '';
      document.getElementById('o-type').value = 'pos_sale';
      document.getElementById('o-docno').value = '';
      document.getElementById('o-from-branch').value = 'YP';
      document.getElementById('o-to-branch').value = '';
      toggleOrderTypeFields();
      resetOrderDraft();
    }
    if (modalId === 'modal-si') {
      if (!document.getElementById('f-from-branch').value) document.getElementById('f-from-branch').value = 'HQ/KL';
      if (!document.getElementById('f-to-branch').value) document.getElementById('f-to-branch').value = 'YP';
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
      document.getElementById('o-docno').value = '';
      document.getElementById('o-from-branch').value = 'YP';
      document.getElementById('o-to-branch').value = '';
      document.getElementById('o-type').value = 'pos_sale';
      toggleOrderTypeFields();
      document.getElementById('o-editing-poid').value = '';
      document.getElementById('o-editing-detailid').value = '';
      orderDraftRows = [];
      orderDraftOriginalTotal = null;
      renderOrderDraftAmountCheck(0);
    }
    if (wasStockInEdit) {
      const title = document.querySelector('#modal-si .modal-title');
      if (title) title.textContent = t('newStockin');
      document.getElementById('btn-si').textContent = t('confirmStockin');
      document.getElementById('f-editing-siid').value = '';
      document.getElementById('f-docno').value = '';
      document.getElementById('f-from-branch').value = '';
      document.getElementById('f-to-branch').value = '';
      document.getElementById('si-edit-rows').innerHTML = '';
      document.getElementById('si-new-row-area').style.display = '';
      document.getElementById('f-amount').value = '';
      siPendingItems = [];
      renderSiPendingItems();
    }
    if (state.currentModal) {
      document.getElementById(state.currentModal).classList.remove('open');
      state.currentModal = null;
    }
  }

  function requestCloseModal() {
    if (state.currentModal === 'modal-order' && hasOrderDraftData()) {
      if (!confirm(t('cancelOrderDraft'))) return;
    }
    if (state.currentModal === 'modal-si') {
      const editingSIID = document.getElementById('f-editing-siid').value;
      if (editingSIID && document.querySelectorAll('#si-edit-rows .si-edit-row').length > 0) {
        if (!confirm(t('cancelEditDraft'))) return;
      } else if (siPendingItems.length > 0) {
        if (!confirm(t('cancelStockDraft'))) return;
      }
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
        // 计算自动总金额（从明细行算出）
        let autoTotal = 0;
        document.querySelectorAll('#si-edit-rows .si-edit-row').forEach(row => {
          const q = parseInt(row.querySelector('.si-edit-qty').value);
          const p = parseFloat(row.querySelector('.si-edit-price')?.value) || 0;
          if (q > 0) autoTotal += q * p;
        });
        const stockInMeta = {
          SupplierID: document.getElementById('f-sup').value,
          ExternalDocNo: document.getElementById('f-docno').value.trim(),
          FromBranch: document.getElementById('f-from-branch').value.trim(),
          ToBranch: document.getElementById('f-to-branch').value.trim(),
          TotalAmount: autoTotal || parseFloat(document.getElementById('f-amount').value) || 0
        };
        await patchStockInMeta(editingSIID, stockInMeta, {
          SupplierID: stockInMeta.SupplierID,
          TotalAmount: stockInMeta.TotalAmount
        });
        // 收集所有还留在画面上的 detailId
        const keptDetailIds = new Set();
        const rows = document.querySelectorAll('#si-edit-rows .si-edit-row');
        for (const row of rows) {
          const detailId = row.dataset.detailid;
          const prodEl = row.querySelector('.si-edit-prod');
          const qtyEl = row.querySelector('.si-edit-qty');
          const priceEl = row.querySelector('.si-edit-price');
          const productID = prodEl.value;
          const qty = parseInt(qtyEl.value);
          const unitPrice = parseFloat(priceEl?.value) || 0;
          if (!qty || qty < 1) continue;
          keptDetailIds.add(detailId);
          await sbPatch('stock_in_details', 'DetailID', detailId, {
            ProductID: productID, Qty: qty,
            UnitPrice: unitPrice, LineAmount: qty * unitPrice
          });
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
      if (siPendingItems.length === 0) { showToast(t('addAtLeastOneProduct'), 'err'); return; }
      const btn = document.getElementById('btn-si');
      btn.disabled = true;
      btn.textContent = t('submitting');
      try {
        const now = new Date();
        const dateStr = todayLocal();
        const timeStr = now.toTimeString().slice(0,8);
        const uid = Math.random().toString(36).slice(2, 6);
        const stockInID = `S01-${dateStr.replace(/-/g,'').slice(2)}-${uid}`;
        const supplierID = document.getElementById('f-sup').value;

        const totalAmount = siPendingItems.reduce((sum, item) => {
          const price = Number(item.UnitPrice || 0);
          return sum + (price ? item.Qty * price : 0);
        }, 0);

        const stockInMeta = {
          StockInID: stockInID, Date: dateStr, Time: timeStr,
          SupplierID: supplierID, Status: 'pending',
          ExternalDocNo: document.getElementById('f-docno').value.trim(),
          FromBranch: document.getElementById('f-from-branch').value.trim(),
          ToBranch: document.getElementById('f-to-branch').value.trim(),
          TotalAmount: totalAmount || parseFloat(document.getElementById('f-amount').value) || 0
        };
        await postStockInWithExternal(stockInMeta, {
          StockInID: stockInID, Date: dateStr, Time: timeStr,
          SupplierID: supplierID, Status: 'pending',
          TotalAmount: stockInMeta.TotalAmount
        });
        for (const item of siPendingItems) {
          const detailID = Math.random().toString(36).slice(2, 10);
          const unitPrice = Number(item.UnitPrice || 0);
          const lineAmount = unitPrice ? item.Qty * unitPrice : 0;
          await sbPost('stock_in_details', {
            DetailID: detailID, StockInID: stockInID, ProductID: item.ProductID, Qty: item.Qty,
            UnitPrice: unitPrice, LineAmount: lineAmount
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
    document.getElementById('f-docno').value = '';
    document.getElementById('f-from-branch').value = '';
    document.getElementById('f-to-branch').value = '';
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
      const result = await sbRpc('confirm_stock_in', { p_stock_in_id: stockInID });
      if (result.ok) {
        showToast(t('confirmStockin') + ' ✅', 'ok');
      } else if (result.status === 'already_processed') {
        showToast(t('stockInProcessed'), 'err');
      } else if (result.status === 'no_details') {
        showToast(t('stockInNoDetails'), 'err');
      } else if (result.status === 'not_found') {
        showToast(t('stockInNotFound'), 'err');
      } else if (result.status === 'invalid_product') {
        showToast(t('productNotFoundPrefix') + (result.message || ''), 'err');
      } else {
        showToast(t('submitFail') + (result.message || result.status), 'err');
      }
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
  };

  window.cancelStockIn = async function(stockInID) {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    if (!confirm(t('cancelStockInConfirm'))) return;
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
    if (!si) { showToast(t('stockInNotFound'), 'err'); return; }
    const details = getStockInDetails(stockInID);
    if (!details || details.length === 0) { showToast(t('stockInNoDetails'), 'err'); return; }

    document.getElementById('si-new-row-area').style.display = 'none';
    document.getElementById('f-editing-siid').value = stockInID;
    document.getElementById('f-docno').value = externalDocNo(si);
    document.getElementById('f-from-branch').value = si.FromBranch || '';
    document.getElementById('f-to-branch').value = si.ToBranch || '';

    const container = document.getElementById('si-edit-rows');
    container.innerHTML = details.map(d => {
      const opts = Array.from(state.products.values()).map(p =>
        `<option value="${p.ProductID}" ${p.ProductID === d.ProductID ? 'selected' : ''}>${escapeHTML(p.ProductName)} (${p.Grade || ''})</option>`
      ).join('');
      const uprice = Number(d.UnitPrice || 0);
      const lineAmt = uprice ? Number(d.Qty) * uprice : 0;
      return `<div class="form-group si-edit-row" data-detailid="${d.DetailID}" style="display:flex;gap:6px;align-items:end;padding:8px 0;border-top:1px solid var(--border)">
        <div style="flex:1;min-width:100px">
          <label class="form-label" style="font-size:11px">${t('product')}</label>
          <select class="si-edit-prod">${opts}</select>
        </div>
        <div style="width:70px">
          <label class="form-label" style="font-size:11px">${t('qty')}</label>
          <input type="number" class="si-edit-qty" value="${d.Qty}" min="1" inputmode="numeric" style="width:100%">
        </div>
        <div style="width:90px">
          <label class="form-label" style="font-size:11px">${t('unitPrice')} (RM)</label>
          <input type="number" class="si-edit-price" value="${uprice.toFixed(2)}" min="0" step="0.01" inputmode="decimal" style="width:100%">
        </div>
        <div style="width:70px">
          <label class="form-label" style="font-size:11px">${t('lineTotal')}</label>
          <div class="order-line-total" style="min-height:43px;display:flex;align-items:center;justify-content:flex-end;padding:0 8px;border:1px solid var(--border);border-radius:10px;background:var(--bg);font-size:14px;font-weight:700">RM ${lineAmt.toFixed(2)}</div>
        </div>
        <button class="del-btn si-edit-del" style="margin-bottom:4px">✕</button>
      </div>`;
    }).join('');

    // 先设置旧总金额
    document.getElementById('f-amount').value = si.TotalAmount || '';

    // 事件绑定：数量/单价变化重算行小计 + 总金额
    container.querySelectorAll('.si-edit-qty, .si-edit-price').forEach(el => {
      el.addEventListener('input', function() {
        const row = this.closest('.si-edit-row');
        const qty = parseFloat(row.querySelector('.si-edit-qty').value) || 0;
        const price = parseFloat(row.querySelector('.si-edit-price').value) || 0;
        const lineTotal = row.querySelector('.order-line-total');
        if (lineTotal) lineTotal.textContent = 'RM ' + (qty * price).toFixed(2);
        siRecalcTotal();
      });
    });

    // 事件绑定：删除行按钮
    container.querySelectorAll('.si-edit-del').forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest('.si-edit-row');
        // 至少保留一行
        if (document.querySelectorAll('#si-edit-rows .si-edit-row').length <= 1) {
          showToast(t('keepOneRow'), 'err');
          return;
        }
        row.remove();
        siRecalcTotal();
      });
    });

    // 用明细重算覆盖旧总金额
    siRecalcTotal();
    const title = document.querySelector('#modal-si .modal-title');
    if (title) title.textContent = t('newStockin') + ' - ' + t('orderEdit');
    document.getElementById('btn-si').textContent = t('saveChanges');
    document.getElementById('f-sup').value = si.SupplierID || '';

    document.getElementById('modal-si').classList.add('open');
    state.currentModal = 'modal-si';
  };

  window.deleteStockIn = async function(stockInID) {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    if (!confirm(t('deleteStockInConfirm'))) return;
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

    if (!canUseModal('modal-supplier')) { showToast('无权操作', 'err'); return; }
    const name = document.getElementById('ns-name').value.trim();
    if (!name) { showToast(t('enterSupplierName'), 'err'); return; }
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
        const dateStr = todayLocal();
      const timeStr = now.toTimeString().slice(0,8);
      const uid = Math.random().toString(36).slice(2, 6);
      const requestedInvoiceNo = document.getElementById('o-poid').value.trim();
      const orderType = document.getElementById('o-type').value || 'pos_sale';
      const externalDocNo = document.getElementById('o-docno').value.trim();
      const fromBranch = document.getElementById('o-from-branch').value.trim();
      const toBranch = document.getElementById('o-to-branch').value.trim();
      if (orderType === 'branch_transfer' && !externalDocNo) throw new Error(t('enterDoNo'));
      const poID = `GM-${dateStr.replace(/-/g,'').slice(2)}-${uid}`;
      const editingPOID = document.getElementById('o-editing-poid').value;
      const totalAmount = rows.reduce((sum, row) => sum + row.LineAmount, 0);
      const editingOrder = editingPOID ? state.orders.find(o => o.POID === editingPOID) : null;
      const editingStatus = editingOrder ? (editingOrder.Status || 'pending') : 'pending';
      if (editingPOID && editingStatus === 'done' && !isAdmin()) {
        throw new Error(t('noPermission'));
      }
      const orderMeta = {
        InvoiceNo: orderType === 'pos_sale' ? requestedInvoiceNo : '',
        OrderType: orderType,
        ExternalDocNo: orderType === 'branch_transfer' ? externalDocNo : '',
        FromBranch: orderType === 'branch_transfer' ? fromBranch : '',
        ToBranch: orderType === 'branch_transfer' ? toBranch : ''
      };

      if (editingPOID) {
        if (orderMeta.InvoiceNo && await invoiceExists(orderMeta.InvoiceNo, editingPOID)) {
          throw new Error(t('invoiceExists'));
        }
        if (orderMeta.ExternalDocNo && await orderDocExists(orderMeta.ExternalDocNo, editingPOID)) {
          throw new Error(t('docExists'));
        }
        const oldDetails = getOrderDetails(editingPOID);
        const patchResult = await patchPurchaseOrderMeta(editingPOID, orderMeta, totalAmount);
        const finalPOID = patchResult.finalPOID;
        const keptDetailIds = new Set();
        for (const row of rows) {
          const detailID = row.detailID || Math.random().toString(36).slice(2, 10);
          keptDetailIds.add(detailID);
          const detailPayload = {
            DetailID: detailID,
            POID: finalPOID,
            ProductID: row.ProductID,
            QTY: row.QTY,
            UnitPrice: row.UnitPrice,
            LineAmount: row.LineAmount
          };
          if (row.detailID) {
            await patchOrderDetail(row.detailID, detailPayload);
          } else {
            await postOrderDetail(detailPayload);
          }
        }
        for (const d of getOrderDetails(editingPOID)) {
          if (!keptDetailIds.has(d.DetailID)) {
            await sbDelete('po_details', 'DetailID', d.DetailID);
          }
        }
        if (editingStatus === 'done') {
          await applyDoneOrderStockCorrection(oldDetails, rows);
        }
        showToast(t('orderUpdated'), 'ok');
      } else {
        if (orderMeta.InvoiceNo && await invoiceExists(orderMeta.InvoiceNo)) {
          throw new Error(t('invoiceExists'));
        }
        if (orderMeta.ExternalDocNo && await orderDocExists(orderMeta.ExternalDocNo)) {
          throw new Error(t('docExists'));
        }
        const fallbackPOID = orderMeta.ExternalDocNo || orderMeta.InvoiceNo || poID;
        await postPurchaseOrderWithInvoice(
          Object.assign({ POID: poID, Date: dateStr, Time: timeStr, CustomerID: 'WALK-IN', Status: 'pending', TotalAmount: totalAmount }, orderMeta),
          { POID: fallbackPOID, Date: dateStr, Time: timeStr, CustomerID: 'WALK-IN', Status: 'pending', TotalAmount: totalAmount }
        );
        const detailPOID = purchaseOrdersInvoiceColumnReady ? poID : fallbackPOID;
        for (const row of rows) {
          await postOrderDetail({
            DetailID: Math.random().toString(36).slice(2, 10),
            POID: detailPOID,
            ProductID: row.ProductID,
            QTY: row.QTY,
            UnitPrice: row.UnitPrice,
            LineAmount: row.LineAmount
          });
        }
        showToast(t('orderSuccess'), 'ok');
      }

      document.getElementById('o-poid').value = '';
      document.getElementById('o-docno').value = '';
      document.getElementById('o-from-branch').value = '';
      document.getElementById('o-to-branch').value = '';
      document.getElementById('o-type').value = 'pos_sale';
      toggleOrderTypeFields();
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
      const result = await sbRpc('confirm_order', { p_po_id: poID });
      if (result.ok) {
        showToast(t('orderConfirm') + ' ✅', 'ok');
      } else if (result.status === 'already_processed') {
        showToast(t('orderProcessed'), 'err');
      } else if (result.status === 'no_details') {
        showToast(t('orderNoDetails'), 'err');
      } else if (result.status === 'not_found') {
        showToast(t('orderNotFound'), 'err');
      } else if (result.status === 'invalid_product') {
        showToast(t('productNotFoundPrefix') + (result.message || ''), 'err');
      } else {
        showToast(t('submitFail') + (result.message || result.status), 'err');
      }
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
  }; 

  window.cancelOrder = async function(poID) {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    if (!confirm(t('cancelOrderConfirm'))) return;
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
    if (!order) { showToast(t('orderNotFound'), 'err'); return; }
    const status = order.Status || 'pending';
    if (status !== 'pending' && !isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    if (status === 'cancelled') { showToast(t('orderProcessed'), 'err'); return; }
    const details = getOrderDetails(poID);
    if (!details.length) { showToast(t('orderNoDetails'), 'err'); return; }

    // 预填 modal
    const orderType = order.OrderType || (externalDocNo(order) ? 'branch_transfer' : 'pos_sale');
    document.getElementById('o-type').value = orderType;
    document.getElementById('o-poid').value = orderType === 'pos_sale' ? (orderInvoiceNo(order) || poID) : '';
    document.getElementById('o-docno').value = externalDocNo(order);
    document.getElementById('o-from-branch').value = order.FromBranch || (orderType === 'branch_transfer' ? 'YP' : '');
    document.getElementById('o-to-branch').value = order.ToBranch || '';
    toggleOrderTypeFields();
    orderDraftOriginalTotal = null;
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
    // 找到订单状态
    const order = state.orders.find(o => o.POID === poID);
    const status = order ? order.Status : 'unknown';
    const msg = status === 'done'
      ? '⚠️ ' + tf('deleteDoneOrderConfirm', { id: poID })
      : tf('deleteOrderConfirm', { id: poID });
    if (!confirm(msg)) return;
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
  // 产品编辑功能（admin）
  // ============================================================
  function attachEditProductHandlers(container) {
    container.querySelectorAll('.edit-btn[data-type="product"]').forEach(btn => {
      btn.addEventListener('click', function() {
        if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
        const productID = this.dataset.id;
        const p = state.products.get(productID);
    if (!p) { showToast(t('productNotFoundPrefix'), 'err'); return; }

        document.getElementById('ep-id').value = productID;
        document.getElementById('ep-name').value = p.ProductName || '';
        document.getElementById('ep-grade').value = p.Grade || '';
        document.getElementById('ep-unit').value = p.Unit || 'kg';
        document.getElementById('ep-stock').value = p.StockBalance || 0;

        state.currentModal = 'modal-edit-prod';
        document.getElementById('modal-edit-prod').classList.add('open');
      });
    });
  }

  async function submitEditProduct() {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    const productID = document.getElementById('ep-id').value;
    const name = document.getElementById('ep-name').value.trim();
    if (!name) { showToast(t('enterProductName'), 'err'); return; }
    const btn = document.getElementById('btn-edit-prod');
    btn.disabled = true;
    btn.textContent = t('submitting');
    try {
      await sbPatch('products', 'ProductID', productID, {
        ProductName: name,
        Grade: document.getElementById('ep-grade').value,
        Unit: document.getElementById('ep-unit').value,
        StockBalance: parseFloat(document.getElementById('ep-stock').value) || 0
      });
      showToast(t('productUpdated'), 'ok');
      closeModal();
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = t('saveChanges');
  }

  // ============================================================
  // 产品 SKU 合并功能（admin only）
  // ============================================================
  window.openMergeSku = function() {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }

    const opts = Array.from(state.products.values())
      .map(p => `<option value="${p.ProductID}">${escapeHTML(p.ProductName)} (${p.Grade || '-'}) · ${Number(p.StockBalance)} ${p.Unit || 'kg'}</option>`)
      .join('');

    document.getElementById('ms-from').innerHTML = opts;
    document.getElementById('ms-to').innerHTML = opts;

        document.getElementById('ms-preview').textContent = t('oldSku') + ' / ' + t('targetSku');
    document.getElementById('btn-merge-sku').disabled = true;

    state.currentModal = 'modal-merge-sku';
    document.getElementById('modal-merge-sku').classList.add('open');
  };

  // 当两个 select 都选了时显示预览
  function updateMergePreview() {
    const fromID = document.getElementById('ms-from').value;
    const toID = document.getElementById('ms-to').value;
    const btn = document.getElementById('btn-merge-sku');
    if (!fromID || !toID) { btn.disabled = true; return; }
    if (fromID === toID) {
      document.getElementById('ms-preview').textContent = '⚠️ ' + t('sameSku');
      btn.disabled = true;
      return;
    }
    const from = state.products.get(fromID);
    const to = state.products.get(toID);
    if (!from || !to) { btn.disabled = true; return; }
    document.getElementById('ms-preview').innerHTML =
      `<strong>${t('oldSku')}:</strong> ${escapeHTML(from.ProductName)} (${from.Grade || '-'}) · ${t('stockQty')} ${from.StockBalance}<br>` +
      `<strong>${t('targetSku')}:</strong> ${escapeHTML(to.ProductName)} (${to.Grade || '-'}) · ${t('stockQty')} ${to.StockBalance}<br>` +
      `<strong>${t('mergedStock')}:</strong> ${Number(from.StockBalance || 0) + Number(to.StockBalance || 0)}<br>` +
      `<span style="color:var(--red)">⚠️ ${t('mergedHistoryNotice')}</span>`;
    btn.disabled = false;
  }

  async function submitMergeSku() {
    if (!isAdmin()) { showToast(t('noPermission'), 'err'); return; }
    const fromID = document.getElementById('ms-from').value;
    const toID = document.getElementById('ms-to').value;
    if (!fromID || !toID) return;
    if (fromID === toID) { showToast(t('sameSku'), 'err'); return; }

    // 二次确认
    const from = state.products.get(fromID);
    const to = state.products.get(toID);
    const msg = '⚠️ ' + tf('mergeConfirm', {
      fromName: from.ProductName,
      fromID,
      fromStock: from.StockBalance,
      toName: to.ProductName,
      toID,
      toStock: to.StockBalance,
      mergedStock: Number(from.StockBalance||0) + Number(to.StockBalance||0)
    });
    if (!confirm(msg)) return;

    const btn = document.getElementById('btn-merge-sku');
    btn.disabled = true;
    btn.textContent = t('submitting');
    try {
      // 通过 RPC 事务完成合并
      const displayName = currentUser ? currentUser.DisplayName : '';
      const result = await sbRpc('merge_sku', { p_from_id: fromID, p_to_id: toID });
      if (result.ok) {
        showToast(t('mergedPrefix') + `${from.ProductName} → ${to.ProductName}`, 'ok');
        closeModal();
      } else if (result.status === 'not_found') {
        showToast(t('skuNotFoundPrefix') + (result.message || ''), 'err');
      } else if (result.status === 'same_sku') {
        showToast(t('sameSku'), 'err');
      } else {
        showToast(t('submitFail') + (result.message || result.status), 'err');
      }
      await loadAll();
    } catch (e) {
      showToast(t('submitFail') + e.message, 'err');
    }
    btn.disabled = false;
    btn.textContent = t('confirmMerge');
  }
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
    const role = document.getElementById('au-role').value;
    if (!username || !display || !role) { showToast(t('fillAll'), 'err'); return; }
    const btn = document.getElementById('btn-adduser');
    btn.disabled = true;
    btn.textContent = t('addingUser');
    try {
      const exist = await sbGetFiltered('user_profiles', 'username', username, { select: 'username' });
      if (exist && exist.length > 0) { showToast(t('userExists'), 'err'); btn.disabled = false; btn.textContent = t('addUserBtn'); return; }
      showToast('请先在 Supabase Dashboard 创建 Auth 用户，再在 user_profiles 中添加对应资料。', 'err');
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
      // Verify current password via Supabase Auth re-auth, then update
      const sb = await getSupabaseClient();
      if (!sb) { showToast(t('submitFail') + 'Supabase Auth not ready', 'err'); btn.disabled = false; btn.textContent = t('changePwd'); return; }
      const { error: signInErr } = await sb.auth.signInWithPassword({
        email: currentUser.Username + '@gmpos.local',
        password: oldPw
      });
      if (signInErr) { showToast(t('wrongCurrentPwd'), 'err'); btn.disabled = false; btn.textContent = t('changePwd'); return; }
      const { error: updateErr } = await sb.auth.updateUser({ password: newPw });
      if (updateErr) { showToast(t('submitFail') + updateErr.message, 'err'); btn.disabled = false; btn.textContent = t('changePwd'); return; }
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
    const loginTitle = document.querySelector('.login-title');
    if (loginTitle) loginTitle.textContent = t('appTitle');
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) headerTitle.textContent = t('appTitle');
    document.getElementById('label-user').textContent = t('username');
    document.getElementById('label-pass').textContent = t('password');
    document.getElementById('login-sub').textContent = t('loginSub');
    document.getElementById('login-btn').textContent = t('loginBtn');
    document.getElementById('login-user').placeholder = t('username');
    document.getElementById('login-pass').placeholder = t('password');

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
    const productTitle = document.querySelector('#page-products .section-title');
    if (productTitle) productTitle.textContent = t('productList');
    const stockInTitle = document.querySelector('#page-stockin .section-title');
    if (stockInTitle) stockInTitle.textContent = t('stockinRecords');
    const ordersTitle = document.querySelector('#page-orders .section-title');
    if (ordersTitle) ordersTitle.textContent = t('orders');
    const suppliersTitle = document.querySelector('#page-suppliers .section-title');
    if (suppliersTitle) suppliersTitle.textContent = t('suppliers');
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
    const lblSiUp = document.getElementById('lbl-si-unitprice');
    if (lblSiUp) lblSiUp.textContent = t('unitPrice') + ' (RM)';
    const lblSiDo = document.getElementById('lbl-si-do');
    if (lblSiDo) lblSiDo.textContent = t('doNo');
    const lblSiFrom = document.getElementById('lbl-si-from');
    if (lblSiFrom) lblSiFrom.textContent = t('fromBranch');
    const lblSiTo = document.getElementById('lbl-si-to');
    if (lblSiTo) lblSiTo.textContent = t('toBranch');

    // 产品 modal
    const prodTitle = document.querySelector('#modal-prod .modal-title');
    if (prodTitle) prodTitle.textContent = t('newProduct');
    document.getElementById('btn-prod').textContent = t('addProduct');
    const prodCancel = document.querySelector('#modal-prod .btn-cancel');
    if (prodCancel) prodCancel.textContent = t('cancel');
    const lblProdName = document.getElementById('lbl-prod-name');
    if (lblProdName) lblProdName.textContent = t('productName');
    const npName = document.getElementById('np-name');
    if (npName) npName.placeholder = t('productNamePlaceholder');
    const lblProdGrade = document.getElementById('lbl-prod-grade');
    if (lblProdGrade) lblProdGrade.textContent = t('grade');
    const npGrade = document.getElementById('np-grade');
    if (npGrade) npGrade.placeholder = t('gradePlaceholder');
    const lblProdUnit = document.getElementById('lbl-prod-unit');
    if (lblProdUnit) lblProdUnit.textContent = 'Unit';

    // 编辑产品 modal
    const editProdTitle = document.querySelector('#modal-edit-prod .modal-title');
    if (editProdTitle) editProdTitle.textContent = t('editProduct');
    const btnEditProd = document.getElementById('btn-edit-prod');
    if (btnEditProd) btnEditProd.textContent = t('saveChanges');
    const editProdCancel = document.querySelector('#modal-edit-prod .btn-cancel-modal');
    if (editProdCancel) editProdCancel.textContent = t('cancel');
    const editProdLabels = document.querySelectorAll('#modal-edit-prod .form-label');
    if (editProdLabels[0]) editProdLabels[0].textContent = t('productName');
    if (editProdLabels[1]) editProdLabels[1].textContent = t('grade');
    if (editProdLabels[2]) editProdLabels[2].textContent = 'Unit';
    if (editProdLabels[3]) editProdLabels[3].textContent = t('stockQty');
    const epName = document.getElementById('ep-name');
    if (epName) epName.placeholder = t('productNamePlaceholder');
    const epGrade = document.getElementById('ep-grade');
    if (epGrade) epGrade.placeholder = t('gradePlaceholder');

    // 合并 SKU modal
    const mergeTitle = document.querySelector('#modal-merge-sku .modal-title');
    if (mergeTitle) mergeTitle.textContent = t('mergeSku');
    const mergeDesc = document.querySelector('#modal-merge-sku p');
    if (mergeDesc) mergeDesc.textContent = t('mergeSkuDesc');
    const mergeLabels = document.querySelectorAll('#modal-merge-sku .form-label');
    if (mergeLabels[0]) mergeLabels[0].textContent = t('oldSku');
    if (mergeLabels[1]) mergeLabels[1].textContent = t('targetSku');
    const btnMerge = document.getElementById('btn-merge-sku');
    if (btnMerge) btnMerge.textContent = t('confirmMerge');
    const mergeCancel = document.querySelector('#modal-merge-sku .btn-cancel-modal');
    if (mergeCancel) mergeCancel.textContent = t('cancel');

    // 供应商 modal
    const supTitle = document.querySelector('#modal-supplier .modal-title');
    if (supTitle) supTitle.textContent = t('newSupplier');
    document.getElementById('btn-supplier').textContent = t('addSupplier');
    const supCancel = document.querySelector('#modal-supplier .btn-cancel-modal');
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
    const orderCancel = document.querySelector('#modal-order .btn-cancel-modal');
    if (orderCancel) orderCancel.textContent = t('cancel');
    const lblOrderProd = document.getElementById('lbl-order-product');
    if (lblOrderProd) lblOrderProd.textContent = t('product');
    const lblOrderAmt = document.getElementById('lbl-order-amount');
    if (lblOrderAmt) lblOrderAmt.textContent = t('totalAmount');
    const lblOrderInvoice = document.getElementById('lbl-order-invoice');
    if (lblOrderInvoice) lblOrderInvoice.textContent = t('externalInvoiceNo');
    const lblOrderType = document.getElementById('lbl-order-type');
    if (lblOrderType) lblOrderType.textContent = t('orderType');
    const orderTypeSelect = document.getElementById('o-type');
    if (orderTypeSelect) {
      if (orderTypeSelect.options[0]) orderTypeSelect.options[0].text = t('posSale');
      if (orderTypeSelect.options[1]) orderTypeSelect.options[1].text = t('branchTransfer');
    }
    const lblOrderDo = document.getElementById('lbl-order-do');
    if (lblOrderDo) lblOrderDo.textContent = t('doNo');
    const lblOrderFrom = document.getElementById('lbl-order-from');
    if (lblOrderFrom) lblOrderFrom.textContent = t('fromBranch');
    const lblOrderTo = document.getElementById('lbl-order-to');
    if (lblOrderTo) lblOrderTo.textContent = t('toBranch');
    const orderPOID = document.getElementById('o-poid');
    if (orderPOID) orderPOID.placeholder = t('autoGenerate');
    const btnOrderAddItem = document.getElementById('btn-order-add-item');
    if (btnOrderAddItem) btnOrderAddItem.textContent = '+ ' + t('addOrderItem');

    // 新增用户 modal
    const auTitle = document.querySelector('#modal-adduser .modal-title');
    if (auTitle) auTitle.textContent = t('addUser');
    document.getElementById('btn-adduser').textContent = t('addUserBtn');
    const auCancel = document.querySelector('#modal-adduser .btn-cancel-modal');
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
    const cpCancel = document.querySelector('#modal-changepw .btn-cancel-modal');
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
    // 尝试恢复 Supabase Auth session
    getSupabaseClient().then(sb => {
      if (!sb) return;
      sb.auth.getSession().then(({ data: { session } }) => {
        if (session) sbAccessToken = session.access_token;
      });
      sb.auth.onAuthStateChange((event, session) => {
        if (session) {
          sbAccessToken = session.access_token;
        } else if (event === 'SIGNED_OUT') {
          sbAccessToken = null;
        }
      });
    });

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
    document.getElementById('stockin-date').addEventListener('change', renderStockIn);
    document.getElementById('order-date').addEventListener('change', renderOrders);
    document.getElementById('o-type').addEventListener('change', toggleOrderTypeFields);

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
      const priceEl = document.getElementById('f-si-price');
      const productID = prodEl.value;
      const productName = prodEl.options[prodEl.selectedIndex]?.text || productID;
      const qty = parseInt(qtyEl.value);
      if (!qty || qty < 1) { showToast(t('enterQty'), 'err'); return; }
      const unitPrice = parseFloat(priceEl.value) || 0;
      siPendingItems.push({ ProductID: productID, productName, Qty: qty, UnitPrice: unitPrice });
      renderSiPendingItems();
      qtyEl.value = '';
      priceEl.value = '';
      showToast(`${t('addedPrefix')}${productName} x${qty}${unitPrice ? ' @RM'+unitPrice.toFixed(2) : ''}`, 'ok');
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
    document.getElementById('btn-edit-prod').addEventListener('click', submitEditProduct);
    document.getElementById('btn-supplier').addEventListener('click', submitSupplier);
    document.getElementById('btn-order').addEventListener('click', submitOrder);
    document.getElementById('btn-adduser').addEventListener('click', submitAddUser);
    document.getElementById('btn-changepw').addEventListener('click', submitChangePassword);
    document.getElementById('btn-merge-sku').addEventListener('click', submitMergeSku);
    document.getElementById('ms-from').addEventListener('change', updateMergePreview);
    document.getElementById('ms-to').addEventListener('change', updateMergePreview);

    // 取消按钮关闭
    document.querySelectorAll('.btn-cancel-modal').forEach(btn => {
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
