/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SLayoutWrapper } from '@/components/common/Layout';
import {
  getProgressChallengeGroupApi,
  getGroupVerificationsApi,
  deleteVerficationApi,
} from '@/lib/axios/admin/api';
import parseDate from '@/utils/parseDate';
import useModal from '@/hooks/useModal';
import Modal from '@/components/modal/Modal';

interface IAdminProgressChallengeGroup {
  groupTitle: string;
  startDate: string;
  endDate: string;
  challengeGroupId: number;
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

  const handleVerificationBtn = () => {
    const fetchSelectedChallengeVerifications = async () => {
      try {
        if (typeof selectedGroupId === 'number') {
          const response = await getGroupVerificationsApi(selectedGroupId);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          setSelectedChallengeVerification(response.data.content);
        }
      } catch (error) {
        console.error('선택한 챌린지 그룹의 인증 내역 조회 실패', error);
      }
    };
    fetchSelectedChallengeVerifications().catch((error) =>
      console.error(error),
    );
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
                  <div>
                    <label key={challengeGroup.challengeGroupId}>
                      <input
                        type="radio"
                        name="progressChallengeGroup"
                        value={challengeGroup.challengeGroupId}
                        checked={
                          selectedGroupId === challengeGroup.challengeGroupId
                        }
                        onChange={() =>
                          setSelectedGroupId(challengeGroup.challengeGroupId)
                        }
                      />
                      {challengeGroup.groupTitle}
                      <span>{parseDate(challengeGroup.startDate)}</span>~
                      <span>{parseDate(challengeGroup.endDate)}</span>
                    </label>
                  </div>
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
                  <SVerificationBox>
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
                      <span>
                        verificationId : {verification.verificationId}
                      </span>
                      <p>{verification.content}</p>
                      {verification.imageUrl && (
                        <Image
                          src={`${verification.imageUrl}${process.env.NEXT_PUBLIC_IMAGE_TOKEN}`}
                          alt="챌린지 사진 인증 이미지"
                          width={150}
                          height={150}
                        />
                      )}
                      <p>{verification.nickname}</p>
                      {verification.link && (
                        <a href={verification.link}>
                          <p>인증 링크</p>
                        </a>
                      )}
                      <p>
                        {verification.isDeleted
                          ? '인증 무효로 삭제함'
                          : '인증 승인 상태'}
                      </p>
                    </label>
                  </SVerificationBox>
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
  margin: 0 20px;

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
  margin: 0 20px 10px 20px;
  padding: 10px 0;
  border-bottom: 3px solid ${({ theme }) => theme.color.gray_ec};
`;

const SVerificationBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray_3c};
  border-radius: 10px;
  margin: 10px 0;
  padding: 5px 10px;
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
