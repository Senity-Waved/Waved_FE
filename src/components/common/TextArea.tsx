import styled from '@emotion/styled';

interface ITextArea {
  placeholder?: string;
}

export default function TextArea() {
  return (
    <SWrapper>
      <STextArea placeholder="dkdkdkdk" />
      <STextLength>&#40;7/300&#41;</STextLength>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  position: relative;
`;

const STextArea = styled.textarea`
  width: 100%;
  height: 220px;
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  background-color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 3px 8px 2px rgba(35, 62, 112, 0.05);
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_bf};
  }

  &:focus {
    outline: none;
  }
`;

const STextLength = styled.span`
  font-size: 0.75rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  color: ${({ theme }) => theme.color.gray_83};
  position: absolute;
  bottom: 3px;
  right: 0;
  margin: 0.5rem;
`;
