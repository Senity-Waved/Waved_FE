export default function parseDate(
  date: string | number,
): [string, string, string] {
  if (typeof date === 'string') {
    const dateParts = date.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return [year, month, day];
  } else if (typeof date === 'number') {
    const formatDate = new Date(date);
    const year = formatDate.getFullYear().toString();
    const month = (formatDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth는 0부터 시작하므로 1을 더해줍니다.
    const day = formatDate.getDate().toString().padStart(2, '0');

    return [year, month, day];
  } else {
    throw new Error('Unsupported date format');
  }
}

// 사용 예시1
const date = '2024-04-01';
const parsedDate = parseDate(date);

const [year, month, day] = parsedDate;
console.log('년도:', year);
console.log('월:', month);
console.log('일:', day);

// 사용 예시2
const today = new Date().getTime();
const parsedDate2 = parseDate(today);

const [year2, month2, day2] = parsedDate;
console.log('년도:', year2);
console.log('월:', month2);
console.log('일:', day2);
