import styled from '@emotion/styled';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Btn from '@/components/common/Btn';
import ServiceTermCheck from '@/components/register/ServiceTermCheck';
import PrivacyInput from '@/components/register/PrivacyInput';
import NicknameInput from '@/components/register/NicknameInput';
import JobTitleInput from '@/components/register/JobTitleInput';
import { IRegisterState } from '@/types/register';
import { SLayoutWrapper } from '@/components/common/Layout';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [registerData, setRegisterData] = useState<IRegisterState>({
    termAgreement: false,
    birthYear: '',
    gender: null,
    nickname: '',
    jobTitle: '',
  });

  const handleForSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 4 && registerData.jobTitle)
      console.log(`회원가입 완료: ${JSON.stringify(registerData)}`);
    router.push('/register/success').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

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
      <Head>
        <title>WAVED | 회원가입</title>
        <meta name="description" content="WAVED의 회원가입 페이지입니다." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <Header headerText="회원가입" />
      <SRegisterBackBtn onClick={goToPreviousStep}>
        <Image
          src="/icons/icon-left-arrow.svg"
          width={24}
          height={24}
          alt="뒤로가기 버튼"
        />
      </SRegisterBackBtn>
      <main>
        <h2 className="a11yHidden">회원가입</h2>
        <SRegisterStepGuide step={step}>
          <SCurrentStep>({step}/4)</SCurrentStep>
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
        <form method="post" onSubmit={handleForSubmit} name="registerForm">
          {step === 1 && <ServiceTermCheck updateData={updateRegisterData} />}
          {step === 2 && (
            <PrivacyInput
              gender={registerData.gender}
              updateData={updateRegisterData}
            />
          )}
          {step === 3 && <NicknameInput updateData={updateRegisterData} />}
          {step === 4 && (
            <JobTitleInput
              updateData={updateRegisterData}
              jobTitle={registerData.jobTitle}
            />
          )}
          {step === 4 && (
            <SRegisterNextBtnWrapper step={step}>
              <Btn
                btns={[
                  {
                    text: '완료',
                    type: 'submit',
                    styleType:
                      step === 4 && !registerData.jobTitle
                        ? 'disabled'
                        : 'primary',
                    size: 'large',
                  },
                ]}
              />
            </SRegisterNextBtnWrapper>
          )}
        </form>
        <SRegisterNextBtnWrapper onClick={goToNextStep} step={step}>
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
                    step === 3 && !registerData.nickname
                      ? 'disabled'
                      : 'primary',
                  size: 'large',
                },
              ]}
            />
          )}
        </SRegisterNextBtnWrapper>
      </main>
    </SRegisterWrapper>
  );
}

const SRegisterWrapper = styled(SLayoutWrapper)`
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
    margin-bottom: ${({ step }) =>
      step === 3 || step === 4 ? '.5rem' : '1rem'};
    margin-top: 2rem;
    margin-left: 1.25rem;
    font-size: ${({ theme }) => theme.fontSize.headline2};
    font-weight: ${({ theme }) => theme.fontWeight.headline2};
    color: ${({ theme }) => theme.color.gray_3c};
  }
`;

const SCurrentStep = styled.span`
  position: absolute;
  line-height: 1.4;
  top: 50%;
  right: 10%;
  transform: translate(50%, -50%);
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_bf};
`;

const SRegisterNextBtnWrapper = styled.div<{ step: number }>`
  margin: 0 1.25rem 0.625rem 1.25rem;
  width: calc(100% - 40px);
  position: absolute;
  bottom: ${({ step }) => {
    if (step === 1) {
      return `calc(100% - 31.8125rem)`;
    }
    if (step === 2) {
      return `calc(100% - 25.0625rem)`;
    }
    if (step === 3) {
      return `calc(100% - 22.8125rem)`;
    }
    return `calc(100% - 17.5rem)`;
  }};
`;
