export const formatRupiah = (value: string): string => {
  const number = String(value).replace(/\D/g, '');

  return number ? new Intl.NumberFormat('id-ID').format(parseInt(number)) : '';
};

export const rupiahToNumber = (value: string): number => {
  const cleanValue = value.replace(/\./g, '').replace(/\D/g, '');
  return cleanValue ? parseInt(cleanValue, 10) : 0;
};
