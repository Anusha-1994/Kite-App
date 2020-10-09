import React from 'react';
import { Spin } from 'antd';

function FlashScreen() {
  return (
    <div className="d-flex vh-100">
      <Spin spinning className="m-auto" size="large" />
    </div>
  )
}

export default FlashScreen;
