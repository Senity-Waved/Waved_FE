export default function parseChallengeTitle(title: string): string {
  const titleArr = title.split(' ');
  return titleArr.splice(0, titleArr.length - 1).join(' ');
}
