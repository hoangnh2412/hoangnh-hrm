# Memory — Discovery

**DOC đích:** 01–03 · **Skill:** `skills/discovery/SKILL.md`

## Trạng thái

| Mục | Giá trị |
|-----|---------|
| Exit discovery | **đạt — DOC-01–03 baseline BL-1.0 (2026-08-07)** |
| Baseline DOC-01–03 | ✅ `02-baseline/v1.0/` (manifest signed — anh Hoàng, DEC-DIS-011) |

## Tóm tắt (cập nhật tại đây)

**Problem:** Công ty ABC (50–200 NV) quản lý nhân sự phân tán — data nhân sự trong excel, chấm công qua app bên thứ 3 (chỉ chấm công), đơn từ nghỉ phép làm giấy. Không có một hệ thống tập trung: lương tính tay, on/offboarding không chuẩn hoá, không cảnh báo thử việc/sinh nhật/lễ, không báo cáo biến động.

**Giải pháp hướng tới (draft):** HRM web + mobile. Backend .NET 9.0 · Web ReactJS · Mobile ReactNative. MVP = 8/8 nghiệp vụ.

**8 nghiệp vụ (đã elicit):**
1. Quản lý danh sách nhân sự: thông tin cá nhân, vị trí công việc, thời gian làm việc
2. Nghỉ phép: phép năm 12 ngày, thai sản, đám ma, đám cưới — HR + quản lý trực tiếp phê duyệt
3. Chấm công: import excel (chưa có mẫu chuẩn — em đề xuất)
4. Bảng lương: ngày công − nghỉ phép + tăng ca (giờ × bội số); "đầy đủ" — chưa chốt chi tiết
5. Cảnh báo hết thời gian thử việc
6. Cảnh báo sinh nhật, ngày lễ
7. Onboarding/offboarding: cấp tài khoản, thiết bị, chấm công — checklist thủ công
8. Báo cáo biến động nhân sự

**Cảnh báo:** kênh = trong hệ thống + email (cả hai).

## Module draft

| Module ID | MOD | Mô tả |
|-----------|-----|-------|
| employee | EMP | Hồ sơ nhân sự, thông tin cá nhân, vị trí, thời gian làm việc, thử việc |
| leave | LVE | Đơn nghỉ phép + phê duyệt 2 cấp (HR + quản lý trực tiếp) |
| attendance | ATT | Chấm công import excel, ngày công, tăng ca |
| payroll | PAY | Bảng lương: ngày công − nghỉ phép + tăng ca |
| alert | ALR | Cảnh báo thử việc, sinh nhật, lễ |
| onboarding | OBO | Checklist cấp tài khoản, thiết bị, chấm công |
| offboarding | OFB | Checklist thu hồi tài khoản, thiết bị |
| report | RPT | Báo cáo biến động nhân sự |

## Stakeholder (sơ bộ)

| Vai trò | Người | Ghi chú |
|---------|-------|---------|
| Sponsor | *(chưa xác định — chờ ABC)* | Quyết định + xác nhận goal/ROI |
| Nhân viên | — | Tạo đơn nghỉ phép, xem chấm công/lương, nhận cảnh báo |
| Quản lý trực tiếp | — | Phê duyệt đơn, xem báo cáo đội nhóm |
| HR | — | Quản lý hồ sơ, duyệt đơn, import chấm công, on/offboarding, lương |
| Admin/IT | — | Cấu hình hệ thống, tài khoản |

## Tham chiếu

| Loại | Link |
|------|------|
| Brainstorm | [`brainstorm/2026-08-07.md`](../../brainstorm/2026-08-07.md) |
| Assets | *(link `assets/...`)* |
| Docs | [`docs/01-project/`](../../docs/01-project/) |

## Open questions

- [x] ~~Ngày công chuẩn/tháng?~~ → **26** (A-001)
- [x] ~~Cấu phần lương "đầy đủ"?~~ → **cơ bản + phụ cấp + tăng ca − nghỉ không phép + BHXH + thuế TNCN (tự động trong hệ thống)** — DEC-DIS-002
- [x] ~~Hệ số tăng ca?~~ → 1.5× / 2× / 3×
- [x] ~~Nghỉ không phép xử lý?~~ → trừ ngày công; **phép năm hưởng nguyên lương** — DEC-DIS-001
- [x] ~~Phê duyệt thứ tự?~~ → quản lý trực tiếp → HR; **từng cấp ≤24h giờ làm việc** — DEC-DIS-008
- [x] ~~Quota nghỉ theo NN?~~ → phép 12 ngày (năm DL, đủ 1 tháng chính thức mới tính, **không cộng dồn/không quy tiền**) · thai sản 6 tháng · đám ma 3 ngày · đám cưới 3 ngày — DEC-DIS-004
- [x] ~~Data excel cũ?~~ → không import lịch sử lương/phép; **roster hiện hữu import excel hàng loạt lúc go-live** — DEC-DIS-005
- [x] ~~App chấm công thứ 3 export?~~ → chờ xác nhận vendor (D-001) — cần hỏi ABC
- [ ] Checklist on/offboarding cụ thể gồm hạng mục gì? (đơn từ, thiết bị, tài khoản — mở ở requirements)
- [ ] Mobile = goal riêng có KPI — **đã chốt, thêm G-007** — DEC-DIS-003
- [ ] Cảnh báo lead-time — **đã chốt 7/0/3** — DEC-DIS-006
- [ ] Finance tham gia chốt lương — **đã chốt, thêm stakeholder** — DEC-DIS-007
- [ ] Timeline + ngân sách — sponsor ABC chưa xác định (D-002/D-003); **timeline đã chốt ưu tiên nhanh, go-live ASAP** (DEC-DIS-010)
- [ ] Vendor app chấm công thứ 3 — **tích hợp sau, MVP dùng Excel** (DEC-DIS-009); chờ vendor cung cấp thông tin API
- [ ] Ghi nợ requirements: NFR chi tiết (DOC-13) · edge case leave (vượt quota, từ chối cấp 1, overlap) · checklist on/offboarding hạng mục cụ thể · giờ chuẩn/ngày (mốc tăng ca) · tỷ lệ BHXH/thuế cụ thể (DOC-04)

## Doc-review findings (2026-08-07 — DOC-01–03, verdict BLOCK)

→ **Đã làm rõ + sửa DOC (2026-08-07), các quyết định ở `decision-log.md`.** Còn lại ghi nợ cho requirements.

- ✅ Blocker 1 — BRQ-005: phép năm hưởng lương, chỉ trừ nghỉ không phép (DEC-DIS-001)
- ✅ Blocker 2 — Mobile = goal riêng G-007 + KPI (DEC-DIS-003)
- ✅ Major 3 — KPI: duyệt từng cấp ≤24h giờ làm việc · chốt lương tương đối · cảnh báo 7/0/3 (DEC-DIS-006, 008)
- ✅ Major 4 — **chưa thêm NFR chi tiết** → ghi nợ DOC-13 (requirements phase)
- ✅ Major 5 — roster import excel hàng loạt (DEC-DIS-005), thêm BRQ-010
- ✅ Major 6 — BHXH/thuế TNCN **trong hệ thống** (DEC-DIS-002), thêm BRQ-011
- ✅ Major 7 — sửa rating SH-001/SH-005 cho khớp quadrant
- ✅ Major 8 — thêm Finance (DEC-DIS-007), vendor app thứ 3 ghi nợ
- ✅ Major 9 — quota phép: năm DL, đủ 1 tháng chính thức, không cộng dồn (DEC-DIS-004); **edge case vượt quota/từ chối cấp 1 ghi nợ DOC-04**
- ✅ Minor 10–13 — đếm module, marker, gộp R-002/R-003, glossary

## Lịch sử ngắn

- **2026-08-07** — Khởi tạo dự án, điền khách hàng Công ty ABC. Elicit 10 câu trọn gói → chốt 8 nghiệp vụ + tech stack (.NET 9 · ReactJS · ReactNative). Ghi brainstorm/2026-08-07.md.
- **2026-08-07** — Anh Hoàng duyệt Assumptions (A-001…A-009). Viết DOC-01 · DOC-02 · DOC-03 (draft) + Module index 8 module. Chờ doc-review → approve → baseline.
- **2026-08-07** — Doc-review BLOCK (2 Blocker + 7 Major). Làm rõ 10 câu → 8 quyết định (DEC-DIS-001…008). Sửa DOC-01/02/03 theo findings. Còn nợ: NFR (DOC-13), edge case leave, vendor app thứ 3, sponsor + ROI ABC.
- **2026-08-07** — Blocker: sponsor/BO ABC chưa xác định; ngân sách chưa chốt. Quyết định mới: tích hợp app chấm công sau, MVP dùng Excel (DEC-DIS-009); timeline ưu tiên nhanh go-live ASAP (DEC-DIS-010). Cập nhật DOC-01/03.
- **2026-08-07** — Re-review DOC-01–03: **✅ PASS điều kiện, 0 Blocker**. Sửa Major (phụ cấp vào BRQ-005/G-003) + 6 Minor (G-007 KPI, Finance Interest→H, BRQ-010 trace, glossary 24h, note §3/§6.1–6.3). Sẵn sàng baseline — chờ sponsor ABC (ngoài phạm vi DOC).
- **2026-08-07** — **Baseline BL-1.0** (DEC-DIS-011): copy DOC-01–03 → `02-baseline/v1.0/` + manifest. Exit discovery đạt. Ghi nợ phía ABC: sponsor/BO, ngân sách, ROI. Discovery xong → sẵn sàng requirements.
