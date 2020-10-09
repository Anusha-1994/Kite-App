/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Typography,
  notification,
} from 'antd';
import { useHistory } from 'react-router-dom';
import OrganizationLogo from '../../Assets/Images/Image.jpeg';
import './SignUp.less';
import Routes from '../../Global/Routes';
import Constant from '../../Global/Constant';
import authStore from '../../Store/authStore';


function SignUp() {
  const [loading, setLoading] = useState(false);
  const history               = useHistory();
  const [showMessage, setShowMessage] = useState(false);

  const signUpHandler = (values: any) => {
    if (showMessage) return 
    setLoading(true);
    authStore.createUser({email : values.email, password: values.password}, (err?: Error) => {
      setLoading(false);
      if (err) {
        notification.error({
          placement: 'topRight',
          description: err.message,
          message: 'Error',
        });
        return;
      }
      returnHandler()  
    });
  };
  const passwordChange = (e: any) => {
    let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!regex.test(e.target.value)) {
      setShowMessage(true)
    }
    else {
      setShowMessage(false)
    }
  }
  const returnHandler = () => {
    history.push(Routes.login);
  };

  return (
    <Layout.Content id="forgot-password" className="d-flex">
      <div className="box">
        <div className="text-center">
          <img src={OrganizationLogo} className="mb-3" alt="OrganisationLogo" height={80} />
          <Typography.Title className="mb-4" level={3}>
            Sign Up
          </Typography.Title>
        </div>
        <div className="bg-white rounded px-4 py-5">
          <Form onFinish={signUpHandler}>
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
                  message: Constant.passwordRequiredValidationError,
                },
              ]}
            >
              <Input.Password placeholder="Password" onChange={passwordChange} />
            </Form.Item>
            <Form.Item
              className="mb-3 input-position"
              name="confirmpassword"
              required
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: Constant.confirmPasswordRequiredValidationError,
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" onChange={passwordChange} />
            </Form.Item>
            <Button className="mb-3" type="primary" htmlType="submit" loading={loading} block>
              Sign Up
            </Button>
          </Form>
          {
            showMessage ? (
              <div className="message">
                * Password must be at least 6-20 characters long, a combination of uppercase, lowercase and number are required.
              </div>
            ) : null
          }
        </div>
      </div>
    </Layout.Content>
  );
}

export default SignUp;
