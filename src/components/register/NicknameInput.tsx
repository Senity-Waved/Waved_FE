import styled from '@emotion/styled';
import { IRegisterState } from '@/types/register';

interface INicknameInput {
  updateRegisterData: (newData: Partial<IRegisterState>) => void;
}

export default function NicknameInput({ updateRegisterData }: INicknameInput) {
  return (
    <SNicknameInputWrapper>
      <SNickNameWordsText>최대 10자</SNickNameWordsText>
      <SNicknameInput
        type="text"
        name="nickname"
        id="nicknameInput"
        placeholder="닉네임"
        onChange={(e) => updateRegisterData({ nickname: e.target.value })}
      />
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

const SNicknameInput = styled.input`
  height: 25px;
  width: 100%;
  margin-right: 1.25rem;
  outline: none;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray_de};
  padding-bottom: 0.0625rem;
  font-size: ${({ theme }) => theme.fontSize.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  margin-bottom: 10.625rem;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_ec};
  }
`;
