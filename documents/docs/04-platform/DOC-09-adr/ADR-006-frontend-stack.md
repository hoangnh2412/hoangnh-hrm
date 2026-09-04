# ADR-006 — Frontend: ReactJS + TypeScript + Vite + Ant Design 5

| Phiên bản | Ngày | Tác giả | Trạng thái |
|-----------|------|---------|------------|
| 0.1 | 2026-08-22 | em (Minipower AI) | Draft |

## ADR-006 — Frontend: ReactJS + TypeScript + Vite + Ant Design 5

| Mục | Giá trị |
|-----|---------|
| **Status** | Proposed — PENDING: chờ anh Hoàng chốt AntD hay MUI (Q3) |
| **Date** | 2026-08-22 |
| **Deciders** | anh Hoàng (SA) — chờ duyệt |
| **Consulted** | em (Minipower AI — soạn thảo) |
| **Informed** | — |

### Bối cảnh

- Ràng buộc C-002: frontend ReactJS.
- HRM là app admin CRUD-heavy: bảng nhân viên, form hợp đồng, lịch chấm công, đơn nghỉ phép → table/form là 80% UI.
- Prototype DOC-19 đã hoãn theo quyết định MVP → không có wireframe riêng, UI pattern dựa vào component library mặc định.
- Team nhỏ, cần stack build nhanh.

### Quyết định (đề xuất)

- **ReactJS 18 + TypeScript** (strict mode).
- Build tool: **Vite**.
- Component library: **Ant Design 5** (đề xuất) — chốt tại Q3; nếu anh Hoàng chọn MUI thì thay mục này, phần còn lại của ADR giữ nguyên.
- Data fetching/caching: **TanStack Query**; routing: React Router.

### Lý do

- AntD sinh ra cho admin dashboard: Table có sort/filter/pagination sẵn, Form có validation, locale tiếng Việt built-in.
- Vite dev server nhanh, config tối thiểu so với webpack.

### Các phương án đã xem xét

| Option | Pros | Cons |
|--------|------|------|
| A — AntD 5 *(đề xuất)* | Table/Form mạnh nhất · locale vi sẵn · phù hợp admin | Visual hơi giống nhau giữa các app AntD |
| B — MUI | Hiện đại hơn về visual | DataGrid nâng cao nằm bản Pro trả phí; form tốn công hơn |
| C — Tailwind + headless tự dựng | Tự do design hoàn toàn | Tốn công lớn nhất — không hợp team 1–2 dev, không có prototype |

### Hệ quả

**Tích cực:**
- Tốc độ dựng màn hình CRUD nhanh; đồng bộ ngôn ngữ UI với AntD mặc định thay wireframe bị hoãn.

**Tiêu cực / Đánh đổi:**
- Bundle size lớn hơn Tailwind — chấp nhận được trên intranet on-prem.

**Rủi ro:**
- Lock-in component library: nếu đổi lib sau này phải viết lại UI layer → chấp nhận vì MVP ưu tiên tốc độ.

### Tuân thủ & Tác động NFR

| NFR ID | Impact |
|--------|--------|
| EMP-NFR-001..005 | Đáp ứng ở quy mô người dùng 50–200 NV (DOC-13 hoãn) |

### Truy vết

| SRS / Integration | Ghi chú |
|-------------------|---------|
| C-002 | Frontend ReactJS |
| DOC-19 (hoãn) | Wireframe hoãn — UI pattern theo AntD mặc định |
| ADR-005 | SPA gọi REST `/api/v1` qua TanStack Query |
