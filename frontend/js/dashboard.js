document.addEventListener('DOMContentLoaded', () => {
  const token = JSON.parse(localStorage.getItem('user_token'));

  // --- Proteger la ruta ---
  // Si no hay token y no estamos en una página pública, redirigir al login
  if (!token && !['/login.html', '/registro.html', '/index.html', '/'].includes(window.location.pathname)) {
    window.location.href = 'login.html';
    return; // Detener la ejecución del script
  }

  const incidenciasList = document.getElementById('incidencias-list');
  const reportForm = document.getElementById('report-form');

  // --- Lógica para la página del Dashboard ---
  if (incidenciasList) {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/incidencias/mis-reportes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cargar los reportes.');
        }

        const incidencias = await response.json();
        
        incidenciasList.innerHTML = ''; // Limpiar el mensaje de "Cargando..."
        if (incidencias.length === 0) {
          incidenciasList.innerHTML = '<p>Aún no has creado ningún reporte.</p>';
          return;
        }

        incidencias.forEach(inc => {
          const item = document.createElement('div');
          item.className = 'incidencia-item';
          item.innerHTML = `
            <div>
              <strong>${inc.Titulo}</strong>
              <small style="display: block; color: #666;">Código: ${inc.CodigoUnico}</small>
            </div>
            <span class="incidencia-status">${inc.NombreEstado}</span>
          `;
          incidenciasList.appendChild(item);
        });

      } catch (error) {
        showMessage(error.message, true);
        if (error.message.includes('expirado') || error.message.includes('inválido')) {
            localStorage.removeItem('user_token');
            setTimeout(() => window.location.href = 'login.html', 2000);
        }
      }
    };
    fetchIncidencias();
  }

  // --- Lógica para el formulario de Crear Reporte ---
  if (reportForm) {
    reportForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const incidenciaData = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        categoriaId: document.getElementById('categoriaId').value,
        latitud: document.getElementById('latitud').value,
        longitud: document.getElementById('longitud').value,
      };

      try {
        const response = await fetch(`${API_BASE_URL}/incidencias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(incidenciaData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error al crear el reporte.');
        }

        showMessage('Reporte creado con éxito. Redirigiendo...', false);
        setTimeout(() => window.location.href = 'dashboard.html', 2000);

      } catch (error) {
        showMessage(error.message, true);
      }
    });
  }
});
