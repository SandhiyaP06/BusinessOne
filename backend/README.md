# Industrial Approval Portal - Backend API & Workflow Engine

Production-grade, enterprise backend and multi-department workflow engine for the **Industrial Approval Portal** (Single Window Clearance Platform for state/national industrial setups).

---

## 🏛️ Architecture Overview

The backend is built following clean architectural principles with strict layer separation:

```
                  ┌──────────────────────────────┐
                  │      React Frontend UI       │
                  │   (Vite / React / Lucide)    │
                  └──────────────┬───────────────┘
                                 │ HTTP / REST
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ Express Application Layer (Helmet, CORS, JSON, Morgan)          │
├─────────────────────────────────────────────────────────────────┤
│ Middleware Layer:                                               │
│  - JWT Bearer Authentication                                    │
│  - Role-Based Access Control (RBAC: 4 Roles)                    │
│  - Zod Request Schema Validation                                │
│  - Multer Secure File Processing                                │
│  - System Audit Trail Logging                                   │
│  - Centralized Error Handling                                   │
├─────────────────────────────────────────────────────────────────┤
│ Controllers Layer (Auth, Business, Application, Approval...)   │
├─────────────────────────────────────────────────────────────────┤
│ Services Layer:                                                 │
│  - Recommendation Engine (Dynamic Rule Matching)                │
│  - Multi-Department Workflow Engine (SLA, Routing, Parallel)    │
│  - Document Management & Verification Engine                    │
│  - Field Inspection Lifecycle Management                        │
│  - Query Handling & Resolution Service                          │
│  - Approval & Digital Certificate Generator                     │
│  - Renewal & Re-application Tracking Service                    │
│  - Real-time Notification Engine                                │
│  - State SLA Analytics & Aggregations                           │
├─────────────────────────────────────────────────────────────────┤
│ Prisma ORM Data Layer (16 Normalized Relational Entities)       │
├─────────────────────────────────────────────────────────────────┤
│ Database (PostgreSQL / SQLite with full relational integrity)   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

- **Runtime & Language:** Node.js (v18+), TypeScript 5+
- **Web Framework:** Express.js (v5)
- **Database & ORM:** Prisma ORM v6 with SQLite (default for development) and PostgreSQL support
- **Authentication & Security:** JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), Helmet, CORS
- **Validation:** Zod Schema Validation
- **File Uploads:** Multer with secure destination storage
- **Logging & Auditing:** Morgan HTTP logger + persistent Database Audit Trails (`AuditLog` model)

---

## 📁 Directory Structure

```
d:/protal/backend/
├── prisma/
│   ├── schema.prisma       # 16 Relational Models (User, Business, Application, etc.)
│   └── seed.ts             # Comprehensive database seed with 4 personas and realistic demo data
├── src/
│   ├── config/             # Environment, Prisma client, Multer storage
│   ├── constants/          # Role constants, Application/Workflow statuses
│   ├── controllers/        # Request handling and HTTP response dispatching
│   ├── middleware/         # Auth, RBAC, Validation, Error handler, Audit logger
│   ├── routes/             # RESTful API route definitions
│   ├── services/           # Core business logic, workflow engine, rule engine
│   ├── utils/              # Standardized API response format, Token/Password helpers
│   ├── validators/         # Zod schemas for payload validation
│   ├── app.ts              # Express application configuration
│   └── server.ts           # Server bootstrap and port listener
├── uploads/                # Managed local storage for uploaded verification documents
├── test-api.ts             # Automated integration test suite (19 test cases)
├── tsconfig.json           # Strict TypeScript configuration
├── package.json
└── .env                    # Environment configuration
```

---

## 🔑 Pre-configured Test Accounts

| Role | Email | Password | Designation / Department |
|---|---|---|---|
| **Entrepreneur** | `entrepreneur@portal.gov.in` | `Password@123` | Managing Director (Apex Green Energy) |
| **Department Officer (DIC)** | `officer.dic@portal.gov.in` | `Password@123` | General Manager, District Industries Centre |
| **Department Officer (SPCB)** | `officer.spcb@portal.gov.in` | `Password@123` | Senior Environmental Engineer, Pollution Board |
| **Field Inspector** | `inspector@portal.gov.in` | `Password@123` | Senior Industrial Safety & Fire Inspector |
| **Super Administrator** | `admin@portal.gov.in` | `Password@123` | State Single Window Admin |

---

## ⚙️ Installation & Setup

### 1. Install Dependencies
```bash
cd d:/protal/backend
npm install
```

### 2. Configure Environment Variables
Create or verify `.env` file in `d:/protal/backend/.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET="industrial-portal-super-secure-production-grade-jwt-secret-key-2026"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173"
UPLOAD_DIR="./uploads"
```

> **Using PostgreSQL:**
> To use PostgreSQL instead of SQLite, simply update the `DATABASE_URL` in `.env` and `provider = "postgresql"` in `prisma/schema.prisma`:
> `DATABASE_URL="postgresql://user:password@localhost:5432/industrial_portal?schema=public"`

### 3. Initialize & Seed Database
```bash
# Push schema to database
npx prisma db push

# Seed roles, departments, test accounts, rules, and demo applications
npx tsx prisma/seed.ts
```

### 4. Build TypeScript
```bash
npm run build
```

### 5. Run Backend Server
```bash
# Start in development mode with hot-reload
npm run dev

# Or run compiled production server
npm start
```
The API server will listen on `http://localhost:5000`.

---

## 🧪 Automated Integration Test Suite

Run the full end-to-end integration test suite verifying all 19 functional and security test cases:

```bash
npx tsx test-api.ts
```

**Tested Capabilities:**
1. User Authentication (JWT issuance, role payload)
2. Business Profile Creation & PAN/GST Validation
3. Recommendation Engine (Dynamic Rule Evaluation based on Land, Power, Boiler, Hazardous materials)
4. Application Draft Creation & Auto Application Number Generation (`APP-YYYYMMDD-XXXX`)
5. Document Upload & Storage Verification
6. Final Application Submission & Parallel Multi-Department Routing
7. Department Officer Application Workbench
8. Document Validation (Approved / Clarification Requested)
9. Query Raising & Applicant Notification Dispatch
10. Query Response by Entrepreneur with Evidence
11. Query Resolution by Department Officer
12. Field Inspection Scheduling
13. Inspector Joint-Site Inspection Report Submission (Checklist, GPS, Decision)
14. Department Clearance (NOC / Certificate Generation)
15. Consolidated Single Window Clearance Issuance
16. Notifications Center API (Fetch & Read Tracking)
17. Licences & Expiry Tracking (Renewal Triggering)
18. State SLA Performance Analytics Aggregation
19. Role-Based Access Control (RBAC 403 Security Check)

---

## 📡 Comprehensive REST API Reference

All API responses follow the uniform enterprise JSON envelope:
```json
{
  "success": true,
  "message": "Human readable description",
  "data": { ... },
  "timestamp": "2026-09-19T17:00:00.000Z"
}
```

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register` — Register new entrepreneur or staff.
- `POST /api/auth/login` — Authenticate with email/password; returns JWT token + user details + role.
- `GET /api/auth/profile` — Get current logged-in user profile (Requires `Bearer Token`).

### 2. Business Profile (`/api/businesses`)
- `POST /api/businesses` — Create new industrial business entity (PAN/GST validation).
- `GET /api/businesses` — List registered businesses owned by current user.
- `GET /api/businesses/:id` — Get business details.

### 3. Recommendation Engine (`/api/applications`)
- `POST /api/applications/recommendations` — Submit project parameters (`investment`, `landArea`, `powerLoad`, `hasBoiler`, `hasHazardousChem`, `category`) to receive mandatory clearances list with SLA days, fee schedules, and required documents.

### 4. Applications Lifecycle (`/api/applications`)
- `POST /api/applications` — Create a new draft application.
- `GET /api/applications` — List applications (filtered by role).
- `GET /api/applications/:id` — Get detailed application dossier (Business, Documents, Inspections, Queries, Departmental Approvals, Workflow Timeline).
- `POST /api/applications/:id/submit` — Final submit application; automatically triggers workflow engine, calculates department SLA deadlines, creates workflow stages, and notifies officers.

### 5. Document Management (`/api/documents`)
- `POST /api/documents/upload/:id` — Upload document (`multipart/form-data`) with document type.
- `GET /api/documents/application/:id` — Get all uploaded documents for an application.
- `POST /api/documents/:id/validate` — (Officer) Mark document as `VERIFIED` or `REJECTED` with remarks.
- `DELETE /api/documents/:id` — Delete uploaded document.

### 6. Departments & Routing (`/api/departments`)
- `GET /api/departments` — List all registered state departments (DIC, SPCB, FIRE, DISH, etc.).
- `GET /api/departments/:id/applications` — Get applications routed to specific department.
- `POST /api/departments/route/:id` — Route application to additional department.

### 7. Inspections (`/api/inspections`)
- `GET /api/inspections` — List scheduled/completed inspections.
- `POST /api/inspections/schedule` — (Officer/Inspector) Schedule on-site joint inspection with date and assigned officers.
- `POST /api/inspections/:id/result` — (Inspector) Submit inspection findings, checklist responses, observations, and recommendation (`SATISFACTORY` / `NON_COMPLIANT`).

### 8. Query Handling (`/api/queries`)
- `GET /api/queries/application/:id` — View queries raised for an application.
- `POST /api/queries/application/:id` — (Officer) Raise clarification query with deadline.
- `POST /api/queries/:id/respond` — (Entrepreneur) Submit response with clarification text and attachments.
- `POST /api/queries/:id/resolve` — (Officer) Mark query as resolved.

### 9. Departmental Clearance & Approvals (`/api/approvals`)
- `GET /api/approvals/application/:id` — Get departmental approval status and issued NOCs.
- `POST /api/approvals/application/:id/approve` — (Officer) Issue departmental NOC / clearance certificate. When all required departments approve, the Single Window Engine automatically transitions application to `APPROVED` and generates master clearance number.
- `POST /api/approvals/application/:id/reject` — (Officer) Reject departmental clearance.

### 10. Notifications (`/api/notifications`)
- `GET /api/notifications` — Get user notifications list.
- `PATCH /api/notifications/:id/read` — Mark notification as read.
- `POST /api/notifications/mark-all-read` — Mark all user notifications as read.

### 11. Licences & Renewals (`/api/renewals`)
- `GET /api/renewals` — Get issued licenses with expiry dates and renewal statuses.
- `POST /api/renewals/:id/renew` — Initiate renewal application for expiring license.

### 12. Analytics & SLA Monitoring (`/api/analytics`)
- `GET /api/analytics/overview` — Get state-level clearance statistics, average disposal turnaround time, department-wise SLA compliance %, and investment totals.

### 13. System Administration (`/api/admin`)
- `GET /api/admin/users` — (Admin only) List system users.
- `GET /api/admin/audit-logs` — (Admin only) Complete immutable system audit trail with timestamps, user IDs, actions, and IP addresses.

---

## 🔒 Security & RBAC Matrix

| Feature | Entrepreneur | Department Officer | Inspector | Admin |
|---|:---:|:---:|:---:|:---:|
| Register & Login | ✅ | ✅ | ✅ | ✅ |
| Create Business & Apply | ✅ | ❌ | ❌ | ❌ |
| View Own Applications | ✅ | ✅ (Assigned) | ✅ (Assigned) | ✅ (All) |
| Upload Documents | ✅ | ❌ | ❌ | ❌ |
| Verify Documents | ❌ | ✅ | ❌ | ✅ |
| Raise / Resolve Queries | ❌ (Respond only) | ✅ | ❌ | ✅ |
| Schedule Inspections | ❌ | ✅ | ✅ | ✅ |
| Submit Inspection Reports | ❌ | ❌ | ✅ | ✅ |
| Issue Departmental NOC | ❌ | ✅ | ❌ | ✅ |
| View System Audit Logs | ❌ | ❌ | ❌ | ✅ |
| View System Analytics | ❌ | ✅ | ✅ | ✅ |
