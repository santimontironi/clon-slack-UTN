# 💬 Slack Clone – Proyecto Full Stack (MERN)

Proyecto desarrollado como Trabajo Práctico Final de la Diplomatura Full Stack (UTN). Es un clon de Slack que permite comunicación por canales, gestión de workspaces y autenticación con JWT.

---

**Estado:** en producción

**URL:** https://clon-slack-utn-frontend.vercel.app

**Stack:** React + Vite + TailwindCSS (frontend) · Node.js + Express + MongoDB (backend) + Test unitarios con Jest

---

**Contenido de este README**
- Descripción
- Arquitectura general y responsabilidades por carpeta
- Flujos principales del sistema
- Modelos y relaciones principales
- Requisitos y puesta en marcha (frontend y backend)
- Funcionalidades principales
- Variables de entorno necesarias
- Scripts importantes
- Endpoints del backend (lista y descripciones)

---

## Arquitectura general

La aplicación está separada en dos capas principales:

- `frontend`: SPA en React con Vite. Las pantallas consumen servicios HTTP, y los contextos centralizan el estado compartido de autenticación, workspaces y mensajes.
- `backend`: API REST en Express. Las rutas delegan la lógica a controllers, y los controllers usan repositories y modelos de MongoDB para persistencia.

Flujo general de datos:

`Screen / Component -> Service (axios) -> Endpoint Express -> Route -> Controller -> Repository / Model -> Response -> Context / Estado local`

Detalles de implementación:

- El frontend usa `axios` con `withCredentials: true`, por lo que las credenciales viajan por cookie.
- El backend expone las rutas bajo los prefijos `/api/auth` y `/api/workspaces`.
- Las rutas protegidas usan `verifyToken` para leer el JWT desde cookie y cargar `req.user`.
- Las rutas internas de workspace usan `memberMiddleware` para validar pertenencia y cargar `req.member`.

---

## Responsabilidad de carpetas

### Frontend (`frontend/src`)

- `Screens/`: vistas principales del sistema, por ejemplo login, dashboard, workspace, invitaciones y gestión de miembros.
- `components/`: componentes reutilizables de interfaz, organizados por dominio (`authComponents`, `channelComponents`, `workspaceComponents`, etc.).
- `context/`: estado global del cliente.
  - `AuthContext`: sesión, login, registro, logout y carga inicial del usuario autenticado.
  - `WorkspaceContext`: workspaces del usuario, workspace activo, canales, miembros, invitaciones y canal seleccionado.
  - `MessageContext`: mensajes del canal seleccionado y creación de mensajes.
- `services/`: capa de acceso HTTP al backend mediante `axios`.

### Backend (`backend`)

- `routes/`: definición de endpoints y middlewares por recurso.
- `controllers/`: lógica de negocio y validaciones principales.
- `repository/`: operaciones de acceso a datos para desacoplar controllers de Mongoose.
- `models/`: esquemas de MongoDB.
- `middlewares/`: autenticación, autorización y carga de archivos.
- `config/`: integración con MongoDB, Cloudinary y servicio de correo.

---

## Flujos principales del sistema

### 1. Autenticación

- El usuario se registra o inicia sesión desde una screen de autenticación.
- El frontend llama a `authService`.
- El backend responde y deja la sesión disponible por cookie.
- Al montar la app, `AuthContext` ejecuta `dashboardUserService()` para reconstruir la sesión y poblar `user`.

### 2. Workspaces

- `WorkspaceContext` carga los workspaces del usuario al iniciar con `getMyWorkspacesService()`.
- Crear workspace envía `multipart/form-data` para soportar imagen.
- Si hay imagen, el backend la sube a Cloudinary antes de persistir el workspace.
- El owner queda asociado al nuevo workspace a través de la lógica del repository.

### 3. Invitaciones a workspace

- Un owner o admin invita a un usuario indicando `email` y `role`.
- El backend valida que el usuario exista, tenga email verificado y no sea ya miembro.
- Luego genera un token JWT de invitación con expiración de 24 horas y envía un email con link al frontend.
- La screen `AcceptInvitation` consume el token desde la URL.
- El endpoint público `GET /api/workspaces/invitacion/:token` no solo valida la invitación: también agrega efectivamente al usuario como miembro si todo es correcto.

### 4. Canales

- Los canales pertenecen a un workspace.
- Solo `owner` y `admin` pueden crearlos.
- El frontend obtiene la lista desde `WorkspaceContext` y guarda el canal seleccionado en `selectedChannel`.

### 5. Mensajes

- `MessageContext` depende de `workspaceById` y `selectedChannel` para pedir mensajes.
- Al enviar un mensaje, el frontend postea al canal actual y actualiza el estado local agregando el nuevo mensaje al array.
- Cada mensaje queda asociado al canal y al miembro del workspace que lo envió.

---

## Modelos y relaciones principales

- `User`: usuario de la plataforma. Incluye email, password, username y estado de verificación de email.
- `Workspace`: espacio de trabajo. Tiene owner, título, descripción, imagen y estado activo.
- `MembersWorkspace`: tabla de relación entre usuario y workspace. Define además el `role` del usuario dentro del workspace (`owner`, `admin`, `user`).
- `Channel`: canal perteneciente a un workspace.
- `ChannelMessage`: mensaje perteneciente a un canal y asociado al miembro que lo envió.

Relaciones importantes:

- Un `User` puede pertenecer a muchos `Workspace` a través de `MembersWorkspace`.
- Un `Workspace` puede tener muchos `Channel`.
- Un `Channel` puede tener muchos `ChannelMessage`.
- Los permisos del sistema se apoyan en el rol guardado en `MembersWorkspace`.

---

## Decisiones de implementación útiles para mantenimiento

- La sesión autenticada se reconstruye desde el frontend al cargar la app, no solo al hacer login.
- Las invitaciones se resuelven con un token público enviado por email.
- La aceptación de invitación hoy sucede en una request `GET`, porque el endpoint de verificación además crea el miembro nuevo.
- La autorización por workspace no depende solo del JWT: además se valida membresía con `memberMiddleware`.
- La subida de imagen del workspace se procesa en backend con `multer` y luego se delega a Cloudinary.

---

## Funcionalidades principales

Esta aplicación implementa las siguientes funcionalidades:

- **Autenticación de usuarios**: registro, login con JWT, verificación de email y recuperación/cambio de contraseña mediante token enviado por email.
- **Gestión de Workspaces**: crear workspaces, editar (imagen y datos) y eliminar workspaces.
- **Invitaciones**: enviar invitaciones por email para unirse a un workspace mediante token público, aceptar invitaciones.
- **Gestión de miembros**: listar miembros, agregar miembros mediante invitación, eliminar miembros y permitir que un miembro abandone un workspace.
- **Canales por workspace**: crear y listar canales dentro de un workspace.
- **Mensajería en canales**: publicar mensajes en canales y obtener el historial de mensajes por canal.
- **Cargas de archivos / imágenes**: subida de imágenes (por ejemplo, imagen del workspace) integrada con Cloudinary.
- **Envío de emails**: envío de correos (ver `config/mail.config.js`) para verificación y recuperación de contraseña.
- **Middlewares de seguridad**: middleware `verifyToken` para rutas protegidas y `memberMiddleware` para validar pertenencia al workspace.
- **Frontend SPA**: cliente en React (Vite + TailwindCSS) con pantallas de autenticación, administración de workspaces y visualización de canales.

Estas funcionalidades están organizadas entre el cliente (`frontend`) y el servidor (`backend`).

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

## Variables de entorno (frontend)
- `VITE_BACKEND_URL` - URL del backend (para comunicarse y realizar las peticiones)

Coloca estas variables en un archivo `.env` en la carpeta `frontend`.

## Scripts (resumen)
- Backend (carpeta `backend`):
  - `npm run dev` - ejecuta `nodemon index.js` (desarrollo)
  - `npm start` - ejecuta `node index.js`
- Frontend (carpeta `frontend`):
  - `npm run dev` - inicia Vite (desarrollo)

---

## Endpoints del backend

Base URL local: `http://localhost:3000/api` (ajustar si cambia `PORT`)


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
  - Auth: sí (middleware `verifyToken`; el JWT se envía en cookie httpOnly)

-- Rutas de workspaces (`/workspaces`)

- `GET /workspaces/my-workspaces` — Obtener workspaces del usuario
  - Auth: sí (el JWT se envía en cookie httpOnly y lo valida `verifyToken`)

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
  - Auth: sí (el JWT se envía en cookie httpOnly y lo valida `verifyToken`)

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
- Las rutas protegidas esperan que el JWT se envíe en una cookie (normalmente `httpOnly`) y son verificadas por el middleware `verifyToken`.
- Las rutas con `memberMiddleware` están pensadas para validar que el usuario pertenece al workspace.

---

## Tests unitarios

- **Implementación:** Se implementaron tests unitarios con `jest` en el backend.
- **Ejecutar:** Desde la raíz del proyecto, abre una terminal y ejecuta:

```bash
cd backend
npm test
```

---

### Proyecto desarrollado por Santiago Montironi.