import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './Toast.css';

export const Toast = () => {
  const { toast } = useContext(AppContext);

  if (!toast) return null;

  const { message, type } = toast;

  const getEmoji = () => {
    switch (type) {
      case 'success':
        return '✨';
      case 'danger':
        return '⚠️';
      case 'info':
        return '🍃';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`toast-notification toast-${type}`}>
      <span className="toast-emoji">{getEmoji()}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
};
