export interface IVerificationInfo {
  verificationId: number;
  memberId: number;
  nickname: string;
  content: string;
  imageUrl: string;
  liked: boolean;
  likesCount: number;
  verificationDate: string; // zonedDateTime
  link?: string | null;
}

export interface ICollectionInfo {
  groupTitle: string;
  startDate: string;
  endDate: string;
}

export type TVerificationType = 'TEXT' | 'GITHUB' | 'PICTURE' | 'LINK';
