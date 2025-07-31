# Tienda Spring Boot – Frontend

Este proyecto es el **frontend de una tienda virtual**, desarrollado en **Angular**, que consume una API REST construida en Spring Boot. Permite gestionar clientes, productos y pedidos, así como generar reportes para entregar via email usando Spring Boot Mail.

## 🚀 Despliegue

El frontend fue desplegado en **Render.com** haciendo un enlace con el presente repositorio presente en **GitHub**. La interfaz de Render permite visualizar los Logs conrrespondientes a peticiones, despliegue, errores en tiempo real.

🔗 [URL en producción del frontend]([https://render.com](https://tiendaspringbootfrontend.onrender.com)) 

![render frontend](https://github.com/user-attachments/assets/108c31de-17cc-4eeb-93bb-94e176001c97)

## 📸 Capturas de pantalla

### Gestion de Clientes
![clientes-frontend](https://github.com/user-attachments/assets/8979e93e-54e8-4b64-b210-3781fea5332d)
--------------------------------------------------

### Gestion de Productos
![productos-frontend](https://github.com/user-attachments/assets/5b6342d6-6c56-44a4-92de-2724779ea9f2)
-------------------------------------------------

### Gestion de Pedidos
![pedidos-frontend](https://github.com/user-attachments/assets/46309270-ec30-469a-ad6e-f1c7a947c754)

Dentro de las funcionalidades esta el envío de reportes de venta y de pedidos totales via email, utilizando Spring Boot Mail
![reporteemail-frontend](https://github.com/user-attachments/assets/82318ed0-c573-48b9-a6a4-8dac52ed4448)

Donde se recibe un archivo PDF con las siguientes caracteristicas
![reportepedidos](https://github.com/user-attachments/assets/4650b8da-b214-451c-9e3a-56405f82413b)

-------------------------------------------------

## ⚙️ Tecnologías utilizadas

- Angular
- TypeScript
- HTML5 y CSS3
- Servicios HTTP
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

### Ejecutar en local:

```bash
docker build -t tienda-frontend .
docker run -p 80:80 tienda-frontend
```

## 🔗 Backend asociado

Repositorio del backend desarrollado en Spring Boot:
👉[Repositorio del backend](https://github.com/gjrangel2/TiendaSpringBoot)

## ✉️ Contacto

Desarrollado por **Geyson Rangel**
📧 [ingerangel22@gmail.com]

