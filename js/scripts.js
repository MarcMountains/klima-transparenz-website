document.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language || navigator.userLanguage;
    const nav = document.querySelector('nav ul');

    if (userLang.startsWith('ar') || userLang.startsWith('he')) { // Beispiel für arabische oder hebräische Sprache
        nav.style.direction = 'rtl';
        nav.style.justifyContent = 'flex-end';
    } else {
        nav.style.direction = 'ltr';
        nav.style.justifyContent = 'flex-start';
    }
});

function sortTable(columnIndex) {
    const table = document.getElementById('emission-table');
    const rows = Array.from(table.rows).slice(1);
    const sortedRows = rows.sort((a, b) => {
        const aText = a.cells[columnIndex].innerText;
        const bText = b.cells[columnIndex].innerText;
        return aText.localeCompare(bText, undefined, {numeric: true});
    });

    for (const row of sortedRows) {
        table.tBodies[0].appendChild(row);
    }
}
