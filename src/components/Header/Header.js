import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './Header.css';

export const Header = () => {
  const { isDark, toggleTheme, setIsExportOpen } = useContext(AppContext);

  return (
    <header className="app-header">
      <div className="logo-container">
        <span className="logo-spark">✨</span>
        <h1 className="brand-font app-title">ThoughtSpark</h1>
      </div>
      
      <div className="header-actions">
        <button 
          className="btn-header-action" 
          onClick={() => setIsExportOpen(true)}
          title="Ekspor Data Jurnal"
          aria-label="Ekspor data"
        >
          📥 <span className="action-label">Ekspor</span>
        </button>

        <button 
          className="btn-header-action theme-toggle" 
          onClick={toggleTheme}
          title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
          aria-label="Ubah tema"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
