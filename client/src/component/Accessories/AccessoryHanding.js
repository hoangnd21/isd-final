import React, { Component } from 'react'
import {
  Form,
  Row,
  Col,
  DatePicker,
  Cascader,
  Input,
  Divider,
  Button,
} from 'antd'
import axios from 'axios'

const { TextArea } = Input
const { RangePicker } = DatePicker

class AccessoryHanding extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get('http://localhost:9000/users')
      .then(res => {
        this.setState({
          users: res.data.map(u => {
            return ({
              value: u.username,
              label: u.username
            })
          })
        })
      })
  }

  onHandingAccessory = e => {
    e.preventDefault();
    const { form, accessory, handingEquipment, updateEquipment } = this.props;
    form.validateFields((err, handingDetail) => {
      handingDetail.user = handingDetail.user.toString()
      if (err) {
        return;
      }
      const handing = { ...handingDetail, eqStatus: 'Use', device: accessory.accCode, handingDate: handingDetail.range[0], reclaimDate: handingDetail.range[1] }
      delete handing.range
      handingEquipment({ ...handing })
      updateEquipment({ ...accessory, accStatus: 'Use', owner: handingDetail.user })
      form.resetFields();
    });
  }

  filter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  render() {
    const { users } = this.state
    const { form, accessory } = this.props
    const { getFieldDecorator } = form
    return (
      <>
        <Form
          layout="vertical"
          onSubmit={this.onHandingAccessory}
        >
          <Row gutter={12}>
            <Col xl={12}>
              <Form.Item label='Employee'>
                {getFieldDecorator('user', {
                  rules: [
                    {
                      required: true,
                      message: 'user',
                    },
                  ],
                })(
                  <Cascader options={users} showSearch={this.filter} />
                )}
              </Form.Item>

              <Form.Item label='Duration'>
                {getFieldDecorator('range', {
                  rules: [
                    {
                      required: true,
                      message: 'range',
                    },
                  ],
                })(
                  <RangePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Col>
            <Col xl={12}>

              <Form.Item label='Handing Device'>
                {getFieldDecorator('device', {
                  rules: [
                    {
                      required: true,
                      message: 'device',
                    },
                  ],
                  initialValue: accessory.accName
                })(
                  <Input disabled />
                )}
              </Form.Item>
              <Form.Item label='Note'>
                {getFieldDecorator('note', {
                  rules: [
                    {
                      message: 'note',
                    },
                  ],
                })(<TextArea />)}
              </Form.Item>

            </Col>
          </Row>
          <Divider type='vertical' />
          <div style={{ textAlign: "right" }}>
            <Button
              type='primary'
              htmlType='submit'
            >
              Hand Accessory
          </Button>
          </div>
        </Form>
      </>
    )
  }
}

const HandingForm = Form.create({})(AccessoryHanding);

export default HandingForm;
