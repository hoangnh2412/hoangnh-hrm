# Decision Log — Requirements

> Quyết định **có phương án bị loại** (lưu "tại sao"). Schema đầy đủ: minipower pack `docs/decision-log.md`.
> **ID:** `DEC-REQ-NNN` · Không xóa entry cũ — dùng `superseded-by`.

### DEC-REQ-001 — Trường bắt buộc hồ sơ: thêm vị trí + mức lương chính thức · [2026-09-05]
- Status: accepted
- Context: EMP-BR-002 chỉ bắt họ tên, ngày sinh, CCCD, giới tính — thiếu dữ liệu vị trí và lương để vận hành HR/payroll.
- Options: A giữ 4 trường / B thêm vị trí công việc + mức lương chính thức
- Decision: B
- Why (loại A vì): hồ sơ không đủ để xếp vị trí thử việc/cấu hình và không có mức lương chính thức trên master data.
- Consequences: tạo/sửa/import phải đủ 6 trường; mẫu roster 11 cột. DOC-05/06 **đã đồng bộ 2026-09-05**.
- Affects: module employee · DOC-04 v0.2 · import roster
- Trace: DOC-04 EMP-BR-002 · EMP-UC-001/003 · BRQ-001
- Confidence: cao

### DEC-REQ-002 — Review thử việc do HR chốt, không job tự chuyển Chính thức · [2026-09-05]
- Status: accepted
- Context: EMP-FR-005/UC-005 mô tả job tự Thử việc → Chính thức; thực tế cần đánh giá QLTT và HR chốt.
- Options: A job tự chuyển khi đến hạn / B hệ thống chỉ báo đến kỳ; HR báo QLTT; QLTT đánh giá; HR upload kết quả + chuyển Chính thức; cập nhật quá trình làm việc cho lương tháng sau
- Decision: B
- Why (loại A vì): tự chuyển bỏ qua đánh giá và không gắn kết quả thử việc vào lương kỳ sau.
- Consequences: MVP không bắt buộc màn hình QLTT đánh giá trên hệ thống (HR báo QLTT = SOP). DOC-04 BR-005, DOC-05 UC-005, DOC-06 FR-005, DOC-07 AC-005 **đã đồng bộ 2026-09-05**. Cảnh báo có thể trùng module alert.
- Affects: module employee · EMP-AC-005 · payroll (đọc quá trình làm việc)
- Trace: DOC-07 EMP-AC-005 · EMP-FR-005 · EMP-UC-005 · EMP-BR-005
- Confidence: cao

<!--
### DEC-REQ-001 — <tiêu đề> · [YYYY-MM-DD]
- Status: proposed | accepted | superseded-by DEC-xxx
- Context: …
- Options: A … / B … / C …
- Decision: chọn X
- Why (loại B, C vì): …
- Consequences: …
- Affects: <module/hệ thống> · <task/CR> · <release>
- Trace: DOC-XX · {MOD}-FR-xxx · ADR-xxx
- Confidence: cao | vừa | thấp
-->
