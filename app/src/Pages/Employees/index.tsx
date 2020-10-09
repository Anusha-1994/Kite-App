/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Table,
  Button,
  Form,
  Spin,
  notification,
  Input
} from 'antd'; 
import {
  PlusOutlined, EditFilled,
} from '@ant-design/icons';
import Constant from '../../Global/Constant';
import employeeStore from '../../Store/employeeStore';
import './Employees.less';
import EmployeeModal from './EmployeeModal'
const { Search } = Input;

function Employee() {
  const { employees } = employeeStore;
  const [modalVisible, setModalVisibility]          = useState(false);
  const [loading, setLoading]                       = useState(false);
  const [editing, setEditing]                       = useState(false);  
  const [form]                                      = Form.useForm();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [dataSource, setDataSource]                 = useState(employeeStore.employees);
  const getEmployeeDetails = () => {
    setLoading(true);
    employeeStore.getEmployeeDetails((err?: Error)=> {
      setLoading(false);
      if (err) {
        notification.error({
          placement   : 'topRight',
          description : err.message,
          message     : 'Error',
          duration    : 0,
        });
      
      }
      setDataSource(employeeStore.employees)
    })
  }

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  const showModal = async (record: any) => {
    setEditing(true)
    const employeeData: any = {
      Name          : record.Name,
      EmployeeId    : record.EmployeeId,
      Grade         : record.Grade,
      ContactNumber : record.ContactNumber,
      Designation   : record.Designation
    }
    setSelectedEmployeeId(record._id);
    form.setFieldsValue(employeeData);
    setModalVisibility(true);
  };

 

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Employee ID',
      dataIndex: 'EmployeeId',
      key: 'EmployeeId',
    },
    {
      title: 'Grade',
      dataIndex: 'Grade',
      key: 'Grade',
    },
    {
      title: 'Contact Number',
      dataIndex: 'ContactNumber',
      key: 'ContactNumber',
    },
    {
      title: 'Designation',
      dataIndex: 'Designation',
      key: 'Designation',
      filters: [
        {
          text: 'Project Manager',
          value: 'Project Manager',
        },
        {
          text: 'Team Lead',
          value: 'Team Lead',
        },
        {
          text: 'Software Engineer',
          value: 'Software Engineer',
        },
        {
          text: 'Senior Software Engineer',
          value: 'Senior Software Engineer',
        },
      ],
      filterMultiple: false,
      onFilter: (value: any, record: any) => record.Designation.indexOf(value) === 0,
    },
    {
      key: 'action',
      render: (text: any, record: any) => <EditFilled onClick={() => showModal(record)} />,
    },
  ];
  
  
  const addButtonHandler = () => {
    form.resetFields();
    setModalVisibility(true);
  };

  const saveChangeCallback = (err?: Error) => {
    if (err) {
      notification.error({
        placement: 'topRight',
        description: err.message,
        message: 'Error',
      });
      return;
    }
    setModalVisibility(false);
    getEmployeeDetails();
  };

  const SaveData = () => {
   
    form.validateFields()
      .then((value) => {
        const updatedData = { ...value, _id:  selectedEmployeeId}
        setLoading(true);
        employeeStore.createUpdateEmployee(updatedData, saveChangeCallback);
        setLoading(false);

      })
      .catch(() => {
        saveChangeCallback()
      });
  };
  
  const searchTrigger = (value: any) => {
    const filteredData = employees.filter(entry =>
      entry.Name.includes(value)
    );
    setDataSource(filteredData);
  }
  return (
    <Layout.Content>
      <Typography.Title className="mb-4" level={4}>
        Employees      
      </Typography.Title>
      <Spin spinning={loading}>
        <div className="position-relative">
          <Search
            placeholder="input search text"
            onSearch={value => searchTrigger(value)}
            style={{ width: 200 }}
          />
          <Table
            className="pb-5 log-table bg-white"
            columns={tableColumns}
            dataSource={dataSource}
            pagination={{
              pageSize: Constant.itemsPerPage,
              position: ['bottomCenter'],
            }}
          />
          <Button
            className="btn-add"
            type="primary"
            shape="circle"
            icon={<PlusOutlined style={{ fontSize: 20 }} />}
            size="large"
            onClick={addButtonHandler}
          />
        </div>
        <EmployeeModal
          form={form}
          modalVisible={modalVisible}
          editMode={editing}
          onSave={SaveData}
          onCancel={() => setModalVisibility(false)}
          confirmLoading={loading}
        />
      </Spin>
    </Layout.Content>
  );
}
export default Employee;