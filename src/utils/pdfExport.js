import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (history, products, ownerName = "Mohammed AABBOUR") => {
    const doc = jsPDF();
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const timeStr = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    // Add Logo/Header
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont("helvetica", "bold");
    doc.text("GSSTOKE - RAPPORT D'INVENTAIRE", 14, 22);

    // Add Meta Info
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Gérant: ${ownerName}`, 14, 32);
    doc.text(`Date du rapport: ${dateStr} à ${timeStr}`, 14, 37);
    doc.text("Lieu: Casablanca, Maroc", 14, 42);

    // Divider
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(14, 48, 196, 48);

    // Summary Stats
    const totalProducts = products.length;
    const totalUnits = products.reduce((acc, p) => acc + p.quantity, 0);
    const outOfStock = products.filter(p => p.quantity === 0).length;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("RÉSUMÉ DE L'INVENTAIRE", 14, 58);

    doc.setFont("helvetica", "normal");
    doc.text(`Total des produits référencés: ${totalProducts}`, 14, 66);
    doc.text(`Unités totales en stock: ${totalUnits}`, 14, 72);
    doc.text(`Produits en rupture de stock: ${outOfStock}`, 14, 78);

    // Inventory Table
    doc.setFont("helvetica", "bold");
    doc.text("ÉTAT DES STOCKS ACTUELS", 14, 92);

    const inventoryRows = products.map(p => [
        p.reference,
        p.name,
        p.quantity,
        p.quantity > 0 ? 'EN STOCK' : 'RUPTURE'
    ]);

    autoTable(doc, {
        startY: 96,
        head: [['Référence', 'Désignation', 'Quantité', 'Statut']],
        body: inventoryRows,
        theme: 'striped',
        headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        styles: { font: 'helvetica', fontSize: 9 },
    });

    // Movement History Page (if it exists)
    if (history && history.length > 0) {
        doc.addPage();
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("HISTORIQUE DES MOUVEMENTS", 14, 22);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Registre des 50 dernières transactions", 14, 30);

        const historyRows = history.slice(0, 50).map(h => [
            new Date(h.date).toLocaleDateString('fr-FR') + ' ' + new Date(h.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            h.name,
            h.reference,
            h.type === 'in' ? '+ ENTRÉE' : '- SORTIE',
            h.amount
        ]);

        autoTable(doc, {
            startY: 36,
            head: [['Date & Heure', 'Produit', 'Référence', 'Action', 'Quantité']],
            body: historyRows,
            theme: 'grid',
            headStyles: { fillColor: [14, 148, 233], textColor: 255 }, // primary-500
            styles: { fontSize: 8 },
            columnStyles: {
                3: { fontStyle: 'bold' },
                4: { halign: 'right', fontStyle: 'bold' }
            },
            didParseCell: (data) => {
                if (data.section === 'body' && data.column.index === 3) {
                    if (data.cell.raw && data.cell.raw.includes('+')) {
                        data.cell.styles.textColor = [16, 185, 129]; // emerald-500
                    } else if (data.cell.raw && data.cell.raw.includes('-')) {
                        data.cell.styles.textColor = [244, 63, 94]; // rose-500
                    }
                }
            }
        });
    }

    // Footer on all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`GsStoke Pro Module - Page ${i} sur ${pageCount} - Généré automatiquement`, 105, 285, { align: "center" });
    }

    // Save PDF
    doc.save(`Rapport_GsStoke_${dateStr.replace(/\//g, '-')}.pdf`);
};
