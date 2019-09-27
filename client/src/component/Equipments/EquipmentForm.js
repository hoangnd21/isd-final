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
  DatePicker,
  Cascader
} from 'antd';

const { TextArea } = Input;
class EquipmentForm extends React.PureComponent {

  onCreateEquipment = e => {
    e.preventDefault();
    const { form, equipment, createEquipment } = this.props;
    form.validateFields((err, newEquipment) => {
      if (err) {
        return;
      }
      console.log('newEquipment}', { ...equipment, ...newEquipment })
      createEquipment({ ...equipment, ...newEquipment })
      form.resetFields();
    });
  };

  onUpdateEquipment = e => {
    e.preventDefault();
    const { form, equipment, updateEquipment } = this.props;
    form.validateFields((err, updatingEquipment) => {
      if (err) {
        return;
      }
      console.log('updatingEquipment', { ...equipment, ...updatingEquipment })
      updateEquipment({ ...equipment, ...updatingEquipment })
      form.resetFields();
    });
  };


  render() {
    const { form, modalType, loading, equipment } = this.props;
    const { getFieldDecorator } = form;
    const statusOptions = [
      {
        value: 'ready',
        label: 'Ready',
      },
      {
        value: 'inUse',
        label: 'In Use',
      }
    ]
    const generalTypeOptions = [
      {
        value: 'generalType1',
        label: 'General Type 1'
      },
      {
        value: 'generalType2',
        label: 'General Type 2'
      },
      {
        value: 'generalType3',
        label: 'General Type 3'
      },
    ]
    const subtypeOptions = [
      {
        value: 'subtype1',
        label: 'Subtype 1'
      },
      {
        value: 'subtype2',
        label: 'Subtype 2'
      },
      {
        value: 'subtype3',
        label: 'Subtype 3'
      },
    ]
    const batchOptions = [
      {
        value: 'batch1',
        label: 'Batch 1'
      },
      {
        value: 'batch2',
        label: 'Batch 2'
      },
      {
        value: 'batch3',
        label: 'Batch 3'
      },

    ]
    return (
      <Form
        layout="vertical"
        onSubmit={modalType === 'update' ? this.updateEquipment : this.onCreateEquipment}
      >
        <Row gutter={4}>
          <Col xl={12}>
            <Col xl={12} style={{ padding: '0 2px 0 0' }}>
              <Form.Item label={
                <>
                  Equipment Code&nbsp;
                <span style={{ marginTop: 3 }}>
                    <Tooltip title='This field will be automatically generated as you fill in the form.'>
                      <Icon type='question-circle' />
                    </Tooltip>
                  </span>
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
                  // pending Code generating logic, will be disabled when done
                  />)}
              </Form.Item>
            </Col>
            <Col xl={12} style={{ padding: '0 0 0 2px' }}>
              <Form.Item label='Equipment status'>
                {getFieldDecorator('status', {
                  rules: [
                    {
                      required: true,
                      message: 'status',
                    },
                  ],
                  initialValue: equipment.status,
                })(<Cascader options={statusOptions} />)}
              </Form.Item>
            </Col>
            <Col xl={24} style={{ padding: 0 }}>

              <Form.Item label='General Type'>
                {getFieldDecorator('generalType', {
                  rules: [
                    {
                      required: true,
                      message: 'generalType',
                    },
                  ],
                  initialValue: equipment.generalType,
                })(<Cascader options={generalTypeOptions} placeholder="General Type" />)}
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
              <Col xl={12} style={{ padding: '0 2px 0 0' }}>
                <Form.Item label={
                  <>
                    Date of Deployment&nbsp;
                  <span style={{ marginTop: 3 }}>
                      <Tooltip title='The date on which the equipment was firstly used'>
                        <Icon type='question-circle' />
                      </Tooltip>
                    </span>
                  </>}
                >
                  {getFieldDecorator('startDate', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                    // initialValue: equipment.startDate,
                  })(
                    <DatePicker placeholder="dd/mm/yyyy" format='DD/MM/YYYY' style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ padding: '0 0 0 2px' }}>
                <Form.Item label={
                  <>
                    Date of Purchase&nbsp;
                  <span style={{ marginTop: 3 }}>
                      <Tooltip title='The date on which the equipment was purchased'>
                        <Icon type='question-circle' />
                      </Tooltip>
                    </span>
                  </>}
                >
                  {getFieldDecorator('datePurchase', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                    // initialValue: datePurchased,
                  })(
                    <DatePicker placeholder="dd/mm/yyyy" format='DD/MM/YYYY' style={{ width: '100%' }} />
                  )}
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
              </Col>
            </Col>
          </Col>
          <Col xl={12}>
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
              })(<Cascader options={batchOptions} placeholder="Equipment batch" />)}
            </Form.Item>
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
              })(<Cascader options={subtypeOptions} placeholder="Equipment type" />)}
            </Form.Item>
            <Form.Item label='Equipment Price ($)'
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

            <Form.Item label='Warranty (Months)'
            >
              {getFieldDecorator('warrantyMonths', {
                rules: [
                  {
                    required: true,
                    message: 'warrantyMonths',
                  },
                ],
                initialValue: equipment.warrantyMonths,
              })(<Input placeholder="Warranty" />)}
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