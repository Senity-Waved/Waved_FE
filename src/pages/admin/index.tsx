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
  groupId: number;
}

export default function AdminPage() {
  const [progressChallengeGroupData, setProgressChallengeGroupData] = useState<
    IAdminProgressChallengeGroup[] | []
  >();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  useEffect(() => {
    const testProgressChallengeGroupData = [
      {
        groupTitle: '백엔드 기술면접 챌린지 2기',
        startDate: '2024-03-11T00:00:00+09:00',
        endDate: '2024-03-24T00:00:00+09:00',
        groupId: 1,
      },
      {
        groupTitle: '프론트엔드 아티클 공유 챌린지 2기',
        startDate: '2024-03-11T00:00:00+09:00',
        endDate: '2024-03-24T00:00:00+09:00',
        groupId: 2,
      },
      {
        groupTitle: '1일 1커밋 챌린지 2기',
        startDate: '2024-03-11T00:00:00+09:00',
        endDate: '2024-03-24T00:00:00+09:00',
        groupId: 3,
      },
      {
        groupTitle: '스크린타임 4시간 챌린지 2기',
        startDate: '2024-03-11T00:00:00+09:00',
        endDate: '2024-03-24T00:00:00+09:00',
        groupId: 4,
      },
    ];

    setProgressChallengeGroupData(testProgressChallengeGroupData);
    if (testProgressChallengeGroupData.length > 0) {
      setSelectedGroupId(testProgressChallengeGroupData[0].groupId);
    }
  }, []);

  // useEffect(() => {
  //   const fetchProgressGroup = async () => {
  //     try {
  //       const response = await getProgressChallengeGroupApi();
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //       setProgressChallengeGroupData(response.data);
  //     } catch (error) {
  //       console.error(
  //         '관리자 | 진행중인 챌린지 그룹 조회를 실패하였습니다. ',
  //         error,
  //       );
  //     }
  //   };
  //   fetchProgressGroup().catch((error) => console.error(error));
  // }, []);

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
          {progressChallengeGroupData ? (
            progressChallengeGroupData.length > 0 ? (
              <form>
                {progressChallengeGroupData.map((challengeGroup) => (
                  <label key={challengeGroup.groupId}>
                    <input
                      type="radio"
                      name="progressChallengeGroup"
                      value={challengeGroup.groupId}
                      checked={selectedGroupId === challengeGroup.groupId}
                      onChange={() =>
                        setSelectedGroupId(challengeGroup.groupId)
                      }
                    />
                    {challengeGroup.groupTitle}
                    <span>{parseDate(challengeGroup.startDate)}</span>~
                    <span>{parseDate(challengeGroup.endDate)}</span>
                  </label>
                ))}
              </form>
            ) : (
              <p>현재 진행중인 챌린지 그룹이 없습니다.</p>
            )
          ) : (
            <p>진행중인 챌린지 그룹 조회를 실패하였습니다.</p>
          )}
        </SAdminProgressChallengeWrapper>
        <SSelectedChallengeVerificationWrapper>
          <h3>선택한 챌린지 그룹 인증내역 조회</h3>
          <p>선택된 챌린지 그룹 : {selectedGroupId}</p>
        </SSelectedChallengeVerificationWrapper>
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

    & h3 {
      font-size: ${({ theme }) => theme.fontSize.subtitle2};
      font-weight: ${({ theme }) => theme.fontWeight.subtitle2};
    }
  }
`;

const SAdminProgressChallengeWrapper = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 3px solid ${({ theme }) => theme.color.gray_de};

  & form {
    display: flex;
    flex-flow: column nowrap;
  }
  & label {
    display: flex;
    flex-flow: row nowrap;
  }
  & input {
    margin-right: 4px;
  }
`;

const SSelectedChallengeVerificationWrapper = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 3px solid ${({ theme }) => theme.color.gray_de};
`;
