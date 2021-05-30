import React from 'react';
import Layout from '@/layouts';
import Content from './list';
import { withRouter } from 'umi';
const Account = () => {
  return (
    <>
      <Layout content={<Content />} />
    </>
  );
};

export default withRouter(Account);
