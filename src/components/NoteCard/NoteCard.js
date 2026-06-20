import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { formatRelative, formatFullDate } from '../../utils/formatDate';
import './NoteCard.css';

export const NoteCard = ({ note }) => {
  const { deleteNote, setActiveNote, showToast } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Maximum characters before truncating
  const maxLength = 220;
  const isLongText = note.text.length > maxLength;
  
  const displayParagraphs = (textToDisplay) => {
    return textToDisplay.split('\n').map((para, i) => (
      <p key={i} className="note-card-paragraph">{para}</p>
    ));
  };

  const getDisplayText = () => {
    if (!isLongText || isExpanded) return note.text;
    return note.text.substring(0, maxLength) + '...';
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNote(note.id);
    showToast('Catatan pikiran telah dihapus 🍃', 'info');
    setShowConfirmDelete(false);
  };

  return (
    <article className="note-card card" onClick={() => setActiveNote(note)}>
      <header className="note-card-header">
        <span 
          className="note-card-date" 
          title={formatFullDate(note.createdAt)}
        >
          {formatRelative(note.createdAt)}
        </span>
        
        {note.mood && (
          <span 
            className="note-card-mood-badge"
            style={{ '--mood-badge-bg': note.mood.color }}
          >
            <span className="mood-badge-emoji">{note.mood.emoji}</span>
            <span className="mood-badge-label">{note.mood.label}</span>
          </span>
        )}
      </header>

      <div className="note-card-body">
        {displayParagraphs(getDisplayText())}
        {isLongText && (
          <button 
            type="button" 
            className="btn-read-more" 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? 'Sembunyikan' : 'Baca selengkapnya'}
          </button>
        )}
      </div>

      <footer className="note-card-footer" onClick={(e) => e.stopPropagation()}>
        {showConfirmDelete ? (
          <div className="delete-confirm-wrapper">
            <span className="confirm-text">Hapus permanen?</span>
            <button className="btn btn-danger btn-xs" onClick={handleDelete}>Ya</button>
            <button className="btn btn-secondary btn-xs" onClick={() => setShowConfirmDelete(false)}>Batal</button>
          </div>
        ) : (
          <div className="note-actions">
            <button 
              className="note-action-btn edit-btn" 
              onClick={() => setActiveNote(note)}
              title="Edit Catatan"
            >
              ✍️ Edit
            </button>
            <button 
              className="note-action-btn delete-btn" 
              onClick={() => setShowConfirmDelete(true)}
              title="Hapus Catatan"
            >
              🗑️ Hapus
            </button>
          </div>
        )}
      </footer>
    </article>
  );
};
