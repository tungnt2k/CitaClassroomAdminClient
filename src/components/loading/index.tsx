import { Spin } from 'antd';
import React from 'react';
import styles from './styles.less';

export default function (props: any) {
  const { size } = props;
  return (
    <div className={styles.SpinContainer}>
      <Spin size={size || 'large'} />
    </div>
  );
}
