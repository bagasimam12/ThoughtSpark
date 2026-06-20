import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { MoodPicker } from '../MoodPicker/MoodPicker';
import { saveDraft, loadDraft, clearDraft } from '../../utils/storage';
import './NoteForm.css';

export const NoteForm = () => {
  const { addNote, showToast } = useContext(AppContext);
  const [text, setText] = useState('');
  const [mood, setMood] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef(null);

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft.text) {
      setText(draft.text);
      setCharCount(draft.text.length);
    }
    if (draft.mood) {
      setMood(draft.mood);
    }
  }, []);

  // Save draft on state change
  useEffect(() => {
    saveDraft(text, mood);
  }, [text, mood]);

  // Handle auto-resize of textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      showToast('Tuliskan sesuatu terlebih dahulu...', 'danger');
      return;
    }

    addNote(text, mood);
    showToast('Pikiranmu berhasil disimpan ✨', 'success');
    
    // Clear inputs & draft
    setText('');
    setMood(null);
    setCharCount(0);
    clearDraft();
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
  };

  // Inspirational placeholders in Indonesian
  const placeholders = [
    "Apa yang sedang berkecamuk di dalam kepalamu?",
    "Bagaimana hari ini berjalan? Ceritakan di sini...",
    "Tuliskan satu hal yang kamu syukuri hari ini...",
    "Pikiran acak, ide cemerlang, tuliskan saja semuanya...",
    "Lepaskan cemasmu, tuangkan dalam kata-kata...",
    "Ada refleksi menarik tentang dirimu hari ini?"
  ];

  // Pick a stable placeholder (first one or based on day of week)
  const placeholderIndex = new Date().getDay() % placeholders.length;
  const selectedPlaceholder = placeholders[placeholderIndex];

  return (
    <form className="note-form card" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="note-textarea"
        placeholder={selectedPlaceholder}
        value={text}
        onChange={handleTextChange}
        rows={3}
        maxLength={3000}
      />
      
      <div className="form-divider"></div>

      <div className="form-options">
        <MoodPicker selectedMood={mood} onSelectMood={setMood} />
      </div>

      <div className="form-footer">
        <span className="char-indicator">
          {charCount}/3000 karakter
          {text.trim() && <span className="draft-badge"> (Draft Tersimpan otomatis)</span>}
        </span>
        <button type="submit" className="btn btn-primary btn-submit">
          Simpan Pikiran ✍️
        </button>
      </div>
    </form>
  );
};
