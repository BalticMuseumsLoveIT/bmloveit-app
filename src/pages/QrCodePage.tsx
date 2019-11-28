import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import QrReader from 'react-qr-reader';

interface Props extends RouteComponentProps {}

@inject('uiStore')
@observer
class QrCodePage extends React.Component<Props> {
  private qrCodeData: string | null = null;

  constructor(props: Props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
  }

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
            onError={(error: any) => console.log('Error: ', error)}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
        </Content>
      </>
    );
  }

  handleScan(data: string | null): void {
    if (data !== null && this.qrCodeData === null) {
      this.qrCodeData = data;
    }
  }
}

export default QrCodePage;
