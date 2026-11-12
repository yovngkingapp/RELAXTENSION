const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxSo3hR_EQIs0mpDUMlWOPjDm4mAmu00UObuuoGLY2QQJjE1QmpqjPL9u0jahRxS8Z3/exec';

// ═══════════ SEGURIDAD (LOGIN) ═══════════
const isLoggedIn = localStorage.getItem('is_logged_in');
const currentUser = localStorage.getItem('last_code');

if (isLoggedIn !== 'true' || !currentUser) {
  window.location.href = 'login.html';
}

document.getElementById('user-display').textContent = currentUser;
document.getElementById('codigo-user').value = currentUser;

document.getElementById('btn-logout').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('is_logged_in');
  localStorage.removeItem('last_code');
  window.location.href = 'login.html';
});
// ═════════════════════════════════════════

const form = document.querySelector('#form');
const btn = document.querySelector('#btn-submit');
const msg = document.querySelector('#status');
const resBox = document.querySelector('#resultado');

// Actualizar sliders visualmente
const sliderInit = document.getElementById('emo-inicial');
const valInit = document.getElementById('val-inicial');
sliderInit.addEventListener('input', () => valInit.textContent = sliderInit.value);

const sliderFinal = document.getElementById('emo-final');
const valFinal = document.getElementById('val-final');
sliderFinal.addEventListener('input', () => valFinal.textContent = sliderFinal.value);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Estado de carga con Spinner
  btn.disabled = true; 
  btn.innerHTML = '<span class="spinner"></span> Analizando...';
  msg.textContent = ''; 
  msg.className = '';
  resBox.hidden = true;

  const payload = {
    _hp: form._hp?.value || '',
    codigo: currentUser,
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

    // Mostrar resultados sin emojis
    document.querySelector('#r-distorsiones').textContent = data.distorsiones ? 'Distorsiones: ' + data.distorsiones : '';
    document.querySelector('#r-analisis').textContent = data.analisis || '';
    resBox.hidden = false;
    
    msg.textContent = 'Guardado correctamente.';
    msg.className = 'ok';
    
    // Limpiar formulario
    form.situacion.value = form.pensamiento.value = '';
    form.evidencia_favor.value = form.evidencia_contra.value = form.pensamiento_alt.value = '';
    form.tipo_emocion.value = '';
    
    // Scroll suave hacia el resultado
    resBox.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    msg.textContent = 'Error: Revisa los permisos o tu conexión a internet.';
    msg.className = 'err';
  } finally {
    btn.disabled = false; 
    btn.innerHTML = 'Analizar mi pensamiento';
  }
});
