# 👁️ Pruebas de Validación Visual con Applitools Eyes + Playwright

Repositorio de formación práctica sobre **testing visual automatizado** utilizando **Applitools Eyes** integrado con **Playwright**.

Este proyecto está orientado a aprender cómo detectar cambios visuales reales mediante **Visual AI**, ejecutar pruebas visuales en múltiples navegadores/dispositivos y reducir el mantenimiento de los tests automatizados.

---

# 📚 Información General

- **Duración:** 16 horas.
- **Framework Base:** Playwright (Node.js).
- **Lenguaje:** TypeScript / JavaScript.
- **Motor de IA Visual:** Applitools Eyes SDK.
- **Ejecución Cross-Browser:** Applitools Ultrafast Test Grid.
- **Reportes:** Applitools Test Results Dashboard.
- **Infraestructura:** Docker / CI-CD Runners.

---

# 🎯 Objetivos del Curso

- Comprender el funcionamiento de la **Visual AI** y su diferencia frente a la comparación tradicional por píxeles.
- Integrar **Applitools Eyes SDK** en un proyecto Playwright existente mediante el uso de **Fixtures**.
- Gestionar **baselines visuales** y flujos de aprobación desde el Dashboard.
- Ejecutar pruebas visuales masivas en paralelo utilizando **Ultrafast Test Grid**.
- Aplicar estrategias avanzadas de reducción de falsos positivos mediante regiones inteligentes y distintos **Match Levels**.

---

# ⚙️ Configuración de entorno

## 1. Instalación de Node.js

Para comenzar, dirígete a la página oficial de descargas de [Node.js](https://nodejs.org/es/download). 
Selecciona tu sistema operativo, descarga el instalador (por ejemplo, el archivo `.msi` para Windows) y completa el proceso de instalación.

Para verificar que Node.js y su gestor de paquetes (`npm`) se han instalado correctamente, abre tu terminal y ejecuta los siguientes comandos:

```bash
node -v 
npm -v
```

## 2. Instalación de Playwright

Crea un nuevo directorio para tu proyecto, ábrelo en la terminal y ejecuta el siguiente comando para inicializar Playwright:

```bash
npm init playwright@latest
```

Durante el asistente de instalación, se te pedirá configurar el proyecto. Te recomendamos las siguientes opciones:

- Lenguaje: TypeScript.
- Directorio de pruebas: tests (o el de tu preferencia).
- GitHub Actions: Opcional (elige según las necesidades de tu CI/CD).
- Navegadores: Confirma la instalación de los navegadores por defecto de Playwright.

## 3. Instalación del SDK de **Applitools**

Para integrar la ejecución de Playwright con el motor de Visual AI, es necesario instalar el paquete oficial de Applitools como dependencia de desarrollo:
```bash
npm install -D @applitools/eyes-playwright
```

## 4. Configuración de Applitools SDK

Finalmente, ejecuta el asistente de configuración para vincular tu entorno local con tu cuenta de Applitools:

```bash
npx eyes-setup
```

💡 Nota: Durante este paso necesitarás tu API Key. Para obtenerla, inicia sesión en tu espacio de Applitools, haz clic en el icono de tu perfil (arriba a la derecha) y selecciona "My API Key". Deberás introducir esta clave cuando la consola te lo solicite.

**¡Listo! Ahora tienes configurado el entorno básico para comenzar a validar páginas. 🎉**

---

# 🏗️ Estructura del Curso

## 📦 Módulo 1 — Introducción y Arquitectura

### Contenidos
- Limitaciones del Pixel Diff tradicional (Anti-aliasing, renderizado de fuentes).
- Arquitectura del sistema:
  - **Eyes SDK:** Captura y comunicación.
  - **Ultrafast Test Grid:** Renderizado paralelo en la nube.
  - **Cloud Engine:** Motor de IA y comparación de baselines.
- Configuración de API Key y variables de entorno.

---

## ⚙️ Módulo 2 — Integración con Playwright

### Implementación Profesional: Fixtures
Uso de Playwright Fixtures para abstraer el boilerplate y gestionar automáticamente el ciclo de vida (open, check, close).

```typescript
import { test } from '@applitools/eyes-playwright/fixture';

test('Login Page Validation', async ({ page, eyes }) => {
await page.goto('/login');
await eyes.check('Login Screen', Target.window().fully());
});
```

### Temas cubiertos
- Capturas **Full Page** vs **Region-Based**.
- Snapshot de DOM: Envío de activos a la nube para renderizado estable.

---

## 🖥️ Módulo 3 — Match Levels y Root Cause Analysis (RCA)

### Match Levels Avanzados
- **Strict (Default):** Tolerancia inteligente a variaciones de renderizado.
- **Content:** Valida estructura e información ignorando estilos.
- **Layout:** Ideal para contenido dinámico y grids responsivos.

### Root Cause Analysis (RCA)
Diagnóstico a nivel de DOM para identificar exactamente qué regla CSS o elemento HTML causó el cambio visual, eliminando el tiempo de "adivinar" fallos en la maqueta.

### Regiones Inteligentes
- **Ignore Regions:** Exclusión de anuncios o timestamps.
- **Floating Regions:** Tolerancia a pequeños desplazamientos de elementos.
- **Coded Regions:** Definición programática de áreas de exclusión.

---

## 🚀 Módulo 4 — Escalabilidad con Ultrafast Test Grid (UTG)

### UTG vs. Ejecución Local
Mientras la ejecución local depende de la CPU y recursos del runner, el **Ultrafast Test Grid** renderiza en paralelo en múltiples navegadores/dispositivos reduciendo el tiempo hasta en un 90%.

### Contenidos
- Configuración de browser y viewports (Desktop, Tablet, Mobile).
- Gestión de **Batches** para agrupar resultados de ejecución.
- Integración en Pipelines (GitHub Actions, Jenkins).

---

# 🚀 Workshops & Challenge Final

El curso incluye actividades prácticas diseñadas para escenarios reales:

- **Workshop 1:** Primer checkpoint visual y creación de baseline inicial.
- **Workshop 2:** Detección de bugs visuales reales mediante distintos Match Levels.
- **Workshop 3:** Eliminación de falsos positivos usando Ignore y Floating Regions.
- **Workshop 4:** Construcción de una Pipeline Visual Enterprise con GitHub Actions.

### 🏆 LAB FINAL: Enterprise Challenge
Desarrollar una suite automatizada completa capaz de validar una aplicación web responsive, gestionando baselines y ejecutando validaciones paralelas en **Applitools Ultrafast Test Grid** integradas en CI/CD.

---

# 🛠️ Tecnologías Utilizadas

| Componente | Tecnología |
|---|---|
| Framework E2E | Playwright |
| Motor Visual AI | Applitools Eyes |
| Cloud Execution | Applitools Ultrafast Grid |
| Debugging | Root Cause Analysis (RCA) |
| Infraestructura | Docker & CI/CD Runners |

---

# 📊 Checklist Final de Verificación

Para garantizar el éxito de la implementación, asegúrate de cumplir con:
- [x] **SDK Integrado:** Instalado y configurado mediante fixtures.
- [x] **Baseline Creado:** Referencia visual inicial aprobada en el Dashboard.
- [x] **CI Funcionando:** Pipeline ejecutando tests automáticamente en cada commit.
- [x] **Regiones Configuradas:** Áreas dinámicas excluidas para 0 falsos positivos.

---

# 👨‍💻 Autores
- Artem Zatsarnyi. [@ArtemZat](https://www.github.com/artemzat)
- Daniel García. [@chopox](https://www.github.com/chopox)
- Iván Gámez. [@ivangamezc](https://www.github.com/ivangamezc)

---

# 📄 Licencia

Este proyecto puede utilizarse con fines educativos y de formación técnica.
