import {
  StyledWrapper,
  CloseButton,
  InfoMessage,
  CloseButtonIcon,
} from 'components/CookieBar/CookieBar.style';
import { CookieBarStore } from 'utils/store/cookieBarStore';
import { SiteStore } from 'utils/store/siteStore';
import { LayoutGridCookie } from 'components/Layout/Layout.style';
import React from 'react';
import { Trans, WithTranslation, withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';

interface Props extends WithTranslation {}

interface InjectedProps extends Props {
  cookieBarStore: CookieBarStore;
  siteStore: SiteStore;
}

@inject('cookieBarStore', 'siteStore')
@observer
class CookieBar extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  cookieBarStore = this.injected.cookieBarStore;
  siteStore = this.injected.siteStore;

  render() {
    if (!this.props.tReady) return null;

    if (this.cookieBarStore.isAccepted) return null;

    return (
      <LayoutGridCookie>
        <StyledWrapper>
          <InfoMessage>
            <Trans i18nKey="cookieBar">
              We use cookies.
              <a href={this.siteStore.termsURL}>Learn more</a>
            </Trans>
          </InfoMessage>
          <CloseButton type="button" onClick={this.cookieBarStore.clickHandler}>
            <CloseButtonIcon src="/images/close-24px.svg" />
          </CloseButton>
        </StyledWrapper>
      </LayoutGridCookie>
    );
  }
}

export default withTranslation('app')(CookieBar);
