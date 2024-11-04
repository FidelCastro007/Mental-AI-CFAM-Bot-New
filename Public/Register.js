document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const message = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');
        let number = 0, character = 0, symbol = 0;

        if (password.length >= 8) {
            for (let i = 0; i < password.length; i++) {
                if ("@#$*".includes(password[i])) symbol++;
                if (!isNaN(password[i])) number++;
                if ((password[i] >= "a" && password[i] <= "z") || (password[i] >= "A" && password[i] <= "Z")) character++;
            }
        }

        if (number >= 1 && character >= 1 && symbol >= 1) {
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.status === 403 || response.status === 201) {
                    alert(data.message);
                }
                
                if (response.status === 201) {
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error(error);
                message.textContent = 'Registration failed. Please try again.';
            }
        } else {
            alert("Please enter a strong password with at least 8 characters, including special characters, numbers, and letters.");
        }
    });
});
