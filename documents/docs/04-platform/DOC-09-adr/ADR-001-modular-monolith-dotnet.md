# ADR-001 — Kiến trúc Modular Monolith trên .NET 9

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-22 | em (Minipower AI) | Draft |

## ADR-001 — Kiến trúc Modular Monolith trên .NET 9

| Mục | Giá trị |
|-----|---------|
| **Status** | Proposed |
| **Date** | 2026-08-22 |
| **Deciders** | anh Hoàng (SA) — chờ duyệt |
| **Consulted** | em (Minipower AI — soạn thảo) |
| **Informed** | — |

### Bối cảnh

- BRD xác định 8 module nghiệp vụ (employee, attendance, payroll, leave, onboarding, offboarding, report, alert) + quy mô 50–200 nhân viên.
- Ràng buộc C-002: backend .NET 9.
- Team nhỏ (anh Hoàng kiêm nhiều vai), triển khai on-prem, ngân sách D-003 chưa chốt.

### Quyết định (đề xuất)

- **Modular Monolith**: 1 solution .NET 9 duy nhất; mỗi module nghiệp vụ là 1 project/class-library riêng với ranh giới rõ (không tham chiếu chéo tuỳ tiện); giao tiếp nội bộ qua interface service.
- Không dùng microservices cho MVP.

### Lý do

- Quy mô 50–200 NV và team 1–2 dev: microservices phát sinh chi phí vận hành (service discovery, distributed transaction, observability) không tương xứng lợi ích.
- Ranh giới module giữ được khả năng tách service sau này nếu cần mà không phải trả chi phí từ ngày đầu.

### Các phương án đã xem xét

| Option | Pros | Cons |
|--------|------|------|
| A — Modular Monolith *(đề xuất)* | Deploy đơn giản · transaction nội bộ · refactor dễ | Cần kỷ luật giữ ranh giới module |
| B — Microservices | Scale độc lập · team độc lập | Overkill quy mô này; chi phí vận hành cao |
| C — Monolith N-tier không ranh giới module | Nhanh nhất lúc đầu | Code dính chùm, khó tách/scale sau này |

### Hệ quả

**Tích cực:**
- 1 artifact deploy duy nhất; debug/test end-to-end đơn giản; phù hợp Docker Compose (ADR-007).

**Tiêu cực / Đánh đổi:**
- Scale chỉ theo chiều dọc (đủ cho 50–200 NV).

**Rủi ro:**
- Ranh giới module bị phá dần nếu không review dependency theo hướng → quy ước: module chỉ được tham chiếu shared-kernel và interface của module khác.

### Tuân thủ & Tác động NFR

| NFR ID | Impact |
|--------|--------|
| EMP-NFR-001..005 | Đáp ứng ở quy mô 50–200 NV (DOC-13 hoãn) |

### Truy vết

| SRS / Integration | Ghi chú |
|-------------------|---------|
| BRD §13 | Danh sách 8 module nghiệp vụ |
| C-002 | Backend .NET 9 |
| ADR-002, ADR-007 | DB và deployment phụ thuộc kiến trúc này |
