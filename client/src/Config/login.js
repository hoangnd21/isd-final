import React from 'react'
import { Form, Icon, Input, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPage extends React.Component {
  state = {
    login: {},
    errorlogin: 'wrong password'
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleLogin = e => {
    const { onLoggedIn } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, info) => {
      if (!err) {
        onLoggedIn(info)
        this.props.form.resetFields();
      }
      this.setState({
        login: info
      })
      console.log(info)
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
            initialValue: 'testUser',
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
              prefix={<Icon type="lock" style={{ color: '#86bc26' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <div>

          {/* authen simulator */}
          {/* {this.state.login.password === '1111' ? '' : errorlogin} */}
        </div>
        <div style={{ textAlign: "right", }}>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} onClick={onLoggedIn} >
            <Icon type='login' /> Log in
          </Button>
        </div>
      </Form >
    );
  }
}




const LoginForm = Form.create({ name: 'horizontal_login' })(LoginPage);
export default LoginForm;