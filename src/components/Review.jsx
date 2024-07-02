import React from 'react';
import '../../styles/Review.css'; 

const Review = ({ review, onReviewChange, onSubmit }) => {
    return (
        <div className="review-container">
            <textarea
                className="review-textarea"
                value={review}
                onChange={(e) => onReviewChange(e.target.value)}
                placeholder="Write your review here..."
            />
            <button className="review-submit-button" onClick={onSubmit}>
                Submit Review
            </button>
        </div>
    );
};

export default Review;
