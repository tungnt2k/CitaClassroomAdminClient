import BaseRequest from './baseRequest';

export default class AuthRequest extends BaseRequest {
  getModelName() {
    return 'admin';
  }

  login(opts = {}) {
    const url = `/${this.getModelName()}/login`;
    return this.post(url, opts);
  }

  getDetailProfile() {
    const url = `/${this.getModelName()}/profile`;
    return this.get(url);
  }

  updateProfile(opts = {}) {
    const url = `/${this.getModelName()}/update`;
    return this.put(url, opts);
  }
}
