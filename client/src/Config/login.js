import React from 'react'
import { Form, Icon, Input, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPage extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    const { onLoggedIn } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onLoggedIn(values.username)
        this.props.form.resetFields();
      }
    });

  };

  render() {
    const { form, onLoggedIn } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: '#86bc26' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: '#86bc26' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button type="secondary" htmlType="submit" disabled={hasErrors(getFieldsError())} onClick={onLoggedIn}>
            <Icon type='login' /> Log in
          </Button>
        </div>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'horizontal_login' })(LoginPage);
export default LoginForm;