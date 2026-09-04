# Memory — Requirements

**DOC đích:** 04–07, 13 · **Skill:** `skills/requirements/SKILL.md` · **Tiên quyết:** DOC-03

## Trạng thái

| Mục | Giá trị |
|-----|---------|
| Module đang làm | employee (DOC-07 Draft 2026-09-05 · 04–06 Draft · skip DOC-13/19) |
| FR baseline | employee: DOC-06 Draft (EMP-FR-001…006) · leave: placeholder chờ DOC-06 |

## Tóm tắt (cập nhật tại đây)

**employee (EMP, draft 2026-08-21 / BR-002 cập nhật 2026-09-05):** DOC-04 8 BR (mã NV tự sinh · **6 trường bắt buộc**: họ tên, ngày sinh, CCCD, giới tính, vị trí, mức lương chính thức — DEC-REQ-001 · thử việc cấu hình 60 ngày · quản lý không bắt buộc · ngày vào không bắt buộc · tạo đơn chọn quản lý thủ công · import roster 11 cột · không xóa vật lý/ chỉ khóa). DOC-05 4 actor (HR primary, QLTT/NV secondary, SYS) + 5 UC Fully Dressed (UC-001…005). DOC-06 vừa xong 6 FR trace UC/BR (Tạo/Sửa/Import/Xem/Lifecycle/Nghỉ-việc/Khóa), bypass prototype. NFR: load < 2s, phân quyền vai trò, audit log bắt buộc, mã NV duy nhất. Quyết định MVP 2026-08-21: **skip DOC-13 NFR + DOC-19 prototype** trên cả employee và leave (ghi nợ — xem `memory/architecture/open-questions.md`). Cổng tiếp: DOC-07 AC employee → kiến trúc (7 ADR Proposed chờ chốt Q1–Q5).

## Module

| Module ID | Folder `docs/03-modules/` | Ghi chú |
|-----------|---------------------------|---------|
| employee | `docs/03-modules/employee/` | DOC-04 v0.3 · 05 v0.2 · 06 v0.2 · 07 v0.2 Draft · DEC-REQ-001/002 |
| leave | `docs/03-modules/leave/` | DOC-04/05 Draft · chờ DOC-06 |
| attendance | `docs/03-modules/attendance/` | Khung README 2026-09-05 |
| payroll | `docs/03-modules/payroll/` | Khung README 2026-09-05 |
| alert | `docs/03-modules/alert/` | Khung README 2026-09-05 |
| onboarding | `docs/03-modules/onboarding/` | Khung README 2026-09-05 · sau EMP |
| offboarding | `docs/03-modules/offboarding/` | Khung README 2026-09-05 |
| report | `docs/03-modules/report/` | Khung README 2026-09-05 |

## Lịch sử ngắn

- **2026-08-08** — Mở module employee. Chốt 5 quyết định (mã NV tự sinh · 4 trường bắt buộc · thử việc 60 ngày cấu hình · quản lý trực tiếp không bắt buộc · không xóa vật lý). Viết DOC-04 (8 BR: EMP-BR-001…008). Bổ sung: tạo đơn nghỉ bắt buộc chọn quản lý trực tiếp (EMP-BR-003) · chốt mẫu import roster 10 cột (EMP-BR-006).
- **2026-08-21** — Viết DOC-05 employee draft v0.1 (4 actor: ACT-HR/QLTT/NV/SYS · 5 UC: EMP-UC-001…005). Chốt 3 quyết định: ① actor list gồm ACT-SYS, không thêm Admin; ② Khóa hồ sơ thuộc EMP-UC-005 (lifecycle), UC-002 thuần cập nhật dữ liệu; ③ tìm kiếm/lọc danh sách NV gộp vào EMP-UC-004, không tách UC. Trace FR để placeholder chờ DOC-06.
- **2026-08-21** — Chốt cách làm DOC-19: anh Hoàng **tự vẽ prototype bằng code** (sau); AI không sinh wireframe. Cổng A2 chờ anh Hoàng duyệt prototype xong mới viết DOC-06 SRS.
- **2026-08-21** — Viết DOC-04 (8 BR: LVE-BR-001…008) + DOC-05 (4 actor tái dùng employee, 5 UC Fully Dressed: LVE-UC-001…005) cho module leave. Chốt Q1–Q12: SLA 24h theo giờ làm (8h/ngày T2–T6 trừ lễ), thử việc không tích phép, thiếu ngày vào làm không tích, có nghỉ không lương, thai sản 6 tháng theo BHXH không trừ quota + đăm ma/đăm cước trừ phép, nửa ngày quota 0.5, trên App không email, NV hủy đơn chờ / HR hủy đơn đã duyệt + hoàn quota, từ chối kèm lý do + đàm phán bên ngoài hệ thống, trừ quota khi duyệt cấp 2. MVP **không có mobile**. Chuyển sang cổng A2 (draft → HR duyệt) — chờ anh Hoàng duyệt mới sinh prototype DOC-19 → viết DOC-06 SRS.
- **2026-08-21** — Viết DOC-06 SRS employee draft (6 FR: EMP-FR-001…006) trace UC-001…005 + BR-001…008; cổng A2 **bypass prototype** theo quyết định anh Hoàng → chuyển thẳng DOC-06. Cập nhật README employee: DOC-06 Draft. Cổng A2 tiếp theo: DOC-13 NFR → DOC-07 AC → DOC-16 test.
- **2026-08-22** — Quyết định MVP: **skip DOC-13 NFR + DOC-19 prototype** cả employee lẫn leave (ghi nợ tại `memory/architecture/open-questions.md`). Chuyển sang phase architecture: viết trọn bộ 7 ADR Proposed (ADR-001…007) trong `docs/04-platform/DOC-09-adr/` — chờ anh Hoàng chốt Q1–Q5 để flip Accepted rồi scaffold code.

## Tham chiếu

| Loại | Link |
|------|------|
| Brainstorm | *(link)* |
| Docs | [`docs/03-modules/`](../../docs/03-modules/) · [`DOC-13`](../../docs/04-platform/) |
