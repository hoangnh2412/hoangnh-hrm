# DOC-01 — Tầm nhìn & Hồ sơ kinh doanh

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-07 | Hoàng | Draft |
| 1.0 | 2026-08-07 | Hoàng | **Baseline (BL-1.0)** |

**Tiêu chuẩn tham khảo:** Business Case (PMI, BABOK); khung Vision phổ biến trong quản lý dự án.

---

## 1. Tóm tắt điều hành

Công ty ABC (50–200 nhân viên) hiện quản lý nhân sự phân tán: hồ sơ nhân sự lưu trong excel, chấm công qua app bên thứ 3 (chỉ làm chấm công), đơn từ nghỉ phép làm giấy, lương tính tay. Không có hệ thống tập trung nên việc phê duyệt đơn, tính lương, theo dõi on/offboarding, cảnh báo thử việc/sinh nhật/lễ và báo cáo biến động đều thủ công, dễ sai sót và chậm.

Đề xuất xây dựng **hệ thống quản lý nhân sự (HRM)** nền web + mobile, đầy đủ 8 nghiệp vụ: hồ sơ nhân sự, nghỉ phép, chấm công (import excel), bảng lương, cảnh báo, onboarding, offboarding, báo cáo biến động. Mục tiêu: tập trung hóa dữ liệu, tự động hóa lương & phê duyệt, chuẩn hóa quy trình, giảm thao tác thủ công.

## 2. Tuyên bố tầm nhìn

**Tầm nhìn:** Một hệ thống HRM tập trung, thân thiện (web + mobile), nơi toàn bộ vòng đời nhân sự — từ onboarding, hồ sơ, chấm công, nghỉ phép, lương đến offboarding — được quản lý một cửa, minh bạch, truy vết được và ít thao tác thủ công nhất.

**Mission liên quan:** Giúp bộ phận HR Công ty ABC vận hành chính xác, kịp thời; người lao động tự phục vụ (tạo đơn, xem chấm công/lương); lãnh đạo có báo cáo biến động nhân sự kịp thời để ra quyết định.

## 3. Vấn đề nghiệp vụ

| Mục | Nội dung |
|-----|----------|
| **Vấn đề hiện tại** | Nhân viên muốn nghỉ phép phải làm đơn giấy, chờ HR + quản lý duyệt thủ công (chậm, dễ thất lạc). HR tính lương tay từ excel chấm công — tốn thời gian, dễ sai khi trừ nghỉ phép/cộng tăng ca. Không ai theo dõi sớm nhân sự hết thử việc, sinh nhật, ngày lễ. On/offboarding không có checklist chuẩn nên hay sót cấp/thu hồi tài khoản, thiết bị. Không có báo cáo biến động nhân sự để lãnh đạo theo dõi. |
| **Root cause** | Không có hệ thống dữ liệu tập trung; quy trình chuẩn hóa chưa có; phụ thuộc hoàn toàn thao tác thủ công + excel rời rạc. |
| **Impact** | Lương sai sót → mất lòng tin, rủi ro pháp lý lao động. Phê duyệt chậm → gián đoạn công việc. Thiếu báo cáo → quyết định nhân sự thiếu cơ sở. (Số liệu định lượng: **TBD** — cần sponsor cung cấp.) |

## 4. Mục tiêu nghiệp vụ & Chỉ số thành công

| Goal ID | Mục tiêu | KPI / Success Criteria | Target | Timeline |
|---------|----------|------------------------|--------|----------|
| G-001 | Tập trung dữ liệu nhân sự vào một hệ thống | 100% hồ sơ nhân viên đang hoạt động có trong hệ thống | 100% | TBD |
| G-002 | Đơn nghỉ phép duyệt online thay giấy | % đơn duyệt trên hệ thống; **mỗi cấp phê duyệt ≤ 24h giờ làm việc** (quản lý, HR) | ≥ 90% đơn; mỗi cấp ≤ 24h | TBD |
| G-003 | Tự động hóa tính lương từ chấm công + nghỉ phép + tăng ca + phụ cấp + BHXH/thuế TNCN | Thời gian chốt lương/tháng giảm (tương đối, chưa có baseline); tỷ lệ sai sót | Giảm ≥ 50% thời gian; 0 sai sót hệ thống | TBD |
| G-004 | Cảnh báo kịp thời thử việc / sinh nhật / lễ | Cảnh báo đúng hạn cho HR/quản lý — **thử việc trước 7 ngày · sinh nhật đúng ngày · lễ trước 3 ngày** | 100% đúng hạn | TBD |
| G-005 | Chuẩn hóa on/offboarding bằng checklist | % quy trình hoàn tất đủ checklist | 100% | TBD |
| G-006 | Có báo cáo biến động nhân sự định kỳ | Báo cáo xuất đúng kỳ, đúng số liệu hệ thống | Hàng tháng | TBD |
| G-007 | Nhân viên truy cập mobile (tạo đơn, xem chấm công/lương) | % nhân viên hoạt động dùng mobile tạo đơn/xem chấm công/lương | TBD | TBD |

> Timeline + số liệu định lượng chờ sponsor chốt (§3, §6.1–6.3).

## 5. Giải pháp đề xuất (Tổng quan)

Hệ thống HRM web + mobile với 8 module: **employee** (hồ sơ nhân sự), **leave** (đơn nghỉ phép + phê duyệt 2 cấp), **attendance** (chấm công import excel), **payroll** (bảng lương + BHXH/thuế TNCN), **alert** (cảnh báo), **onboarding** (checklist), **offboarding** (checklist), **report** (biến động nhân sự).

- Backend: **.NET 9.0** · Frontend web: **ReactJS** · Mobile: **ReactNative**.
- Nhân viên dùng mobile/web để tạo đơn, xem chấm công, lương, nhận cảnh báo; HR/quản lý duyệt đơn, import chấm công, chốt lương, chạy báo cáo.
- Chấm công kế thừa dữ liệu từ app chấm công thứ 3 qua import file excel (chưa có mẫu chuẩn — sẽ xây mẫu chuẩn).

## 6. Hồ sơ kinh doanh

### 6.1 Lợi ích

| Benefit | Loại (Tangible / Intangible) | Ước lượng |
|---------|------------------------------|-----------|
| Giảm thời gian chốt lương, giảm sai sót | Tangible | TBD |
| Giảm chi phí giấy tờ, lưu trữ đơn | Tangible | TBD |
| Phê duyệt nghỉ phép nhanh, minh bạch | Intangible | — |
| Tuân thủ quy định lao động (phép năm, BHXH) | Intangible | — |
| Ra quyết định nhân sự dựa trên dữ liệu | Intangible | — |

### 6.2 Chi phí

| Hạng mục | Năm 1 | Năm 2+ | Ghi chú |
|----------|-------|--------|---------|
| CAPEX — phát triển hệ thống | TBD | — | Chờ estimate (DOC-14) |
| OPEX — hosting, duy trì | TBD | TBD | Self-host/cloud chưa chốt |

### 6.3 ROI / Thời gian hoàn vốn (nếu áp dụng)

| Chỉ số | Giá trị |
|--------|---------|
| ROI | TBD — chờ chi phí + lợi ích định lượng |
| Payback period | TBD |

## 7. Giả định & Ràng buộc

| ID | Loại | Mô tả |
|----|------|-------|
| A-001 | Assumption | Ngày công chuẩn = 26 ngày/tháng |
| A-002 | Assumption | Tăng ca: 1.5× ngày thường · 2× cuối tuần · 3× ngày lễ |
| A-003 | Assumption | Nghỉ không phép: trừ theo ngày công; **phép năm hưởng nguyên lương** |
| A-004 | Assumption | Quota nghỉ: phép năm 12 ngày/năm dương lịch — **đủ 1 tháng làm chính thức mới tính 1 ngày, không cộng dồn, không quy đổi tiền** · thai sản 6 tháng · đám ma 3 ngày · đám cưới 3 ngày |
| A-005 | Assumption | Quy trình phê duyệt nghỉ: quản lý trực tiếp → HR; **mỗi cấp ≤ 24h giờ làm việc** |
| A-006 | Assumption | Không import lịch sử lương/phép cũ; **roster hiện hữu (50–200 NV) import excel hàng loạt lúc go-live** |
| A-007 | Assumption | Cảnh báo gửi cả trong hệ thống + email; lead-time: thử việc 7 ngày · sinh nhật 0 ngày · lễ 3 ngày |
| A-008 | Assumption | On/offboarding dùng checklist thủ công trong hệ thống |
| A-009 | Assumption | BHXH + thuế TNCN tính tự động trong hệ thống, theo quy định nhà nước hiện hành |
| C-001 | Constraint | Quy định nhà nước về phép năm, thai sản, BHXH, thuế TNCN |
| C-002 | Constraint | Tech: .NET 9.0 · ReactJS · ReactNative (theo yêu cầu) |
| C-003 | Constraint | Ngân sách chưa chốt; **timeline ưu tiên nhanh — công ty đang cần dùng ngay (go-live ASAP)** |

## 8. Rủi ro cấp cao

| ID | Rủi ro | Mức | Mitigation |
|----|--------|-----|------------|
| R-001 | Công thức lương chi tiết phụ thuộc tỷ lệ BHXH/thuế TNCN theo luật (thay đổi theo năm) | H | Cấu hình tỷ lệ dễ chỉnh, không hardcode; chốt tại DOC-04 |
| R-002 | Chưa có mẫu excel chấm công chuẩn + chưa xác nhận khả năng export của app thứ 3 | M | Em đề xuất format mẫu; xác nhận export với vendor app chấm công trước requirements |
| R-003 | Phụ thuộc 1 người (anh Hoàng) vừa PM/BA/SA/DEV/DevOps | M | Ghi nhận trong kế hoạch; chốt scope MVP rõ |
| R-004 | Không có sponsor/timeline chốt → dự án trôi | M | Xác định sponsor ABC + chốt timeline ở DOC-14 |

## 9. Khuyến nghị & Quyết định

| Quyết định | Proceed / Defer / Reject |
|------------|--------------------------|
| **Khởi động dự án HRM ABC** | Proceed *(đề xuất — chờ sponsor xác nhận)* |
| **Approver** | Sponsor ABC *(chưa xác định)* |
| **Date** | TBD |

## 10. Phê duyệt

| Vai trò | Họ tên | Chữ ký | Ngày |
|---------|--------|--------|------|
| Sponsor | *(chờ ABC xác định)* | | |
| Business Owner | *(chờ ABC xác định)* | | |
