import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import ScrollXBox from '@/components/common/ScrollXBox';

const getChallengeExamplePath = (title: string): string[] => {
  const titleArr = title.split(' ');
  const challengeTitle = titleArr.splice(0, titleArr.length - 1).join(' ');
  const examplePathArr = [];
  switch (challengeTitle) {
    // case '백엔드 기술면접 챌린지': {
    //   const paths = [
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //   ];
    //   examplePathArr.push(...paths);
    //   break;
    // }
    // case '프론트엔드 아티클 공유 챌린지': {
    //   const paths = [
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //   ];
    //   examplePathArr.push(...paths);
    //   break;
    // }
    // case '1일 1커밋 챌린지': {
    //   const paths = [
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //   ];
    //   examplePathArr.push(...paths);
    //   break;
    // }
    // case '스크린타임 4시간 챌린지': {
    //   const paths = [
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //     'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
    //   ];
    //   examplePathArr.push(...paths);
    //   break;
    // }
    default: {
      const paths = [
        'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
        'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
        'https://via.placeholder.com/300/E9F1FF/838A94.jpg?text=EXAMPLE',
      ];
      examplePathArr.push(...paths);
    }
  }
  return examplePathArr;
};

export default function VeirificationExample({ title }: { title: string }) {
  return (
    <ScrollXBox>
      <SVerificationExample>
        {getChallengeExamplePath(title).map((url) => (
          <Image
            key={uuidv4()}
            src={url}
            width={150}
            height={218}
            priority
            alt={`${title} 인증 예시`}
          />
        ))}
      </SVerificationExample>
    </ScrollXBox>
  );
}

const SVerificationExample = styled.div`
  height: 254px;
  padding: 1rem 1.25rem;
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
