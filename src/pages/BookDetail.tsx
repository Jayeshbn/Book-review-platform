import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewList } from '../components/ReviewList';
import type { Book, Review } from '../types';

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    async function fetchBookAndReviews() {
      if (!id?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
        setLoading(false);
        return;
      }

      try {
        const [bookResponse, reviewsResponse] = await Promise.all([
          supabase.from('books').select('*').eq('id', id).single(),
          supabase
            .from('reviews')
            .select('*, profiles:user_id(email)')
            .eq('book_id', id)
            .order('created_at', { ascending: false }),
        ]);

        if (bookResponse.error) throw bookResponse.error;
        if (reviewsResponse.error) throw reviewsResponse.error;

        setBook(bookResponse.data);
        setReviews(reviewsResponse.data || []);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookAndReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading book details...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Book not found</div>
      </div>
    );
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const handleReviewAdded = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  const handleReviewAction = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please sign in to interact with reviews');
      return;
    }
    setShowReviewForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={book.cover_url}
                alt={book.title}
              />
            </div>
            <div className="p-8">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                <div className="ml-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg text-gray-600">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xl text-gray-600">{book.author}</p>
              <p className="mt-4 text-gray-600">{book.description}</p>
              
              <button
                onClick={() => setShowReviewForm(true)}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Write a Review
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Your Review
              </button>
            )}
          </div>
          
          {showReviewForm && (
            <div className="mb-8">
              <ReviewForm
                bookId={book.id}
                onReviewAdded={handleReviewAdded}
              />
            </div>
          )}
          
          <div className="mt-8">
            <ReviewList 
              reviews={reviews}
              onReviewClick={handleReviewAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}