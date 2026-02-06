# Spybee - Plataforma de Gestión de Proyectos

Aplicación web para la gestión de proyectos con visualización en mapa interactivo, desarrollada con **Next.js 15** y **React 19**.

![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black)
![React](https://img.shields.io/badge/React-19-blue)

## Características Principales

### Autenticación
- Sistema de login funcional con validación
- Protección de rutas privadas
- Persistencia de sesión con localStorage (solo para demo)
- Logout con redirección automática

> **Nota de Seguridad**: En producción, la autenticación debería usar:
> - Tokens JWT almacenados en cookies HttpOnly
> - Refresh tokens para renovación segura
> - Backend con validación de sesiones
> - Para esta demo se usa localStorage por simplicidad

### Gestión de Proyectos
- **Listado paginado**: 10 proyectos por página
- **Búsqueda inteligente**: 
  - Debounce de 300ms para optimizar rendimiento
  - Búsqueda multi-campo (nombre, equipo, estado, plan)
  - Botón para limpiar búsqueda
- **Ordenamiento avanzado**:
  - Alfabético (A-Z)
  - Por número de incidencias
  - Por número de RFIs
  - Por número de tareas
  - Toggle ascendente/descendente con indicadores visuales

### Visualización en Mapa
- Integración con **MapLibre GL** (open source, sin tarjeta de pago)
- **Marcadores personalizados** con logo de Spybee:
  - Diseño circular con borde de color según estado
  - Badge con número de incidencias
  - Animación de pulso continua
  - Efecto hover con escala
  - Animación de entrada escalonada
- **Popups informativos mejorados** con:
  - Nombre del proyecto
  - Plan contratado
  - Estado actual (con color)
  - Tamaño del equipo
  - Número de incidencias
  - Número de RFIs
  - Número de tareas
  - Iconos para mejor legibilidad
- Navegación bidireccional lista ↔ mapa
- Animación suave al centrar proyectos
- Validación de coordenadas
- Controles de navegación y escala
- Estado de carga con spinner

### UX/UI
- Estados de carga (loading states)
- Estado vacío cuando no hay resultados
- Feedback visual para proyecto seleccionado
- Animaciones suaves en transiciones
- Diseño responsive (mobile, tablet, desktop)
- Accesibilidad (ARIA labels)

## Tecnologías Utilizadas

- **Framework**: Next.js 15.1.0 (App Router)
- **UI Library**: React 19
- **Estado Global**: Zustand 4.5.2
- **Mapas**: MapLibre GL 5.1.0
- **Iconos**: Lucide React
- **Fechas**: date-fns 3.6.0
- **Estilos**: CSS Modules

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd frontend_test_spybee

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Credenciales de Acceso (Demo)

Para acceder a la aplicación en modo demo:

- **Email**: Cualquier email válido (ej: `demo@spybee.com`)
- **Contraseña**: Mínimo 6 caracteres (ej: `123456`)

### Arquitectura

La aplicación sigue una **arquitectura híbrida**:

- **Por features** (`auth/`, `projects/`): Componentes específicos de cada funcionalidad
- **Atomic Design** (`ui/`): Componentes UI reutilizables sin lógica de negocio
- **Separación de concerns**: Hooks, store y utils en carpetas dedicadas

## Funcionalidades Implementadas

### Requerimientos Core
- [x] Tabla paginada (10 items/página)
- [x] Búsqueda en tiempo real con debounce
- [x] 4 tipos de ordenamiento
- [x] Mapa MapLibre-GL con marcadores
- [x] Click en proyecto -> centrar mapa
- [x] Sincronización bidireccional

### Mejoras de Calidad
- [x] Custom hooks (useDebounce, useFilteredProjects)
- [x] Búsqueda multi-campo
- [x] Indicadores visuales de ordenamiento
- [x] Popups informativos en mapa
- [x] Marcadores personalizados por estado
- [x] Loading states
- [x] Estados vacíos
- [x] Validación de datos
- [x] Responsive design

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## Decisiones de Diseño

### Elección de Tecnología (Mapas)
He tomado la decisión de usar **MapLibre GL JS** en lugar de la librería sugerida Mapbox GL JS por las siguientes razones:

1. Mapbox requiere el registro de una tarjeta de crédito para obtener un token de acceso, incluso para el nivel gratuito. Yo consideró que una prueba de concepto o periodo de evaluación no debería condicionarse a la entrega de datos de pago segun mi criterio por lo que opté por MapLibre GL JS.
2.  **Open Source y Libre**: MapLibre es un fork de código abierto mantenido activamente por la comunidad, garantizando su uso libre y perpetuo sin las restricciones de licencia comercial que introdujo Mapbox v2.
3.  **Compatibilidad y Paridad**: Al derivar directamente del código base original de Mapbox, MapLibre mantiene una API extremadamente similar, ofreciendo las mismas capacidades de renderizado vectorial y rendimiento sin sacrificar funcionalidad.

### Arquitectura
- **Custom Hooks**: Separación de lógica de negocio de componentes UI
- **Zustand**: Estado global simple y performante
- **CSS Modules**: Estilos aislados sin conflictos

### Performance
- **Debounce**: Reduce llamadas innecesarias en búsqueda
- **useMemo**: Optimización de filtrado y ordenamiento
- **Lazy Loading**: Paginación para manejar grandes datasets

### UX
- **Feedback Visual**: Estados de carga, errores y éxito
- **Animaciones**: Transiciones suaves para mejor experiencia
- **Responsive**: Adaptación a todos los tamaños de pantalla

## Manejo de Errores

- Validación de coordenadas antes de renderizar marcadores
- Manejo de proyectos sin imagen
- Filtrado case-insensitive de tags (TASK vs task)
- Reset de paginación al buscar

## Responsive Design

- **Desktop**: Vista completa con mapa y tabla
- **Tablet**: Layout adaptado
- **Mobile**: Vista optimizada con componentes apilados

## Autor

Desarrollado como prueba técnica para Spybee
