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
} from 'antd'

const { TextArea } = Input;

class EquipmentReclaim extends React.Component {
  state = {
    users: [],
    defaultOwner: []
  }

  onReclaimEquipment = e => {
    e.preventDefault();
    const { form, equipment, reclaimEquipment, updateEquipment } = this.props;
    form.validateFields((err, reclaimDetail) => {
      reclaimDetail.user = reclaimDetail.user.toString()
      if (err) {
        return;
      }
      reclaimEquipment({ ...reclaimDetail, status: 'reclaim', device: equipment.code })
      updateEquipment({ ...equipment, eqStatus: 'Storage', owner: 'None' })
      form.resetFields();
    });
  }

  render() {
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
      <>
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
          {/* waiting for handing to have accessory data */}
          {/* <Table
            dataSource={allAccessories}
            columns={[
              {
                title: 'Accessory Name',
                dataIndex: 'accName',
                key: '1'
              },
              {
                title: 'Accessory Code',
                dataIndex: 'accCode',
                key: '2'
              },
            ]}
            rowKey={record => record._id}
            size='small'
            rowSelection={{
              onChange: selectedRowKeys => {
                this.reclaimAccessories(selectedRowKeys)
              }
            }}
          /> */}
          <Divider type='vertical' />
          <div style={{ textAlign: "right" }}>
            <Button
              type='primary'
              htmlType='submit'
            >
              Reclaim Equipment
          </Button>
          </div>
        </Form>
      </>
    );
  }
}


const ReclaimForm = Form.create({})(EquipmentReclaim);

export default ReclaimForm;

