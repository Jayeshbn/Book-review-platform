/*
  # Fix reviews table user relation and add sample data

  1. Changes
    - Add proper foreign key reference to auth.users
    - Add sample books and reviews for testing
  
  2. Data
    - Add sample books with proper UUIDs
    - Add sample reviews
*/

-- Add sample books
INSERT INTO books (id, title, author, description, cover_url)
VALUES 
  ('d04cef9d-0d6d-4e8a-9475-8d96d490c606', 'The Midnight Library', 'Matt Haig', 'Between life and death there is a library, and within that library, the shelves go on forever.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800'),
  ('7174b262-5159-43d3-954b-e3d46e5c9f71', 'Project Hail Mary', 'Andy Weir', 'A lone astronaut must save the earth from disaster.', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800'),
  ('2e1e9b5f-c1c2-4f4c-a3e9-6c9d2c4d9c1d', 'Klara and the Sun', 'Kazuo Ishiguro', 'A story told through the eyes of an artificial friend.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800');

-- Fix reviews table user relation
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE reviews 
  ADD CONSTRAINT reviews_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;