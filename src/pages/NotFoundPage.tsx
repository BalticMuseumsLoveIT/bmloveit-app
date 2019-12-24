import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation {}

class NotFoundPage extends React.Component<Props> {
  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Not found')}</title>
        </Helmet>
        <Content>404</Content>
      </>
    );
  }
}

export default withTranslation('not-found-page')(NotFoundPage);
