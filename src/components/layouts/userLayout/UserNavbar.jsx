import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../pages/auth/AuthContext'; // sesuaikan path
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../../../assets/logo.png';
import LogoutModal from '../../common/LogoutModal';
import ProfilModal from '../userLayout/ProfilNavbarModal';

const UserNavbar = ({ isShifted }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const offcanvasRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // ⬅️ pakai AuthContext

  const handleLogout = () => {
    closeSidebar();
    setShowDropdown(false);
    setTimeout(() => {
      logout();
      navigate('/');
    }, 200);
  };

  const closeSidebar = () => {
    const sidebar = offcanvasRef.current;
    const closeBtn = sidebar?.querySelector('[data-bs-dismiss="offcanvas"]');
    if (closeBtn) closeBtn.click();
    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop) backdrop.remove();
  };

  const handleNavigate = (path) => {
    closeSidebar();
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => navigate(path), 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = offcanvasRef.current;
      const isSidebarOpen = sidebar?.classList.contains('show');
      if (isSidebarOpen && sidebar && !sidebar.contains(e.target)) {
        closeSidebar();
      }
      if (!e.target.closest('.admin-profile')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "bi bi-house-door-fill" },
    { label: "Presensi", path: "/presensi", icon: "bi-map-fill" },
     { label: "Riwayat Presensi", path: "/presensi-kamu", icon: "bi-map-fill" },
  ];

  const currentPath = window.location.pathname;

  return (
    <>
      <nav className="bg-white navbar navbar-light shadow-sm py-3 sticky-top"
        style={{
          // height:70,
          borderBottom: '2px solid #ccc',
          zIndex: 999,
          marginLeft: isShifted ? "10px" : "0",
          transition: "margin-left 0.3s",
        }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <button className="btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="d-none d-lg-block text-muted ms-3 mt-3">
            <p>
              Presensi Peserta Magang / {menuItems.find((item) => item.path === currentPath)?.label || currentPath}
            </p>
          </div>

          <button className="navbar-brand btn d-lg-none position-absolute top-50 start-50 translate-middle d-flex align-items-center" onClick={() => handleNavigate('/dashboard')}>
            {/* <img src={logo} alt="Logo" width="30" height="30" className="me-2" /> */}
            Presensi Magang
          </button>

          <div className="d-none d-lg-block"
            style={{
              position: 'relative',
              zIndex: 1050,
              right: 25
            }}>
            <ProfilModal
              inline
              onClose={() => setShowProfilModal(false)}
            />
          </div>

          <LogoutModal
            show={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
          />
        </div>
      </nav>

      <div
        ref={offcanvasRef}
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
        style={{ width: '60%' }}
      >
        <div className="offcanvas-header flex-column align-items-start" style={{ paddingBottom: '0', background: '#015E78' }}>
          <p className="ms-1 mb-3 fw-semibold" style={{ marginTop: 2, fontSize: '18px', color: '#fff' }}>Presensi Magang</p>
          <div
            className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
            style={{ width: '50px', height: '50px', color: '#fff', marginBottom: '8px' }}
          >
            <i className="bi bi-person-fill fs-4"></i>
          </div>
          <p className="ms-2 mb-1 fw-bold" style={{ fontSize: '12px', color: '#fff' }}>{user?.name || "-"}</p>
          {/* <p className="mb-2 fw-semibold" style={{ fontSize: '0.7rem', color: '#fff' }}>Anda login sebagai {user?.name || "-"}</p> */}
          <button type="button" className="btn-close btn-close-white position-absolute end-0 top-0 m-3" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>

        <div className="offcanvas-body" style={{ paddingTop: '0' }}>
          <ul className="navbar-nav">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li className="nav-item" key={item.path}>
                  <button
                    className="d-flex align-items-center w-100 border-0 bg-transparent"
                    onClick={() => handleNavigate(item.path)}
                    style={{

                      borderRadius: '4px',
                      padding: '8px',
                      marginBottom: '5px',
                      transition: 'background-color 0.2s, color 0.2s',
                      backgroundColor: isActive ? '#015E78' : 'transparent',
                      color: isActive ? '#015E78' : '#000',
                      fontWeight: isActive ? 'bold' : 'normal',
                      textDecoration: 'none',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#015E78';
                        e.currentTarget.style.color = '#666';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#000';
                      }
                    }}
                  >
                    <i className={`bi ${item.icon} me-2`}></i>
                    {item.label}
                  </button>
                </li>
              );
            })}


            <li className="nav-item mt-3 d-lg-none">
              <button
                className="btn btn-outline-danger w-100"
                onClick={() => {
                  closeSidebar();
                  setShowLogoutModal(true);
                }}
              >
                <i className="bi bi-box-arrow-right" style={{ marginRight: 5, fontSize: 20 }}></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
