import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const CommentForm = ({ productId }) => {
  const [commentText, setCommentText] = useState('');
  const [userId, setUserId] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        setUserId(decodedToken.sub); // Felhasználó azonosítója (userId) a tokenből
      }
    }
  }, []);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Elküldjük a kommentet a szerverre
      const commentData = {
        productId: productId,
        userId: userId,
        ratings: rating,
        comments: commentText,
        reviewDate: new Date().toISOString(),
      };
      console.log('Comment data:', commentData); // Logoljuk az elküldött adatokat a konzolra
      await axios.post('http://localhost:5098/api/Comment', commentData);
      // Állapotok alaphelyzetbe állítása a komment elküldése után
      setCommentText('');
      setRating(0);
      alert('Comment sent successfully!');
    } catch (error) {
      console.error('Error sending comment:', error);
      alert('Failed to send comment.');
    }
  };

  // Csillagok megjelenítése
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} onClick={() => handleStarClick(index + 1)} style={{ cursor: 'pointer' }}>
      {index < rating ? <StarIcon fontSize="large" style={{ color: '#ff9800' }} /> : <StarBorderIcon fontSize="large" style={{ color: '#ff9800' }} />}
    </span>
  ));

  return (
    <div>
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating: {stars}</label>
        </div>
        <br />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
          cols="50"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
