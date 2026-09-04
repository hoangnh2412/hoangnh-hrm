# ADR-003 — Authentication & Authorization: JWT + Role-based

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-22 | em (Minipower AI) | Draft |

## ADR-003 — Authentication & Authorization: JWT + Role-based

| Mục | Giá trị |
|-----|---------|
| **Status** | Proposed — PENDING: chờ anh Hoàng chấp nhận module nền tảng auth ngoài 8 module nghiệp vụ (Q2) |
| **Date** | 2026-08-22 |
| **Deciders** | anh Hoàng (SA) — chờ duyệt |
| **Consulted** | em (Minipower AI — soạn thảo) |
| **Informed** | — |

### Bối cảnh

- HRM có 3 vai trò sử dụng chính trong các UC: **HR** (quản trị toàn hệ thống), **QLTT** (duyệt nghỉ phép/chấm công của phòng mình), **NV** (tự phục vụ).
- SPA frontend (ADR-006) gọi REST API (ADR-005) → cần cơ chế auth phù hợp kiến trúc stateless.
- Triển khai on-prem; MVP chưa có yêu cầu SSO/LDAP từ BRD.

### Quyết định (đề xuất)

- **JWT** (access token ngắn hạn + refresh token) cho authentication.
- **Role-based authorization** với 3 role: HR / QLTT / NV; policy check ở API layer.
- Tạo **module nền tảng `auth`** tách khỏi 8 module nghiệp vụ (chờ Q2).

### Lý do

- JWT stateless khớp SPA + API, không cần session store.
- 3 role cố định là đủ cho MVP; permission granular per-feature để dành khi có yêu cầu thật.

### Các phương án đã xem xét

| Option | Pros | Cons |
|--------|------|------|
| A — JWT + role-based *(đề xuất)* | Stateless · đơn giản · đủ 3 role | Revocation cần refresh-token store hoặc expiry ngắn |
| B — Session cookie server-side | Revoke dễ | Phức tạp với SPA cross-origin, cần sticky/session store |
| C — Identity provider ngoài (Keycloak) | Chuẩn OIDC, SSO sẵn | Thêm 1 hệ thống phải vận hành on-prem — quá nặng MVP |

### Hệ quả

**Tích cực:**
- Module auth đóng gói login/token/role; các module nghiệp vụ chỉ đọc claim hiện hành.

**Tiêu cực / Đánh đổi:**
- Đăng xuất tức thì khó tuyệt đối với JWT thuần → dùng access token ngắn hạn (15 phút) + refresh token có revoke.

**Rủi ro:**
- Nếu khách yêu cầu SSO/AD/LDAP sau này → supersede bằng ADR mới; thiết kế auth qua abstraction để thay thế.

### Tuân thủ & Tác động NFR

| NFR ID | Impact |
|--------|--------|
| EMP-NFR-004 | Bảo mật: hash password (BCrypt), HTTPS bắt buộc, token expiry |

### Truy vết

| SRS / Integration | Ghi chú |
|-------------------|---------|
| UC employee/leave | Actor HR / QLTT / NV — mapping role |
| ADR-005, ADR-006 | Token truyền qua header Authorization từ SPA |
