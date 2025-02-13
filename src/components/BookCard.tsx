import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
}

export function BookCard({ id, title, author, coverUrl, rating }: BookCardProps) {
  return (
    <Link to={`/books/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={coverUrl}
          alt={`Cover of ${title}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg group-hover:text-blue-600 truncate">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{author}</p>
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}