import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "hello@replybasehq.com";
const DASHBOARD_URL = "https://www.replybasehq.com/dashboard/reviews";

function stars(rating: number): string {
  return "⭐".repeat(Math.min(5, Math.max(1, rating)));
}

function truncate(text: string, max = 280): string {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/**
 * Sends a notification email to the business owner when a new Google review
 * arrives. Non-throwing — logs errors but never bubbles up to the caller so
 * a failed email never breaks a sync.
 */
export async function sendNewReviewNotification(
  userEmail: string,
  businessName: string,
  reviewerName: string,
  rating: number,
  reviewText: string
): Promise<void> {
  const subject = `New ${rating}⭐ review from ${reviewerName}`;

  const ratingColor =
    rating >= 4 ? "#00d4aa" : rating === 3 ? "#f59e0b" : "#f87171";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0f0f17;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f0f17;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:linear-gradient(135deg,#7c6aff 0%,#00d4aa 100%);border-radius:10px;width:36px;height:36px;text-align:center;vertical-align:middle;font-size:18px;line-height:36px;">
                    ✦
                  </td>
                  <td style="padding-left:10px;font-family:'Segoe UI',Roboto,sans-serif;font-size:18px;font-weight:700;color:#f0f0f0;letter-spacing:-0.02em;vertical-align:middle;">
                    ReplyBase
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">

              <!-- Heading -->
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#7c6aff;">New Review</p>
              <h1 style="margin:0 0 24px;font-size:22px;font-weight:800;letter-spacing:-0.025em;color:#f0f0f0;">
                ${businessName}
              </h1>

              <!-- Review box -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 22px;">

                    <!-- Reviewer + rating row -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:12px;">
                      <tr>
                        <td>
                          <span style="font-size:15px;font-weight:600;color:#f0f0f0;">${reviewerName}</span>
                        </td>
                        <td align="right">
                          <span style="font-size:20px;line-height:1;">${stars(rating)}</span>
                          &nbsp;
                          <span style="font-size:13px;font-weight:700;color:${ratingColor};">${rating}/5</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Review text -->
                    <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.65);">
                      &ldquo;${truncate(reviewText)}&rdquo;
                    </p>

                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tr>
                  <td align="center">
                    <a href="${DASHBOARD_URL}"
                      style="display:inline-block;background:linear-gradient(135deg,#7c6aff 0%,#00d4aa 100%);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:10px;letter-spacing:-0.01em;">
                      Reply in ReplyBase →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.6;">
                You're receiving this because you have email notifications enabled in
                <a href="https://www.replybasehq.com/dashboard/settings" style="color:rgba(255,255,255,0.35);text-decoration:underline;">ReplyBase settings</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to:   userEmail,
      subject,
      html,
    });

    if (error) {
      console.error(`Email: failed to send new-review notification to ${userEmail}:`, error);
    }
  } catch (err) {
    console.error(`Email: unexpected error sending notification to ${userEmail}:`, err);
  }
}
