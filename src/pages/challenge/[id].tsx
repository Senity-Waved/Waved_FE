import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';

export default function Challenge() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';

  return (
    <Layout
      title="챌린지 상세 정보"
      description="챌린지 상세 정보 페이지 수정해야 함"
      headerText=""
      rightText=""
    >
      <span
        css={{
          position: 'absolute',
          top: 0,
          backgroundColor: 'orange',
          zIndex: 30,
        }}
      >
        {/* 챌린지 id 테스트 */}
        {id}
      </span>
      <TabMenu
        tabs={[
          { href: `/challenge/${id}#info`, text: '정보' },
          { href: `/challenge/${id}#review`, text: '후기' },
          { href: `/challenge/${id}#certification`, text: '인증' },
        ]}
      />
      <SSection />
      <BottomFixedBtn
        btns={[
          {
            text: '화면 하단 고정 버튼',
            styleType: 'primary',
            size: 'large',
          },
        ]}
      />
    </Layout>
  );
}

const SSection = styled.section`
  padding: 1.25rem;
`;
