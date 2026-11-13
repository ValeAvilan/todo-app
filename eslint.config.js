// ESLint revisa el código y avisa de errores o patrones que pueden causar problemas.
const { defineConfig } = require('eslint/config');
// Usamos las reglas recomendadas para proyectos Expo.
const expoConfig = require('eslint-config-expo/flat');

// Exportamos la configuración para que el comando de revisión pueda leerla.
module.exports = defineConfig([
  expoConfig,
  {
    // No revisamos la salida generada ni la plantilla antigua de ejemplo.
    ignores: ['dist/**', 'example/**'],
  },
]);
