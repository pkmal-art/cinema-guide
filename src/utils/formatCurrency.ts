export const formatCurrency = (value: string): string => {
  const numericValue = parseFloat(value.replace(/\s/g, '').replace(',', '.')); 
  return new Intl.NumberFormat('ru-RU').format(numericValue);
};