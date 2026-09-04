# DOC-07 — Tiêu chí chấp nhận — Module employee

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.2 | 2026-09-05 | BA | Draft |

**Tiêu chuẩn tham khảo:** Gherkin (Given/When/Then) — BDD.  
**MOD prefix:** `EMP` · Trace DOC-06 `EMP-FR-001`…`006` · **EMP-BR-002 / DEC-REQ-001** (6 trường, import 11 cột). **EMP-AC-005 / DEC-REQ-002:** không job tự chuyển — đã đồng bộ DOC-04/05/06.

---

## 1. Mục đích

AC Must cho module **employee** (MVP web). QA/DEV dùng để viết test (DOC-16). Đối tượng: QA, DEV, HR owner.

## 2. Danh mục tiêu chí chấp nhận

| AC ID | FR ID | UC ID | Mô tả ngắn | Priority |
|-------|-------|-------|------------|----------|
| EMP-AC-001 | EMP-FR-001 | EMP-UC-001 | Tạo hồ sơ: 6 trường bắt buộc, sinh mã, trạng thái khởi đầu | Must |
| EMP-AC-002 | EMP-FR-002 | EMP-UC-002 | Cập nhật hồ sơ + audit; không đổi mã NV | Must |
| EMP-AC-003 | EMP-FR-003 | EMP-UC-003 | Import roster 11 cột: partial + báo cáo; header sai từ chối cả file | Must |
| EMP-AC-004 | EMP-FR-004 | EMP-UC-004 | Xem/tìm/lọc đúng phạm vi quyền | Must |
| EMP-AC-005 | EMP-FR-005 | EMP-UC-005 | Báo đến kỳ review thử việc; HR chốt Chính thức + upload đánh giá; không tự chuyển | Must |
| EMP-AC-006 | EMP-FR-006 | EMP-UC-005 | Nghỉ việc / Khóa — không xóa vật lý | Must |

**6 trường bắt buộc (EMP-BR-002):** họ tên, ngày sinh, CCCD, giới tính, vị trí công việc, mức lương chính thức. Ngày vào làm **không** bắt buộc.

## 3. Kịch bản Gherkin

### EMP-AC-001 — Tạo hồ sơ nhân viên (EMP-FR-001)

```gherkin
Feature: Tạo hồ sơ nhân viên
  As ACT-HR
  I want tạo hồ sơ hợp lệ và nhận mã NV
  So that master data phục vụ các module khác

  Scenario: Happy — đủ 6 trường, chính thức ngay
    Given ACT-HR đã đăng nhập có quyền HR
    And danh mục vị trí tồn tại
    When HR lưu hồ sơ với họ tên, ngày sinh, CCCD mới, giới tính, vị trí, mức lương chính thức
    And chọn chế độ Chính thức ngay
    Then hệ thống sinh mã NV duy nhất, không trùng hồ sơ kể cả đã khóa
    And trạng thái = Chính thức
    And hồ sơ được lưu
    And có audit log tạo hồ sơ

  Scenario: Happy — thử việc có ngày vào làm
    Given ACT-HR tạo hồ sơ đủ 6 trường bắt buộc
    And chọn Thử việc
    And có ngày vào làm
    When hệ thống lưu
    Then ngày hết thử việc = ngày vào + thời gian thử việc của vị trí (mặc định 60 ngày, tối đa 60)
    And trạng thái = Thử việc
    And mã NV được cấp

  Scenario: Negative — thiếu một trường bắt buộc
    Given ACT-HR mở form tạo hồ sơ
    When lưu thiếu vị trí công việc hoặc mức lương chính thức (hoặc họ tên / ngày sinh / CCCD / giới tính)
    Then hệ thống chặn lưu
    And highlight trường thiếu
    And không sinh mã NV

  Scenario: Negative — CCCD trùng hồ sơ chưa khóa
    Given đã có hồ sơ chưa khóa với CCCD "001"
    When HR tạo hồ sơ mới cùng CCCD "001" đủ 6 trường
    Then chặn lưu, báo trùng CCCD
    And không tạo hồ sơ mới

  Scenario: Negative — quản lý không hợp lệ
    Given HR khai quản lý trực tiếp là chính hồ sơ đang tạo, hoặc NV không active
    When lưu
    Then chặn lưu (EMP-BR-003)

  Scenario: Negative — thử việc thiếu ngày hết thử việc
    Given chọn Thử việc, không có ngày vào làm, chưa nhập ngày hết thử việc
    When lưu
    Then chặn lưu đến khi có ngày hết thử việc nhập tay
```

### EMP-AC-002 — Cập nhật hồ sơ (EMP-FR-002)

```gherkin
Feature: Cập nhật hồ sơ nhân viên
  As ACT-HR
  I want sửa hồ sơ và có nhật ký
  So that audit đủ ai / trường / cũ–mới / khi nào

  Scenario: Happy — sửa thành công + audit
    Given hồ sơ tồn tại với mã NV "E001"
    And ACT-HR có quyền
    When HR đổi họ tên và mức lương chính thức rồi lưu
    Then dữ liệu mới được lưu
    And mã NV vẫn là "E001"
    And audit log ghi người sửa, trường đổi, giá trị cũ và mới, thời điểm

  Scenario: Negative — xóa trường bắt buộc khi sửa
    Given hồ sơ đang đủ 6 trường bắt buộc
    When HR xóa vị trí hoặc mức lương chính thức rồi lưu
    Then chặn lưu, dữ liệu giữ nguyên

  Scenario: Negative — không phải HR
    Given ACT-NV hoặc ACT-QLTT
    When họ gọi thao tác sửa hồ sơ
    Then hệ thống từ chối (EMP-BR-007)
    And dữ liệu không đổi
```

### EMP-AC-003 — Import roster (EMP-FR-003)

```gherkin
Feature: Import roster excel
  As ACT-HR
  I want import hàng loạt lúc go-live
  So that roster hiện hữu vào hệ thống (A-006)

  Scenario: Happy — header 11 cột, toàn dòng hợp lệ
    Given ACT-HR có quyền
    And file excel header đúng mẫu: Mã NV, Họ tên, Ngày sinh, Giới tính, CCCD, Ngày vào làm, Ngày hết thử việc, Vị trí, Mức lương chính thức, Phòng ban, Quản lý trực tiếp
    And mọi dòng đủ bắt buộc theo EMP-BR-002, định dạng hợp lệ, không trùng mã NV/CCCD
    When HR tải file
    Then mọi dòng hợp lệ được import
    And dòng trống mã NV được sinh mã; dòng có mã chưa tồn tại thì giữ mã file
    And báo cáo số dòng OK = số dòng file
    And có audit log import

  Scenario: Happy — partial import
    Given file header đúng
    And một dòng thiếu mức lương chính thức, các dòng khác hợp lệ
    When import
    Then dòng lỗi không được import
    And dòng hợp lệ được import
    And báo cáo liệt kê số dòng + lý do dòng lỗi

  Scenario: Negative — sai header
    Given file thiếu cột "Mức lương chính thức" hoặc sai tên cột mẫu
    When import
    Then từ chối toàn bộ file
    And không import dòng nào
```

### EMP-AC-004 — Xem / tìm / lọc theo quyền (EMP-FR-004)

```gherkin
Feature: Xem hồ sơ theo quyền
  As ACT-HR / ACT-QLTT / ACT-NV
  I want chỉ thấy hồ sơ trong phạm vi
  So that không lộ dữ liệu ngoài quyền

  Scenario: Happy — HR xem tất cả, tìm theo mã NV
    Given ACT-HR đăng nhập
    When tìm theo mã NV hoặc họ tên hoặc lọc trạng thái
    Then kết quả chỉ gồm hồ sơ khớp trong toàn hệ thống (kể cả cần xem khóa theo UI HR)

  Scenario: Happy — NV chỉ hồ sơ mình
    Given ACT-NV đăng nhập
    When mở hồ sơ của tôi
    Then chỉ thấy hồ sơ của chính mình
    And không đổi dữ liệu

  Scenario: Negative — NV xem hồ sơ người khác
    Given ACT-NV
    When truy cập chi tiết hồ sơ mã NV khác
    Then từ chối, không trả dữ liệu hồ sơ đó

  Scenario: Negative — QLTT xem ngoài cấp dưới
    Given ACT-QLTT
    When mở hồ sơ nhân viên không phải cấp dưới
    Then từ chối (EMP-BR-007)
```

### EMP-AC-005 — Review thử việc → Chính thức (EMP-FR-005)

Quy trình (DEC-REQ-002): hệ thống **chỉ báo** NV đến kỳ review → HR báo QLTT *(SOP — MVP không bắt buộc màn hình đánh giá của QLTT)* → QLTT đánh giá, báo HR → HR **chuyển Chính thức** + **upload kết quả đánh giá** → hệ thống cập nhật **quá trình làm việc** để PAY kỳ lương tháng sau dùng kết quả thử việc.

```gherkin
Feature: Review thử việc (không tự chuyển trạng thái)
  As ACT-HR
  I want được báo NV đến kỳ review và tự chốt Chính thức kèm file đánh giá
  So that lương tháng sau đúng kết quả thử việc

  Scenario: Happy — hệ thống báo đến kỳ review
    Given hồ sơ trạng thái Thử việc, chưa khóa, chưa nghỉ việc
    And đã có ngày hết thử việc
    And ngày hiện tại ≥ ngày hết thử việc
    When hệ thống chạy kiểm tra đến kỳ review
    Then hồ sơ xuất hiện danh sách / cảnh báo "đến kỳ review thử việc"
    And trạng thái vẫn là Thử việc
    And hệ thống không tự đổi sang Chính thức

  Scenario: Happy — HR chốt Chính thức + upload đánh giá
    Given hồ sơ Thử việc đang trong danh sách đến kỳ review
    And ACT-HR có quyền
    When HR chuyển trạng thái = Chính thức
    And HR upload file kết quả đánh giá thử việc
    Then trạng thái = Chính thức
    And file đánh giá được lưu gắn hồ sơ
    And quá trình làm việc ghi mốc kết thúc thử việc + kết quả (để PAY kỳ sau)
    And có audit log (người chốt, thời điểm, file)

  Scenario: Negative — đến hạn nhưng không có thao tác HR
    Given hồ sơ Thử việc, ngày hết thử việc đã qua
    When không có ACT-HR chốt Chính thức
    Then trạng thái giữ Thử việc
    And không phát sinh mốc quá trình làm việc kiểu "đã chính thức"

  Scenario: Negative — chốt Chính thức thiếu file đánh giá
    Given hồ sơ Thử việc đến kỳ review
    When HR chuyển Chính thức nhưng không upload kết quả đánh giá
    Then chặn chuyển trạng thái
    And giữ Thử việc

  Scenario: Negative — chưa có ngày hết thử việc
    Given hồ sơ Thử việc không có ngày hết thử việc
    When hệ thống lập danh sách đến kỳ review
    Then hồ sơ không vào danh sách review
    And giữ Thử việc
    And HR cần bổ sung ngày hết thử việc trước

  Scenario: Negative — đã Khóa hoặc Đã nghỉ việc
    Given hồ sơ Khóa hoặc Đã nghỉ việc
    When kiểm tra review hoặc HR cố chuyển Chính thức
    Then không đưa vào danh sách review
    And không đổi sang Chính thức
```

### EMP-AC-006 — Nghỉ việc / Khóa (EMP-FR-006)

```gherkin
Feature: Nghỉ việc và khóa hồ sơ
  As ACT-HR
  I want kết thúc hoặc ẩn hồ sơ mà không mất lịch sử
  So that audit và lương/phép quá khứ còn truy được

  Scenario: Happy — nghỉ việc từ Chính thức
    Given hồ sơ Chính thức, ACT-HR có quyền
    When HR chọn Nghỉ việc
    Then trạng thái = Đã nghỉ việc
    And toàn bộ trường dữ liệu vẫn còn
    And có audit log

  Scenario: Happy — yêu cầu xóa thành Khóa
    Given hồ sơ tồn tại (kể cả có dữ liệu lương/chấm công/phép)
    When HR yêu cầu xóa hồ sơ
    Then trạng thái = Khóa
    And không xóa bản ghi vật lý
    And hồ sơ không còn trong danh sách hoạt động mặc định

  Scenario: Negative — chuyển trạng thái không hợp lệ
    Given hồ sơ đã Khóa
    When HR chọn Nghỉ việc hoặc chuyển Chính thức
    Then chặn, báo lý do
    And trạng thái giữ Khóa
```

## 4. Checklist AC (NFR tóm tắt DOC-06 §5 — DOC-13 skip MVP)

| AC ID | Criteria | Pass / Fail | Tester | Date |
|-------|----------|-------------|--------|------|
| EMP-AC-NFR-001 | Danh sách NV (&lt;200) load &lt; 2s; tìm kiếm &lt; 1s | | | |
| EMP-AC-NFR-002 | NV/QLTT không sửa được hồ sơ | | | |
| EMP-AC-NFR-003 | Mọi tạo/sửa/import/lifecycle có audit log | | | |
| EMP-AC-NFR-004 | Mã NV duy nhất; CCCD không trùng hồ sơ chưa khóa | | | |

## 5. Định nghĩa hoàn thành (DoD)

- [ ] 100% EMP-AC-001…006 Must pass (happy + negative đã liệt kê)
- [ ] EMP-AC-NFR-001…004 pass hoặc ghi nợ có chủ
- [ ] DOC-16 map từng AC → test case
- [ ] Sign-off REQ owner (anh Hoàng) — chưa

## 6. Truy vết

| AC ID | FR | UC | BR | Test Case (DOC-16) |
|-------|----|----|----|---------------------|
| EMP-AC-001 | EMP-FR-001 | EMP-UC-001 | EMP-BR-001/002/003/004/007 | EMP-TC-001 |
| EMP-AC-002 | EMP-FR-002 | EMP-UC-002 | EMP-BR-002/003/007 | EMP-TC-002 |
| EMP-AC-003 | EMP-FR-003 | EMP-UC-003 | EMP-BR-001/002/004/006/007 | EMP-TC-003 |
| EMP-AC-004 | EMP-FR-004 | EMP-UC-004 | EMP-BR-007 | EMP-TC-004 |
| EMP-AC-005 | EMP-FR-005 | EMP-UC-005 | EMP-BR-005 · DEC-REQ-002 | EMP-TC-005 |
| EMP-AC-006 | EMP-FR-006 | EMP-UC-005 | EMP-BR-005/008 | EMP-TC-006 |

## 7. Nhật ký thay đổi

| Phiên bản | AC ID | Thay đổi | CR Ref |
|-----------|-------|----------|--------|
| 0.1 | EMP-AC-001…006 | Khởi tạo từ DOC-06; bắt buộc 6 trường + import 11 cột (DEC-REQ-001) | — |
| 0.2 | EMP-AC-005 | Bỏ job tự chuyển; review HR + upload đánh giá + quá trình làm việc (DEC-REQ-002) | — |
| 0.2 | — | Ghi nhận đồng bộ DOC-04 v0.3 · DOC-05 v0.2 · DOC-06 v0.2 | DEC-REQ-001/002 |
