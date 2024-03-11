import styled from '@emotion/styled';
import Image from 'next/image';

interface IStamp {
  results: (boolean | null)[];
}

export default function Stamp({ results }: IStamp) {
  return (
    <SStampWrapper>
      {results.map((result) => (
        <SStampItem>
          <Image
            src={
              result === true
                ? '/icons/icon-stamp-good.svg'
                : result === false
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
  width: 100%;
  padding: 0 1.25rem;
`;

const SStampItem = styled.li``;
