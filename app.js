const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxSo3hR_EQIs0mpDUMlWOPjDm4mAmu00UObuuoGLY2QQJjE1QmpqjPL9u0jahRxS8Z3/exec';

const form = document.querySelector('#form');
const btn  = form.querySelector('button[type=submit]');
const msg  = document.querySelector('#status');
const resBox = document.querySelector('#resultado');

// Recordar último código usado
const lastCode = localStorage.getItem('last_code');
if (lastCode) form.codigo.value = lastCode;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  btn.disabled = true; btn.textContent = 'Analizando con IA (puede tardar unos segundos)...';
  msg.textContent = ''; msg.className = '';
  resBox.hidden = true;

  const payload = {
    _hp: form._hp?.value || '',
    codigo:           form.codigo.value.trim().toUpperCase(),
    situacion:        form.situacion.value.trim(),
    pensamiento:      form.pensamiento.value.trim(),
    emocion_inicial:  form.emocion_inicial.value,
    tipo_emocion:     form.tipo_emocion.value.trim(),
    evidencia_favor:  form.evidencia_favor.value.trim(),
    evidencia_contra: form.evidencia_contra.value.trim(),
    pensamiento_alt:  form.pensamiento_alt.value.trim(),
    emocion_final:    form.emocion_final.value
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    
    if (!data.ok) throw new Error(data.error || 'Error en el servidor');

    // Guardar código para la próxima
    localStorage.setItem('last_code', payload.codigo);

    // Mostrar resultado
    document.querySelector('#r-distorsiones').textContent = data.distorsiones ? '🔍 ' + data.distorsiones : '';
    document.querySelector('#r-analisis').textContent = data.analisis || '';
    resBox.hidden = false;
    
    // Limpiar form
    msg.textContent = '✅ Guardado exitosamente';
    msg.className = 'ok';
    form.situacion.value = form.pensamiento.value = '';
    form.emocion_inicial.value = form.evidencia_favor.value = '';
    form.evidencia_contra.value = form.pensamiento_alt.value = '';
    form.emocion_final.value = form.tipo_emocion.value = '';
  } catch (err) {
    msg.textContent = '❌ ' + err.message;
    msg.className = 'err';
  } finally {
    btn.disabled = false; btn.textContent = 'Analizar con IA';
  }
});
