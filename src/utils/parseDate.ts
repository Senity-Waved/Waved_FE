export default function parseDate(
  date: string | number,
): [string, string, string] {
  if (typeof date === 'string') {
    const stringDate = date.indexOf('T') !== -1 ? date.split('T')[0] : date;
    const splitDate = stringDate.split('-');
    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDate[2];

    return [year, month, day];
  }
  if (typeof date === 'number') {
    const formatDate = new Date(date);
    const year = formatDate.getFullYear().toString();
    const month = (formatDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth는 0부터 시작하므로 1을 더해줍니다.
    const day = formatDate.getDate().toString().padStart(2, '0');

    return [year, month, day];
  }
  throw new Error('Unsupported date format');
}
