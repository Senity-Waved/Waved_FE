import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

export default function ServiceTermCheck() {
  return (
    <SServiceTermCheckWrapper>
      <SRegisterCheckWrapper>
        <SAllCheckInputWrapper>
          <input type="checkbox" name="allCheck" id="allCheck" />
          <label htmlFor="allCheck">전체 동의</label>
        </SAllCheckInputWrapper>
        <SRegisterCheckInputWrapper>
          <input type="checkbox" name="ageCheck" id="ageCheck" />
          <label htmlFor="ageCheck">(필수) 만 14세 이상입니다.</label>
        </SRegisterCheckInputWrapper>
        <SRegisterCheckInputWrapper className="serviceTermCheck">
          <div>
            <input type="checkbox" name="termCheck" id="termCheck" />
            <label htmlFor="termCheck">(필수) 서비스 이용약관동의</label>
          </div>
          <SServiceTermLink>
            <Link href="/">
              <Image
                src="/icons/icon-right-arrow.svg"
                alt="서비스 이용약관 보기"
                width={24}
                height={24}
              />
            </Link>
          </SServiceTermLink>
        </SRegisterCheckInputWrapper>
        <SRegisterCheckInputWrapper>
          <input type="checkbox" name="privacyCheck" id="privacyCheck" />
          <label htmlFor="privacyCheck">
            (필수) 개인정보 수집 및 이용 동의
          </label>
        </SRegisterCheckInputWrapper>
      </SRegisterCheckWrapper>
      <SServiceTermTableWrapper>
        <table>
          <caption>개인정보 수집</caption>
          <tbody>
            <tr>
              <th>목적</th>
              <td>회원가입 및 관리, 재화 또는 서비스 이용 및 제공</td>
            </tr>
            <tr>
              <th>항목</th>
              <td>이메일, 출생연도, 성별</td>
            </tr>
            <tr>
              <th>보유기간</th>
              <td>회원 탈퇴 시 즉시 파기</td>
            </tr>
          </tbody>
        </table>
        <p>
          *개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부
          시 회원가입이 제한됩니다.
        </p>
      </SServiceTermTableWrapper>
    </SServiceTermCheckWrapper>
  );
}

const SServiceTermCheckWrapper = styled.div``;

const SRegisterCheckWrapper = styled.div`
  margin-left: 1.25rem;

  & input[type='checkbox'] {
    display: none;
  }

  & input[type='checkbox'] + label {
    height: 24px;
    cursor: pointer;
    padding-left: 2.25rem;
    background-repeat: no-repeat;
    background-image: url('/icons/icon-checkbox-not-checked.svg');
    line-height: 24px;
  }

  & input[type='checkbox']:checked + label {
    background-image: url('/icons/icon-checkbox-checked.svg');
    height: 24px;
  }
`;

const SAllCheckInputWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.body2};
  height: 22px;
  margin-bottom: 1.875rem;
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    width: 95%;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_de};
  }
`;

const SRegisterCheckInputWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.body4};
  height: 20px;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;

  &.serviceTermCheck {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1.25rem;

    & div {
      display: flex;
      align-items: center;
    }
  }
`;

const SServiceTermLink = styled.div`
  height: 20px;
`;

const SServiceTermTableWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.gray_f9};
  height: auto;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.color.gray_83};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  text-align: left;
  margin: 0 1.25rem;

  & table td,
  & table th {
    height: 17px;
    line-height: 1.4;
    margin-bottom: 0.25rem;
    font-weight: ${({ theme }) => theme.fontWeight.caption2};
  }

  & table caption {
    text-align: left;
    margin-bottom: 0.25rem;
    font-size: ${({ theme }) => theme.fontSize.caption3};
    font-weight: ${({ theme }) => theme.fontWeight.caption3};
  }

  & p {
    font-size: 0.625rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    line-height: 1.4;
    margin-top: 0.5rem;
  }
`;
