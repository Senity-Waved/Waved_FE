import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import ChallengeSection from '@/components/mychallenge/ChallengeSection';

export default function MyChallenge() {
  return (
    <Layout
      headerText="MY 챌린지"
      title="마이챌린지"
      description="나의 챌린지 내역을 확인해보세요."
    >
      <TabMenu
        tabs={[
          { href: '/mychallenge', text: '진행중' },
          { href: '/mychallenge#example2', text: '대기중' },
          { href: '/mychallenge#example3', text: '진행완료' },
        ]}
      />
      <SWrapper>
        <ChallengeSection
          status="진행중"
          statusImogi="🧑🏻‍💻"
          subText="현재 진행하고 있는 챌린지예요!"
        />
        <ChallengeSection
          status="대기중"
          statusImogi="👀"
          subText="신청을 완료하고 시작을 대기중인 챌린지예요!"
        />
        <ChallengeSection
          status="진행완료"
          statusImogi="🥳"
          subText="진행을 완료한 챌린지예요!"
        />
      </SWrapper>
    </Layout>
  );
}

const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.gray_f9};
`;
