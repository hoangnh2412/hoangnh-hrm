# Open Questions — Architecture (DOC-09)

Cập nhật: 2026-08-22 · Chờ anh Hoàng trả lời trọn gói Q1–Q5 trước khi flip ADR Proposed → Accepted.

## Câu hỏi chờ chốt

| # | Câu hỏi | Ảnh hưởng | Đề xuất mặc định |
|---|---------|-----------|------------------|
| Q1 | PostgreSQL hay SQL Server? | ADR-002 · DOC-11 | PostgreSQL 16 |
| Q2 | Chấp nhận thêm module nền tảng auth ngoài 8 module nghiệp vụ? | ADR-003 · cấu trúc solution | Có |
| Q3 | Ant Design hay MUI cho frontend? | ADR-006 | AntD 5 |
| Q4 | Hạ tầng ABC có chạy được Docker Compose on-prem? | ADR-007 | Ok — verify hạ tầng trước go-live |
| Q5 | Thứ tự code employee trước? Có viết leave DOC-06 luôn? | Kế hoạch thực thi | Employee trước · viết leave DOC-06 ngay sau |

## Nợ ghi nhận (debt)

| Nợ | Nguồn | Đáo hạn |
|----|-------|---------|
| DOC-13 NFR skip cả 2 module | Quyết định MVP 2026-08-21 | Sau MVP |
| DOC-19 prototype skip employee | Quyết định MVP 2026-08-21 | Sau MVP |
| leave chưa có DOC-06 SRS | Bypass flow leave | Trước khi code leave |
| employee DOC-06 chỉ Draft | Chưa review chốt | Trước khi code employee |
| D-002 stakeholder ABC chưa xác định | BRD | Trước baseline / sign-off ADR |
| D-003 ngân sách chưa chốt | BRD | Trước go-live (cấu hình server trong ADR-007 là giả định) |
