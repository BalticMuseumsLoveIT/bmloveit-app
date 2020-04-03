import Content from 'components/Content/Content';
import { Emphasize, Title } from 'components/Page/Page.style';
import LocationPageStore, { ErrorType } from 'utils/store/locationPageStore';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

interface Props extends WithTranslation, RouteComponentProps<{ id: string }> {}

@observer
class LocationPage extends React.Component<Props> {
  locationPageStore = new LocationPageStore(true);

  componentDidMount = async () => {
    const {
      params: { id },
    } = this.props.match;

    this.locationPageStore.setTReady(this.props.tReady);

    await this.locationPageStore.loadData(
      /^\d+$/.test(id) ? Number.parseInt(id) : NaN,
    );
  };

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Location')}</title>
        </Helmet>
        <Content>
          <Title>{this.props.t('content.title', 'Location')}</Title>

          {this.locationPageStore.itemFound && (
            <Redirect
              to={{
                pathname: `/item/${this.locationPageStore.itemId}`,
              }}
            />
          )}

          {this.locationPageStore.hasError && (
            <Emphasize>
              <p>
                {(() => {
                  switch (this.locationPageStore.errorType) {
                    case ErrorType.INVALID_ID:
                      return this.props.t(
                        'error.location.invalidId',
                        'Sorry, provided location ID is invalid',
                      );
                    case ErrorType.LOCATION_NOT_FOUND:
                      return this.props.t(
                        'error.location.locationNotFound',
                        'Sorry, location with a given ID was not found',
                      );
                    case ErrorType.LOCATION_HAS_NO_ROUTE_ITEM:
                      return this.props.t(
                        'error.location.locationHasNoRouteItem',
                        'Sorry, current location has no item that belongs to selected route',
                      );
                    case ErrorType.LOCATION_HAS_NO_DEFAULT_ITEM:
                      return this.props.t(
                        'error.location.locationHasNoDefaultItem',
                        'Sorry, current location has no default item',
                      );
                    case ErrorType.GENERIC:
                      return this.props.t(
                        'error.location.generic',
                        'Sorry, item ID could not be determined',
                      );
                    default:
                      return null;
                  }
                })()}
              </p>
            </Emphasize>
          )}
        </Content>
      </>
    );
  }
}

export default withTranslation('location-page')(LocationPage);
