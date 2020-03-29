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

class LocationPage extends React.Component<Props> {}

export default withTranslation('location-page')(LocationPage);
