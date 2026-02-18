# 💬 Slack Clone – Proyecto Full Stack (MERN)

Proyecto desarrollado como Trabajo Práctico Final de la Diplomatura Full Stack (UTN). Es un clon básico de Slack que permite comunicación por canales, gestión de workspaces y autenticación con JWT.

---

**Estado:** en desarrollo

**Stack:** React + Vite + TailwindCSS (frontend) · Node.js + Express + MongoDB (backend)

---

**Contenido de este README**
- Descripción
- Requisitos y puesta en marcha (frontend y backend)
- Variables de entorno necesarias
- Scripts importantes
- Endpoints del backend (lista y descripciones)

---

## Requisitos
- Node.js (v16+ recomendado)
- MongoDB (Atlas o local)
- Git

---

## Puesta en marcha

1) Clonar repositorio

```bash
git clone <repo-url>
cd FULLSTACK
```

2) Backend

```bash
cd backend
npm install
npm run dev   # usa nodemon, inicia en index.js
```

Por defecto el backend corre en `http://localhost:3000` (si `PORT=3000`).

3) Frontend

```bash
cd frontend
npm install
npm run dev   # Vite, por defecto en http://localhost:5173
```

---

## Variables de entorno (backend)
- `PORT` - puerto del servidor (ej. 3000)
- `MONGO_URL` - conexión a MongoDB
- `JWT_SECRET` - clave para firmar tokens JWT
- `FRONTEND_URL` - URL del frontend (para CORS/links en emails)
- `CLOUDINARY_*` - si se usan para subida de imágenes (según `config/cloudinary.js`)
- `MAIL_*` - configuración de correo (según `config/mail.config.js`)

Coloca estas variables en un archivo `.env` en la carpeta `backend`.

---

## Scripts (resumen)
- Backend (carpeta `backend`):
  - `npm run dev` - ejecuta `nodemon index.js` (desarrollo)
  - `npm start` - ejecuta `node index.js`
- Frontend (carpeta `frontend`):
  - `npm run dev` - inicia Vite (desarrollo)
  - `npm run build` - build de producción

---

## Endpoints del backend

Base URL: `http://localhost:3000` (ajustar si cambia `PORT`)

-- Rutas de autenticación (`/auth`)

- `POST /auth/register` — Registrar un nuevo usuario
  - Body: `{ name, email, password }`
  - Respuesta: usuario creado + token (o mensaje de error)
  - Auth: no

- `POST /auth/login` — Login
  - Body: `{ email, password }`
  - Respuesta: token JWT y datos de usuario
  - Auth: no

- `POST /auth/logout` — Logout (opcionalmente limpia cookies)
  - Auth: no / depende de implementación

- `POST /auth/send-reset-password-email` — Solicitar email para cambio de password
  - Body: `{ email }`
  - Auth: no

- `POST /auth/change-password/:token` — Cambiar contraseña mediante token
  - Params: `:token` (token enviado por email)
  - Body: `{ password }`
  - Auth: no

- `GET /auth/verify-email/:token` — Verificar email con token
  - Params: `:token`
  - Auth: no

- `GET /auth/dashboard-user` — Información del usuario (ruta protegida)
  - Headers: `Authorization: Bearer <token>`
  - Auth: sí (middleware `verifyToken`)

-- Rutas de workspaces (`/workspaces`)

- `GET /workspaces/my-workspaces` — Obtener workspaces del usuario
  - Headers: `Authorization: Bearer <token>`
  - Auth: sí

- `GET /workspaces/:idWorkspace` — Obtener info del workspace
  - Middleware: `memberMiddleware` (verifica que el usuario sea miembro)
  - Auth: sí

- `GET /workspaces/:idWorkspace/canales` — Listar canales del workspace
  - Auth: sí (member)

- `GET /workspaces/:idWorkspace/miembros` — Listar miembros del workspace
  - Auth: sí (member)

- `GET /workspaces/invitacion/:token` — Verificar invitación por token público
  - Auth: no

- `GET /workspaces/:idWorkspace/canales/:idChannel/mensajes` — Mensajes de un canal
  - Auth: sí (member)

- `POST /workspaces/create-workspace` — Crear workspace (acepta imagen)
  - Form-data: `image` (file) y campos del workspace
  - Headers: `Authorization: Bearer <token>`
  - Auth: sí

- `POST /workspaces/:idWorkspace/agregar-miembro` — Enviar invitación / agregar miembro
  - Auth: sí (member)

- `POST /workspaces/:idWorkspace/agregar-canal` — Crear canal en workspace
  - Auth: sí (member)

- `POST /workspaces/:idWorkspace/canales/:idChannel/mensaje` — Crear mensaje en canal
  - Body: `{ text, ... }` o form-data según implementación
  - Auth: sí (member)

- `DELETE /workspaces/:idWorkspace/miembros/:idMember/eliminar` — Eliminar un miembro
  - Auth: sí (member / role checks)

- `DELETE /workspaces/:idWorkspace/eliminar` — Eliminar workspace
  - Auth: sí (member / permisos)

- `DELETE /workspaces/:idWorkspace/abandonar` — Abandonar workspace (miembro actual)
  - Auth: sí

Notas:
- Las rutas que usan `verifyToken` requieren que hay loguearse para que se lea la cookie.
- Las rutas con `memberMiddleware` están pensadas para validar que el usuario pertenece al workspace.

---


### Proyecto desarrollado por Santiago Montironi.
