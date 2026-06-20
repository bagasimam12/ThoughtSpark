import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { MOODS } from '../../utils/moods';
import './SearchBar.css';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, moodFilter, setMoodFilter } = useContext(AppContext);

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Cari catatan pikiranmu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-btn" onClick={() => setSearchQuery('')}>
            ✕
          </button>
        )}
      </div>

      <div className="mood-filter-scroll">
        <button
          className={`filter-chip ${moodFilter === '' ? 'active' : ''}`}
          onClick={() => setMoodFilter('')}
        >
          Semua Mood
        </button>
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            className={`filter-chip ${moodFilter === mood.value ? 'active' : ''}`}
            onClick={() => setMoodFilter(mood.value)}
          >
            <span className="filter-emoji">{mood.emoji}</span>
            <span className="filter-label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
