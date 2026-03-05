// State Management
const state = {
    user: null, // { username, role }
    currentArea: null // 'sales', 'inventory', etc.
};

// DOM Elements
const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('login-form');
const detailNavBar = document.getElementById('detail-nav-bar');
const mainContent = document.getElementById('main-content');

// Helper to show/hide
const show = (elem) => elem && elem.classList.remove('hidden');
const hide = (elem) => elem && elem.classList.add('hidden');

// Login Handler (Updated for new UI)
function handleLogin(role) {
    // Deprecated: used by single sign-in now via form submit
}

// Login Handler (Updated for single button)
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;

        if (username.toLowerCase().includes('admin')) {
            login({ username: 'Administrator', role: 'admin' });
        } else {
            login({ username: 'User', role: 'user' });
        }
    });
}

function login(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    if (user.role === 'admin') {
        window.location.href = 'overview.html'; // Admin lands on dashboard with all opts
    } else {
        window.location.href = 'sales_order.html'; // User lands directly on operational page
    }
}

// Admin Dashboard Renderer
function renderAdminDashboard() {
    const main = document.getElementById('main-content');
    if (!main) return;

    const customers = state.customers ? state.customers.length : 0;
    const items = state.items ? state.items.length : 0;
    const quotations = state.quotations ? state.quotations.length : 0;
    const salesorders = state.salesorders ? state.salesorders.length : 0;

    const statCards = [
        { label: 'Active Customers', value: customers, icon: 'fas fa-users', color: '#2563eb', bg: '#eff6ff' },
        { label: 'Total Items', value: items, icon: 'fas fa-box', color: '#10b981', bg: '#f0fdf4' },
        { label: 'Quotations', value: quotations, icon: 'fas fa-file-invoice', color: '#f59e0b', bg: '#fffbeb' },
        { label: 'Sales Orders', value: salesorders, icon: 'fas fa-shopping-cart', color: '#ef4444', bg: '#fef2f2' },
    ];

    const statCardsHtml = statCards.map(s => `
        <div style="background:#fff;border-radius:14px;padding:1.25rem 1.5rem;
            box-shadow:0 2px 10px rgba(0,0,0,0.06);flex:1;min-width:0;
            border:1px solid #f1f5f9;">
            <div style="width:38px;height:38px;border-radius:9px;background:${s.bg};
                color:${s.color};display:grid;place-items:center;font-size:1rem;margin-bottom:0.85rem;">
                <i class="${s.icon}"></i>
            </div>
            <div style="font-size:0.78rem;color:#64748b;margin-bottom:0.3rem;">${s.label}</div>
            <div style="font-size:1.8rem;font-weight:700;color:#1e293b;line-height:1;">${s.value}</div>
        </div>
    `).join('');

    const lifecycleSteps = [
        { label: 'Customer', sub: 'Master Data', icon: 'fas fa-users', color: '#2563eb', bg: '#eff6ff', link: 'customer.html' },
        { label: 'Items', sub: 'Product Catalog', icon: 'fas fa-box', color: '#10b981', bg: '#f0fdf4', link: 'items.html' },
        { label: 'Price List', sub: 'Pricing Setup', icon: 'fas fa-tags', color: '#f59e0b', bg: '#fffbeb', link: 'pricelist.html' },
        { label: 'Quotation', sub: 'Bid Initiation', icon: 'fas fa-file-invoice', color: '#a855f7', bg: '#fdf4ff', link: 'quotation.html' },
        { label: 'Sales Order', sub: 'Order Confirmation', icon: 'fas fa-shopping-cart', color: '#ef4444', bg: '#fef2f2', link: 'sales_order.html' },
    ];

    const lifecycleHtml = lifecycleSteps.map((s, i) => `
        <div onclick="window.location.href='${s.link}'" style="flex:1;min-width:0;
            background:#fff;border-radius:14px;padding:1.25rem 1rem;
            box-shadow:0 2px 10px rgba(0,0,0,0.06);border:1px solid #f1f5f9;
            text-align:center;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;"
            onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 20px rgba(0,0,0,0.1)'"
            onmouseout="this.style.transform='none';this.style.boxShadow='0 2px 10px rgba(0,0,0,0.06)'">
            <div style="width:46px;height:46px;border-radius:50%;background:${s.bg};
                color:${s.color};display:grid;place-items:center;font-size:1.1rem;margin:0 auto 0.75rem;">
                <i class="${s.icon}"></i>
            </div>
            <div style="font-weight:700;font-size:0.875rem;color:#1e293b;margin-bottom:0.2rem;">${s.label}</div>
            <div style="font-size:0.72rem;color:#94a3b8;">${s.sub}</div>
        </div>
        ${i < lifecycleSteps.length - 1
            ? '<i class="fas fa-chevron-right" style="color:#cbd5e1;font-size:0.9rem;flex-shrink:0;"></i>'
            : ''}
    `).join('');

    main.innerHTML = `
        <div style="box-sizing:border-box;padding-bottom:1rem;">

            <h2 style="margin:0 0 0.2rem;font-size:1.6rem;font-weight:700;color:#1e293b;">Sales Module Dashboard</h2>
            <p style="margin:0 0 1.5rem;color:#64748b;font-size:0.875rem;">Welcome back, Administrator. Here is your sales status.</p>

            <div style="display:flex;gap:1rem;margin-bottom:1.25rem;">
                ${statCardsHtml}
            </div>

            <div style="background:#fff;border-radius:14px;padding:1.5rem;
                box-shadow:0 2px 10px rgba(0,0,0,0.06);border:1px solid #f1f5f9;">
                <div style="font-size:1rem;font-weight:700;color:#1e293b;margin-bottom:1.25rem;">
                    Sales Lifecycle Navigation
                </div>
                <div style="display:flex;align-items:center;gap:0.75rem;">
                    ${lifecycleHtml}
                </div>
            </div>

        </div>
    `;
}



// Functional Dashboard Renderer (The main UI request)
function renderFunctionalDashboard(areaName) {
    show(detailNavBar); // Show the specific links like "Customer Table", etc.

    // Populate Detail Nav (Image 2)
    renderDetailNav();

    // Render Main Stats and Form (Image 1)
    mainContent.innerHTML = `
        <!-- Stats Row -->
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-title">Total Items</div>
                <div class="stat-value">50</div>
            </div>
             <div class="stat-card">
                <div class="stat-title">Total Customers</div>
                <div class="stat-value">20</div>
            </div>
             <div class="stat-card">
                <div class="stat-title">Avg Price</div>
                <div class="stat-value">$489</div>
            </div>
        </div>

        <!-- Add Record Form -->
        <div class="card">
            <div class="card-header">
                <i class="far fa-file-alt"></i> Add New Record
            </div>
            
            <form id="add-record-form" onsubmit="event.preventDefault(); alert('Record Added (Simulation)');">
                <div class="form-row">
                    <div class="form-group">
                        <label>Record Number *</label>
                        <input type="number" placeholder="Enter ID">
                    </div>
                    <div class="form-group">
                        <label>Customer *</label>
                        <input type="text" placeholder="Customer Name">
                    </div>
                     <div class="form-group">
                        <label>Item *</label>
                        <input type="text" placeholder="Item Name">
                    </div>
                     <div class="form-group">
                        <label>Price ($) *</label>
                        <input type="number" placeholder="0.00">
                    </div>
                </div>
                
                <div class="form-group" style="max-width: 300px;">
                    <label>Payment Terms *</label>
                    <select style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #ddd;">
                        <option>Select Payment Terms</option>
                        <option>Net 30</option>
                        <option>COD</option>
                    </select>
                </div>

                <div style="margin-top: 1.5rem;">
                    <button type="submit" class="btn-primary" style="width: auto; padding: 0.75rem 2rem; margin-right: 1rem;">Add Record</button>
                    <button type="reset" class="btn-secondary">Reset</button>
                </div>
            </form>
        </div>

        <!-- Data Table Placeholder -->
        <div class="search-bar">
            <input type="text" placeholder="Search master records..." style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #ddd;">
        </div>

        <div class="data-table-header">
            <div>Number</div>
            <div>Customer</div>
            <div>Item</div>
            <div>Price</div>
            <div>Payment Terms</div>
            <div>Actions</div>
        </div>
         <div class="data-table-row">
            <div>101</div>
            <div>Acme Corp</div>
            <div>Widget A</div>
            <div>$50.00</div>
            <div>Net 30</div>
            <div><i class="fas fa-edit" style="color: #667eea; cursor: pointer;"></i></div>
        </div>
         <div class="data-table-row">
            <div>102</div>
            <div>Globex Inc</div>
            <div>Gadget B</div>
            <div>$120.00</div>
            <div>COD</div>
            <div><i class="fas fa-edit" style="color: #667eea; cursor: pointer;"></i></div>
        </div>
        
        <button onclick="logout()" class="btn-secondary" style="margin-top: 2rem;">Logout</button>
    `;
}

// Mock Data for Customers (Expanded)
state.customers = [
    { id: 'SC0001', code: 'SC0001', name: 'ABJ Hardware', address: 'Manila, Philippines', email: 'abjhardware@email.com', phone: '9170000001', active: 'TRUE' },
    { id: 'SC0002', code: 'SC0002', name: 'Lipa Builders', address: 'Lipa City, Batangas', email: 'lipabuilders@email.com', phone: '9170000002', active: 'TRUE' },
    { id: 'SC0003', code: 'SC0003', name: 'San Isidro Ventures', address: 'San Isidro, Nueva Ecija', email: 'sanisidro@email.com', phone: '9170000003', active: 'TRUE' },
    { id: 'SC0004', code: 'SC0004', name: 'JM Glass Supply', address: 'Quezon City', email: 'jmglass@email.com', phone: '9170000004', active: 'TRUE' },
    { id: 'SC0005', code: 'SC0005', name: 'Perez Trading', address: 'Caloocan City', email: 'pereztrading@email.com', phone: '9170000005', active: 'TRUE' },
    { id: 'SC0006', code: 'SC0006', name: 'South Builders Corp', address: 'Makati City', email: 'southbuilders@email.com', phone: '9170000006', active: 'TRUE' },
    { id: 'SC0007', code: 'SC0007', name: 'AltaVista Realty', address: 'Taguig City', email: 'altavista@email.com', phone: '9170000007', active: 'TRUE' },
    { id: 'SC0008', code: 'SC0008', name: 'Morales Enterprises', address: 'Pasig City', email: 'moralesent@email.com', phone: '9170000008', active: 'TRUE' },
    { id: 'SC0009', code: 'SC0009', name: 'OL Construction', address: 'Valenzuela City', email: 'olconstruction@email.com', phone: '9170000009', active: 'TRUE' },
    { id: 'SC0010', code: 'SC0010', name: 'Jaxon Steel Supply', address: 'Bulacan', email: 'jaxonsteel@email.com', phone: '9170000010', active: 'TRUE' },
    { id: 'SC0011', code: 'SC0011', name: 'Angel Builders', address: 'Antipolo City', email: 'angelbuilders@email.com', phone: '9170000011', active: 'TRUE' },
    { id: 'SC0012', code: 'SC0012', name: 'Northstar Contracts', address: 'Cebu City', email: 'northstar@email.com', phone: '9170000012', active: 'TRUE' },
    { id: 'SC0013', code: 'SC0013', name: 'JCL Renovations', address: 'Laguna', email: 'jclreno@email.com', phone: '9170000013', active: 'TRUE' },
    { id: 'SC0014', code: 'SC0014', name: 'Dizon Trading', address: 'Tarlac City', email: 'dizontrading@email.com', phone: '9170000014', active: 'TRUE' },
    { id: 'SC0015', code: 'SC0015', name: 'Verde Construction', address: 'Bacoor, Cavite', email: 'verdeconst@email.com', phone: '9170000015', active: 'TRUE' },
    { id: 'SC0016', code: 'SC0016', name: 'Golden Brick Co.', address: 'San Pedro, Laguna', email: 'goldenbrick@email.com', phone: '9170000016', active: 'TRUE' },
    { id: 'SC0017', code: 'SC0017', name: 'San Miguel Realty', address: 'San Miguel, Bulacan', email: 'sanmiguelrealty@email.com', phone: '9170000017', active: 'TRUE' },
    { id: 'SC0018', code: 'SC0018', name: 'J&F Electrical', address: 'Angeles City', email: 'jfelectrical@email.com', phone: '9170000018', active: 'TRUE' },
    { id: 'SC0019', code: 'SC0019', name: 'EGD Builders', address: 'Iloilo City', email: 'egdbuilders@email.com', phone: '9170000019', active: 'TRUE' },
    { id: 'SC0020', code: 'SC0020', name: 'KJ Warehouse', address: 'Cainta, Rizal', email: 'kjwarehouse@email.com', phone: '9170000020', active: 'TRUE' }
];

state.items = [
    { id: 'SI0001', code: 'SI0001', name: 'Laptop', type: 'Hardware', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0002', code: 'SI0002', name: 'Mouse', type: 'Peripheral', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0003', code: 'SI0003', name: 'Keyboard', type: 'Peripheral', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0004', code: 'SI0004', name: 'Desktop PC', type: 'Hardware', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0005', code: 'SI0005', name: 'Monitor', type: 'Peripheral', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0006', code: 'SI0006', name: 'Printer', type: 'Peripheral', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0007', code: 'SI0007', name: 'Server', type: 'Hardware', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0008', code: 'SI0008', name: 'Router', type: 'Networking', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0009', code: 'SI0009', name: 'Switch', type: 'Networking', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0010', code: 'SI0010', name: 'Docking Station', type: 'Accessory', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0011', code: 'SI0011', name: 'Headset', type: 'Accessory', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0012', code: 'SI0012', name: 'Tablet', type: 'Hardware', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0013', code: 'SI0013', name: 'Stylus Pen', type: 'Accessory', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0014', code: 'SI0014', name: 'SSD 1TB', type: 'Component', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0015', code: 'SI0015', name: 'RAM 16GB', type: 'Component', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0016', code: 'SI0016', name: 'Power Supply', type: 'Component', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0017', code: 'SI0017', name: 'Firewall', type: 'Networking', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0018', code: 'SI0018', name: 'Access Point', type: 'Networking', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0019', code: 'SI0019', name: 'Barcode Scanner', type: 'Peripheral', uom: 'Unit', active: 'TRUE' },
    { id: 'SI0020', code: 'SI0020', name: 'POS Terminal', type: 'Hardware', uom: 'Unit', active: 'TRUE' }
];

state.pricelist = [
    { id: 'SPL0001', item: 'SI0001', currency: 'PHP', price: '850', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0002', item: 'SI0002', currency: 'PHP', price: '15.00', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0003', item: 'SI0003', currency: 'PHP', price: '25', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0004', item: 'SI0004', currency: 'PHP', price: '650', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0005', item: 'SI0005', currency: 'PHP', price: '180', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0006', item: 'SI0006', currency: 'PHP', price: '220', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0007', item: 'SI0007', currency: 'PHP', price: '3700', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0008', item: 'SI0008', currency: 'PHP', price: '350', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0009', item: 'SI0009', currency: 'PHP', price: '290', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0010', item: 'SI0010', currency: 'PHP', price: '120', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0011', item: 'SI0011', currency: 'PHP', price: '60', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0012', item: 'SI0012', currency: 'PHP', price: '450', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0013', item: 'SI0013', currency: 'PHP', price: '35', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0014', item: 'SI0014', currency: 'PHP', price: '110', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0015', item: 'SI0015', currency: 'PHP', price: '85', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0016', item: 'SI0016', currency: 'PHP', price: '95', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0017', item: 'SI0017', currency: 'PHP', price: '780', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0018', item: 'SI0018', currency: 'PHP', price: '210', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0019', item: 'SI0019', currency: 'PHP', price: '160', from: '2026-01-01', to: '2026-12-31' },
    { id: 'SPL0020', item: 'SI0020', currency: 'PHP', price: '980', from: '2026-01-01', to: '2026-12-31' }
];

state.quotations = [
    { id: 'SQ0001', no: 'SQ0001', cust: 'SC0001', opp: 'CO0001', terms: 'SPT0002', status: 'SQS0001', date: '2026-01-01', valid: '2026-01-31', remarks: 'Initial quotation sent' },
    { id: 'SQ0002', no: 'SQ0002', cust: 'SC0002', opp: 'CO0002', terms: 'SPT0005', status: 'SQS0002', date: '2026-01-01', valid: '2026-01-31', remarks: 'Approved by customer' },
    { id: 'SQ0003', no: 'SQ0003', cust: 'SC0003', opp: 'CO0003', terms: 'SPT0003', status: 'SQS0003', date: '2026-01-02', valid: '2026-02-01', remarks: 'Pending approval' },
    { id: 'SQ0004', no: 'SQ0004', cust: 'SC0004', opp: 'CO0004', terms: 'SPT0002', status: 'SQS0004', date: '2026-01-02', valid: '2026-02-01', remarks: 'Quotation rejected' },
    { id: 'SQ0005', no: 'SQ0005', cust: 'SC0005', opp: 'CO0005', terms: 'SPT0005', status: 'SQS0001', date: '2026-01-03', valid: '2026-02-02', remarks: 'Awaiting confirmation' },
    { id: 'SQ0006', no: 'SQ0006', cust: 'SC0006', opp: 'CO0006', terms: 'SPT0002', status: 'SQS0003', date: '2026-01-03', valid: '2026-02-02', remarks: 'Under review' },
    { id: 'SQ0007', no: 'SQ0007', cust: 'SC0007', opp: 'CO0007', terms: 'SPT0003', status: 'SQS0002', date: '2026-01-04', valid: '2026-02-03', remarks: 'Approved quotation' },
    { id: 'SQ0008', no: 'SQ0008', cust: 'SC0008', opp: 'CO0008', terms: 'SPT0005', status: 'SQS0001', date: '2026-01-04', valid: '2026-02-03', remarks: 'Sent via email' },
    { id: 'SQ0009', no: 'SQ0009', cust: 'SC0009', opp: 'CO0009', terms: 'SPT0002', status: 'SQS0003', date: '2026-01-05', valid: '2026-02-04', remarks: 'Pending management approval' },
    { id: 'SQ0010', no: 'SQ0010', cust: 'SC0010', opp: 'CO0010', terms: 'SPT0005', status: 'SQS0001', date: '2026-01-05', valid: '2026-02-04', remarks: 'Follow-up required' },
    { id: 'SQ0011', no: 'SQ0011', cust: 'SC0011', opp: 'CO0011', terms: 'SPT0003', status: 'SQS0002', date: '2026-01-06', valid: '2026-02-05', remarks: 'Approved with conditions' },
    { id: 'SQ0012', no: 'SQ0012', cust: 'SC0012', opp: 'CO0012', terms: 'SPT0005', status: 'SQS0004', date: '2026-01-06', valid: '2026-02-05', remarks: 'Rejected - pricing issue' },
    { id: 'SQ0013', no: 'SQ0013', cust: 'SC0013', opp: 'CO0013', terms: 'SPT0002', status: 'SQS0003', date: '2026-01-07', valid: '2026-02-06', remarks: 'Pending response' },
    { id: 'SQ0014', no: 'SQ0014', cust: 'SC0014', opp: 'CO0014', terms: 'SPT0005', status: 'SQS0001', date: '2026-01-07', valid: '2026-02-06', remarks: 'Sent to customer' },
    { id: 'SQ0015', no: 'SQ0015', cust: 'SC0015', opp: 'CO0015', terms: 'SPT0003', status: 'SQS0002', date: '2026-01-08', valid: '2026-02-07', remarks: 'Approved quotation' },
    { id: 'SQ0016', no: 'SQ0016', cust: 'SC0016', opp: 'CO0016', terms: 'SPT0002', status: 'SQS0003', date: '2026-01-08', valid: '2026-02-07', remarks: 'Awaiting decision' },
    { id: 'SQ0017', no: 'SQ0017', cust: 'SC0017', opp: 'CO0017', terms: 'SPT0005', status: 'SQS0002', date: '2026-01-09', valid: '2026-02-08', remarks: 'Approved - COD' },
    { id: 'SQ0018', no: 'SQ0018', cust: 'SC0018', opp: 'CO0018', terms: 'SPT0005', status: 'SQS0004', date: '2026-01-09', valid: '2026-02-08', remarks: 'Rejected quotation' },
    { id: 'SQ0019', no: 'SQ0019', cust: 'SC0019', opp: 'CO0019', terms: 'SPT0003', status: 'SQS0001', date: '2026-01-10', valid: '2026-02-09', remarks: 'Sent for review' },
    { id: 'SQ0020', no: 'SQ0020', cust: 'SC0020', opp: 'CO0020', terms: 'SPT0002', status: 'SQS0003', date: '2026-01-10', valid: '2026-02-09', remarks: 'Pending approval' }
];

state.salesorders = [
    { id: 'SSO0001', no: 'SSO0001', cust: 'SC0001', quot: 'SQ0001', status: 'SSOS0001', date: '2026-01-01', del: '2026-01-05' },
    { id: 'SSO0002', no: 'SSO0002', cust: 'SC0002', quot: 'SQ0002', status: 'SSOS0002', date: '2026-01-01', del: '2026-01-06' },
    { id: 'SSO0003', no: 'SSO0003', cust: 'SC0003', quot: 'SQ0003', status: 'SSOS0003', date: '2026-01-02', del: '2026-01-07' },
    { id: 'SSO0004', no: 'SSO0004', cust: 'SC0004', quot: 'SQ0004', status: 'SSOS0004', date: '2026-01-02', del: '2026-01-07' },
    { id: 'SSO0005', no: 'SSO0005', cust: 'SC0005', quot: 'SQ0005', status: 'SSOS0001', date: '2026-01-03', del: '2026-01-08' },
    { id: 'SSO0006', no: 'SSO0006', cust: 'SC0006', quot: 'SQ0006', status: 'SSOS0003', date: '2026-01-03', del: '2026-01-09' },
    { id: 'SSO0007', no: 'SSO0007', cust: 'SC0007', quot: 'SQ0007', status: 'SSOS0002', date: '2026-01-04', del: '2026-01-10' },
    { id: 'SSO0008', no: 'SSO0008', cust: 'SC0008', quot: 'SQ0008', status: 'SSOS0001', date: '2026-01-04', del: '2026-01-10' },
    { id: 'SSO0009', no: 'SSO0009', cust: 'SC0009', quot: 'SQ0009', status: 'SSOS0003', date: '2026-01-05', del: '2026-01-11' },
    { id: 'SSO0010', no: 'SSO0010', cust: 'SC0010', quot: 'SQ0010', status: 'SSOS0001', date: '2026-01-05', del: '2026-01-12' },
    { id: 'SSO0011', no: 'SSO0011', cust: 'SC0011', quot: 'SQ0011', status: 'SSOS0002', date: '2026-01-06', del: '2026-01-13' },
    { id: 'SSO0012', no: 'SSO0012', cust: 'SC0012', quot: 'SQ0012', status: 'SSOS0004', date: '2026-01-06', del: '2026-01-13' },
    { id: 'SSO0013', no: 'SSO0013', cust: 'SC0013', quot: 'SQ0013', status: 'SSOS0003', date: '2026-01-07', del: '2026-01-14' },
    { id: 'SSO0014', no: 'SSO0014', cust: 'SC0014', quot: 'SQ0014', status: 'SSOS0001', date: '2026-01-07', del: '2026-01-14' },
    { id: 'SSO0015', no: 'SSO0015', cust: 'SC0015', quot: 'SQ0015', status: 'SSOS0002', date: '2026-01-08', del: '2026-01-15' },
    { id: 'SSO0016', no: 'SSO0016', cust: 'SC0016', quot: 'SQ0016', status: 'SSOS0003', date: '2026-01-08', del: '2026-01-15' },
    { id: 'SSO0017', no: 'SSO0017', cust: 'SC0017', quot: 'SQ0017', status: 'SSOS0002', date: '2026-01-09', del: '2026-01-16' },
    { id: 'SSO0018', no: 'SSO0018', cust: 'SC0018', quot: 'SQ0018', status: 'SSOS0004', date: '2026-01-09', del: '2026-01-16' },
    { id: 'SSO0019', no: 'SSO0019', cust: 'SC0019', quot: 'SQ0019', status: 'SSOS0003', date: '2026-01-10', del: '2026-01-17' },
    { id: 'SSO0020', no: 'SSO0020', cust: 'SC0020', quot: 'SQ0020', status: 'SSOS0001', date: '2026-01-10', del: '2026-01-18' }
];

state.solines = [
    { id: 'SSOL0001', order: 'SSO0001', item: 'SI0001', qty: '1', price: '1,000.00' },
    { id: 'SSOL0002', order: 'SSO0002', item: 'SI0002', qty: '2', price: '1,250' },
    { id: 'SSOL0003', order: 'SSO0003', item: 'SI0003', qty: '3', price: '1,500.00' },
    { id: 'SSOL0004', order: 'SSO0004', item: 'SI0004', qty: '4', price: '1,750' },
    { id: 'SSOL0005', order: 'SSO0005', item: 'SI0005', qty: '5', price: '2000' },
    { id: 'SSOL0006', order: 'SSO0006', item: 'SI0006', qty: '2', price: '220' },
    { id: 'SSOL0007', order: 'SSO0007', item: 'SI0007', qty: '1', price: '3200' },
    { id: 'SSOL0008', order: 'SSO0008', item: 'SI0008', qty: '3', price: '350' },
    { id: 'SSOL0009', order: 'SSO0009', item: 'SI0009', qty: '4', price: '290' },
    { id: 'SSOL0010', order: 'SSO0010', item: 'SI0010', qty: '2', price: '120.00' },
    { id: 'SSOL0011', order: 'SSO0011', item: 'SI0011', qty: '5', price: '60' },
    { id: 'SSOL0012', order: 'SSO0012', item: 'SI0012', qty: '1', price: '450' },
    { id: 'SSOL0013', order: 'SSO0013', item: 'SI0013', qty: '6', price: '35' },
    { id: 'SSOL0014', order: 'SSO0014', item: 'SI0014', qty: '3', price: '110' },
    { id: 'SSOL0015', order: 'SSO0015', item: 'SI0015', qty: '4', price: '85' },
    { id: 'SSOL0016', order: 'SSO0016', item: 'SI0016', qty: '2', price: '95' },
    { id: 'SSOL0017', order: 'SSO0017', item: 'SI0017', qty: '1', price: '780' },
    { id: 'SSOL0018', order: 'SSO0018', item: 'SI0018', qty: '5', price: '210' },
    { id: 'SSOL0019', order: 'SSO0019', item: 'SI0019', qty: '2', price: '160' },
    { id: 'SSOL0020', order: 'SSO0020', item: 'SI0020', qty: '1', price: '980' }
];

// --- Generic Table Render Helper ---
// --- Generic Table Render Helper ---
// --- Generic Table Render Helper ---
function renderDetailNav() {
    // Placeholder to prevent errors since navigation is now handled by the sidebar
}

function renderTable(title, icon, fields, data, gridClass, formFields, onAdd, stateKey) {
    show(detailNavBar);
    renderDetailNav();

    // Generate Form HTML
    const formInputs = formFields.map(f => {
        const requiredAttr = f.required ? 'required' : '';
        const labelHtml = `<label class="form-label">${f.label}</label>`;

        if (f.type === 'select') {
            const options = f.options.map(o => `<option value="${o.value}">${o.text}</option>`).join('');
            return `<div class="form-group">
                        ${labelHtml}
                        <select id="${f.id}" class="form-control" ${requiredAttr}>
                            <option value="">Select ${f.label}</option>
                            ${options}
                        </select>
                    </div>`;
        }
        return `<div class="form-group">
                    ${labelHtml}
                    <input type="${f.type || 'text'}" id="${f.id}" class="form-control" placeholder="${f.placeholder || ''}" ${requiredAttr}>
                </div>`;
    }).join('');

    // Generate Header HTML (Add Actions column)
    const headerHtml = [...fields, 'Actions'].map(f => `<div>${f}</div>`).join('');

    // Generate Rows HTML
    const rowsHtml = data.map(row => {
        const cells = Object.values(row).map(val => `<div>${val}</div>`).join('');
        const actions = `
            <div style="display: flex; gap: 0.5rem; justify-content: center;">
                <button class="action-btn btn-edit" onclick="handleEdit('${stateKey}', '${row.id}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn btn-delete" onclick="handleDelete('${stateKey}', '${row.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        return `<div class="data-table-row ${gridClass}">${cells}${actions}</div>`;
    }).join('');

    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="card">
            <div class="card-header"><i class="${icon}"></i> Add New ${title}</div>
                <div class="form-row">${formInputs}</div>
                <button type="submit" class="btn-primary" style="width: 100%; padding: 0.75rem 2rem;">Add ${title}</button>
            </form>
        </div>
        <div class="data-table-header ${gridClass}">${headerHtml}</div>
        <div id="table-list">${rowsHtml}</div>
    `;

    document.getElementById('add-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newVal = {};
        formFields.forEach((f, index) => {
            const sample = data[0] || {};
            const keys = Object.keys(sample);
            if (keys[index]) newVal[keys[index]] = document.getElementById(f.id).value;
        });

        onAdd(newVal);
        const page = window.location.pathname.split('/').pop();
        if (page === 'customer.html') renderCustomerTable();
        else if (page === 'items.html') renderItems();
        else if (page === 'pricelist.html') renderPriceList();
        else if (page === 'quotation.html') renderQuotation();
        else if (page === 'quotation_line.html') renderQuotationLine();
        else if (page === 'sales_order.html') renderSalesOrder();
        else if (page === 'sales_order_line.html') renderSalesOrderLine();

        alert(`${title} added successfully!`);
    });
}

// Global Handlers
window.handleDelete = (key, id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    state[key] = state[key].filter(item => item.id !== id);

    // Refresh current page
    const page = window.location.pathname.split('/').pop();
    if (page === 'customer.html') renderCustomerTable();
    else if (page === 'items.html') renderItems();
    else if (page === 'pricelist.html') renderPriceList();
    else if (page === 'quotation.html') renderQuotation();
    else if (page === 'quotation_line.html') renderQuotationLine();
    else if (page === 'sales_order.html') renderSalesOrder();
    else if (page === 'sales_order_line.html') renderSalesOrderLine();
};

window.handleEdit = (key, id) => {
    alert(`Edit functionality for ${id} is currently non-destructive. You can modify the code to open a modal.`);
};

// --- Specific Renderers ---

function renderCustomerTable() {
    renderTable(
        'Customer', 'fas fa-users',
        ['ID', 'Code', 'Name', 'Address', 'Email', 'Phone', 'Active'],
        state.customers, 'customer-table-grid',
        [
            { label: 'Customer ID *', id: 'cid', required: true }, { label: 'Code *', id: 'ccode', required: true },
            { label: 'Name *', id: 'cname', required: true }, { label: 'Address', id: 'caddr' },
            { label: 'Email', id: 'cemail', type: 'email' }, { label: 'Phone', id: 'cphone' }, { label: 'Active', id: 'cactive' }
        ],
        (item) => state.customers.unshift(item),
        'customers'
    );
}

function renderItems() {
    renderTable(
        'Item', 'fas fa-box',
        ['ID', 'Code', 'Name', 'Type ID', 'UOM ID', 'Active'],
        state.items, 'items-grid',
        [
            { label: 'Item ID', id: 'iid' }, { label: 'Code', id: 'icode' },
            { label: 'Name', id: 'iname' }, { label: 'Type ID', id: 'itype' },
            { label: 'UOM ID', id: 'iuom' }, { label: 'Active', id: 'iactive' }
        ],
        (item) => state.items.unshift(item),
        'items'
    );
}

function renderPriceList() {
    const itemOptions = state.items.map(i => ({ value: i.id, text: i.name }));
    renderTable(
        'Price List', 'fas fa-tags',
        ['List ID', 'Item ID', 'Currency', 'Unit Price', 'Ef. From', 'Ef. To'],
        state.pricelist, 'pricelist-grid',
        [
            { label: 'List ID', id: 'pid' },
            { label: 'Item', id: 'pitem', type: 'select', options: itemOptions },
            { label: 'Currency', id: 'pcurr' }, { label: 'Unit Price', id: 'pprice' },
            { label: 'Effective From', id: 'pfrom', type: 'date' }, { label: 'Effective To', id: 'pto', type: 'date' }
        ],
        (item) => state.pricelist.unshift(item),
        'pricelist'
    );
}

function renderQuotation() {
    const custOptions = state.customers.map(c => ({ value: c.id, text: c.name }));
    renderTable(
        'Quotation', 'fas fa-file-invoice',
        ['ID', 'No', 'Cust ID', 'Opp ID', 'Terms', 'Status', 'Date', 'Valid', 'Remarks'],
        state.quotations, 'quotation-grid',
        [
            { label: 'Quote ID', id: 'qid' }, { label: 'Quote No', id: 'qno' },
            { label: 'Customer', id: 'qcust', type: 'select', options: custOptions },
            { label: 'Opp. ID', id: 'qopp' },
            { label: 'Pay Terms', id: 'qterms' }, { label: 'Status', id: 'qstatus' },
            { label: 'Date', id: 'qdate', type: 'date' }, { label: 'Valid', id: 'qvalid', type: 'date' }, { label: 'Remarks', id: 'qrem' }
        ],
        (item) => state.quotations.unshift(item),
        'quotations'
    );
}

function renderSalesOrder() {
    const custOptions = state.customers.map(c => ({ value: c.id, text: c.name }));
    const quotOptions = state.quotations.map(q => ({ value: q.id, text: q.no }));

    renderTable(
        'Sales Order', 'fas fa-shopping-cart',
        ['Sales Order ID', 'Sales Order No', 'Customer ID', 'Quotation ID', 'Status ID', 'Order Date', 'Delivery Date'],
        state.salesorders, 'salesorder-grid',
        [
            { label: 'Sales Order ID', id: 'oid' }, { label: 'Sales Order No', id: 'ono' },
            { label: 'Customer', id: 'ocust', type: 'select', options: custOptions },
            { label: 'Quotation', id: 'oquot', type: 'select', options: quotOptions },
            { label: 'Status ID', id: 'ostatus' }, { label: 'Order Date', id: 'odate', type: 'date' }, { label: 'Delivery Date', id: 'odel', type: 'date' }
        ],
        (item) => state.salesorders.unshift(item),
        'salesorders'
    );
}

state.quotationLines = [
    { id: 'SQL0001', quote: 'SQ0001', item: 'SI0001', qty: '1', price: '850.00' },
    { id: 'SQL0002', quote: 'SQ0001', item: 'SI0002', qty: '2', price: '15.00' },
    { id: 'SQL0003', quote: 'SQ0002', item: 'SI0003', qty: '1', price: '25.00' },
    { id: 'SQL0004', quote: 'SQ0003', item: 'SI0001', qty: '5', price: '850.00' },
    { id: 'SQL0005', quote: 'SQ0004', item: 'SI0004', qty: '1', price: '650.00' },
    { id: 'SQL0006', quote: 'SQ0005', item: 'SI0005', qty: '3', price: '180.00' },
    { id: 'SQL0007', quote: 'SQ0005', item: 'SI0006', qty: '2', price: '220.00' },
    { id: 'SQL0008', quote: 'SQ0006', item: 'SI0007', qty: '1', price: '3700.00' },
    { id: 'SQL0009', quote: 'SQ0007', item: 'SI0008', qty: '4', price: '350.00' },
    { id: 'SQL0010', quote: 'SQ0008', item: 'SI0009', qty: '2', price: '290.00' },
    { id: 'SQL0011', quote: 'SQ0009', item: 'SI0010', qty: '10', price: '120.00' },
    { id: 'SQL0012', quote: 'SQ0010', item: 'SI0011', qty: '5', price: '60.00' },
    { id: 'SQL0013', quote: 'SQ0010', item: 'SI0012', qty: '1', price: '450.00' },
    { id: 'SQL0014', quote: 'SQ0011', item: 'SI0013', qty: '20', price: '35.00' },
    { id: 'SQL0015', quote: 'SQ0012', item: 'SI0014', qty: '2', price: '110.00' },
    { id: 'SQL0016', quote: 'SQ0013', item: 'SI0015', qty: '3', price: '85.00' },
    { id: 'SQL0017', quote: 'SQ0014', item: 'SI0016', qty: '1', price: '95.00' },
    { id: 'SQL0018', quote: 'SQ0015', item: 'SI0017', qty: '1', price: '780.00' },
    { id: 'SQL0019', quote: 'SQ0016', item: 'SI0018', qty: '2', price: '210.00' },
    { id: 'SQL0020', quote: 'SQ0017', item: 'SI0019', qty: '4', price: '160.00' }
];

function renderQuotationLine() {
    const quoteOptions = state.quotations.map(q => ({ value: q.id, text: q.no }));
    const itemOptions = state.items.map(i => ({ value: i.id, text: i.name }));

    renderTable(
        'Quotation Line', 'fas fa-list-ul',
        ['Line ID', 'Quote ID', 'Item ID', 'Quantity', 'Unit Price'],
        state.quotationLines, 'quotation-grid',
        [
            { label: 'Line ID', id: 'qlid' },
            { label: 'Quote', id: 'qlquote', type: 'select', options: quoteOptions },
            { label: 'Item', id: 'qlitem', type: 'select', options: itemOptions },
            { label: 'Quantity', id: 'qlqty', type: 'number' },
            { label: 'Unit Price', id: 'qlprice' }
        ],
        (item) => state.quotationLines.unshift(item),
        'quotationLines'
    );
}

function renderSalesOrderLine() {
    const orderOptions = state.salesorders.map(o => ({ value: o.id, text: o.no }));
    const itemOptions = state.items.map(i => ({ value: i.id, text: i.name }));

    renderTable(
        'Sales Order Line', 'fas fa-list',
        ['Line ID', 'Order ID', 'Item ID', 'Quantity', 'Unit Price'],
        state.solines, 'salesorderline-grid',
        [
            { label: 'Line ID', id: 'lid' },
            { label: 'Order', id: 'lord', type: 'select', options: orderOptions },
            { label: 'Item', id: 'litem', type: 'select', options: itemOptions },
            { label: 'Quantity', id: 'lqty', type: 'number' },
            { label: 'Unit Price', id: 'lprice' }
        ],
        (item) => state.solines.unshift(item),
        'solines'
    );
}

// --- Layout & Navigation Manager ---

// --- Layout & Navigation Manager ---

function initSidebarLayout() {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) return;

    // Check if layout is already applied
    if (document.getElementById('sidebar')) return;

    // Clear existing innerHTML structure to rebuild securely or wraps it
    let mainContent = document.getElementById('main-content');

    // Construct Sidebar
    const sidebar = document.createElement('aside');
    sidebar.id = 'sidebar';

    const sessionStr = localStorage.getItem('it3b_session');
    const session = sessionStr ? JSON.parse(sessionStr) : null;
    const role = session ? session.role : 'user';

    let navContent = `
        <div class="brand">
            <div class="brand-icon"><i class="fas fa-cube"></i></div>
            <div style="display: flex; flex-direction: column; line-height: 1.2;">
                <span>IT3B Inc.</span>
                <span style="font-size: 0.75rem; font-weight: 400; color: #94a3b8;">${role === 'admin' ? 'Enterprise Edition' : 'Sales Portal'}</span>
            </div>
        </div>
    `;

    if (role === 'admin') {
        navContent += `
        <a href="../admin/all-erp.html" class="nav-link" style="margin-bottom: 0.5rem; color: #94a3b8; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem;">
            <i class="fas fa-chevron-left" style="font-size: 0.75rem; margin-right: 8px;"></i> Back to Admin Central
        </a>
        `;
    }

    if (role === 'admin') {
        navContent += `
        <div class="nav-section-title">General</div>
        <a href="overview.html" class="nav-link ${isActive('overview.html')}">
            <i class="fas fa-th-large"></i> Overview
        </a>
        <a href="customer.html" class="nav-link ${isActive('customer.html')}">
            <i class="fas fa-users"></i> Customer Table
        </a>
        <a href="items.html" class="nav-link ${isActive('items.html')}">
            <i class="fas fa-box"></i> Items
        </a>
        <a href="pricelist.html" class="nav-link ${isActive('pricelist.html')}">
            <i class="fas fa-tags"></i> Price List
        </a>
        `;
    }

    navContent += `
        <div class="nav-section-title" style="margin-top: 1rem;">Sales</div>
        <a href="quotation.html" class="nav-link ${isActive('quotation.html')}">
            <i class="fas fa-file-invoice"></i> Quotation
        </a>
        <a href="quotation_line.html" class="nav-link ${isActive('quotation_line.html')}">
            <i class="fas fa-list-ul"></i> Quotation Line
        </a>
        <a href="sales_order.html" class="nav-link ${isActive('sales_order.html')}">
            <i class="fas fa-shopping-cart"></i> Sales Order
        </a>
        <a href="sales_order_line.html" class="nav-link ${isActive('sales_order_line.html')}">
            <i class="fas fa-list-ol"></i> Sales Order Line
        </a>
    `;

    if (role === 'admin') {
        navContent += `
        <div class="nav-section-title" style="margin-top: 1rem;">Reports</div>
        <a href="reports.html" class="nav-link ${isActive('reports.html')}">
            <i class="fas fa-chart-bar"></i> Reports
        </a>
        </a>
        `;
    }

    navContent += `
        <div class="spacer"></div>
        <a href="#" onclick="logout(); return false;" class="nav-link" style="color: #ef4444; margin-top: auto;">
            <i class="fas fa-sign-out-alt"></i> Sign Out
        </a>
    `;

    sidebar.innerHTML = navContent;

    // Construct Main Wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'main-wrapper';

    // Construct Header
    const header = document.createElement('div');
    header.id = 'main-header';

    const pageTitles = {
        'overview.html': { title: 'Overview', sub: 'Welcome back. Here is your sales status.' },
        'customer.html': { title: 'Customer Table', sub: 'Manage your customer master data.' },
        'items.html': { title: 'Items', sub: 'View and manage your product catalog.' },
        'pricelist.html': { title: 'Price List', sub: 'Manage item pricing and effective dates.' },
        'quotation.html': { title: 'Quotation', sub: 'Create and manage customer quotations.' },
        'quotation_line.html': { title: 'Quotation Line', sub: 'Manage line items for each quotation.' },
        'sales_order.html': { title: 'Sales Order', sub: 'View and manage confirmed sales orders.' },
        'sales_order_line.html': { title: 'Sales Order Line', sub: 'Manage line items for each sales order.' },
        'reports.html': { title: 'Reports', sub: 'View consolidated sales reports and analytics.' },
    };

    const currentPage = window.location.pathname.split('/').pop();
    const pageInfo = pageTitles[currentPage] || { title: 'Enterprise Navigation', sub: 'Select a functional area to manage operations.' };

    header.innerHTML = `
        <div>
            <h2>${pageInfo.title}</h2>
            <p>${pageInfo.sub}</p>
        </div>
        <div style="font-size: 0.9rem; color: #10b981; font-weight: 500;">
            <i class="fas fa-check-circle"></i> All Operational
        </div>
    `;

    wrapper.appendChild(header);
    if (mainContent) wrapper.appendChild(mainContent);

    // Clear App Container and append new structure
    appContainer.innerHTML = '';
    appContainer.appendChild(sidebar);
    appContainer.appendChild(wrapper);
}

function isActive(page) {
    return window.location.pathname.includes(page) ? 'active-link' : '';
}

function renderDashboardGrid() {
    const main = document.getElementById('main-content');
    if (!main) return;

    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { username: 'Administrator', role: 'admin' };
    const role = user.role;

    if (role === 'admin') {
        renderAdminDashboard();
        return;
    }

    // Counts (Mock)
    const quotesCount = state.quotations ? state.quotations.length : 0;
    const ordersCount = state.salesorders ? state.salesorders.length : 0;

    main.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1>Sales Portal</h1>
                <p>Welcome back, User. Manage your quotations and orders.</p>
            </div>

            <div class="summary-cards">
                <div class="summary-card">
                    <div>
                        <div class="summary-icon" style="background: #fff7ed; color: #f97316;"><i class="fas fa-file-invoice"></i></div>
                        <div class="summary-label">My Quotes</div>
                        <div class="summary-count">${quotesCount}</div>
                    </div>
                </div>
                <div class="summary-card">
                    <div>
                        <div class="summary-icon" style="background: #fdf2f8; color: #ec4899;"><i class="fas fa-shopping-cart"></i></div>
                        <div class="summary-label">My Orders</div>
                        <div class="summary-count">${ordersCount}</div>
                    </div>
                </div>
            </div>

            <div class="lifecycle-section">
                <h3 class="lifecycle-title">Quick Actions</h3>
                <div class="lifecycle-flow">
                    <div class="lifecycle-step" onclick="window.location.href='quotation.html'">
                        <div class="step-icon"><i class="fas fa-file-contract"></i></div>
                        <div class="step-title">New Quote</div>
                        <div class="step-desc">Create Proposal</div>
                    </div>
                    
                    <i class="fas fa-chevron-right flow-arrow"></i>

                    <div class="lifecycle-step" onclick="window.location.href='sales_order.html'">
                        <div class="step-icon"><i class="fas fa-shopping-cart"></i></div>
                        <div class="step-title">New Order</div>
                        <div class="step-desc">Create Sales Order</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createModuleCard(title, desc, icon, link) {
    return `
        <div class="module-card">
            <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                <div class="module-icon"><i class="${icon}"></i></div>
                <div class="module-title">${title}</div>
                <div class="module-desc">${desc}</div>
            </div>
            <a href="${link}" class="btn-open-module">Open Module</a>
        </div>
    `;
}

function logout() {
    sessionStorage.removeItem('user');
    window.location.reload(); // Just reload to guest admin state
}

// --- Report Renderers ---

function renderReports() {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1>System Reports</h1>
                <p>View consolidated data and system analytics.</p>
            </div>
            
            <div class="admin-dashboard-links">
                <div class="admin-link-card" onclick="renderInventoryReport()">
                    <i class="fas fa-boxes fa-3x" style="color: #667eea; margin-bottom: 1rem;"></i>
                    <h3>Inventory Report</h3>
                    <p>View items with their definitions and current pricing.</p>
                </div>
                <div class="admin-link-card" onclick="renderSalesReport()">
                    <i class="fas fa-chart-line fa-3x" style="color: #22c55e; margin-bottom: 1rem;"></i>
                    <h3>Sales Report</h3>
                    <p>View sales orders with customer details and line items.</p>
                </div>
                 <div class="admin-link-card" onclick="renderCustomerReport()">
                    <i class="fas fa-users fa-3x" style="color: #f97316; margin-bottom: 1rem;"></i>
                    <h3>Customer Directory</h3>
                    <p>Full active customer listing.</p>
                </div>
            </div>
            <br>
            <div id="report-output"></div>
        </div>
    `;
}

function renderInventoryReport() {
    const container = document.getElementById('report-output');

    // Join Items and Pricelist
    const data = state.items.map(item => {
        const price = state.pricelist.find(p => p.item === item.id);
        return {
            code: item.code,
            name: item.name,
            uom: item.uom,
            type: item.type,
            price: price ? `${price.currency} ${price.price}` : 'N/A'
        };
    });

    const rows = data.map(d => `
        <div class="data-table-row report-grid" style="grid-template-columns: repeat(5, 1fr);">
            <div>${d.code}</div>
            <div>${d.name}</div>
            <div>${d.type}</div>
            <div>${d.uom}</div>
            <div>${d.price}</div>
        </div>
    `).join('');

    // Prepare Chart Data
    const typeCounts = {};
    data.forEach(d => {
        typeCounts[d.type] = (typeCounts[d.type] || 0) + 1;
    });

    container.innerHTML = `
        <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
            <div class="card" style="flex: 1;">
                <canvas id="inventoryChart"></canvas>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                 <h3>Inventory Overview</h3>
                 <p>Distribution of items by category.</p>
            </div>
        </div>

        <h3>Inventory Listing</h3>
        <div class="card">
            <div class="data-table-header report-grid" style="display:grid; grid-template-columns: repeat(5, 1fr); font-weight:bold; padding:1rem; border-bottom:1px solid #eee;">
                <div>Code</div><div>Name</div><div>Type</div><div>UOM</div><div>Current Price</div>
            </div>
            ${rows}
        </div>
    `;

    // Render Chart
    new Chart(document.getElementById('inventoryChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(typeCounts),
            datasets: [{
                data: Object.values(typeCounts),
                backgroundColor: ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#a855f7', '#ec4899']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

function renderSalesReport() {
    const container = document.getElementById('report-output');

    // Join Sales Orders, Customers
    const data = state.salesorders.map(so => {
        const cust = state.customers.find(c => c.id === so.cust);
        // Calculate total lines
        const lines = state.solines.filter(l => l.order === so.id);
        const total = lines.reduce((sum, l) => sum + (parseFloat(l.qty) * parseFloat(l.price.replace(/,/g, ''))), 0);

        return {
            no: so.no,
            date: so.date,
            customer: cust ? cust.name : so.cust,
            items: lines.length,
            totalVal: total,
            total: total.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })
        };
    });

    const rows = data.map(d => `
        <div class="data-table-row report-grid" style="grid-template-columns: repeat(5, 1fr);">
            <div>${d.no}</div>
            <div>${d.date}</div>
            <div>${d.customer}</div>
            <div>${d.items}</div>
            <div>${d.total}</div>
        </div>
    `).join('');

    // Prepare Chart Data (Sales by Customer)
    const custSales = {};
    data.forEach(d => {
        custSales[d.customer] = (custSales[d.customer] || 0) + d.totalVal;
    });

    // Top 5 Customers
    const sortedCust = Object.entries(custSales).sort((a, b) => b[1] - a[1]).slice(0, 5);

    container.innerHTML = `
        <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
            <div class="card" style="flex: 1;">
                <canvas id="salesChart"></canvas>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                 <h3>Sales Analytics</h3>
                 <p>Top 5 Customers by Sales Volume.</p>
            </div>
        </div>

        <h3>Sales Performance Report</h3>
        <div class="card">
            <div class="data-table-header report-grid" style="display:grid; grid-template-columns: repeat(5, 1fr); font-weight:bold; padding:1rem; border-bottom:1px solid #eee;">
                <div>Order No</div><div>Date</div><div>Customer</div><div>Items Count</div><div>Total Value</div>
            </div>
            ${rows}
        </div>
    `;

    // Render Chart
    new Chart(document.getElementById('salesChart'), {
        type: 'pie',
        data: {
            labels: sortedCust.map(x => x[0]),
            datasets: [{
                data: sortedCust.map(x => x[1]),
                backgroundColor: ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#a855f7']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

function renderCustomerReport() {
    const container = document.getElementById('report-output');
    const rows = state.customers.map(c => `
        <div class="data-table-row report-grid" style="grid-template-columns: repeat(4, 1fr);">
            <div>${c.code}</div>
            <div>${c.name}</div>
            <div>${c.email}</div>
            <div>${c.phone}</div>
        </div>
    `).join('');

    container.innerHTML = `
        <h3>Customer Directory</h3>
        <div class="card">
             <div class="data-table-header report-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); font-weight:bold; padding:1rem; border-bottom:1px solid #eee;">
                <div>Code</div><div>Name</div><div>Email</div><div>Phone</div>
            </div>
            ${rows}
        </div>
     `;
}

// --- Initialization ---

window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split('/').pop();

    // Check Authentication (Mock) - REMOVED HARDLINING
    // Initialize Layout (Sidebar + Header)
    initSidebarLayout();

    // Show Container
    const appContainer = document.getElementById('app-container');
    if (appContainer) appContainer.style.display = 'flex';
    hide(loginContainer);

    // Render Page Specific Content
    if (page === 'overview.html' || page === 'dashboard.html' || page === 'index.html' || page === '') renderDashboardGrid();
    else if (page === 'customer.html') renderCustomerTable();
    else if (page === 'items.html') renderItems();
    else if (page === 'pricelist.html') renderPriceList();
    else if (page === 'quotation.html') renderQuotation();
    else if (page === 'quotation_line.html') renderQuotationLine();
    else if (page === 'sales_order.html') renderSalesOrder();
    else if (page === 'sales_order_line.html') renderSalesOrderLine();
    else if (page === 'reports.html') renderReports();
});