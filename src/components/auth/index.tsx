import { Redirect } from 'umi';
import AuthenticationUtils from '@/utils/AuthenticationUtils';

export default (props: any) => {
  const isLogin = AuthenticationUtils.isAuthenticated();
  return isLogin ? (
    <div>{props.children}</div>
  ) : (
    <Redirect
      to={`/admin/login?uri_redirect=${props.location.pathname.replace(
        '/',
        '',
      )}`}
    />
  );
};
