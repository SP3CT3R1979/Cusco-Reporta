document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  // --- Lógica para el formulario de Login ---
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Evitar que la página se recargue

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error en el servidor');
        }

        // Si el login es exitoso, guardar el token y redirigir
        localStorage.setItem('user_token', JSON.stringify(data.token));
        showMessage('Inicio de sesión exitoso. Redirigiendo...', false);
        window.location.href = 'dashboard.html';

      } catch (error) {
        showMessage(error.message, true);
      }
    });
  }

  // --- Lógica para el formulario de Registro ---
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombreCompleto = document.getElementById('nombreCompleto').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombreCompleto, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error en el servidor');
        }

        showMessage('¡Registro exitoso! Ahora puedes iniciar sesión.', false);
        // Esperar un momento antes de redirigir para que el usuario vea el mensaje
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);

      } catch (error) {
        showMessage(error.message, true);
      }
    });
  }
});
