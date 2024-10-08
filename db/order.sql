-- Drop existing tables if they exist
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_menu CASCADE;
DROP TABLE IF EXISTS delivery CASCADE;
DROP TABLE IF EXISTS takeaway CASCADE;
DROP TABLE IF EXISTS booking CASCADE;

-- Create the orders table
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  users_id UUID REFERENCES auth.users(id),
  guest_name TEXT,                          -- Guest user's name
  guest_email TEXT,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  details TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

   -- Add a check constraint to ensure either users_id or guest details must be provided
  CONSTRAINT chk_user_or_guest CHECK (
    (users_id IS NOT NULL AND guest_email IS NULL AND guest_name IS NULL) OR 
    (users_id IS NULL AND guest_email IS NOT NULL AND guest_name IS NOT NULL)
  )
);

-- Create the delivery table for delivery orders
CREATE TABLE delivery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  orders_id BIGINT NOT NULL REFERENCES orders(id),
  address TEXT NOT NULL,
  delivery_date TIMESTAMP WITH TIME ZONE NULL,
  delivery_time TIME NULL
);

-- Create the takeaway table for takeaway orders
CREATE TABLE takeaway (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  orders_id BIGINT NOT NULL REFERENCES orders(id),
  pickup_date TIMESTAMP WITH TIME ZONE NULL,
  pickup_time TIME NULL
);

-- Create the order_menu table
CREATE TABLE order_menu (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  orders_id BIGINT NOT NULL REFERENCES orders (id),
  menu_id BIGINT NOT NULL REFERENCES menu (id),
  quantity INT NOT NULL
);

-- Create the booking table to handle both guests and logged-in users
CREATE TABLE booking (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  users_id UUID REFERENCES auth.users(id),  -- Foreign key for logged-in users
  guest_name TEXT,                          -- Guest user's name
  guest_email TEXT,                         -- Guest user's email
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  time TIME NOT NULL,
  guests INT NOT NULL,
  
  -- Add a check constraint to ensure either users_id or guest details must be provided
  CONSTRAINT chk_user_or_guest CHECK (
    (users_id IS NOT NULL AND guest_email IS NULL AND guest_name IS NULL) OR 
    (users_id IS NULL AND guest_email IS NOT NULL AND guest_name IS NOT NULL)
  )
);


-- Enable Row Level Security for all tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery ENABLE ROW LEVEL SECURITY;
ALTER TABLE takeaway ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking ENABLE ROW LEVEL SECURITY;


-- Policy for Admins to have full access (read/write) on orders table
CREATE POLICY "Admin full access to orders"
ON orders
FOR ALL  -- Allows SELECT, INSERT, UPDATE, DELETE
USING (auth.role() = 'admin');  -- Replace auth.role() with your method to check the user's role

-- Policy for Admins to have full access (read/write) on booking table
CREATE POLICY "Admin full access to booking"
ON booking
FOR ALL  -- Allows SELECT, INSERT, UPDATE, DELETE
USING (auth.role() = 'admin');  -- Replace auth.role() with your method to check the user's role

-- Policy to allow guest users to insert into orders table
CREATE POLICY "Guests can insert orders"
ON orders
FOR INSERT  -- Only allows insert operations
WITH CHECK (true);  -- Allow all guest inserts without restrictions

-- Policy to allow guest users to insert into booking table
CREATE POLICY "Guests can insert booking"
ON booking
FOR INSERT  -- Only allows insert operations
WITH CHECK (true);  -- Allow all guest inserts without restrictions

-- Policy to prevent guests from reading orders (optional, for stricter access)
CREATE POLICY "Guests cannot read orders"
ON orders
FOR SELECT
USING (false);  -- Guests cannot perform SELECT on orders

-- Policy to prevent guests from reading bookings (optional, for stricter access)
CREATE POLICY "Guests cannot read bookings"
ON booking
FOR SELECT
USING (false);  -- Guests cannot perform SELECT on booking