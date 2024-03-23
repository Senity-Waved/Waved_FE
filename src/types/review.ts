export interface IReviewList {
  content: TChallengeReview[];
  totalPages: number;
  totalElements: number;
}

interface IReview {
  challengeId: number;
  groupTitle: string;
  nickname: string;
  jobTitle?: string;
  createDate: string;
  content: string;
}

export type TMyReview = Pick<IReview, 'groupTitle' | 'createDate' | 'content'>;

export type TChallengeReview = Pick<
  IReview,
  'nickname' | 'jobTitle' | 'createDate' | 'content'
>;
