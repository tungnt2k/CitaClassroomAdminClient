import BaseRequest from './baseRequest';

export default class AccountRequest extends BaseRequest {
  getModelName() {
    return '/admin';
  }

  getAccountList(opts = {}) {
    const url = `${this.getModelName()}/list`;
    return this.get(url, opts);
  }

  getAccountDetail(id: number) {
    const url = `${this.getModelName()}/profile/${id}`;
    return this.get(url);
  }

  createAccount(opts = {}) {
    const url = `${this.getModelName()}/create`;
    return this.post(url, opts);
  }

  updateAccount(opts = {}) {
    const url = `${this.getModelName()}/update`;
    return this.put(url, opts);
  }

  getAccountProfile(opts = {}) {
    const url = `${this.getModelName()}/profile`;
    return this.get(url, opts);
  }
}
