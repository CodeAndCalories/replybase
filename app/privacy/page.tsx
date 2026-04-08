import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — ReplyBase",
  description: "How ReplyBase collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main style={{ background: "#050505", minHeight: "100vh", color: "#f0f0f0" }}>
      <Navbar />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "9rem 1.5rem 5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", color: "#00E5CC", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Legal
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)" }}>
            Effective date: April 2026 · ReplyBase (<a href="https://replybasehq.com" style={{ color: "#00E5CC", textDecoration: "none" }}>replybasehq.com</a>)
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }}>

          <Section title="1. Introduction">
            <p>ReplyBase ("we", "us", or "our") operates the ReplyBase platform, which provides AI-powered Google review reply management for local businesses. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.</p>
            <p style={{ marginTop: "0.75rem" }}>By using ReplyBase, you agree to the collection and use of information in accordance with this policy.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><strong style={{ color: "#f0f0f0" }}>Account information:</strong> Your email address and password (stored securely via Supabase Auth) when you create an account.</li>
              <li><strong style={{ color: "#f0f0f0" }}>Google Business Profile data:</strong> When you connect your Google Business Profile, we request access under the <code style={{ background: "rgba(0,229,204,0.1)", padding: "0.1rem 0.4rem", borderRadius: 4, fontSize: "0.875rem", color: "#00E5CC" }}>business.manage</code> scope. This allows us to read your reviews and post replies on your behalf. We store a Google OAuth refresh token to maintain this access.</li>
              <li><strong style={{ color: "#f0f0f0" }}>Review data:</strong> We access and process Google reviews associated with your connected business locations to generate AI-powered reply suggestions.</li>
              <li><strong style={{ color: "#f0f0f0" }}>Payment information:</strong> Billing and subscription data is handled entirely by Stripe. We do not store your card details. We store your Stripe customer ID and subscription status.</li>
              <li><strong style={{ color: "#f0f0f0" }}>Usage data:</strong> General usage information such as the number of reviews processed and replies generated, used to enforce plan limits and improve the service.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>Authenticate you and maintain your account securely.</li>
              <li>Connect to your Google Business Profile and retrieve your reviews.</li>
              <li>Generate AI-powered reply suggestions using your review content via the Anthropic API (Claude). Review content is sent to Anthropic solely for the purpose of generating replies and is not used to train models.</li>
              <li>Post approved replies to Google on your behalf when you click Approve &amp; Send, or automatically if you have enabled auto-reply mode.</li>
              <li>Process your subscription payment and manage billing through Stripe.</li>
              <li>Send you transactional emails such as new review notifications and account alerts.</li>
            </ul>
          </Section>

          <Section title="4. Google API Usage">
            <p>ReplyBase integrates with the Google Business Profile API. Our use of data obtained through the Google API complies with the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#00E5CC", textDecoration: "none" }}>Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
            <p style={{ marginTop: "0.75rem" }}>Specifically:</p>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>We only request the <code style={{ background: "rgba(0,229,204,0.1)", padding: "0.1rem 0.4rem", borderRadius: 4, fontSize: "0.875rem", color: "#00E5CC" }}>business.manage</code> scope, which is the minimum required to read reviews and post replies.</li>
              <li>We do not use your Google data for advertising or to build profiles for third parties.</li>
              <li>We do not sell or share your Google data with third parties except as necessary to operate the service.</li>
              <li>You can revoke our access at any time by disconnecting your Google account from within the ReplyBase dashboard or via your Google Account permissions page.</li>
            </ul>
          </Section>

          <Section title="5. Third-Party Services">
            <p>We use the following third-party services to operate ReplyBase:</p>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><strong style={{ color: "#f0f0f0" }}>Supabase:</strong> We use Supabase to store your account data, business connection data, and subscription records. Data is stored securely in a Supabase-managed PostgreSQL database. See <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#00E5CC", textDecoration: "none" }}>Supabase's Privacy Policy</a>.</li>
              <li><strong style={{ color: "#f0f0f0" }}>Stripe:</strong> We use Stripe to process subscription payments. Your payment card details are handled entirely by Stripe and never stored on our servers. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#00E5CC", textDecoration: "none" }}>Stripe's Privacy Policy</a>.</li>
              <li><strong style={{ color: "#f0f0f0" }}>Anthropic:</strong> Review content is sent to Anthropic's API to generate reply suggestions. See <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#00E5CC", textDecoration: "none" }}>Anthropic's Privacy Policy</a>.</li>
              <li><strong style={{ color: "#f0f0f0" }}>Google:</strong> We access the Google Business Profile API on your behalf using the permissions you grant during OAuth. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#00E5CC", textDecoration: "none" }}>Google's Privacy Policy</a>.</li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, including your Google OAuth tokens, business profile connections, and account information. Stripe may retain payment records as required by law.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to access, correct, or delete your personal data at any time. You can delete your account from the Settings page in your dashboard. For any data requests, contact us at <a href="mailto:hello@replybasehq.com" style={{ color: "#00E5CC", textDecoration: "none" }}>hello@replybasehq.com</a>.</p>
          </Section>

          <Section title="8. Security">
            <p>We take reasonable technical and organisational measures to protect your data, including encrypted storage via Supabase, HTTPS for all data in transit, and using the Supabase service role key only in server-side contexts. However, no method of transmission over the internet is 100% secure.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by email or via an in-app notice. Continued use of the service after changes take effect constitutes your acceptance of the updated policy.</p>
          </Section>

          <Section title="10. Contact">
            <p>For privacy-related questions or data deletion requests, contact us at:</p>
            <p style={{ marginTop: "0.75rem" }}>
              <strong style={{ color: "#f0f0f0" }}>Email:</strong>{" "}
              <a href="mailto:hello@replybasehq.com" style={{ color: "#00E5CC", textDecoration: "none" }}>hello@replybasehq.com</a>
              <br />
              <strong style={{ color: "#f0f0f0" }}>Website:</strong>{" "}
              <a href="https://replybasehq.com" style={{ color: "#00E5CC", textDecoration: "none" }}>replybasehq.com</a>
            </p>
          </Section>

        </div>
      </div>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "#f0f0f0", marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
