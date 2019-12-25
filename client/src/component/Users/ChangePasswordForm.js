import React, { useState } from 'react'
import { Form, Button, Input, Row, Col } from 'antd'

function ChangePasswordForm(props) {
  const [error, setError] = useState('')
  const { getFieldDecorator } = props.form

  const changePassword = e => {
    e.preventDefault();
    const { form, changePasswordRequest } = props;
    form.validateFields((err, formData) => {
      if (err) {
        return
      } else if (formData.newPassword !== formData.confirmPassword) {
        setError('Password confirmation does not match!')
      } else {
        console.log(formData)
        form.resetFields();
        changePasswordRequest({ username: props.user.username, password: formData.password }, { password: formData.newPassword })
      }
    });
  };
  return (
    <Form
      layout='vertical'
      onSubmit={changePassword}>
      <Form.Item label='Current password'>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please type in your current password!',
            },
          ],
        })(<Input placeholder='Please type in your current password.' type='password' />)}
      </Form.Item>
      <Form.Item label='New password'>
        {getFieldDecorator('newPassword', {
          rules: [
            {
              required: true,
              min: 6,
            },
          ],
        })(<Input placeholder='Please type in your new password' type='password' />)}
      </Form.Item>
      <Form.Item label='Confirm new password'>
        {getFieldDecorator('confirmPassword', {
          rules: [
            {
              required: true,
              message: 'Please type in your new password again!',
            },
          ],
        })(<Input placeholder='Password confirmation' type='password' />)}
      </Form.Item>
      <Row>
        <Col xl={16} style={{ color: 'red' }}>
          {error}
        </Col>
        <Col xl={8} style={{ textAlign: 'right' }}>
          <Button type='primary' htmlType='submit'>Update Password</Button>
        </Col>
      </Row>
    </Form>
  )
}

const PForm = Form.create({})(ChangePasswordForm)
export default PForm