import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Rating } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const CommentList = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [ratings, setRatings] = useState(0); // A felhasználó által kiválasztott csillagok értéke

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5098/api/Comment/ByProduct/${productId}`);
        setComments(response.data);
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
      await axios.put(`http://localhost:5098/api/Comment/${editCommentId}`, updatedComment); // PUT kérés az azonosítóval
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
      await axios.delete(`http://localhost:5098/api/Comment/${deleteCommentId}`);
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

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map(comment => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.comments} secondary={`Rating: ${comment.ratings}`} />
            {currentUser && currentUser.sub === comment.userId && (
              <div>
                <Button onClick={() => handleEdit(comment.id, comment.comments)}>Edit</Button>
                <Button onClick={() => openDeleteConfirmation(comment.id)}>Delete</Button>
              </div>
            )}
          </ListItem>
        ))}
      </List>
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
            precision={1}
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
