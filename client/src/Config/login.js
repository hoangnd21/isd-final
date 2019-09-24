import React from 'react'
import { Form, Icon, Input, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPage extends React.Component {
  state = {
    login: {},
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    const { form } = this.props;
    form.validateFields();
  }
  handleLogin = e => {
    const { onLoggedIn, form } = this.props
    e.preventDefault();
    form.validateFields((err, info) => {
      if (!err) {
        onLoggedIn(info);
        this.props.form.resetFields();
      }
      this.setState({
        login: info
      })
    });

  };

  render() {
    const { form, onLoggedIn, } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;


    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="vertical" onSubmit={this.handleLogin}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            initialValue: 'omega',
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" name="username" style={{ color: '#86bc26' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" name="password" style={{ color: '#86bc26' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <div style={{ textAlign: "right", }}>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} onClick={onLoggedIn} >
            <Icon type='login' /> Log in
          </Button>
        </div>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'horizontal_login' })(LoginPage);
export default LoginForm;