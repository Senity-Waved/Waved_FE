import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import NicknameInput from '@/components/register/NicknameInput';
import { IRegisterState } from '@/types/register';
import JobTitleInput from '@/components/register/JobTitleInput';
import PrivacyInput from '@/components/register/PrivacyInput';
import Btn from '@/components/common/Btn';

export default function ProfileEdit() {
  const router = useRouter();
  const [editProfile, setEditProfile] = useState<IRegisterState>({
    birthYear: '',
    gender: null,
    nickname: '',
    jobTitle: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`프로필 수정: ${JSON.stringify(editProfile)}`);
    router.push('/profile').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  const updateProfileData = (newProfile: Partial<IRegisterState>) => {
    setEditProfile({ ...editProfile, ...newProfile });
  };

  return (
    <Layout
      noFooter
      headerText="프로필 수정"
      title="프로필 수정"
      description="회원의 닉네임, 직군, 출생연도, 성별 등 개인 정보를 수정할 수 있는 페이지입니다."
    >
      <SProfileEditWrapper>
        <h2 className="a11yHidden">프로필 수정</h2>
        <form onSubmit={handleSubmit}>
          <h3>닉네임을 입력해주세요.</h3>
          <NicknameInput updateData={updateProfileData} />
          <h3>해당하는 직군을 선택해주세요.</h3>
          <JobTitleInput
            jobTitle={editProfile.jobTitle}
            updateData={updateProfileData}
          />
          <h3>회원님의 정보를 입력해주세요.</h3>
          <PrivacyInput
            gender={editProfile.gender}
            updateData={updateProfileData}
          />
          <SEditBtnWrapper>
            <Btn
              btns={[
                {
                  text: '수정하기',
                  styleType: 'primary',
                  size: 'large',
                  type: 'submit',
                },
              ]}
            />
          </SEditBtnWrapper>
        </form>
      </SProfileEditWrapper>
    </Layout>
  );
}

const SProfileEditWrapper = styled.div`
  & h3 {
    margin: 0 1.25rem;
    line-height: 1.4;
    height: 28px;
    margin-bottom: 0.5rem;
    margin-top: 1.875rem;
    font-size: ${({ theme }) => theme.fontSize.headline2};
    font-weight: ${({ theme }) => theme.fontWeight.headline2};
  }
`;

const SEditBtnWrapper = styled.div`
  margin: 1.875rem 1.25rem 0 1.25rem;
`;
