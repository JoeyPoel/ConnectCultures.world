# Fail-Safe Waitlist Service — Architecture & Replication Blueprint

This document explains the architecture of the **Fail-Safe Waitlist Service** for Connect Cultures and provides a step-by-step guide to copying and adapting it into any other project (e.g., Next.js, Vite + Vercel Functions, Express, or Node.js).

---

## 1. Why Standard Waitlists Fail (The Problem)

In most web applications, a waitlist signup endpoint follows a synchronous pattern:

```text
Incoming Request ──> Connect to Database ──> Write Record ──> Send Email ──> 200 OK
```

### Critical Vulnerabilities of the Naive Approach
1. **Database Latency & Cold Starts**: When using serverless databases (Supabase, Neon, AWS RDS, PlanetScale), connection pools can exhaust or spin down. Prisma or database drivers can hang for 10 to 30+ seconds attempting connection handshakes.
2. **Serverless Function Timeouts**: Vercel kills serverless functions after 10s (Hobby) or 15s (Pro) with a `504 Gateway Timeout`. If the database hangs, the function terminates before reaching the email dispatch line.
3. **Lost Leads**: When the timeout strikes, the prospective subscriber sees an error screen (`TRANSMISSION OFFLINE`), and **neither the subscriber nor the administrator receives any record of the email**. The lead is permanently lost.

---

## 2. The Fail-Safe Dual-Dispatch Architecture (The Solution)

The fail-safe waitlist architecture isolates the database write behind a **hard execution deadline** (`withTimeout`) and treats email dispatch as an autonomous, guaranteed delivery channel.

```mermaid
sequenceDiagram
    autonumber
    actor User as Subscriber (Browser)
    participant UI as JoinForm.tsx / WaitlistForm.tsx
    participant API as POST /api/community/join or /api/waitlist
    participant DB as PostgreSQL (Prisma)
    participant Mail as Resend Mail Service
    actor Admin as Admin Inbox

    User->>UI: Types details & clicks submit
    UI->>API: POST /api/community/join { name, email, country, dreamCulture, hasOfferedStay }
    
    rect rgb(20, 20, 30)
        Note over API,DB: Step 1: Database Persistence (with 2500ms Deadline)
        API->>DB: upsert CommunityMember (Promise.race)
        alt Database Responds in < 2500ms (Happy Path)
            DB-->>API: 200 OK (Persisted)
            Note over API: dbStatus = "persisted"
        else Database Hangs or Fails (Fail-Safe Triggered)
            Note over DB: Timeout after 2500ms or Connection Error
            API-->>API: Timeout Triggered! Catch error, set dbStatus = "timeout" | "failed"
            Note over API: Log [FAILSAFE_BACKUP] structured audit trail
        end
    end

    rect rgb(10, 30, 20)
        Note over API,Mail: Step 2: Guaranteed Email Dispatch
        API->>Mail: sendWelcomeEmail(subscriber)
        Mail-->>User: Personalized Terra Dusk Welcome Email
        API->>Mail: sendAdminWaitlistNotification(admin, dbStatus)
        Mail-->>Admin: Admin Alert with Subscriber Details + [DB FAILOVER] if failed
    end

    API-->>UI: 201 Created { success: true, dbStatus, member }
    UI-->>User: Renders Immediate Fellowship Pass
```

### Core Resilience Invariants
- **Bounded Latency**: The database query is wrapped in `withTimeout(promise, 2500)` (configurable via `DB_TIMEOUT_MS`). The function will never hang or trigger a Vercel 504.
- **Delivery Guarantee**: Whether the database succeeds, times out, or throws an unhandled error, execution **always** advances to email dispatch.
- **Zero Lead Loss (Out-of-Band Backup)**: The admin notification email includes the subscriber's email, name, country, dream culture, and timestamp. If the database failed or timed out, the email subject is automatically prefixed with `[DB FAILOVER]` and contains instructions for manual recovery.
- **Flawless User Experience**: The subscriber never encounters an ugly database connection error or infinite loading spinner; they receive their confirmation email immediately and see their personalized boarding pass.

---

## 3. Implementation Files in Connect Cultures

| File | Purpose |
| :--- | :--- |
| [api/lib/async.ts](file:///c:/Users/joeyw/GitProjects/ConnectCultures.world/api/lib/async.ts) | Implements [withTimeout](file:///c:/Users/joeyw/GitProjects/ConnectCultures.world/api/lib/async.ts) for execution deadlines. |
| [api/lib/prisma.ts](file:///c:/Users/joeyw/GitProjects/ConnectCultures.world/api/lib/prisma.ts) | Lazy-loaded PrismaClient singleton proxy to avoid module crash when `DATABASE_URL` is unset or connecting slowly. |
| [api/lib/mail.ts](file:///c:/Users/joeyw/GitProjects/ConnectCultures.world/api/lib/mail.ts) | Dual-dispatch Resend email client: formats personalized welcome email for subscriber and admin alert with failover metadata. |
| [api/community/join.ts](file:///c:/Users/joeyw/GitProjects/ConnectCultures.world/api/community/join.ts) | Founding Fellowship registration endpoint executing bounded DB persistence, fallback logging, and guaranteed dual email dispatch. |
| [api/waitlist/index.ts](file:///c:/Users/joeyw/GitProjects/ConnectCultures.world/api/waitlist/index.ts) | General waitlist endpoint conforming to the standard `{ email, source }` specification. |
| [src/components/community/JoinForm.tsx](file:///c:/Users/joeyw/GitProjects/ConnectCultures.world/src/components/community/JoinForm.tsx) | Clean client-side UI connected to the 3D Kern-LanyardPass with error handling and feedback. |

---

## 4. Configuration (`.env`)

```env
# Database Connection (PostgreSQL / Supabase / Neon / PlanetScale)
DATABASE_URL="postgresql://user:password@host:5432/dbname?pgbouncer=true"

# Maximum wait time for database before triggering fail-safe (in milliseconds)
DB_TIMEOUT_MS=2500

# Resend API Key (https://resend.com)
RESEND_API_KEY="re_123456789"

# Sender and Administrator Addresses
RESEND_FROM_EMAIL="Joey van der Poel <welcome@connectcultures.world>"
ADMIN_NOTIFICATION_EMAIL="joey@connectcultures.world"
```
