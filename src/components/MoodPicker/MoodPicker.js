import React from 'react';
import { MOODS } from '../../utils/moods';
import './MoodPicker.css';

export const MoodPicker = ({ selectedMood, onSelectMood, labelText = "Bagaimana perasaanmu saat ini?" }) => {
  return (
    <div className="mood-picker-container">
      {labelText && <p className="mood-picker-label">{labelText}</p>}
      <div className="mood-grid">
        {MOODS.map((mood) => {
          const isSelected = selectedMood && selectedMood.value === mood.value;
          return (
            <button
              key={mood.value}
              type="button"
              className={`mood-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectMood(isSelected ? null : mood)}
              title={mood.label}
              style={{
                '--mood-bg-color': mood.color
              }}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-text">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
