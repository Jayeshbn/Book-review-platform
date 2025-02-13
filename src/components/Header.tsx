import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl">BookReviews</span>
          </Link>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <nav className="flex items-center space-x-4">
            <Link
              to="/books"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Books
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600"
            >
              <User className="w-6 h-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}