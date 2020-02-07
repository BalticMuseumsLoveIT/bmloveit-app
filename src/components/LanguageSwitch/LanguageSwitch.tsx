import { CommonLanguageInterface } from 'utils/interfaces';
import {
  DefaultList,
  DefaultListItem,
} from 'components/DefaultList/DefaultList.style';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitchProps {
  uiLanguages: Array<CommonLanguageInterface>;
  userLanguage: string | null;
}

export const LanguageSwitch = ({
  uiLanguages,
  userLanguage,
}: LanguageSwitchProps) => {
  const [isMenuOpened, setisMenuOpened] = useState(false);

  const { i18n, ready } = useTranslation('language-page');

  const handleClick = async (lang: string) => {
    if (isMenuOpened === false) {
      setisMenuOpened(true);
    } else {
      await i18n.changeLanguage(lang);
      setisMenuOpened(false);
    }
  };

  if (!ready) return null;

  return (
    <>
      <DefaultList>
        {uiLanguages.map(language => {
          return (
            <DefaultListItem
              key={language.id}
              isMenuOpened={isMenuOpened}
              isActive={language.key === userLanguage}
              onClick={() => handleClick(language.key)}
            >
              {language.value}
            </DefaultListItem>
          );
        })}
      </DefaultList>
    </>
  );
};
