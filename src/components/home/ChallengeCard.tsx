import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

interface IChallengeCard {
  challenge_id: number;
  title: string;
  thumbnail: string;
}

export default function ChallengeCard({
  challenge_id,
  thumbnail,
  title,
}: IChallengeCard) {
  return (
    <SChallengeCard>
      <Link href={`/challenge/${challenge_id}`}>
        <SImage>
          <Image
            src={thumbnail}
            alt={title || ''}
            fill
            sizes="183px"
            priority
          />
          <SParticipant>2</SParticipant>
        </SImage>
        <STitle>
          <h3>{title}</h3>
          <span>D-5</span>
        </STitle>
        <STagList>
          <dt className="a11yHidden">챌린지 인증 빈도</dt>
          <dd>매일</dd>
          <dt className="a11yHidden">챌린지 진행 기한</dt>
          <dd>2주</dd>
          <dt className="a11yHidden">챌린지 인증 방식</dt>
          <dd>사진인증</dd>
        </STagList>
      </Link>
    </SChallengeCard>
  );
}

const SChallengeCard = styled.li``;

const SImage = styled.div`
  position: relative;
  width: 100%;
  min-width: 164px;
  min-height: 164px;
  margin-bottom: 0.5rem;
  line-height: 0;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
`;

const SParticipant = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  height: 20px;
  padding: 0 0.5rem;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  color: ${({ theme }) => theme.color.gray_f9};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  line-height: 20px;
  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 10px;
    background: url('/icons/icon-participant-white.svg') no-repeat center;
  }
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

const STagList = styled.dl`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
  dd {
    display: inline-block;
    height: 20px;
    padding: 0 0.5rem;
    background-color: ${({ theme }) => theme.color.light};
    border-radius: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.color.gray_3c};
    font-size: ${({ theme }) => theme.fontSize.caption2};
    font-weight: ${({ theme }) => theme.fontWeight.caption2};
  }
`;
