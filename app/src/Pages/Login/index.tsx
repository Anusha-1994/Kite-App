/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  notification
} from 'antd';
import './Login.less';
import OrganizationImage from '../../Assets/Images/Image.jpeg';
import Constant from '../../Global/Constant';
import Routes from '../../Global/Routes';
import authStore from '../../Store/authStore';

const { Title } = Typography;

function Login() {
  const history                       = useHistory();
  const [loading, setLoading]         = useState(false);

  const loginHandler = (values: any) => {
    setLoading(true);
    authStore.signIn(values, (err: any) => {
      setLoading(false);
      console.log("err", err)
      if (err) {
          notification.error({
            placement: 'topRight',
            description: err.message,
            message: 'Error',
          });
          return;
      }
      history.push(Routes.employees);
    });
  };

  const signUpAction = () => {
    history.push(Routes.signup);
  }


  return (
    <Layout.Content id="login-container" className="d-flex align-items-center">
      <div className="login-box">
        <div className="d-flex text-center justify-content-center align-items-center mb-5">
          <img src={OrganizationImage} height={60} alt="Organization Logo" />
          <Title className="text-center m-0 ml-3" level={4}>{Constant.applicationName}</Title>
        </div>
        <div className="">

          <Form className="d-flex flex-column" onFinish={loginHandler}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: Constant.emailValidationError,
                },
                {
                  required: true,
                  message: Constant.emailRequiredValidationError,
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              className="mb-2"
              rules={[
                {
                  required: true,
                  message: Constant.passwordRequiredValidationError,
                },
              ]}
            >
              <Input.Password placeholder="Password"/>
            </Form.Item>
            <Link to={Routes.resetPassword} className="ml-auto mb-3">
              Reset Password?
            </Link>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={signUpAction} block >
                Sign Up
              </Button>
            </Form.Item>
          </Form> 
        </div>
      </div>
    </Layout.Content>
  );
}

export default Login;
