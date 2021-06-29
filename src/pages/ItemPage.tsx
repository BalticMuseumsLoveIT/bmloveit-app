import Content from 'components/Content/Content';
import ItemPageStore from 'utils/store/itemPageStore';
import { ItemDetails } from 'components/ItemDetails/ItemDetails';
import ItemModal from 'components/ItemModal/ItemModal';
import { EventStore } from 'utils/store/eventStore';
import { ItemType, EventResponse } from 'utils/interfaces';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { RouteMapPageStore } from 'utils/store/routeMapPageStore';
import { AppButton } from 'components/Buttons/AppButton.style';
import { defaultBoxShadow } from 'components/Page/Page.style';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import styled, { DefaultTheme, ThemeProps, withTheme } from 'styled-components';

export interface Props
  extends WithTranslation,
    ThemeProps<DefaultTheme>,
    RouteComponentProps<{ id: string }> {
  eventStore: EventStore;
  userProfileStore: UserProfileStore;
  routeMapPageStore: RouteMapPageStore;
}

@inject('eventStore', 'userProfileStore', 'routeMapPageStore')
@observer
class ItemPage extends React.Component<
  Props,
  {
    textsData: null | string[];
    closeTextsData: boolean;
  }
> {
  constructor(props: Props) {
    super(props);
    this.state = { textsData: null, closeTextsData: false };
  }

  eventStore = this.props.eventStore;
  routeMapPageStore = this.props.routeMapPageStore;

  itemPageStore = new ItemPageStore(true);
  userProfileStore = this.props.userProfileStore;

  //** Updates user profile if event, adding points, updating routes */
  updateUserProfileAndItemsData(eventData: EventResponse) {
    if (eventData) {
      const achievementsData = eventData.achievements_data;
      const userProfileData = this.userProfileStore.userProfileData;

      if (userProfileData && achievementsData) {
        this.userProfileStore.setUserProfile({
          ...userProfileData,
          points:
            userProfileData.points + (parseInt(achievementsData.points) || 0),
          badges_data: [
            ...userProfileData.badges_data,
            ...achievementsData.badges_data,
          ],
        });

        if (this.routeMapPageStore.routeData && achievementsData.items_data) {
          this.routeMapPageStore.setRouteData({
            ...this.routeMapPageStore.routeData,
            items_data: [
              ...this.routeMapPageStore.routeData.items_data,
              ...achievementsData.items_data,
            ],
          });
        }
      }
    }
  }

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
      const response = (await this.eventStore.dispatchViewItem(
        id,
      )) as EventResponse;

      this.updateUserProfileAndItemsData(response);

      if (response.achievements_data) {
        if (response.achievements_data.texts_data) {
          if (response.achievements_data.texts_data.length > 0) {
            this.setState({
              textsData: response.achievements_data.texts_data,
            });
            // alert(response.achievements_data.texts_data[0]);
          }
        }
      }
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
        {this.state.textsData && !this.state.closeTextsData ? (
          <Content>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '20px',
              }}
            >
              {this.state.textsData.map((text, i) => (
                <TextData key={i}>{text}</TextData>
              ))}

              <AppButton
                onClick={() => this.setState({ closeTextsData: true })}
              >
                {this.props.t('button.next.label', 'Next')}
              </AppButton>
            </div>
          </Content>
        ) : (
          <Content backgroundColor={this.props.theme.colors.background.default}>
            <ItemDetails itemStore={this.itemPageStore.itemData} />
          </Content>
        )}

        <ItemModal />
      </>
    );
  }
}

export const TextData = styled.div`
  background-color: ${({ theme }) => theme.colors.list.item.default.background};
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25em;
  color: ${({ theme }) => theme.colors.list.item.default.text};
  font-size: 1em;
  font-family: Montserrat, sans-serif;
  box-shadow: ${defaultBoxShadow};
`;

export default withTranslation('item-page')(withTheme(ItemPage));
