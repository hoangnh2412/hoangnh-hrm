# ADR-007 — Deployment: Docker Compose on-prem

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-22 | em (Minipower AI) | Draft |

## ADR-007 — Deployment: Docker Compose on-prem

| Mục | Giá trị |
|-----|---------|
| **Status** | Proposed — PENDING: chờ anh Hoàng xác nhận Docker Compose ok (Q4) |
| **Date** | 2026-08-22 |
| **Deciders** | anh Hoàng (SA) — chờ duyệt |
| **Consulted** | em (Minipower AI — soạn thảo) |
| **Informed** | — |

### Bối cảnh

- BRD xác định triển khai **on-prem tại ABC** (không cloud) — ngân sách D-003 chưa chốt.
- Team nhỏ, không có DevOps chuyên trách → vận hành phải đơn giản nhất có thể.
- Kiến trúc monolith (ADR-001): chỉ 1 app backend + 1 SPA static + DB.

### Quyết định (đề xuất)

- **Docker Compose** với 4 service:
  - `api` — ASP.NET Core (.NET 9)
  - `web` — nginx phục vụ SPA static
  - `db` — PostgreSQL 16 (theo ADR-002)
  - `proxy` — nginx reverse proxy, TLS terminate
- Backup DB bằng cron `pg_dump` ra volume mount ngoài container.

### Lý do

- 1 file `docker-compose.yml` mô tả toàn hệ thống → cài lại máy chủ mới trong vài phút, đúng năng lực team hiện có.
- Không cần Kubernetes/K3s — overkill cho 1 server on-prem.

### Các phương án đã xem xét

| Option | Pros | Cons |
|--------|------|------|
| A — Docker Compose *(đề xuất)* | Cài lại dễ · môi trường đồng nhất dev/prod | Máy chủ ABC phải cài được Docker Engine |
| B — IIS / Windows Service trực tiếp | Quen thuộc IT Windows | Cấu hình tay nhiều, khó tái lập môi trường |
| C — Kubernetes / K3s | Scale, self-healing | Overkill 1 server; chi phí học/vận hành cao |

### Hệ quả

**Tích cực:**
- Dev/prod cùng image; rollback = chạy lại image tag cũ; backup/restore quy trình rõ ràng.

**Tiêu cực / Đánh đổi:**
- Phụ thuộc Docker Engine hoạt động tốt trên hạ tầng ABC.

**Rủi ro:**
- Hạ tầng ABC có thể hạn chế Docker (chính sách IT nội bộ) → **verify trước go-live**; nếu bị chặn quay lại phương án B.
- D-003 chưa chốt → cấu hình tài nguyên server (RAM/CPU/disk) chỉ là giả định, ghi nợ.

### Tuân thủ & Tác động NFR

| NFR ID | Impact |
|--------|--------|
| EMP-NFR-004 | TLS bắt buộc ở proxy; port DB không expose ra ngoài host |

### Truy vết

| SRS / Integration | Ghi chú |
|-------------------|---------|
| BRD | Triển khai on-prem tại ABC |
| BRD D-003 | Ngân sách — cấu hình server ghi nợ |
| ADR-001, ADR-002 | Artifact deploy và DB tương ứng |
