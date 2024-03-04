import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ITab {
  href: string;
  text: string;
}

interface ITabMenu {
  tabs: ITab[];
}

function Tab({ href, text }: ITab) {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <STab isActive={isActive}>
      <Link href={href} replace>
        {text}
      </Link>
    </STab>
  );
}

export default function TabMenu({ tabs }: ITabMenu) {
  return (
    <STabMenu>
      {tabs.map((tab) => (
        <Tab key={tab.text} {...tab} />
      ))}
    </STabMenu>
  );
}

const STab = styled.li<{ isActive: boolean }>`
  width: 100%;
  height: 48px;
  border-bottom: ${({ isActive, theme }) =>
    isActive
      ? `3px solid ${theme.color.gray_3c}`
      : `3px solid ${theme.color.gray_ec}`};
  a {
    display: block;
    width: 100%;
    color: ${({ isActive, theme }) =>
      isActive ? theme.color.gray_3c : theme.color.gray_83};
    font-size: 1rem;
    line-height: 48px;
    text-align: center;
  }
`;

const STabMenu = styled.ul`
  display: flex;
  width: 100%;
  height: 48px;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 5;
`;
