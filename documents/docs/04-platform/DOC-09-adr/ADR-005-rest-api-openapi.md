# ADR-005 — API: REST JSON `/api/v1` + OpenAPI

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-22 | em (Minipower AI) | Draft |

## ADR-005 — API: REST JSON `/api/v1` + OpenAPI

| Mục | Giá trị |
|-----|---------|
| **Status** | Proposed |
| **Date** | 2026-08-22 |
| **Deciders** | anh Hoàng (SA) — chờ duyệt |
| **Consulted** | em (Minipower AI — soạn thảo) |
| **Informed** | — |

### Bối cảnh

- SPA React (ADR-006) là client duy nhất của backend; cần contract rõ ràng để viết DOC-11 (API spec) và để dev/test nhanh.
- Backend ASP.NET Core có tooling sinh OpenAPI native (Swashbuckle).

### Quyết định (đề xuất)

- REST JSON, mọi endpoint đặt dưới prefix **`/api/v1`**.
- **Swashbuckle** sinh OpenAPI document + Swagger UI (bật chỉ môi trường dev).
- Error format thống nhất theo **RFC 7807 problem+json** (đề xuất mặc định của ASP.NET Core).

### Lý do

- REST + OpenAPI là chuẩn phổ biến nhất cho CRUD admin app; Swagger UI giúp test thủ công không cần Postman setup.
- Versioning bằng path (`v1`) đơn giản, đủ cho MVP; nâng cấp breaking change sau này → `v2` song song.

### Các phương án đã xem xét

| Option | Pros | Cons |
|--------|------|------|
| A — REST + OpenAPI *(đề xuất)* | Chuẩn phổ biến · tooling native · dễ hire dev | Thiếu contract type-safe lúc build (dùng codegen bù) |
| B — gRPC | Type-safe, hiệu năng cao | Overkill nội bộ 1 SPA; debug khó hơn |
| C — GraphQL | Flexible query | Phức tạp caching/auth; không cần cho CRUD thuần |

### Hệ quả

**Tích cực:**
- Contract API sinh từ code luôn khớp thực tế → nguồn đầu vào trực tiếp cho DOC-11.

**Tiêu cực / Đánh đổi:**
- Phải kỷ luật không đổi shape response v1; thêm field mới ok, đổi/xóa phải lên version.

**Rủi ro:**
- Swagger UI lộ endpoint nếu bật nhầm ở production → cấu hình env guard.

### Tuân thủ & Tác động NFR

| NFR ID | Impact |
|--------|--------|
| EMP-NFR-001 | Response time chuẩn REST pagination/filter ở quy mô 50–200 NV |

### Truy vết

| SRS / Integration | Ghi chú |
|-------------------|---------|
| EMP-FR-001..006 | Mỗi FR ánh xạ ≥ 1 endpoint trong DOC-11 |
| DOC-11 | API spec — viết sau khi ADR Accepted |
| ADR-003 | Authorization header JWT trên mọi request |
