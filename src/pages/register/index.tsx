import styled from '@emotion/styled';

import media from '@/styles/media';
import screenSize from '@/constants/screenSize';
import Header from '@/components/common/Header';
import Btn from '@/components/common/Btn';
import ServiceTermCheck from '@/components/register/ServiceTermCheck';

export default function Register() {
  return (
    <SRegisterWrapper>
      <Header headerText="회원가입" />
      <h2 className="a11yHidden">회원가입</h2>
      <h3>
        서비스 이용 약관에
        <br /> 동의해주세요.
      </h3>
      <ServiceTermCheck />
      <SRegisterNextBtnWrapper>
        <Btn btns={[{ text: '다음', styleType: 'gray', size: 'large' }]} />
      </SRegisterNextBtnWrapper>
    </SRegisterWrapper>
  );
}

const SRegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${screenSize.max}px;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  ${media.mobileMax} {
    width: 100vw;
  }

  & h3 {
    margin-top: 2rem;
    margin-left: 1.25rem;
    height: 53px;
    line-height: 1.4;
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.color.gray_3c};
    margin-bottom: 17px;
  }
`;

const SRegisterNextBtnWrapper = styled.div`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin: 1rem 1.25rem 0.625rem 1.25rem;
`;
