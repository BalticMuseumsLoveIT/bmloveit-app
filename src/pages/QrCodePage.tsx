import Content from 'components/Content/Content';
import QrCodeStore from 'utils/store/qrCodeStore';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import QrReader from 'react-qr-reader';

interface Props extends RouteComponentProps {}

@observer
class QrCodePage extends React.Component<Props> {
  qrCodeStore = new QrCodeStore();

  render() {
    return (
      <>
        <Helmet>
          <title>QR code</title>
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

export default QrCodePage;
