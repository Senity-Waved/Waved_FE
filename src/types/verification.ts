export interface IVerificationInfo {
  verificationId: number;
  authorId: number;
  authorName: string;
  content: string;
  liked: boolean;
  likeCount: number;
  time: string; //timestamp
  link?: string;
}

export type TVerificationType = 'TEXT' | 'GITHUB' | 'PHOTO' | 'LINK';

export default IVerificationInfo;
