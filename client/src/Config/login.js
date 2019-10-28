import React from 'react';
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
      }
      this.setState({
        login: info
      })
      form.resetFields()
    });

  };

  render() {
    const { form, onLoggedIn, loginError, loading } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="vertical" onSubmit={this.handleLogin} loading={loading}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
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
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" name="password" style={{ color: '#86bc26' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <div style={{ color: 'red', marginBottom: 5 }}>
          {loginError}
        </div>
        <div style={{ textAlign: "right", }}>
          <div style={{ float: 'left' }}>
            <Button type='link' style={{ padding: 0 }}>Forgot your password?</Button>
          </div>
          <Button type="primary" icon='login' htmlType="submit" disabled={hasErrors(getFieldsError())} onClick={onLoggedIn} loading={loading}>
            <span style={{ color: 'white' }}>&nbsp;Log in</span>
          </Button>
        </div>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'horizontal_login' })(LoginPage);
export default LoginForm;