import rf from '@/services/requestFactory';
import AuthenticationUtils from './AuthenticationUtils';

const login = async (credentials: { username: string; password: string }) => {
  const res = await rf.getRequest('Auth').login(credentials);
  !res.success || AuthenticationUtils.saveAuthenticationData(res.data);
  return res;
};

export { login };
