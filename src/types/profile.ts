import { JOB_TITLE_KR } from '@/constants/jobTitle';

export type JobTitleKey = keyof typeof JOB_TITLE_KR;

export default interface IProfile {
  nickname?: string;
  jobTitle?: JobTitleKey | null;
  githubId?: string | null;
}
