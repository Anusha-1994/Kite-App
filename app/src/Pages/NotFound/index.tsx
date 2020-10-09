import React from 'react';
import { Layout, Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Routes from '../../Global/Routes';


function NotFound() {
  const history = useHistory();

  return (
    <Layout.Content className="d-flex align-items-center justify-content-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={(
          <Button type="primary" onClick={() => history.push(Routes.home)}>
            Back Home
          </Button>
        )}
      />
    </Layout.Content>
  );
}

export default NotFound;
