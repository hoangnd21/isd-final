import React from 'react';
import moment from 'moment';
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
  Cascader,
  InputNumber,
} from 'antd';
import axios from 'axios';
import { lockStatusOptions, eqStatusOptions } from './options'



const { TextArea } = Input;
class EquipmentForm extends React.PureComponent {
  state = {
    generalTypes: [],
    equipmentTypes: [],
    currentValue: {},
    eqNamebyType: '',
    genTypeId: '',
    updateCaseSubtype: [],
  }

  componentDidMount() {
    const { equipment, modalType } = this.props
    axios.get(`http://localhost:9000/generalTypes`)
      .then(res => {
        this.setState({
          generalTypes: res.data
        })
      })
    axios.get(`http://localhost:9000/batch`)
      .then(res => {
        this.setState({
          batches: res.data
        })
      })

    if (modalType === 'update') {
      this.choseGenType(equipment.generalType)
      this.setState({
        updateCaseSubtype: equipment.subtype,
        eqNamebyType: equipment.name
      })
    }
  }

  choseGenType = genTypeID => {
    axios.get(`http://localhost:9000/subTypes/${genTypeID}`)
      .then(res => {
        this.setState({
          equipmentTypes: res.data,
          genTypeId: genTypeID
        })
      })
  }

  //codegen logic
  codegen = length => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  //end codegen logic

  //create
  onCreateEquipment = e => {
    e.preventDefault();
    const { form, equipment, createEquipment } = this.props;
    form.validateFields((err, newEquipment) => {
      if (err) {
        return;
      }
      createEquipment({ ...equipment, ...newEquipment })
      form.resetFields();
    });
  };

  //update
  onUpdateEquipment = e => {
    e.preventDefault();
    const { form, equipment, updateEquipment } = this.props;
    form.validateFields((err, updatingEquipment) => {
      if (err) {
        return;
      }
      updateEquipment({ ...equipment, ...updatingEquipment })
      form.resetFields();
    });
  };

  choseEquipmentType = eqType => {
    const { genTypeId } = this.state
    axios.get(`http://localhost:9000/subTypes/subType?genTypeId=${genTypeId}&value=${eqType}`)
      .then(res => {
        this.setState({
          eqNamebyType: res.data.label
        })
      })
  }

  render() {
    const { generalTypes, equipmentTypes, eqNamebyType, updateCaseSubtype, batches } = this.state;
    const { form, modalType, loading, equipment } = this.props;
    const startMoment = modalType === 'create' ? null : moment(equipment.startDate, "YYYY-MM-DD")
    const purchaseMoment = modalType === 'create' ? null : moment(equipment.datePurchase, "YYYY-MM-DD")
    const eqCodeF = ['VN'].concat(this.codegen(12)).join('')
    const batchOptions = batches && batches.map(batch => {
      return ({
        value: batch.code,
        label: batch.code
      })
    })
    const { getFieldDecorator } = form;
    return (
      <Form
        layout="vertical"
        onSubmit={modalType === 'update' ? this.onUpdateEquipment : this.onCreateEquipment}
      >
        <Row gutter={2}>
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
                  initialValue: modalType === 'update' ? equipment.code : eqCodeF,
                })(
                  <Input
                    disabled
                  />)}
              </Form.Item>
            </Col>
            <Col xl={12} style={{ padding: '0 0 0 2px' }}>
              <Form.Item label='Lock status'>
                {getFieldDecorator('lockStatus', {
                  rules: [
                    {
                      required: true,
                      message: 'status',
                    },
                  ],
                  initialValue: equipment.lockStatus,
                })(<Cascader options={lockStatusOptions} />)}
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
                  initialValue: modalType === 'update' ? equipment.generalType : null,
                })(
                  <Cascader options={generalTypes} placeholder="General Type" onChange={this.choseGenType} />
                )}
              </Form.Item>

              <Form.Item label='Equipment Name'>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Equipment name is required.',
                    },
                  ],
                  initialValue: eqNamebyType,
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
                    initialValue: startMoment,
                  })(
                    <DatePicker placeholder="yyyy-mm-dd" format="YYYY-MM-DD" style={{ width: '100%' }} />
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
                    initialValue: purchaseMoment,
                  })(
                    <DatePicker placeholder="yyyy-mm-dd" format="YYYY-MM-DD" style={{ width: '100%' }} />
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
            <Row gutter={4}>
              <Col xl={12} style={{ padding: '0 0 0 2px' }}>
                <Form.Item label='Equipment status'>
                  {getFieldDecorator('eqStatus', {
                    rules: [
                      {
                        required: true,
                        message: 'eqStatus',
                      },
                    ],
                    initialValue: equipment.eqStatus,
                  })(<Cascader options={eqStatusOptions} />)}
                </Form.Item>
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
              </Col>
            </Row>
            <Col xl={24}>
              <Form.Item label='Equipment Type'
              >
                {getFieldDecorator('subtype', {
                  rules: [
                    {
                      required: true,
                      message: 'subtype',
                    },
                  ],
                  initialValue: updateCaseSubtype
                })(
                  <Cascader
                    onChange={this.choseEquipmentType}
                    options={equipmentTypes}
                    placeholder={modalType === 'create' ? 'select General Type first' : null}
                  />
                )}
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
                })(<InputNumber style={{ width: '100%' }} placeholder="Original Price of the equipment" />)}
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
                })(<InputNumber style={{ width: '100%' }} placeholder="Warranty" />)}
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