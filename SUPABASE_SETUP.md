## Supabase Auth Configuration

### URL Configuration

Go to Authentication → URL Configuration and set:
- Site URL: https://replybasehq.com
- Redirect URLs includes: https://replybasehq.com/**

### Email Confirmation Template

Go to Authentication → Email Templates → Confirm signup.

The confirmation button/link href should be left as:

    {{ .ConfirmationURL }}

Supabase will automatically redirect to the callback route. Make sure the following is set in URL Configuration → Redirect URLs:

    https://replybasehq.com/auth/callback?next=/welcome

The auth callback route at /auth/callback will:
1. Exchange the confirmation code for a session
2. Redirect the user to /welcome, which launches Stripe checkout

Do NOT append &redirect_to manually — Supabase handles the redirect via the callback route instead.
