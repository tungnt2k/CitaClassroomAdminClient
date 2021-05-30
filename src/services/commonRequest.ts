import BaseRequest from './baseRequest';

export default class CommonRequest extends BaseRequest {
  getModelName() {
    return '';
  }

  uploadFile(opts = {}) {
    const url = `/upload`;
    return this.post(url, opts);
  }
}
