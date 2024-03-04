import styled from '@emotion/styled';
import { IRegisterState } from '@/pages/register';
import JOBTITLE from '@/constants/jobTitle';

interface IJobTitleInput {
  jobTitle: string;
  updateRegisterData: (newData: Partial<IRegisterState>) => void;
}

export default function JobTitleInput({
  jobTitle: currentJobTitle,
  updateRegisterData,
}: IJobTitleInput) {
  return (
    <SJobTitleInputWrapper>
      <p>해당 직군 선택</p>
      <SFrontBtn
        type="button"
        jobTitle={currentJobTitle}
        onClick={() => updateRegisterData({ jobTitle: JOBTITLE.FRONT })}
      >
        프론트엔드
      </SFrontBtn>
      <SBackBtn
        type="button"
        jobTitle={currentJobTitle}
        onClick={() => updateRegisterData({ jobTitle: JOBTITLE.BACK })}
      >
        백엔드
      </SBackBtn>
      <SFullBtn
        type="button"
        jobTitle={currentJobTitle}
        onClick={() => updateRegisterData({ jobTitle: JOBTITLE.FULL })}
      >
        풀스택
      </SFullBtn>
      <SDevBtn
        type="button"
        jobTitle={currentJobTitle}
        onClick={() => updateRegisterData({ jobTitle: JOBTITLE.DEV })}
      >
        데브옵스
      </SDevBtn>
    </SJobTitleInputWrapper>
  );
}

const SJobTitleInputWrapper = styled.div``;

const SFrontBtn = styled.button<{ jobTitle: string }>``;
const SBackBtn = styled.button<{ jobTitle: string }>``;
const SFullBtn = styled.button<{ jobTitle: string }>``;
const SDevBtn = styled.button<{ jobTitle: string }>``;
