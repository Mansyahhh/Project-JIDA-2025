export function formatRupiah(value: string) {
  const number = value.replace(/[^,\d]/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
