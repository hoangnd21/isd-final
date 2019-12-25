import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Form,
  DatePicker,
  Cascader,
  Row,
  Col,
  Input,
  Divider,
  Button
} from 'antd'

const { RangePicker } = DatePicker
const { TextArea } = Input

const AccessoryHanding = props => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9000/users')
      .then(res => {
        setUsers(res.data.map(u => {
          return ({
            value: u.username,
            label: u.username
          })
        }))
      })
  }, [])

  const onHandingAccessory = e => {
    e.preventDefault();
    const { form, accessory, handingAccessoryRequest } = props;
    form.validateFields((err, handingDetail) => {
      if (err) {
        return;
      }
      const handing = {
        ...handingDetail,
        accStatus: 'Use',
        device: accessory.accCode,
        handingDate: handingDetail.range[0],
        reclaimDate: handingDetail.range[1],
        user: handingDetail.user[0],
        status: 'handing'
      }
      delete handing.range
      handingAccessoryRequest(handing, { _id: accessory._id, accStatus: 'Use', owner: handing.user })
      form.resetFields();
    });
  }
  const { form, accessory } = props;
  const { getFieldDecorator } = form
  return (
    <Form
      layout="vertical"
      onSubmit={onHandingAccessory}>
      <Row gutter={10}>
        <Col xl={12}>
          <Form.Item label='Select owner'
          >
            {getFieldDecorator('user', {
              rules: [
                {
                  required: true,
                  message: 'Please specify.',
                },
              ],
            })(<Cascader options={users} showSearch />)}
          </Form.Item>
          <Form.Item label='Handing Duration'>
            {getFieldDecorator('range', {
              rules: [
                {
                  required: true,
                  message: 'Please specify.',
                },
              ],
            })(<RangePicker format="DD/MM/YYYY" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xl={12}>
          <Form.Item label='Accessory'>
            <h3>{accessory.accName} - {accessory.accCode}</h3>
          </Form.Item>
          <Form.Item label='Note'>
            {getFieldDecorator('note')(<TextArea />)}
          </Form.Item>
        </Col>
      </Row>
      <Divider type='horizontal' />
      <div style={{ textAlign: "right" }}>
        <Button
          icon='appstore'
          type='primary'
          htmlType='submit'
        >
          Hand Accessory
        </Button>
      </div>
    </Form>
  )
}
const AHForm = Form.create({})(AccessoryHanding);

export default AHForm; 