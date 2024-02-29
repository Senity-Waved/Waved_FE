import styled from '@emotion/styled';

export default function Footer() {
  return <SHeader color="primary">Footer</SHeader>;
}

const SHeader = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 56px;
  background-color: #f3f3f3;
  font-size: 21px;
  line-height: 56px;
  font-weight: 700;
`;
