import React, { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import ModalEditWisata from '../../adminComponents/kelolawisataComponents/ModalEditWisata';
import { AuthContext } from '../../../pages/auth/AuthContext';
import { useNotifikasi } from '../../common/Notifikasi';

const CardWisata = ({ item, onActionSuccess }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const optionsRef = useRef();
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { showNotif } = useNotifikasi();


  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/wisata/${item.id}`, {
        method: 'DELETE',
      });
      
      setShowDeleteModal(false);
      setShowOptions(false);
      if (onActionSuccess) onActionSuccess(); 
    } catch (err) {
      console.error('Gagal menghapus:', err);
      showNotif('Destinasi Gagal Dihapus.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showOptions && optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);

  const handleEdit = () => {
  setShowOptions(false);
  setShowEditModal(true);
};


  return (
    <>
      <div
        className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4 d-flex justify-content-center"
        style={{ cursor: 'pointer' }}
      >
        <div
          style={{
            width: '100%',
            borderRadius: '5px',
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
            position: 'relative',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onClick={() => navigate(`/wisata/${item.id}`)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
               src={`https://ksjglnabyjehcodgvssp.supabase.co/storage/v1/object/public/images/${item.gambar}`}
  alt={item.judul}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                background: '#fff',
                borderRadius: '20px',
                padding: '3px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 15,
                fontWeight: 500,
                color: '#000',
              }}
            >
              <Icon icon="icon-park-outline:like" />
              <span>{item.total_likes || 0}</span>
            </div>
          </div>

          <div
            style={{
              padding: '12px 12px 0px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <h5
              title={item.judul}
              style={{
                margin: 0,
                // marginBottom: 10,
                fontWeight: '600',
                color: '#000',
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                flex: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.judul}
            </h5>

            {user?.role === 'admin' && (
              <div style={{ position: 'relative' }} ref={optionsRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOptions();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px',
                    // padding: '0px',
                    // marginBottom: 10,
                  }}
                >
                  ⋮
                </button>

                {showOptions && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50px',
                      left: '-120px',
                      width: '100px',
                      background: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                      zIndex: 1,
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                      }}
                      style={{
                        padding: '8px 12px',
                        width: '100%',
                        border: 'none',
                        background: 'white',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f0f0')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                    >
                      Edit
                    </button>
                   <button
  onClick={(e) => {
    e.stopPropagation();
    setShowOptions(false);       // ⬅️ TUTUP DROPDOWN DULU
    setShowDeleteModal(true);   // ⬅️ Lalu munculin modal hapus
  }}
  style={{
    padding: '8px 12px',
    width: '100%',
    border: 'none',
    background: 'white',
    cursor: 'pointer',
    color: 'red',
    textAlign: 'left',
  }}
  onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f0f0')}
  onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
>
  Hapus
</button>

                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ marginLeft: 11 }}>
            {item.average_rating > 0 ? (
              <>
                <span style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#333', fontWeight: 500 }}>
                  {Number(item.average_rating).toFixed(1)}
                </span>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    style={{
                      color: Number(item.average_rating) >= i ? 'orange' : '#ccc',
                      fontSize: 17,
                    }}
                  >
                    ★
                  </span>
                ))}
              </>
            ) : (
              <span style={{ fontSize: 'clamp(13px, 2.5vw, 15px)', color: '#999' }}>Belum ada ulasan</span>
            )}
          </div>
        </div>
      </div>
{showEditModal && (
  <ModalEditWisata
    show={showEditModal}
    handleClose={() => setShowEditModal(false)}
    dataWisata={item}
    onEditSuccess={() => {
      if (onActionSuccess) onActionSuccess();
      setShowEditModal(false);
    }}
  />
)}

      {/* Modal Hapus */}
      {showDeleteModal && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1300 }}
    onClick={() => setShowDeleteModal(false)}
  >
    <div
      className="card shadow p-4"
      style={{ maxWidth: '400px', width: '100%', zIndex: 1301 }}
      onClick={(e) => e.stopPropagation()}
    >
      <h5 className="mb-3 text-center">Konfirmasi Hapus</h5>
      <p className="text-center">Apakah Anda yakin ingin menghapus wisata ini?</p>
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary w-50 me-2" onClick={() => setShowDeleteModal(false)}>
          Batal
        </button>
        <button className="btn btn-danger w-50 ms-2" onClick={handleDelete}>
          Ya, Hapus
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default CardWisata;
