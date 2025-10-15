// URL base de la API. ¡Asegúrate de que el backend esté corriendo!
const API_BASE_URL = 'http://localhost:3001/api';

// Función para mostrar mensajes al usuario
function showMessage(message, isError = false) {
  const messageElement = document.getElementById('message');
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = isError ? 'error' : 'success';
  }
}

// Lógica para la barra de navegación
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('nav-links');
  const token = localStorage.getItem('user_token');

  if (token) {
    // Usuario autenticado
    navLinks.innerHTML = `
      <a href="dashboard.html">Mis Reportes</a>
      <a href="#" id="logout-btn">Cerrar Sesión</a>
    `;
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user_token');
        window.location.href = 'login.html';
      });
    }
  } else {
    // Usuario no autenticado
    navLinks.innerHTML = `
      <a href="login.html" class="btn">Iniciar Sesión</a>
      <a href="registro.html">Registrarse</a>
    `;
  }

  // Lógica para la página de inicio
  if (document.getElementById('main-content')) {
    if (token) {
      document.getElementById('main-content').innerHTML = '<a href="dashboard.html" class="btn">Ir a mi Dashboard</a>';
    } else {
      document.getElementById('main-content').innerHTML = '<a href="registro.html" class="btn">¡Empieza a reportar ahora!</a>';
    }
  }
});
