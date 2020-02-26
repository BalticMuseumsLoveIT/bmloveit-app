import { CommonLanguageInterface } from 'utils/interfaces';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStore, useObserver } from 'mobx-react';
import { action } from 'mobx';
import { LanguageSwitchItem, LanguageSwitchList } from './LanguageSwitch.style';

interface LanguageSwitchProps {
  uiLanguages: Array<CommonLanguageInterface>;
  userLanguage: string | null;
}

export const LanguageSwitch = ({
  uiLanguages,
  userLanguage,
}: LanguageSwitchProps) => {
  const { i18n, ready } = useTranslation('language-page');

  const localStore = useLocalStore(() => ({
    isMenuOpened: false,

    toggleMenu: action(() => {
      localStore.isMenuOpened = !localStore.isMenuOpened;
    }),
  }));

  const handleClick = async (lang: string) => {
    if (localStore.isMenuOpened) {
      await i18n.changeLanguage(lang);
    }

    localStore.toggleMenu();
  };

  return useObserver(() => {
    if (!ready) return null;

    return (
      <LanguageSwitchList>
        {uiLanguages.map(language => {
          return (
            <LanguageSwitchItem
              key={language.id}
              isMenuOpened={localStore.isMenuOpened}
              isHeader={
                !localStore.isMenuOpened && language.key === userLanguage
              }
              onClick={() => handleClick(language.key)}
              customHeaderImageSrc="/images/unfold_more-24px.svg"
            >
              <span>{language.value}</span>
            </LanguageSwitchItem>
          );
        })}
      </LanguageSwitchList>
    );
  });
};
