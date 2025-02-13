import React from 'react';
import { BookCard } from '../components/BookCard';

const FEATURED_BOOKS = [
  {
    id: 'd04cef9d-0d6d-4e8a-9475-8d96d490c606',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
  },
  {
    id: '7174b262-5159-43d3-954b-e3d46e5c9f71',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
  },
  {
    id: '2e1e9b5f-c1c2-4f4c-a3e9-6c9d2c4d9c1d',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
    rating: 4.2,
  },
];

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of book lovers. Read reviews, share your thoughts, and find your next great read.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_BOOKS.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>

        <section className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Share Your Thoughts?
          </h2>
          <p className="text-gray-600 mb-6">
            Sign up now to start writing reviews and connecting with other readers.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </section>
      </div>
    </div>
  );
}