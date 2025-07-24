DATABASE_URL="postgresql://etudejs_user:DPjOdL7Dp5LDipcVw17xF0XyiI8kk3D8@dpg-d1sqgv15pdvs73cs0q10-a.oregon-postgres.render.com/etudejs"
JWT_SECRET="z7F8kL2#nV9pQx3RjH6tWm5YbU1sC4eZdT0gXaVzN8rMfLpSjKqHwTyBcVeRgHu"
BCRYPT_SALT_ROUNDS="12"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dnoc9zacr"
CLOUDINARY_CLOUD_NAME="dnoc9zacr"
CLOUDINARY_API_KEY="673984385274951"
CLOUDINARY_API_SECRET="fZwlIg0s5lZ_q2gCvMpUt7djGnU"

# 🎹 EtudeJS - Tu Academia Musical Digital 🎵

¡Bienvenido a **EtudeJS**! 🌟 Una plataforma revolucionaria de aprendizaje musical donde la tecnología se encuentra con la pasión por la música. 

## 🚀 ¿Qué es EtudeJS?

EtudeJS es una aplicación web moderna y elegante diseñada para transformar la forma en que aprendes música. Con un piano virtual interactivo, sistema de cursos personalizados y un seguimiento detallado de tu progreso, ¡convertirse en músico nunca había sido tan emocionante! 🎼

### ✨ Características Principales

- 🎹 **Piano Virtual de Dos Octavas**: Toca directamente en tu navegador con sonidos de alta calidad
- 🔐 **Sistema de Autenticación Seguro**: JWT con cookies HttpOnly para máxima seguridad
- 📊 **Dashboard Personalizado**: Seguimiento detallado de tu progreso musical
- 🎓 **Sistema de Cursos**: Aprende a tu ritmo con contenido estructurado
- 🏆 **Sistema de Logros**: Celebra cada hito en tu journey musical
- 📱 **Diseño Responsivo**: Perfecto en desktop, tablet y móvil
- 🌙 **Interfaz Elegante**: Dark theme con gradientes dorados y animaciones suaves

## 🛠️ Stack Tecnológico

### Frontend 💻
- **Next.js 15.3.5** - Framework React con App Router
- **React 19.1.0** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS v4** - Estilos utilitarios modernos
- **Framer Motion** - Animaciones fluidas y elegantes

### Backend ⚙️
- **Next.js API Routes** - Endpoints serverless
- **Prisma ORM** - Gestión de base de datos moderna
- **PostgreSQL** - Base de datos relacional robusta
- **JWT** - Autenticación segura con tokens
- **bcrypt** - Encriptación de contraseñas

### Características Técnicas 🔧
- **SSR/CSR Híbrido** - Mejor rendimiento y SEO
- **TypeScript Strict Mode** - Máxima seguridad de tipos
- **Responsive Design** - Mobile-first approach
- **Audio System** - Reproducción de sonidos MP3 optimizada

## 🎯 Funcionalidades

### 🏠 Página de Inicio
- Landing page atractiva con animaciones
- Detección automática de estado de autenticación
- Redirección inteligente según el usuario

### 🎹 Piano Virtual
- **Dos octavas completas** (C4-B5)
- **Controles de teclado**: 
  - Teclas blancas: `A S D F G H J K L Ñ Q W E R T Y U I O P`
  - Teclas negras: `W E T Y U O P`
- **Sonidos realistas** con archivos MP3 de alta calidad
- **Feedback visual** al tocar las teclas

### 👤 Sistema de Usuarios
- **Registro seguro** con validación de datos
- **Login con JWT** y cookies HttpOnly
- **Perfil personalizado** con estadísticas detalladas
- **Logout seguro** con limpieza de cookies

### 📚 Dashboard y Cursos
- **Vista general** de progreso
- **Estadísticas visuales** con gráficos interactivos
- **Sistema de inscripciones** a cursos
- **Tracking de progreso** en tiempo real

## 🚀 Instalación y Configuración

### Prerrequisitos 📋
- Node.js 18+ 
- PostgreSQL 13+
- npm o yarn

### Pasos de Instalación 📦

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/aiizedev/EtudeJs.git
   cd EtudeJs
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` con tus configuraciones:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/etudejs"
   JWT_SECRET="tu-clave-secreta-super-segura"
   NEXTAUTH_SECRET="otra-clave-secreta-para-nextauth"
   ```

4. **Configura la base de datos**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

6. **¡Abre tu navegador en `http://localhost:3000`!** 🎉

## 📁 Estructura del Proyecto

```
EtudeJS/
├── 📁 app/                    # App Router de Next.js
│   ├── 📁 (root)/            # Rutas principales
│   │   ├── 📄 page.tsx       # Landing page
│   │   ├── 📁 dashboard/     # Dashboard principal
│   │   ├── 📁 piano/         # Piano virtual
│   │   └── 📁 profile/       # Perfil de usuario
│   ├── 📁 api/               # API Routes
│   │   └── 📁 auth/          # Endpoints de autenticación
│   ├── 📁 hooks/             # Custom React hooks
│   └── 📄 layout.tsx         # Layout principal
├── 📁 components/            # Componentes reutilizables
│   └── 📁 ui/               # Componentes de UI
├── 📁 lib/                   # Utilidades y configuraciones
├── 📁 prisma/               # Esquemas de base de datos
├── 📁 public/               # Archivos estáticos
│   ├── 📁 audios/           # Sonidos del piano
│   ├── 📁 icons/            # Iconos SVG
│   └── 📁 images/           # Imágenes
└── 📁 styles/               # Estilos globales
```

## 🎹 Guía de Uso

### Para Estudiantes 🎓

1. **Regístrate** en la plataforma
2. **Explora el piano virtual** y familiarízate con los controles
3. **Inscríbete en cursos** desde el dashboard
4. **Practica regularmente** y sigue tu progreso
5. **Desbloquea logros** mientras avanzas

### Para Desarrolladores 👩‍💻👨‍💻

1. **Fork el repositorio** y crea tu rama
2. **Instala las dependencias** siguiendo la guía
3. **Ejecuta los tests** (cuando estén disponibles)
4. **Haz tus cambios** siguiendo las convenciones
5. **Crea un Pull Request** con descripción detallada

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! 🎉 Si tienes ideas, mejoras o encuentras bugs:

1. 🍴 Fork el proyecto
2. 🌿 Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. 💻 Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🔀 Abre un Pull Request

### Tipos de Contribuciones Buscadas 🎯
- 🐛 Corrección de bugs
- ✨ Nuevas características
- 📚 Mejoras en documentación
- 🎨 Mejoras de UI/UX
- 🔊 Nuevos sonidos para el piano
- 🧪 Tests unitarios e integración

## 📝 Scripts Disponibles

```bash
npm run dev          # 🚀 Servidor de desarrollo con Turbopack
npm run dev-stable   # 🚀 Servidor de desarrollo estable
npm run build        # 🏗️ Build de producción
npm run start        # ▶️ Servidor de producción
npm run lint         # 🔍 Linter de código
npm run clean        # 🧹 Limpia archivos de build
```

## 🔮 Roadmap Futuro

- [ ] 🎤 Integración con micrófono para detección de pitch
- [ ] 🎼 Editor de partituras integrado
- [ ] 🤖 IA para recomendaciones personalizadas
- [ ] 🎮 Gamificación avanzada con challenges diarios
- [ ] 📱 App móvil nativa
- [ ] 🌐 Soporte multiidioma
- [ ] 👥 Funciones sociales y colaborativas
- [ ] 🎥 Lecciones en video integradas

## ⚠️ Problemas Conocidos

- El piano virtual funciona mejor en navegadores modernos
- Los sonidos requieren interacción del usuario para reproducirse (política del navegador)
- La primera carga puede ser lenta debido a la precarga de audios

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**aiizedev** - *Desarrollador Principal* 
- GitHub: [@aiizedev](https://github.com/aiizedev)

## 🙏 Agradecimientos

- 🎵 Samples de audio de YO, gracias

---

<div align="center">

**¡Hecho con ❤️ y mucha ☕ por el equipo de EtudeJS!**

*¿Te gusta el proyecto? ¡No olvides darle una ⭐ en GitHub!*

</div>
