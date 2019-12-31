import {
  StyledWrapper,
  CloseButton,
  InfoMessage,
} from 'components/CookieBar/CookieBar.style';
import { CookieBarStore } from 'utils/store/cookieBarStore';
import React from 'react';
import { Link } from 'react-router-dom';
import { Trans, WithTranslation, withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';

interface Props extends WithTranslation {}

interface InjectedProps extends Props {
  cookieBarStore: CookieBarStore;
}

@inject('cookieBarStore')
@observer
class CookieBar extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  cookieBarStore = this.injected.cookieBarStore;

  componentDidMount = async () => {
    await this.cookieBarStore.loadData();
  };

  render() {
    // Wait for translations
    if (!this.props.tReady) return null;

    // Wait for site data
    if (!this.cookieBarStore.isSiteDataLoaded) return null;

    // Do not render is cookies were accepted
    if (this.cookieBarStore.isAccepted) return null;

    return (
      // Only if cookies not accepted
      <StyledWrapper>
        <InfoMessage>
          <Trans i18nKey="cookieBar">
            We use cookies.
            <Link to={this.cookieBarStore.termsURL}>Learn more</Link>
          </Trans>
        </InfoMessage>
        <CloseButton type="button" onClick={this.cookieBarStore.clickHandler}>
          <span>&times;</span>
        </CloseButton>
      </StyledWrapper>
    );
  }
}

export default withTranslation('app')(CookieBar);
