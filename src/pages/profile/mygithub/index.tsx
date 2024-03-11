import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/common/Layout';
import Btn from '@/components/common/Btn';
import Portal from '@/components/modal/ModalPortal';
import Modal from '@/components/modal/Modal';

interface IGithub {
  githubId: string;
  githubToken: string;
}

export default function MyGithub() {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [githubData, setGithubData] = useState<IGithub>({
    githubId: 'hello_world',
    githubToken: '12345678',
  });
  const isGithubValid = true;
  // 깃허브 연동 상태
  const [isGithubLinked, setIsGithubLinked] = useState<boolean>(
    githubData.githubId !== '' && githubData.githubToken !== '',
  );

  const navigateToProfile = (queryParam: { [key: string]: boolean }): void => {
    router
      .push({
        pathname: '/profile',
        query: queryParam,
      })
      .catch((error: Error) => {
        console.error('페이지 이동에 실패하였습니다.', error);
      });
  };

  // 연동하기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isGithubValid) {
      setIsGithubLinked(true);
      console.log(`깃허브 연동: ${JSON.stringify(githubData)}`);
      navigateToProfile({ githubLinked: true });
    } else {
      console.log('유효하지 않은 깃허브 아이디 혹은 토큰입니다.');
      navigateToProfile({ linkedFail: true });
    }
  };

  const clickModalBtn = () => {
    if (isGithubLinked) {
      setIsGithubLinked(false);
      navigateToProfile({ linkedCancel: true });
    }
    closeModal();
  };

  return (
    <Layout
      noFooter
      headerText="깃허브 연동 관리"
      title="깃허브 연동 관리"
      description="깃허브 아이디와 토큰을 입력하여, 깃허브 연동을 할 수 있는 페이지입니다. 연동 혹은 해지가 가능합니다."
    >
      <SMyGithubWrapper>
        <h2 className="a11yHidden">깃허브 연동 관리</h2>
        <SGithubGuide>
          <p>해당 연동은 &#34;1일 1커밋&#34; 챌린지 참여자에게 필수입니다.</p>
          <p>
            Waved에서는 토큰의 유효기간을 확인해주지 않습니다.
            <br />
            토큰 입력 전 유효기간을 꼭 확인하고 해주세요.
          </p>
        </SGithubGuide>
        <SGithubForm onSubmit={handleSubmit} isGithubLinked={isGithubLinked}>
          <div>
            <label htmlFor="githubIdInput">아이디</label>
            <input
              type="text"
              id="githubIdInput"
              name="githubId"
              readOnly={isGithubLinked}
              onChange={(e) =>
                setGithubData({ ...githubData, githubId: e.target.value })
              }
              placeholder={
                isGithubLinked
                  ? githubData.githubId
                  : '깃허브 아이디를 입력해주세요'
              }
            />
          </div>
          <div>
            <label htmlFor="githubTokenInput">토큰</label>
            <input
              type="text"
              id="githubTokenInput"
              name="githubToken"
              readOnly={isGithubLinked}
              onChange={(e) =>
                setGithubData({ ...githubData, githubToken: e.target.value })
              }
              placeholder={
                isGithubLinked ? githubData.githubToken : '토큰을 입력해주세요'
              }
            />
          </div>
          <SMyGithubBtnWrapper>
            <Btn
              btns={[
                {
                  text: isGithubLinked ? '해지하기' : '연동하기',
                  styleType: 'primary',
                  size: 'large',
                  type: isGithubLinked ? 'button' : 'submit',
                  onClick: isGithubLinked ? openModal : undefined,
                },
              ]}
            />
          </SMyGithubBtnWrapper>
        </SGithubForm>
        <SGithubGuideBtnWrapper>
          <SGithubGuideLink href="/">
            <span>토큰 가져오는 방법</span>
          </SGithubGuideLink>
        </SGithubGuideBtnWrapper>
      </SMyGithubWrapper>
      {isModalOpen && (
        <Portal>
          <Modal
            image="/icons/icon-exclamation-mark.svg"
            mainText="정말 연동을 해지하시겠습니까?"
            subText="연동을 해지하면, 현재 깃허브 챌린지를 참가하고 있을 경우 중도 포기로 간주됩니다."
            btnText="네, 해지할게요"
            onClick={clickModalBtn}
            onClose={closeModal}
          />
        </Portal>
      )}
    </Layout>
  );
}

const SMyGithubWrapper = styled.div``;

const SGithubGuide = styled.div`
  margin: 1.5rem 1.25rem 1rem 1.25rem;
  background-color: ${({ theme }) => theme.color.light};
  text-align: center;
  height: 106px;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  & p:first-of-type {
    color: ${({ theme }) => theme.color.normal};
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
  }

  & p:last-of-type {
    font-size: ${({ theme }) => theme.fontSize.caption2};
    font-weight: ${({ theme }) => theme.fontWeight.caption2};
    color: ${({ theme }) => theme.color.gray_83};
  }
`;

const SGithubForm = styled.form<{ isGithubLinked: boolean }>`
  height: 262px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  gap: 1.875rem;

  & label {
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
    padding-top: 32px;
    margin: 0 1.25rem;
  }

  & input {
    height: 25px;
    outline: none;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.color.gray_de};
    padding-bottom: 0.0625rem;
    font-size: ${({ theme }) => theme.fontSize.subtitle1};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
    margin: 1rem 1.25rem 0 1.25rem;

    &::placeholder {
      color: ${({ theme, isGithubLinked }) =>
        isGithubLinked ? theme.color.gray_de : theme.color.gray_bf};
    }
  }

  & div {
    display: flex;
    flex-flow: column nowrap;
  }
`;

const SGithubGuideBtnWrapper = styled.div`
  width: calc(100% - 2.5rem);
  margin: 1.5rem 1.25rem 0 1.25rem;
  display: flex;
  justify-content: flex-end;
`;

const SGithubGuideLink = styled(Link)`
  background-image: url('/icons/icon-question.svg');
  background-repeat: no-repeat;
  padding-left: 20px;
  background-position: left bottom;
  width: 140px;
  height: 18px;
  line-height: 18px;
  font-size: ${({ theme }) => theme.fontSize.capton2};
  font-weight: ${({ theme }) => theme.fontWeight.capton2};
  color: ${({ theme }) => theme.color.gray_99};

  & span {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_99};
  }
`;
const SMyGithubBtnWrapper = styled.div`
  margin: 0 1.25rem 0.625rem 1.25rem;
  width: calc(100% - 40px);
  position: absolute;
  bottom: 3.125rem;
`;
