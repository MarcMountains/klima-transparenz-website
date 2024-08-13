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
