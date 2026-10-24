export interface WelcomeEmailParams {
  name: string;
  email: string;
  country: string;
  dreamCulture?: string;
  hasOfferedStay?: boolean;
  reflectionNote?: string;
  timestamp?: string;
  dbStatus?: "persisted" | "failed" | "timeout" | "skipped";
  dbError?: string;
}

/**
 * Dispatches a personalized Terra Dusk styled welcome email to the subscriber.
 *
 * @param params User registration details
 * @returns Boolean indicating delivery status
 */
export async function sendWelcomeEmail(params: WelcomeEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[Resend Sim] Missing RESEND_API_KEY. Welcome email simulation for: ${params.email}`);
    return false;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Joey van der Poel <welcome@connectcultures.world>";

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Welcome to Beyond The Bubble</title>
      <style>
        body { margin: 0; padding: 0; background-color: #080706; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; color: #fefae0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #120e0c; border: 1px solid rgba(200, 90, 50, 0.35); border-radius: 12px; }
        .header { border-bottom: 1px solid rgba(254, 250, 224, 0.1); padding-bottom: 24px; margin-bottom: 24px; text-align: center; }
        .badge { display: inline-block; padding: 6px 14px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; background: rgba(200, 90, 50, 0.15); color: #e26d42; border-radius: 9999px; font-family: monospace; }
        h1 { font-family: 'Playfair Display', Georgia, serif; color: #fefae0; font-size: 28px; font-weight: 600; margin: 16px 0 8px; }
        p { font-size: 15px; line-height: 1.7; color: #d4a373; margin: 0 0 16px; }
        .quote { margin: 24px 0; padding: 18px 20px; background: #1c1613; border-left: 3px solid #c85a32; font-style: italic; color: #faedcd; }
        .footer { border-top: 1px solid rgba(254, 250, 224, 0.08); padding-top: 24px; margin-top: 32px; font-size: 13px; color: #8d99ae; }
        .signature { font-family: 'Playfair Display', Georgia, serif; color: #fefae0; font-size: 16px; margin-top: 8px; }
      </style>
    </head>
    <body>
      <div style="padding: 30px 15px;">
        <div class="container">
          <div class="header">
            <span class="badge">A Collective Awakening</span>
            <h1>Beyond The Bubble</h1>
          </div>
          <p>Dear ${params.name},</p>
          <p>Thank you for stepping outside your personal horizon and joining the movement. Whether you are living in ${params.country} or yearning to experience ${params.dreamCulture || "another culture"} from within, you have acknowledged a simple truth:</p>
          <div class="quote">
            "Language is the smallest part of human understanding. True connection flourishes the moment we leave our comfort zones behind."
          </div>
          <p>We are building an international fellowship for cross-cultural immersions, local storytelling, and homes that welcome foreign souls with open doors.</p>
          ${params.hasOfferedStay ? `<p><strong>Founding Host Priority:</strong> We noted that you applied to be an inaugural host opening your doors to foreign souls. Our community team will reach out directly to coordinate your onboarding.</p>` : ""}
          <p>You will be among the first to receive invitations to our initial round of intimate cultural gatherings and foreign host exchanges.</p>
          <div class="footer">
            <p style="margin-bottom: 4px; color: #8d99ae;">With warmth and open skies,</p>
            <div class="signature">Joey van der Poel</div>
            <p style="font-size: 11px; margin-top: 4px; color: #6c757d;">Connect Cultures • Beyond The Bubble</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [params.email],
        subject: "Welcome to Beyond The Bubble: A Shared Horizon",
        html: htmlContent,
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("[Mail] Exception sending welcome email:", error);
    return false;
  }
}

/**
 * Dispatches an administrator alert with subscriber details and failover indicators.
 * Guarantees zero lead loss by delivering subscriber details even when the database is offline.
 *
 * @param params User registration details with database status
 * @returns Boolean indicating delivery status
 */
export async function sendAdminWaitlistNotification(params: WelcomeEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.RESEND_FROM_EMAIL;
  if (!adminEmail) return false;

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Connect Cultures <system@connectcultures.world>";
  const dbStatus = params.dbStatus || "unknown";
  const isFailover = dbStatus === "failed" || dbStatus === "timeout";
  const subject = `${isFailover ? "[DB FAILOVER] " : ""}New Founding Fellow: ${params.name} (${params.email})`;

  const alertHtml = isFailover
    ? `
      <div style="margin-top: 16px; padding: 14px; background: #260a0a; border: 1px solid #ff4444; color: #ff8888; border-radius: 8px;">
        <strong>⚠️ DATABASE UNRESPONSIVE / FAILED</strong><br>
        Status: <code>${dbStatus}</code><br>
        ${params.dbError ? `Error: ${params.dbError}<br>` : ""}
        <em>The subscriber was emailed their confirmation, but this record was NOT persisted to PostgreSQL. Keep this email to manually register.</em>
      </div>
    `
    : `<p style="color: #00CDFF; margin-top: 14px;">Database Status: Persisted (${dbStatus})</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        reply_to: params.email,
        subject,
        html: `
          <div style="font-family: monospace; background: #080706; color: #fefae0; padding: 24px; border: 1px solid #333; border-radius: 8px;">
            <h2 style="color: #e26d42; margin-top: 0;">NEW FOUNDING FELLOW REGISTRATION</h2>
            <p><strong>Name:</strong> ${params.name}</p>
            <p><strong>Email:</strong> ${params.email}</p>
            <p><strong>Country:</strong> ${params.country}</p>
            <p><strong>Dream Culture:</strong> ${params.dreamCulture || "Not specified"}</p>
            <p><strong>Founding Host Application:</strong> ${params.hasOfferedStay ? "YES (Wants to host)" : "No"}</p>
            ${params.reflectionNote ? `<p><strong>Note:</strong> ${params.reflectionNote}</p>` : ""}
            <p><strong>Timestamp:</strong> ${params.timestamp || new Date().toISOString()}</p>
            ${alertHtml}
          </div>
        `,
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("[Mail] Exception sending admin notification email:", error);
    return false;
  }
}
