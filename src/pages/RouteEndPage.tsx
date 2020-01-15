import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import RouteEndPageStore from 'utils/store/routeEndPageStore';
import Footer from 'components/Footer/Footer';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps<any> {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class RouteEndPage extends React.Component<Props> {
  routeEndPageStore = new RouteEndPageStore(true);

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.routeEndPageStore.setTReady(this.props.tReady);

    await this.routeEndPageStore.loadData(Number.parseInt(id));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.routeEndPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.routeEndPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Route end')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'Congratulations!')}</h1>
          <div>
            {this.props.t(
              'content.subtitle',
              "You've reached the end of the route {routeName}",
              { routeName: this.routeEndPageStore.routeTitle },
            )}
          </div>
          <Footer>
            <Link to={`/area/${this.routeEndPageStore.routeAreaId}/routes`}>
              {this.props.t('button.changeRoute.label', 'Change route')}
            </Link>
            <Link
              to={
                this.routeEndPageStore.routeFirstItemId
                  ? `/item/${this.routeEndPageStore.routeFirstItemId}`
                  : `/route/${this.routeEndPageStore.routeId}/map`
              }
            >
              {this.props.t('button.startAgain.label', 'Start again')}
            </Link>
          </Footer>
        </Content>
      </>
    );
  }
}

export default withTranslation('route-end-page')(RouteEndPage);
