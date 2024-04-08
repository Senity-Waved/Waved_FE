import styled from '@emotion/styled';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';

export default function ScrollXBox({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ref, isDragging, onDragStart, onThrottleDragMove, onDragEnd } =
    useHorizontalScroll();
  return (
    <SScrollXBox
      ref={ref}
      onMouseDown={onDragStart}
      onMouseMove={isDragging ? onThrottleDragMove : undefined}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      {children}
    </SScrollXBox>
  );
}

const SScrollXBox = styled.div`
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
