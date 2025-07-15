export type Siswa = {
  nisn: string;
  nama: string;
  kelas: string;
  status: string;
  pembayaran: {
    spp: boolean;
    buku: boolean;
    seragam: boolean;
  };
};

export const pesertaDidik = [
  {
    nisn: "1234567890",
    nama: "Ahmad Ramadhan",
    kelas: "6A",
    status: "aktif", // aktif | lulus | mutasi-keluar | non-aktif
    pembayaran: {
      spp: false,
      seragam: true,
      buku: false,
    },
  },
  {
    nisn: "9876543210",
    nama: "Siti Nurhaliza",
    kelas: "6B",
    status: "lulus",
    pembayaran: {
      spp: true,
      seragam: true,
      buku: true,
    },
  },
  {
    nisn: "1122334455",
    nama: "Budi Santoso",
    kelas: "6C",
    status: "aktif",
    pembayaran: {
      spp: false,
      seragam: false,
      buku: false,
    },
  },
  {
    nisn: "0002223344",
    nama: "Meriska Joe",
    kelas: "6A",
    status: "aktif",
    pembayaran: {
      spp: false,
      seragam: false,
      buku: false,
    },
  },
  {
    nisn: "4455779966",
    nama: "Handayani Nyoman",
    kelas: "6C",
    status: "aktif",
    pembayaran: {
      spp: false,
      seragam: false,
      buku: false,
    },
  },
  {
    nisn: "1122365487",
    nama: "Joshua Ginting",
    kelas: "6B",
    status: "aktif",
    pembayaran: {
      spp: false,
      seragam: false,
      buku: false,
    },
  },
  {
    nisn: "11223635487",
    nama: "Beringin Angling",
    kelas: "6B",
    status: "mutasi-keluar",
    pembayaran: {
      spp: false,
      seragam: false,
      buku: false,
    },
  },
  {
    nisn: "5622365487",
    nama: "Barcola Mbappe",
    kelas: "6B",
    status: "aktif",
    pembayaran: {
      spp: false,
      seragam: false,
      buku: false,
    },
  },
  {
    nisn: "1892365487",
    nama: "Odegaard Ginting",
    kelas: "6C",
    status: "mutasi-masuk",
    pembayaran: {
      spp: true,
      seragam: false,
      buku: true,
    },
  },
  {
    nisn: "1122365777",
    nama: "Henry Pangaribuan",
    kelas: "6B",
    status: "mutasi-keluar",
    pembayaran: {
      spp: false,
      seragam: false,
      buku: false,
    },
  },
  {
    nisn: "1122388487",
    nama: "George Washington",
    kelas: "6B",
    status: "lulus",
    pembayaran: {
      spp: false,
      seragam: false,
      buku: false,
    },
  },
];
