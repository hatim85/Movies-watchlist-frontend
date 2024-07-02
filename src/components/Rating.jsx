import React, { useState } from 'react';
import '../../styles/Rating.css'; 

const Rating = ({ rating, onRating }) => {
    const [hover, setHover] = useState(null);

    return (
        <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => onRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    className={`rating-star ${star <= (hover || rating) ? 'active' : ''}`}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default Rating;
