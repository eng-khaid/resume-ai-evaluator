// Get form and results elements
const form = document.getElementById('mainForm');
const resultsPanel = document.getElementById('resultsPanel');

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Display results
    displayResults(data);

    // Optional: Clear form after submission
    // form.reset();
});

// Function to display results
function displayResults(data) {
    // Clear previous results
    resultsPanel.innerHTML = '';

    // Create results items
    const resultItems = [];

    for (const [key, value] of Object.entries(data)) {
        if (value) {
            const label = formatLabel(key);
            resultItems.push({ label, value });
        }
    }

    if (resultItems.length === 0) {
        resultsPanel.innerHTML = '<div class="results-placeholder"><p>No data submitted</p></div>';
        return;
    }

    // Add header
    const header = document.createElement('div');
    header.style.marginBottom = '1.5rem';
    header.innerHTML = `
        <h3 style="color: #2563eb; margin: 0 0 0.5rem 0; font-size: 1.1rem;">Submitted Information</h3>
        <p style="color: #6b7280; margin: 0; font-size: 0.9rem;">Timestamp: ${new Date().toLocaleString()}</p>
    `;
    resultsPanel.appendChild(header);

    // Add result items
    resultItems.forEach(({ label, value }) => {
        const item = document.createElement('div');
        item.className = 'results-item';
        item.innerHTML = `
            <div class="results-item-label">${label}</div>
            <div class="results-item-value">${escapeHtml(value)}</div>
        `;
        resultsPanel.appendChild(item);
    });
}

// Helper function to format label
function formatLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Add real-time validation feedback
const inputs = form.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });

    input.addEventListener('focus', function() {
        this.parentElement.classList.remove('error');
    });
});

// Validation function
function validateField(field) {
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    return isValid;
}

// Add smooth scroll to form on focus
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// Log form submission
form.addEventListener('submit', function() {
    console.log('Form submitted successfully');
});
