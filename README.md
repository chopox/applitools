# 👁️ Pruebas de Validación Visual con Applitools Eyes + Playwright

Repositorio de formación práctica sobre **testing visual automatizado** utilizando **Applitools Eyes** integrado con **Playwright**.

Este proyecto está orientado a aprender cómo detectar cambios visuales reales mediante **Visual AI**, ejecutar pruebas visuales en múltiples navegadores/dispositivos y reducir el mantenimiento de los tests automatizados.

---

# 📚 Información General

- **Duración:** 16 horas
- **Framework Base:** Playwright (Node.js)
- **Lenguaje:** TypeScript / JavaScript
- **Motor de IA Visual:** Applitools Eyes SDK
- **Ejecución Cross-Browser:** Applitools Ultrafast Grid
- **Reportes:** Applitools Test Results Dashboard
- **Infraestructura:** Docker / CI-CD Runners

---

# 🎯 Objetivos del Curso

- Comprender el funcionamiento de la **Visual AI** y su diferencia frente a la comparación tradicional por píxeles.
- Integrar **Applitools Eyes SDK** en un proyecto Playwright existente.
- Gestionar **baselines visuales** desde el Dashboard de Applitools.
- Ejecutar pruebas visuales en múltiples navegadores y dispositivos utilizando **Ultrafast Grid**.
- Reducir falsos positivos mediante regiones de ignorancia y selectores visuales.

---

# 🧠 ¿Qué es la Validación Visual?

Las aserciones tradicionales permiten validar comportamiento funcional:

```ts
await expect(locator).toBeVisible();
```

Sin embargo, no detectan:

- Desalineaciones visuales
- Problemas de responsive design
- Cambios de estilos
- Solapamientos de elementos
- Errores de renderizado

Applitools utiliza **Visual AI** para analizar la interfaz de forma similar a cómo lo haría una persona.

---

# 🏗️ Estructura del Curso

## 📦 Módulo 1 — Introducción a la Validación Visual

### Contenidos

- Limitaciones de las aserciones tradicionales
- Flujo de funcionamiento de Applitools:
  - Captura
  - Subida
  - Comparación
  - Reporte
- Configuración de:
  - API Key
  - Variables de entorno

### Conceptos clave

- Visual Testing
- Baselines
- Visual AI
- Detección inteligente de cambios

---

## ⚙️ Módulo 2 — Integración con Playwright

### Instalación del SDK

```bash
npm install @applitools/eyes-playwright
```

### Ciclo de vida básico

```ts
await eyes.open(page, 'Demo App', 'Visual Test');

await eyes.check('Home Page');

await eyes.close();
```

### Temas cubiertos

- `eyes.open()`
- `eyes.check()`
- `eyes.close()`
- Full Page Screenshots
- Captura de elementos específicos

---

## 🖥️ Módulo 3 — Dashboard y Match Levels

### Dashboard de Applitools

Aprenderás a:

- Analizar resultados visuales
- Diferenciar bugs reales de cambios esperados
- Aprobar o rechazar cambios visuales

### Match Levels

| Nivel | Descripción |
|---|---|
| Exact | Comparación exacta por píxeles |
| Strict | Nivel recomendado por defecto |
| Content | Ignora diferencias menores de estilo |
| Layout | Compara únicamente estructura/layout |

### Uso de regiones

- Ignore Regions
- Floating Regions
- Coded Regions

---

## 🚀 Módulo 4 — Escalabilidad con Ultrafast Grid

### Configuración

```js
module.exports = {
  testConcurrency: 5,
  apiKey: process.env.APPLITOOLS_API_KEY,
  browser: [
    { width: 1920, height: 1080, name: 'chrome' },
    { width: 768, height: 1024, name: 'firefox' },
    { deviceName: 'iPhone X' }
  ]
};
```

### Contenidos

- Ejecución paralela
- Responsive testing
- Desktop / Tablet / Mobile
- Integración CI/CD
  - GitHub Actions
  - Jenkins

---

# 🛠️ Tecnologías Utilizadas

| Componente | Tecnología |
|---|---|
| Framework E2E | Playwright |
| Motor Visual AI | Applitools Eyes |
| Cloud Execution | Applitools Ultrafast Grid |
| Lenguaje | TypeScript / JavaScript |
| Reportes | Applitools Dashboard |
| Infraestructura | Docker / CI-CD |

---

# 📂 Requisitos Previos

Antes de comenzar es recomendable contar con:

- Node.js 18+
- npm o yarn
- Cuenta en Applitools
- Visual Studio Code

## Para pruebas móviles

### Android

Es indispensable tener:

- Android Studio
- Emuladores Android configurados

### iOS (Opcional)

Para ejecutar pruebas en iOS se requiere:

- macOS
- Xcode
- Simuladores iOS

---

# 🔑 Configuración de Variables de Entorno

Crear un archivo `.env`:

```env
APPLITOOLS_API_KEY=tu_api_key
```

---

# ▶️ Ejecución del Proyecto

## Instalar dependencias

```bash
npm install
```

## Ejecutar tests Playwright

```bash
npx playwright test
```

## Ejecutar pruebas visuales

```bash
npx playwright test tests/visual
```

---

# 📊 Resultados y Reportes

Los resultados se visualizarán en:

- Applitools Test Results Dashboard
- Reportes visuales comparativos
- Historial de baselines
- Validaciones cross-browser

---

# 🧪 Buenas Prácticas

- Utilizar `Layout Match` para contenido dinámico.
- Ignorar regiones inestables (ads, timestamps, banners).
- Mantener baselines actualizados.
- Ejecutar pruebas visuales en CI/CD.
- Reducir dependencias de selectores complejos.

---

# 🔄 Integración CI/CD

Compatible con:

- GitHub Actions
- Jenkins
- Docker Runners
- Pipelines DevOps

Ejemplo básico:

```yaml
- name: Run Visual Tests
  run: npx playwright test
```

---

# 📖 Recursos Recomendados

- Documentación oficial de Playwright
- Documentación oficial de Applitools
- Guías de Visual Testing
- Best Practices de UI Testing

---

# 👨‍💻 Autores
- Artem Zatsarnyi. [@ArtemZat][https://www.github.com/artemzat]
- Daniel García. [@chopox][https://www.github.com/chopox]
- Iván Gámez. [@ivangamezc][https://www.github.com/ivangamezc]

---

# 📄 Licencia

Este proyecto puede utilizarse con fines educativos y de formación técnica.
