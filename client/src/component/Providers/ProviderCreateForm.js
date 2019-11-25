import React, { Component } from 'react'
import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Button,
  InputNumber,
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
            <Form.Item label='Name'
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    message: 'name',
                    required: true
                  },
                ],
                // initialValue: ,
              })(<Input />)}
            </Form.Item>


            <Form.Item label='Contact Person name'
            >
              {getFieldDecorator('CPName', {
                rules: [
                  {
                    message: 'CPName',
                    required: true
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label='Contact Person email'
            >
              {getFieldDecorator('emailCP', {
                rules: [
                  {
                    message: 'emailCP',
                    required: true
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label='Contact Person Phone'
            >
              {getFieldDecorator('phoneCP', {
                rules: [
                  {
                    message: 'phoneCP',
                    required: true
                  },
                ],
              })(<InputNumber style={{ width: '100%' }} />)}
            </Form.Item>


            <Form.Item label='Hotline'
            >
              {getFieldDecorator('hotline', {
                rules: [
                  {
                    message: 'hotline',
                    required: true
                  },
                ],
              })(<InputNumber style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label='Address'
            >
              {getFieldDecorator('address', {
                rules: [
                  {
                    message: 'address',
                    required: true
                  },
                ],
              })(<Input />)}
            </Form.Item>


            <Form.Item label='Warranty Person Name'
            >
              {getFieldDecorator('WPName', {
                rules: [
                  {
                    message: 'WPName',
                    required: true
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label='Warranty Person email'
            >
              {getFieldDecorator('emailWP', {
                rules: [
                  {
                    message: 'emailWP',
                    required: true
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label='Warranty Person Phone'
            >
              {getFieldDecorator('phoneWP', {
                rules: [
                  {
                    message: 'phoneWP',
                    required: true
                  },
                ],
              })(<InputNumber style={{ width: '100%' }} />)}
            </Form.Item>


            <Form.Item label='Note'
            >
              {getFieldDecorator('note', {
                rules: [
                  {
                    message: 'note',
                  },
                ],
              })(<TextArea />)}
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
