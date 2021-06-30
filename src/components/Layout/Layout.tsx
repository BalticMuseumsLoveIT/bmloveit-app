import Header from 'components/Header/Header';
import CookieBar from 'components/CookieBar/CookieBar';
import { SiteStore } from 'utils/store/siteStore';
import { UiStore } from 'utils/store/uiStore';
import { GlobalStyle, LayoutGrid } from 'components/Layout/Layout.style';
import MainMenu from 'components/MainMenu/MainMenu';
import Content from 'components/Content/Content';
import { AppButton } from 'components/Buttons/AppButton.style';
import { defaultBoxShadow } from 'components/Page/Page.style';
import React from 'react';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import { observer, inject } from 'mobx-react';
import { useTranslation } from 'react-i18next';

interface Props {
  children?: React.ReactNode;
  displayHeader?: boolean;
}

interface InjectedProps extends Props {
  siteStore: SiteStore;
  uiStore: UiStore;
}

@inject('siteStore', 'uiStore')
@observer
export default class Layout extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  siteStore = this.injected.siteStore;
  uiStore = this.injected.uiStore;

  theme = (): DefaultTheme => {
    return Object.assign(this.siteStore.theme, {
      isMenuOpened: this.uiStore.nav.isOpened,
    });
  };

  render() {
    const { displayHeader, children } = this.props;

    return (
      <ThemeProvider theme={() => this.theme()}>
        <GlobalStyle />
        <LayoutGrid isMenuOpened={this.uiStore.nav.isOpened}>
          <CookieBar />
          {displayHeader && <Header />}
          {displayHeader && <MainMenu />}

          <SwitchVisibility
            visible={!(this.uiStore.showTextsData && this.uiStore.textsData)}
          >
            {children}
          </SwitchVisibility>

          {this.uiStore.showTextsData && this.uiStore.textsData && (
            <TextDataContent
              textsData={this.uiStore.textsData}
              setShowTextsData={this.uiStore.setShowTextsData}
            />
          )}
        </LayoutGrid>
      </ThemeProvider>
    );
  }
}

const TextDataContent = ({
  textsData,
  setShowTextsData,
}: {
  textsData: string[];
  setShowTextsData: (val: boolean) => void;
}) => {
  const { t } = useTranslation();

  return (
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
        {textsData.map((text, i) => (
          <TextData key={i}>{text}</TextData>
        ))}

        <AppButton onClick={() => setShowTextsData(false)}>
          {t('button.next.label', 'Next')}
        </AppButton>
      </div>
    </Content>
  );
};

const SwitchVisibility = styled.div<{ visible: boolean }>`
  ${({ visible }) => !visible && 'display: none;'};
  grid-row: 4 / span 1;
  background-color: ${({ theme }) => theme.colors.list.item.default.background};
`;

const TextData = styled.div`
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
