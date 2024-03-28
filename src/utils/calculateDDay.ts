import ONE_DAY from '@/constants/day';

export default function calculateDDay(date: string): number {
  const today = new Date();
  const targetDate = new Date(date.replace(/Z/g, ''));
  const timeDiff = targetDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / ONE_DAY);
  return daysDiff;
}
