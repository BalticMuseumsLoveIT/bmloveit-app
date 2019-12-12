import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import QrReader from 'react-qr-reader';
import { action, observable } from 'mobx';

interface Props extends RouteComponentProps {}

@observer
class QrCodePage extends React.Component<Props> {
  @observable qrCodeData = '';

  @action setQrCodeData(qrCodeData: string) {
    this.qrCodeData = qrCodeData;
  }

  @action
  handleScan = (data: string | null): void => {
    if (data !== null && data !== this.qrCodeData) {
      this.setQrCodeData(data);
    }
  };

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
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
          {this.qrCodeData}
        </Content>
      </>
    );
  }
}

export default QrCodePage;
