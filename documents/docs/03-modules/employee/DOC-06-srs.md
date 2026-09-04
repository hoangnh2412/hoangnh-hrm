# DOC-06 — Đặc tả Yêu cầu Phần mềm (SRS) — Module employee

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.2 | 2026-09-05 | BA | Draft |

**Tiêu chuẩn tham khảo:** IEEE 830 · ISO/IEC/IEEE 29148.
**MOD prefix:** `EMP` · **Quyết định cổng A2 (2026-08-21):** anh Hoàng bỏ chờ prototype DOC-19 — viết thẳng SRS từ DOC-04/05.

---

## 1. Giới thiệu

### 1.1 Mục đích

Đặc tả yêu cầu chức năng (FR) module employee cho đội DEV/QA xây dựng và kiểm thử. Đối tượng đọc: DEV, QA, SA, HR owner.

### 1.2 Phạm vi

Hồ sơ nhân sự: tạo/sửa/import roster excel hàng loạt, xem theo phân quyền, lifecycle trạng thái (Thử việc → Chính thức → Đã nghỉ việc; Khóa). Nguồn: BRQ-001, BRQ-010 (DOC-03). Ngoài phạm vi: lương, chấm công, nghỉ phép (module khác).

### 1.3 Định nghĩa, Viết tắt

| Thuật ngữ | Định nghĩa |
|-----------|------------|
| Mã NV | Mã nhân viên duy nhất, tự sinh hoặc bảo toàn từ import (EMP-BR-001) |
| Ngày hết thử việc | Ngày vào làm + thời gian thử việc (mặc định 60 ngày, cấu hình theo vị trí) (EMP-BR-004) |
| Khóa | Trạng thái ẩn khỏi danh sách hoạt động, không xóa dữ liệu (EMP-BR-008) |
| Roster | File excel **11 cột** nhập hàng loạt hồ sơ lúc go-live (EMP-BR-006, DEC-REQ-001) |
| Review thử việc | Đến hạn thử việc: hệ thống **báo**; HR chốt Chính thức + upload đánh giá (DEC-REQ-002) |

### 1.4 Tài liệu tham chiếu

| ID | Tài liệu |
|----|----------|
| DOC-03 | BRD — BRQ-001, BRQ-010, A-006, DEC-DIS-005 |
| DOC-04 | Business Rules employee — EMP-BR-001…008 |
| DOC-05 | Use Cases employee — EMP-UC-001…005 |
| DOC-13 | NFR nền tảng (viết sau) |

### 1.5 Tổng quan

§2 mô tả tổng quan · §3 FR chi tiết · §4 giao diện ngoài · §5 NFR tóm tắt · §6 ma trận truy vết · §7 phê duyệt.

## 2. Mô tả tổng quan

### 2.1 Bối cảnh sản phẩm

Module employee là nguồn dữ liệu nhân sự trung tâm: các module leave/attendance/payroll/onboarding/offboarding/report đều tham chiếu hồ sơ NV (mã NV, trạng thái, quản lý trực tiếp, ngày hết thử việc). Không gọi hệ thống ngoài nào trong MVP.

### 2.2 Chức năng sản phẩm

5 chức năng chính: tạo hồ sơ · cập nhật hồ sơ · import roster excel · xem/tìm kiếm theo quyền · lifecycle (review thử việc do HR chốt, nghỉ việc, khóa).

### 2.3 Phân loại người dùng

| User class | Mô tả | Kỹ năng |
|------------|-------|---------|
| ACT-HR | Nhân sự: tạo/sửa/import; chốt review thử việc + upload đánh giá | Thành thạo nghiệp vụ HR, dùng web thành thạo |
| ACT-QLTT | Quản lý trực tiếp: xem cấp dưới; đánh giá thử việc (SOP, ngoài hệ thống MVP) | Dùng web cơ bản |
| ACT-NV | Nhân viên: xem hồ sơ chính mình | Dùng web cơ bản |
| ACT-SYS | Hệ thống: sinh mã, **báo** đến kỳ review (không tự chuyển Chính thức) | — |

### 2.4 Môi trường vận hành

| Mục | Yêu cầu |
|-----|---------|
| Client | Browser hiện đại (Chrome/Edge/Safari), desktop web (MVP không mobile) |
| Server | .NET 9.0 (C-002) |
| Network | LAN/Internet nội bộ công ty |

### 2.5 Ràng buộc thiết kế & triển khai

| ID | Constraint |
|----|------------|
| C-002 | Backend .NET 9.0 · Web ReactJS (DOC-03) |
| MVP | Không mobile (quyết định 2026-08-21) · không email/SMTP |
| Audit | Mọi thay đổi hồ sơ phải có nhật ký (EMP-BR-007) |

### 2.6 Giả định & Phụ thuộc

| ID | Mô tả |
|----|-------|
| A-006 | Roster hiện hữu import excel hàng loạt lúc go-live |
| DEP-1 | Danh mục vị trí (kèm thời gian thử việc cấu hình) phải có trước khi tạo/import hồ sơ |

---

## 3. Yêu cầu chức năng

> Chi tiết NFR → DOC-13 · AC → DOC-07.

| FR ID | Mô tả | Priority | Source (UC/BR) | Verification |
|-------|-------|----------|----------------|--------------|
| EMP-FR-001 | Tạo hồ sơ nhân viên: validate 6 trường, sinh mã NV, thiết lập trạng thái khởi đầu | Must | UC-001 · BR-001/002/003/004 | Test |
| EMP-FR-002 | Cập nhật hồ sơ nhân viên kèm audit log chi tiết | Must | UC-002 · BR-002/003/007 | Test |
| EMP-FR-003 | Import roster excel 11 cột: partial import + báo cáo dòng lỗi | Must | UC-003 · BR-001/002/004/006 | Test |
| EMP-FR-004 | Xem/tìm kiếm/lọc hồ sơ theo phạm vi quyền | Must | UC-004 · BR-007 | Test |
| EMP-FR-005 | Báo đến kỳ review thử việc; HR chốt Chính thức + upload đánh giá; cập nhật quá trình làm việc | Must | UC-005 · BR-005 | Test |
| EMP-FR-006 | Nghỉ việc / Khóa hồ sơ (không xóa vật lý) | Must | UC-005 · BR-005/008 | Test |

### EMP-FR-001 — Tạo hồ sơ nhân viên

| Mục | Nội dung |
|-----|----------|
| **Description** | Hệ thống cho phép HR tạo hồ sơ NV qua form; validate theo BR-002/003; sinh mã NV duy nhất bất biến (BR-001); nếu Thử việc tính/ngày hết thử việc theo BR-004 |
| **Inputs** | Họ tên*, ngày sinh*, CCCD*, giới tính*, vị trí công việc*, mức lương chính thức* (*bắt buộc); ngày vào làm, phòng ban, quản lý trực tiếp (tùy chọn); chế độ: Thử việc / Chính thức ngay; ngày hết thử việc nhập tay (nếu thử việc + không có ngày vào làm) |
| **Processing** | Validate đủ 6 trường bắt buộc + CCCD không trùng hồ sơ chưa khóa (BR-002); quản lý trực tiếp nếu khai phải active + không phải chính mình (BR-003); sinh mã NV (BR-001); tính ngày hết thử việc = ngày vào + thời gian thử việc vị trí, tối đa 60 ngày (BR-004); ghi audit log (BR-007) |
| **Outputs** | Hồ sơ lưu với mã NV; trạng thái = Thử việc hoặc Chính thức; audit log entry |
| **Preconditions** | HR đăng nhập có quyền; danh mục vị trí tồn tại |
| **Postconditions** | Success: hồ sơ hiển thị với mã NV đã cấp. Failure: không lưu dữ liệu nào |
| **Error handling** | Thiếu trường bắt buộc → chặn lưu, highlight trường thiếu; CCCD trùng → chặn lưu báo trùng; quản lý không hợp lệ → chặn lưu; Thử việc thiếu ngày hết thử việc → yêu cầu nhập tay |

### EMP-FR-002 — Cập nhật hồ sơ nhân viên

| Mục | Nội dung |
|-----|----------|
| **Description** | HR chỉnh sửa trường được phép của hồ sơ; validate như tạo mới; mọi thay đổi ghi audit log chi tiết (ai / trường / giá trị cũ–mới / thời điểm) |
| **Inputs** | Mã NV (định danh); các trường cần sửa (giống FR-001 trừ mã NV) |
| **Processing** | Kiểm tra quyền HR (BR-007); validate BR-002/003; so sánh giá trị cũ–mới từng trường; lưu + audit log |
| **Outputs** | Dữ liệu cập nhật; audit log chi tiết |
| **Preconditions** | Hồ sơ tồn tại; người thao tác có quyền HR |
| **Postconditions** | Success: dữ liệu mới + log. Failure: dữ liệu giữ nguyên |
| **Error handling** | Validation fail → chặn lưu báo lỗi từng trường; không có quyền → từ chối thao tác |

### EMP-FR-003 — Import roster excel hàng loạt

| Mục | Nội dung |
|-----|----------|
| **Description** | HR tải file excel mẫu 11 cột; hệ thống validate toàn bộ, import các dòng hợp lệ (partial), báo cáo dòng OK / dòng lỗi + lý do |
| **Inputs** | File excel 11 cột: Mã NV, Họ tên*, Ngày sinh*, Giới tính*, CCCD*, Ngày vào làm, Ngày hết thử việc, Vị trí*, Mức lương chính thức*, Phòng ban, Quản lý trực tiếp (*bắt buộc) |
| **Processing** | Kiểm tra header đúng mẫu → sai từ chối toàn bộ file (BR-006); validate từng dòng: đủ bắt buộc + định dạng + không trùng mã NV/CCCD (BR-002/006); mã NV có sẵn → bảo toàn, trống → tự sinh (BR-001); ngày hết thử việc: dùng file → trống thì tự tính nếu có ngày vào (BR-004); ghi audit log |
| **Outputs** | Các dòng hợp lệ được import; báo cáo kết quả (số OK / số lỗi + chi tiết từng dòng) |
| **Preconditions** | HR có quyền; file đúng mẫu 11 cột |
| **Postconditions** | Success: import partial + báo cáo. Failure (header sai): không import dòng nào |
| **Error handling** | Header sai → từ chối toàn bộ; dòng lỗi → đánh dấu, liệt kê trong báo cáo, không import |

### EMP-FR-004 — Xem / tìm kiếm / lọc hồ sơ theo quyền

| Mục | Nội dung |
|-----|----------|
| **Description** | Hệ thống hiển thị danh sách/chi tiết hồ sơ đúng phạm vi quyền: NV xem chính mình (giới hạn trường), QLTT xem cấp dưới, HR xem tất cả; kèm tìm kiếm/lọc danh sách |
| **Inputs** | Từ khóa tìm kiếm (họ tên / mã NV / phòng ban); bộ lọc (trạng thái, phòng ban); định danh hồ sơ khi xem chi tiết |
| **Processing** | Xác định phạm vi theo vai trò (BR-007); lọc dữ liệu trong phạm vi; giới hạn trường trả về theo vai trò |
| **Outputs** | Danh sách kết quả / chi tiết hồ sơ với trường giới hạn |
| **Preconditions** | Người dùng đã đăng nhập |
| **Postconditions** | Không thay đổi dữ liệu |
| **Error handling** | Truy cập ngoài phạm vi quyền → từ chối, báo lỗi |

### EMP-FR-005 — Review thử việc và chốt Chính thức

| Mục | Nội dung |
|-----|----------|
| **Description** | Hệ thống **báo** hồ sơ Thử việc đến kỳ review (ngày hết thử việc ≤ hôm nay). **Không** tự chuyển Chính thức. HR báo QLTT (SOP); QLTT đánh giá (SOP). HR upload file kết quả đánh giá và chuyển Chính thức; hệ thống ghi quá trình làm việc cho PAY kỳ sau (DEC-REQ-002) |
| **Inputs** | Danh sách hồ sơ đến kỳ; file đánh giá thử việc; thao tác HR chốt Chính thức |
| **Processing** | Lọc Thử việc có ngày hết thử việc ≤ hiện tại, chưa khóa/nghỉ → cảnh báo/danh sách, giữ Thử việc (BR-005). IF HR chốt AND có file → Chính thức + lưu file + mốc quá trình làm việc + audit. IF thiếu file → chặn. |
| **Outputs** | Danh sách/cảnh báo review; khi chốt: trạng thái Chính thức, file, quá trình làm việc, audit log |
| **Preconditions** | Lịch/job chỉ **lập danh sách**, không đổi trạng thái; HR có quyền khi chốt |
| **Postconditions** | Đến hạn chưa chốt: vẫn Thử việc. Chốt hợp lệ: Chính thức + dữ liệu sẵn cho PAY kỳ sau. |
| **Error handling** | Thiếu ngày hết TV → không vào review. Đã khóa/nghỉ → không review/không chốt Chính thức. Thiếu file → không chuyển. |

### EMP-FR-006 — Nghỉ việc / Khóa hồ sơ

| Mục | Nội dung |
|-----|----------|
| **Description** | HR thao tác Nghỉ việc (Chính thức → Đã nghỉ việc) hoặc yêu cầu xóa → hệ thống chuyển Khóa, KHÔNG xóa vật lý, giữ dữ liệu + lịch sử |
| **Inputs** | Mã NV; hành động: Nghỉ việc / Khóa |
| **Processing** | Kiểm tra quyền HR (BR-007); kiểm tra trạng thái cho phép chuyển (BR-005); chuyển trạng thái; giữ nguyên dữ liệu (BR-008); audit log |
| **Outputs** | Trạng thái mới = Đã nghỉ việc hoặc Khóa; audit log |
| **Preconditions** | Hồ sơ tồn tại; HR có quyền |
| **Postconditions** | Hồ sơ ẩn khỏi danh sách hoạt động (nếu Khóa); dữ liệu + trace quá khứ giữ nguyên |
| **Error handling** | Chuyển đổi không hợp lệ theo bảng trạng thái → chặn, báo lý do |

---

## 4. Yêu cầu giao diện bên ngoài

### 4.1 Giao diện người dùng

- Form tạo/sửa hồ sơ (FR-001/002)
- Trang danh sách nhân viên + bộ lọc/tìm kiếm (FR-004)
- Trang chi tiết hồ sơ (giới hạn trường theo vai trò — FR-004)
- Dialog import roster excel + preview/báo cáo kết quả (FR-003)
- Menu hành động: Nghỉ việc, Khóa (FR-006); **Chốt chính thức + upload đánh giá** (FR-005) — chỉ HR
- Danh sách / cảnh báo đến kỳ review thử việc (FR-005)
- MVP chạy web desktop; không mobile (quyết định 2026-08-21 Q11).

### 4.2 Giao diện phần mềm

- API nội bộ module employee; danh mục vị trí là dependency (DEP-1).

### 4.3 Giao diện truyền thông

- RESTful/JSON nội bộ (chi tiết DOC-10/12).

## 5. Yêu cầu phi chức năng (tóm tắt)

→ Chi tiết DOC-13.

| NFR ID | Category | Tóm tắt |
|--------|----------|---------|
| EMP-NFR-001 | Performance | Danh sách NV (<200) load < 2s; tìm kiếm < 1s |
| EMP-NFR-002 | Security | Phân quyền theo vai trò ACT-HR/QLTT/NV (BR-007) |
| EMP-NFR-003 | Audit | Audit log mọi thay đổi tạo/sửa/import/lifecycle (BR-007/008) |
| EMP-NFR-004 | Data integrity | Mã NV duy nhất toàn hệ thống; CCCD không trùng (BR-001/002) |
| EMP-NFR-005 | Availability | Thời gian bảo trì deploy cửa sổ ngoài giờ làm (liên hệ PAY/ATT) |

## 6. Ma trận truy vết

| FR ID | UC | BR | AC | Test (DOC-16) |
|-------|----|----|-----------------|-------------------|
| EMP-FR-001 | UC-001 | BR-001/002/003/004 | EMP-AC-001 | EMP-TC-001 |
| EMP-FR-002 | UC-002 | BR-002/003/007 | EMP-AC-002 | EMP-TC-002 |
| EMP-FR-003 | UC-003 | BR-001/002/004/006 | EMP-AC-003 | EMP-TC-003 |
| EMP-FR-004 | UC-004 | BR-007 | EMP-AC-004 | EMP-TC-004 |
| EMP-FR-005 | UC-005 | BR-005 | EMP-AC-005 | EMP-TC-005 |
| EMP-FR-006 | UC-005 | BR-005/008 | EMP-AC-006 | EMP-TC-006 |

## 7. Phê duyệt / Baseline

| Vai trò | Họ tên | Ngày | Version baseline |
|---------|--------|------|------------------|
| Business Owner | *(chờ ABC xác định)* | | ☐ |
| Sponsor | *(chờ ABC xác định)* | | ☐ |

## 8. Nhật ký thay đổi

| Phiên bản | Thay đổi |
|-----------|----------|
| 0.1 | Tạo ban đầu từ DOC-04/05; cổng A2 bypass prototype (quyết định 2026-08-21) |
| 0.2 | 6 trường bắt buộc + import 11 cột (DEC-REQ-001); FR-005 review HR, bỏ job tự chuyển (DEC-REQ-002) |
