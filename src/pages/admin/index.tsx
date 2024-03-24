/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { SLayoutWrapper } from '@/components/common/Layout';
import {
  // getProgressChallengeGroupApi,
  // getGroupVerificationsApi,
  deleteVerficationApi,
} from '@/lib/axios/admin/api';
import parseDate from '@/utils/parseDate';
import useModal from '@/hooks/useModal';
import Modal from '@/components/modal/Modal';

interface IAdminProgressChallengeGroup {
  groupTitle: string;
  startDate: string;
  endDate: string;
  groupId: number;
}

interface IAdminVerification {
  verificationId: number;
  content: string;
  link: string | null;
  imageUrl: string | null;
  verificationDate: string;
  nickname: string | null;
  isDeleted: boolean;
}

const testVerificationData = {
  content: [
    {
      verificationId: 1,
      content: '글인증',
      link: null,
      imageUrl: null,
      verificationDate: '2024-03-19T18:00:49.492788+09:00',
      nickname: '유진닉네임',
      isDeleted: false,
    },
    {
      verificationId: 2,
      content: '글인증',
      link: null,
      imageUrl: null,
      verificationDate: '2024-03-19T18:00:53.265556+09:00',
      nickname: '채원닉네임',
      isDeleted: false,
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 5,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 1,
  totalElements: 2,
  first: true,
  size: 5,
  number: 0,
  sort: {
    empty: true,
    unsorted: true,
    sorted: false,
  },
  numberOfElements: 2,
  empty: false,
};

export default function AdminPage() {
  const [progressChallengeGroupData, setProgressChallengeGroupData] = useState<
    IAdminProgressChallengeGroup[] | []
  >();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedChallengeVerification, setSelectedChallengeVerification] =
    useState<IAdminVerification[] | []>();

  const [selectedVerificationId, setSelectedVerificationId] = useState<
    number | null
  >(null);

  const { openModal, closeModal } = useModal();

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

  const handleVerificationBtn = () => {
    setSelectedChallengeVerification(testVerificationData.content);
    // const fetchSelectedChallengeVerifications = async () => {
    //   try {
    //     if (typeof selectedGroupId === 'number') {
    //       const response = await getGroupVerificationsApi(selectedGroupId);
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    //       setSelectedChallengeVerification(response.data.content);
    //     }
    //   } catch (error) {
    //     console.error('선택한 챌린지 그룹의 인증 내역 조회 실패', error);
    //   }
    // };
    // fetchSelectedChallengeVerifications().catch((error) =>
    //   console.error(error),
    // );
  };

  const deleteVerification = () => {
    const deleteSelectedVerification = async () => {
      try {
        if (
          typeof selectedGroupId === 'number' &&
          typeof selectedVerificationId === 'number'
        ) {
          const response = await deleteVerficationApi(
            selectedGroupId,
            selectedVerificationId,
          );
          console.log('인증 취소 성공 | ', response);
        }
      } catch (error) {
        console.error('선택한 인증 내역 삭제 실패', error);
      }
    };
    deleteSelectedVerification().catch((error) => console.error(error));
  };

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
          <h3>선택한 챌린지 그룹 인증내역</h3>
          <p>선택된 챌린지 그룹 : {selectedGroupId}</p>
          <SVerificationBtn type="button" onClick={handleVerificationBtn}>
            인증 내역 조회하기
          </SVerificationBtn>
          <SAdminVerificationWrapper>
            {selectedChallengeVerification ? (
              selectedChallengeVerification.length > 0 ? (
                selectedChallengeVerification.map((verification) => (
                  <label key={verification.verificationId}>
                    <input
                      type="radio"
                      name="selectedVerification"
                      value={verification.verificationId}
                      checked={
                        selectedVerificationId === verification.verificationId
                      }
                      onChange={() =>
                        setSelectedVerificationId(verification.verificationId)
                      }
                    />
                    <span>verificationId : {verification.verificationId}</span>
                    <p>{verification.content}</p>
                    <p>{verification.nickname}</p>
                    <p>
                      {verification.isDeleted
                        ? '인증 무효로 삭제함'
                        : '인증 승인 상태'}
                    </p>
                  </label>
                ))
              ) : (
                <p>해당 챌린지의 인증 내역이 존재하지 않습니다.</p>
              )
            ) : (
              <p>버튼을 클릭하여 선택한 챌린지의 인증 내역을 확인하세요.</p>
            )}
          </SAdminVerificationWrapper>
        </SSelectedChallengeVerificationWrapper>
        <div>
          <p>선택한 인증 내역 ID : {selectedVerificationId}</p>
          <SVerificationBtn
            type="button"
            onClick={
              selectedVerificationId
                ? () => {
                    openModal({
                      mainText: '해당 인증 내역을 무효 처리하시겠습니까?',
                      subText: '',
                      btnText: '예',
                      cancelBtnText: '아니오',
                      onClick: () => {
                        deleteVerification();
                        closeModal();
                      },
                    });
                  }
                : undefined
            }
          >
            해당 인증 내역 삭제 (인증무효처리)
          </SVerificationBtn>
        </div>
        <Modal />
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

const SVerificationBtn = styled.button`
  padding: 10px 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.normal};
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
`;

const SAdminVerificationWrapper = styled.div`
  border-top: 3px solid ${({ theme }) => theme.color.gray_de};
`;
