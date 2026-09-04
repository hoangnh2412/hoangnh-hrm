# ADR-002 — Database quan hệ + EF Core

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-22 | em (Minipower AI) | Draft |

## ADR-002 — Database quan hệ + EF Core

| Mục | Giá trị |
|-----|---------|
| **Status** | Proposed — PENDING: chờ anh Hoàng chốt PostgreSQL hay SQL Server (Q1) |
| **Date** | 2026-08-22 |
| **Deciders** | anh Hoàng (SA) — chờ duyệt |
| **Consulted** | em (Minipower AI — soạn thảo) |
| **Informed** | — |

### Bối cảnh

- Dữ liệu HRM quan hệ mạnh (nhân sự – phòng ban – hợp đồng – chấm công – nghỉ phép); nghiệp vụ lương/chấm công cần transaction ACID.
- Triển khai on-prem; ngân sách D-003 chưa chốt → chi phí license DB là yếu tố quyết định.
- ORM mặc định hệ sinh thái .NET là EF Core 9 (code-first migration).

### Quyết định (đề xuất)

- Database quan hệ: **PostgreSQL 16** (phương án mặc định đề xuất) hoặc **SQL Server** nếu anh Hoàng muốn tận dụng license sẵn có / quen thuộc hơn — chốt tại câu hỏi Q1.
- Data access: **EF Core 9**, code-first, migration versioning trong repo.

### Lý do

- PostgreSQL: miễn phí license, EF Core hỗ trợ đầy đủ qua Npgsql, phù hợp khi ngân sách chưa chốt.
- SQL Server: quen thuộc hệ sinh thái .NET, tooling mạnh, nhưng phát sinh chi phí license (bản Express giới hạn 10GB/DB).

### Các phương án đã xem xét

| Option | Pros | Cons |
|--------|------|------|
| A — PostgreSQL 16 + EF Core 9 *(đề xuất)* | Miễn phí license · ACID · Npgsql ổn định | Team có thể chưa quen vận hành |
| B — SQL Server + EF Core 9 | Quen thuộc .NET · SSMS/tooling mạnh | Chi phí license — D-003 chưa chốt |
| C — MySQL/MariaDB | Miễn phí | Hệ sinh thái .NET yếu hơn, không ưu thế hơn A |

### Hệ quả

**Tích cực:**
- Schema versioning qua migration; backup/restore chuẩn RDBMS.

**Tiêu cực / Đánh đổi:**
- Đổi DB sau khi có dữ liệu thật rất tốn kém → phải chốt trước khi scaffold code.

**Rủi ro:**
- Nếu khách bắt buộc dùng DB sẵn có của họ → supersede bằng ADR mới trước khi viết DOC-11.

### Tuân thủ & Tác động NFR

| NFR ID | Impact |
|--------|--------|
| EMP-NFR-001..005 | Đủ hiệu năng truy vấn báo cáo ở quy mô 50–200 NV (DOC-13 hoãn) |

### Truy vết

| SRS / Integration | Ghi chú |
|-------------------|---------|
| EMP-FR-001..006 | Lưu trữ hồ sơ, audit log, lifecycle |
| DOC-11 | Data model — viết sau khi chốt DB |
| BRD D-003 | Ngân sách — đầu vào quyết định license |
