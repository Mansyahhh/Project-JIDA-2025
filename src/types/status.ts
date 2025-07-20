// types/status.ts

export const STATUS_OPTIONS = [
  { label: "Aktif", value: "Aktif" },
  { label: "Mutasi Masuk", value: "MutasiMasuk" },
  { label: "Mutasi Keluar", value: "MutasiKeluar" },
  { label: "Lulus", value: "Lulus" },
] as const;

export type StatusSiswa = (typeof STATUS_OPTIONS)[number]["value"];
