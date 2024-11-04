form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');

    // ... (password validation logic) ...

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        // Ensure the response is JSON and handle accordingly
        const data = await response.json();

        if (response.status === 403) {
            // Check if the response contains a message
            alert(data.message || 'You do not have permission to access this resource.');
        } else if (response.status === 201) {
            alert(data.message || 'Registration successful!');
            window.location.href = "/login";
        } else {
            // Handle other response statuses
            alert('An unexpected error occurred. Please try again.');
        }
    } catch (error) {
        console.error(error);
        message.textContent = 'Registration failed. Please try again.';
    }
});
