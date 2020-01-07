import { SiteInterface } from 'utils/interfaces';
import Api from 'utils/api';
import MuseumLogoImage from 'components/Header/MuseumLogo.style';
import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

@observer
class MuseumLogo extends React.Component {
  @observable siteData: SiteInterface | null = null;

  async componentDidMount() {
    const siteData = await Api.getSiteData();
    this.setSiteData(siteData);
  }

  @action setSiteData(siteData: Array<SiteInterface>) {
    this.siteData = siteData.length ? siteData[0] : null;
  }

  render() {
    return this.siteData && this.siteData.logo ? (
      <MuseumLogoImage src={this.siteData.logo} alt={this.siteData.name} />
    ) : null;
  }
}

export default MuseumLogo;
