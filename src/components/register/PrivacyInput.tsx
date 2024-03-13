import styled from '@emotion/styled';
import { useState } from 'react';
import YEARS from '@/constants/years';
import TGenderOrNull, { EGender } from '@/types/gender';
import IRegisterState from '@/types/register';

interface IPravacyInput {
  gender: TGenderOrNull;
  birthYear: string;
  updateData: (newData: Partial<IRegisterState>) => void;
}

export default function PrivacyInput({
  gender: currentGender,
  updateData,
  birthYear: currentBirthYear,
}: IPravacyInput) {
  const [selectedBirthYear, setSelectedBirthYear] =
    useState<string>(currentBirthYear);

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    setSelectedBirthYear(newYear);
    updateData({ birthYear: newYear });
  };

  return (
    <SPrivacyInputWrapper>
      <SBirthYearWrapper>
        <label htmlFor="birthYearInput">출생연도</label>
        <SBirthYearSelect
          name="birthYear"
          id="birthYearInput"
          value={selectedBirthYear}
          onChange={handleBirthYearChange}
        >
          <option value="출생연도">출생연도</option>
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
          <SGenderBtn
            type="button"
            selectedGender={currentGender === EGender.Female}
            onClick={() => updateData({ gender: EGender.Female })}
          >
            여자
          </SGenderBtn>
          <SGenderBtn
            type="button"
            selectedGender={currentGender === EGender.Male}
            onClick={() => updateData({ gender: EGender.Male })}
          >
            남자
          </SGenderBtn>
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
  border: none;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  margin-right: 1.25rem;
  padding-left: 1rem;
  padding-right: 0.75rem;
  /* outline: blue; */

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

const SGenderBtn = styled.button<{ selectedGender: boolean }>`
  width: 100%;
  height: 48px;
  font-size: ${({ theme }) => theme.fontSize.body4};
  color: ${({ theme, selectedGender }) =>
    selectedGender ? theme.color.normal : theme.color.gray_99};
  border: 1px solid
    ${({ theme, selectedGender }) =>
      selectedGender ? theme.color.normal : theme.color.gray_ec};
  border-radius: 8px;
`;
