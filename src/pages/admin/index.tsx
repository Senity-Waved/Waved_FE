/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  useEffect(() => {
    const fetchProgressGroup = async () => {
      try {
        const response = await getProgressChallengeGroupApi();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setProgressChallengeGroupData(response.data);
      } catch (progressError) {
        if (
          progressError instanceof Error &&
          progressError.message === 'UnauthorizedAdminAccess'
        ) {
          router.push('/home').catch(console.error);
        } else {
          console.error('관리자 페이지 로딩 실패', progressError);
        }
      }
    };
    fetchProgressGroup().catch(console.error);
  }, [router]);

  const handleVerificationBtn = () => {
    const fetchSelectedChallengeVerifications = async () => {
      try {
        if (typeof selectedGroupId === 'number') {
          const response = await getGroupVerificationsApi(selectedGroupId);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          setSelectedChallengeVerification(response.data.content);
        }
      } catch (verificationListError) {
        console.error(
          '선택한 챌린지 그룹의 인증 내역 조회 실패',
          verificationListError,
        );
      }
    };
    fetchSelectedChallengeVerifications().catch(console.error);
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
      } catch (deleteVerificationError) {
        console.error('선택한 인증 내역 삭제 실패', deleteVerificationError);
      }
    };
    deleteSelectedVerification().catch(console.error);
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
                    <span>
                      ({challengeGroup.challengeGroupId})
                      {challengeGroup.groupTitle}
                    </span>
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
          <p>선택한 챌린지 그룹 ID : {selectedGroupId}</p>
          <SVerificationBtn type="button" onClick={handleVerificationBtn}>
            인증 내역 조회하기
          </SVerificationBtn>
          <SAdminVerificationWrapper>
            {selectedChallengeVerification ? (
              selectedChallengeVerification.length > 0 ? (
                selectedChallengeVerification.map((verification) => (
                  <SVerificationBox key={verification.verificationId}>
                    <label>
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
                      <span>인증 내역 ID : {verification.verificationId}</span>
                      {verification.imageUrl && (
                        <Image
                          src={`${verification.imageUrl}${process.env.NEXT_PUBLIC_IMAGE_TOKEN}`}
                          alt="챌린지 사진 인증 이미지"
                          width={300}
                          height={300}
                        />
                      )}
                      <p>닉네임 : {verification.nickname}</p>
                      {verification.link && (
                        <SVerificationLink
                          target="_blank"
                          rel="noreferrer noopener"
                          href={verification.link}
                        >
                          <p>[인증링크]</p>
                        </SVerificationLink>
                      )}
                      <p>
                        {verification.content === 'true'
                          ? '깃허브 커밋 상태 : 커밋 성공'
                          : verification.content === 'false'
                            ? '깃허브 커밋 상태 : 커밋 실패'
                            : verification.content}
                      </p>
                      <p>{parseDate(verification.verificationDate)}</p>
                      <SVerificationStatus>
                        인증 상태 :{' '}
                        {verification.isDeleted
                          ? '인증 무효 처리됨'
                          : '인증 성공'}
                      </SVerificationStatus>
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
        <SSelectedVerificationWrapper>
          <p>선택한 인증 내역 ID : {selectedVerificationId}</p>
          <p>🚨 당일 인증된 내역은 무효 처리하면 안됩니다 !</p>
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
        </SSelectedVerificationWrapper>
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

const SVerificationLink = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.color.normal};
`;

const SVerificationStatus = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.body1};
  margin-top: 10px;
  color: ${({ theme }) => theme.color.positive};
`;

const SSelectedVerificationWrapper = styled.div`
  margin: 0 20px;
`;
