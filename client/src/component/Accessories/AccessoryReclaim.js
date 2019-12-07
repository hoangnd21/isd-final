import React from 'react'
import {
  Form,
  Input,
  Row,
  Col,
  Divider,
  Button,
  Cascader,
  DatePicker
} from 'antd'
import moment from 'moment'
import { reclaimReasonsOptions } from '../../Config/options'

const { TextArea } = Input

const AccessoryReclaim = props => {
  const { form, accessory, reclaimAccessoryRequest } = props
  const { getFieldDecorator } = form
  const onReclaimAccessory = e => {
    e.preventDefault();
    form.validateFields((err, reclaimDetail) => {
      if (err) {
        return;
      }
      // console.log({ ...reclaimDetail, status: 'reclaim', device: accessory.accCode })
      // console.log({ _id: accessory._id, accStatus: 'Use', owner: ['None'] })
      reclaimAccessoryRequest(
        { ...reclaimDetail, status: 'reclaim', accessory: accessory.accCode },
        { _id: accessory._id, accStatus: 'Storage', owner: ['None'] }
      )
      form.resetFields();
    });
  }
  return (
    <Form
      layout='vertical'
      onSubmit={onReclaimAccessory}>
      <Row gutter={10}>
        <Col xl={12}>
          <Form.Item label='Owner'>
            {getFieldDecorator('user', {
              rules: [
                {
                  required: true,
                  message: 'Please specify.',
                },
              ],
              initialValue: accessory.owner
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label='Reclaim reason'>
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: 'Please specify.',
                },
              ],
              initialValue: accessory.owner
            })(<Cascader options={reclaimReasonsOptions} />)}
          </Form.Item>
        </Col>
        <Col xl={12}>
          <Form.Item label='Accessory in reclamation'>
            {getFieldDecorator('accessory', {
              rules: [
                {
                  required: true,
                  message: 'Please specify.',
                },
              ],
              initialValue: accessory.accName
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label='Reclaim Date'>
            {getFieldDecorator('reclaimDate', {
              rules: [
                {
                  required: true,
                  message: 'Please specify.',
                },
              ],
              initialValue: moment()
            })(<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xl={24}>
          <Form.Item label='Note'>
            {getFieldDecorator('note')(<TextArea />)}
          </Form.Item>
        </Col>
        <Divider type='horizontal' />
        <div style={{ textAlign: 'right' }}>
          <Button icon='share-alt' type='primary' htmlType='submit'>
            Reclaim
          </Button>
        </div>
      </Row>
    </Form>
  )
}

const ARForm = Form.create({})(AccessoryReclaim);
export default ARForm; 
