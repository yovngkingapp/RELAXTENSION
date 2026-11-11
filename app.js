const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxSo3hR_EQIs0mpDUMlWOPjDm4mAmu00UObuuoGLY2QQJjE1QmpqjPL9u0jahRxS8Z3/exec';

const form = document.querySelector('#form');
const btn  = form.querySelector('button[type=submit]');
const msg  = document.querySelector('#status');

// Key simple para rate limit (anti-spam tonto, no seguridad)
const KEY = sessionStorage.getItem('_k') || (() => {
  const k = crypto.randomUUID();
  sessionStorage.setItem('_k', k);
  return k;
})();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.textContent = 'Enviando…';
  msg.textContent = '';
  msg.className = '';

  const payload = {
    _k: KEY,
    _hp: form._hp?.value || '',
    nombre:  form.nombre.value.trim(),
    email:   form.email.value.trim(),
    mensaje: form.mensaje.value.trim()
  };

  const file = form.archivo.files[0];
  if (file) {
    if (file.size > 20 * 1024 * 1024) {
      msg.textContent = 'El archivo supera 20 MB.';
      msg.className = 'err';
      btn.disabled = false; btn.textContent = 'Enviar';
      return;
    }
    payload.archivo = {
      nombre: file.name,
      tipo:   file.type || 'application/octet-stream',
      base64: await aBase64(file)
    };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      // text/plain → evita preflight CORS (Apps Script no responde OPTIONS)
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.ok) {
      form.reset();
      msg.textContent = '✅ Registrado. ¡Gracias!';
      msg.className = 'ok';
    } else {
      msg.textContent = '❌ ' + (data.error || 'Error');
      msg.className = 'err';
    }
  } catch (err) {
    msg.textContent = '❌ Error de red: ' + err.message;
    msg.className = 'err';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar';
  }
});

function aBase64(file) {
  return new Promise((ok, fail) => {
    const r = new FileReader();
    r.onload  = () => ok(r.result.split(',')[1]);
    r.onerror = fail;
    r.readAsDataURL(file);
  });
}
