import React, { useState, useEffect } from 'react';
import './InstallPrompt.css';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      
      // Check if user has previously dismissed the prompt
      const isDismissed = localStorage.getItem('thoughtspark_install_dismissed');
      if (!isDismissed) {
        // Show the install banner after a 5 second delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Handle application installed event
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
      console.log('ThoughtSpark berhasil diinstal di perangkat.');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Pilihan user: ${outcome}`);
    
    // Clear prompt state
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Persist user dismissal to not annoy them next time
    localStorage.setItem('thoughtspark_install_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="install-banner">
      <div className="install-content">
        <div className="install-logo">✨</div>
        <div className="install-info">
          <h4>Instal ThoughtSpark</h4>
          <p>Tambahkan ke layar utama untuk menulis jurnal lebih cepat & offline penuh.</p>
        </div>
      </div>
      <div className="install-actions">
        <button className="btn btn-secondary btn-xs-install" onClick={handleDismiss}>
          Nanti saja
        </button>
        <button className="btn btn-primary btn-xs-install" onClick={handleInstallClick}>
          Instal Sekarang
        </button>
      </div>
    </div>
  );
};
