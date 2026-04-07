## Supabase Email Confirmation Redirect

In the Supabase dashboard:
1. Go to Authentication → Email Templates → Confirm signup
2. Find the confirmation URL in the template — it will contain {{ .ConfirmationURL }}
3. Change the button/link href to: {{ .ConfirmationURL }}&redirect_to=https://replybasehq.com/welcome
4. Save the template

Also go to Authentication → URL Configuration and confirm:
- Site URL: https://replybasehq.com
- Redirect URLs includes: https://replybasehq.com/**
