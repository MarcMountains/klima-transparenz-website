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
document.addEventListener('DOMContentLoaded', () => {
    const filterCountryInput = document.getElementById('filter-country');
    const filterCompanyInput = document.getElementById('filter-company');
    const tableRows = document.querySelectorAll('#emission-table tbody tr');

    function filterTable() {
        const countryFilter = filterCountryInput.value.toLowerCase();
        const companyFilter = filterCompanyInput.value.toLowerCase();

        tableRows.forEach(row => {
            const country = row.cells[0].innerText.toLowerCase();
            const company = row.cells[1].innerText.toLowerCase();

            if (country.includes(countryFilter) && company.includes(companyFilter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    filterCountryInput.addEventListener('keyup', filterTable);
    filterCompanyInput.addEventListener('keyup', filterTable);
});
