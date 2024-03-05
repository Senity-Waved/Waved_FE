import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';

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
      <SImage>
        <Image
          src="https://via.placeholder.com/600x400.jpg"
          alt={id}
          fill
          priority
        />
        <STagList>
          <dt className="a11yHidden">챌린지 인증 빈도</dt>
          <dd>매일</dd>
          <dt className="a11yHidden">챌린지 진행 기한</dt>
          <dd>2주</dd>
          <dt className="a11yHidden">챌린지 인증 방식</dt>
          <dd>사진인증</dd>
        </STagList>
      </SImage>
      <ChallengeSummary condition="recruiting" />
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

const SImage = styled.div`
  position: relative;
  width: 100%;
  height: 246px;
  object-fit: cover;
`;

const STagList = styled.dl`
  position: absolute;
  left: 20px;
  bottom: 24px;
  display: flex;
  gap: 8px;
  dd {
    display: inline-block;
    height: 24px;
    padding: 0 0.75rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    line-height: 24px;
    color: ${({ theme }) => theme.color.gray_ec};
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
  }
`;

const SSection = styled.section`
  padding: 1.25rem;
`;
