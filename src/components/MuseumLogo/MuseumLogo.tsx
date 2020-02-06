import { SiteStore } from 'utils/store/siteStore';
import MuseumLogoImage, {
  MuseumLogoImageProps,
} from 'components/MuseumLogo/MuseumLogo.style';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends MuseumLogoImageProps, WithTranslation {}

interface InjectedProps extends Props {
  siteStore: SiteStore;
}

@inject('siteStore')
@observer
class MuseumLogo extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  siteStore = this.injected.siteStore;

  render() {
    return this.props.tReady && this.siteStore.isDataAvailable() ? (
      <MuseumLogoImage
        src={this.siteStore.logo}
        alt={this.props.t('image.museumLogotype.alt', 'Museum logotype')}
        type={this.props.type}
      />
    ) : null;
  }
}

export default withTranslation('app')(MuseumLogo);
