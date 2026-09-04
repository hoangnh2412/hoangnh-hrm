# DOC-05 — Kịch bản sử dụng (Use Cases) — Module employee

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.2 | 2026-09-05 | BA | Draft |

**Tiêu chuẩn tham khảo:** UML Use Case; Cockburn (Fully Dressed / Casual).

---

## 1. Danh mục tác nhân

| Actor ID | Tên | Mô tả | Loại (Primary / Secondary / System) |
|----------|-----|-------|--------------------------------------|
| ACT-HR | Nhân sự (HR) | Tạo/sửa/import hồ sơ; báo QLTT khi đến kỳ review (SOP); chốt Chính thức + upload đánh giá; nghỉ việc & khóa | Primary |
| ACT-QLTT | Quản lý trực tiếp | Xem hồ sơ cấp dưới; đánh giá thử việc và báo HR (**SOP — không bắt buộc màn hình trên MVP**) | Secondary |
| ACT-NV | Nhân viên | Xem hồ sơ chính mình (giới hạn trường) | Secondary |
| ACT-SYS | Hệ thống | Sinh mã NV; tính ngày hết thử việc; **báo** danh sách đến kỳ review (**không** tự chuyển Chính thức) | System |

> Nguồn actor: EMP-BR-007 (phân quyền xem/sửa) · Quyết định chốt 2026-08-21 (Q1).

## 2. Danh sách use case

| UC ID | Tên | Actor chính | Priority | Trace (BRQ/FR) |
|-------|-----|-------------|----------|----------------|
| EMP-UC-001 | Tạo hồ sơ nhân viên | ACT-HR | Must | BRQ-001 |
| EMP-UC-002 | Cập nhật hồ sơ nhân viên | ACT-HR | Must | BRQ-001 |
| EMP-UC-003 | Import roster excel hàng loạt | ACT-HR | Must | BRQ-010 |
| EMP-UC-004 | Xem hồ sơ nhân viên | ACT-HR / ACT-QLTT / ACT-NV | Must | BRQ-001 |
| EMP-UC-005 | Quản lý lifecycle trạng thái NV | ACT-HR / ACT-SYS | Must | BRQ-001 · EMP-FR-005/006 |

## 3. Sơ đồ use case

```text
ACT-HR ────► (EMP-UC-001 Tạo hồ sơ)
        ├──► (EMP-UC-002 Cập nhật hồ sơ)
        ├──► (EMP-UC-003 Import roster excel)
        ├──► (EMP-UC-004 Xem hồ sơ — tất cả)
        └──► (EMP-UC-005 Review TV / Nghỉ việc / Khóa)
ACT-QLTT ──► (EMP-UC-004 Xem hồ sơ — cấp dưới)
ACT-NV ────► (EMP-UC-004 Xem hồ sơ — chính mình)
ACT-SYS ───► (EMP-UC-005 Báo đến kỳ review thử việc)
```

## 4. Đặc tả use case (Fully Dressed)

### EMP-UC-001 — Tạo hồ sơ nhân viên

| Mục | Nội dung |
|-----|----------|
| **ID** | EMP-UC-001 |
| **Tên** | Tạo hồ sơ nhân viên |
| **Actor chính** | ACT-HR |
| **Actor phụ** | ACT-SYS (sinh mã NV, tính ngày hết thử việc) |
| **Mục tiêu** | HR tạo hồ sơ nhân viên hợp lệ; hệ thống cấp mã NV duy nhất và thiết lập trạng thái khởi đầu |
| **Preconditions** | HR đã đăng nhập, có quyền HR; vị trí đã tồn tại trong danh mục (cần cấu hình thời gian thử việc nếu chọn thử việc) |
| **Postconditions (success)** | Hồ sơ được lưu với mã NV duy nhất; trạng thái = Thử việc hoặc Chính thức; ngày hết thử việc được tính/nhập (nếu thử việc); audit log ghi nhận |
| **Postconditions (failure)** | Không lưu dữ liệu nào; hệ thống báo chính xác trường/lý do lỗi |
| **Trigger** | HR chọn "Tạo hồ sơ mới" |
| **Frequency** | Thấp — khi tuyển/onboarding nhân viên mới |

#### Luồng chính (Basic Path)

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | ACT-HR | Mở form tạo hồ sơ |
| 2 | ACT-HR | Nhập thông tin: họ tên, ngày sinh, CCCD, giới tính, vị trí công việc, mức lương chính thức (bắt buộc); ngày vào làm, phòng ban, quản lý trực tiếp (tùy chọn) |
| 3 | ACT-HR | Chọn chế độ nhân sự: Thử việc hoặc Chính thức ngay |
| 4 | Hệ thống | Validate: đủ 6 trường bắt buộc, CCCD không trùng hồ sơ chưa khóa (EMP-BR-002); nếu khai quản lý trực tiếp → quản lý active + không phải chính mình (EMP-BR-003) |
| 5 | Hệ thống | Sinh mã nhân viên duy nhất, bất biến (EMP-BR-001) |
| 6 | Hệ thống | Nếu Thử việc: tính ngày hết thử việc = ngày vào làm + thời gian thử việc (mặc định 60 ngày, cấu hình theo vị trí); nếu không có ngày vào làm → yêu cầu nhập tay (EMP-BR-004) |
| 7 | Hệ thống | Lưu hồ sơ, ghi audit log (EMP-BR-007) |
| 8 | Hệ thống | Hiển thị hồ sơ với mã NV đã cấp |

#### Luồng thay thế

| ID | Điều kiện | Steps |
|----|-----------|-------|
| AF-1 | HR chọn "Chính thức ngay" (không thử việc) | Bỏ qua step 6; trạng thái khởi tạo = Chính thức (EMP-BR-004/005) |
| AF-2 | HR khai quản lý trực tiếp | Step 4 kiểm tra thêm điều kiện quản lý (EMP-BR-003) |

#### Luồng ngoại lệ

| ID | Điều kiện | Steps | Kết quả |
|----|-----------|-------|---------|
| EF-1 | Thiếu 1 trong 6 trường bắt buộc | Chặn lưu, highlight trường thiếu | Error message, hồ sơ chưa lưu (EMP-BR-002) |
| EF-2 | CCCD trùng hồ sơ chưa khóa | Chặn lưu, báo trùng | Error message (EMP-BR-002) |
| EF-3 | Quản lý trực tiếp khai nhưng inactive / không tồn tại / là chính mình | Chặn lưu | Error message (EMP-BR-003) |
| EF-4 | Chọn Thử việc nhưng không có ngày vào làm và chưa nhập ngày hết thử việc | Yêu cầu nhập tay ngày hết thử việc | Chặn lưu đến khi đủ (EMP-BR-004) |

#### Quy tắc nghiệp vụ

| BR ID | Áp dụng tại step |
|-------|------------------|
| EMP-BR-001 | Step 5 |
| EMP-BR-002 | Step 4 |
| EMP-BR-003 | Step 4 |
| EMP-BR-004 | Step 6 |
| EMP-BR-007 | Step 7 |

#### Truy vết

| FR ID | Ghi chú |
|-------|---------|
| EMP-FR-001 | Tạo hồ sơ | — Cập nhật hồ sơ nhân viên

| Mục | Nội dung |
|-----|----------|
| **ID** | EMP-UC-002 |
| **Tên** | Cập nhật hồ sơ nhân viên |
| **Actor chính** | ACT-HR |
| **Actor phụ** | ACT-SYS (audit log) |
| **Mục tiêu** | HR chỉnh sửa thông tin hồ sơ; mọi thay đổi được ghi nhật ký đầy đủ |
| **Preconditions** | Hồ sơ tồn tại; người thao tác có quyền HR (EMP-BR-007) |
| **Postconditions (success)** | Dữ liệu cập nhật; audit log ghi: ai / trường nào / giá trị cũ–mới / thời điểm |
| **Postconditions (failure)** | Dữ liệu giữ nguyên trạng thái trước chỉnh sửa |
| **Trigger** | HR chọn hồ sơ → "Sửa" |
| **Frequency** | Trung bình |

#### Luồng chính (Basic Path)

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | ACT-HR | Tra cứu hồ sơ qua danh sách/tìm kiếm (xem EMP-UC-004) |
| 2 | Hệ thống | Hiển thị hồ sơ chế độ xem |
| 3 | ACT-HR | Chọn "Sửa", thay đổi các trường được phép |
| 4 | Hệ thống | Validate như tạo mới: trường bắt buộc, CCCD không trùng (EMP-BR-002); quản lý trực tiếp nếu khai phải hợp lệ (EMP-BR-003) |
| 5 | Hệ thống | Lưu thay đổi, ghi audit log chi tiết (EMP-BR-007) |
| 6 | Hệ thống | Hiển thị xác nhận cập nhật thành công |

#### Luồng thay thế

| ID | Điều kiện | Steps |
|----|-----------|-------|
| AF-1 | HR đổi chế độ Thử việc ↔ Chính thức | Áp dụng logic lifecycle tương ứng (EMP-BR-004/005, xem EMP-UC-005) |

#### Luồng ngoại lệ

| ID | Điều kiện | Steps | Kết quả |
|----|-----------|-------|---------|
| EF-1 | Validation fail (thiếu trường / trùng CCCD / quản lý không hợp lệ) | Chặn lưu, báo lỗi từng trường | Error message, dữ liệu giữ nguyên (EMP-BR-002/003) |
| EF-2 | Người dùng không có quyền HR | Từ chối thao tác | Error message (EMP-BR-007) |

#### Quy tắc nghiệp vụ

| BR ID | Áp dụng tại step |
|-------|------------------|
| EMP-BR-002 | Step 4 |
| EMP-BR-003 | Step 4 |
| EMP-BR-007 | Steps 1, 5 |

#### Truy vết

| FR ID | Ghi chú |
|-------|---------|
| EMP-FR-002 | Cập nhật hồ sơ | — Import roster excel hàng loạt

| Mục | Nội dung |
|-----|----------|
| **ID** | EMP-UC-003 |
| **Tên** | Import roster excel hàng loạt |
| **Actor chính** | ACT-HR |
| **Actor phụ** | ACT-SYS (validate, sinh/bảo toàn mã NV, báo cáo kết quả) |
| **Mục tiêu** | Nhập hàng loạt hồ sơ từ file excel đúng mẫu **11 cột** lúc go-live, kèm báo cáo dòng OK / dòng lỗi |
| **Preconditions** | File excel đúng mẫu 11 cột đã chốt (DOC-04 §4); HR có quyền |
| **Postconditions (success)** | Các dòng hợp lệ được import; mã NV giữ từ file hoặc tự sinh; ngày hết thử việc dùng giá trị file hoặc tự tính; báo cáo kết quả xuất ra; audit log ghi nhận |
| **Postconditions (failure)** | Header sai mẫu → từ chối toàn bộ file; dòng lỗi không được import |
| **Trigger** | HR chọn "Import roster" và tải file lên |
| **Frequency** | Rất thấp — chủ yếu lúc go-live |

#### Luồng chính (Basic Path)

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | ACT-HR | Tải file excel lên |
| 2 | Hệ thống | Kiểm tra header đúng mẫu 11 cột (EMP-BR-006) |
| 3 | Hệ thống | Validate toàn bộ dòng: đủ trường bắt buộc (EMP-BR-002), định dạng ngày/số/CCCD hợp lệ, không trùng mã NV/CCCD (EMP-BR-006) |
| 4 | Hệ thống | Import các dòng hợp lệ; dòng có mã NV sẵn → bảo toàn mã, trống → tự sinh (EMP-BR-001) |
| 5 | Hệ thống | Dòng thử việc: có ngày hết thử việc trong file → dùng; trống → tự tính nếu có ngày vào làm (EMP-BR-004) |
| 6 | Hệ thống | Xuất báo cáo: số dòng OK / số dòng lỗi + chi tiết dòng + lý do (EMP-BR-006) |
| 7 | Hệ thống | Ghi audit log |

#### Luồng thay thế

| ID | Điều kiện | Steps |
|----|-----------|-------|
| AF-1 | File có một số dòng lỗi | Partial import: import các dòng hợp lệ, bỏ dòng lỗi, báo cáo chi tiết (EMP-BR-006) |

#### Luồng ngoại lệ

| ID | Điều kiện | Steps | Kết quả |
|----|-----------|-------|---------|
| EF-1 | Header sai mẫu 11 cột | Từ chối toàn bộ file | Error message, không import dòng nào (EMP-BR-006) |
| EF-2 | Dòng thiếu trường bắt buộc / sai định dạng / trùng mã NV hoặc CCCD | Đánh dấu lỗi dòng đó, không import | Liệt kê trong báo cáo (EMP-BR-006) |

#### Quy tắc nghiệp vụ

| BR ID | Áp dụng tại step |
|-------|------------------|
| EMP-BR-001 | Step 4 |
| EMP-BR-002 | Step 3 |
| EMP-BR-004 | Step 5 |
| EMP-BR-006 | Steps 2, 3, 6 |
| EMP-BR-007 | Step 7 |

#### Truy vết

| FR ID | Ghi chú |
|-------|---------|
| EMP-FR-003 | Import roster | — Xem hồ sơ nhân viên

| Mục | Nội dung |
|-----|----------|
| **ID** | EMP-UC-004 |
| **Tên** | Xem hồ sơ nhân viên (kèm tìm kiếm/lọc danh sách) |
| **Actor chính** | ACT-HR / ACT-QLTT / ACT-NV |
| **Actor phụ** | ACT-SYS (xác định phạm vi quyền, lọc trường) |
| **Mục tiêu** | Xem thông tin hồ sơ đúng phạm vi quyền: NV xem chính mình (giới hạn trường), QLTT xem cấp dưới, HR xem tất cả |
| **Preconditions** | Người dùng đã đăng nhập |
| **Postconditions (success)** | Hiển thị danh sách/hồ sơ trong phạm vi quyền; không thay đổi dữ liệu |
| **Postconditions (failure)** | Không hiển thị dữ liệu ngoài phạm vi |
| **Trigger** | NV mở "Hồ sơ của tôi"; HR/QLTT tra cứu danh sách nhân viên |
| **Frequency** | Cao |

#### Luồng chính (Basic Path)

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | Actor | Truy cập chức năng hồ sơ nhân viên |
| 2 | Hệ thống | Xác định phạm vi theo vai trò (EMP-BR-007): NV → chính mình; QLTT → cấp dưới; HR → tất cả |
| 3 | Actor | Tìm kiếm/lọc danh sách: từ khóa họ tên / mã NV / phòng ban… *(quyết định chốt 2026-08-21 Q3: gộp vào UC này)* |
| 4 | Hệ thống | Trả danh sách kết quả với trường giới hạn theo quyền |
| 5 | Actor | Chọn hồ sơ xem chi tiết |

#### Luồng thay thế

| ID | Điều kiện | Steps |
|----|-----------|-------|
| AF-1 | ACT-NV truy cập | Bỏ qua bước 3; hệ thống hiển thị thẳng hồ sơ chính mình với trường giới hạn (EMP-BR-007) |

#### Luồng ngoại lệ

| ID | Điều kiện | Steps | Kết quả |
|----|-----------|-------|---------|
| EF-1 | Truy cập hồ sơ ngoài phạm vi quyền (VD: NV xem hồ sơ người khác, QLTT xem ngoài cấp dưới) | Từ chối | Error message (EMP-BR-007) |

#### Quy tắc nghiệp vụ

| BR ID | Áp dụng tại step |
|-------|------------------|
| EMP-BR-007 | Steps 2, 4, EF-1 |

#### Truy vết

| FR ID | Ghi chú |
|-------|---------|
| EMP-FR-004 | Xem / tìm / lọc | — Quản lý lifecycle trạng thái NV

| Mục | Nội dung |
|-----|----------|
| **ID** | EMP-UC-005 |
| **Tên** | Review thử việc, nghỉ việc, khóa hồ sơ |
| **Actor chính** | ACT-HR (chốt Chính thức, nghỉ việc, khóa) |
| **Actor phụ** | ACT-SYS (báo đến kỳ review); ACT-QLTT (đánh giá SOP, ngoài hệ thống MVP) |
| **Mục tiêu** | Báo đúng NV đến kỳ review; HR chốt Chính thức kèm file đánh giá và quá trình làm việc; khóa thay xóa vật lý |
| **Preconditions** | Hồ sơ tồn tại với trạng thái hiện hành |
| **Postconditions (success)** | Review: danh sách/cảnh báo, trạng thái vẫn Thử việc cho đến khi HR chốt; chốt: Chính thức + file + mốc quá trình làm việc. Nghỉ/Khóa: đúng EMP-BR-005/008. Audit log. |
| **Postconditions (failure)** | Trạng thái giữ nguyên; hệ thống báo lý do |
| **Trigger** | Hệ thống phát hiện đến kỳ review; HR thao tác chốt Chính thức / Nghỉ việc / Khóa |
| **Frequency** | Review: theo lịch kiểm tra danh sách; Nghỉ/Khóa: thấp |

#### Luồng chính (Basic Path) — đến kỳ review rồi HR chốt

| Step | Actor | Hành động |
|------|-------|-----------|
| 1 | Hệ thống | Kiểm tra hồ sơ Thử việc có ngày hết thử việc ≤ hôm nay, chưa khóa/nghỉ (EMP-BR-005) |
| 2 | Hệ thống | Đưa vào danh sách / cảnh báo đến kỳ review — **không** đổi trạng thái |
| 3 | ACT-HR | Báo QLTT (SOP, ngoài hệ thống) |
| 4 | ACT-QLTT | Đánh giá thử việc, báo kết quả cho HR (SOP) |
| 5 | ACT-HR | Upload file kết quả đánh giá và chuyển trạng thái = Chính thức |
| 6 | Hệ thống | Lưu file; ghi quá trình làm việc (mốc hết TV + kết quả) cho PAY kỳ sau; audit log |

#### Luồng thay thế

| ID | Điều kiện | Steps |
|----|-----------|-------|
| AF-1 | HR thao tác "Nghỉ việc" trên hồ sơ Chính thức | Hệ thống chuyển Đã nghỉ việc, ghi audit log (EMP-BR-005) |
| AF-2 | HR yêu cầu xóa hồ sơ | Hệ thống chuyển Khóa, không xóa vật lý (EMP-BR-008) |

#### Luồng ngoại lệ

| ID | Điều kiện | Steps | Kết quả |
|----|-----------|-------|---------|
| EF-1 | Chưa có ngày hết thử việc | Không vào danh sách review | Giữ Thử việc (EMP-BR-005) |
| EF-2 | Đến hạn, HR chưa chốt | — | Giữ Thử việc; vẫn hiện review |
| EF-3 | HR chốt Chính thức thiếu file đánh giá | Chặn | Giữ Thử việc (EMP-AC-005) |
| EF-4 | Đã Khóa hoặc Đã nghỉ việc | Không review; chặn chuyển Chính thức | Giữ nguyên (EMP-BR-005/008) |

#### Quy tắc nghiệp vụ

| BR ID | Áp dụng tại step |
|-------|------------------|
| EMP-BR-004 | Step 1, EF-1 |
| EMP-BR-005 | Steps 1–6, AF-1, EF-1…4 |
| EMP-BR-008 | AF-2, EF-4 |

#### Truy vết

| FR ID | Ghi chú |
|-------|---------|
| EMP-FR-005 | Review + chốt Chính thức |
| EMP-FR-006 | Nghỉ việc / Khóa |

## 5. Tóm tắt use case (Casual — cho UC đơn giản)

| UC ID | Actor | Mô tả 1 câu |
|-------|-------|-------------|
| EMP-UC-001 | HR | HR tạo hồ sơ mới; hệ thống validate 6 trường, sinh mã NV, thiết lập trạng thái khởi đầu |
| EMP-UC-002 | HR | HR sửa hồ sơ; mọi thay đổi ghi audit log |
| EMP-UC-003 | HR | HR import roster excel 11 cột; partial import + báo cáo dòng lỗi |
| EMP-UC-004 | HR/QLTT/NV | Xem hồ sơ theo phạm vi quyền, kèm tìm kiếm/lọc danh sách |
| EMP-UC-005 | HR/SYS | Hệ thống báo đến kỳ review; HR chốt Chính thức + upload đánh giá; khóa thay xóa vật lý |

## 6. Nhật ký thay đổi

| Phiên bản | UC ID | Thay đổi | CR Ref |
|-----------|-------|----------|--------|
| 0.1 | — | Khởi tạo DOC-05 employee (4 actor, 5 UC) | — |
| 0.2 | UC-001/003/005 | 6 trường bắt buộc; import 11 cột; review thử việc không tự chuyển | DEC-REQ-001 · DEC-REQ-002 |
