/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { SLayoutWrapper } from '@/components/common/Layout';
import { getProgressChallengeGroupApi } from '@/lib/axios/admin/api';
import parseDate from '@/utils/parseDate';

interface IAdminProgressChallengeGroup {
  groupTitle: string;
  startDate: string;
  endDate: string;
}

export default function AdminPage() {
  const [progressChallengeGroupData, setProgressChallengeGroupData] = useState<
    IAdminProgressChallengeGroup[] | []
  >();

  // useEffect(() => {
  //   const testProgressChallengeGroupData = [
  //     {
  //       groupTitle: '백엔드 기술면접 챌린지 2기',
  //       startDate: '2024-03-11T00:00:00+09:00',
  //       endDate: '2024-03-24T00:00:00+09:00',
  //     },
  //     {
  //       groupTitle: '프론트엔드 아티클 공유 챌린지 2기',
  //       startDate: '2024-03-11T00:00:00+09:00',
  //       endDate: '2024-03-24T00:00:00+09:00',
  //     },
  //     {
  //       groupTitle: '1일 1커밋 챌린지 2기',
  //       startDate: '2024-03-11T00:00:00+09:00',
  //       endDate: '2024-03-24T00:00:00+09:00',
  //     },
  //     {
  //       groupTitle: '스크린타임 4시간 챌린지 2기',
  //       startDate: '2024-03-11T00:00:00+09:00',
  //       endDate: '2024-03-24T00:00:00+09:00',
  //     },
  //   ];

  //   setProgressChallengeGroupData(testProgressChallengeGroupData);
  // }, []);

  useEffect(() => {
    const fetchProgressGroup = async () => {
      try {
        const response = await getProgressChallengeGroupApi();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setProgressChallengeGroupData(response.data);
      } catch (error) {
        console.error(
          '관리자 | 진행중인 챌린지 그룹 조회를 실패하였습니다. ',
          error,
        );
      }
    };
    fetchProgressGroup().catch((error) => console.error(error));
  }, []);

  return (
    <SAdminPageWrapper>
      <Head>
        <title>WAVED | 관리자 페이지</title>
        <meta name="description" content="관리자 페이지" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <h2>관리자 페이지</h2>
        <SAdminProgressChallengeWrapper>
          <h3>진행중인 챌린지</h3>
          <div>
            {progressChallengeGroupData ? (
              progressChallengeGroupData.length > 0 ? (
                progressChallengeGroupData.map((challengeGroup) => (
                  <SprogressGroupBox
                    key={challengeGroup.groupTitle + challengeGroup.startDate}
                  >
                    <p>{challengeGroup.groupTitle}</p>
                    <span>{parseDate(challengeGroup.startDate)}</span>~
                    <span>{parseDate(challengeGroup.endDate)}</span>
                  </SprogressGroupBox>
                ))
              ) : (
                <p>현재 진행중인 챌린지 그룹이 없습니다.</p>
              )
            ) : (
              <p>진행중인 챌린지 그룹 조회를 실패하였습니다.</p>
            )}
          </div>
        </SAdminProgressChallengeWrapper>
        <div>
          <h3>챌린지 그룹별 인증내역 조회</h3>
        </div>
      </main>
    </SAdminPageWrapper>
  );
}

const SAdminPageWrapper = styled(SLayoutWrapper)`
  display: flex;
  & main {
    display: flex;
    flex-flow: column nowrap;

    & h2 {
      font-size: ${({ theme }) => theme.fontSize.headline2};
      font-weight: ${({ theme }) => theme.fontWeight.headline2};
      border-bottom: 3px solid ${({ theme }) => theme.color.gray_de};
    }
  }
`;

const SAdminProgressChallengeWrapper = styled.div`
  & h3 {
    font-size: ${({ theme }) => theme.fontSize.subtitle2};
    font-weight: ${({ theme }) => theme.fontWeight.subtitle2};
    margin: 10px 0;
  }
  height: 320px;
  border-bottom: 3px solid ${({ theme }) => theme.color.gray_de};
`;

const SprogressGroupBox = styled.div`
  margin-bottom: 10px;
  & p {
    font-size: ${({ theme }) => theme.fontSize.body1};
    font-weight: ${({ theme }) => theme.fontWeight.body1};
  }
  & span {
    font-size: ${({ theme }) => theme.fontSize.body3};
    font-weight: ${({ theme }) => theme.fontWeight.body3};
  }
`;
