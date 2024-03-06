import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import Btn from '@/components/common/Btn';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import ModalTest from '@/components/modal/ModalTest';

export default function Example() {
  const router = useRouter();
  const goToHome = () => {
    router.push('/').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });

    // router는 promise를 반환하는데 onClick 이벤트핸들러는 반환값을 처리하지 않기 때문에 이벤트 핸들러 내에서 직접적으로 promise를 처리하지 않고 따로 처리할 수 있도록 catch를 추가하여 사용해야 합니다.
  };
  return (
    <Layout
      title="공통 컴포넌트 예시"
      description="각 최상위 페이지에 지금과 같이 HeadMeta를 사용하면 됩니다. 공통 컴포넌트 예시를 모아두기 위한 페이지입니다. 배포 이전 삭제 예정입니다."
      headerText="마이 챌린지"
      rightText="인증패스"
      noFooter
    >
      <TabMenu
        tabs={[
          { href: '/example', text: '메뉴1' },
          { href: '/example#example2', text: '메뉴2' },
          { href: '/example#example3', text: '메뉴3' },
        ]}
      />
      <div id="example2">
        <Btn
          btns={[
            {
              text: '링크 이동 버튼',
              styleType: 'primary',
              size: 'large',
              onClick: goToHome,
            },
          ]}
        />
        <Btn
          btns={[
            {
              text: '버튼1',
              styleType: 'primary',
              size: 'large',
            },
            {
              type: 'submit',
              text: '버튼2',
              styleType: 'white_line',
              size: 'large',
            },
            {
              text: '버튼3',
              styleType: 'disabled',
              size: 'large',
            },
          ]}
        />
        <Btn
          btns={[
            {
              text: '작은 버튼1',
              styleType: 'primary',
              size: 'small',
            },
            {
              text: '작은 버튼2',
              styleType: 'white',
              size: 'small',
            },
            {
              text: '작은 버튼3',
              styleType: 'gray',
              size: 'small',
            },
          ]}
        />
      </div>
      <div id="example3">
        <ModalTest />
      </div>
      <BottomFixedBtn
        btns={[
          {
            text: '화면 하단 고정 버튼',
            styleType: 'primary',
            size: 'large',
          },
        ]}
      />
    </Layout>
  );
}
