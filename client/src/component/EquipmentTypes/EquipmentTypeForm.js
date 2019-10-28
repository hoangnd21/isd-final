import React, { Component } from 'react'
import {
  Form,
  Input,
  Button
} from 'antd'

class EquipmentTypeForm extends Component {

  addEquipmentType = e => {
    e.preventDefault();
    const { form, addEquipmentTypeRequest, generalTypeID } = this.props;
    form.validateFields((err, newEquipmentType) => {
      if (err) {
        return;
      }
      addEquipmentTypeRequest({ ...newEquipmentType, genTypeId: generalTypeID })
      form.resetFields();
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form
    return (
      <>
        <Form
          layout='vertical'
          onSubmit={this.addEquipmentType}
        >
          <Form.Item label='Equipment Type Label'>
            {getFieldDecorator('label', {
              rules: [
                {
                  required: true,
                  message: 'Equipment type label is required.',
                },
              ],
            })(<Input placeholder="HP ELITEBOOK 840" />)}
          </Form.Item>
          <Form.Item label='Equipment Type Code'>
            {getFieldDecorator('value', {
              rules: [
                {
                  required: true,
                  message: 'Equipment Type Code is required.',
                },
              ],
            })(<Input placeholder="eg. 0UX" />)}
          </Form.Item>
          <div style={{ textAlign: 'right' }}><Button type='primary' htmlType='submit' icon='save'>Add</Button></div>
        </Form>
      </>
    )
  }
}
const eqTForm = Form.create({})(EquipmentTypeForm);

export default eqTForm;
