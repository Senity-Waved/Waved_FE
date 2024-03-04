import styled from '@emotion/styled';
import { IRegisterState } from '@/pages/register';

interface INicknameInput {
  updateRegisterData: (newData: Partial<IRegisterState>) => void;
}

export default function NicknameInput({ updateRegisterData }: INicknameInput) {
  return (
    <SNicknameInputWrapper>
      <p>최대 20자</p>
      <input
        type="text"
        name="nickname"
        id="nicknameInput"
        placeholder="닉네임"
        onChange={(e) => updateRegisterData({ nickname: e.target.value })}
      />
    </SNicknameInputWrapper>
  );
}

const SNicknameInputWrapper = styled.div``;
