# ADR-004 — Background jobs: Hangfire

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-22 | em (Minipower AI) | Draft |

## ADR-004 — Background jobs: Hangfire

| Mục | Giá trị |
|-----|---------|
| **Status** | Proposed |
| **Date** | 2026-08-22 |
| **Deciders** | anh Hoàng (SA) — chờ duyệt |
| **Consulted** | em (Minipower AI — soạn thảo) |
| **Informed** | — |

### Bối cảnh

- EMP-FR-005 yêu cầu lifecycle tự chuyển: hết thời gian thử việc → chính thức; hợp đồng sắp hết hạn → cảnh báo.
- Nghỉ phép có SLA duyệt (QLTT phải phản hồi trong hạn) → cần job nhắc định kỳ.
- Ứng dụng .NET chạy on-prem trong 1 process (ADR-001); cần scheduler persistent, không mất job khi restart.

### Quyết định (đề xuất)

- **Hangfire** làm background job scheduler; storage dùng luôn DB chính (PostgreSQL/SQL Server theo ADR-002).
- Dashboard Hangfire bật nhưng bảo vệ bởi role HR (ADR-003).

### Lý do

- Cùng stack .NET, cấu hình vài dòng; job lưu DB nên sống qua restart; retry tự động built-in.
- Bản open source đủ nhu cầu MVP (dashboard + recurring jobs).

### Các phương án đã xem xét

| Option | Pros | Cons |
|--------|------|------|
| A — Hangfire *(đề xuất)* | Persistent · retry · dashboard sẵn | Thêm schema Hangfire vào DB chính |
| B — Quartz.NET | Scheduler mạnh, cron linh hoạt | Không có dashboard/persistence sẵn — phải tự dựng thêm |
| C — IHostedService tự viết | Không thêm dependency | Phải tự lo persistence, retry, idempotency — rủi ro bug |

### Hệ quả

**Tích cực:**
- Lifecycle employee và reminder leave chạy đúng giờ không cần can thiệp; quan sát được qua dashboard.

**Tiêu cực / Đánh đổi:**
- DB chính chịu thêm tải job nhỏ (chấp nhận ở quy mô 50–200 NV).

**Rủi ro:**
- Downtime dài → job miss: cấu hình recurring job catch-up + retry; kiểm tra dashboard sau mỗi lần deploy.

### Tuân thủ & Tác động NFR

| NFR ID | Impact |
|--------|--------|
| EMP-NFR-002 | Độ tin cậy: job retry, không mất tác vụ khi restart |

### Truy vết

| SRS / Integration | Ghi chú |
|-------------------|---------|
| EMP-FR-005 | Lifecycle tự chuyển nhân viên |
| Leave SLA reminder | Job nhắc QLTT duyệt đơn trễ hạn |
| ADR-002 | Storage job = DB chính |
