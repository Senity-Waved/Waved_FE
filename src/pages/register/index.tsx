import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import media from '@/styles/media';
import screenSize from '@/constants/screenSize';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import Header from '@/components/common/Header';

export default function register() {
  return (
    <SRegisterWrapper>
      <Header headerText="회원가입" />
      <h2 className="a11yHidden">회원가입</h2>
      <SRegisterCheckWrapper>
        <h3>서비스 이용 약관에 동의해주세요.</h3>
        <form action="" method="post" name="registerForm">
          <SAllCheckInputWrapper>
            <input type="checkbox" name="allCheck" id="allCheck" />
            <label htmlFor="allCheck">전체 동의</label>
          </SAllCheckInputWrapper>
          <SRegisterCheckInputWrapper>
            <input type="checkbox" name="ageCheck" id="ageCheck" />
            <label htmlFor="ageCheck">(필수) 만 14세 이상입니다.</label>
          </SRegisterCheckInputWrapper>
          <SRegisterCheckInputWrapper className="serviceTermCheck">
            <div>
              <input type="checkbox" name="termCheck" id="termCheck" />
              <label htmlFor="termCheck">(필수) 서비스 이용약관동의</label>
            </div>
            <SServiceTermLink>
              <Link href="/">
                <Image
                  src="/icons/icon-right-arrow.svg"
                  alt="서비스 이용약관 보기"
                  width={24}
                  height={24}
                />
              </Link>
            </SServiceTermLink>
          </SRegisterCheckInputWrapper>
          <SRegisterCheckInputWrapper>
            <input type="checkbox" name="privacyCheck" id="privacyCheck" />
            <label htmlFor="privacyCheck">
              (필수) 개인정보 수집 및 이용 동의
            </label>
          </SRegisterCheckInputWrapper>
        </form>
      </SRegisterCheckWrapper>
      <SSeriveTermImage
        src="/images/image-service-terms.svg"
        alt="개인정보 수집 목적, 항목, 보유기간 안내"
        width={335}
        height={140}
      />
      <SRegisterNextBtnWrapper>
        <BottomFixedBtn
          btns={[{ text: '다음', styleType: 'gray', size: 'large' }]}
        />
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
`;

const SRegisterCheckWrapper = styled.div`
  margin-top: 32px;
  margin-left: 20px;

  & h3 {
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.color.gray_3c};
    margin-bottom: 17px;
  }

  & form {
    color: ${({ theme }) => theme.color.gray_3c};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  & input[type='checkbox'] {
    zoom: 1.5;
  }

  & label {
    margin-left: 12px;
  }
`;

const SAllCheckInputWrapper = styled.div`
  font-size: 1rem;
  height: 22px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    width: 95%;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_de};
  }
`;

const SRegisterCheckInputWrapper = styled.div`
  font-size: 0.875rem;
  height: 20px;
  margin-bottom: 20px;
  line-height: 10px;
  display: flex;
  align-items: center;

  &.serviceTermCheck {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;

    & div {
      display: flex;
      align-items: center;
    }
  }
`;

const SServiceTermLink = styled.div`
  height: 20px;
`;
const SSeriveTermImage = styled(Image)`
  margin-left: 20px;
`;

const SRegisterNextBtnWrapper = styled.div`
  position: relative;
  top: 10%;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.gray_83};
  margin-top: 16px;
`;
