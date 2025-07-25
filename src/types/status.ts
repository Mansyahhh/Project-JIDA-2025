// types/status.ts

export const STATUS_OPTIONS = [
  { label: "Siswa Baru", value: "SiswaBaru" },
  { label: "Mutasi Masuk", value: "MutasiMasuk" },
] as const;

export type StatusSiswa = (typeof STATUS_OPTIONS)[number]["value"];
