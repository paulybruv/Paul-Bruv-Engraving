// Function triggered directly when typing in the input field
function updatePreviewText(text) {
    const textDisplay = document.getElementById('preview-text-display');
    if (textDisplay) {
        textDisplay.textContent = text.toUpperCase().trim() || 'YOUR TEXT HERE';
    }
}

// Event listener fallback when page loads
document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('custom-text-input');
    if (textInput) {
        textInput.addEventListener('input', (e) => {
            updatePreviewText(e.target.value);
        });
    }
});

// Toggle finish options between Black/White and White/Black
function setFinish(finishClass) {
    const mockup = document.getElementById('mdf-sign-mockup');
    if (mockup) {
        mockup.className = 'mdf-mockup ' + finishClass;
    }
    
    // Update active button styling
    document.querySelectorAll('.finish-btn').forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}