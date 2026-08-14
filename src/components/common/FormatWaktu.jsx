export const formatWaktu = (createdAt) => {
  const now = new Date();
  const waktu = new Date(createdAt);
  const selisih = Math.floor((now - waktu) / 1000); // dalam detik

  if (selisih < 60) return `${selisih} detik yang lalu`;
  const menit = Math.floor(selisih / 60);
  if (menit < 60) return `${menit} menit yang lalu`;
  const jam = Math.floor(menit / 60);
  if (jam < 24) return `${jam} jam yang lalu`;
  const hari = Math.floor(jam / 24);
  if (hari < 7) return `${hari} hari yang lalu`;
  const minggu = Math.floor(hari / 7);
  if (minggu < 4) return `${minggu} minggu yang lalu`;
  const bulan = Math.floor(hari / 30);
  if (bulan < 12) return `${bulan} bulan yang lalu`;
  const tahun = Math.floor(hari / 365);
  return `${tahun} tahun yang lalu`;
};
