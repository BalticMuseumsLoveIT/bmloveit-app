import { action, observable } from 'mobx';

export default class QrCodeStore {
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
}
