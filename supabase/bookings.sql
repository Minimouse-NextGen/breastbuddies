create extension if not exists pgcrypto;
create extension if not exists btree_gist;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile_number text not null,
  email_address text not null,
  baby_info text not null,
  primary_concern text not null,
  consultation_mode text not null,
  preferred_date date not null,
  preferred_time_slot text not null,
  consultation_duration text not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'pending',
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.bookings add column if not exists preferred_time_slot text;
alter table public.bookings add column if not exists consultation_duration text;
alter table public.bookings add column if not exists admin_notes text not null default '';
alter table public.bookings add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bookings'
      and column_name = 'slot_range'
  ) then
    execute 'update public.bookings set preferred_time_slot = coalesce(preferred_time_slot, slot_range) where preferred_time_slot is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bookings'
      and column_name = 'duration_minutes'
  ) then
    execute 'update public.bookings set consultation_duration = coalesce(consultation_duration, case duration_minutes when 60 then ''1 hour'' else ''30 minutes'' end) where consultation_duration is null';
  end if;
end $$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bookings'
      and column_name = 'start_time'
      and data_type <> 'time without time zone'
  ) then
    alter table public.bookings
      alter column start_time type time using start_time::time;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bookings'
      and column_name = 'end_time'
      and data_type <> 'time without time zone'
  ) then
    alter table public.bookings
      alter column end_time type time using end_time::time;
  end if;
end $$;

alter table public.bookings alter column preferred_time_slot set not null;
alter table public.bookings alter column consultation_duration set not null;
alter table public.bookings alter column admin_notes set default '';
alter table public.bookings alter column updated_at set default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_status_check'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_status_check
      check (status in ('pending', 'confirmed', 'completed', 'cancelled'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_duration_check'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_duration_check
      check (consultation_duration in ('30 minutes', '1 hour'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_no_active_overlap'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_no_active_overlap
      exclude using gist (
        tsrange(preferred_date + start_time, preferred_date + end_time, '[)') with &&
      )
      where (status in ('pending', 'confirmed'));
  end if;
end $$;

create index if not exists bookings_preferred_date_idx
  on public.bookings (preferred_date);

create index if not exists bookings_status_idx
  on public.bookings (status);

create table if not exists public.blocked_slots (
  id uuid primary key default gen_random_uuid(),
  block_date date not null,
  start_time time not null,
  end_time time not null,
  is_full_day boolean not null default false,
  reason text not null default '',
  blocked_by text not null default '',
  created_at timestamptz not null default now()
);

alter table public.blocked_slots add column if not exists is_full_day boolean not null default false;
alter table public.blocked_slots add column if not exists reason text not null default '';
alter table public.blocked_slots add column if not exists blocked_by text not null default '';
alter table public.blocked_slots add column if not exists created_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'blocked_slots'
      and column_name = 'start_time'
      and data_type <> 'time without time zone'
  ) then
    alter table public.blocked_slots
      alter column start_time type time using start_time::time;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'blocked_slots'
      and column_name = 'end_time'
      and data_type <> 'time without time zone'
  ) then
    alter table public.blocked_slots
      alter column end_time type time using end_time::time;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'blocked_slots_valid_range_check'
      and conrelid = 'public.blocked_slots'::regclass
  ) then
    alter table public.blocked_slots
      add constraint blocked_slots_valid_range_check
      check (end_time > start_time);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'blocked_slots_no_overlap'
      and conrelid = 'public.blocked_slots'::regclass
  ) then
    alter table public.blocked_slots
      add constraint blocked_slots_no_overlap
      exclude using gist (
        tsrange(block_date + start_time, block_date + end_time, '[)') with &&
      );
  end if;
end $$;

create index if not exists blocked_slots_block_date_idx
  on public.blocked_slots (block_date);

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

alter table public.admin_profiles add column if not exists role text not null default 'admin';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'admin_profiles_allowed_email_check'
      and conrelid = 'public.admin_profiles'::regclass
  ) then
    alter table public.admin_profiles
      add constraint admin_profiles_allowed_email_check
      check (lower(email) in ('divya.us@gmail.com', 'support@minimousenextgen.com'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'admin_profiles_role_check'
      and conrelid = 'public.admin_profiles'::regclass
  ) then
    alter table public.admin_profiles
      add constraint admin_profiles_role_check
      check (role = 'admin');
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_bookings_updated_at on public.bookings;
create trigger set_bookings_updated_at
  before update on public.bookings
  for each row
  execute function public.set_updated_at();

alter table public.bookings enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.blocked_slots enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and lower(email) in ('divya.us@gmail.com', 'support@minimousenextgen.com')
      and role = 'admin'
  );
$$;

create or replace function public.prevent_booking_if_blocked_slot_conflict()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status in ('pending', 'confirmed') and exists (
    select 1
    from public.blocked_slots
    where block_date = new.preferred_date
      and tsrange(block_date + start_time, block_date + end_time, '[)')
        && tsrange(new.preferred_date + new.start_time, new.preferred_date + new.end_time, '[)')
  ) then
    raise exception 'This time slot is not available. Please choose another time.'
      using errcode = '23P01';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_blocked_slot_booking_conflict on public.bookings;
create trigger prevent_blocked_slot_booking_conflict
  before insert or update on public.bookings
  for each row
  execute function public.prevent_booking_if_blocked_slot_conflict();

create or replace function public.get_unavailable_booking_slots(selected_date date)
returns table (
  id uuid,
  preferred_date date,
  start_time text,
  end_time text,
  consultation_duration text,
  status text,
  source text,
  reason text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    unavailable.id,
    unavailable.preferred_date,
    unavailable.start_time,
    unavailable.end_time,
    unavailable.consultation_duration,
    unavailable.status,
    unavailable.source,
    unavailable.reason
  from (
    select
      bookings.id,
      bookings.preferred_date,
      to_char(bookings.start_time, 'HH12:MI AM') as start_time,
      to_char(bookings.end_time, 'HH12:MI AM') as end_time,
      bookings.consultation_duration,
      bookings.status,
      'booking'::text as source,
      ''::text as reason
    from public.bookings
    where bookings.preferred_date = selected_date
      and bookings.status in ('pending', 'confirmed')

    union all

    select
      blocked_slots.id,
      blocked_slots.block_date as preferred_date,
      to_char(blocked_slots.start_time, 'HH12:MI AM') as start_time,
      to_char(blocked_slots.end_time, 'HH12:MI AM') as end_time,
      ''::text as consultation_duration,
      'blocked'::text as status,
      'blocked_slot'::text as source,
      blocked_slots.reason
    from public.blocked_slots
    where blocked_slots.block_date = selected_date
  ) unavailable
  order by unavailable.start_time;
$$;

grant execute on function public.get_unavailable_booking_slots(date) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Public can create booking requests" on public.bookings;
create policy "Public can create booking requests"
  on public.bookings
  for insert
  to anon, authenticated
  with check (status = 'pending');

drop policy if exists "Admins can read bookings" on public.bookings;
create policy "Admins can read bookings"
  on public.bookings
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update bookings" on public.bookings;
create policy "Admins can update bookings"
  on public.bookings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can read admin profiles" on public.admin_profiles;
create policy "Admins can read admin profiles"
  on public.admin_profiles
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can read blocked slots" on public.blocked_slots;
create policy "Admins can read blocked slots"
  on public.blocked_slots
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can create blocked slots" on public.blocked_slots;
create policy "Admins can create blocked slots"
  on public.blocked_slots
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can delete blocked slots" on public.blocked_slots;
create policy "Admins can delete blocked slots"
  on public.blocked_slots
  for delete
  to authenticated
  using (public.is_admin());
