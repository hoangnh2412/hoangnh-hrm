# DOC-03 — Tài liệu Yêu cầu Nghiệp vụ (BRD)

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-07 | Hoàng | Draft |

**Tiêu chuẩn tham khảo:** BRD industry practice; align với BABOK business requirements.

---

## 1. Kiểm soát tài liệu

| Phiên bản | Ngày | Tác giả | Thay đổi |
|-----------|------|---------|----------|
| 0.1 | 2026-08-07 | Hoàng | Initial draft |

## 2. Tóm tắt điều hành

Công ty ABC (50–200 nhân viên) cần hệ thống HRM tập trung (web + mobile) thay thế quản lý thủ công (excel, giấy, app chấm công thứ 3 chỉ làm chấm công). MVP gồm đủ **8 nghiệp vụ**: hồ sơ nhân sự, nghỉ phép, chấm công, bảng lương, cảnh báo, onboarding, offboarding, báo cáo biến động. Kết quả mong đợi: dữ liệu tập trung, lương tự động, phê duyệt online, quy trình on/offboarding chuẩn hóa, báo cáo kịp thời.

## 3. Mục tiêu nghiệp vụ

| ID | Objective | Success Metric | Priority |
|----|-----------|----------------|----------|
| BO-001 | Tập trung hóa hồ sơ nhân sự | 100% hồ sơ nhân viên hoạt động trên hệ thống | Must |
| BO-002 | Đơn nghỉ phép duyệt online, 2 cấp (quản lý → HR), mỗi cấp ≤ 24h giờ làm việc | ≥ 90% đơn duyệt trên hệ thống | Must |
| BO-003 | Tự động hóa bảng lương từ chấm công + nghỉ phép + tăng ca + BHXH/thuế TNCN | Giảm ≥ 50% thời gian chốt lương (tương đối); 0 sai sót hệ thống | Must |
| BO-004 | Cảnh báo thử việc / sinh nhật / lễ đúng hạn (7/0/3 ngày) | 100% cảnh báo đúng hạn (hệ thống + email) | Must |
| BO-005 | Chuẩn hóa on/offboarding bằng checklist | 100% quy trình hoàn tất đủ checklist | Must |
| BO-006 | Báo cáo biến động nhân sự định kỳ | Báo cáo hàng tháng, số liệu đúng hệ thống | Must |
| BO-007 | Truy cập được từ mobile (nhân viên) | % nhân viên dùng mobile tạo đơn, xem chấm công/lương | Must |

## 4. Phạm vi

### 4.1 Trong phạm vi

- [x] **employee** — hồ sơ nhân sự: thông tin cá nhân, vị trí công việc, thời gian làm việc, quá trình thử việc
- [x] **leave** — đơn nghỉ phép (phép năm 12 ngày, thai sản, đám ma, đám cưới) + phê duyệt 2 cấp
- [x] **attendance** — chấm công import excel, tính ngày công, tăng ca (giờ × bội số)
- [x] **payroll** — bảng lương: ngày công − nghỉ không phép + tăng ca + **phụ cấp** + **BHXH + thuế TNCN (tự động)**
- [x] **alert** — cảnh báo hết thử việc, sinh nhật, ngày lễ (hệ thống + email)
- [x] **onboarding** — checklist cấp tài khoản, thiết bị, chấm công
- [x] **offboarding** — checklist thu hồi tài khoản, thiết bị
- [x] **report** — báo cáo biến động nhân sự
- [x] Nền tảng: Web (ReactJS) + Mobile (ReactNative), backend .NET 9.0

### 4.2 Ngoài phạm vi

- [ ] Không (MVP): tích hợp trực tiếp app chấm công thứ 3 — vendor sẽ cung cấp thông tin, **tích hợp sau** (DEC-DIS-009); MVP dùng import Excel
- [ ] Không: chấm công bằng thiết bị/biometric tích hợp trực tiếp
- [ ] Không: tuyển dụng / đào tạo / đánh giá KPI (không nằm trong 8 nghiệp vụ)
- [ ] Không: import lịch sử lương/phép cũ (roster hiện hữu thì **có** import excel hàng loạt — DEC-DIS-005)
- [ ] Không: mobile dành cho HR/Admin/Finance (chỉ mobile cho nhân viên — BO-007)

### 4.3 Biên giới & Giao diện

| Hệ thống bên ngoài | Tương tác |
|--------------------|-----------|
| App chấm công thứ 3 | Import file excel chấm công (không realtime) |
| Email server | Gửi cảnh báo (thử việc, sinh nhật, lễ) |
| Người dùng | Nhân viên (web+mobile) · Quản lý · HR · Admin/IT |

## 5. Hiện trạng (AS-IS) — tóm tắt

| Process / Area | Mô tả | Pain points |
|----------------|-------|-------------|
| Hồ sơ nhân sự | Lưu excel rời rạc | Không tập trung, khó truy vết, dễ lỗi thời |
| Nghỉ phép | Đơn giấy, duyệt thủ công | Chậm, thất lạc, không minh bạch |
| Chấm công | App thứ 3 chỉ chấm công | Không gắn với lương/phép |
| Lương | Tính tay từ excel | Tốn thời gian, sai sót khi trừ nghỉ/cộng tăng ca |
| On/offboarding | Không quy trình chuẩn | Sót cấp/thu hồi tài khoản, thiết bị |
| Cảnh báo | Không có | Bỏ lỡ nhân sự hết thử việc, sinh nhật, lễ |
| Báo cáo | Không có | Lãnh đạo không thấy biến động |

## 6. Tương lai (TO-BE) — tóm tắt

| Process / Area | Mô tả | Lợi ích |
|----------------|-------|---------|
| Hồ sơ nhân sự | Một nguồn duy nhất, có cấu trúc | Truy vết, cập nhật dễ |
| Nghỉ phép | Đơn online, duyệt 2 cấp, tự động trừ quota | Nhanh, minh bạch, tự động |
| Chấm công | Import excel mẫu chuẩn, tự tính ngày công/tăng ca | Hết nhập tay |
| Lương | Tính tự động từ dữ liệu hệ thống | Đúng, nhanh |
| On/offboarding | Checklist chuẩn trong hệ thống | Không sót bước |
| Cảnh báo | Tự động đúng hạn (hệ thống + email) | Không bỏ lỡ |
| Báo cáo | Biến động nhân sự xuất định kỳ | Quyết định dựa trên dữ liệu |

## 7. Yêu cầu nghiệp vụ

| ID | Requirement | Rationale | Stakeholder | Priority |
|----|-------------|-----------|-------------|----------|
| BRQ-001 | Lưu và quản lý hồ sơ nhân sự: thông tin cá nhân, vị trí, thời gian làm việc, trạng thái thử việc | Tập trung dữ liệu, phục vụ mọi module khác | HR, Admin | Must |
| BRQ-002 | Nhân viên tạo đơn nghỉ phép (phép năm, thai sản, đám ma, đám cưới); hệ thống kiểm tra quota | Tự phục vụ, đúng quy định | Nhân viên, HR | Must |
| BRQ-003 | Phê duyệt đơn nghỉ 2 cấp: quản lý trực tiếp → HR; từ chối có lý do | Kiểm soát, minh bạch | Quản lý, HR | Must |
| BRQ-004 | Import chấm công từ excel mẫu chuẩn; tính ngày công, giờ tăng ca | Tự động hóa lương | HR | Must |
| BRQ-005 | Tính bảng lương: ngày công − nghỉ **không phép** + tăng ca (giờ × bội số) + **phụ cấp** + **BHXH + thuế TNCN tự động**; phép năm hưởng nguyên lương | Đúng lương, giảm tính tay | HR, Finance | Must |
| BRQ-006 | Cảnh báo hết thử việc (trước 7 ngày), sinh nhật (đúng ngày), ngày lễ (trước 3 ngày) — trong hệ thống + email | Không bỏ lỡ sự kiện | HR, Quản lý | Must |
| BRQ-007 | On/offboarding theo checklist: tài khoản, thiết bị, chấm công | Không sót bước | HR, Admin | Must |
| BRQ-008 | Báo cáo biến động nhân sự (vào/ra, thử việc, nghỉ) | Ra quyết định | Quản lý, Sponsor | Must |
| BRQ-009 | Mobile cho nhân viên: tạo đơn, xem chấm công/lương, nhận cảnh báo | Truy cập mọi lúc | Nhân viên | Must |
| BRQ-010 | Import roster nhân viên hiện hữu bằng excel hàng loạt lúc go-live (gồm ngày hết thử việc) — cơ chế đạt BO-001/G-001 | Đưa 50–200 NV hiện hữu vào hệ thống | HR | Must |
| BRQ-011 | Tính + cấu hình tỷ lệ BHXH/thuế TNCN theo quy định hiện hành | Tuân thủ pháp luật, giảm tính tay | HR, Finance | Must |

## 8. Quy tắc nghiệp vụ (tham chiếu)

→ Chi tiết tại **DOC-04**. Tóm tắt:

| ID | Rule (tóm tắt) |
|----|----------------|
| BR-001 | Ngày công chuẩn = 26 ngày/tháng (A-001) |
| BR-002 | Tăng ca: 1.5× ngày thường · 2× cuối tuần · 3× ngày lễ (A-002) |
| BR-003 | Nghỉ không phép: trừ theo ngày công (A-003) |
| BR-004 | Quota phép năm = 12 ngày/năm dương lịch; **đủ 1 tháng làm việc chính thức mới tích 1 ngày; không cộng dồn, không quy đổi tiền** · thai sản 6 tháng · đám ma 3 ngày · đám cưới 3 ngày (DEC-DIS-004) |
| BR-005 | Phê duyệt nghỉ: quản lý trực tiếp → HR, mỗi cấp ≤ 24h giờ làm việc (A-005) |
| BR-006 | Phép năm hưởng nguyên lương; chỉ trừ công khi nghỉ không phép (DEC-DIS-001) |
| BR-007 | BHXH + thuế TNCN tính tự động theo tỷ lệ quy định hiện hành, cấu hình chỉnh được (DEC-DIS-002) |

## 9. Ràng buộc

| ID | Loại | Mô tả |
|----|------|-------|
| C-001 | Regulatory / Legal | Phép năm, thai sản, BHXH, thuế TNCN theo quy định nhà nước |
| C-002 | Technology | Backend .NET 9.0 · Web ReactJS · Mobile ReactNative |
| C-003 | Budget / Timeline | Ngân sách chưa chốt; **timeline ưu tiên nhanh — go-live ASAP** (DEC-DIS-010) |

## 10. Giả định

| ID | Assumption | Impact if wrong |
|----|------------|-----------------|
| A-001 | Ngày công chuẩn 26 ngày/tháng | Công thức lương sai khắp nơi |
| A-002 | Hệ số tăng ca 1.5×/2×/3× | Số tiền tăng ca sai |
| A-003 | Nghỉ không phép trừ ngày công | Số công/lương sai |
| A-004 | Quota phép 12 ngày/năm DL, đủ 1 tháng chính thức mới tính, không cộng dồn/không quy tiền; thai sản 6 tháng; đám ma/cưới 3 ngày | Quyền lợi nghỉ sai |
| A-005 | Phê duyệt quản lý → HR, mỗi cấp ≤ 24h giờ làm việc | Luồng duyệt không khớp thực tế |
| A-006 | Không import lịch sử lương/phép; **roster hiện hữu import excel hàng loạt** | Go-live kẹt: không đưa được NV hiện hữu vào hệ thống |
| A-007 | Cảnh báo hệ thống + email, lead-time 7/0/3 | Kênh thiếu, người dùng bỏ lỡ |
| A-008 | On/offboarding checklist thủ công | Không tự động cấp/thu hồi tài khoản |
| A-009 | BHXH + thuế TNCN tự động theo quy định hiện hành | Lương sai so với luật, audit lỗi |
| A-010 | MVP dùng import Excel; tích hợp app chấm công thứ 3 (API) sau — vendor cung cấp thông tin | Attendance phải nhập tay nếu không có Excel mẫu chuẩn |

## 11. Phụ thuộc

| ID | Dependency | Owner | Impact |
|----|------------|-------|--------|
| D-001 | Tích hợp app chấm công thứ 3 (API) — dự kiến sau MVP; MVP dùng import Excel | Vendor ABC | Attendance tích hợp thật trì hoãn, không chặn MVP |
| D-002 | Danh sách stakeholder cụ thể của ABC (sponsor, HR lead, Finance) | ABC | Chặn approve DOC-01–03 |
| D-003 | Ngân sách chốt; timeline ưu tiên nhanh (go-live ASAP) | Sponsor ABC | Chặn planning (DOC-14) |

## 12. Thuật ngữ

| Thuật ngữ | Định nghĩa |
|-----------|------------|
| Ngày công chuẩn | Số ngày công quy đổi/tháng (giả định 26) |
| Giờ chuẩn | Số giờ làm việc tiêu chuẩn/ngày (mốc tính tăng ca) — **chốt ở DOC-04** |
| Tăng ca | Giờ làm ngoài giờ chuẩn, nhân bội số (1.5×/2×/3×) |
| 24h giờ làm việc | Thời gian phê duyệt tính theo giờ hành chính — cách đếm **chốt ở DOC-04** |
| Onboarding | Quy trình đưa nhân sự mới vào vận hành (cấp tài khoản, thiết bị, chấm công) |
| Offboarding | Quy trình ngừng làm việc (thu hồi tài khoản, thiết bị) |
| Chốt lương | Quy trình duyệt + đối soát bảng lương tháng trước khi phát (HR, Finance) |
| Biến động nhân sự | Số liệu nhân sự vào/ra, hết thử việc, nghỉ trong kỳ |

## 13. Module index

Đăng ký module / bounded context — mỗi dòng map tới folder `03-modules/{module-id}/`.

| Module ID | MOD prefix | Folder | Priority | In scope | Ghi chú |
|-----------|------------|--------|----------|----------|---------|
| employee | EMP | `03-modules/employee/` | Must | ☒ | Hồ sơ nhân sự |
| leave | LVE | `03-modules/leave/` | Must | ☒ | Đơn nghỉ phép + phê duyệt 2 cấp |
| attendance | ATT | `03-modules/attendance/` | Must | ☒ | Chấm công import excel, tăng ca |
| payroll | PAY | `03-modules/payroll/` | Must | ☒ | Bảng lương + BHXH/thuế TNCN |
| alert | ALR | `03-modules/alert/` | Must | ☒ | Cảnh báo thử việc, sinh nhật, lễ |
| onboarding | OBO | `03-modules/onboarding/` | Must | ☒ | Checklist cấp tài khoản, thiết bị |
| offboarding | OFB | `03-modules/offboarding/` | Must | ☒ | Checklist thu hồi |
| report | RPT | `03-modules/report/` | Must | ☒ | Báo cáo biến động |

> ID ví dụ: `{MOD}-FR-001`, `{MOD}-UC-001`, `{MOD}-BR-001` (MOD = cột MOD prefix). Mở module khi bắt đầu requirements.

## 14. Phê duyệt

| Vai trò | Họ tên | Ngày | Baseline |
|---------|--------|------|----------|
| Business Owner | *(chờ ABC xác định)* | | ☐ |
| Sponsor | *(chờ ABC xác định)* | | ☐ |
