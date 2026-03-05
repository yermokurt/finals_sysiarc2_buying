/**
 * store.js - Centralized localStorage database for IT3B ERP
 */

const DB_KEY = 'it3b_erp_db';

const defaultSchema = {
    buying_supplier: [],
    buying_material_request: [],
    buying_material_request_line: [],
    buying_rfq: [],
    buying_rfq_supplier: [],
    buying_supplier_quotation: [],
    buying_supplier_quotation_line: [],
    buying_purchase_order: [],
    buying_purchase_order_line: [],
    buying_mr_status: [
        { id: 'SMR01', name: 'Draft' },
        { id: 'SMR02', name: 'Submitted' },
        { id: 'SMR03', name: 'Approved' },
        { id: 'SMR04', name: 'Rejected' },
        { id: 'SMR05', name: 'Closed' }
    ],
    buying_rfq_status: [
        { id: 'SRQ01', name: 'Draft' },
        { id: 'SRQ02', name: 'Sent' },
        { id: 'SRQ03', name: 'Closed' },
        { id: 'SRQ04', name: 'Cancelled' }
    ],
    buying_supplier_quotation_status: [
        { id: 'SSQ01', name: 'Pending' },
        { id: 'SSQ02', name: 'Submitted' },
        { id: 'SSQ03', name: 'Accepted' },
        { id: 'SSQ04', name: 'Rejected' }
    ],
    buying_po_status: [
        { id: 'SPO01', name: 'Draft' },
        { id: 'SPO02', name: 'Issued' },
        { id: 'SPO03', name: 'Received' },
        { id: 'SPO04', name: 'Closed' }
    ],
    buying_items: [
        { id: 'ITEM001', name: 'Steel Rods', price: 15.00 },
        { id: 'ITEM002', name: 'Aluminum Sheets', price: 25.00 },
        { id: 'ITEM003', name: 'Copper Wiring', price: 50.00 },
        { id: 'ITEM004', name: 'Industrial Bolts', price: 2.50 },
        { id: 'ITEM005', name: 'Circuit Boards', price: 120.00 }
    ]
};

const Store = {
    init() {
        // Seed if DB is missing OR if a core table is empty (preventing stale data issues)
        const db = this.getDB();
        if (!localStorage.getItem(DB_KEY) || !db.buying_supplier || db.buying_supplier.length === 0) {
            console.log('Initializing/Seeding database...');
            this.seed();
        }
    },

    clear() {
        localStorage.removeItem(DB_KEY);
        console.log('Database cleared.');
    },

    reset() {
        this.clear();
        this.seed();
        location.reload();
    },

    getDB() {
        return JSON.parse(localStorage.getItem(DB_KEY)) || defaultSchema;
    },

    saveDB(db) {
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    },

    getTable(tableName) {
        return this.getDB()[tableName] || [];
    },

    // CRUD Helpers
    all(tableName) {
        return this.getTable(tableName);
    },

    find(tableName, id) {
        return this.getTable(tableName).find(item => item.id === id);
    },

    create(tableName, data) {
        const db = this.getDB();
        db[tableName].push(data);
        this.saveDB(db);
        return data;
    },

    update(tableName, id, data) {
        const db = this.getDB();
        const index = db[tableName].findIndex(item => item.id === id);
        if (index !== -1) {
            db[tableName][index] = { ...db[tableName][index], ...data };
            this.saveDB(db);
            return db[tableName][index];
        }
        return null;
    },

    delete(tableName, id) {
        const db = this.getDB();

        // Cascade rules
        if (tableName === 'buying_material_request') {
            db.buying_material_request_line = db.buying_material_request_line.filter(l => l.mr_id !== id);
        } else if (tableName === 'buying_rfq') {
            db.buying_rfq_supplier = db.buying_rfq_supplier.filter(s => s.rfq_id !== id);
        } else if (tableName === 'buying_supplier_quotation') {
            db.buying_supplier_quotation_line = db.buying_supplier_quotation_line.filter(l => l.sq_id !== id);
        } else if (tableName === 'buying_purchase_order') {
            db.buying_purchase_order_line = db.buying_purchase_order_line.filter(l => l.po_id !== id);
        }

        db[tableName] = db[tableName].filter(item => item.id !== id);
        this.saveDB(db);
    },

    // Join Helper
    join(data, tableToJoin, localKey, foreignKey = 'id') {
        const joinTable = this.getTable(tableToJoin);
        if (Array.isArray(data)) {
            return data.map(item => ({
                ...item,
                [tableToJoin]: joinTable.find(jt => jt[foreignKey] === item[localKey])
            }));
        }
        return {
            ...data,
            [tableToJoin]: joinTable.find(jt => jt[foreignKey] === data[localKey])
        };
    },

    seed() {
        const db = { ...defaultSchema };

        // 6 Suppliers
        db.buying_supplier = [
            { id: 'BS0001', name: 'Global Tech Industries', email: 'sales@globaltech.com', phone: '555-0101', address: 'San Francisco, CA' },
            { id: 'BS0002', name: 'Modern Metals Co.', email: 'contact@modernmetals.com', phone: '555-0102', address: 'Chicago, IL' },
            { id: 'BS0003', name: 'Precision Parts Ltd.', email: 'info@precision.co.uk', phone: '555-0201', address: 'London, UK' },
            { id: 'BS0004', name: 'Fastener Solutions', email: 'orders@fasteners.com', phone: '555-0301', address: 'Houston, TX' },
            { id: 'BS0005', name: 'ElectroSource Inc.', email: 'support@electrosource.com', phone: '555-0401', address: 'Seattle, WA' },
            { id: 'BS0006', name: 'Logistics Pro', email: 'admin@logistics.pro', phone: '555-0501', address: 'New York, NY' }
        ];

        // 8 Material Requests
        db.buying_material_request = [
            { id: 'BMR0001', employee_id: 'EMP101', request_date: '2026-02-01', sales_order_id: 'SO789', status_id: 'SMR03', remarks: 'Urgent production need' },
            { id: 'BMR0002', employee_id: 'EMP102', request_date: '2026-02-05', sales_order_id: '', status_id: 'SMR02', remarks: 'Routine inventory refill' },
            { id: 'BMR0003', employee_id: 'EMP101', request_date: '2026-02-07', sales_order_id: 'SO790', status_id: 'SMR01', remarks: 'Draft request' },
            { id: 'BMR0004', employee_id: 'EMP105', request_date: '2026-02-10', sales_order_id: '', status_id: 'SMR03', remarks: 'Maintenance supplies' },
            { id: 'BMR0005', employee_id: 'EMP103', request_date: '2026-02-12', sales_order_id: 'SO795', status_id: 'SMR04', remarks: 'Rejected due to budget' },
            { id: 'BMR0006', employee_id: 'EMP110', request_date: '2026-02-15', sales_order_id: '', status_id: 'SMR02', remarks: 'Project Alpha' },
            { id: 'BMR0007', employee_id: 'EMP101', request_date: '2026-02-18', sales_order_id: 'SO800', status_id: 'SMR05', remarks: 'Completed' },
            { id: 'BMR0008', employee_id: 'EMP112', request_date: '2026-02-20', sales_order_id: '', status_id: 'SMR02', remarks: 'Winter stock' }
        ];

        // Lines for MRs (2-4 lines each)
        db.buying_material_request_line = [
            { id: 'BMRL0001', mr_id: 'BMR0001', item_id: 'ITEM001', item_name: 'Steel Rods', qty: 100, uom: 'pcs' },
            { id: 'BMRL0002', mr_id: 'BMR0001', item_id: 'ITEM004', item_name: 'Industrial Bolts', qty: 500, uom: 'pcs' },
            { id: 'BMRL0003', mr_id: 'BMR0002', item_id: 'ITEM002', item_name: 'Aluminum Sheets', qty: 50, uom: 'sqm' },
            { id: 'BMRL0004', mr_id: 'BMR0002', item_id: 'ITEM003', item_name: 'Copper Wiring', qty: 200, uom: 'm' },
            { id: 'BMRL0005', mr_id: 'BMR0003', item_id: 'ITEM005', item_name: 'Circuit Boards', qty: 10, uom: 'pcs' }
        ];

        // 6 RFQs
        db.buying_rfq = [
            { id: 'BR0001', title: 'Steel supply Q1', date: '2026-02-02', status_id: 'SRQ02', remarks: 'Targeting mid-scale suppliers' },
            { id: 'BR0002', title: 'Electronic Components', date: '2026-02-06', status_id: 'SRQ02', remarks: 'Need ISO certified only' },
            { id: 'BR0003', title: 'Annual Fasteners Bid', date: '2026-02-10', status_id: 'SRQ01', remarks: 'Bulk discount expected' },
            { id: 'BR0004', title: 'Logistics Services', date: '2026-02-12', status_id: 'SRQ04', remarks: 'Cancelled' },
            { id: 'BR0005', title: 'Copper Surplus', date: '2026-02-15', status_id: 'SRQ02', remarks: 'Short lead time' },
            { id: 'BR0006', title: 'Project Beta Materials', date: '2026-02-18', status_id: 'SRQ03', remarks: 'Closed' }
        ];

        db.buying_rfq_supplier = [
            { id: 'BRS0001', rfq_id: 'BR0001', supplier_id: 'BS0002' },
            { id: 'BRS0002', rfq_id: 'BR0001', supplier_id: 'BS0003' },
            { id: 'BRS0003', rfq_id: 'BR0002', supplier_id: 'BS0001' },
            { id: 'BRS0004', rfq_id: 'BR0002', supplier_id: 'BS0005' },
            { id: 'BRS0005', rfq_id: 'BR0003', supplier_id: 'BS0004' },
            { id: 'BRS0006', rfq_id: 'BR0005', supplier_id: 'BS0005' }
        ];

        // 6 Supplier Quotations
        db.buying_supplier_quotation = [
            { id: 'BSQ0001', rfq_id: 'BR0001', supplier_id: 'BS0002', date: '2026-02-03', status_id: 'SSQ03', remarks: 'Price matches target' },
            { id: 'BSQ0002', rfq_id: 'BR0001', supplier_id: 'BS0003', date: '2026-02-04', status_id: 'SSQ04', remarks: 'Too expensive' },
            { id: 'BSQ0003', rfq_id: 'BR0002', supplier_id: 'BS0001', date: '2026-02-08', status_id: 'SSQ03', remarks: 'Best technical specs' },
            { id: 'BSQ0004', rfq_id: 'BR0002', supplier_id: 'BS0005', date: '2026-02-09', status_id: 'SSQ02', remarks: 'Follow up needed' },
            { id: 'BSQ0005', rfq_id: 'BR0005', supplier_id: 'BS0005', date: '2026-02-16', status_id: 'SSQ02', remarks: 'Limited stock' },
            { id: 'BSQ0006', rfq_id: 'BR0003', supplier_id: 'BS0004', date: '2026-02-12', status_id: 'SSQ01', remarks: 'Clarification pending' }
        ];

        db.buying_supplier_quotation_line = [
            { id: 'BSQL0001', sq_id: 'BSQ0001', item_id: 'ITEM001', item_name: 'Steel Rods', qty: 100, price: 14.50, total: 1450.00 },
            { id: 'BSQL0002', sq_id: 'BSQ0003', item_id: 'ITEM005', item_name: 'Circuit Boards', qty: 10, price: 115.00, total: 1150.00 }
        ];

        // 6 Purchase Orders
        db.buying_purchase_order = [
            { id: 'BPO0001', sq_id: 'BSQ0001', supplier_id: 'BS0002', date: '2026-02-05', status_id: 'SPO02', total_amount: 1450.00, remarks: 'Standard PO' },
            { id: 'BPO0002', sq_id: 'BSQ0003', supplier_id: 'BS0001', date: '2026-02-10', status_id: 'SPO03', total_amount: 1150.00, remarks: 'Project alpha initial' },
            { id: 'BPO0003', sq_id: '', supplier_id: 'BS0004', date: '2026-02-12', status_id: 'SPO01', total_amount: 500.00, remarks: 'Direct PO for fasteners' },
            { id: 'BPO0004', sq_id: '', supplier_id: 'BS0006', date: '2026-02-14', status_id: 'SPO04', total_amount: 2500.00, remarks: 'Closed' },
            { id: 'BPO0005', sq_id: '', supplier_id: 'BS0002', date: '2026-02-18', status_id: 'SPO02', total_amount: 1200.00, remarks: 'Monthly refill' },
            { id: 'BPO0006', sq_id: '', supplier_id: 'BS0001', date: '2026-02-20', status_id: 'SPO02', total_amount: 3000.00, remarks: 'High value' }
        ];

        this.saveDB(db);
    }
};

Store.init();
window.Store = Store;
