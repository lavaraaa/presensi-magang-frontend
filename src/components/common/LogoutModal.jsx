import React from 'react';

const LogoutModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1300 }}
      onClick={onClose}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: '400px', width: '100%', zIndex: 9999 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="mb-3 text-center">Konfirmasi Logout</h5>
        <p className="text-center">Apakah Anda yakin ingin keluar?</p>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary w-50 me-2" onClick={onClose}>Batal</button>
          <button className="btn btn-danger w-50 ms-2" onClick={onConfirm}>Ya, Keluar</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
