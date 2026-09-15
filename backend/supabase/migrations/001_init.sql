-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) primary key,
  email text,
  full_name text,
  user_role text default 'client' check (user_role in ('client', 'stylist', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Services table
create table if not exists public.services (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null check (category in ('Hair', 'Nails', 'Facials', 'Massage')),
  description text,
  price numeric(10, 2) not null,
  duration integer not null, -- in minutes
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Stylists table
create table if not exists public.stylists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  name text not null,
  specialty text,
  bio text,
  image_url text,
  rating numeric(2, 1) default 5.0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Availability slots table
create table if not exists public.availability_slots (
  id uuid default uuid_generate_v4() primary key,
  stylist_id uuid references public.stylists(id) on delete cascade,
  date date not null,
  time time not null,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Bookings table
create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.profiles(id),
  service_id uuid references public.services(id),
  stylist_id uuid references public.stylists(id),
  scheduled_date date not null,
  scheduled_time time not null,
  status text default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Row-level security policies
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.stylists enable row level security;
alter table public.bookings enable row level security;
alter table public.availability_slots enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Anyone can view stylists"
  on public.profiles for select
  using (user_role = 'stylist');

-- Services policies
create policy "Anyone can view services"
  on public.services for select
  using (true);

create policy "Only admins can manage services"
  on public.services for all
  using (auth.uid() in (select id from public.profiles where user_role = 'admin'));

-- Stylists policies
create policy "Anyone can view stylists"
  on public.stylists for select
  using (true);

-- Bookings policies
create policy "Users can view their own bookings"
  on public.bookings for select
  using (auth.uid() = client_id or auth.uid() in (select user_id from public.stylists where id = stylist_id));

create policy "Users can create bookings"
  on public.bookings for insert
  with check (auth.uid() = client_id);

create policy "Users can update their bookings"
  on public.bookings for update
  using (auth.uid() = client_id);

-- Availability slots policies
create policy "Anyone can view available slots"
  on public.availability_slots for select
  using (is_available = true);

create policy "Stylists can manage their slots"
  on public.availability_slots for all
  using (auth.uid() in (select user_id from public.stylists where id = stylist_id));