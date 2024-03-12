import styled from '@emotion/styled';
import IRegisterState from '@/types/register';

interface INicknameInput {
  updateData: (newData: Partial<IRegisterState>) => void;
  setIsNicknameValid: (nicknmaeValid: boolean) => void;
  isNicknameValid: boolean;
  value?: string;
}

export default function NicknameInput({
  updateData,
  setIsNicknameValid,
  isNicknameValid,
  value,
}: INicknameInput) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameValue = e.target.value;
    const valid = nicknameValue.length <= 10;
    setIsNicknameValid(valid);
    if (valid) {
      updateData({ nickname: nicknameValue });
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <SNicknameInputWrapper>
      <SNickNameWordsText>최대 10자</SNickNameWordsText>
      <SNicknameInput
        type="text"
        name="nickname"
        id="nicknameInput"
        placeholder="닉네임"
        value={value}
        onChange={handleChange}
        onKeyDown={handleEnterKey}
        isNicknameValid={isNicknameValid}
      />
      <SNicknameValidText>
        {!isNicknameValid && '최대 10글자까지 입력 가능합니다.'}
      </SNicknameValidText>
    </SNicknameInputWrapper>
  );
}

const SNicknameInputWrapper = styled.div`
  margin: 0 1.25rem;
`;

const SNickNameWordsText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  color: ${({ theme }) => theme.color.gray_99};
  height: 17px;
  margin-bottom: 1.5rem;
`;

const SNicknameInput = styled.input<{ isNicknameValid: boolean }>`
  height: 25px;
  width: 100%;
  margin-right: 1.25rem;
  outline: none;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray_de};
  padding-bottom: 0.0625rem;
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_ec};
  }

  &:focus {
    border-bottom: 2px solid
      ${({ theme, isNicknameValid }) =>
        isNicknameValid ? theme.color.gray_3c : theme.color.error};
  }
`;

const SNicknameValidText = styled.p`
  height: 20px;
  margin-top: 4px;
  color: ${({ theme }) => theme.color.error};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
`;
