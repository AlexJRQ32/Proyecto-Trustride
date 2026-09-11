# PROD-READINESS — Proyecto-Trustride

> Auditoría de producción basada en evidencia real del repositorio local
> (`C:\Users\roble\OneDrive\Documentos\Portafolio\Proyecto-Trustride`).
> Todo lo que no se pudo verificar contra código real dice **"no verificado"**.

## Resumen del proyecto (4 secciones mágicas)

- **Qué es (según README)**: App para contratar paseadores de mascotas; ideal para dueños sin tiempo. Responsive web, con plan de escalar a móvil. *Verificado en `README.md`.*
- **Stack planeado (según README)**: SQL Server + .NET Core Web API + React/Vite; deploy DB/backend en Somee (luego por definir), frontend en Vercel, dominio por definir. *Verificado en `README.md`.*
- **Estado del repo local**: **El repositorio NO contiene código.** Solo hay `README.md` y la carpeta `.git`. La rama `Prod` tiene un único commit y solo trackea `README.md`. *Verificado: `git ls-tree -r HEAD` → solo `README.md`; `git branch -a` → `Prod` / `origin/Prod`.*
- **Riesgo mayor**: No hay nada que clonar-y-correr. El código de la app (el mono-repo real) no está en este checkout local; el README describe intención, no implementación.

---

## Estado actual (qué funciona)

- ✅ Existe el repositorio git inicializado, con rama `Prod` y remoto `origin` (apunta a `origin/Prod`).
- ✅ `README.md` documenta descripción, stack y arquitectura planeada (modular por features).
- ❌ **Ningún archivo de código fuente** (ni `.sln`, ni `.csproj`, ni `package.json`, ni `src/`, ni controladores, ni migraciones).
- ❌ **No compila, no build, no corre** — no hay entry points.
- ⚠️ No verificado: existencia de CI, Dockerfile, tests, secretos o configuración real (no hay archivos que lo permitan).

---

## Qué falta para producción (tabla priorizada)

| Prioridad | Item | Por qué importa | Archivo / dónde arreglarlo |
|-----------|------|----------------|----------------------------|
| **P0** | Subir el código fuente real al repo | El checkout local solo tiene README; no hay app que desplegar | Clonar/recuperar el mono-repo desde `github.com/AlexJRQ32/Proyecto-Trustride` y commitear `backend/` + `frontend/` |
| **P0** | Crear solución backend (.NET) | Sin `.sln`/`.csproj` no hay build | `backend/ProyectoTrustride.sln` + `*.csproj` (Web API) |
| **P0** | Crear proyecto frontend (React+Vite) | Sin `package.json` no hay `npm run dev`/`build` | `frontend/package.json`, `vite.config.js`, `index.html`, `src/` |
| **P0** | Definir BD y migraciones | README dice SQL Server pero no hay esquema | `backend/.../DbContext` + EF migrations o scripts SQL |
| **P1** | Variables de entorno / secrets | No hay `.env.example` ni `appsettings` | Crear `frontend/.env.example` y `backend/appsettings.json` + `.env.example` |
| **P1** | Configurar CI/CD | README no define pipeline; deploy "por definir" | `azure-pipelines.yml` o `.github/workflows` |
| **P1** | Definir host de producción | README: Somee "inicialmente, luego por definir" + Vercel frontend | Decidir y documentar en README |
| **P2** | Dockerfile / docker-compose | Facilitaría "2 comandos" para reclutador | `Dockerfile` + `docker-compose.yml` |
| **P2** | Tests | No verificado (no hay proyecto de tests) | `backend/tests`, `frontend/vitest` |

---

## Variables de entorno y secretos

| Nombre | Uso | Dónde hoy | Estado |
|--------|-----|-----------|--------|
| (ninguna definida) | — | No existe ningún `.env`, `appsettings`, ni secretos en el repo | 🔴 No hay configuración; **no verificado** qué necesitará la app real |

> El README menciona SQL Server, .NET Core Web API y React/Vite, pero **no especifica variables de entorno ni secretos**. Hasta que exista el código, no se puede auditar esto.

---

## Plan de deployment paso a paso (PROD)

> ⚠️ **No aplicable hoy**: no hay código en el repo. El plan asume recuperar el mono-repo real.

```bash
# PASO PREVIO (faltante): traer el código real al repo local
git clone https://github.com/AlexJRQ32/Proyecto-Trustride.git
# (el checkout actual solo trae README; verificar qué rama tiene el código)

# Backend (.NET Core Web API) — no verificado, pendiente de código
cd backend
dotnet restore
dotnet build -c Release
dotnet ef database update        # aplicar esquema SQL Server
dotnet run --urls https://localhost:5001

# Frontend (React + Vite) — no verificado, pendiente de código
cd ../frontend
npm install
npm run dev                       # http://localhost:5173
npm run build                    # -> dist/ para Vercel
```

### Destinos según README
- **Frontend**: Vercel (`vercel deploy --prod`).
- **Backend + DB**: Somee inicialmente, luego "por definir".
- **Dominio**: por definir.

---

## Riesgos de seguridad encontrados

1. 🟡 **No hay secretos commiteados** (no los hay porque no hay código) — pero el README deja "Deployment DB y Backend: Somee inicialmente, luego queda por definir" y "Dominio: (Por definir)", lo que indica que la arquitectura de despliegue aún no está decidida. *Verificado en `README.md`.*
2. 🟠 **Repositorio sin código = nada que auditar ni proteger**, pero tampoco nada que un reclutador pueda evaluar. Riesgo de entrega/portafolio, no de seguridad per se.
3. 🟡 **No verificado**: HTTPS, CORS, auth, logging, secret management — no existen archivos para confirmar.

---

## Blockers para que un reclutador clone y corra con 2 comandos

- 🔴 **El repo local no contiene la aplicación** — solo `README.md`. Un reclutador que clone este checkout no encontrará nada que ejecutar.
- 🔴 Falta decisión de host de producción (Somee "por definir", dominio "por definir").
- 🟠 No hay `.env.example`, `Dockerfile`, ni CI que guíen el arranque.
- 🟠 El código real parece vivir en `github.com/AlexJRQ32/Proyecto-Trustride` (según indicó el usuario) pero **no está en este directorio local** — debe confirmarse y sincronizarse antes de cualquier auditoría o deploy.
