import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  notification,
} from 'antd';
import OrganizationImage from '../../Assets/Images/Image.jpeg';
import './ResetPassword.less';
import Constant from '../../Global/Constant';
import authStore from '../../Store/authStore';
import Routes from '../../Global/Routes';


function ResetPassword() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const resetPasswordHandler = (values: any) => {
    setLoading(true);
    authStore.resetPassword({password: values.password, email: values.email }, (err?: Error) => {
      setLoading(false);
      if (err) {
        notification.error({
          placement: 'topRight',
          description: err.message,
          message: 'Error',
        });
        return;
      }
      history.push(Routes.login);
    });
  };

  return (
    <Layout.Content id="reset-password" className="d-flex">
      <div className="box">
        <div className="text-center">
          <img src={OrganizationImage} className="mb-3" alt="OrganisationLogo" height={80} />
          <Typography.Title className="mb-4" level={3}>
            Reset Password
          </Typography.Title>
        </div>
        <div className="bg-white rounded px-4 py-5">
          <Form onFinish={resetPasswordHandler}>
            <Form.Item
              name="email"
              className="mb-3 input-position"
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
              className="mb-3 input-position"
              rules={[
                {
                  required: true,
                  message: Constant.newPasswordRequiredError,
                },
              ]}
            >
              <Input.Password placeholder="New password" />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              className="mb-3 input-position"
              rules={[
                {
                  required: true,
                  message: Constant.confirmPasswordRequiredError,
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(Constant.passwordMatchError));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Reset Password
            </Button>
          </Form>
        </div>
      </div>
    </Layout.Content>
  );
}

export default ResetPassword;
