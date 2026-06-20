import { useState, useEffect } from 'react';
import { loadNotes, saveNotes } from '../utils/storage';
import { generateId } from '../utils/uuid';

export const useNotes = () => {
  const [notes, setNotes] = useState(() => loadNotes());

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // CRUD operations
  const addNote = (text, mood) => {
    const newNote = {
      id: generateId(),
      text: text.trim(),
      mood: mood, // Format: { emoji, label, value }
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    return newNote;
  };

  const updateNote = (id, text, mood) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              text: text.trim(),
              mood: mood,
              updatedAt: new Date().toISOString()
            }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Helper function to filter notes based on criteria
  const getFilteredNotes = (searchQuery = '', moodFilterValue = '') => {
    return notes.filter((note) => {
      const matchesSearch = note.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMood = moodFilterValue ? (note.mood && note.mood.value === moodFilterValue) : true;
      return matchesSearch && matchesMood;
    });
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getFilteredNotes
  };
};
