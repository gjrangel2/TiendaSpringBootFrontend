# -----------------------------
# Tienda Spring Boot – Frontend
# -----------------------------

Este proyecto es el **frontend de una tienda virtual**, desarrollado en **Angular**, que consume una API REST construida en Spring Boot, el backend está en el repositorio 🔗 Enlace al backend: https://github.com/gjrangel2/TiendaSpringBoot. Permite gestionar clientes, productos y pedidos, así como generar reportes para entregar via email usando Spring Boot Mail.

## 🚀 Despliegue

El frontend fue desplegado en **Render.com** usando un archivo `Dockerfile` personalizado, ya que el entorno no detectaba automáticamente el tipo de aplicación Angular.

🔗 [URL en producción del frontend]([https://render.com](https://tiendaspringbootfrontend.onrender.com)) 


## 📸 Capturas de pantalla

Sube tus capturas de pantalla a una carpeta llamada `images/` y referencia así:

```markdown
![clientes-frontend](https://github.com/user-attachments/assets/8979e93e-54e8-4b64-b210-3781fea5332d)
![productos-frontend](https://github.com/user-attachments/assets/5b6342d6-6c56-44a4-92de-2724779ea9f2)
![pedidos-frontend](https://github.com/user-attachments/assets/46309270-ec30-469a-ad6e-f1c7a947c754)

```

## ⚙️ Tecnologías utilizadas

- Angular
- TypeScript
- HTML5 y CSS3
- Servicios HTTP con RxJS
- Bootstrap (si aplica)
- Docker
- Render.com

## 📁 Estructura del proyecto

```bash
📦 src
└── 📁 app
    ├── 📁 cliente
    │   ├── cliente.component.ts
    │   ├── cliente.component.html
    │   └── cliente.component.css
    ├── 📁 pedido
    │   └── ...
    ├── 📁 producto
    │   └── ...
    ├── 📁 services
    │   └── cliente.service.ts
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    ├── app-routing.module.ts
    └── app.module.ts
```

## ✅ Funcionalidades

- [x] Visualización y gestión de clientes
- [x] Visualización y gestión de productos
- [x] Visualización y gestión de pedidos
- [x] Envío de reportes por correo electrónico
- [x] Comunicación con backend por HTTP
- [x] Diseño responsivo básico con CSS

## 🧪 Cómo ejecutar localmente

```bash
# Clona el repositorio
https://github.com/gjrangel2/TiendaSpringBootFrontend.git

# Entra a la carpeta
cd TiendaSpringBootFrontend

# Instala dependencias
npm install

# Ejecuta la aplicación
ng serve --open
```

Abre en: `http://localhost:4200`

## 🐳 Docker

### 📄 Dockerfile

```dockerfile
# Etapa 1: build
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2: nginx
FROM nginx:alpine
COPY --from=build /app/dist/tu-nombre-app /usr/share/nginx/html
```

### Ejecutar en local:

```bash
docker build -t tienda-frontend .
docker run -p 80:80 tienda-frontend
```

## 🔗 Backend asociado

Repositorio del backend desarrollado en Spring Boot:
👉 https://github.com/gjrangel2/TiendaSpringBoot

## ✉️ Contacto

Desarrollado por **Geyson Rangel**
📧 [TuCorreo@example.com]

## 📃 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y compartirlo libremente.
he [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
