import React, { Component } from 'react'
import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Button,
} from 'antd'


const { TextArea } = Input
class ProviderCreateForm extends Component {

  onCreateProvider = e => {
    e.preventDefault();
    const { form, createProvider } = this.props;
    form.validateFields((err, newProvider) => {
      if (err) {
        return;
      }
      const newP = {
        ...newProvider,
        contactPerson: {
          CPName: newProvider.CPName,
          emailCP: newProvider.emailCP,
          phoneCP: newProvider.phoneCP
        },
        warrantyPerson: {
          WPName: newProvider.WPName,
          emailWP: newProvider.emailWP,
          phoneWP: newProvider.phoneWP
        },
        name: newProvider.name.toUpperCase()
      }
      delete newP.CPName
      delete newP.emailCP
      delete newP.phoneCP
      delete newP.WPName
      delete newP.emailWP
      delete newP.phoneWP
      createProvider(newP)
      form.resetFields();
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form
        layout='vertical'
        onSubmit={this.onCreateProvider}
      >
        <Row gutter={10}>
          <Col xl={12}>
            <Form.Item label='Name'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    message: 'Provider name is required.',
                    required: true
                  },
                ],
              })(<Input placeholder='Provider name.' />)}
            </Form.Item>
            <Form.Item label='Contact person name'>
              {getFieldDecorator('CPName', {
                rules: [
                  {
                    message: 'Contact person name is missing.',
                    required: true
                  },
                ],
              })(<Input placeholder='Contact person name.' />)}
            </Form.Item>

            <Form.Item label='Contact Person email'>
              {getFieldDecorator('emailCP', {
                rules: [
                  {
                    message: 'Contact person Email is missing.',
                    required: true
                  },
                ],
              })(<Input placeholder='Contact person email.' />)}
            </Form.Item>
            <Form.Item label='Contact Person Phone'>
              {getFieldDecorator('phoneCP', {
                rules: [
                  {
                    message: 'Contact person phone number is missing.',
                    required: true
                  },
                ],
              })(<Input placeholder='Contact person number.' />)}
            </Form.Item>
            <Form.Item label='Hotline'>
              {getFieldDecorator('hotline', {
                rules: [
                  {
                    message: 'Please specify the hotline number.',
                    required: true
                  },
                ],
              })(<Input placeholder='Hotline.' />)}
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label='Address'>
              {getFieldDecorator('address', {
                rules: [
                  {
                    message: 'Address is required.',
                    required: true
                  },
                ],
              })(<Input placeholder='Address.' />)}
            </Form.Item>
            <Form.Item label='Warranty Person Name'>
              {getFieldDecorator('WPName', {
                rules: [
                  {
                    message: 'Warranty person name is missing.',
                    required: true
                  },
                ],
              })(<Input placeholder='Warranty person name.' />)}
            </Form.Item>

            <Form.Item label='Warranty Person email'>
              {getFieldDecorator('emailWP', {
                rules: [
                  {
                    message: 'Warranty person Email is missing.',
                    required: true
                  },
                ],
              })(<Input placeholder='Warranty person email.' />)}
            </Form.Item>

            <Form.Item label='Warranty Person Phone'>
              {getFieldDecorator('phoneWP', {
                rules: [
                  {
                    message: 'Warranty person phone number is missing.',
                    required: true
                  },
                ],
              })(<Input placeholder='Warranty person phone.' />)}
            </Form.Item>
            <Form.Item label='Note'>
              {getFieldDecorator('note')(<TextArea />)}
            </Form.Item>
          </Col>
        </Row>
        <Divider type='horizontal' style={{ margin: '10px 0 10px 0' }} />
        <div style={{ textAlign: 'right' }}>
          <Button type='primary' htmlType='submit' icon='save'>Create</Button>
        </div>
      </Form>
    )
  }
}

const PForm = Form.create({})(ProviderCreateForm);

export default PForm;
