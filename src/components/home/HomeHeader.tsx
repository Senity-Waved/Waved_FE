import styled from '@emotion/styled';
import Image from 'next/image';
import { SHeaderWrapper } from '@/components/common/Header';

export default function HomeHeader() {
  return (
    <SHeader>
      <SLogo>
        <h1 className="a11yHidden">WAVED</h1>
        <Image
          alt="WAVED 로고"
          src="https://via.placeholder.com/100x30.jpg"
          width={100}
          height={30}
        />
      </SLogo>
      <SAlarm type="button" />
    </SHeader>
  );
}

const SHeader = styled(SHeaderWrapper)`
  justify-content: space-between;
  padding: 0 20px;
`;

const SLogo = styled.div`
  height: 30px;
  line-height: 0;
`;

const SAlarm = styled.button`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-alarm-active.svg') no-repeat center;
`;
