import { Error500, Error500Context } from 'components/Error500/Error500';
import { GlobalStyle, LayoutGrid, LayoutGridContent } from 'components/Layout/Layout.style';
import React from 'react';
import Helmet from 'react-helmet';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'utils/theme';

interface Props extends WithTranslation {}

class ErrorPage extends React.Component<Props> {
  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'General error')}</title>
        </Helmet>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <LayoutGrid>
            <LayoutGridContent>
              <Error500 context={Error500Context.GLOBAL} />
            </LayoutGridContent>
          </LayoutGrid>
        </ThemeProvider>
      </>
    );
  }
}

export default withTranslation('error-page')(ErrorPage);
