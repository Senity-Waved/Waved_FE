import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import media from '@/styles/media';
import screenSize from '@/constants/screenSize';
import Header from '@/components/common/Header';
import Btn from '@/components/common/Btn';
import ServiceTermCheck from '@/components/register/ServiceTermCheck';
import PrivacyInput from '@/components/register/PrivacyInput';
import NicknameInput from '@/components/register/NicknameInput';
import JobTitleInput from '@/components/register/JobTitleInput';
import { TGenderOrNull } from '@/types/gender';

export interface IRegisterState {
  termAgreement: boolean;
  birthYear: string;
  gender: TGenderOrNull;
  nickname: string;
  jobTitle: string;
}

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState<IRegisterState>({
    termAgreement: false,
    birthYear: '',
    gender: null,
    nickname: '',
    jobTitle: '',
  });

  console.log(registerData);
  console.log(step);

  const updateRegisterData = (newData: Partial<IRegisterState>) => {
    setRegisterData({ ...registerData, ...newData });
  };

  const goToNextStep = () => {
    if (step === 1 && registerData.termAgreement) {
      setStep(2);
    } else if (step === 2 && registerData.birthYear) {
      setStep(3);
    } else if (step === 3 && registerData.nickname) {
      setStep(4);
    } else if (step === 4 && registerData.jobTitle) {
      console.log(`회원가입 완료: ${JSON.stringify(registerData)}`);
    }
  };

  const goToPreviousStep = () => {
    if (step === 1) {
      router.back();
      updateRegisterData({
        termAgreement: false,
        birthYear: '',
        gender: null,
        nickname: '',
        jobTitle: '',
      });
    } else if (step === 2) {
      setStep(1);
      updateRegisterData({
        termAgreement: false,
        birthYear: '',
        gender: null,
      });
    } else if (step === 3) {
      setStep(2);
      updateRegisterData({
        birthYear: '',
        gender: null,
        nickname: '',
      });
    } else if (step === 4) {
      setStep(3);
      updateRegisterData({
        nickname: '',
        jobTitle: '',
      });
    }
  };

  return (
    <SRegisterWrapper>
      <Header headerText="회원가입" />
      <SRegisterBackBtn onClick={goToPreviousStep}>
        <Image
          src="/icons/icon-left-arrow.svg"
          width={24}
          height={24}
          alt="뒤로가기 버튼"
        />
      </SRegisterBackBtn>
      <h2 className="a11yHidden">회원가입</h2>
      <SRegisterStepGuide step={step}>
        <SCurrentStep step={step}>({step}/4)</SCurrentStep>
        {step === 1 && (
          <h3>
            서비스 이용 약관에
            <br /> 동의해주세요.
          </h3>
        )}
        {step === 2 && (
          <h3>
            회원님의 정보를
            <br /> 입력해주세요.
          </h3>
        )}
        {step === 3 && <h3>닉네임을 입력해주세요.</h3>}
        {step === 4 && <h3>해당하는 직군을 선택해주세요.</h3>}
      </SRegisterStepGuide>
      <form action="" method="post" name="registerForm">
        {step === 1 && (
          <ServiceTermCheck updateRegisterData={updateRegisterData} />
        )}
        {step === 2 && (
          <PrivacyInput
            gender={registerData.gender}
            updateRegisterData={updateRegisterData}
          />
        )}
        {step === 3 && (
          <NicknameInput updateRegisterData={updateRegisterData} />
        )}
        {step === 4 && (
          <JobTitleInput
            updateRegisterData={updateRegisterData}
            jobTitle={registerData.jobTitle}
          />
        )}
      </form>
      <SRegisterNextBtnWrapper onClick={goToNextStep}>
        {step === 1 && (
          <Btn
            btns={[
              {
                text: '다음',
                styleType:
                  step === 1 && !registerData.termAgreement
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
                  step === 2 && !registerData.birthYear
                    ? 'disabled'
                    : 'primary',
                size: 'large',
              },
            ]}
          />
        )}
        {step === 3 && (
          <Btn
            btns={[
              {
                text: '다음',
                styleType:
                  step === 3 && !registerData.nickname ? 'disabled' : 'primary',
                size: 'large',
              },
            ]}
          />
        )}
        {step === 4 && (
          <Btn
            btns={[
              {
                text: '완료',
                styleType:
                  step === 4 && !registerData.jobTitle ? 'disabled' : 'primary',
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
  position: relative;
`;

const SRegisterBackBtn = styled.button`
  position: absolute;
  top: 14px;
  left: 20px;
  width: 25px;
  background-color: ${({ theme }) => theme.color.white};
  font-size: 0.625rem;
  z-index: 15;
  height: 25px;
`;

const SRegisterStepGuide = styled.div<{ step: number }>`
  position: relative;
  h3 {
    line-height: 1.4;
    height: ${({ step }) => (step === 3 || step === 4 ? '28px' : '56px')};
    margin-bottom: ${({ step }) => (step === 3 || step === 4 ? '8px' : '16px')};
    margin-top: 2rem;
    margin-left: 1.25rem;
    font-size: ${({ theme }) => theme.fontSize.headline2};
    font-weight: ${({ theme }) => theme.fontWeight.headline2};
    color: ${({ theme }) => theme.color.gray_3c};
  }
`;

const SCurrentStep = styled.span<{ step: number }>`
  position: absolute;
  top: ${({ step }) => (step === 3 || step === 4 ? '65%' : '55%')};
  right: 10%;
  transform: translate(50%, -50%);
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_bf};
`;

const SRegisterNextBtnWrapper = styled.div`
  margin: 1rem 1.25rem 0.625rem 1.25rem;
`;
