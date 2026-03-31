-- ReplyBase: Initial Schema
-- Run this in the Supabase SQL Editor (see README for instructions)

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  google_business_id text,
  business_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  reviewer_name text,
  rating integer check (rating between 1 and 5),
  review_text text,
  owner_reply text,
  reply_status text not null default 'pending' check (reply_status in ('pending', 'approved', 'sent')),
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'trialing',
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table businesses enable row level security;
alter table reviews enable row level security;
alter table subscriptions enable row level security;

-- Businesses: users can only access their own
create policy "users can manage their own businesses"
  on businesses
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Reviews: users can only access reviews for their businesses
create policy "users can manage reviews for their businesses"
  on reviews
  for all
  using (
    exists (
      select 1 from businesses
      where businesses.id = reviews.business_id
        and businesses.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from businesses
      where businesses.id = reviews.business_id
        and businesses.user_id = auth.uid()
    )
  );

-- Subscriptions: users can only access their own
create policy "users can manage their own subscriptions"
  on subscriptions
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists businesses_user_id_idx on businesses(user_id);
create index if not exists reviews_business_id_idx on reviews(business_id);
create index if not exists reviews_reply_status_idx on reviews(reply_status);
create index if not exists subscriptions_user_id_idx on subscriptions(user_id);
