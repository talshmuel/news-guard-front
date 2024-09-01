// StarRating.jsx
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import Font Awesome star icons
import React from 'react';

const StarRating = ({ rating, outOf = 5 }) => {
  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= outOf; i++) {
      stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;