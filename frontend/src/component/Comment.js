import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Box, Typography, TextareaAutosize, Button, Rating, Modal } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const CommentForm = ({ productId }) => {
  const [commentText, setCommentText] = useState('');
  const [userId, setUserId] = useState('');
  const [rating, setRating] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      const decodedToken = jwtDecode(tokenFromLocalStorage);
      if (decodedToken) {
        setUserId(decodedToken.sub); 
        setToken(tokenFromLocalStorage); 
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        // Ha nincs bejelentkezve, megjelenítjük a bejelentkezési ablakot
        setShowLoginModal(true);
        return;
      }
      // Elküldjük a kommentet a szerverre
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}T${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}.${currentDate.getMilliseconds().toString().padStart(3, '0')}Z`;

      const commentData = {
        productId: productId,
        userId: userId,
        ratings: rating,
        comments: commentText,
        reviewDate: formattedDate,
        

      };
      console.log('Comment data:', commentData); // Logoljuk az elküldött adatokat a konzolra
  
      // Hozzáadjuk a Bearer tokent a kérés fejlécéhez
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      await axios.post('http://localhost:5098/api/Comment', commentData, config);
      // Állapotok alaphelyzetbe állítása a komment elküldése után
      setCommentText('');
      setRating(0);
      alert('Comment sent successfully!');
    } catch (error) {
      console.error('Error sending comment:', error);
      alert('Failed to send comment.');
    }
  };
  

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Add a Comment
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography component="legend">Rating:</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          max={5}
          precision={0.5} // Ezzel lehetővé tesszük a fél csillagok használatát
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
      <TextareaAutosize
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
        rowsmin={4} // Módosítottam itt
        style={{ width: '100%', marginBottom: '1rem' }}
        required
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, mb: 2, backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
        Submit
      </Button>
      <Modal open={showLoginModal} onClose={handleLoginModalClose}>
        <Box sx={{ width: 300, bgcolor: 'background.paper', border: '2px solid #000', p: 2, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please Log In
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You need to log in to submit a comment.
          </Typography>
          
          
        </Box>
      </Modal>
    </Box>
  );
};

export default CommentForm;
