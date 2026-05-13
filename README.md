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
