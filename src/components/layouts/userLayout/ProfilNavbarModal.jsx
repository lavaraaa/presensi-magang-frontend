import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../pages/auth/AuthContext';
import profilePlaceholder from '../../../assets/profil.png';
import LogoutModal from '../../common/LogoutModal';
// import { useNotifikasi } from '../../common/Notifikasi';

const ProfilModal = () => {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // const { showNotif } = useNotifikasi();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

 const handleLogout = () => {
  setShowLogoutModal(false); 
  showNotif('Berhasil keluar dari akun', 'success');
  setTimeout(() => {
    logout();
    if (window.location.pathname !== '/') {
      navigate('/');  
    }
  }, 800);
};


   const sensorEmail = (email) => {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;

  const firstChar = username[0];
  const lastChar = username[username.length - 1];

  return `${firstChar}******@${domain}`;
};

  if (!user) return null;

  return (
    <>
      <div
        className="position-relative d-flex align-items-center"
        ref={dropdownRef}
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        <img
          src={user.photoURL?.trim() ? user.photoURL : profilePlaceholder}
          width={40}
              height={40}
              style={{ width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0
               }}
              alt="Foto Profil"
            />
        {/* <div className="d-flex flex-column">
          <span style={{ fontWeight: '700', color: '#015E78' }}>{user.username}</span>
          <small className="text-muted">{sensorEmail(user.email)}</small>
        </div> */}

        {showDropdown && (
          <ul
            className="dropdown-menu show"
            style={{ position: 'absolute', top: '50px', right: 0, minWidth: '160px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/profiluser');
                }}
              >
                Profil
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
               onClick={() => setShowLogoutModal(true)}>Logout</button>
                <LogoutModal
                  show={showLogoutModal}
                   onClose={() => setShowLogoutModal(false)}
                    onConfirm={handleLogout}
                  />
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default ProfilModal;
