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
      addGenTypeRequest({ ...newGenType })
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
          <Form.Item label='General Type Label'>
            {getFieldDecorator('label', {
              rules: [
                {
                  required: true,
                  message: 'General type is required.',
                },
              ],
            })(<Input placeholder="ALLCAPS" />)}
          </Form.Item>
          <Form.Item label='General Type Code'>
            {getFieldDecorator('value', {
              rules: [
                {
                  required: true,
                  message: 'General Code is required.',
                },
              ],
            })(<Input placeholder="ALLCAPS" />)}
          </Form.Item>
          <Button type='primary' htmlType='submit' icon='save'>Add</Button>
        </Form>
      </>
    )
  }
}
const genForm = Form.create({})(GeneralTypeForm);

export default genForm;
