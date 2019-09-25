import React from 'react';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Icon,
  Divider,
  Tooltip,
  DatePicker
} from 'antd';

const { TextArea } = Input;
class EquipmentForm extends React.PureComponent {
  updateEquipment = e => {
    e.preventDefault();
    // eslint-disable-next-line
    const { form, equipment } = this.props;
    form.validateFields((err, updatingEquipment) => {
      if (err) {
        return;
      }

      // onSave({ ...equipment, ...newEquipment });
      form.resetFields();
    });
  };

  onCreateEquipment = e => {
    e.preventDefault();
    const { form, equipment, createEquipment } = this.props;
    form.validateFields((err, newEquipment) => {
      if (err) {
        return
      }
      createEquipment({ ...equipment, ...newEquipment })
      form.resetFields();
    });
  };

  render() {
    const { form, modalType, loading, equipment } = this.props;

    const { getFieldDecorator } = form;

    return (
      <Form
        layout="vertical"
        onSubmit={modalType === 'update' ? this.updateEquipment : this.onCreateEquipment}
      >
        <Row gutter={16}>
          <Col xl={12}>

            <Form.Item label='General Type'
            >
              {getFieldDecorator('generalType', {
                rules: [
                  {
                    required: true,
                    message: 'generalType',
                  },
                ],
                initialValue: equipment.generalType,
              })(<Input placeholder="General Type" />)}
            </Form.Item>

            <Form.Item label='Equipment Name'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Equipment name is required.',
                  },
                ],
                initialValue: equipment.name,
              })(<Input placeholder="Equipment name" />)}
            </Form.Item>
            <Col xl={8} style={{ padding: 0 }}>
              <Form.Item label='startDate'
              >
                {getFieldDecorator('startDate', {
                  rules: [
                    {
                      required: true,
                      message: 'startDate',
                    },
                  ],
                  // initialValue: equipment.startDate,
                })(<DatePicker placeholder="startDate" format='DD/MM/YYYY' />)}
              </Form.Item>
            </Col>
            <Col xl={8} style={{ padding: 0 }}>
              <Form.Item label='datePurchase'
              >
                {getFieldDecorator('datePurchase', {
                  rules: [
                    {
                      required: true,
                      message: 'datePurchase',
                    },
                  ],
                  // initialValue: equipment.datePurchase,
                })(<DatePicker placeholder="datePurchase" format='DD/MM/YYYY' />)}
              </Form.Item>
            </Col>
            <Col xl={8} style={{ padding: 0 }}>
              <Form.Item label='Equipment status'>
                {getFieldDecorator('status', {
                  rules: [
                    {
                      required: true,
                      message: 'status',
                    },
                  ],
                  initialValue: equipment.status,
                })(<Input placeholder="available or in use" />)}
              </Form.Item>
            </Col>
            <Col xl={24} style={{ padding: 0 }}>
              <Form.Item label='Manufacturer'
              >
                {getFieldDecorator('manufacturer', {
                  rules: [
                    {
                      required: true,
                      message: 'Manufacturer is required.',
                    },
                  ],
                  initialValue: equipment.manufacturer,
                })(<Input placeholder="Manufacturer" />)}
              </Form.Item>

              <Form.Item label={<>
                Equipment Code&nbsp;
                  <Tooltip title='This field will be automatically generated as you fill in the form.'>
                  <Icon type='question-circle' />
                </Tooltip>
              </>}
              >
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                  initialValue: equipment.code,
                })(
                  <Input
                    placeholder="Equipment code"
                  // disabled 
                  />)}
              </Form.Item>
            </Col>
          </Col>
          <Col xl={12}>

            <Form.Item label='Equipment Type'
            >
              {getFieldDecorator('subtype', {
                rules: [
                  {
                    required: true,
                    message: 'subtype',
                  },
                ],
                initialValue: equipment.subtype,
              })(<Input placeholder="Serial no." />)}
            </Form.Item>

            <Form.Item label='Equipment Batch'
            >
              {getFieldDecorator('batch', {
                rules: [
                  {
                    required: true,
                    message: 'batch'
                  },
                ],
                initialValue: equipment.batch,
              })(<Input placeholder="Equipment batch" />)}
            </Form.Item>

            <Form.Item label='Warranty'
            >
              {getFieldDecorator('warrantyMonths', {
                rules: [
                  {
                    required: true,
                    message: 'warrantyMonths',
                  },
                ],
                initialValue: equipment.warrantyMonths,
              })(<Input placeholder="Warranty (in months)" />)}
            </Form.Item>

            <Form.Item label='Equipment Price'
            >
              {getFieldDecorator('originalPrice', {
                rules: [
                  {
                    required: true,
                    message: 'originalPrice',
                  },
                ],
                initialValue: equipment.originalPrice,
              })(<Input placeholder="originalPrice" />)}
            </Form.Item>

            <Form.Item label='Note'
            >
              {getFieldDecorator('note', {
                rules: [
                  {
                    message: 'note',
                  },
                ],
                initialValue: equipment.note,
              })(<TextArea />)}
            </Form.Item>

          </Col>
        </Row>
        <Divider type="horizontal" />
        <div
          style={{ textAlign: 'right' }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            <Icon type="save" />
            {modalType === 'update' ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    );
  }
}
const EForm = Form.create({})(EquipmentForm);

export default EForm;