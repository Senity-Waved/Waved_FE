export default function calculateDDay(date: string): number {
  const today = new Date();
  const targetDate = new Date(date);
  const timeDiff = targetDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}
