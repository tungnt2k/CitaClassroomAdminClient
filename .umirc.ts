import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: 'admin/login',
      component: '@/pages/login',
    },
    {
      path: 'admin/dashboard',
      component: '@/pages/dashboard',
      wrappers: ['@/components/auth'],
    },
    {
      path: 'admin/account',
      component: '@/pages/account',
      wrappers: ['@/components/auth'],
    },
  ],
  fastRefresh: {},
  dynamicImport: {},
  title: 'Monster web3 admin',
  dva: {
    immer: true,
    hmr: false,
  },
  locale: {
    default: 'vi-VN',
    baseNavigator: true,
  },
});
