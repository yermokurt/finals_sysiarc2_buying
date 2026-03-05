/**
 * id_generator.js - Sequential ID generator for IT3B ERP
 */

const IDGenerator = {
    prefixes: {
        'buying_supplier': 'BS',
        'buying_material_request': 'BMR',
        'buying_material_request_line': 'BMRL',
        'buying_rfq': 'BR',
        'buying_rfq_supplier': 'BRS',
        'buying_supplier_quotation': 'BSQ',
        'buying_supplier_quotation_line': 'BSQL',
        'buying_purchase_order': 'BPO',
        'buying_purchase_order_line': 'BPOL'
    },

    generate(tableName) {
        if (!window.Store) {
            console.error('Store not initialized');
            return null;
        }

        const prefix = this.prefixes[tableName] || 'ID';
        const table = window.Store.getTable(tableName);

        let maxNumber = 0;
        table.forEach(item => {
            if (item.id && item.id.startsWith(prefix)) {
                const numStr = item.id.replace(prefix, '');
                const num = parseInt(numStr);
                if (!isNaN(num) && num > maxNumber) {
                    maxNumber = num;
                }
            }
        });

        const nextNumber = maxNumber + 1;
        return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    }
};

window.IDGenerator = IDGenerator;
