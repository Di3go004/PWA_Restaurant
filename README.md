# PWA_Restaurant

Proyecto de restaurante Full-Stack (PERN) implementando el patrón de ramas Git Flow y despliegues modernos.

---

## Guía de Commits (Conventional Commits)

Para mantener un historial de Git limpio, semántico y profesional, utilizamos la convención estándar de la industria. Cada vez que realice un commit, debe usar uno de los siguientes prefijos dependiendo de la naturaleza del cambio:

| Tipo | Descripción | Ejemplo de Commit |
| :--- | :--- | :--- |
| **feat:** | Incorporación de una nueva funcionalidad al proyecto. | `git commit -m "feat: agregar endpoint para crear nueva orden"` |
| **fix:** | Resolución de un error o bug en el código. | `git commit -m "fix: corregir error de cálculo en el precio total del carrito"` |
| **docs:** | Modificación estricta de la documentación (README, Swagger, etc.). | `git commit -m "docs: agregar guía de convenciones de commit en el README"` |
| **style:** | Cambios de formato que no afectan la lógica del código. | `git commit -m "style: formatear archivo db.ts con prettier"` |
| **refactor:** | Reestructuración del código sin agregar funciones ni arreglar bugs. | `git commit -m "refactor: optimizar consulta SQL en el stored procedure de ordenes"` |
| **perf:** | Modificaciones de código para mejorar explícitamente el rendimiento. | `git commit -m "perf: agregar índice a la tabla usuarios para búsquedas más rápidas"` |
| **test:** | Agregado o corrección de pruebas unitarias/integración. | `git commit -m "test: agregar prueba unitaria para el middleware de jwt"` |
| **chore:** | Tareas rutinarias, configuración de dependencias o scripts de despliegue. | `git commit -m "chore: actualizar librería express a la última versión"` |

---

### Ejemplo de Flujo de Trabajo (Git Flow)

1. En la rama `develop`, crear una nueva rama aislando la funcionalidad: `git checkout -b feature/login-jwt`.
2. Realizar los cambios y guardarlos en el historial: `git commit -m "feat: implementar generación de token en login"`.
3. Al finalizar, enviar la rama al repositorio remoto y realizar la integración con `develop`.
4. Ante la detección de un error, aislar la corrección: `git checkout -b bugfix/login-invalido`.
5. Aplicar la solución y guardar: `git commit -m "fix: resolver error de validación de contraseña nula"`.