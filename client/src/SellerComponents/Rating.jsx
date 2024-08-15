import React, { useState} from 'react';

export default function Rating() {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const submitRating = async (score) => {
        try {
          await axios.post('/ratings', { rating: { score } });
          alert('Rating submitted!');
        } catch (error) {
          console.error('Error submitting rating:', error);
        }
      };

  return (
    <div>
            {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {
              setRating(index);
              submitRating(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  )
}
