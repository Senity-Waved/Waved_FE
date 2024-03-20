export interface IVerificationInfo {
  verificationId: number;
  authorId: number;
  authorName: string;
  content: string;
  liked: boolean;
  likeCount: number;
  time: string; // zonedDateTime
  link?: string;
}

export type TVerificationType = 'TEXT' | 'GITHUB' | 'PICTURE' | 'LINK';

export default IVerificationInfo;
