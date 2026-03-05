import * as XLSX from 'xlsx';

/**
 * Exports stock data and movements history to a professional Excel report.
 * @param {Array} products - Current inventory products
 * @param {Array} history - Movement history log
 * @param {string} fileName - Optional filename for the exported excel
 */
export const exportToExcel = (products, history, fileName = 'Rapport_GsStoke') => {
    // 1. Prepare Inventory Sheet
    const inventoryData = products.map(p => ({
        'Référence': p.reference,
        'Désignation': p.name,
        'Quantité Actuelle': p.quantity,
        'Statut': p.quantity > 0 ? 'EN STOCK' : 'RUPTURE'
    }));

    // 2. Prepare Movement History Sheet
    const historyData = history.map(h => ({
        'Date': new Date(h.date).toLocaleDateString('fr-FR'),
        'Heure': new Date(h.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        'Produit': h.name,
        'Référence': h.reference,
        'Type': h.type === 'in' ? 'ENTRÉE' : 'SORTIE',
        'Quantité': h.amount,
        'Lieu / Localisation': h.location || 'Non spécifié'
    }));

    // 3. Create a new Workbook
    const workbook = XLSX.utils.book_new();

    // 4. Create Worksheets
    const inventorySheet = XLSX.utils.json_to_sheet(inventoryData);
    const historySheet = XLSX.utils.json_to_sheet(historyData);

    // 5. Add sheets to workbook
    XLSX.utils.book_append_sheet(workbook, inventorySheet, 'État des Stocks');
    XLSX.utils.book_append_sheet(workbook, historySheet, 'Historique des Mouvements');

    // 6. Generate and Download
    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `${fileName}_${dateStr}.xlsx`);
};
