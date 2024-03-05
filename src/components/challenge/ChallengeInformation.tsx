import styled from '@emotion/styled';

export default function ChallengeInformation() {
  return (
    <SInformation id="#infomation">
      <STitle>챌린지 커리큘럼 or 소개</STitle>
      <SContext>
        자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그
        포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을
        소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와
        전문적 성장을 위한 기초를 마련합니다.
        <br />
        <br />두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을
        극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한
        일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의
        기초입니다. 네 번째는 지속적인 학습과 자기 계발입니다.
      </SContext>
    </SInformation>
  );
}

const SInformation = styled.section``;

const STitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
`;

const SContext = styled.p`
  padding-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  line-height: 1.8;
`;
