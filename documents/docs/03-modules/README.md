# Modules

Mỗi **module** (bounded context) = một folder con. Nguồn index: [DOC-03 §13](../01-project/DOC-03-brd.md#13-module-index).

## Tạo module mới

```bash
cp -r _template/ {module-id}/
```

Điền `{module-id}` (lowercase, kebab-case) và **MOD prefix** (uppercase, 3–6 ký tự) trong README module.

## Cấu trúc chuẩn mỗi module

| File | DOC |
|------|-----|
| `DOC-04-business-rules.md` | 04 |
| `DOC-05-use-cases.md` | 05 |
| `DOC-06-srs.md` | 06 |
| `DOC-07-acceptance-criteria.md` | 07 |
| `DOC-16-test-strategy.md` | 16 |

Template: [`../../.cursor/skills/minipower/templates/`](../../.cursor/skills/minipower/templates/README.md)

## Module đã tạo (8 / 8 in scope)

| Module ID | MOD | Tóm tắt | Phụ thuộc | Req |
|-----------|-----|---------|-----------|-----|
| [employee](employee/) | EMP | Master hồ sơ NV: cá nhân, vị trí, lương chính thức, thử việc (review HR chốt), import roster. Phục vụ mọi module khác (BRQ-001). | — | 04–07 Draft |
| [leave](leave/) | LVE | Đơn nghỉ phép + duyệt 2 cấp (QLTT → HR); quota phép năm và loại nghỉ đặc biệt. | EMP (hồ sơ, QLTT) | 04–05 Draft · thiếu 06–07 |
| [attendance](attendance/) | ATT | Import excel chấm công (MVP, chưa API vendor); ngày công, tăng ca. | EMP | Khung |
| [payroll](payroll/) | PAY | Bảng lương: ngày công − nghỉ không phép + tăng ca + phụ cấp − BHXH − thuế TNCN. | EMP, ATT, LVE | Khung |
| [alert](alert/) | ALR | Cảnh báo thử việc, sinh nhật, ngày lễ — trong hệ thống + email. | EMP | Khung |
| [onboarding](onboarding/) | OBO | Checklist đưa NV **đã có hồ sơ** vào vận hành: tài khoản, thiết bị, chấm công. | EMP (sau hồ sơ) | Khung |
| [offboarding](offboarding/) | OFB | Checklist thu hồi tài khoản, thiết bị khi nghỉ việc / khóa hồ sơ. | EMP | Khung |
| [report](report/) | RPT | Báo cáo biến động nhân sự (vào/ra, hết thử việc, nghỉ trong kỳ). | EMP (+ module nguồn) | Khung |

**Khung** = folder + README phạm vi; chưa viết DOC-04…07.

Thứ tự nghiệp vụ gợi ý: EMP → OBO → ATT / LVE → PAY / ALR / RPT; OFB khi kết thúc vòng đời hồ sơ.
