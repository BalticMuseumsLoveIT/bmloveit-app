import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import QrReader from 'react-qr-reader';

interface Props extends RouteComponentProps {}

interface State {
  qrCodeData: string;
}

@inject('uiStore')
@observer
class QrCodePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);

    this.state = {
      qrCodeData: '',
    };
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
          {this.state.qrCodeData}
        </Content>
      </>
    );
  }

  handleScan(data: string | null): void {
    if (data !== null && data !== this.state.qrCodeData) {
      this.setState({ qrCodeData: data });
    }
  }
}

export default QrCodePage;
