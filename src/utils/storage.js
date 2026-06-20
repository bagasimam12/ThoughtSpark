// Helper functions for LocalStorage and SessionStorage persistence

const NOTES_KEY = 'thoughtspark_notes';
const THEME_KEY = 'thoughtspark_theme';
const DRAFT_KEY = 'thoughtspark_draft_text';
const DRAFT_MOOD_KEY = 'thoughtspark_draft_mood';

export const loadNotes = () => {
  try {
    const serializedNotes = localStorage.getItem(NOTES_KEY);
    if (serializedNotes === null) return [];
    return JSON.parse(serializedNotes);
  } catch (error) {
    console.error("Gagal memuat catatan dari LocalStorage:", error);
    return [];
  }
};

export const saveNotes = (notes) => {
  try {
    const serializedNotes = JSON.stringify(notes);
    localStorage.setItem(NOTES_KEY, serializedNotes);
  } catch (error) {
    console.error("Gagal menyimpan catatan ke LocalStorage:", error);
  }
};

export const saveDraft = (text, mood) => {
  try {
    if (text) {
      sessionStorage.setItem(DRAFT_KEY, text);
    } else {
      sessionStorage.removeItem(DRAFT_KEY);
    }
    if (mood) {
      sessionStorage.setItem(DRAFT_MOOD_KEY, JSON.stringify(mood));
    } else {
      sessionStorage.removeItem(DRAFT_MOOD_KEY);
    }
  } catch (error) {
    console.error("Gagal menyimpan draf:", error);
  }
};

export const loadDraft = () => {
  try {
    const text = sessionStorage.getItem(DRAFT_KEY) || '';
    const moodRaw = sessionStorage.getItem(DRAFT_MOOD_KEY);
    const mood = moodRaw ? JSON.parse(moodRaw) : null;
    return { text, mood };
  } catch (error) {
    console.error("Gagal memuat draf:", error);
    return { text: '', mood: null };
  }
};

export const clearDraft = () => {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
    sessionStorage.removeItem(DRAFT_MOOD_KEY);
  } catch (error) {
    console.error("Gagal menghapus draf:", error);
  }
};

export const loadTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    console.error("Gagal memuat tema:", error);
    return null;
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error("Gagal menyimpan tema:", error);
  }
};
