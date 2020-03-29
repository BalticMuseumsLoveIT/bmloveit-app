import Content from 'components/Content/Content';
import { Title } from 'components/Page/Page.style';
import LocationPageStore from 'utils/store/locationPageStore';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';

interface Props extends WithTranslation, RouteComponentProps<{ id: string }> {}

class LocationPage extends React.Component<Props> {
  locationPageStore = new LocationPageStore(true);

  componentDidMount = async () => {
    const {
      params: { id },
    } = this.props.match;

    this.locationPageStore.setTReady(this.props.tReady);
  };

  render = () => {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Location')}</title>
        </Helmet>
        <Content>
          <Title>{this.props.t('content.title', 'Location')}</Title>
        </Content>
      </>
    );
  };
}

export default withTranslation('location-page')(LocationPage);
