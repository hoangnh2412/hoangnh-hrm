# Decision Log — Discovery

> Quyết định **có phương án bị loại** (lưu "tại sao"). Schema đầy đủ: minipower pack `docs/decision-log.md`.
> **ID:** `DEC-DIS-NNN` · Không xóa entry cũ — dùng `superseded-by`.

### DEC-DIS-001 — Phép năm hưởng nguyên lương · [2026-08-07]
- Status: accepted
- Context: BRQ-005 công thức "ngày công − nghỉ phép" mâu thuẫn quy định NN (phép năm có lương). Doc-review Blocker 1.
- Options: A) trừ cả phép năm khỏi lương · B) phép năm hưởng lương, chỉ trừ nghỉ không phép
- Decision: chọn B
- Why (loại A vì): vi phạm BLLĐ, khách reject, test sai expect
- Consequences: công thức lương = ngày công − nghỉ không phép + tăng ca; phép năm hưởng nguyên lương
- Affects: module payroll · lương tháng
- Trace: DOC-01 G-003 · DOC-03 BRQ-005/BR-003 · DOC-04 BR
- Confidence: cao

### DEC-DIS-002 — BHXH + thuế TNCN tính trong hệ thống · [2026-08-07]
- Status: accepted
- Context: Major 6 — benefit DOC-01 hứa BHXH nhưng DOC-03 §4.2 để out-of-scope; hỏi rõ anh Hoàng.
- Options: A) ngoài hệ thống (HR tính tay) · B) trong hệ thống, tính tự động
- Decision: chọn B
- Why (loại A vì): anh Hoàng xác nhận "tính cả BHXH + thuế trong hệ thống"; bỏ được tính tay, giảm sai sót
- Consequences: payroll mở rộng tính BHXH (DN + NLĐ) + thuế TNCN lũy tiến; đưa vào scope DOC-03; cần tỷ lệ theo luật tại DOC-04
- Affects: module payroll · DOC-03 scope §4.1 · DOC-04 BR
- Trace: DOC-01 §6.1 · DOC-03 BRQ-005
- Confidence: cao

### DEC-DIS-003 — Mobile là goal riêng, có KPI · [2026-08-07]
- Status: accepted
- Context: Doc-review Blocker 2 — BO-007/BRQ-009 mobile không có goal DOC-01, trace đứt.
- Options: A) goal riêng + KPI · B) chỉ là nền tảng, không goal
- Decision: chọn A
- Why (loại B vì): mobile là yêu cầu rõ từ anh Hoàng (ReactNative) — cần đo lường mức dùng, không để mồ côi trace
- Consequences: thêm G-007 vào DOC-01; trace G-007 → BO-007 → BRQ-009
- Affects: nền tảng mobile · DOC-01 §4 · DOC-03 §3
- Trace: DOC-01 G-007 · DOC-03 BO-007/BRQ-009
- Confidence: cao

### DEC-DIS-004 — Quota phép năm: năm DL, đủ 1 tháng chính thức mới tính, không cộng dồn · [2026-08-07]
- Status: accepted
- Context: Major 9 — cơ sở tính quota phép chưa rõ.
- Options: A) năm DL + pro-rata + carry-over · B) năm DL, đủ 1 tháng làm chính thức mới tính 1 ngày, hết năm không cộng dồn/không quy tiền
- Decision: chọn B
- Why (loại A vì): anh Hoàng xác nhận quy định công ty: không cộng dồn, không quy đổi tiền, phép tính theo tháng làm việc chính thức
- Consequences: leave tính phép theo từng tháng chính thức (12 tháng = 12 ngày); chưa đủ 1 tháng chính thức → 0
- Affects: module leave · DOC-03 BR-004 · DOC-04 BR
- Trace: DOC-03 BR-004 · DEC-DIS-004
- Confidence: cao

### DEC-DIS-005 — Roster hiện hữu nhập bằng import excel hàng loạt · [2026-08-07]
- Status: accepted
- Context: Major 5 — A-006 "không import data cũ" nhưng 50–200 NV hiện hữu cần đưa vào hệ thống.
- Options: A) nhập tay từng NV · B) import excel hàng loạt lúc go-live
- Decision: chọn B (khác A-006: A-006 chỉ là không import lịch sử lương/phép)
- Why (loại A vì): 50–200 NV nhập tay tốn thời gian, sai sót
- Consequences: cần mẫu import roster + trường ngày hết thử việc; tách rõ "không import lịch sử" vs "import roster"
- Affects: module employee · go-live · DOC-03 §4.2/A-006
- Trace: DOC-03 BRQ-001 · DOC-04 BR
- Confidence: cao

### DEC-DIS-006 — Cảnh báo lead-time 7/0/3 ngày · [2026-08-07]
- Status: accepted
- Context: Major 3 — "cảnh báo đúng hạn" không định nghĩa.
- Options: 7/0/3 (thử việc/sinh nhật/lễ) · 14/0/7 · khác
- Decision: chọn 7/0/3
- Why: anh Hoàng chọn; sinh nhật đúng ngày, thử việc trước 7 ngày, lễ trước 3 ngày
- Consequences: alert cấu hình lead-time theo loại; KPI đo được
- Affects: module alert · DOC-01 G-004 · DOC-03 BO-004
- Trace: DOC-01 G-004 · DOC-03 BO-004
- Confidence: cao

### DEC-DIS-007 — Finance/Kế toán tham gia chốt lương · [2026-08-07]
- Status: accepted
- Context: Major 8 — thiếu stakeholder Finance dù payroll Must.
- Options: A) thêm stakeholder Finance · B) HR tự chốt, kế toán nhận file ngoài hệ thống
- Decision: chọn A
- Why (loại B vì): anh Hoàng xác nhận Finance tham gia; payroll cần tiếng nói bên kế toán
- Consequences: thêm SH Finance vào DOC-02; RACI chốt lương có Finance
- Affects: DOC-02 §2/§4 · module payroll
- Trace: DOC-02 · DOC-03 BRQ-005
- Confidence: cao

### DEC-DIS-008 — KPI phê duyệt từng cấp ≤24h giờ làm việc; KPI lương giữ tương đối · [2026-08-07]
- Status: accepted
- Context: Major 3 — KPI ≤24h và "giảm 50%" không đo được.
- Options: A) cả 2 cấp gộp ≤24h · B) từng cấp ≤24h
- Decision: chọn B cho duyệt; giữ "giảm ≥50%" tương đối (chưa có baseline)
- Why: anh Hoàng chọn từng cấp; không có baseline chốt lương hiện tại
- Consequences: DOC-01 G-002 KPI = mỗi cấp phê duyệt ≤24h giờ làm việc
- Affects: DOC-01 §4 · DOC-03 BO-002
- Trace: DOC-01 G-002 · DOC-03 BO-002
- Confidence: vừa

### DEC-DIS-009 — Tích hợp app chấm công thứ 3 sau; MVP dùng import Excel · [2026-08-07]
- Status: accepted
- Context: D-001 — khả năng export/tích hợp app chấm công thứ 3 chưa rõ.
- Options: A) chờ vendor cung cấp thông tin, tích hợp ngay · B) MVP dùng import Excel, tích hợp (API) sau khi vendor cung cấp thông tin
- Decision: chọn B
- Why: anh Hoàng xác nhận "app sẽ cung cấp thông tin để tích hợp sau, hiện tại dùng Excel import" — unblock attendance, không chặn go-live
- Consequences: attendance MVP = import Excel mẫu chuẩn; tích hợp thật ghi nợ change-control/tích hợp sau (DOC-10)
- Affects: module attendance · DOC-03 §4.2/D-001/A-010
- Trace: DOC-03 A-010 · D-001
- Confidence: cao

### DEC-DIS-010 — Timeline ưu tiên nhanh, go-live ASAP · [2026-08-07]
- Status: accepted
- Context: D-003 — timeline chưa chốt; hỏi anh Hoàng.
- Options: A) timeline cụ thể sau · B) ưu tiên nhanh — công ty đang cần dùng ngay
- Decision: chọn B
- Why: anh Hoàng: "càng sớm càng tốt, công ty đang cần dùng luôn" — đưa vào constraint, ảnh hưởng ưu tiên scope/phase ở planning
- Consequences: DOC-01/03 C-003 ghi timeline ASAP; cần chốt nhanh scope MVP, tránh over-engineering; ngân sách vẫn chưa chốt
- Affects: toàn dự án · DOC-14
- Trace: DOC-01 C-003 · DOC-03 C-003
- Confidence: cao

### DEC-DIS-011 — Baseline BL-1.0 không chờ sponsor ABC · [2026-08-07]
- Status: accepted
- Context: D-002 — sponsor/BO ABC chưa xác định, ngân sách chưa chốt; anh Hoàng quyết không chờ.
- Options: A) chờ tên sponsor ABC rồi baseline · B) chốt baseline ngay, ghi nợ approve
- Decision: chọn B
- Why (loại A vì): anh Hoàng quyết "không cần tên sponsor, chốt baseline đi"; tránh chặn tiến độ (timeline ASAP — DEC-DIS-010)
- Consequences: DOC-01–03 baseline BL-1.0; ROI/ngân sách vẫn TBD, ghi nợ phía ABC; thay đổi sau này qua CR
- Affects: DOC-01–03 · baseline v1.0
- Trace: manifest.yaml BL-1.0
- Confidence: cao

<!--
### DEC-DIS-NNN — <tiêu đề> · [YYYY-MM-DD]
- Status: proposed | accepted | superseded-by DEC-xxx
- Context: …
- Options: A … / B … / C …
- Decision: chọn X
- Why (loại B, C vì): …
- Consequences: …
- Affects: <module/hệ thống> · <task/CR> · <release>
- Trace: DOC-XX · {MOD}-FR-xxx · ADR-xxx
- Confidence: cao | vừa | thấp
-->
