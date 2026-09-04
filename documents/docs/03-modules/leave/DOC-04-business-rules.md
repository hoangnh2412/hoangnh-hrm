# DOC-04 — Quy tắc nghiệp vụ (Leave / Nghỉ phép)

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-21 | em (BA) | Draft — chốt Q1–Q12 |

**Tiêu chuẩn tham khảo:** Business Rules catalog · DOC-03 §8 (BR-004/005/006) · DOC-03 §12 (định nghĩa 24h giờ làm việc).
**MOD prefix:** `LVE`

---

## 1. Mục đích & phạm vi

Áp dụng cho module `leave` (nghỉ phép): tạo đơn, phê duyệt 2 cấp, quản lý quota phép năm, các loại nghỉ đặc biệt (thai sản, đăm ma, đăm cước, nghỉ không lương), cấu hình tham số. Nguồn: BRQ-002, BRQ-003 (DOC-03).

## 2. Danh mục quy tắc nghiệp vụ

| ID | Tên | Mô tả rule | Loại | Priority | Trace (UC/FR) | Owner |
|----|-----|------------|------|----------|---------------|-------|
| LVE-BR-001 | Loại đơn nghỉ hợp lệ | Hệ thống chấp nhận 5 loại: phép năm, thai sản, đăm ma, đăm cước, nghỉ không lương | Validation | Must | LVE-UC-001, LVE-FR-001 | BA, HR |
| LVE-BR-002 | Cấu hình quota phép năm | Quota = 12 ngày/năm DL; tích 1 ngày sau đủ 1 tháng làm việc chính thức; không cộng dồn; không quy đổi tiền | Calculation | Must | LVE-UC-001, LVE-UC-005, LVE-FR-002 | BA, HR |
| LVE-BR-003 | Nghỉ thai sản theo BHXH | Nghỉ thai sản (tối đa 6 tháng); **không trừ quota phép năm**; tính theo quy định BHXH | Validation | Must | LVE-UC-001, LVE-UC-002, LVE-FR-001 | BA, HR |
| LVE-BR-004 | Nghỉ đăm ma / đăm cước trừ phép | Đăm cước 3 ngày/lần (1 lần/năm); đăm ma 3 ngày/lần (không giới hạn lần); **trừ vào quota phép năm** | Calculation | Must | LVE-UC-001, LVE-FR-001 | BA, HR |
| LVE-BR-005 | Nghỉ nửa ngày | Chỉ áp dụng cho phép năm; quota tính = 0.5; không áp dụng thai sản/đăm ma/đăm cước/nghỉ không lương | Validation | Must | LVE-UC-001, LVE-FR-003 | BA |
| LVE-BR-006 | Phê duyệt 2 cấp + SLA | Quản lý trực tiếp duyệt cấp 1 → HR duyệt cấp 2; mỗi cấp ≤ 24h giờ làm việc | Authorization | Must | LVE-UC-002, LVE-FR-004 | BA, HR |
| LVE-BR-007 | Từ chối + đàm phán bên ngoài | Từ chối bắt buộc nhập lý do; NV có thể đàm phán bên ngoài hệ thống → HR chốt lại là reopen hoặc approve; hệ thống ghi log | Inference | Must | LVE-UC-002, LVE-UC-004, LVE-FR-004 | BA |
| LVE-BR-008 | Không xóa vật lý; hoàn quota | Không xóa đơn nghỉ; trạng thái hủy/đã duyệt/từ chối giữ lịch sử; hủy đơn → hoàn quota nếu đã trừ | Validation | Must | LVE-UC-001, LVE-UC-004, LVE-FR-005 | BA |

**Refinement ghi chú (Q5/Q7/Q11 — Hoàng chốt 2026-08-21):**
- DOC-03 §8 BR-004 ghi chung 'thai sản 6 tháng; đăm ma 3 ngày; đăm cước 3 ngày' — ở đây chi tiết: thai sản theo BHXH **không trừ quota**; đăm ma/đăm cước **trừ phép năm**.
- Q7 chốt: cổng chuyển thành draft → HR duyệt; **không có nhắc email** (MVP, tránh phụ thuộc SMTP).
- Q11 chốt: MVP **không có mobile** — toàn bộ logic web.

## 3. Chi tiết quy tắc (mẫu từng item)

### LVE-BR-001 — Loại đơn nghỉ hợp lệ

| Mục | Nội dung |
|-----|----------|
| **Statement** | Hệ thống CHỈ cho phép tạo đơn với 1 trong 5 loại: phép năm, thai sản, đăm ma, đăm cước, nghỉ không lương |
| **Condition** | loại đơn được chọn |
| **Action** | validate loại thuộc danh sách trên |
| **Exception** | UNLESS loại khác — bỏ qua |
| **Source** | BRQ-002, DOC-03 §4.1 |
| **Effective date** | go-live V1.0 |
| **Trace** | UC-001, FR-001, BRQ-002 |

### LVE-BR-002 — Cấu hình quota phép năm

| Mục | Nội dung |
|-----|----------|
| **Statement** | Quota phép năm = 12 ngày DL; cộng dần 1 ngày sau đủ 1 tháng làm việc chính thức; không cộng dồn tháng này sang tháng sau; không quy đổi giá trị bằng tiền |
| **Condition** | NV có thời gian làm việc chính thức ≥ 1 tháng tính đến cuối tháng |
| **Action** | cộng 1 ngày vào quota phép năm của tháng; kiểm tra quota còn lại trước khi trừ |
| **Exception** | UNLESS NV là thử việc — không tích |
| **Source** | DOC-03 §8 BR-004, A-004 |
| **Effective date** | go-live V1.0 |
| **Trace** | UC-001, UC-005, FR-002, BRQ-002 |

### LVE-BR-003 — Nghỉ thai sản theo BHXH

| Mục | Nội dung |
|-----|----------|
| **Statement** | Nghỉ thai sản tối đa 6 tháng theo quy định BHXH; **không trừ quota phép năm**; được hưởng nguyên lương |
| **Condition** | loại đơn = thai sản |
| **Action** | không cộng/trừ quota; kiểm tra tổng ngày đã dùng cho thai sản ≤ 6 tháng |
| **Exception** | UNLESS vượt 6 tháng — hệ thống báo lỗi |
| **Source** | DOC-03 §8 BR-004, Q5 (Hoàng 2026-08-21) |
| **Effective date** | go-live V1.0 |
| **Trace** | UC-001, UC-002, FR-001, BRQ-002 |

### LVE-BR-004 — Nghỉ đăm ma, đăm cước trừ phép

| Mục | Nội dung |
|-----|----------|
| **Statement** | Đăm cước tối đa 3 ngày/lần, 1 lần/năm; đăm ma tối đa 3 ngày/lần, không giới hạn lần; **trừ trực tiếp vào quota phép năm** |
| **Condition** | loại đơn = đăm cước hoặc đăm ma |
| **Action** | trừ số ngày tương ứng quota phép năm; ghi nhận loại đơn |
| **Exception** | UNLESS quota không đủ — báo lỗi, chặn tạo đơn |
| **Source** | DOC-03 §8 BR-004, Q5 (Hoàng), DEC-DIS-004 |
| **Effective date** | go-live V1.0 |
| **Trace** | UC-001, FR-001, BRQ-002 |

### LVE-BR-005 — Nghỉ nửa ngày

| Mục | Nội dung |
|-----|----------|
| **Statement** | Nghỉ nửa ngày (AM/PM) chỉ áp dụng cho phép năm; quota trừ 0.5 |
| **Condition** | loại đơn = phép năm, số ngày = 0.5 |
| **Action** | trừ 0.5 quota |
| **Exception** | UNLESS loại khác — từ chối yêu cầu nửa ngày |
| **Source** | Q6 (Hoàng) |
| **Effective date** | go-live V1.0 |
| **Trace** | UC-001, FR-003, BRQ-002 |

### LVE-BR-006 — Phê duyệt 2 cấp + SLA 24h

| Mục | Nội dung |
|-----|----------|
| **Statement** | Duyệt cấp 1 bởi quản lý trực tiếp → cấp 2 bởi HR; mỗi cấp phải hoàn thành trong 24h giờ làm việc |
| **Condition** | đơn ở trạng thái chờ duyệt cấp 1/cấp 2 |
| **Action** | gửi thông báo trong-app; khởi động timer 24h |
| **Exception** | UNLESS quá 24h — đánh dấu 'trễ', không tự động escalate (MVP) |
| **Source** | DOC-03 §8 BR-005, Q1/Q7 (Hoàng) |
| **Effective date** | go-live V1.0 |
| **Trace** | UC-002, FR-004, BRQ-003, BO-002 |

### LVE-BR-007 — Từ chối + đàm phán bên ngoài

| Mục | Nội dung |
|-----|----------|
| **Statement** | Từ chối bắt buộc nhập lý do; NV có thể đàm phán bên ngoài hệ thống → HR chốt lại là reopen hoặc approve; hệ thống ghi log toàn bộ hành động |
| **Condition** | HR từ chối hoặc reopen đơn |
| **Action** | lưu lý do từ chối; cho phép chuyển trạng thái; ghi audit log |
| **Exception** | UNLESS NV không đồng thuận cuối cùng — đơn ở lại trạng thái từ chối |
| **Source** | BRQ-003, Q9 (Hoàng) |
| **Effective date** | go-live V1.0 |
| **Trace** | UC-002, UC-004, FR-004 |

### LVE-BR-008 — Không xóa vật lý; hoàn quota

| Mục | Nội dung |
|-----|----------|
| **Statement** | Không xóa đơn nghỉ vật lý; trạng thái hủy/đã duyệt/từ chối giữ lịch sử; hủy đơn → hoàn quota nếu quota đã bị trừ |
| **Condition** | NV yêu cầu hủy; HR xác nhận hủy |
| **Action** | đặt trạng thái 'Đã hủy'; nếu quota đã trừ thì cộng lại |
| **Exception** | UNLESS đơn đã qua duyệt và lương đã chạm — ghi chú 'không hoàn quota' |
| **Source** | Q8/Q10 (Hoàng) |
| **Effective date** | go-live V1.0 |
| **Trace** | UC-001, UC-004, FR-005 |

## 4. Bảng quyết định (tùy chọn — rule phức tạp)

*(Chuyển vào DOC-06 SRS chi tiết trường hợp cần bảng quyết định — MVP chưa có rule phức tạp cần tách ra.)*

## 5. Nhật ký thay đổi

| Phiên bản | BR ID | Thay đổi | CR Ref |
|-----------|-------|----------|--------|
| 0.1 | LVE-BR-001…008 | Tạo ban đầu từ DOC-03 §8 + chốt Q1–Q12 | — |
