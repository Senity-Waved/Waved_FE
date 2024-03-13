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
          { href: '#processing', text: '진행 중' },
          { href: '#pending', text: '대기 중' },
          { href: '#completed', text: '진행 완료' },
        ]}
      />
      {/* data.length == 0 일때 EmptyView + 챌린지탐색 */}
      <ChallengeEmptyView />
      <ChallengeSection status="진행 중" scrollId="processing" />
      <ChallengeSection status="대기 중" scrollId="pending" />
      <ChallengeSection status="진행 완료" scrollId="completed" />
    </Layout>
  );
}
