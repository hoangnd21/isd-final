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
import moment from 'moment'

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
      addBatch(newBatch)
      form.resetFields();
    });
  };

  onUpdateBatch = e => {
    e.preventDefault();
    const { form, updateBatch, currentBatch } = this.props;
    form.validateFields((err, updatingBatch) => {
      if (err) {
        return;
      }
      console.log({ ...currentBatch, ...updatingBatch })
      updateBatch({ ...currentBatch, ...updatingBatch })
      form.resetFields();
    });
  }

  render() {
    const { providers } = this.state
    const { form, modalType, currentBatch } = this.props
    const { getFieldDecorator } = form
    const now = moment()
    const dateM = moment(currentBatch.date, "YYYY-MM-DD")
    return (
      <Form
        layout='vertical'
        onSubmit={modalType === 'create' ? this.onAddBatch : this.onUpdateBatch}
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
                initialValue: currentBatch.code
              })(<Input disabled={modalType === 'create' ? false : true} />)}
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
                initialValue: currentBatch.provider
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
                initialValue: modalType === 'update' ? dateM : now
              })(
                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
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
                initialValue: currentBatch.contactPerson
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xl={24}>
            <Form.Item label='Note'
            >
              {getFieldDecorator('note', {
                rules: [
                  {
                    message: 'note',
                  },
                ],
                initialValue: currentBatch.note
              })(<TextArea />)}
            </Form.Item>
          </Col>
        </Row>
        <Divider type='horizontal' style={{ margin: '10px 0 10px 0' }} />
        <div style={{ textAlign: 'right' }}>
          <Button type='primary' icon='save' htmlType='submit'>
            {modalType === 'create' ? 'Create' : 'Update'}
          </Button>
        </div>
      </Form>
    )
  }
}

const BForm = Form.create({})(AddBatchForm);

export default BForm;