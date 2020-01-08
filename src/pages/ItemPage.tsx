import Content from 'components/Content/Content';
import ItemPageStore, { ItemKind } from 'utils/store/itemPageStore';
import { ItemDetails } from 'components/ItemDetails/ItemDetails';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

export interface Props
  extends WithTranslation,
    RouteComponentProps<{ id: string }> {}

@observer
class ItemPage extends React.Component<Props> {
  itemPageStore = new ItemPageStore(true);

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.itemPageStore.setTReady(this.props.tReady);

    await this.itemPageStore.loadData(Number.parseInt(id));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.itemPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.itemPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    if (ItemKind.SCREEN === this.itemPageStore.itemKind) {
      return (
        <>
          <Helmet>
            <title>{this.props.t('page.title', 'Item')}</title>
          </Helmet>
          <Content>
            <ItemDetails itemPageStore={this.itemPageStore} />
          </Content>
        </>
      );
    }

    if (ItemKind.POPUP === this.itemPageStore.itemKind) {
      return <ItemDetails itemPageStore={this.itemPageStore} />;
    }

    return null;
  }
}

export default withTranslation('item-page')(ItemPage);
