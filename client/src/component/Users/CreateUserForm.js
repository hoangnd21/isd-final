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
      createUser(newUser)
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
                    message: 'username',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Full Name'>
              {getFieldDecorator('fullname', {
                rules: [
                  {
                    required: true,
                    message: 'fullname',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Col xl={12} style={{ padding: '0 5px 0 0' }}>
              <Form.Item label='Nationality'>
                {getFieldDecorator('nationality', {
                  rules: [
                    {
                      required: true,
                      message: 'nationality',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Code'>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: 'code',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xl={12} style={{ paddingRight: 0 }}>
              <Form.Item label='Gender'>
                {getFieldDecorator('gender', {
                  rules: [
                    {
                      required: true,
                      message: 'gender',
                    },
                  ],
                })(<Cascader options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />)}
              </Form.Item>
              <Form.Item label='Function'>
                {getFieldDecorator('function', {
                  rules: [
                    {
                      required: true,
                      message: 'function',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xl={12} style={{ paddingRight: 0 }}>


            </Col>
            <Col xl={24} style={{ padding: 0 }}>

              <Col xl={12} style={{ padding: '0 5px 0 0' }}>
                <Form.Item label='Mobile Phone'>
                  {getFieldDecorator('mobilePhone', {
                    rules: [
                      {
                        required: true,
                        message: 'mobilePhone',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ paddingRight: 0 }}>
                <Form.Item label='Office Phone'>
                  {getFieldDecorator('officePhone', {
                    rules: [
                      {
                        required: true,
                        message: 'officePhone',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={24} style={{ padding: 0 }}>

              </Col>
            </Col>
          </Col>
          <Col xl={12}>
            <Form.Item label='Password'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'password',
                  },
                ],
              })(<Input type='password' />)}
            </Form.Item>
            <Col xl={8} style={{ padding: '0 5px 0 0' }}>
              <Form.Item label='ID Card'>
                {getFieldDecorator('idCard', {
                  rules: [
                    {
                      required: true,
                      message: 'idCard',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xl={8} style={{ padding: '0 5px 0 0' }}>
              <Form.Item label='Issued Date'>
                {getFieldDecorator('issuedDate', {
                  rules: [
                    {
                      required: true,
                      message: 'issuedDate',
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
                      message: 'issuedPlace',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xl={24} style={{ padding: 0 }}>
              <Col xl={12} style={{ padding: '0 5px 0 0' }}>
                <Form.Item label='Date of Birth'>
                  {getFieldDecorator('DOB', {
                    rules: [
                      {
                        required: true,
                        message: 'DOB',
                      },
                    ],
                  })(<DatePicker format='MM/DD/YYYY' style={{ width: '100%' }} />)}
                </Form.Item>

                <Form.Item label='Level'>
                  {getFieldDecorator('level', {
                    rules: [
                      {
                        required: true,
                        message: 'level',
                      },
                    ],
                  })(<InputNumber min={1} max={4} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label='Personal Email'>
                  {getFieldDecorator('personalEmail', {
                    rules: [
                      {
                        required: true,
                        message: 'personalEmail',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ paddingRight: 0 }}>
                <Form.Item label='Marital status'>
                  {getFieldDecorator('maritalStatus', {
                    rules: [
                      {
                        required: true,
                        message: 'maritalStatus',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Rank'>
                  {getFieldDecorator('rank', {
                    rules: [
                      {
                        required: true,
                        message: 'rank',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Office Email'>
                  {getFieldDecorator('officeEmail', {
                    rules: [
                      {
                        required: true,
                        message: 'officeEmail',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Col>
          </Col>
          <Col xl={12} style={{ padding: '0 5px 0 0' }}>
            <Col xl={24} style={{ padding: 0 }}>
              <Col xl={12} style={{ paddingRight: 0 }}>




              </Col>
              <Col xl={24} style={{ padding: 0 }}>

              </Col>
            </Col>
          </Col>
        </Row >
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