# Open Questions — Requirements

> Câu hỏi chưa chốt / ghi nợ cho phase requirements (DOC-04–07, 13). Trả lời xong → chuyển vào BR/FR + `decision-log.md` (nếu có phương án bị loại).

## Bổ sung mới — elicit 2026-08-08 (anh Hoàng)

| # | Module | Câu hỏi / quyết định sơ bộ | Nguồn |
|---|--------|----------------------------|-------|
| RQ-01 | employee | **Ngày vào làm không bắt buộc nhập chính xác.** Nhân viên cũ không nhớ chính xác ngày, chỉ nhớ năm. → Xác nhận cho nhập thiếu? (chỉ năm / trống, đánh dấu "không chính xác") và ảnh hưởng tính phép/thử việc | anh Hoàng |
| RQ-02 | leave | **Khi tạo đơn nghỉ, BẮT BUỘC chọn người duyệt thủ công** (không tự gán từ trường "quản lý trực tiếp" của hồ sơ). Bổ trợ quyết định "quản lý trực tiếp không bắt buộc ở hồ sơ" — hồ sơ có thể để trống, nhưng đơn nghỉ phải có người duyệt. Dựng BR: danh sách người duyệt hợp lệ, chặn duyệt đơn của chính mình, người duyệt không thuộc công ty (đã nghỉ) bị chặn | anh Hoàng |
| RQ-03 | employee | **Thử việc không bắt buộc** — tuyển thẳng chính thức nếu công ty không yêu cầu thử việc. ngày hết thử việc/tính phép chỉ khi có thử việc | anh Hoàng |

## Ghi nợ từ discovery (chuyển tiếp — cần chốt ở DOC-04/13)

- [ ] Tỷ lệ BHXH (DN + NLĐ) + thuế TNCN lũy tiến cụ thể theo luật (BRQ-011 → DOC-04 payroll)
- [ ] Giờ chuẩn/ngày + mốc tăng ca (mốc bắt đầu tính tăng ca) — DOC-04 attendance/payroll
- [ ] Edge case leave: vượt quota phép, từ chối cấp 1 có chuyển cấp 2, đơn overlap, hủy đơn đã duyệt — DOC-04 leave
- [ ] Checklist on/offboarding hạng mục cụ thể (đơn từ · thiết bị · tài khoản · chấm công) — DOC-04 onboarding/offboarding
- [ ] NFR chi tiết (hiệu năng, bảo mật, tuân thủ, khả dụng) — DOC-13
- [ ] Cảnh báo lead-time 7/0/3 — thử việc/sinh nhật/lễ cấu hình theo loại (DEC-DIS-006)
- [ ] Vendor app chấm công thứ 3 — tích hợp sau (API chờ vendor); MVP dùng Excel (DEC-DIS-009)

## Phía công ty ABC (chờ bên ngoài)

- [ ] Sponsor/BOD xác định + signing DOC-01–03
- [ ] Ngân sách dự án
- [ ] ROI / KPI chốt lượng
- [ ] Information API app chấm công thứ 3 (khi có — mở change-control)