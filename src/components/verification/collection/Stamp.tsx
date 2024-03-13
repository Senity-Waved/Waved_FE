import styled from '@emotion/styled';
import Image from 'next/image';

interface IStamp {
  results: number[];
}

export default function Stamp({ results }: IStamp) {
  return (
    <SStampWrapper>
      {results.map((result, index) => (
        <SStampItem key={index}>
          <Image
            src={
              result === 2
                ? '/icons/icon-stamp-good.svg'
                : result === 1
                  ? '/icons/icon-stamp-bad.svg'
                  : '/icons/icon-stamp-default.svg'
            }
            alt={`stamp-${result}`}
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
