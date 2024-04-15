import ONE_DAY from '@/constants/day';

export default function calculateDDay(
  date1: string,
  date2: string = 'today',
): number {
  const targetDate1 = new Date(date1.replace(/Z/g, ''));
  const targetDate2 =
    date2 === 'today' ? new Date() : new Date(date2.replace(/Z/g, ''));
  const timeDiff = targetDate1.getTime() - targetDate2.getTime();
  const daysDiff = Math.ceil(timeDiff / ONE_DAY);
  return daysDiff;
}
