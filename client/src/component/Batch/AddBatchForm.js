import React, { Component } from 'react'
import {
  Form,
  Input,
  Row,
  Col
} from 'antd'

const { TextArea } = Input
class AddBatchForm extends Component {

  onAddBatch = e => {
    e.preventDefault();
    const { form, createBatch } = this.props;
    form.validateFields((err, newBatch) => {
      if (err) {
        return;
      }
      console.log(newBatch)
      // createBatch(newBatch)
      form.resetFields();
    });
  };
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <>
        <Form
          layout='vertical'
          onSubmit={this.onAddBatch}
        />
        <Row gutter={10}>
          <Col xl={12}>
            <Form.Item label='Batch Code'
            >
              {getFieldDecorator('code', {
                rules: [
                  {
                    message: 'code',
                  },
                ],
                // initialValue: equipment.note,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label='Date'
            >
              {getFieldDecorator('date', {
                rules: [
                  {
                    message: 'date',
                  },
                ],
                // initialValue: equipment.note,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
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
      </>
    )
  }
}

const BForm = Form.create({})(AddBatchForm);

export default BForm;