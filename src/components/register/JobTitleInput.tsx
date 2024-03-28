import styled from '@emotion/styled';
import { JOBTITLE } from '@/constants/jobTitle';
import IRegisterState from '@/types/register';

interface IJobTitleInput {
  jobTitle: string;
  updateData: (newData: Partial<IRegisterState>) => void;
  value?: string;
}

export default function JobTitleInput({
  jobTitle: currentJobTitle,
  updateData,
  value,
}: IJobTitleInput) {
  return (
    <SJobTitleInputWrapper>
      <SJobTitleChipWrapper>
        <SJobTitleChip
          value={value}
          type="button"
          active={currentJobTitle === JOBTITLE.FRONT}
          onClick={() => updateData({ jobTitle: JOBTITLE.FRONT })}
        >
          프론트엔드
        </SJobTitleChip>
        <SJobTitleChip
          type="button"
          active={currentJobTitle === JOBTITLE.BACK}
          onClick={() => updateData({ jobTitle: JOBTITLE.BACK })}
        >
          백엔드
        </SJobTitleChip>
        <SJobTitleChip
          type="button"
          active={currentJobTitle === JOBTITLE.FULL}
          onClick={() => updateData({ jobTitle: JOBTITLE.FULL })}
        >
          풀 스택
        </SJobTitleChip>
        <SJobTitleChip
          type="button"
          active={currentJobTitle === JOBTITLE.ANDROID}
          onClick={() => updateData({ jobTitle: JOBTITLE.ANDROID })}
        >
          안드로이드
        </SJobTitleChip>
        <SJobTitleChip
          type="button"
          active={currentJobTitle === JOBTITLE.IOS}
          onClick={() => updateData({ jobTitle: JOBTITLE.IOS })}
        >
          iOS
        </SJobTitleChip>
        <SJobTitleChip
          type="button"
          active={currentJobTitle === JOBTITLE.DEV}
          onClick={() => updateData({ jobTitle: JOBTITLE.DEV })}
        >
          데브옵스
        </SJobTitleChip>
        <SJobTitleChip
          type="button"
          active={currentJobTitle === JOBTITLE.BLOCKCHAIN}
          onClick={() => updateData({ jobTitle: JOBTITLE.BLOCKCHAIN })}
        >
          블록체인
        </SJobTitleChip>
        <SJobTitleChip
          type="button"
          active={currentJobTitle === JOBTITLE.MACINE}
          onClick={() => updateData({ jobTitle: JOBTITLE.MACINE })}
        >
          머신러닝
        </SJobTitleChip>
        <SJobTitleChip
          type="button"
          active={currentJobTitle === JOBTITLE.ETC}
          onClick={() => updateData({ jobTitle: JOBTITLE.ETC })}
        >
          기타
        </SJobTitleChip>
      </SJobTitleChipWrapper>
    </SJobTitleInputWrapper>
  );
}

const SJobTitleInputWrapper = styled.div``;

const SJobTitleChipWrapper = styled.div`
  margin: 1.5rem 1.25rem 0 1.25rem;
  width: auto;
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
`;

const SJobTitleChip = styled.button<{ active: boolean }>`
  width: auto;
  padding: 0.5rem 0.75rem;
  height: 36px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray_f9};
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.color.normal : theme.color.gray_ec};
  color: ${({ theme, active }) =>
    active ? theme.color.normal : theme.color.gray_3c};
`;
