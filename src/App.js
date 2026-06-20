import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header/Header';
import { NoteForm } from './components/NoteForm/NoteForm';
import { SearchBar } from './components/SearchBar/SearchBar';
import { NoteList } from './components/NoteList/NoteList';
import { NoteModal } from './components/NoteModal/NoteModal';
import { ExportModal } from './components/ExportModal/ExportModal';
import { InstallPrompt } from './components/InstallPrompt/InstallPrompt';
import { Toast } from './components/Toast/Toast';
import './App.css';

function AppContent() {
  return (
    <div className="app-container">
      <Header />
      <NoteForm />
      <SearchBar />
      <NoteList />
      
      {/* Modals & Prompts */}
      <NoteModal />
      <ExportModal />
      <InstallPrompt />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
