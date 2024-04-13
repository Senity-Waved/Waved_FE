import ONE_DAY from '@/constants/day';

export default function calculateDDay(
  date1: string,
  date2: string = 'today',
): number {
  const currentDate = new Date();
  const current = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };

  const [date1Part] = date1.split('T');
  const [year1, month1, day1] = date1Part.split('-').map(Number);

  const targetDate1 = {
    year: year1,
    month: month1,
    day: day1,
  };

  let targetDate2;
  if (date2 === 'today') {
    targetDate2 = current;
  } else {
    const [date2Part] = date2.split('T');
    const [year2, month2, day2] = date2Part.split('-').map(Number);
    targetDate2 = {
      year: year2,
      month: month2,
      day: day2,
    };
  }

  const date1Value = new Date(
    targetDate1.year,
    targetDate1.month - 1,
    targetDate1.day,
  );
  const date2Value = new Date(
    targetDate2.year,
    targetDate2.month - 1,
    targetDate2.day,
  );
  const timeDiff = date1Value.getTime() - date2Value.getTime();
  const daysDiff = Math.ceil(timeDiff / ONE_DAY);
  return daysDiff;
}
