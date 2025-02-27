
        if (localStorage.getItem('loggedIn') === 'true') {
            window.location.href = 'main.html';
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                login();
            }
        });

        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                document.getElementById('error-message').textContent = "Please fill in both username and password!";
                document.getElementById('error-message').style.display = 'block';
                return;
            }

            const validCredentials = [
                { username: "admin", password: "334455" }
            ];
            
            const isValid = validCredentials.some(cred => cred.username === username && cred.password === password);

            if (isValid) {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'main.html';
            } else {
                document.getElementById('error-message').textContent = "Invalid credentials!";
                document.getElementById('error-message').style.display = 'block';
            }
        }

        function togglePassword() {
            const passwordField = document.getElementById('password');
            const toggleButton = document.querySelector('.toggle-password-btn');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleButton.textContent = 'Hide';
            } else {
                passwordField.type = 'password';
                toggleButton.textContent = 'Show';
            }
        };


