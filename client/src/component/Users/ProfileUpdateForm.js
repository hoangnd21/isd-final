import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Divider,
  Card,
  Button,
  Cascader,
  InputNumber
} from 'antd'
import moment from 'moment'

const DEFAULT_MEN_AVATAR = 'https://lh3.google.com/u/3/d/1AzqNSkJevyJMgSpilja43d_dOmhj6TiA=w1920-h583-iv1'
const DEFAULT_WOMEN_AVARTAR = 'https://lh3.google.com/u/3/d/1ICyotW2GHiRHi1dxXW1P_C9RDHJ8gTNK=w1920-h583-iv1'

function ProfileUpdateForm(props) {
  const [isFormChanged, setFormChange] = useState(false)
  const updateProfile = e => {
    const { user } = props
    e.preventDefault()
    const { form } = props;
    form.validateFields((err, updatingProfileInfo) => {
      if (err) {
        return;
      }
      if (updatingProfileInfo !== user) {
        setFormChange(true)
      }
      console.log(updatingProfileInfo)
      form.resetFields();
    });
  }
  const { user, form } = props
  const { getFieldDecorator } = form
  return (
    <Form
      layout='vertical'
      onSubmit={updateProfile}
    >
      <Button htmlType='submit' icon='plus' size='large' className='float' shape='circle' type='primary' />
      <Card
        bordered
        style={{ fontSize: 18, lineHeight: '2em' }}
        bodyStyle={{ padding: 16 }}
      >
        <Row gutter={10}>
          <Col xl={20} style={{ padding: 0 }}>
            <Col xl={12} style={{ padding: '0 10px 0 0', borderRight: '1.5px solid whitesmoke' }} >
              <h3>Personal information</h3>
              <Divider style={{ margin: '10px 0' }} type='horizontal' />
              <Col xl={9}>Fullname:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('fullname', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.fullname
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Date of Birth:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('DOB', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: moment(user.DOB)
                  })(<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Gender:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('DOB', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.gender
                  })(<Cascader options={[
                    { value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }
                  ]} />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Marital Status:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('maritalStatus', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.maritalStatus
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Nationality:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('nationality', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.nationality
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Phone:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('mobilePhone', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.mobilePhone
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Personal Email:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('personalEmail', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.personalEmail
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>ID Card No. :</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('idCard', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.idCard
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>ID Card Location:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('issuedPlace', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.issuedPlace
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>ID Card issued on:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('issuedDate', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: moment(user.issuedDate)
                  })(<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />)}
                </Col>
              </Form.Item>
            </Col>
            <Col xl={12} style={{ padding: '0 10px 0 10px', borderRight: '1.5px solid whitesmoke' }} >
              <h3>Office information</h3>
              <Divider style={{ margin: '10px 0' }} type='horizontal' />
              <Col xl={9}>Username:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.username
                  })(<Input disabled />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Employee Code:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.code
                  })(<Input disabled />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Employee Rank:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('rank', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.rank
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Employee Function:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('function', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.function
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Employee Level:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('level', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.level
                  })(<InputNumber min={1} max={4} style={{ width: '100%' }} />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Office Phone:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('officePhone', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.officePhone
                  })(<Input />)}
                </Col>
              </Form.Item>
              <Col xl={9}>Office Email:</Col>
              <Form.Item>
                <Col xl={15}>
                  {getFieldDecorator('officeMail', {
                    rules: [
                      {
                        required: true,
                      }
                    ],
                    initialValue: user.officeMail
                  })(<Input />)}
                </Col>
              </Form.Item>
            </Col>
          </Col>
          <Col xl={4} style={{ padding: '0 0 0 10px', verticalAlign: 'middle' }}>
            <h3>User avatar:</h3>
            <Divider style={{ margin: '10px 0' }} type='horizontal' />
            <img
              style={{ width: '100%' }}
              alt='#'
              src={user.gender === undefined ? null : user.image ?
                user.image :
                user.gender[0] === 'male' ?
                  DEFAULT_MEN_AVATAR :
                  DEFAULT_WOMEN_AVARTAR}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  )
}

const UForm = Form.create({})(ProfileUpdateForm);

export default UForm;