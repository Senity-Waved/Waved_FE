import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/common/Layout';

export default function Custom404() {
  return (
    <Layout
      noHeader
      noFooter
      title="404 에러"
      description="해당 페이지를 찾을 수 없습니다."
    >
      <SCustom404>
        <Image
          src="icons/icon-404-error.svg"
          alt="404 에러"
          width={170}
          height={76}
        />
        <SMainText>해당 페이지를 찾을 수 없습니다.</SMainText>
        <SSubText>
          찾으려는 페이지의 주소가 정확한지
          <br />
          다시 한번 확인해 주세요.
        </SSubText>
        <SLink href="/">홈으로 이동</SLink>
      </SCustom404>
    </Layout>
  );
}

const SCustom404 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SMainText = styled.h3`
  margin: 2.5rem 0 0.5rem;
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headlineh2};
`;

const SSubText = styled.p`
  color: ${({ theme }) => theme.color.gray_52};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  text-align: center;
`;

const SLink = styled(Link)`
  margin: 2rem 0 4.5rem;
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  text-decoration: underline;
`;
