# ADR Index — DOC-09

Bộ quyết định kiến trúc HRM ABC · phiên bản 0.1 Draft · ngày 2026-08-22 · tác giả em (Minipower AI) · deciders anh Hoàng (SA) — chờ duyệt.

## Danh sách ADR

| ADR ID | Chủ đề | Status | File |
|--------|--------|--------|------|
| ADR-001 | Modular Monolith .NET 9 (theo C-002) | Proposed | [ADR-001-modular-monolith-dotnet.md](./ADR-001-modular-monolith-dotnet.md) |
| ADR-002 | Database: PostgreSQL 16 mặc định / SQL Server + EF Core 9 code-first | Proposed — pending Q1 | [ADR-002-database.md](./ADR-002-database.md) |
| ADR-003 | AuthN/AuthZ: JWT + role-based (HR/QLTT/NV) + module nền tảng auth | Proposed — pending Q2 | [ADR-003-authentication-authorization.md](./ADR-003-authentication-authorization.md) |
| ADR-004 | Background jobs: Hangfire, storage = DB chính, dashboard bảo vệ role HR | Proposed | [ADR-004-background-jobs-hangfire.md](./ADR-004-background-jobs-hangfire.md) |
| ADR-005 | API: REST /api/v1 · OpenAPI Swashbuckle · lỗi RFC 7807 problem+json | Proposed | [ADR-005-rest-api-openapi.md](./ADR-005-rest-api-openapi.md) |
| ADR-006 | Frontend: ReactJS 18 + TypeScript strict + Vite + AntD 5 + TanStack Query | Proposed — pending Q3 | [ADR-006-frontend-stack.md](./ADR-006-frontend-stack.md) |
| ADR-007 | Deployment: Docker Compose api/web/db/proxy nginx TLS + backup cron pg_dump | Proposed — pending Q4 | [ADR-007-deployment-docker-compose.md](./ADR-007-deployment-docker-compose.md) |

## Quy tắc quản lý

- **Flip Proposed → Accepted** chỉ khi anh Hoàng chốt câu hỏi tương ứng (Q1–Q5, xem `memory/architecture/open-questions.md`). ADR không có pending (001, 004, 005) flip cùng đợt.
- ADR đã Accepted là **bất biến**: không sửa nội dung. Đổi lớn → viết ADR mới đánh dấu supersede ADR cũ.
- Khung mỗi file theo [template DOC-09](../../../../.claude/skills/minipower/templates/DOC-09-adr.md).
