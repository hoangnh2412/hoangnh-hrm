# DOC-05 — Kịch bản sử dụng (Leave / Nghỉ phép)

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-21 | em (BA) | Draft — chốt Q1–Q12 |

**Tiêu chuẩn tham khảo:** UML Use Case; Cockburn (Fully Dressed). Nguồn: BRQ-002, BRQ-003 (DOC-03).
**MOD prefix:** `LVE`

---

## 1. Danh mục tác nhân

| Actor ID | Tên | Mô tả | Loại |
|----------|-----|-------|------|
| ACT-NV | Nhân viên | Tạo/xem/hủy đơn nghỉ; kiểm tra quota; thấy lý do bị từ chối | Primary |
| ACT-QLTT | Quản lý trực tiếp | Xem đơn dưới quyền; duyệt hoặc từ chối cấp 1 (<=24h) | Primary |
| ACT-HR | HR | Duyệt cấp 2 (<=24h); cấu hình loại nghỉ + quota; hủy đơn đã duyệt; chốt đàm phán | Primary |
| ACT-SYS | Hệ thống | Tính quota, timer SLA 24h, nhắn trong-app, ghi audit log | System |

## 2. Danh sách use case

| UC ID | Tên | Actor chính | Priority | Trace (BRQ/FR) |
|-------|-----|-------------|----------|----------------|
| LVE-UC-001 | Tạo đơn nghỉ phép | ACT-NV | Must | BRQ-002, LVE-BR-001…005, LVE-BR-008 |
| LVE-UC-002 | Phê duyệt nghỉ 2 cấp | ACT-QLTT, ACT-HR | Must | BRQ-003, LVE-BR-006, LVE-BR-007 |
| LVE-UC-003 | Xem danh sách đơn + quota | ACT-NV, ACT-QLTT, ACT-HR | Must | BRQ-002 |
| LVE-UC-004 | Hủy / rút / đàm phán đơn | ACT-NV, ACT-HR | Must | LVE-BR-007, LVE-BR-008 |
| LVE-UC-005 | Cấu hình nghỉ + quota | ACT-HR | Must | BRQ-002, LVE-BR-002 |

## 3. Sơ đồ use case (tùy chọn)

```text
[ACT-NV] --> (LVE-UC-001 Tạo đơn)
              |
              +--> (LVE-UC-003 Xem đơn + quota)
              +--> (LVE-UC-004 Hủy/rút)
                     |
                     +--> (LVE-UC-002 Phê duyệt 2 cấp)
                            |
                            +- ACT-QLTT cấp 1 (<=24h)
                            +- ACT-HR  cấp 2 (<=24h)
[ACT-HR] --> (LVE-UC-005 Cấu hình quota)
```

## 4. Đặc tả use case (Fully Dressed)

### LVE-UC-001 — Tạo đơn nghỉ phép

| Mục | Nội dung |
|-----|----------|
| **ID** | LVE-UC-001 |
| **Tên** | Nghỉ phép |
| **Actor chính** | ACT-NV |
| **Actor phụ** | ACT-SYS (validate quota/SLA) |
| **Mục tiêu** | NV tạo đơn (loại/ngày/AM-PM/lý do); hệ thống kiểm tra quota & điều kiện → đưa đơn phê duyệt 2 cấp |
| **Preconditions** | NV đã đăng nhập; NV có TG làm việc chính thức >= 1 tháng |
| **Postconditions (success)** | Đơn tạo, trạng thái Chờ duyệt cấp 1; quota trừ khi duyệt (chưa trừ ở bước tạo) |
| **Postconditions (failure)** | Báo lỗi, đơn không tạo |
| **Trigger** | NV chon menu 'Nghỉ phép' -> 'Taoj đơn mới' |
| **Frequency** | Hàng tháng/ngày theo nhu cầu |

**Luồng chính (Basic Path):**

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | ACT-NV | Chọn menu Nghỉ phép, chọn Tạo đơn mới |
| 2 | ACT-SYS | Hiển thị form: loại đơn, ngày bd, ngày kt, AM/PM (nửa ngày), lý do, đính kèm (tùy chọn) |
| 3 | ACT-NV | Điền form chọn loại (phép năm / thai sản / đăm ma / đăm cước / không lương); nếu nửa ngày bật AM/PM |
| 4 | ACT-SYS | BR-001 validate loại; BR-005 nếu nửa ngày bắt buộc phải là phép năm |
| 5 | ACT-SYS | BR-002 kiểm tra quota: nếu trừ thiếu quota -> thông báo lỗi |
| 6 | ACT-NV | Nhấn 'Gửi duyệt' |
| 7 | ACT-SYS | Tạo đơn trạng thái Chờ duyệt cấp 1; thông báo ACT-QLTT; khởi động timer SLA BR-006 |
| 8 | ACT-SYS | Hiển thị xác nhận + số thứ tự đơn cho NV |

**Luồng ngoại lệ:**

| ID | Điều kiện | Steps | Kết quả |
|----|-----------|-------|---------|
| EF-1 | Quota khong du | Step 5 | Báo 'quota không đủ'; đơn không tạo |
| EF-2 | Nửa ngày nhưng loại khác phép năm | Step 4 | Báo 'nửa ngày chỉ dùng cho phép năm' |
| EF-3 | Lý do trong | Step 3 | Báo 'phải nhập lý do' |

**Quy tắc nghiệp vụ:**

| BR ID | Áp dụng tại step |
|-------|------------------|
| LVE-BR-001 | Step 4 |
| LVE-BR-002 | Step 5 |
| LVE-BR-004 | Step 4 |
| LVE-BR-005 | Step 4 |

**Truy vết:**

| FR ID | Ghi chú |
|-------|---------|
| LVE-FR-001 | Form tạo đơn theo BR-001/004/005 |
| LVE-FR-002 | Tính quota theo BR-002 |

---

### LVE-UC-002 — Phê duyệt nghỉ 2 cấp

| Mục | Nội dung |
|-----|----------|
| **ID** | LVE-UC-002 |
| **Tên** | Phê duyệt nghỉ 2 cấp |
| **Actor chính** | ACT-QLTT (cấp 1), ACT-HR (cấp 2) |
| **Actor phụ** | ACT-SYS (timer SLA) |
| **Mục tiêu** | Cấp 1 xem xét <=24h -> chuyển cấp 2 -> HR duyệt/từ chối; từ chối kèm lý do |
| **Preconditions** | Đơn ở trạng thái Chờ duyệt (cấp 1 hoặc cấp 2) |
| **Postconditions (success)** | Đơn duyệt (trừ quota) hoặc từ chối (kèm lý do) |
| **Postconditions (failure)** | Đơn không đổi, hệ thống ghi log |
| **Trigger** | QLTT/HR mở thông báo trong-app hoặc truy cập danh sách đơn |
| **Frequency** | Hàng ngày theo luồng đơn |

**Luồng chính (Basic Path):**

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | ACT-SYS | Gửi thông báo trong-app cho cấp 1; khởi động timer SLA BR-006 |
| 2 | ACT-QLTT | Xem chi tiết đơn; chọn Duyệt hoặc Từ chối |
| 3 | ACT-QLTT | Nếu Từ chối -> nhập lý do -> lưu, đơn = 'Từ chối', thông báo NV |
| 4 | ACT-QLTT | Nếu Duyệt -> chuyển 'Chờ duyệt cấp 2', gửi thông báo HR, khởi động timer 24h thứ 2 |
| 5 | ACT-HR | Xem chi tiết đơn; chọn Duyệt hoặc Từ chối |
| 6 | ACT-HR | Nếu Từ chối -> nhập lý do -> lưu, đơn = 'Từ chối', thông báo NV |
| 7 | ACT-HR | Nếu Duyệt -> ghi log; ACT-SYS trừ quota theo BR-002/008 |
| 8 | ACT-SYS | Cập nhật trạng thái = 'Đã duyệt'; thông báo NV; dừng timer |

**Luồng ngoại lệ:**

| ID | Điều kiện | Steps | Kết quả |
|----|-----------|-------|---------|
| EF-1 | Quá 24h không hành động | Step 1/4 | Đánh dấu 'Trễ'; không tự động escalate (MVP) |
| EF-2 | HR hủy đơn đã duyệt | Step 7 | Hoàn quota nếu còn; ghi audit log |

**Quy tắc nghiệp vụ:**

| BR ID | Áp dụng tại step |
|-------|------------------|
| LVE-BR-006 | Step 1, 4 (timer 24h) |
| LVE-BR-007 | Step 3, 6 (từ chối + lý do) |
| LVE-BR-008 | Step 7, EF-2 (quota/lịch sử) |

**Truy vết:**

| FR ID | Ghi chú |
|-------|---------|
| LVE-FR-004 | SLA 24h trong-app; từ chối kèm lý do; đàm phán bên ngoài |

---

### LVE-UC-003 — Xem danh sách đơn + số dư quota

| Mục | Nội dung |
|-----|----------|
| **ID** | LVE-UC-003 |
| **Tên** | Xem danh sách đơn + quota |
| **Actor chính** | ACT-NV, ACT-QLTT, ACT-HR |
| **Mục tiêu** | NV xem đơn của mình + quota; QLTT xem dưới quyền; HR xem toàn bộ |
| **Preconditions** | Đã đăng nhập |
| **Postconditions (success)** | Hiển thị danh sách (cột: ngày, loại, trạng thái, quota) |
| **Postconditions (failure)** | — |
| **Trigger** | Mở trang Nghỉ phép |
| **Frequency** | Hàng ngày |

**Luồng chính (Basic Path):**

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | ACT-SYS | Truy vấn đơn theo phạm vi quyền (NV -> chi NV; QLTT -> dưới quyền; HR -> toàn bộ) |
| 2 | ACT-SYS | Tính quota còn lại theo BR-002 |
| 3 | ACT-NV/QLTT/HR | Xem danh sách + quota; click đơn -> mở chi tiết |

**Truy vết:**

| FR ID | Ghi chú |
|-------|---------|
| LVE-FR-006 | Bảng liệt kê đơn + quota còn lại |

---

### LVE-UC-004 — Hủy / rút / đàm phán đơn

| Mục | Nội dung |
|-----|----------|
| **ID** | LVE-UC-004 |
| **Tên** | Hủy/rút/đàm phán đơn |
| **Actor chính** | ACT-NV, ACT-HR |
| **Mục tiêu** | NV hủy đơn chờ; HR hủy đơn đã duyệt hoặc chốt kết quả đàm phán bên ngoài |
| **Preconditions** | Đơn ở trạng thái Chờ duyệt / Đã duyệt |
| **Postconditions (success)** | Đơn = 'Đã hủy'; quota hoàn nếu đã trừ; log đầy đủ |
| **Trigger** | NV/HR thao tác trên chi tiết đơn |
| **Frequency** | Khi có yêu cầu hủy/đàm phán |

**Luồng chính (Basic Path):**

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | ACT-NV | Chọn Hủy đơn (trạng thái Chờ duyệt) -> nhập lý do -> xác nhận |
| 2 | ACT-SYS | BR-008: đặt 'Đã hủy'; quota không bị trừ (chưa duyệt) |
| 3 | ACT-HR | Chọn Hủy đơn đã duyệt -> nhập lý do -> xác nhận |
| 4 | ACT-SYS | BR-008: hoàn quota nếu còn; ghi audit log |
| 5 | ACT-HR | Chốt đàm phán bên ngoài: chọn Reopen hoặc Approve |

**Luồng ngoại lệ:**

| ID | Điều kiện | Steps | Kết quả |
|----|-----------|-------|---------|
| EF-1 | Đơn đã duyệt và lương đã chạm | Step 3 | Ghi chú 'không hoàn quota'; vẫn đặt 'Đã hủy' |

**Quy tắc nghiệp vụ:**

| BR ID | Áp dụng tại step |
|-------|------------------|
| LVE-BR-007 | Step 5 (đàm phán bên ngoài) |
| LVE-BR-008 | Step 2, 4, EF-1 |

**Truy vết:**

| FR ID | Ghi chú |
|-------|---------|
| LVE-FR-004 | Đàm phán sau từ chối |
| LVE-FR-005 | Hủy/hồi quota |

---

### LVE-UC-005 — Cấu hình nghỉ + quota

| Mục | Nội dung |
|-----|----------|
| **ID** | LVE-UC-005 |
| **Tên** | Cấu hình nghỉ + quota |
| **Actor chính** | ACT-HR |
| **Mục tiêu** | HR cấu hình loại nghỉ (mã/ngày/quota mặc định) và tham số quota (12 ngày/ngày chuẩn) |
| **Preconditions** | HR đã login vào màn hình cấu hình |
| **Postconditions (success)** | Thay đổi lưu, có log audit |
| **Trigger** | HR mở menu Cấu hình -> Nghỉ phép |
| **Frequency** | Hạn chế (lần đầu + điều chỉnh thời gian thực) |

**Luồng chính (Basic Path):**

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | ACT-HR | Mở form cấu hình: thêm/sửa/xoá loại nghỉ (tên/mã/quota/ngày áp dụng) |
| 2 | ACT-SYS | BR-002 validate quota tổng <= 30 ngày DL (ngăn mis-config) |
| 3 | ACT-HR | Lưu; hệ thống ghi audit log |

**Quy tắc nghiệp vụ:**

| BR ID | Áp dụng tại step |
|-------|------------------|
| LVE-BR-002 | Step 2 (cấu hình quota) |
| LVE-BR-001 | Step 1 (danh sách loại hợp lệ) |

**Truy vết:**

| FR ID | Ghi chú |
|-------|---------|
| LVE-FR-007 | UI cấu hình loại nghỉ + quota |

---

## 5. Changelog

| Phiên bản | Thay đổi |
|-----------|----------|
| 0.1 | Tạo ban đầu theo DOC-03 BRQ-002/003 + chốt Q1–Q12 (Hoàng 2026-08-21) |
