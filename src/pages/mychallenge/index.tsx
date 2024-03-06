import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import ChallengeSection from '@/components/mychallenge/ChallengeSection';
import ChallengeEmptyView from '@/components/mychallenge/ChallengeEmptyView';

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
      {/* data.length == 0 일때 EmptyView + 챌린지탐색 */}
      <ChallengeEmptyView />
      <ChallengeSection status="진행중" />
      <ChallengeSection status="대기중" />
      <ChallengeSection status="진행완료" />
    </Layout>
  );
}
