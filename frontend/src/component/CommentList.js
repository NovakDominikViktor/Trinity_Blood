import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Rating } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import CommentForm from './Comment';

const CommentList = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [ratings, setRatings] = useState(0); // A felhasználó által kiválasztott csillagok értéke
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3; // A lapozáshoz megjelenítendő kommentek száma

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5098/api/Comment/ByProduct/${productId}`);
        const commentsWithUserData = await Promise.all(response.data.map(async (comment) => {
          try {
            const userResponse = await axios.get(`http://localhost:5098/api/User/${comment.userId}`);
            return { ...comment, userData: userResponse.data };
          } catch (error) {
            console.error('Error fetching user data for comment:', comment.id, error);
            return comment;
          }
        }));
        setComments(commentsWithUserData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    // Get current user from token
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);
    }

    // Frissítsük a kommenteket minden 5 másodpercben
    const interval = setInterval(fetchComments, 5000);

    // Tisztítsuk meg az intervallumot a komponens elhagyásakor
    return () => clearInterval(interval);
  }, [productId]);

  const handleEdit = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditCommentText(commentText);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedComment = {
        id: editCommentId, // Az azonosító átadása
        userId: comments.find(comment => comment.id === editCommentId).userId,
        productId: comments.find(comment => comment.id === editCommentId).productId,
        comments: editCommentText,
        ratings: ratings, // A felhasználó által kiválasztott csillagok értéke
        reviewDate: new Date().toISOString() // Az aktuális dátum/idő
      };
      console.log('Updated comment:', updatedComment);
  
      // Hozzáadjuk a Bearer tokent a kérés fejlécéhez
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
  
      await axios.put(`http://localhost:5098/api/Comment/${editCommentId}`, updatedComment, config); // PUT kérés az azonosítóval
      const updatedComments = comments.map(comment => {
        if (comment.id === editCommentId) {
          return { ...comment, comments: editCommentText };
        }
        return comment;
      });
      setComments(updatedComments);
      setEditCommentId(null);
      setEditCommentText('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
  
  const handleDelete = async () => {
    try {
      // Hozzáadjuk a Bearer tokent a kérés fejlécéhez
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
  
      await axios.delete(`http://localhost:5098/api/Comment/${deleteCommentId}`, config);
      setComments(comments.filter(comment => comment.id !== deleteCommentId));
      setDeleteCommentId(null);
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const openDeleteConfirmation = (commentId) => {
    setDeleteCommentId(commentId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteCommentId(null);
    setDeleteConfirmationOpen(false);
  };

  // Az aktuális oldal kommentjeinek számítása
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // Oldalváltás kezelése
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " year(s) ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month(s) ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day(s) ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour(s) ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute(s) ago";
    }
    return Math.floor(seconds) + " second(s) ago";
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CommentForm productId={productId} />
      </div>
      <List>
      {currentComments.map(comment => (
      <ListItem key={comment.id}>
        <ListItemText 
          primary={
            <React.Fragment>
              {comment.userData && (
                <Typography variant="subtitle2">{`${comment.userData.firstName} ${comment.userData.lastName}`}</Typography>
              )}
              {!currentUser && !comment.userData && (
                <Typography variant="subtitle2">Anonymous</Typography>
              )}
              <Typography style={{ color: 'black' }}>{comment.comments}</Typography>
            </React.Fragment>
          }
          
          secondary={`Date: ${timeAgo(new Date(comment.reviewDate))}`} 
          style={{ color: 'black' }}
        />
        {currentUser && currentUser.sub === comment.userId && (
          <div>
            <Button onClick={() => handleEdit(comment.id, comment.comments)}>Edit</Button>
            <Button onClick={() => openDeleteConfirmation(comment.id)}>Delete</Button>
          </div>
        )}
      </ListItem>
    ))}


      </List>
      {/* Oldalváltó gombok */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {comments.length > commentsPerPage && (
          <div>
            {[...Array(Math.ceil(comments.length / commentsPerPage)).keys()].map(number => (
              <button key={number + 1} onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <Dialog open={editCommentId !== null} onClose={() => setEditCommentId(null)}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            value={editCommentText}
            onChange={(e) => setEditCommentText(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
          {/* Csillagok kiválasztása */}
          <Rating
            name="ratings"
            value={ratings}
            precision={0.5}
            onChange={(event, newValue) => {
              setRatings(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveEdit}>Save</Button>
          <Button onClick={() => setEditCommentId(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this comment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={closeDeleteConfirmation}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentList;
