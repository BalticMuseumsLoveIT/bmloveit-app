import Content from 'components/Content/Content';
import { Title, Message } from 'components/Page/Page.style';
import { OutlineButton } from 'components/Buttons/OutlineButton.style';
import {
  QRCodeModule,
  QRCodeModulePlaceholder,
  QRCodeScanButton,
} from 'components/QRCodeModule/QRCodeModule.style';
import { EventStore } from 'utils/store/eventStore';
import React from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useObserver, useLocalStore, inject } from 'mobx-react';
import { action } from 'mobx';
import SVG from 'react-inlinesvg';

interface Props {
  eventStore?: EventStore;
}

const QrCodePage = inject('eventStore')(({ eventStore }: Props) => {
  const { t, ready } = useTranslation('qr-code-page');
  const history = useHistory();

  const localStore = useLocalStore(() => ({
    isFailed: false,
    isScanning: false,

    startScanning: action(() => {
      localStore.isScanning = true;
      localStore.isFailed = false;
    }),

    stopScanning: action((isFailed: any = false) => {
      localStore.isScanning = false;
      localStore.isFailed = isFailed;
    }),
  }));

  const handleScan = async (data: string | null) => {
    if (data !== null) {
      try {
        const url = new URL(data);

        if (url.host === window.location.host) {
          eventStore && (await eventStore.dispatchScanQR(data));
          history.push(url.pathname + url.search);
        } else {
          localStore.stopScanning(true);
        }
      } catch {
        localStore.stopScanning(true);
      }
    }
  };

  return useObserver(() => {
    if (!ready) return null;

    return (
      <>
        <Helmet>
          <title>{t('page.title', 'Scan QR')}</title>
        </Helmet>
        <Content>
          <Title>{t('content.title', 'Scan QR')}</Title>

          {localStore.isScanning ? (
            <QRCodeModule
              delay={300}
              onError={() => localStore.stopScanning(true)}
              onScan={handleScan}
            />
          ) : (
            <QRCodeModulePlaceholder
              src={'/images/qr-code.png'}
              alt={t('content.image', 'QR code')}
            />
          )}
          <Message isError={localStore.isFailed}>
            {localStore.isFailed
              ? t('content.message.error', 'Invalid code!')
              : t(
                'content.message.initial',
                'Click on the button and scan the code',
              )}
          </Message>
          <QRCodeScanButton
            isThin={true}
            onClick={localStore.startScanning}
            isDisabled={localStore.isScanning}
            disabled={localStore.isScanning}
          >
            <SVG src="/images/camera-24px.svg" />
            {!localStore.isFailed
              ? localStore.isScanning
                ? t('button.scan.scanning', 'Scanning')
                : t('button.scan.initial', 'Start scanning')
              : t('button.scan.error', 'Try again')}
          </QRCodeScanButton>
          <OutlineButton isThin={true} onClick={history.goBack}>
            {t('button.cancel', 'Cancel')}
          </OutlineButton>
        </Content>
      </>
    );
  });
});

export default QrCodePage;
