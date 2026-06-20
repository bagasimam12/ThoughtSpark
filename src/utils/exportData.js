// Export data utility for download backups

export const exportAsJSON = (notes) => {
  try {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `thoughtspark-jurnal-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    return true;
  } catch (error) {
    console.error("Export JSON failed", error);
    return false;
  }
};

export const exportAsTXT = (notes) => {
  try {
    let textContent = `=========================================\n`;
    textContent += `      THOUGHTSPARK - JURNAL PIKIRAN      \n`;
    textContent += `      Ekspor Data: ${new Date().toLocaleDateString('id-ID')}\n`;
    textContent += `=========================================\n\n`;
    
    if (notes.length === 0) {
      textContent += `(Tidak ada catatan)\n`;
    } else {
      notes.forEach((note, index) => {
        const dateStr = new Date(note.createdAt).toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        const moodText = note.mood ? `${note.mood.emoji} ${note.mood.label}` : 'Tidak ada mood';
        
        textContent += `${index + 1}. [${dateStr}] [Mood: ${moodText}]\n`;
        textContent += `-----------------------------------------\n`;
        textContent += `${note.text}\n`;
        textContent += `=========================================\n\n`;
      });
    }
    
    const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(textContent);
    const exportFileDefaultName = `thoughtspark-jurnal-${new Date().toISOString().slice(0,10)}.txt`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    return true;
  } catch (error) {
    console.error("Export TXT failed", error);
    return false;
  }
};
