import styled from '@emotion/styled';
import YEARS from '../../constants/years';
import { IRegisterState } from '@/pages/register';

enum Gender {
  Male = 'male',
  Female = 'female',
}

export type GenderOrNull = Gender | null;

interface IPravacyInput {
  gender: GenderOrNull;
  updateRegisterData: (newData: Partial<IRegisterState>) => void;
}

export default function PrivacyInput({
  gender: currentGender,
  updateRegisterData,
}: IPravacyInput) {
  return (
    <SPrivacyInputWrapper>
      <SPrivacyText>챌린지 준비 첫 단계를 시작합니다!</SPrivacyText>
      <div>
        <label htmlFor="birthYearInput">출생연도</label>
        <select
          name="birthYear"
          id="birthYearInput"
          onChange={(e) => updateRegisterData({ birthYear: e.target.value })}
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <SGenderWrapper>
        <p>성별(선택)</p>
        <SFemaleBtn
          type="button"
          gender={currentGender}
          onClick={() => updateRegisterData({ gender: Gender.Female })}
        >
          여자
        </SFemaleBtn>
        <SMaleBtn
          type="button"
          gender={currentGender}
          onClick={() => updateRegisterData({ gender: Gender.Male })}
        >
          남자
        </SMaleBtn>
      </SGenderWrapper>
    </SPrivacyInputWrapper>
  );
}

const SPrivacyInputWrapper = styled.div``;

const SPrivacyText = styled.p`
  height: 20px;
  position: relative;
  margin-bottom: 1.8125rem;
  margin-left: 1.25rem;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 95%;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_de};
  }
`;

const SGenderWrapper = styled.div``;

const SFemaleBtn = styled.button<{ gender: GenderOrNull }>`
  color: ${({ gender }) => (gender === Gender.Female ? 'yellow' : 'black')};
`;
const SMaleBtn = styled.button<{ gender: GenderOrNull }>`
  color: ${({ gender }) => (gender === Gender.Male ? 'yellow' : 'black')};
`;
