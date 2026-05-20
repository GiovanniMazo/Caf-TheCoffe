# Plan de Fix: Animación Botones Hero en Resize

Estado: Pendiente

## Pasos a Completar:

- [x] **Paso 1**: Editar `src/styles/components/Hero.css` - Actualizar .hero__actions (clamps, flex-wrap), .hero__cta (widths, transition suave, scale menor), agregar @keyframes slideInUp, mejorar media queries.
- [x] **Paso 2**: Limpiar legacy en `src/styles/index.css` - Comentar .hero__buttons y .cta classes.

- [x] **Paso 3**: Test cambios - Ejecutar `npm start`, probar resize en DevTools (900px, 768px, 600px), hover suave sin glitches ni desajustes.

Pendiente: Paso 4.

