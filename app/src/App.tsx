/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import ApplicationRoutes from './Routing/ApplicationRoutes';
import { FlashScreen } from './Components';
import './App.less';

type AppState = {
  loading: boolean,
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}> 
          {
            loading ?
            <FlashScreen /> :
            <ApplicationRoutes />
          }
        </Layout>
      </Router>
    );
  }
}

export default App;
