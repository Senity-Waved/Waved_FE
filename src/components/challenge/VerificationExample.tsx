import Image from 'next/image';
import styled from '@emotion/styled';
import ScrollXBox from '@/components/common/ScrollXBox';
import { SSectionTitle } from '@/pages/challenge/[groupId]';
import getChallengeImagePath from '@/utils/getChallengeImagePath';

export default function VeirificationExample({ title }: { title: string }) {
  const examplePaths = getChallengeImagePath({
    title,
    type: 'verification',
  }) as string[];

  return (
    examplePaths.length === 0 || (
      <>
        <SSectionTitle>예시</SSectionTitle>
        <ScrollXBox>
          <SVerificationExample>
            {examplePaths.map((url) => (
              <Image
                key={url}
                src={url}
                width={150}
                height={218}
                priority
                alt={`${title} 인증 예시`}
              />
            ))}
          </SVerificationExample>
        </ScrollXBox>
      </>
    )
  );
}

const SVerificationExample = styled.div`
  width: 100%;
  padding: 1rem 1.25rem 0;
  img {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 0.625rem;
    }
    &:last-child {
      margin-right: 1.25rem;
    }
  }
`;
