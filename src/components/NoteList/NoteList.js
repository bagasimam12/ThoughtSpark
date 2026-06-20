import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { NoteCard } from '../NoteCard/NoteCard';
import { groupDateLabel } from '../../utils/formatDate';
import './NoteList.css';

export const NoteList = () => {
  const { filteredNotes, searchQuery, moodFilter } = useContext(AppContext);

  // Group notes by formatted date labels (Hari Ini, Kemarin, DLL)
  const groupNotesByDate = (notesToGroup) => {
    const groups = {};
    notesToGroup.forEach((note) => {
      const label = groupDateLabel(note.createdAt);
      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(note);
    });
    return groups;
  };

  const groupedNotes = groupNotesByDate(filteredNotes);
  const dateLabels = Object.keys(groupedNotes);

  const isFiltering = searchQuery || moodFilter;

  // Empty state layouts
  if (filteredNotes.length === 0) {
    return (
      <div className="empty-state card">
        <div className="empty-state-icon">🧘‍♂️</div>
        <h3 className="empty-state-title">
          {isFiltering ? 'Tidak ada kecocokan pikiran' : 'Mulailah Menulis Catatan'}
        </h3>
        <p className="empty-state-desc">
          {isFiltering 
            ? 'Coba ganti filter pencarian atau filter mood Anda untuk melihat catatan lain.'
            : 'Tuangkan apa pun yang ada di kepalamu. Aplikasi ini sepenuhnya privat dan bekerja secara offline.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="note-list-container">
      {dateLabels.map((label) => (
        <section key={label} className="date-group-section">
          <h2 className="date-group-title">{label}</h2>
          <div className="date-group-notes">
            {groupedNotes[label].map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
