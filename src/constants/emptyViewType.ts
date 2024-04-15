const emptyViewType = {
  모집챌린지: {
    mainText: '현재 모집중인 챌린지가 없어요.',
    subText: '다음 챌린지를 모집할 때까지 잠시만 기다려주세요!',
    imagePath: '/images/image-emptyview-challenge.png',
  },
  마이챌린지: {
    mainText: '아직 내 챌린지가 없어요.',
    subText: '챌린지를 신청하고 내 챌린지를 시작해보세요!',
    imagePath: '/images/image-emptyview-mychallenge.png',
  },
  PROGRESS: {
    mainText: '진행 중인 챌린지가 없어요.',
    subText: '',
    imagePath: '/images/image-emptyview-challenge.png',
  },
  WAITING: {
    mainText: '대기 중인 챌린지가 없어요.',
    subText: '',
    imagePath: '/images/image-emptyview-mychallenge-waiting.png',
  },
  COMPLETED: {
    mainText: '진행을 완료한 챌린지가 없어요.',
    subText: '',
    imagePath: '/images/image-emptyview-mychallenge-completed.png',
  },
  챌린지후기: {
    mainText: '아직 후기가 없어요.',
    subText: '챌린지에 참여하고 후기를 남겨보세요!',
    imagePath: '/images/image-emptyview-review.png',
  },
  내후기: {
    mainText: '남기신 후기가 없어요.',
    subText: '마이챌린지에서 참여하신 챌린지 후기를 남겨보세요!',
    imagePath: '/images/image-emptyview-myreview.png',
  },
  예치금내역: {
    mainText: '예치금 내역이 없어요.',
    subText: '예치금을 걸어서 챌린지에 참여해보세요!',
    imagePath: '/images/image-emptyview-deposit.png',
  },
  인증내역: {
    mainText: '인증 내역이 없어요.',
    subText: '아무도 인증을 하지 않은 날입니다.',
    imagePath: '/images/image-emptyview-verification.png',
  },
  기술면접인증: {
    mainText: '인증 후 인증 내역을 볼 수 있어요.',
    subText: '오늘의 인증을 남겨보세요!',
    imagePath: '/images/image-emptyview-verification.png',
  },
  커밋인증: {
    mainText: '나만의 커밋 인증',
    subText: '1일 1커밋 챌린지는 내 인증 내역만 볼 수 있습니다.',
    imagePath: '/images/image-emptyview-commit.png',
  },
  알림내역: {
    mainText: '알림 목록이 비어 있어요.',
    subText: '최근 2주 동안 받은 알림을 확인할 수 있어요.',
    imagePath: '/images/image-emptyview-notification.png',
  },
};

export default emptyViewType;
