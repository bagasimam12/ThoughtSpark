import React, { createContext, useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useTheme } from '../hooks/useTheme';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const notesState = useNotes();
  const themeState = useTheme();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState('');

  // Active viewing/editing modal state
  const [activeNote, setActiveNote] = useState(null); // Note object to view/edit
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'info' | 'danger' }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const filteredNotes = notesState.getFilteredNotes(searchQuery, moodFilter);

  return (
    <AppContext.Provider
      value={{
        ...notesState,
        ...themeState,
        filteredNotes,
        searchQuery,
        setSearchQuery,
        moodFilter,
        setMoodFilter,
        activeNote,
        setActiveNote,
        isExportOpen,
        setIsExportOpen,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
