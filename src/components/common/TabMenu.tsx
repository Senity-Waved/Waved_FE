import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ITab {
  href: string;
  text: string;
}

interface ITabMenu {
  tabs: ITab[];
  positionTop?: number;
}

function Tab({ href, text, isActive }: ITab & { isActive: boolean }) {
  return (
    <STab isActive={isActive}>
      <Link href={href} replace>
        {text}
      </Link>
    </STab>
  );
}

export default function TabMenu({ tabs, positionTop = 0 }: ITabMenu) {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        threshold: 0.7,
      },
    );
    tabs.forEach((tab) => {
      const id = tab.href.slice(1);
      const section = document.querySelector(`#${id}`);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [tabs, positionTop]);

  return (
    <STabMenu positionTop={positionTop}>
      {tabs.map((tab) => (
        <Tab key={tab.text} {...tab} isActive={activeTab === tab.href} />
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

const STabMenu = styled.ul<{ positionTop?: number }>`
  position: sticky;
  top: ${({ positionTop }) => `calc(${positionTop}px + 55px)`};
  display: flex;
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 5;
`;
