import { Form, Input, Button, Checkbox } from 'antd';
import { getQueryString } from '@/utils/commonFunc';
import { login } from '@/utils/authentication';
import { openNotificationWithIcon } from '@/utils/notification';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const onFinish = async (values: any) => {
    console.log(values);

    const res = await login(values);
    if (res.success) {
      const queryString = getQueryString(window.location.search)
        .uri_redirect as string;
      window.location.href = `/${queryString}` || '/dashboard';
      // setIsLoading(false);
    } else {
      // setIsLoading(false);
      openNotificationWithIcon(
        'error',
        'Thông báo',
        'Tài khoản hoặc mật khẩu không đúng',
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          width: '474px',
          padding: '4rem 4rem 4.5rem',
          boxShadow: '2px 2px rgb(202 197 197)',
        }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
                min: 8,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
