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

      closeMenu: action(() => {
        localStore.isMenuOpened = false;
      }),

      openMenu: action(() => {
        localStore.isMenuOpened = true;
      }),
    }));

    const handleClick = async (lang: string, id: number) => {
      if (localStore.isMenuOpened) {
        try {
          await i18n.changeLanguage(lang);
          localStore.closeMenu();
          await eventStore!.dispatchLanguageChange(id);
        } catch (e) {}
      } else {
        localStore.openMenu();
      }
    };

    return useObserver(() => {
      if (!ready) return null;

      return (
        <LanguageSwitchList>
          {uiLanguages
            .slice()
            .sort((a, b) => {
              return a.value.localeCompare(b.value);
            })
            .map(language => {
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
