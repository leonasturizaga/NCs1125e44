### `backend/README.md`


# Backend API – Testimonial CMS

![Node.js](https://img.shields.io/badge/Node.js-20.12-339933?logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql&logoColor=white)

## Endpoints Principales

| Método | Ruta                          | Descripción                     |
|-------|-------------------------------|-------------------------------|
| GET   | `/testimonies/getAll`         | Listar testimonios            |
| POST  | `/testimonies/post`           | Crear testimonio (multipart)  |
| PUT   | `/users/edit/:id`             | Editar usuario (JSON)         |
| GET   | `/users/getById/:id`          | Obtener usuario               |

## Desarrollado por
Mateo López – Backend Lead

Deploy: https://n-cs1125e44.vercel.app

## Scripts

```bash
npm start          # Desarrollo local
npm run build      # Build para producción
npm run preview    # Previsualizar build

#Variables de Entorno (.env)
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=your_strong_secret_here
PORT=3000