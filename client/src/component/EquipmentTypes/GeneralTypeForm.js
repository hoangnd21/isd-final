import React, { Component } from 'react'
import {
  Form,
  Input,
  Button
} from 'antd'

class GeneralTypeForm extends Component {

  addGenType = e => {
    e.preventDefault();
    const { form, addGenTypeRequest } = this.props;
    form.validateFields((err, newGenType) => {
      if (err) {
        return;
      }
      addGenTypeRequest({ label: newGenType.label.toUpperCase(), value: newGenType.value.toUpperCase() })
      form.resetFields();
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form
    return (
      <>
        <Form
          layout='inline'
          onSubmit={this.addGenType}
        >
          <Form.Item label='Name'>
            {getFieldDecorator('label', {
              rules: [
                {
                  required: true,
                  message: 'Name is required.',
                },
              ],
            })(<Input placeholder="ALL CAPS." />)}
          </Form.Item>
          <Form.Item label='Code'>
            {getFieldDecorator('value', {
              rules: [
                {
                  required: true,
                  message: 'Node is required.',
                },
              ],
            })(<Input placeholder="eg. 03X" />)}
          </Form.Item>
          <Button type='primary' htmlType='submit' icon='save' style={{ marginTop: 4 }}>Add</Button>
        </Form>
      </>
    )
  }
}
const genForm = Form.create({})(GeneralTypeForm);

export default genForm;
