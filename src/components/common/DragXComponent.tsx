import styled from '@emotion/styled';
import { useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throttle = <T extends any[]>(callback: (...args: T) => void) => {
  let isThrottling = false;
  return (...args: T) => {
    if (isThrottling) return;
    callback(...args);
    isThrottling = true;
    setTimeout(() => {
      isThrottling = false;
    }, 50);
  };
};

export default function DragXComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX + ref.current.scrollLeft);
  };
  const onDragEnd = () => {
    setIsDragging(false);
  };
  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    const { scrollWidth, clientWidth, scrollLeft } = ref.current;
    ref.current.scrollLeft = startX - e.pageX;
    if (scrollLeft === 0) {
      setStartX(e.pageX);
    } else if (scrollWidth <= clientWidth + scrollLeft) {
      setStartX(e.pageX + scrollLeft);
    }
  };
  const onThrottleDragMove = throttle(onDragMove);

  return (
    <SScrollXLayout
      ref={ref}
      onMouseDown={onDragStart}
      onMouseMove={isDragging ? onThrottleDragMove : undefined}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      {children}
    </SScrollXLayout>
  );
}

const SScrollXLayout = styled.div`
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
