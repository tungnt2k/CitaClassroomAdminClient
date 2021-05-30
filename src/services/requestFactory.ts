import AuthRequest from './authRequest';
import AccountRequest from './accountRequest';
import CommonRequest from './commonRequest';

const requestMap = new Map<string, any>([
  ['Auth', AuthRequest],
  ['Account', AccountRequest],
  ['Common', CommonRequest],
]);

const instances = new Map<string, any>();

export default class RequestFactory {
  static getRequest(classname: string) {
    const RequestClass = requestMap.get(classname);
    if (!RequestClass) {
      throw new Error('Invalid request class name: ' + classname);
    }

    let requestInstance = instances.get(classname);
    if (!requestInstance) {
      const newRequestInstance = new RequestClass();
      instances.set(`${classname}`, newRequestInstance);
      requestInstance = newRequestInstance;
    }

    return requestInstance;
  }
}
