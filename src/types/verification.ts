export interface IVerificationInfo {
  verificationId: number;
  memberId: number;
  nickname: string;
  content: string;
  imageUrl: string;
  isLiked: boolean;
  likesCount: number;
  verificationDate: string; // zonedDateTime
  link?: string | null;
}

export type TVerificationType = 'TEXT' | 'GITHUB' | 'PICTURE' | 'LINK';

export default IVerificationInfo;
