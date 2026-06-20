import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { MoodPicker } from '../MoodPicker/MoodPicker';
import { formatFullDate } from '../../utils/formatDate';
import './NoteModal.css';

export const NoteModal = () => {
  const { activeNote, setActiveNote, updateNote, showToast } = useContext(AppContext);
  const [editText, setEditText] = useState('');
  const [editMood, setEditMood] = useState(null);
  const textareaRef = useRef(null);

  // Sync state with active note details
  useEffect(() => {
    if (activeNote) {
      setEditText(activeNote.text);
      setEditMood(activeNote.mood);
    }
  }, [activeNote]);

  // Handle auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editText, activeNote]);

  if (!activeNote) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!editText.trim()) {
      showToast('Teks tidak boleh kosong...', 'danger');
      return;
    }

    updateNote(activeNote.id, editText, editMood);
    showToast('Catatan pikiran diperbarui ✨', 'success');
    setActiveNote(null); // Close modal
  };

  const handleClose = () => {
    setActiveNote(null);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container card" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3 className="modal-title">Sunting Pikiran</h3>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Tutup modal">✕</button>
        </header>

        <div className="modal-meta">
          <span>Dibuat: {formatFullDate(activeNote.createdAt)}</span>
          {activeNote.updatedAt !== activeNote.createdAt && (
            <span className="updated-meta"> • Diedit: {formatFullDate(activeNote.updatedAt)}</span>
          )}
        </div>

        <form onSubmit={handleSave} className="modal-form">
          <textarea
            ref={textareaRef}
            className="modal-textarea"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            maxLength={3000}
            rows={5}
            placeholder="Tuliskan pikiranmu..."
            autoFocus
          />

          <div className="form-divider"></div>

          <div className="modal-mood-picker">
            <MoodPicker selectedMood={editMood} onSelectMood={setEditMood} labelText="Sesuaikan mood:" />
          </div>

          <footer className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
