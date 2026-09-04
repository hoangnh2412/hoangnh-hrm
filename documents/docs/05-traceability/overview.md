# Overview — minipower-hrm

> **Đọc trong ~30 giây** — rollup tiến độ dự án. Chi tiết requirement → [`trace-matrix.md`](trace-matrix.md) · từng DOC → [`doc-registry.md`](doc-registry.md).

| Meta | Giá trị |
|------|---------|
| **Cập nhật** | 2026-09-05 |
| **Người rollup** | PM / anh Hoàng |
| **Nguồn sync** | DOC-03 · `docs/03-modules/README.md` · `memory/requirements/` · doc-registry |

---

## Snapshot

| Chỉ số | Giá trị |
|--------|---------|
| **Phase hiện tại** | requirements |
| **Baseline** | DOC-01–03 · BL-1.0 (2026-08-07) |
| **Module (in scope)** | 8 |
| **Module đã mở folder** | 8 / 8 |
| **FR Must (tổng)** | *(chưa rollup `trace-matrix`)* |
| **FR đã baseline** | 0 |
| **FR đang phân tích** | 6 (`EMP-FR-001`…`006`, DOC-06 Draft) |
| **FR chưa mở** | leave (chưa DOC-06) + 6 module khung (chưa DOC-04) |
| **Blocker mở** | 2 (ABC sponsor/ngân sách · vendor chấm công) |

---

## Module × pipeline

Tiến độ theo pipeline Minipower. Ký hiệu: `—` chưa · `◐` đang · `✓` xong · `BL` đã baseline.

| Module | Owner | Discovery | Req (04–07) | Arch slice | Plan | Delivery | Sign-off | Ghi chú |
|--------|-------|-----------|-------------|------------|------|----------|----------|---------|
| employee | BA | BL | ◐ | — | — | — | — | 04–07 Draft, đã đồng bộ DEC-REQ-001/002 · chưa sign-off |
| leave | BA | BL | ◐ | — | — | — | — | DOC-04/05 Draft · thiếu 06/07 |
| attendance | BA | BL | — | — | — | — | — | Khung README · chưa DOC-04 |
| payroll | BA | BL | — | — | — | — | — | Khung README · chưa DOC-04 |
| alert | BA | BL | — | — | — | — | — | Khung README · chưa DOC-04 |
| onboarding | BA | BL | — | — | — | — | — | Khung README · sau EMP · chưa DOC-04 |
| offboarding | BA | BL | — | — | — | — | — | Khung README · chưa DOC-04 |
| report | BA | BL | — | — | — | — | — | Khung README · chưa DOC-04 |

**Platform (không theo dòng module):** ADR-001…007 **Proposed** (`docs/04-platform/DOC-09-adr/`) — chưa Accepted. DOC-08/10/12/11 chưa mở.

**Đạt từng cột khi:**

| Cột | Điều kiện |
|-----|-----------|
| Discovery | Có trong [`DOC-03`](../01-project/DOC-03-brd.md), in scope |
| Req | DOC-04–07 có FR Must + AC tương ứng |
| Arch slice | DOC-08/10/12 có phần liên quan module |
| Plan | FR Must đã vào DOC-14 |
| Delivery | DOC-16/17 có test cho module |
| Sign-off | `doc-registry` = Baseline hoặc có trong `02-baseline/` manifest |

---

## Công việc & milestone

### Milestones (tóm tắt)

| ID | Milestone | Deliverable | Target | Trạng thái |
|----|-----------|-------------|--------|------------|
| M1 | Exit discovery | DOC-01–03 BL-1.0 | 2026-08-07 | done |
| M2 | Requirements employee | DOC-07 AC Draft (+ 04–06 Draft) | 2026-09-05 | in progress (chưa sign-off) |
| M3 | Requirements leave | DOC-06 SRS → DOC-07 | — | in progress |

→ Chi tiết: [`DOC-15`](../00-governance/DOC-15-project-plan.md) · WBS: [`DOC-14`](../04-platform/) *(chưa điền)*

### Việc 1–2 tuần tới

| Việc | Owner | Module | Due | Trạng thái |
|------|-------|--------|-----|------------|
| DOC-07 AC employee | BA | employee | 2026-09-05 | Draft xong · chờ sign-off |
| Cổng A2 / DOC-06 leave | BA | leave | — | planned |
| Chốt ADR Q1–Q5 (flip Accepted) | SA / anh Hoàng | platform | — | planned |

---

## Blocker / TBD

| ID | Module / FR | Vấn đề | Owner | ETA | Tham chiếu |
|----|-------------|--------|-------|-----|------------|
| BLK-001 | project | Sponsor / BO / ngân sách / ROI phía ABC chưa xác định | ABC | — | `memory/discovery/` |
| BLK-002 | attendance | Vendor app chấm công thứ 3 — MVP Excel; API sau | ABC / vendor | — | DEC-DIS-009 |
| TBD-001 | platform | Skip DOC-13 NFR + DOC-19 prototype (MVP) — ghi nợ | BA / SA | — | `memory/architecture/open-questions.md` |

---

## Quy tắc cập nhật

| Ai | Cập nhật phần | Khi nào |
|----|---------------|---------|
| **PM** | Snapshot, milestones, 2 tuần tới | Sync định kỳ (~15 phút) |
| **BA (owner module)** | Dòng pipeline module mình, blocker | Cuối phiên requirements |
| **SA** | Cột Arch, TBD platform | Khi có slice API / integration |
| **Bất kỳ** | Đếm FR từ trace-matrix | Sau distill vào `docs/` |

**Không** ghi chi tiết FR, transcript, SRS dài vào file này — dùng `trace-matrix`, `03-modules/`, `brainstorm/`.
