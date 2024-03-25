import TJobTitle from './jobTitle';

interface IReview {
  reviewId: number;
  challengeId: number;
  groupTitle: string;
  nickname: string;
  jobTitle?: TJobTitle;
  createDate: string;
  content: string;
}

export type TMyReview = Pick<
  IReview,
  'reviewId' | 'groupTitle' | 'createDate' | 'content'
>;

export type TChallengeReview = Pick<
  IReview,
  'nickname' | 'jobTitle' | 'createDate' | 'content'
>;

export interface IChallengeReviewList {
  content: TChallengeReview[];
  totalPages: number;
  totalElements: number;
}

export interface IMyReviewList {
  content: TMyReview[];
  totalPages: number;
  totalElements: number;
}
