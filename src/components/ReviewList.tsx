import React from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import type { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
  onReviewClick?: () => void;
}

export function ReviewList({ reviews, onReviewClick }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No reviews yet. Be the first to review!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                by {review.user?.email || 'Anonymous'}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700 mb-4">{review.content}</p>
          
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={onReviewClick}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Helpful
            </button>
            <button
              onClick={onReviewClick}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Reply
            </button>
            <button
              onClick={onReviewClick}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <Star className="w-4 h-4 mr-2" />
              Rate Review
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}