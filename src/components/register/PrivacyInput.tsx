import styled from '@emotion/styled';
import YEARS from '@/constants/years';
import { EGender, TGenderOrNull } from '@/types/gender';
import { IRegisterState } from '@/types/register';

interface IPravacyInput {
  gender: TGenderOrNull;
  updateRegisterData: (newData: Partial<IRegisterState>) => void;
}

export default function PrivacyInput({
  gender: currentGender,
  updateRegisterData,
}: IPravacyInput) {
  return (
    <SPrivacyInputWrapper>
      <SBirthYearWrapper>
        <label htmlFor="birthYearInput">출생연도</label>
        <SBirthYearSelect
          name="birthYear"
          id="birthYearInput"
          onChange={(e) => updateRegisterData({ birthYear: e.target.value })}
        >
          <option value="">출생연도</option>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </SBirthYearSelect>
      </SBirthYearWrapper>
      <SGenderWrapper>
        <SGenderText>성별(선택)</SGenderText>
        <SGenderBtnWrapper>
          <SFemaleBtn
            type="button"
            gender={currentGender}
            onClick={() => updateRegisterData({ gender: EGender.Female })}
          >
            여자
          </SFemaleBtn>
          <SMaleBtn
            type="button"
            gender={currentGender}
            onClick={() => updateRegisterData({ gender: EGender.Male })}
          >
            남자
          </SMaleBtn>
        </SGenderBtnWrapper>
      </SGenderWrapper>
    </SPrivacyInputWrapper>
  );
}

const SPrivacyInputWrapper = styled.div`
  ::before {
    content: '';
    position: absolute;
    width: 90%;
    margin: 0 20px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  }
  margin-bottom: 40px;
`;

const SBirthYearWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 1.25rem;
  margin-bottom: 1.5rem;
  & label {
    height: 20px;
    line-height: 1.4;
    color: ${({ theme }) => theme.color.gray_52};
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
    margin-bottom: 1rem;
    margin-top: 0.625rem;
  }

  & select::-ms-expand {
    display: none;
  }
`;

const SBirthYearSelect = styled.select`
  height: 48px;
  background-color: ${({ theme }) => theme.color.gray_f9};
  border-radius: 8px;
  outline: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  margin-right: 1.25rem;
  padding-left: 1rem;
  padding-right: 0.75rem;

  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-repeat: no-repeat;
  background-image: url('/icons/icon-down-arrow.svg');
  background-position: right 5% bottom 50%;
`;

const SGenderWrapper = styled.div`
  margin: 0 1.25rem;
`;

const SGenderText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  margin-bottom: 1rem;
`;

const SGenderBtnWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  text-align: center;
  gap: 0.4375rem;
`;

const SFemaleBtn = styled.button<{ gender: TGenderOrNull }>`
  width: 100%;
  height: 48px;
  font-size: ${({ theme }) => theme.fontSize.body4};
  color: ${({ theme, gender }) =>
    gender === EGender.Female ? theme.color.normal : theme.color.gray_99};
  border: 1px solid
    ${({ theme, gender }) =>
      gender === EGender.Female ? theme.color.normal : theme.color.gray_ec};
  border-radius: 8px;
`;

const SMaleBtn = styled.button<{ gender: TGenderOrNull }>`
  width: 100%;
  height: 48px;
  font-size: ${({ theme }) => theme.fontSize.body4};
  color: ${({ theme, gender }) =>
    gender === EGender.Male ? theme.color.normal : theme.color.gray_99};
  border: 1px solid
    ${({ theme, gender }) =>
      gender === EGender.Male ? theme.color.normal : theme.color.gray_ec};
  border-radius: 8px;
`;
