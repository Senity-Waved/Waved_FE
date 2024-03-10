import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/common/Layout';
import Btn from '@/components/common/Btn';

interface IGithub {
  githubId: string;
  githubToken: string;
}

export default function MyGithub() {
  const [githubData, setGithubData] = useState<IGithub>({
    githubId: '',
    githubToken: '',
  });

  const [isGithubLinked, setIsGithubLinked] = useState<boolean>(
    githubData.githubId !== '' && githubData.githubToken !== '',
  );

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isGithubLinked) {
      setIsGithubLinked(false);
      console.log('연동 해지');
    } else {
      setIsGithubLinked(true);
      console.log(`깃허브 연동 : ${JSON.stringify(githubData)}`);
    }
    router.push('/profile').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  useEffect(() => {
    console.log(`깃허브 연동 상태 : ${isGithubLinked}`);
  }, [isGithubLinked]);

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
          해당 연동은 &#34;1일 1커밋&#34; 챌린지 참여자에게 필수입니다.
        </SGithubGuide>
        <SGithubForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor="githubIdInput">아이디</label>
            <input
              type="text"
              id="githubIdInput"
              name="githubId"
              value={githubData.githubId}
              onChange={(e) =>
                setGithubData({ ...githubData, githubId: e.target.value })
              }
              placeholder="깃허브 아이디를 입력해주세요"
            />
          </div>
          <div>
            <label htmlFor="githubTokenInput">토큰</label>
            <input
              type="text"
              id="githubTokenInput"
              name="githubToken"
              value={githubData.githubToken}
              onChange={(e) =>
                setGithubData({ ...githubData, githubToken: e.target.value })
              }
              placeholder="토큰을 입력해주세요"
            />
          </div>
          <SMyGithubBtnWrapper>
            <Btn
              btns={[
                {
                  text: isGithubLinked ? '해지하기' : '연동하기',
                  styleType: 'primary',
                  size: 'large',
                  type: 'submit',
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
    </Layout>
  );
}

const SMyGithubWrapper = styled.div``;

const SGithubGuide = styled.p`
  margin: 1.5rem 1.25rem 1rem 1.25rem;
  height: 52px;
  line-height: 52px;
  text-align: center;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.light};
  color: ${({ theme }) => theme.color.normal};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
`;

const SGithubForm = styled.form`
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
      color: ${({ theme }) => theme.color.gray_ec};
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
