document.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language || navigator.userLanguage;
    const nav = document.querySelector('nav ul');

    if (userLang.startsWith('ar') || userLang.startsWith('he')) { 
        nav.style.direction = 'rtl';
        nav.style.justifyContent = 'flex-end';
    } else {
        nav.style.direction = 'ltr';
        nav.style.justifyContent = 'flex-start';
    }
});

function sortTable(columnIndex) {
    const table = document.getElementById('emission-table');
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isNumericColumn = !isNaN(rows[0].cells[columnIndex].innerText.trim());

    let sortDirection = table.getAttribute('data-sort-direction') === 'asc' ? 'desc' : 'asc';
    table.setAttribute('data-sort-direction', sortDirection);

    // Entferne alte Sortierklassen von allen th-Elementen
    const thElements = table.querySelectorAll('th');
    thElements.forEach(th => th.removeAttribute('data-sort'));

    // Setze die Sortierklasse auf die aktuelle Spalte
    thElements[columnIndex].setAttribute('data-sort', sortDirection);

    rows.sort((a, b) => {
        let aText = a.cells[columnIndex].innerText.trim();
        let bText = b.cells[columnIndex].innerText.trim();

        if (isNumericColumn) {
            aText = parseFloat(aText);
            bText = parseFloat(bText);
        }

        if (sortDirection === 'asc') {
            return aText > bText ? 1 : -1;
        } else {
            return aText < bText ? 1 : -1;
        }
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
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

// Sicherheitsmaßnahmen für das Kontaktformular
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple input validation
            if (!name || !email || !message) {
                alert('Bitte füllen Sie alle Felder aus.');
                event.preventDefault();
                return;
            }

            // Basic XSS prevention
            if (/[<>]/.test(name) || /[<>]/.test(email) || /[<>]/.test(message)) {
                alert('Ungültige Eingabe erkannt. Bitte verwenden Sie keine unzulässigen Zeichen.');
                event.preventDefault();
                return;
            }
        });
    }
});
