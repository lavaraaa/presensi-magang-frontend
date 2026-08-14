import React, { createContext, useContext, useState } from 'react';

const NotifikasiContext = createContext();

export const useNotifikasi = () => useContext(NotifikasiContext);

export const NotifikasiProvider = ({ children }) => {
  const [notifs, setNotifs] = useState([]);

  const showNotif = (message, type = 'success') => {
    const id = Date.now();
    setNotifs((prev) => [...prev, { id, message, type, visible: false }]);

    // Delay sedikit supaya animasi bisa dipicu
    setTimeout(() => {
      setNotifs((prev) =>
        prev.map((n) => (n.id === id ? { ...n, visible: true } : n))
      );
    }, 50);

    // Auto-hapus setelah 3 detik
    setTimeout(() => {
      setNotifs((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <NotifikasiContext.Provider value={{ showNotif }}>
      {children}

      <div
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
        }}
      >
        {notifs.map((notif) => (
          <div
            key={notif.id}
            style={{
              background: '#fff',
              border: `1px solid ${notif.type === 'success' ? 'black' : 'black'}`,
              color: '#2c2c2cff',
              padding: '8px 12px',
              borderRadius: 5,
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              fontWeight: 400,
              fontSize: 'clamp(18px, 17px, 16px)',
              maxWidth: '90vw',

              // Animasi
              transition: 'transform 0.4s ease, opacity 0.4s ease',
              transform: notif.visible ? 'translateY(0)' : 'translateY(-30px)',
              opacity: notif.visible ? 1 : 0,
            }}
          >
            <span style={{ fontSize: 'clamp(18px, 17px, 16px)', marginRight: 5 }}>
              {notif.type === 'success' ? '✔️' : '❌'}
            </span>
            {notif.message}
          </div>
        ))}
      </div>
    </NotifikasiContext.Provider>
  );
};
