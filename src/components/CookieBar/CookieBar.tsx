import {
  StyledWrapper,
  CloseButton,
  InfoMessage,
} from 'components/CookieBar/CookieBar.style';
import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import { Trans, useTranslation } from 'react-i18next';

export const CookieBar = () => {
  const { ready } = useTranslation('app');

  const COOKIES_KEY = 'cookies-accepted';
  const COOKIES_VALUE = 'true';

  const cookies = useLocalStore(() => ({
    accepted: localStorage.getItem(COOKIES_KEY),
    accept() {
      localStorage.setItem(COOKIES_KEY, COOKIES_VALUE);
      runInAction(() => (this.accepted = COOKIES_VALUE));
    },
  }));

  const clickHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    cookies.accept();
  };

  return useObserver(() => {
    if (!ready) return null;

    return cookies.accepted ? null : (
      <StyledWrapper>
        <InfoMessage>
          <Trans i18nKey="cookieBar">
            We use cookies. <Link to={`/cookies-info`}>Learn more</Link>
          </Trans>
        </InfoMessage>
        <CloseButton type="button" className="close" onClick={clickHandler}>
          <span>&times;</span>
        </CloseButton>
      </StyledWrapper>
    );
  });
};
