import Content from 'components/Content/Content';
import QrCodeStore from 'utils/store/qrCodeStore';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import QrReader from 'react-qr-reader';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps {}

@observer
class QrCodePage extends React.Component<Props> {
  qrCodeStore = new QrCodeStore();

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'QR Code')}</title>
        </Helmet>
        <Content>
          QrCodePage
          <QrReader
            delay={300}
            onError={() => undefined}
            onScan={this.qrCodeStore.handleScan}
            style={{ width: '100%' }}
          />
          {this.qrCodeStore.qrCodeData}
        </Content>
      </>
    );
  }
}

export default withTranslation('qr-code-page')(QrCodePage);
