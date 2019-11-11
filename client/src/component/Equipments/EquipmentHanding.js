import React from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  DatePicker,
  Cascader,
} from 'antd'

const { TextArea } = Input;

class EquipmentHanding extends React.Component {
  state = {
    users: [],
  }

  componentDidMount() {
    axios.get('http://localhost:9000/users')
      .then(res => {
        this.setState({
          users: res.data,
        })
      })
  }

  filter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  onHandingEquipment = e => {
    e.preventDefault();
    const { form, equipment, handingEquipment, updateEquipment } = this.props;
    form.validateFields((err, handingDetail) => {
      handingDetail.user = handingDetail.user.toString()
      if (err) {
        return;
      }
      handingEquipment({ ...handingDetail, eqStatus: 'Use', device: equipment.code })
      updateEquipment({ ...equipment, eqStatus: 'Use', owner: handingDetail.user })
      form.resetFields();
    });
  }

  render() {
    const { form, equipment } = this.props;
    const { getFieldDecorator } = form;
    const userOptions = this.state.users.map(user =>
      ({
        value: user.username,
        label: user.username
      }))
    return (
      <>
        <Form
          layout="vertical"
          onSubmit={this.onHandingEquipment}
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
                  <Cascader options={userOptions} showSearch={this.filter} />
                )}
              </Form.Item>

              <Form.Item label='From Date'>
                {getFieldDecorator('handingDate', {
                  rules: [
                    {
                      required: true,
                      message: 'handingDate',
                    },
                  ],
                })(
                  <DatePicker style={{ width: '100%' }} />
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
                  initialValue: equipment.name
                })(
                  <Input disabled />
                )}
              </Form.Item>

              <Form.Item label='To Date'>
                {getFieldDecorator('reclaimDate', {
                  rules: [
                    {
                      required: true,
                      message: 'reclaimDate',
                    },
                  ],
                })(
                  <DatePicker style={{ width: '100%' }} />
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
              Hand Equipment
          </Button>
          </div>
        </Form>
      </>
    );
  }
}


const HandingForm = Form.create({})(EquipmentHanding);

export default HandingForm;

