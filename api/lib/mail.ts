import { Resend } from "resend";

interface WelcomeEmailParams {
  name: string;
  email: string;
  country: string;
  dreamCulture?: string;
}

/**
 * Dispatches a personalized Terra Dusk styled welcome email using Resend.
 *
 * @param params User registration details
 * @returns Object indicating success or graceful simulation status
 */
export async function sendWelcomeEmail(params: WelcomeEmailParams): Promise<{ sent: boolean; messageId?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[Resend Sim] Missing RESEND_API_KEY. Welcome email simulation for: ${params.email}`);
    return { sent: false };
  }

  const resend = new Resend(apiKey);

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
          <p>You will be among the first to receive invitations to our initial round of intimate cultural gatherings and foreign host exchanges.</p>
          <div class="footer">
            <p style="margin-bottom: 4px; color: #8d99ae;">With warmth and open skies,</p>
            <div class="signature">Joey van der Poel</div>
            <p style="font-size: 12px; margin-top: 8px; color: #997b58;">Founder, Beyond The Bubble • Amsterdam, The Netherlands</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const data = await resend.emails.send({
      from: "Joey van der Poel <welcome@connectcultures.world>",
      to: [params.email],
      subject: "Welcome to Beyond The Bubble — A Shared Horizon",
      html: htmlContent,
    });
    return { sent: true, messageId: data.data?.id };
  } catch (error) {
    console.error("Resend delivery failed:", error);
    return { sent: false };
  }
}
