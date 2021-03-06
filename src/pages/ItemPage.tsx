import Content from 'components/Content/Content';
import ItemPageStore from 'utils/store/itemPageStore';
import { ItemDetails } from 'components/ItemDetails/ItemDetails';
import ItemModal from 'components/ItemModal/ItemModal';
import { EventStore } from 'utils/store/eventStore';
import { ItemType } from 'utils/interfaces';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import { DefaultTheme, ThemeProps, withTheme } from 'styled-components';

export interface Props
  extends WithTranslation,
    ThemeProps<DefaultTheme>,
    RouteComponentProps<{ id: string }> {
  eventStore: EventStore;
}

@inject('eventStore')
@observer
class ItemPage extends React.Component<Props> {
  eventStore = this.props.eventStore;
  itemPageStore = new ItemPageStore(true);

  async handleEvents(): Promise<void> {
    const id = this.itemPageStore.itemData.itemId;

    // Return if item data is not loaded
    if (Number.isNaN(id)) return;

    // On redirected items (quiz, survey) dispatch event separately
    const redirects = [ItemType.QUIZ, ItemType.SURVEY];

    if (
      this.itemPageStore.itemData.itemType !== null &&
      !redirects.includes(this.itemPageStore.itemData.itemType)
    ) {
      await this.eventStore.dispatchViewItem(id);
    }
  }

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.itemPageStore.setTReady(this.props.tReady);

    await this.itemPageStore.loadData(Number.parseInt(id));

    await this.handleEvents();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.itemPageStore.setTReady(this.props.tReady);
    }

    if (prevProps.match.params.id !== this.props.match.params.id) {
      await this.itemPageStore.loadData(
        Number.parseInt(this.props.match.params.id),
      );

      // Handle events when user jump between items without ItemPage unmounting
      await this.handleEvents();
    }
  }

  componentWillUnmount(): void {
    this.itemPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Item')}</title>
        </Helmet>
        <Content backgroundColor={this.props.theme.colors.background.default}>
          <ItemDetails itemStore={this.itemPageStore.itemData} />
        </Content>
        <ItemModal />
      </>
    );
  }
}

export default withTranslation('item-page')(withTheme(ItemPage));
