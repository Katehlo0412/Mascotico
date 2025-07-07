# 🐾 Mascotico

<p align="center">
  <a href="https://laravel.com/" target="_blank"><img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel"></a>
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=222" alt="React"></a>
  <a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite"></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"></a>
  <a href="https://www.php.net/" target="_blank"><img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP"></a>
  <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
  <a href="https://getcomposer.org/" target="_blank"><img src="https://img.shields.io/badge/Composer-885630?style=for-the-badge&logo=composer&logoColor=white" alt="Composer"></a>
</p>

¡Bienvenido/a a **Mascotico**! Un sistema web para la gestión y adopción de mascotas, con tienda, comunidad y servicios para animales. Este proyecto utiliza **Laravel** (backend/API) y **React + Vite** (frontend).

## 🚀 Requisitos previos

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm >= 9
- Una base de datos (por defecto, SQLite, MySQL, PostgreSQL )

## ⚡ Instalación rápida

1. **Clona el repositorio:**
   ```bash
   git clone <URL-del-repo>
   cd Mascotico
   ```

2. **Instala dependencias de PHP (Laravel):**
   ```bash
   composer install
   ```

3. **Instala dependencias de Node (frontend):**
   ```bash
   npm install
   ```

4. **Configura el entorno:**
   - Copia el archivo de ejemplo:
     ```bash
     cp .env.example .env
     ```
   - Edita `.env` para tu base de datos y correo si es necesario.
   - Genera la clave de la app:
     ```bash
     php artisan key:generate
     ```

5. **Ejecuta migraciones y (opcional) seeders:**
   ```bash
   php artisan migrate
   # php artisan db:seed
   ```

## 🏃‍♂️ Ejecución en desarrollo

Puedes levantar todo con un solo comando:

```bash
composer run dev
```

Esto iniciará:
- El servidor Laravel (`php artisan serve`)
- El servidor de colas (`php artisan queue:listen`)
- El frontend Vite (`npm run dev`)

Accede a la app en: [http://localhost:8000](http://localhost:8000)

## 🌐 Secciones de la página

- **Inicio:** Página principal con presentación y acceso rápido a las funcionalidades.
- **Adopciones:** Explora animales disponibles para adopción y envía solicitudes.
- **Tienda:** Catálogo de productos para mascotas, compra y reseñas.
- **Entrenamientos:** Información y servicios de adiestramiento canino.
- **Guarderías:** Búsqueda y contacto de guarderías para mascotas.
- **Peluquerías:** Encuentra peluquerías y servicios de estética animal.
- **Paseadores:** Listado de paseadores de perros y contacto.
- **Veterinarios:** Consulta veterinarios cercanos y sus servicios.
- **Rescate:** Información y contacto para casos de rescate animal.
- **Comunidad:** Espacio para compartir experiencias, consejos y publicaciones.
- **Consejos:** Recomendaciones y tips para el cuidado de mascotas.
- **Mi cuenta:** Gestión de perfil, datos personales y pedidos (requiere login).
- **Panel de administración:** CRUD de productos y animales.

## 🌍 Acceso a la página web

Puedes acceder a la versión online de Mascotico aquí:

[https://mascotico-app-48d5228309f9.herokuapp.com/](https://mascotico-app-48d5228309f9.herokuapp.com/)

## 💡 Notas

- Si usas SQLite, asegúrate de que el archivo y carpeta `database/database.sqlite` existan y tengan permisos de escritura.
- Para funcionalidades de correo, configura las variables `MAIL_` en `.env`.
