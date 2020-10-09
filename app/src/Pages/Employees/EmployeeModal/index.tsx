import React from 'react';
import { observer } from 'mobx-react';

import {
  Modal,
  Form,
  Input,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import Constant from '../../../Global/Constant';

interface Props {
  form: FormInstance,
  modalVisible: boolean,
  editMode: boolean,
  onCancel?: () => void,
  onSave?: ((employee: any) => void),
  confirmLoading: boolean
}

function EmployeeModal(props: Props) {
  const {
    form, modalVisible, editMode, onCancel, onSave, confirmLoading
  } = props;
 
  return (
    <Modal
      title={editMode ? "Update Employee Details" : "Create Employee Details"}
      visible={modalVisible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      okText={editMode ? "Update" : "Create"}
      confirmLoading={confirmLoading}
      cancelButtonProps={{ disabled: confirmLoading }}
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        labelAlign="left"
        colon={false}
        onFinish={onSave}
      >
        <Form.Item
          className="mb-2"
          label="Name"
          name="Name"
          required
          rules={[
            {
              required: true,
              message: Constant.nameRequiredError,
            },
          ]}
        >
        <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          className="mb-2"
          label="EmployeeId"
          name="EmployeeId"
        >
        <Input placeholder="Enter employee ID" />
        </Form.Item>
        <Form.Item
          className="mb-2"
          label="Grade"
          name="Grade"
        >
        <Input placeholder="Enter grade" />
        </Form.Item> 
        <Form.Item
          className="mb-2"
          label="Contact Number"
          name="ContactNumber"
        >
        <Input placeholder="Enter contact number" />
        </Form.Item> 
        <Form.Item
          className="mb-2"
          label="Designation"
          name="Designation"
        >
          <Input placeholder="Enter designation" />
        </Form.Item>   
      </Form>
    </Modal>
  );
}

export default observer(EmployeeModal);
