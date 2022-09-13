import format from 'date-fns/format';

export const formatDate = (date: string | number): string => {
  return format(new Date(date), 'MMMM, dd, yyyy');
}