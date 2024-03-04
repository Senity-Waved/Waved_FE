import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import media from '@/styles/media';
import screenSize from '@/constants/screenSize';
import Header from '@/components/common/Header';
import Btn from '@/components/common/Btn';
import ServiceTermCheck from '@/components/register/ServiceTermCheck';
import PrivacyInput, { GenderOrNull } from '@/components/register/PrivacyInput';
import NicknameInput from '@/components/register/NicknameInput';
import JobTitleInput from '@/components/register/JobTitleInput';

export interface IRegisterState {
  termAgreement: boolean;
  birthYear: string;
  gender: GenderOrNull;
  nickname: string;
  jobTitle: string;
}

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [registerData, setRegisterData] = useState<IRegisterState>({
    termAgreement: false,
    birthYear: '',
    gender: null,
    nickname: '',
    jobTitle: '',
  });

  console.log(registerData);

  const updateRegisterData = (newData: Partial<IRegisterState>) => {
    setRegisterData({ ...registerData, ...newData });
  };

  const goToNextStep = () => {
    if (step === 0 && registerData.termAgreement) {
      setStep(1);
    } else if (step === 1 && registerData.birthYear) {
      setStep(2);
    } else if (step === 2 && registerData.nickname) {
      setStep(3);
    } else if (step === 3 && registerData.jobTitle) {
      console.log(`회원가입 완료: ${JSON.stringify(registerData)}`);
    }
  };

  const goToPreviousStep = () => {
    if (step === 0) {
      router.back();
    } else if (step === 1) {
      setStep(0);
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <SRegisterWrapper>
      <Header headerText="회원가입" />
      <SRegisterBackBtn onClick={goToPreviousStep}>
        회원가입용 뒤로가기
      </SRegisterBackBtn>
      <h2 className="a11yHidden">회원가입</h2>
      {step === 0 && (
        <h3>
          서비스 이용 약관에
          <br /> 동의해주세요.
        </h3>
      )}
      {step === 1 && (
        <h3>
          회원님의 정보를
          <br /> 입력해주세요.
        </h3>
      )}
      {step === 2 && <h3>닉네임을 입력해주세요.</h3>}
      {step === 3 && <h3>해당하는 직군을 선택해주세요.</h3>}

      <form action="" method="post" name="registerForm">
        {step === 0 && (
          <ServiceTermCheck updateRegisterData={updateRegisterData} />
        )}
        {step === 1 && (
          <PrivacyInput
            gender={registerData.gender}
            updateRegisterData={updateRegisterData}
          />
        )}
        {step === 2 && (
          <NicknameInput updateRegisterData={updateRegisterData} />
        )}
        {step === 3 && (
          <JobTitleInput
            updateRegisterData={updateRegisterData}
            jobTitle={registerData.jobTitle}
          />
        )}
      </form>
      <SRegisterNextBtnWrapper onClick={goToNextStep}>
        {step === 0 && (
          <Btn
            btns={[
              {
                text: '다음',
                styleType:
                  step === 0 && !registerData.termAgreement
                    ? 'disabled'
                    : 'primary',
                size: 'large',
              },
            ]}
          />
        )}
        {step === 1 && (
          <Btn
            btns={[
              {
                text: '다음',
                styleType:
                  step === 1 && !registerData.birthYear
                    ? 'disabled'
                    : 'primary',
                size: 'large',
              },
            ]}
          />
        )}
        {step === 2 && (
          <Btn
            btns={[
              {
                text: '다음',
                styleType:
                  step === 2 && !registerData.nickname ? 'disabled' : 'primary',
                size: 'large',
              },
            ]}
          />
        )}
        {step === 3 && (
          <Btn
            btns={[
              {
                text: '완료',
                styleType:
                  step === 3 && !registerData.jobTitle ? 'disabled' : 'primary',
                size: 'large',
              },
            ]}
          />
        )}
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
    font-size: ${({ theme }) => theme.fontSize.headline2};
    font-weight: ${({ theme }) => theme.fontWeight.headline2};
    color: ${({ theme }) => theme.color.gray_3c};
    margin-bottom: 1.0625rem;
  }
`;

const SRegisterBackBtn = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.gray_ec};
  font-size: 0.625rem;
  z-index: 15;
  height: 25px;
`;

const SRegisterNextBtnWrapper = styled.div`
  margin: 1rem 1.25rem 0.625rem 1.25rem;
`;
