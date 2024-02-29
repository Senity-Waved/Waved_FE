import styled from '@emotion/styled';

export default function Header() {
  return <SHeader color="primary">Header</SHeader>;
}

const SHeader = styled.header`
  width: 100%;
  height: 56px;
  background-color: #f3f3f3;
  font-size: 21px;
  line-height: 56px;
  font-weight: 700;
`;
