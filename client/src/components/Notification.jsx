// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

// eslint-disable-next-line react/prop-types
function Notification({ notification }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (notification) {
      setOpen(true);
    }
  }, [notification]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {/*  eslint-disable-next-line react/prop-types */}
      <Alert onClose={handleClose} severity={notification?.severity || 'info'}>
        {/* eslint-disable-next-line react/prop-types */}
        {notification?.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
