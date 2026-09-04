# DOC-04 — Quy tắc nghiệp vụ — Module employee

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.3 | 2026-09-05 | BA | Draft |

**Tiêu chuẩn tham khảo:** Business Rules catalog; DMN cho rule tính toán.

---

## 1. Mục đích & phạm vi

Module **employee** — hồ sơ nhân sự: thông tin cá nhân, vị trí công việc, thời gian làm việc, trạng thái thử việc, import roster excel hàng loạt lúc go-live.

Nguồn: **BRQ-001** (lưu/quản lý hồ sơ), **BRQ-010** (import roster excel hàng loạt), A-006, DEC-DIS-005.

**Quyết định đã chốt (2026-08-08, anh Hoàng):**

- Mã nhân viên **tự sinh** bởi hệ thống.
- Trường bắt buộc: **họ tên, ngày sinh, CCCD, giới tính, vị trí công việc, mức lương chính thức** (DEC-REQ-001, 2026-09-05).
- Thời gian thử việc mặc định **60 ngày**, **cấu hình được** (theo vị trí).
- Quản lý trực tiếp **không bắt buộc** (ảnh hưởng luồng duyệt 2 cấp — xem EMP-BR-003).
- Hồ sơ **không xóa vật lý** — chỉ **khóa + giữ lịch sử**.

**Bổ sung (2026-08-08, sau doc-review):**

- Ngày vào làm **không bắt buộc** — NV cũ thường không nhớ ngày chính xác, chỉ nhớ năm (EMP-BR-002/004).
- Tạo đơn nghỉ: NV **tự chọn quản lý trực tiếp thủ công** khi làm đơn (EMP-BR-003).
- **Không bắt buộc thử việc** — hồ sơ mới có thể vào thẳng Chính thức (EMP-BR-004/005).
- **Review thử việc (DEC-REQ-002):** hệ thống chỉ **báo đến kỳ**; HR báo QLTT (SOP); QLTT đánh giá; HR upload kết quả + chuyển Chính thức; cập nhật quá trình làm việc. **Không** job tự chuyển.

## 2. Danh mục quy tắc nghiệp vụ

| ID | Tên | Mô tả rule | Loại | Priority | Trace (UC/FR) | Owner |
|----|-----|------------|------|----------|---------------|-------|
| EMP-BR-001 | Mã nhân viên tự sinh | Hệ thống tự sinh mã NV duy nhất, không trùng, bất biến trong vòng đời hồ sơ | Validation | Must | EMP-UC-001/003, EMP-FR- | HR, DEV |
| EMP-BR-002 | Trường bắt buộc hồ sơ | Hồ sơ hợp lệ phải đủ họ tên, ngày sinh, CCCD, giới tính, vị trí công việc, mức lương chính thức. Ngày vào làm **không bắt buộc** | Validation | Must | EMP-UC-001/003, EMP-FR- | HR, DEV |
| EMP-BR-003 | Quản lý trực tiếp tùy chọn | NV có thể không có quản lý trong hồ sơ; khi có phải là NV active. Tạo đơn nghỉ: NV **tự chọn** quản lý trực tiếp thủ công | Validation | Must | EMP-UC-001/002, EMP-FR- | HR, DEV |
| EMP-BR-004 | Ngày hết thử việc | Thử việc **không bắt buộc**. Có thử việc → ngày hết thử việc = ngày vào làm + thời gian thử việc (mặc định 60 ngày, cấu hình theo vị trí); không có ngày vào → nhập tay | Calculation | Must | EMP-UC-001/005, EMP-FR- | HR, DEV |
| EMP-BR-005 | Lifecycle trạng thái NV | Thử việc → Chính thức **chỉ khi HR chốt** (kèm upload đánh giá) sau khi hệ thống báo đến kỳ review; không tự chuyển. Nghỉ việc / Khóa do HR | Inference | Must | EMP-UC-005, EMP-FR-005 | HR, DEV |
| EMP-BR-006 | Import roster excel | Validation toàn bộ file trước khi import; dòng lỗi báo chi tiết, không import dòng lỗi | Validation | Must | EMP-UC-003, EMP-FR- | HR, DEV |
| EMP-BR-007 | Quyền sửa hồ sơ + audit | Chỉ HR sửa hồ sơ; mọi thay đổi ghi nhật ký (ai/sửa gì/khi nào) | Authorization | Must | EMP-UC-002/004, EMP-FR- | HR, DEV |
| EMP-BR-008 | Không xóa vật lý | Hồ sơ chỉ được khóa (ẩn khỏi danh sách hoạt động), giữ nguyên dữ liệu + lịch sử | Validation | Must | EMP-UC-002/005, EMP-FR- | HR, DEV |

**Loại rule:**
- **Validation** — kiểm tra dữ liệu / điều kiện
- **Calculation** — công thức, tính toán
- **Authorization** — ai được làm gì
- **Inference** — suy luận từ fact

## 3. Chi tiết quy tắc

### EMP-BR-001 — Mã nhân viên tự sinh

| Mục | Nội dung |
|-----|----------|
| **Statement** | Hệ thống tự sinh mã nhân viên duy nhất khi tạo hồ sơ; mã không trùng bất kỳ hồ sơ nào (kể cả đã khóa) và không thay đổi trong vòng đời. |
| **Condition** | IF hồ sơ mới được tạo (thủ công hoặc import) |
| **Action** | THEN sinh mã NV tự động theo định dạng hệ thống, gán cho hồ sơ |
| **Exception** | UNLESS hồ sơ import có mã NV từ file và mã chưa tồn tại → giữ mã từ file (xem EMP-BR-006) |
| **Source** | BRQ-001 · Quyết định 2026-08-08 · SOP HR |
| **Effective date** | Go-live |
| **Trace** | EMP-UC-001 · EMP-UC-003 · EMP-FR-xxx · BRQ-001/BRQ-010 |

### EMP-BR-002 — Trường bắt buộc hồ sơ

| Mục | Nội dung |
|-----|----------|
| **Statement** | Hồ sơ nhân viên chỉ được lưu khi có đủ: họ tên, ngày sinh, CCCD, giới tính, **vị trí công việc**, **mức lương chính thức**. Ngày vào làm **không bắt buộc** (NV cũ có thể chỉ nhớ năm vào làm). |
| **Condition** | IF tạo hoặc cập nhật hồ sơ |
| **Action** | THEN hệ thống kiểm tra đủ 6 trường bắt buộc; thiếu → chặn lưu, báo trường thiếu. CCCD không trùng hồ sơ khác (chưa khóa) → trùng chặn lưu |
| **Exception** | — |
| **Source** | BRQ-001 · Quyết định 2026-08-08 (ngày vào không bắt buộc) · DEC-REQ-001 (2026-09-05: thêm vị trí + mức lương chính thức) |
| **Effective date** | Go-live |
| **Trace** | EMP-UC-001 · EMP-UC-002 · EMP-FR-xxx · BRQ-001 |

### EMP-BR-003 — Quản lý trực tiếp tùy chọn

| Mục | Nội dung |
|-----|----------|
| **Statement** | Hồ sơ nhân viên có thể **không có** quản lý trực tiếp. Nếu khai, quản lý phải là nhân viên active trong hệ thống và không phải chính mình. **Khi NV tạo đơn nghỉ phép, NV tự chọn quản lý trực tiếp (thủ công)** để làm mắt xích duyệt cấp 1 — bất kể hồ sơ đã có quản lý hay chưa. |
| **Condition** | IF hồ sơ khai quản lý trực tiếp → kiểm tra quản lý tồn tại + active + không phải chính mình. IF NV tạo đơn nghỉ phép → NV chọn quản lý trực tiếp; quản lý chọn phải active + không phải chính mình. |
| **Action** | THEN kiểm tra hợp lệ; tạo đơn nghỉ được phép khi đã chọn quản lý trực tiếp hợp lệ |
| **Exception** | UNLESS hồ sơ để trống quản lý trực tiếp → vẫn hợp lệ (chọn ở bước tạo đơn) |
| **Source** | BRQ-001 · Quyết định 2026-08-08 (NV tự chọn quản lý khi tạo đơn) · BR-005 (DOC-03) |
| **Effective date** | Go-live |
| **Trace** | EMP-UC-001 · EMP-UC-002 · EMP-FR-xxx · BRQ-001 · *(leave: LVE-UC tạo đơn)* |

### EMP-BR-004 — Ngày hết thử việc

| Mục | Nội dung |
|-----|----------|
| **Statement** | Thử việc **không bắt buộc** — hồ sơ mới có thể vào thẳng Chính thức. Nếu thử việc: ngày hết thử việc = ngày vào làm + thời gian thử việc. Thời gian thử việc mặc định 60 ngày, cấu hình theo vị trí, **tối đa 60 ngày** (giới hạn BLLĐ). Nếu hồ sơ thử việc **không có ngày vào làm** → HR nhập tay ngày hết thử việc. |
| **Condition** | IF hồ sơ đánh dấu thử việc |
| **Action** | THEN tính ngày hết thử việc: có ngày vào làm → ngày vào + thời gian thử việc (mặc định 60 ngày hoặc theo cấu hình vị trí); không có ngày vào làm → bắt buộc nhập tay ngày hết thử việc |
| **Exception** | UNLESS import roster cung cấp sẵn ngày hết thử việc → dùng giá trị file. UNLESS hồ sơ không thử việc → không tính, trạng thái thẳng Chính thức |
| **Source** | BRQ-001/BRQ-010 · Quyết định 2026-08-08 (không bắt buộc thử việc, không bắt buộc ngày vào) · BLLĐ (thử việc tối đa 60 ngày) |
| **Effective date** | Go-live |
| **Trace** | EMP-UC-001 · EMP-UC-005 · EMP-FR-xxx · BRQ-001/BRQ-010 · BO-004 (alert dựa ngày này) |

### EMP-BR-005 — Lifecycle trạng thái NV

| Mục | Nội dung |
|-----|----------|
| **Statement** | Nhân viên đi qua: **Thử việc → Chính thức → Đã nghỉ việc**, cộng **Khóa** (EMP-BR-008) ở bất kỳ điểm. Hồ sơ không thử việc → **Chính thức** lúc tạo. **Không** tự chuyển Chính thức khi đến hạn. Khi Thử việc **có** ngày hết thử việc và ngày hiện tại ≥ ngày đó → hệ thống **đưa vào danh sách / cảnh báo đến kỳ review**. HR báo QLTT (SOP, ngoài hệ thống). QLTT đánh giá, báo HR. HR **chuyển Chính thức** chỉ khi **upload file kết quả đánh giá**; hệ thống ghi **quá trình làm việc** (mốc hết TV + kết quả) để PAY kỳ sau. Nghỉ việc: HR thao tác. |
| **Condition** | IF Thử việc AND có ngày hết thử việc AND hôm nay ≥ ngày hết thử việc AND chưa khóa/nghỉ → THEN báo review, **giữ Thử việc**. IF HR chốt Chính thức AND đã upload đánh giá AND hồ sơ đang Thử việc (chưa khóa/nghỉ) → THEN chuyển Chính thức + ghi quá trình làm việc. |
| **Action** | THEN (báo review) không đổi trạng thái. THEN (HR chốt hợp lệ) trạng thái = Chính thức, lưu file, cập nhật quá trình làm việc, audit log. |
| **Exception** | UNLESS thiếu file đánh giá → chặn chuyển Chính thức. UNLESS chưa có ngày hết thử việc → không vào danh sách review, giữ Thử việc. UNLESS đã khóa hoặc đã nghỉ việc → không review, không chuyển Chính thức. UNLESS đến hạn mà HR chưa chốt → giữ Thử việc. |
| **Source** | BRQ-001 · DEC-REQ-002 (2026-09-05) · SOP HR |
| **Effective date** | Go-live |
| **Trace** | EMP-UC-005 · EMP-FR-005 · EMP-AC-005 · BRQ-001 · BO-004 (cảnh báo hết thử việc / trùng ALR) |

### EMP-BR-006 — Import roster excel

| Mục | Nội dung |
|-----|----------|
| **Statement** | Import roster chỉ thành công khi toàn bộ file hợp lệ. Dòng lỗi không được import; hệ thống báo chính xác dòng + lý do. Có thể import các dòng hợp lệ còn lại (partial). |
| **Condition** | IF file excel tải lên có header đúng mẫu AND dữ liệu khớp kiểu (ngày, số, CCCD) AND không trùng mã NV/CCCD |
| **Action** | THEN import các dòng hợp lệ, sinh/bảo toàn mã NV, báo cáo kết quả (số dòng OK / số dòng lỗi + chi tiết) |
| **Exception** | UNLESS dòng thiếu trường bắt buộc (EMP-BR-002), sai định dạng ngày, trùng mã NV hoặc CCCD → đánh dấu lỗi, không import |
| **Source** | BRQ-010 · DEC-DIS-005 · Quyết định 2026-08-08 · **Mẫu excel đã chốt (11 cột, xem bảng §4; DEC-REQ-001 thêm mức lương chính thức)** |
| **Effective date** | Go-live |
| **Trace** | EMP-UC-003 · EMP-FR-xxx · BRQ-010 · BO-001 |

### EMP-BR-007 — Quyền sửa hồ sơ + audit

| Mục | Nội dung |
|-----|----------|
| **Statement** | Chỉ HR được tạo/sửa hồ sơ. Quản lý trực tiếp xem hồ sơ cấp dưới; nhân viên chỉ xem hồ sơ chính mình (giới hạn trường). Mọi thay đổi hồ sơ ghi nhật ký: người sửa, trường thay đổi, giá trị cũ/mới, thời điểm. |
| **Condition** | IF tạo/sửa hồ sơ THEN yêu cầu quyền HR. IF xem hồ sơ THEN theo quan hệ (chính mình / cấp dưới / HR). |
| **Action** | THEN cho phép thao tác trong quyền; ghi audit log với mọi thay đổi |
| **Exception** | UNLESS người dùng không thuộc quyền → từ chối, báo lỗi |
| **Source** | BRQ-001 · DEC-DIS-003 (mobile NV) · SOP HR |
| **Effective date** | Go-live |
| **Trace** | EMP-UC-002 · EMP-UC-004 · EMP-FR-xxx · BRQ-001 |

### EMP-BR-008 — Không xóa vật lý

| Mục | Nội dung |
|-----|----------|
| **Statement** | Hồ sơ nhân viên không bao giờ bị xóa vật lý. Chỉ được khóa: hồ sơ ẩn khỏi danh sách hoạt động nhưng giữ nguyên dữ liệu, lịch sử, trace lương/phép quá khứ. |
| **Condition** | IF HR yêu cầu xóa hồ sơ |
| **Action** | THEN hệ thống chuyển trạng thái = Khóa, không xóa dữ liệu, ghi nhật ký |
| **Exception** | UNLESS hồ sơ có dữ liệu lương/chấm công/phép phát sinh → vẫn chỉ khóa, không xóa |
| **Source** | BRQ-001 · Quyết định 2026-08-08 · Yêu cầu audit (DOC-13) |
| **Effective date** | Go-live |
| **Trace** | EMP-UC-002 · EMP-UC-005 · EMP-FR-xxx · BRQ-001 |

## 4. Bảng quyết định (tùy chọn)

### Mẫu import roster — danh sách cột (chốt 2026-08-08)

| Cột | Bắt buộc | Ghi chú |
|-----|----------|---------|
| Mã NV | Không | Có sẵn → giữ (EMP-BR-001); trống → tự sinh |
| Họ tên | ✅ | |
| Ngày sinh | ✅ | |
| Giới tính | ✅ | |
| CCCD | ✅ | Phải không trùng (EMP-BR-006) |
| Ngày vào làm | Không | NV cũ có thể không nhớ ngày chính xác; có → căn tính ngày hết thử việc (EMP-BR-004) |
| Ngày hết thử việc | Không | Có → dùng; trống → tự tính (nếu có ngày vào) hoặc HR nhập tay sau |
| Vị trí | ✅ | Bắt buộc (EMP-BR-002); gắn thời gian thử việc cấu hình |
| Mức lương chính thức | ✅ | Bắt buộc (EMP-BR-002); số tiền trên hồ sơ chính thức |
| Phòng ban | Không | |
| Quản lý trực tiếp | Không | |

### Chuyển trạng thái nhân viên (EMP-BR-005)

| Trạng thái hiện tại | Có ngày hết thử việc? | Đã qua ngày hết thử việc? | NV khóa / nghỉ? | Outcome |
|--------------------|------------------------|---------------------------|------------------|---------|
| Thử việc | Có | Có | Không | **Báo review**; giữ Thử việc. Chính thức **chỉ** khi HR chốt + upload đánh giá |
| Thử việc | Có | Không | Không | Giữ Thử việc (chưa đến kỳ) |
| Thử việc | Không | — | Không | Giữ Thử việc; không vào danh sách review |
| *(Không thử việc)* | — | — | Không | → Chính thức ngay khi tạo hồ sơ |
| Chính thức | — | — | Không | Giữ Chính thức |
| Bất kỳ | — | — | Có | Giữ Khóa / Đã nghỉ việc |

### Import roster (EMP-BR-006)

| Header đúng mẫu | Đủ trường bắt buộc | Định dạng hợp lệ | Không trùng mã/CCCD | Outcome |
|-----------------|--------------------|------------------|----------------------|---------|
| Có | Có | Có | Có | Import thành công |
| Có | Không | Có | Có | Bỏ dòng lỗi, import dòng OK (partial), báo cáo |
| Có | Có | Không | Có | Bỏ dòng lỗi, import dòng OK (partial), báo cáo |
| Có | Có | Có | Không | Bỏ dòng trùng, import dòng OK, báo cáo |
| Không | — | — | — | Từ chối toàn bộ file |

## 5. Nhật ký thay đổi

| Phiên bản | BR ID | Thay đổi | CR Ref |
|-----------|-------|----------|--------|
| 0.1 | — | Khởi tạo DOC-04 employee (8 BR) | — |
| 0.1 | EMP-BR-003 | Bổ sung: tạo đơn nghỉ bắt buộc chọn quản lý trực tiếp | — |
| 0.1 | EMP-BR-006 | Chốt mẫu import roster 10 cột (bảng §4) | — |
| 0.2 | EMP-BR-002 | Bắt buộc thêm vị trí công việc + mức lương chính thức; mẫu import +1 cột lương | DEC-REQ-001 |
| 0.3 | EMP-BR-005 | Bỏ tự chuyển Chính thức; review HR + upload đánh giá + quá trình làm việc | DEC-REQ-002 |
