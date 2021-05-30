export default class AuthenticationUtils {
  static accessToken: string;
  static refreshToken: string;
  static user: any;
  static dataLoaded: boolean;

  static isAuthenticated() {
    AuthenticationUtils.loadDataIfNeed();
    return !!AuthenticationUtils.accessToken;
  }

  static saveAuthenticationData(data: { token: string; refreshToken: string }) {
    const { token, refreshToken } = data;
    window.localStorage.setItem('access_token', token || '');
    window.localStorage.setItem('refresh_token', refreshToken || '');
    AuthenticationUtils.accessToken = token || '';
    AuthenticationUtils.refreshToken = refreshToken || '';
  }

  static removeAuthenticationData() {
    AuthenticationUtils.saveAuthenticationData({ token: '', refreshToken: '' });
    AuthenticationUtils.accessToken = '';
    AuthenticationUtils.refreshToken = '';
  }

  static getAccessToken() {
    AuthenticationUtils.loadDataIfNeed();
    return AuthenticationUtils.accessToken;
  }

  static getRefreshToken() {
    AuthenticationUtils.loadDataIfNeed();
    return AuthenticationUtils.refreshToken;
  }

  static loadData() {
    AuthenticationUtils.accessToken =
      window.localStorage.getItem('access_token') || '';
    AuthenticationUtils.refreshToken =
      window.localStorage.getItem('refresh_token') || '';
    AuthenticationUtils.user =
      JSON.parse(window.localStorage.getItem('user') as string) || '';
    AuthenticationUtils.dataLoaded = true;
  }

  static loadDataIfNeed() {
    if (
      AuthenticationUtils.dataLoaded === undefined ||
      !AuthenticationUtils.dataLoaded
    ) {
      AuthenticationUtils.loadData();
    }
  }

  static saveUser(data: { id: number; type_user: number; email: string }) {
    window.localStorage.setItem('user', JSON.stringify(data) || '');
    AuthenticationUtils.user = data;
  }

  static getUser() {
    AuthenticationUtils.loadDataIfNeed();
    return AuthenticationUtils.user;
  }

  static removeUser() {
    AuthenticationUtils.saveUser({ id: 0, type_user: 0, email: '' });
    AuthenticationUtils.user = null;
  }
}
