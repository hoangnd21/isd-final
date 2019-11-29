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
  Checkbox,
  Table
} from 'antd'

const { TextArea } = Input;
const { RangePicker } = DatePicker

class EquipmentHanding extends React.Component {
  state = {
    users: [],
    allAccessories: null,
    handingAccessories: null,
    loading: true
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
    const { handingAccessories } = this.state
    const { form, equipment, handingEquipment, updateEquipment } = this.props;
    form.validateFields((err, handingDetail) => {
      handingDetail.user = handingDetail.user.toString()
      if (err) {
        return;
      }
      const handing = { ...handingDetail, eqStatus: 'Use', device: equipment.code, handingDate: handingDetail.range[0], reclaimDate: handingDetail.range[1] }
      delete handing.range
      handingAccessories ? this.changeOwnerAccessory(handingAccessories, handingDetail.user) : console.log('no handing accessories')
      handingEquipment({ ...handing, accessories: handingAccessories, status: 'handing' })
      updateEquipment({ ...equipment, eqStatus: 'Use', owner: handingDetail.user })
      form.resetFields();
    });
  }

  changeOwnerAccessory = (accIDs, user) => {
    accIDs.map(accID =>
      axios.patch(`http://localhost:9000/accessories/updateAccessories/${accID}`, { owner: [user], accStatus: ["Use"] })
    )
  }


  accessoryToggle = e => {
    const { equipment } = this.props
    e.target.checked === true ?
      axios.get(`http://localhost:9000/search/accessories?subTypeAttached=${equipment.subtype}&owner=None&accStatus=Storage`)
        .then(res => {
          this.setState({
            allAccessories: res.data,
            loading: false
          })
        }) :
      this.setState({
        allAccessories: null,
        handingAccessories: null
      })
  }

  handAccessories = selectedRowKeys => {
    this.setState({
      handingAccessories: selectedRowKeys
    })
  }

  render() {
    const { allAccessories, loading } = this.state
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
                  initialValue: equipment.name
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
          <Divider type='horizontal' style={{ margin: '0 0 10px 0' }} />
          <Form.Item label='Accessories?'>
            <Checkbox onChange={this.accessoryToggle}>Hand accessories as well</Checkbox>
          </Form.Item>
          {allAccessories ?
            <Table
              loading={loading}
              dataSource={allAccessories}
              columns={[
                {
                  title: 'No.',
                  key: '0',
                  width: 20,
                  render: data => allAccessories.indexOf(data) + 1
                },
                {
                  title: 'Accessory Name',
                  dataIndex: 'accName',
                  key: '1',
                  width: 300
                },
                {
                  title: 'Accessory Code',
                  dataIndex: 'accCode',
                  key: '2',
                  width: 300
                },
              ]}
              rowKey={record => record._id}
              size='small'
              rowSelection={{
                onChange: selectedRowKeys => {
                  this.handAccessories(selectedRowKeys)
                }
              }}
              pagination={{
                pageSize: 50, size: 'small'
              }}
              scroll={{ y: 350 }}
            /> : null}
          <Divider type='horizontal' />
          <div style={{ textAlign: "right" }}>
            <Button
              type='primary'
              htmlType='submit'
            >
              {allAccessories ? 'Hand equipment and accessories' : 'Hand Equipment'}
            </Button>
          </div>
        </Form>
      </>
    );
  }
}


const HandingForm = Form.create({})(EquipmentHanding);

export default HandingForm;

