import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

interface IChallengeCardWide {
  challenge_id: number;
  title: string;
  thumbnail: string;
}

export default function ChallengeCardWide({
  challenge_id,
  thumbnail,
  title,
}: IChallengeCardWide) {
  return (
    <SChallengeCardWide>
      <Link href={`/challenge/${challenge_id}`}>
        <SImage>
          <Image
            src={thumbnail}
            alt={title || ''}
            width={226}
            height={108}
            priority
          />
        </SImage>
        <STitle>
          <h3>{title}</h3>
          <span>10일 차</span>
        </STitle>
      </Link>
    </SChallengeCardWide>
  );
}

const SChallengeCardWide = styled.li`
  display: inline-block;
  width: 226px;
  &:not(:last-child) {
    margin-right: 0.75rem;
  }
`;

const SImage = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  line-height: 0;
  border-radius: 8px;
  overflow: hidden;
`;

const STitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.25rem;
  line-height: 22px;
  h3 {
    flex: 1;
    color: ${({ theme }) => theme.color.gray_3c};
    font-size: ${({ theme }) => theme.fontSize.body2};
    font-weight: ${({ theme }) => theme.fontWeight.body2};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  span {
    flex-shrink: 0;
    color: ${({ theme }) => theme.color.gray_83};
    font-size: ${({ theme }) => theme.fontSize.caption1};
    font-weight: ${({ theme }) => theme.fontWeight.caption1};
  }
`;
