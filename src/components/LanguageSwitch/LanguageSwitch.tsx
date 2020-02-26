import { CommonLanguageInterface } from 'utils/interfaces';
import { EventStore } from 'utils/store/eventStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { inject, useLocalStore, useObserver } from 'mobx-react';
import { action } from 'mobx';
import { LanguageSwitchItem, LanguageSwitchList } from './LanguageSwitch.style';

interface LanguageSwitchProps {
  uiLanguages: Array<CommonLanguageInterface>;
  userLanguage: string | null;
  eventStore?: EventStore;
}

export const LanguageSwitch = inject('eventStore')(
  ({ uiLanguages, userLanguage, eventStore }: LanguageSwitchProps) => {
    const { i18n, ready } = useTranslation('language-page');

    const localStore = useLocalStore(() => ({
      isMenuOpened: false,

      toggleMenu: action(() => {
        localStore.isMenuOpened = !localStore.isMenuOpened;
      }),
    }));

    const handleClick = async (lang: string, id: number) => {
      if (localStore.isMenuOpened) {
        await i18n.changeLanguage(lang);
        eventStore && (await eventStore.dispatchLanguageChange(id));
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
                onClick={() => handleClick(language.key, language.id)}
                customHeaderImageSrc="/images/unfold_more-24px.svg"
              >
                <span>{language.value}</span>
              </LanguageSwitchItem>
            );
          })}
        </LanguageSwitchList>
      );
    });
  },
);
