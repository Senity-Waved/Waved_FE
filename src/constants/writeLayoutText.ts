import { write } from 'fs';

const writeLayoutText = {
  후기작성: {
    btnText: '작성완료',
    mainText: '챌린지 후기를 작성해주세요',
    placeholder:
      '참여한 챌린지는 어땠나요? 경험을 공유해주세요. (최소 10자 이상)',
  },
  후기수정: {
    btnText: '수정하기',
    mainText: '수정하실 내용을 입력해주세요.',
    placeholder:
      '참여한 챌린지는 어땠나요? 경험을 공유해주세요. (최소 10자 이상)',
  },
  챌린지요청: {
    btnText: '요청하기',
    mainText: '요청 내용을 작성해주세요.',
    placeholder: '개발 직군과 챌린지 방식을 알려주세요. (최소 10자 이상)',
  },
  링크인증: {
    btnText: '제출하기',
    mainText: '챌린지 인증 링크를 입력해주세요.',
    placeholder: 'http://',
  },
  글인증: {
    btnText: '제출하기',
    mainText: '챌린지 인증 내용을 작성해주세요.',
    placeholder: '내용을 작성해주세요. (최소 10자 이상)',
  },
  사진인증: {
    btnText: '제출하기',
    mainText: '챌린지 인증 사진을 첨부해주세요.',
    placeholder: '',
  },
};

export default writeLayoutText;
