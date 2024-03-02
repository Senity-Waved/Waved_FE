import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import Btn from '@/components/common/Btn';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import ModalTest from '@/components/modal/ModalTest';

export default function Example() {
  return (
    <Layout
      title="공통 컴포넌트 예시"
      description="각 최상위 페이지에 지금과 같이 HeadMeta를 사용하면 됩니다. 공통 컴포넌트 예시를 모아두기 위한 페이지입니다. 배포 이전 삭제 예정입니다."
      headerText="마이 챌린지"
      rightText="인증패스"
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
              text: '버튼1',
              styleType: 'primary',
              size: 'large',
            },
            {
              type: 'submit',
              text: '버튼2',
              isDisabled: true,
              styleType: 'gray',
              size: 'large',
            },
            {
              text: '버튼3',
              styleType: 'white',
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
              styleType: 'primary',
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
