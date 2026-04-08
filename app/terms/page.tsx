import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — ReplyBase",
  description: "Terms and conditions for using the ReplyBase platform.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)" }}>
            Effective date: April 2026 · ReplyBase (<a href="https://replybasehq.com" style={{ color: "#00E5CC", textDecoration: "none" }}>replybasehq.com</a>)
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }}>

          <Section title="1. Acceptance of Terms">
            <p>By creating an account and using ReplyBase, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the service. We may update these terms from time to time — continued use of the service constitutes acceptance of any changes.</p>
          </Section>

          <Section title="2. Service Description">
            <p>ReplyBase is an AI-powered Google review reply management platform. The service allows you to connect your Google Business Profile, view incoming reviews, generate AI-powered reply suggestions using Claude (by Anthropic), and post approved replies to Google on your behalf.</p>
            <p style={{ marginTop: "0.75rem" }}>Features include manual reply approval, optional auto-reply mode, multi-location support, and a settings dashboard to manage your account and subscription.</p>
          </Section>

          <Section title="3. Subscription and Billing">
            <p>ReplyBase is a paid subscription service billed at <strong style={{ color: "#f0f0f0" }}>$175/month</strong> per account. Billing is processed securely via Stripe.</p>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>Your subscription begins on the date you complete checkout and renews automatically each month.</li>
              <li>You authorise ReplyBase to charge your payment method on a recurring monthly basis until you cancel.</li>
              <li>Prices may change with 30 days' notice provided by email.</li>
            </ul>
          </Section>

          <Section title="4. Cancellation">
            <p>You may cancel your subscription at any time through the Stripe Customer Portal, accessible from the Settings page in your ReplyBase dashboard. Cancellation takes effect at the end of your current billing period — you will retain access to the service until that date.</p>
          </Section>

          <Section title="5. Refund Policy">
            <p>All subscription fees are non-refundable. We do not issue refunds or credits for partial months of service, unused features, or if you cancel mid-cycle. If you believe you have been charged in error, contact us at <a href="mailto:hello@replybasehq.com" style={{ color: "#00E5CC", textDecoration: "none" }}>hello@replybasehq.com</a> within 7 days of the charge.</p>
          </Section>

          <Section title="6. User Responsibilities">
            <p>By using ReplyBase, you confirm and agree that:</p>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>You own or are authorised to manage the Google Business Profile(s) you connect to ReplyBase.</li>
              <li>You are responsible for reviewing AI-generated replies before sending, particularly when auto-reply mode is disabled.</li>
              <li>You will not use the service to post replies that are false, defamatory, misleading, harassing, or in violation of Google's review policies.</li>
              <li>You are solely responsible for the content of replies posted through ReplyBase, whether approved manually or sent via auto-reply.</li>
              <li>You will keep your account credentials secure and notify us immediately of any unauthorised access.</li>
            </ul>
          </Section>

          <Section title="7. Auto-Reply Mode">
            <p>ReplyBase offers an optional auto-reply feature that automatically posts AI-generated replies to your Google reviews without manual approval. By enabling auto-reply mode, you acknowledge and agree that:</p>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>Replies will be posted to Google on your behalf without your review of each individual reply.</li>
              <li>ReplyBase is not responsible for the content, accuracy, or appropriateness of automatically sent replies.</li>
              <li>You accept full responsibility for all replies posted via auto-reply mode.</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>We recommend reviewing several AI-generated replies manually before enabling auto-reply to ensure the tone and content meet your standards.</p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>ReplyBase and its original content, features, and functionality are owned by ReplyBase and protected by applicable intellectual property laws. You retain ownership of your business data and review content. You grant ReplyBase a limited licence to process your data solely to provide the service.</p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>To the maximum extent permitted by law, ReplyBase shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of revenue, loss of data, or reputational damage arising from your use of the service or from replies posted on your behalf.</p>
            <p style={{ marginTop: "0.75rem" }}>Our total liability for any claim related to the service shall not exceed the amount you paid to ReplyBase in the 30 days preceding the claim.</p>
          </Section>

          <Section title="10. Termination">
            <p>We reserve the right to suspend or terminate your account if you violate these Terms of Service, engage in fraudulent activity, or misuse the platform. Upon termination, your access to the service will cease and your data will be deleted in accordance with our Privacy Policy.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved in the courts of competent jurisdiction.</p>
          </Section>

          <Section title="12. Contact">
            <p>For questions about these Terms, contact us at:</p>
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
