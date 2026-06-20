import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { exportAsJSON, exportAsTXT } from '../../utils/exportData';
import './ExportModal.css';

export const ExportModal = () => {
  const { notes, isExportOpen, setIsExportOpen, showToast } = useContext(AppContext);

  if (!isExportOpen) return null;

  const handleExportJSON = () => {
    const success = exportAsJSON(notes);
    if (success) {
      showToast('Data berhasil diekspor sebagai JSON 📥', 'success');
      setIsExportOpen(false);
    } else {
      showToast('Gagal melakukan ekspor data...', 'danger');
    }
  };

  const handleExportTXT = () => {
    const success = exportAsTXT(notes);
    if (success) {
      showToast('Data berhasil diekspor sebagai TXT 📥', 'success');
      setIsExportOpen(false);
    } else {
      showToast('Gagal melakukan ekspor data...', 'danger');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsExportOpen(false)}>
      <div className="modal-container card export-modal-card" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3 className="modal-title">Ekspor Jurnal Pikiran</h3>
          <button className="modal-close-btn" onClick={() => setIsExportOpen(false)} aria-label="Tutup modal">✕</button>
        </header>

        <p className="export-desc">
          Semua catatan pikiran Anda disimpan secara lokal di perangkat Anda. Gunakan fitur ekspor ini untuk mencadangkan catatan Anda.
        </p>

        <div className="export-stats">
          Total Catatan: <strong>{notes.length} catatan</strong>
        </div>

        <div className="export-options-grid">
          <div className="export-option-card" onClick={handleExportJSON}>
            <div className="export-option-icon">📄</div>
            <div className="export-option-info">
              <h4>Format JSON (.json)</h4>
              <p>Format data terstruktur. Sangat cocok jika Anda ingin memindahkan data ke perangkat lain.</p>
            </div>
          </div>

          <div className="export-option-card" onClick={handleExportTXT}>
            <div className="export-option-icon">📝</div>
            <div className="export-option-info">
              <h4>Format Teks (.txt)</h4>
              <p>Format dokumen teks biasa. Mudah dibaca langsung menggunakan pembaca dokumen biasa.</p>
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setIsExportOpen(false)}>
            Tutup
          </button>
        </footer>
      </div>
    </div>
  );
};
