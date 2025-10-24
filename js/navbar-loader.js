// Load navbar component
document.addEventListener('DOMContentLoaded', function() {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(data => {
            // Insert navbar at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', data);

            // Set active state based on current page
            setActiveNavLink();
        })
        .catch(error => console.error('Error loading navbar:', error));
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('mobileMenuOverlay');
    const toggleButton = document.querySelector('.mobile-menu-toggle');

    if (navLinks && overlay && toggleButton) {
        const isActive = navLinks.classList.contains('active');

        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        toggleButton.setAttribute('aria-expanded', !isActive);
        toggleButton.textContent = isActive ? '☰' : '✕';

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
    }
}

// Close mobile menu
function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('mobileMenuOverlay');
    const toggleButton = document.querySelector('.mobile-menu-toggle');

    if (navLinks && overlay && toggleButton) {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.textContent = '☰';
        document.body.style.overflow = '';
    }
}

// Toggle dropdown menu
function toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation();

    const dropdownToggle = event.currentTarget;
    const dropdownMenu = dropdownToggle.nextElementSibling;
    const allDropdowns = document.querySelectorAll('.dropdown-menu');
    const allToggles = document.querySelectorAll('.dropdown-toggle');

    // Close all other dropdowns
    allDropdowns.forEach(menu => {
        if (menu !== dropdownMenu) {
            menu.classList.remove('show');
        }
    });

    allToggles.forEach(toggle => {
        if (toggle !== dropdownToggle) {
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Toggle current dropdown
    const isExpanded = dropdownMenu.classList.contains('show');
    dropdownMenu.classList.toggle('show');
    dropdownToggle.setAttribute('aria-expanded', !isExpanded);
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        const allDropdowns = document.querySelectorAll('.dropdown-menu');
        const allToggles = document.querySelectorAll('.dropdown-toggle');

        allDropdowns.forEach(menu => menu.classList.remove('show'));
        allToggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
    }
});

// Close mobile menu when clicking overlay
document.addEventListener('click', function(event) {
    if (event.target.id === 'mobileMenuOverlay') {
        closeMobileMenu();
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});
