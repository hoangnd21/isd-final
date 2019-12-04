import React from 'react';
import moment from 'moment';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  DatePicker,
  Cascader,
  Table
} from 'antd'
import axios from 'axios';

const { TextArea } = Input;

class EquipmentReclaim extends React.Component {
  state = {
    users: [],
    defaultOwner: [],
    accessories: [],
    accessoriesToReclaim: null,
    loading: true
  }

  componentDidMount() {
    const { equipment } = this.props
    axios.get(`http://localhost:9000/reclaim/equipment/${equipment.code}`)
      .then(res => {
        console.log('equipment.code', res)
        res.data === 'fail' || res.data.accessories.length === 0 ?
          this.setState({
            accessories: 'No accessories were handing with this equipment.'
          }) :
          // eslint-disable-next-line
          res.data.accessories.map(a => {
            axios.get(`http://localhost:9000/accessories/${a}`)
              .then(res => {
                console.log(res)
                this.setState({
                  accessories: this.state.accessories.concat(res.data),
                  loading: false
                })
              })
          })
      })
  }

  choseAccessoriesReclaim = accs => {
    this.setState({
      accessoriesToReclaim: accs
    })
  }

  onReclaimEquipment = e => {
    e.preventDefault();
    const { accessoriesToReclaim } = this.state
    const { form, equipment, reclaimEquipment, updateEquipment } = this.props;
    form.validateFields((err, reclaimDetail) => {
      if (err) {
        return;
      }
      accessoriesToReclaim ? this.reclaimAccessories(accessoriesToReclaim) : console.log(null)
      reclaimEquipment({ ...reclaimDetail, status: 'reclaim', device: equipment.code })
      updateEquipment({ ...equipment, eqStatus: 'Storage', owner: 'None' })
      form.resetFields();
    });
  }

  reclaimAccessories = accessoriesToReclaim => {
    // eslint-disable-next-line
    accessoriesToReclaim.map(a => {
      axios.patch(`http://localhost:9000/accessories/updateAccessories/${a}`, { owner: ['None'], accStatus: ["Storage"] })
    })
  }

  render() {
    const { accessories, loading } = this.state
    const { form, equipment } = this.props;
    const { getFieldDecorator } = form;
    const reclaimReasonsOptions = [
      {
        value: 'Staff Leave',
        label: 'Staff Leave'
      },
      {
        value: 'Staff Pregnancy',
        label: 'Staff Pregnancy'
      },
      {
        value: 'Return from Borrow',
        label: 'Return from Borrow'
      }
    ]
    const reclaimDate = moment();
    return (
      <Form
        layout="vertical"
        onSubmit={this.onReclaimEquipment}
      >
        <Row gutter={12}>
          <Col xl={12}>
            <Form.Item label="Owner's Equipment">
              {getFieldDecorator('user', {
                rules: [
                  {
                    required: true,
                    message: 'user',
                  },
                ],
                initialValue: equipment.owner
              })(
                <Input
                  disabled
                />
              )}
            </Form.Item>
            <Form.Item label='Reclaim Reason(s)'>
              {getFieldDecorator('reason', {
                rules: [
                  {
                    required: true,
                    message: 'reason',
                  },
                ],
              })(
                <Cascader options={reclaimReasonsOptions} />
              )}
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label='Device in reclamation'>
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
            <Form.Item label='Reclaim Date'>
              {getFieldDecorator('reclaimDate', {
                rules: [
                  {
                    required: true,
                    message: 'reclaimDate',
                  },
                ],
                initialValue: reclaimDate
              })(
                <DatePicker style={{ width: '100%' }} />
              )}
            </Form.Item>
          </Col>
          <Col xl={24}>
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
        {accessories !== 'No accessories were handing with this equipment.' ?
          <Table
            loading={loading}
            dataSource={accessories}
            columns={[
              {
                title: 'No.',
                key: '0',
                width: 40,
                render: data => accessories.indexOf(data) + 1
              },
              {
                title: 'Name',
                dataIndex: 'accName',
                key: '1',
                width: 200,
              },
              {
                title: 'Code',
                dataIndex: 'accCode',
                key: '2',
                width: 300,
              },
            ]}
            rowKey={record => record.accCode}
            size='small'
            rowSelection={{
              onChange: selectedRowKeys => {
                this.choseAccessoriesReclaim(selectedRowKeys)
              }
            }}
            pagination={false}
            scroll={{ y: 350 }}
          /> : accessories}
        <Divider type='horizontal' />
        <div style={{ textAlign: "right" }}>
          <Button
            type='primary'
            htmlType='submit'
          >
            Reclaim Equipment
          </Button>
        </div>
      </Form>
    );
  }
}


const ReclaimForm = Form.create({})(EquipmentReclaim);

export default ReclaimForm;

