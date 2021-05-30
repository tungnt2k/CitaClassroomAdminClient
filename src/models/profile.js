import rf from '@/services/requestFactory';

export default {
  namespace: 'PROFILE',
  state: {
    userDetail: {},
  },

  reducers: {
    getUserDetailSuccess(state, action) {
      return {
        ...state,
        userDetail: action.payload,
      };
    },
    updateAccountAdminSuccess(state, action) {
      return {
        ...state,
        userDetail: action.payload,
      };
    },
  },

  effects: {
    *getUserDetail(action, { put }) {
      const { data, success } = yield rf
        .getRequest('Account')
        .getAccountProfile(action.payload);
      if (success) {
        yield put({ type: 'getUserDetailSuccess', payload: data });
      }
    },
    *updateAccountAdmin(action, { put }) {
      const { data, success, message } = yield rf
        .getRequest('Account')
        .updateAccount(action.payload);
      if (success) {
        yield put({ type: 'updateAccountAdminSuccess', payload: data });
      } else {
        Message.error(message);
      }
    },
  },
};
