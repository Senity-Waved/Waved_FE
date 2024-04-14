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
      <Link href={href} replace role="tab">
        {text}
      </Link>
    </STab>
  );
}

export default function TabMenu({ tabs, positionTop = 0 }: ITabMenu) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].href);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition =
        window.scrollY + window.innerHeight / (positionTop ? 2.1 : 2.3);
      let activeTabId = activeTab;

      tabs.forEach((tab, index) => {
        const id = tab.href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTopToPageTop = top + window.scrollY;
          const elementBottomToPageTop = bottom + window.scrollY;
          if (
            currentScrollPosition >= elementTopToPageTop &&
            currentScrollPosition <= elementBottomToPageTop
          ) {
            activeTabId = `#${id}`;
          } else {
            if (index < tabs.length - 1) {
              const nextTabId = tabs[index + 1].href.slice(1);
              const nextElement = document.getElementById(nextTabId);
              if (nextElement) {
                const nextTop =
                  nextElement.getBoundingClientRect().top + window.scrollY;
                if (
                  currentScrollPosition > elementBottomToPageTop &&
                  currentScrollPosition < nextTop
                ) {
                  activeTabId = `#${id}`;
                }
              }
            }
            if (index > 0) {
              const prevTabId = tabs[index - 1].href.slice(1);
              const prevElement = document.getElementById(prevTabId);
              if (prevElement) {
                const prevBottom =
                  prevElement.getBoundingClientRect().bottom + window.scrollY;
                if (
                  currentScrollPosition < elementTopToPageTop &&
                  currentScrollPosition > prevBottom
                ) {
                  activeTabId = `#${tabs[index - 1].href.slice(1)}`;
                }
              }
            }
          }
        }
      });
      setActiveTab(activeTabId);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tabs, activeTab, positionTop]);

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
