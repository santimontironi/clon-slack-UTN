# 💬 Slack Clone – Proyecto Full Stack (MERN) - en desarrollo

Proyecto **Full Stack** desarrollado como **Trabajo Práctico Final** de la **Diplomatura Full Stack de la UTN**.  
La aplicación es un **clon de Slack**, permitiendo la comunicación en tiempo real mediante canales, usuarios y mensajes.

---

## 🛠️ Stack Tecnológico

**Frontend**
- React
- Vite
- React Router DOM
- Context API
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Autenticación)

**Otros**
- Postman (testing)
- Vercel (deploy)

---

## 📌 Descripción del Proyecto

La aplicación permite a los usuarios:

- Registrarse e iniciar sesión
- Crear y unirse a canales
- Enviar y recibir mensajes en tiempo real
- Gestionar perfiles de usuario
- Autenticación segura mediante JWT

El sistema está dividido en **frontend y backend**, siguiendo una arquitectura cliente-servidor.

---

## 🚀 Instalación y Ejecución

### 📦 Requisitos Previos
- Node.js (v18 o superior)
- MongoDB (MongoDB Atls)
- Git

---

### 🔧 Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/slack-clone-mern.git
cd slack-clone-mern
cd backend
npm install
npm run dev
El backend quedará ejecutándose en:
http://localhost:3000
```
- PORT=3000
- MONGO_URL = URL local
- JWT_SECRET = crear una
- FRONTEND_URL = http://localhost:5173

```bash
cd frontend
npm install
npm run dev
El frontend quedará ejecutándose en:
http://localhost:5173
```
