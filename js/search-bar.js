// Debounce function implementation
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// DOM manipulation to set up the search functionality
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const searchButton = document.getElementById("search-button"); // wrapper
    const searchField = document.getElementById("searchField");    // input
    const exitSearchButton = document.getElementById('exit-search-extension-button');
    const searchExtension = document.getElementById('search-extension');
    const searchResults = document.getElementById('search-results');
    const searchIcon = document.getElementById('search');
    const toggleButton = document.getElementById('toggle-button');

    // Toggle search bar expansion ONLY when clicking the icon
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            if (searchButton.classList.contains('active')) {
                // Close search
                searchButton.classList.remove('active');
                if (searchExtension) searchExtension.style.display = 'none';
                if (searchField) searchField.value = '';
            } else {
                // Open search
                searchButton.classList.add('active');
                if (searchExtension) searchExtension.style.display = 'block';
                if (searchField) searchField.focus();
            }
        });
    }

    // Handle search input with debounce
    if (searchField) {
        searchField.addEventListener('input', debounce(function(e) {
            if (e.target.value.trim() !== '') {
                performSearch(e.target.value);
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No results yet. Start typing to search.</div>';
            }
        }, 300));
    }

    // Handle exit button (optional if you want a close "X")
    if (exitSearchButton) {
        exitSearchButton.addEventListener('click', () => {
            if (searchExtension) searchExtension.style.display = 'none';
            if (searchField) searchField.value = '';
            searchButton.classList.remove('active');
        });
    }

    // Sample search function
    function performSearch(query) {
        if (!searchExtension || !searchResults) return;

        // Show search extension
        searchExtension.style.display = 'block';
        
        // Simulate search results
        const results = [
            "Dental Checkup",
            "Teeth Whitening",
            "Dental Implants",
            "Root Canal Treatment",
            "Orthodontic Services",
            "Pediatric Dentistry",
            "Gum Disease Treatment",
            "Oral Surgery",
            "Cosmetic Dentistry"
        ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
        
        // Display results
        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => 
                `<div class="search-result-item">${result}</div>`
            ).join('');
        } else {
            searchResults.innerHTML = `<div class="search-result-item">No results found for "${query}"</div>`;
        }
    }

    // Toggle between light and dark mode
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            toggleButton.classList.toggle('dark');
            
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });

        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        if (savedDarkMode) {
            body.classList.add('dark-mode');
            toggleButton.classList.add('dark');
        }
    }
});
