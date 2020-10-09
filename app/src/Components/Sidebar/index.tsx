/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Routes from '../../Global/Routes';
import './Sidebar.less';


function Sidebar() {
  return (
    <Layout.Sider id="sidebar">
      <Menu mode="inline">
        <Menu.Item key="c">
          <NavLink to={Routes.employees}>Employees</NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
export default Sidebar;