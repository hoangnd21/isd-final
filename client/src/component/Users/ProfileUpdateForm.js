import React from 'react'
import {
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Divider,
  Card
} from 'antd'
import moment from 'moment'

function ProfileUpdateForm(props) {
  const updateProfile = e => {
    e.preventDefault()
  }
  const { user, form } = props
  const { getFieldDecorator } = form
  return (
    <Form
      layout='vertical'
      onSubmit={updateProfile}
    >
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
            </Col>
            <Col xl={12} style={{ padding: '0 0 0 10px' }}>
              <h3>Office information</h3>
              <Divider style={{ margin: '0' }} type='horizontal' />
            </Col>
          </Col>
          <Col xl={4}>
            4
        </Col>
        </Row>
      </Card>
    </Form>
  )
}

const UForm = Form.create({})(ProfileUpdateForm);

export default UForm;