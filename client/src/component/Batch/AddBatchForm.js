import React, { Component } from 'react'
import axios from 'axios';
import {
  Form,
  Input,
  Row,
  Col,
  Cascader,
  Divider,
  Button,
  DatePicker
} from 'antd'

const { TextArea } = Input
class AddBatchForm extends Component {
  state = {
    providers: []
  }

  componentDidMount() {
    axios.get('http://localhost:9000/providers')
      .then(res => {
        this.setState({
          providers: res.data.map(p => {
            return ({
              label: p.name,
              value: p.name,
              key: p._id
            })
          })
        })
      })

  }

  onAddBatch = e => {
    e.preventDefault();
    const { form, addBatch } = this.props;
    form.validateFields((err, newBatch) => {
      if (err) {
        return;
      }
      console.log(newBatch)
      addBatch(newBatch)
      form.resetFields();
    });
  };
  render() {
    const { providers } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <>
        <Form
          layout='vertical'
          onSubmit={this.onAddBatch}
        >

          <Row gutter={10}>
            <Col xl={12}>
              <Form.Item label='Batch Code'
              >
                {getFieldDecorator('code', {
                  rules: [
                    {
                      message: 'code',
                      required: true
                    },
                  ],
                  // initialValue: equipment.note,
                })(<Input />)}
              </Form.Item>

              <Form.Item label='Provider'
              >
                {getFieldDecorator('provider', {
                  rules: [
                    {
                      message: 'provider',
                      required: true
                    },
                  ],
                  // initialValue: equipment.note,
                })(<Cascader options={providers} style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col xl={12}>
              <Form.Item label='Date'>
                {getFieldDecorator('date', {
                  rules: [
                    {
                      required: true,
                      message: 'date'
                    },
                  ],
                })(
                  <DatePicker placeholder="yyyy-mm-dd" format="YYYY-MM-DD" style={{ width: '100%' }} />
                )}
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
                  // initialValue: equipment.note,
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Note'
              >
                {getFieldDecorator('note', {
                  rules: [
                    {
                      message: 'note',
                    },
                  ],
                  // initialValue: equipment.note,
                })(<TextArea />)}
              </Form.Item>
            </Col>
          </Row>

          <Divider type='horizontal' />
          <div style={{ textAlign: 'right' }}>
            <Button type='primary' icon='save' htmlType='submit'>
              Create
            </Button>
          </div>
        </Form>
      </>
    )
  }
}

const BForm = Form.create({})(AddBatchForm);

export default BForm;