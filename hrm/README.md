# Hrm

Product HRM scaffold từ Jarvis (.NET 9) — **không dùng NuGet Jarvis**, chỉ `ProjectReference` / `file:` tới repo `jarvis/` cạnh workspace.

## Thành phần

| Thư mục | Vai trò | Build |
|---------|---------|-------|
| `backend/` | API 5 layer Clean Architecture | `dotnet build backend/Hrm.sln` |
| `frontend/` | SPA Vite + React + `@jarvis/core` | `npm run build` trong `frontend/` |
| `autotest/` | Playwright consumer `@jarvis/autotest` | `npm run build` trong `autotest/` |
| `unittest/` | xUnit Domain + Application | `dotnet build unittest/Hrm.Tests.sln` |

Jarvis root: `../jarvis` (frameworks, frontend kit, autotest engine).

## Chạy API

```bash
dotnet run --project backend/Hrm.Host
```

- Swagger: https://localhost:7006/swagger
- `GET /api/ping`
- `/health/live`

Frontend dev: `cd frontend && npm install && npm run dev` (proxy `/api` → `http://127.0.0.1:5167`).
