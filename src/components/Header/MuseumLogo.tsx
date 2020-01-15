import MuseumLogoImage from 'components/Header/MuseumLogo.style';
import MuseumLogoStore from 'utils/store/musemLogoStore';
import React from 'react';
import { observer } from 'mobx-react';

@observer
class MuseumLogo extends React.Component {
  museumLogoStore = new MuseumLogoStore();

  async componentDidMount() {
    await this.museumLogoStore.load();
  }

  render() {
    return this.museumLogoStore.siteData &&
      this.museumLogoStore.siteData.logo ? (
      <MuseumLogoImage
        src={this.museumLogoStore.siteData.logo}
        alt={this.museumLogoStore.siteData.name}
      />
    ) : null;
  }
}

export default MuseumLogo;
