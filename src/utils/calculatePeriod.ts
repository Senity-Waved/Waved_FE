import ONE_DAY from '@/constants/day';

export default function calculatePeriod(
  startDate: string,
  endDate: string,
): string {
  const targetStartDate = new Date(startDate.replace(/Z/g, ''));
  const targetEndDate = new Date(endDate.replace(/Z/g, ''));
  const timeDiff = targetEndDate.getTime() - targetStartDate.getTime() + 1;
  const daysDiff = Math.ceil(timeDiff / ONE_DAY);

  let periodStr = '';
  if (daysDiff % 7 === 0) {
    periodStr = `${daysDiff / 7}주`;
  } else {
    periodStr = `${daysDiff}일`;
  }
  return periodStr;
}
