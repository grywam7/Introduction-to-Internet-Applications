import React, { createContext, useContext, useState } from 'react';

interface Review {
  productId: number; // ID produktu, do którego odnosi się opinia
  author: string; // Autor opinii (e-mail użytkownika)
  content: string; // Treść opinii
  rating: number; // Ocena w gwiazdkach
}

interface ReviewContextProps {
  reviews: Review[];
  addReview: (productId: number, author: string, content: string, rating: number) => boolean; // Zwraca true/false w zależności od powodzenia
  hasReviewed: (productId: number, author: string) => boolean; // Sprawdza, czy użytkownik już ocenił dany produkt
}

const ReviewContext = createContext<ReviewContextProps | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = (productId: number, author: string, content: string, rating: number): boolean => {
    // Sprawdź, czy użytkownik już dodał opinię
    if (reviews.some((review) => review.productId === productId && review.author === author)) {
      return false; // Użytkownik już ocenił ten produkt
    }

    const newReview: Review = { productId, author, content, rating };
    setReviews((prevReviews) => [...prevReviews, newReview]);
    return true;
  };

  const hasReviewed = (productId: number, author: string): boolean => {
    return reviews.some((review) => review.productId === productId && review.author === author);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, hasReviewed }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};
