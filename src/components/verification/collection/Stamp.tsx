import styled from '@emotion/styled';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import calculateDDay from '@/utils/calculateDDay';

interface IStamp {
  results: number[];
  startDate: string;
}

export default function Stamp({ results, startDate }: IStamp) {
  const diff = Math.abs(calculateDDay(startDate));
  const resultStamps = results.map((value, index) => {
    if (index <= diff - 1 && value === 0) {
      return 1;
    }
    return value;
  });

  const getResultStamp = (result: number) => {
    switch (result) {
      case 2:
        return '/icons/icon-stamp-good.svg';
      case 1:
        return '/icons/icon-stamp-bad.svg';
      default:
        return '/icons/icon-stamp-default.svg';
    }
  };

  const getResultText = (result: number) => {
    switch (result) {
      case 2:
        return '인증성공 스탬프';
      case 1:
        return '인증실패 스탬프';
      default:
        return '미인증 스탬프';
    }
  };

  return (
    <SStampWrapper>
      {resultStamps.map((result) => (
        <SStampItem key={uuidv4()}>
          <Image
            src={getResultStamp(result)}
            alt={getResultText(result)}
            width={33}
            height={33}
          />
        </SStampItem>
      ))}
    </SStampWrapper>
  );
}

const SStampWrapper = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px 9px;
  max-width: 309px;
  padding: 0.75rem;
  margin: 1rem auto;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.gray_f9};
`;

const SStampItem = styled.li`
  width: 33px;
  height: 33px;
`;
