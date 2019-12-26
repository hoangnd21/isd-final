import React, { Component } from 'react'
import {
  Form,
  Input,
  Cascader,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Divider,
  Button
} from 'antd'

class CreateUserForm extends Component {

  onCreateUser = e => {
    e.preventDefault();
    const { form, createUser } = this.props;
    form.validateFields((err, newUser) => {
      if (err) {
        return;
      }
      createUser({ ...newUser, password: "1111", isActivated: true })
      form.resetFields();
    });
  };

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form
        layout='vertical'
        onSubmit={this.onCreateUser}
      >
        <Row gutter={10}>
          <Col xl={12}>
            <Form.Item label='Username'>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Username is required.',
                  },
                ],
              })(<Input placeholder='Username.' />)}
            </Form.Item>
            <Form.Item label='Fullname'>
              {getFieldDecorator('fullname', {
                rules: [
                  {
                    required: true,
                    message: 'Fullname is required.',
                  },
                ],
              })(<Input placeholder='Fullname.' />)}
            </Form.Item>

            <Col xl={12} style={{ padding: '0 5px 0 0' }}>
              <Form.Item label='Nationality'>
                {getFieldDecorator('nationality', {
                  rules: [
                    {
                      required: true,
                      message: 'Nationality is required.',
                    },
                  ],
                })(<Input placeholder='Nationality.' />)}
              </Form.Item>
              <Form.Item label='Code'>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: 'User code is required.',
                    },
                  ],
                })(<Input placeholder='Code.' />)}
              </Form.Item>
            </Col>
            <Col xl={12} style={{ paddingRight: 0 }}>
              <Form.Item label='Gender'>
                {getFieldDecorator('gender', {
                  rules: [
                    {
                      required: true,
                      message: 'Gender is required.',
                    },
                  ],
                })(<Cascader placeholder='Gender.' options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />)}
              </Form.Item>
              <Form.Item label='Function'>
                {getFieldDecorator('function', {
                  rules: [
                    {
                      required: true,
                      message: 'Function is required.',
                    },
                  ],
                })(<Input placeholder='Function.' />)}
              </Form.Item>
            </Col>
          </Col>
          <Col xl={12}>
            <Col xl={8} style={{ padding: '0 5px 0 0' }}>
              <Form.Item label='ID Card'>
                {getFieldDecorator('idCard', {
                  rules: [
                    {
                      required: true,
                      message: 'Please specify.',
                    },
                  ],
                })(<Input placeholder='ID Card.' />)}
              </Form.Item>
            </Col>
            <Col xl={8} style={{ padding: '0 5px 0 0' }}>
              <Form.Item label='Issued Date'>
                {getFieldDecorator('issuedDate', {
                  rules: [
                    {
                      required: true,
                      message: 'Please specify.',
                    },
                  ],
                })(<DatePicker format='MM/DD/YYYY' style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col xl={8} style={{ padding: 0 }}>
              <Form.Item label='Issued at'>
                {getFieldDecorator('issuedPlace', {
                  rules: [
                    {
                      required: true,
                      message: 'Please specify.',
                    },
                  ],
                })(<Input placeholder='ID Card Location.' />)}
              </Form.Item>
            </Col>
            <Col xl={24} style={{ padding: 0 }}>
              <Col xl={12} style={{ padding: '0 5px 0 0' }}>
                <Form.Item label='Date of Birth'>
                  {getFieldDecorator('DOB', {
                    rules: [
                      {
                        required: true,
                        message: 'Please specify.',
                      },
                    ],
                  })(<DatePicker format='MM/DD/YYYY' style={{ width: '100%' }} />)}
                </Form.Item>

                <Form.Item label='Level'>
                  {getFieldDecorator('level', {
                    rules: [
                      {
                        required: true,
                        message: 'Please specify.',
                      },
                    ],
                  })(<InputNumber min={1} max={4} placeholder='Level number.' style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label='Personal Email'>
                  {getFieldDecorator('personalEmail', {
                    rules: [
                      {
                        required: true,
                        message: 'Personal Email is required.',
                      },
                    ],
                  })(<Input placeholder='Personal Email.' />)}
                </Form.Item>
                <Form.Item label='Personal Mobile Phone'>
                  {getFieldDecorator('mobilePhone', {
                    rules: [
                      {
                        required: true,
                        message: 'Mobile phone number is required.',
                      },
                    ],
                  })(<Input placeholder='Personal Phone No.' />)}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ paddingRight: 0 }}>
                <Form.Item label='Marital status'>
                  {getFieldDecorator('maritalStatus', {
                    rules: [
                      {
                        required: true,
                        message: 'Marital status is required.',
                      },
                    ],
                  })(<Input placeholder='Marital status.' />)}
                </Form.Item>
                <Form.Item label='Rank'>
                  {getFieldDecorator('rank', {
                    rules: [
                      {
                        required: true,
                        message: 'Rank is required.',
                      },
                    ],
                  })(<Input placeholder='Rank.' />)}
                </Form.Item>
                <Form.Item label='Office Email'>
                  {getFieldDecorator('officeEmail', {
                    rules: [
                      {
                        required: true,
                        message: 'Office Email is required.',
                      },
                    ],
                  })(<Input placeholder='Office Email.' />)}
                </Form.Item>
                <Form.Item label='Office Phone'>
                  {getFieldDecorator('officePhone', {
                    rules: [
                      {
                        required: true,
                        message: 'Office phone number is required.',
                      },
                    ],
                  })(<Input placeholder='Office Phone No.' />)}
                </Form.Item>
              </Col>
            </Col>
          </Col>
        </Row>
        <Divider type='horizontal' />
        <div style={{ textAlign: 'right' }}>
          <Button type='primary' icon='save' htmlType='submit'>Create</Button>
        </div>
      </Form >
    )
  }
}
const UForm = Form.create({})(CreateUserForm);

export default UForm;