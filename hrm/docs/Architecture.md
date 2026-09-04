# Kiến trúc — Hrm

## Layers (backend)

| Project | Trách nhiệm |
|---|---|
| Domain.Shared | Enum, constant shared |
| Domain | Entity, repository interface, domain events |
| Application | Command/query, handler, DTO |
| Infrastructure | EF Core, repository implementation, adapters |
| Host | Composition root, controllers, middleware |

## Jarvis (ProjectReference, không NuGet)

| Layer | Path |
|-------|------|
| Application | `jarvis/frameworks/Jarvis.DDD.Application*` |
| Infrastructure | `Jarvis.Caching` → `Jarvis.ORM.EntityFramework`, `Jarvis.BlobStoring` |
| Host | Mvc, Auth, Multitenancy, Swashbuckle, HealthChecks, OTEL |

Frontend: `@jarvis/core` = `file:../../jarvis/frameworks/frontend`.

Autotest: `@jarvis/autotest` = `file:../../jarvis/autotest/core`.

## DI

- `Host.AddHostLayer()` → Application + Infrastructure
- `Infrastructure.AddInfrastructureLayer()` → Domain + `AddJarvisCaching()` trước `AddEntityFramework()`
