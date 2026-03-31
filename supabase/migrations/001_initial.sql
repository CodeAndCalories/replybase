-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Businesses table
create table businesses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  google_place_id text,
  created_at timestamptz default now()
);

alter table businesses enable row level security;

create policy "Users can manage their own businesses"
  on businesses for all
  using (auth.uid() = user_id);

-- Reviews table
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id) on delete cascade not null,
  reviewer_name text,
  rating int check (rating between 1 and 5),
  review_text text,
  review_date timestamptz,
  reply_text text,
  reply_status text default 'pending' check (reply_status in ('pending', 'approved', 'published')),
  created_at timestamptz default now()
);

alter table reviews enable row level security;

create policy "Users can manage reviews for their businesses"
  on reviews for all
  using (
    exists (
      select 1 from businesses
      where businesses.id = reviews.business_id
        and businesses.user_id = auth.uid()
    )
  );

-- Subscriptions table
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text default 'trialing' check (status in ('trialing', 'active', 'canceled', 'past_due')),
  trial_ends_at timestamptz default (now() + interval '14 days'),
  current_period_end timestamptz,
  created_at timestamptz default now()
);

alter table subscriptions enable row level security;

create policy "Users can view their own subscription"
  on subscriptions for select
  using (auth.uid() = user_id);

create policy "Service role can manage subscriptions"
  on subscriptions for all
  using (auth.role() = 'service_role');
