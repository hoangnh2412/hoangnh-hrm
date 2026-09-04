# Memory — Architecture

**DOC đích:** 08–12 · **Skill:** `skills/architecture/SKILL.md` · **Tiên quyết:** DOC-06, 13 *(CHƯA đủ formally — ghi nợ, xem open-questions)*

## Trạng thái

| Mục | Giá trị |
|-----|---------|
| SAD / ADR | 7 ADR **Proposed** — chờ anh Hoàng chốt Q1–Q5 → flip Accepted |
| Integration map | — *(chưa làm — sau khi ADR Accepted)* |

## Tóm tắt (cập nhật tại đây)

- **2026-08-22:** Viết trọn bộ 7 ADR Draft v0.1 trong `docs/04-platform/DOC-09-adr/` theo quyết định MVP 2026-08-21 (skip DOC-13 NFR + DOC-19 prototype, ghi nợ). Readiness-gate: tiên quyết DOC-06/13 chưa đủ formally → nợ ghi tại `open-questions.md`.
- Kiến trúc tổng: Modular Monolith .NET 9 · EF Core 9 code-first · JWT role HR/QLTT/NV · Hangfire job nền · REST /api/v1 OpenAPI RFC 7807 · ReactJS 18 + TS + AntD 5 · Docker Compose on-prem.
- Chờ chốt Q1–Q5 (DB · module auth nền tảng · AntD vs MUI · Docker Compose ok · thứ tự code) → flip Accepted → scaffold code MVP.

## ADR / quyết định

| ID | Chủ đề | Trạng thái |
|----|--------|------------|
| ADR-001 | Modular Monolith .NET 9 (C-002) | Proposed |
| ADR-002 | PostgreSQL 16 mặc định / SQL Server + EF Core 9 | Proposed — pending Q1 |
| ADR-003 | JWT + role-based + module nền tảng auth | Proposed — pending Q2 |
| ADR-004 | Hangfire storage = DB chính, dashboard role HR | Proposed |
| ADR-005 | REST /api/v1 · OpenAPI Swashbuckle · RFC 7807 | Proposed |
| ADR-006 | ReactJS 18 + TS strict + Vite + AntD 5 | Proposed — pending Q3 |
| ADR-007 | Docker Compose api/web/db/proxy nginx TLS | Proposed — pending Q4 |

## Tham chiếu

| Loại | Link |
|------|------|
| Open questions | [`open-questions.md`](./open-questions.md) — Q1–Q5 + bảng nợ |
| Docs | [`docs/04-platform/DOC-09-adr/`](../../docs/04-platform/DOC-09-adr/) |

## Lịch sử ngắn

- **2026-08-22** — Viết 7 ADR Proposed (ADR-001…007). Ghi nợ: skip DOC-13/19, leave chưa DOC-06, employee DOC-06 chỉ Draft, D-002 stakeholder, D-003 ngân sách. Chờ chốt Q1–Q5.
