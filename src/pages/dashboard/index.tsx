import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  TransactionOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import styles from './styles.less';

const { Header, Content, Footer, Sider } = Layout;

const Draft = () => {
  const [selectItem, setSelectItem] = useState(1);

  const onChangeItem = (e: any) => {
    setSelectItem(e.key);
    console.log(selectItem);
  };

  const logout = () => {
    window.localStorage.removeItem('user');
    window.location.href = 'admin';
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo}>
          <img alt="" style={styles.img} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={onChangeItem}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Create account
          </Menu.Item>
          <Menu.Item key="3" icon={<CreditCardOutlined />}>
            Get balance
          </Menu.Item>
          <Menu.Item key="4" icon={<TransactionOutlined />}>
            Transfer
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            background: '#fff',
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Avatar
                shape="square"
                size="large"
                style={{
                  margin: '10px',
                }}
                icon={<UserOutlined />}
              />
            </a>
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 595, background: '#fff' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
                flexDirection: 'column',
              }}
            ></div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Made with ❤ by Monster ©2021
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Draft;
