const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxSo3hR_EQIs0mpDUMlWOPjDm4mAmu00UObuuoGLY2QQJjE1QmpqjPL9u0jahRxS8Z3/exec';

// ═══════════ SEGURIDAD (LOGIN) ═══════════
const isLoggedIn = localStorage.getItem('is_logged_in');
const currentUser = localStorage.getItem('last_code');

if (isLoggedIn !== 'true' || !currentUser) {
  // Si no hay sesión, a la calle
  window.location.href = 'login.html';
}

// Configurar la interfaz con el usuario
document.getElementById('user-display').textContent = currentUser;
document.getElementById('codigo-user').value = currentUser;

// Botón de cerrar sesión
document.getElementById('btn-logout').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('is_logged_in');
  localStorage.removeItem('last_code');
  window.location.href = 'login.html';
});
// ═════════════════════════════════════════

const form = document.querySelector('#form');
const btn = form.querySelector('button[type=submit]');
const msg = document.querySelector('#status');
const resBox = document.querySelector('#resultado');

// Actualizar sliders
const sliderInit = document.getElementById('emo-inicial');
const valInit = document.getElementById('val-inicial');
sliderInit.addEventListener('input', () => valInit.textContent = sliderInit.value);

const sliderFinal = document.getElementById('emo-final');
const valFinal = document.getElementById('val-final');
sliderFinal.addEventListener('input', () => valFinal.textContent = sliderFinal.value);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  btn.disabled = true; 
  btn.textContent = 'Analizando...';
  msg.textContent = ''; 
  msg.className = '';
  resBox.hidden = true;

  const payload = {
    _hp: form._hp?.value || '',
    codigo: currentUser, // Usamos el usuario logueado
    situacion: form.situacion.value.trim(),
    pensamiento: form.pensamiento.value.trim(),
    emocion_inicial: sliderInit.value,
    tipo_emocion: form.tipo_emocion.value.trim(),
    evidencia_favor: form.evidencia_favor.value.trim(),
    evidencia_contra: form.evidencia_contra.value.trim(),
    pensamiento_alt: form.pensamiento_alt.value.trim(),
    emocion_final: sliderFinal.value
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    
    if (!data.ok) throw new Error(data.error || 'Error en el servidor');

    document.querySelector('#r-distorsiones').textContent = data.distorsiones ? '🔍 ' + data.distorsiones : '';
    document.querySelector('#r-analisis').textContent = data.analisis || '';
    resBox.hidden = false;
    
    msg.textContent = '✅ Guardado.';
    msg.className = 'ok';
    
    form.situacion.value = form.pensamiento.value = '';
    form.evidencia_favor.value = form.evidencia_contra.value = form.pensamiento_alt.value = '';
    form.tipo_emocion.value = '';
    resBox.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    msg.textContent = '❌ Error: Revisá los permisos o tu conexión.';
    msg.className = 'err';
  } finally {
    btn.disabled = false; 
    btn.textContent = 'Analizar mi pensamiento';
  }
});
