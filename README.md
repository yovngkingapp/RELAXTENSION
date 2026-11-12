# RELAXTENSION

> Donde la calma se vuelve hábito.

Una aplicación web progresiva (PWA) diseñada para el registro de pensamientos y la reestructuración cognitiva. Combina la simplicidad de una interfaz zen con el poder del análisis de Inteligencia Artificial en tiempo real.

[Explorar Aplicación](https://yovngkingapp.github.io/RELAXTENSION/) · [Reportar Error](https://github.com/yovngkingapp/RELAXTENSION/issues)

---

## 01. Arquitectura del Sistema

El proyecto opera bajo una arquitectura Serverless, eliminando la necesidad de servidores tradicionales y manteniendo un costo operativo de cero. El flujo de datos está dividido en tres capas secuenciales:

| 1. Cliente Web | 2. Capa de Datos | 3. Motor de IA |
| :--- | :--- | :--- |
| **GitHub Pages** | **Google Apps Script** | **Google Gemini API** |
| HTML · CSS · JS | Sheets · Drive | Análisis TCC |

## 02. Stack Tecnológico

| Componente | Tecnología | Función |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JS, CSS3 | Interfaz de usuario, gestión de sesiones (LocalStorage). |
| **Hosting** | GitHub Pages | Distribución estática y despliegue continuo. |
| **Backend** | Google Apps Script | Endpoint REST, validación de credenciales y encriptación. |
| **Base de Datos** | Google Sheets | Almacenamiento relacional de usuarios y registros. |
| **IA** | Gemini 3.8 Flash | Procesamiento de lenguaje natural y distorsiones cognitivas. |

## 03. Identidad Visual

El sistema de diseño se aleja de las interfaces clínicas tradicionales, optando por una paleta que induce a la calma y la reflexión.

| Color | Código Hex | Aplicación |
| :--- | :--- | :--- |
| Verde Profundo | `#0A3A34` | Textos principales, botones de acción, bordes de tarjetas. |
| Durazno Suave | `#F89B7A` | Alertas, acentos cálidos, estados hover. |
| Lavanda | `#9E81B3` | Deslizadores de emoción, indicadores de foco. |
| Blanco Nieve | `#F4F8F7` | Fondo general de la aplicación. |

**Tipografía:** 
* **Outfit** — Para títulos y elementos de navegación (Geométrica y moderna).
* **Inter** — Para cuerpo de texto y formularios (Legibilidad óptima).

## 04. Características Principales

* **Autenticación Segura:** Registro e inicio de sesión sin correos electrónicos. Implementa hashing SHA-256 con salt único por usuario.
* **Registro Cognitivo:** Formulario basado en el modelo de Terapia Cognitivo-Conductual (Situación, Pensamiento Automático, Evidencias, Alternativa).
* **Análisis con IA:** Integración directa con la API de Gemini para identificar distorsiones (catastrofización, lectura mental, etc.) y formular preguntas socráticas.
* **Historial Evolutivo:** Panel de control donde el usuario visualiza la transición de su intensidad emocional a lo largo del tiempo.

## 05. Estructura del Proyecto

* `index.html` — Interfaz principal y formulario de registro.
* `login.html` — Acceso de usuarios.
* `register.html` — Creación de nuevas cuentas.
* `view.html` — Historial de registros.
* `app.js` — Lógica del cliente y conexión con API.
* `style.css` — Sistema de diseño y animaciones.
* `logo.png` — Identidad de la marca.

## 06. Despliegue Local

El proyecto no requiere compiladores ni gestores de paquetes. Para ejecutarlo en un entorno local:

1. Clonar el repositorio: `git clone https://github.com/yovngkingapp/RELAXTENSION.git`
2. Abrir el archivo `index.html` en cualquier navegador moderno, o utilizar extensiones como *Live Server* (VS Code) para previsualizar los cambios en tiempo real.

---

*El código y el diseño de este proyecto están orientados a construir herramientas que mejoren el bienestar digital.*
