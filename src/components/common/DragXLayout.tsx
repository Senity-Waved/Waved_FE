import styled from '@emotion/styled';
import ScrollContainer from 'react-indiana-drag-scroll';

export default function DragXLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SScrollXLayout>{children}</SScrollXLayout>;
}

const SScrollXLayout = styled(ScrollContainer)`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
