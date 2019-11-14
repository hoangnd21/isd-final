import React, { Component } from 'react'
import axios from 'axios'
import {
  Form,
  Input,
  Cascader,
  Row,
  Col,
  Divider,
  Button,
} from 'antd'


const { TextArea } = Input
class ProviderCreateForm extends Component {
  state = {
    usersCP: [],
    usersWP: []
  }
  componentDidMount() {
    axios.get(`http://localhost:9000/users`)
      .then(res => {
        this.setState({
          usersCP: res.data.map(data => {
            return ({
              label: data.fullname,
              value: {
                CPName: data.fullname,
                emailCP: data.personalEmail,
                phoneCP: data.mobilePhone
              }
            })
          }),
          usersWP: res.data.map(data => {
            return ({
              label: data.fullname,
              value: {
                WPName: data.fullname,
                emailWP: data.personalEmail,
                phoneWP: data.mobilePhone
              }
            })
          })
        })
      })
  }

  onCreateProvider = e => {
    e.preventDefault();
    const { form, createProvider } = this.props;
    form.validateFields((err, newProvider) => {
      if (err) {
        return;
      }
      createProvider({ ...newProvider, contactPerson: newProvider.contactPerson[0], warrantyPerson: newProvider.warrantyPerson[0] })
      form.resetFields();
    });
  };

  render() {
    const { usersCP, usersWP } = this.state;
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
            <Form.Item label='Contact Person'
            >
              {getFieldDecorator('contactPerson', {
                rules: [
                  {
                    message: 'contactPerson',
                    required: true
                  },
                ],
                // initialValue:,
              })(<Cascader options={usersCP} style={{ width: '100%' }} />)}
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
                // initialValue:,
              })(<Input />)}
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
                // initialValue:,
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Warranty Person'
            >
              {getFieldDecorator('warrantyPerson', {
                rules: [
                  {
                    message: 'warrantyPerson',
                    required: true
                  },
                ],
                // initialValue:,
              })(<Cascader options={usersWP} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label='Note'
            >
              {getFieldDecorator('note', {
                rules: [
                  {
                    message: 'note',
                  },
                ],
                // initialValue:,
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
