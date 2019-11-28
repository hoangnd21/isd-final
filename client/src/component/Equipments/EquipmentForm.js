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
import { lockStatusOptions, eqStatusOptions } from '../../Config/options'



const { TextArea } = Input;
class EquipmentForm extends React.PureComponent {
  state = {
    generalTypes: [],
    equipmentTypes: [],
    currentValue: {},
    eqNamebyType: '',
    genTypeId: '',
    updateCaseSubtype: [],
    startValue: null,
    endValue: null,
    endOpen: false,
  }

  componentDidMount() {
    const { equipment, modalType } = this.props
    axios.get(`http://localhost:9000/generalTypes`)
      .then(res => {
        this.setState({
          generalTypes: res.data
        })
      })
    this.setState({
      eqCodeF: ['VN'].concat(this.codegen(12)).join('')

    })
    axios.get(`http://localhost:9000/batch`)
      .then(res => {
        this.setState({
          batches: res.data.map(batch => {
            return ({
              value: batch.code,
              label: batch.code
            })
          })
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

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

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
    const { form, equipment, createEquipment, codeList, isCloning, cloningDone } = this.props;
    form.validateFields((err, newEquipment) => {
      if (err) {
        return;
      }
      isCloning ?
        // eslint-disable-next-line
        codeList.map((code, index) => {
          createEquipment({ ...equipment, ...newEquipment, owner: ["None"], code: code })
          if (index === codeList.length - 1) {
            cloningDone()
          }
        }) :
        createEquipment({ ...equipment, ...newEquipment, owner: ["None"] })
      form.resetFields();
      return;
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
        if (this.props.modalType === 'create') {
          this.setState({
            eqNamebyType: res.data.label
          })
        }
      })
  }

  render() {
    const { generalTypes, equipmentTypes, eqNamebyType, updateCaseSubtype, batches, eqCodeF, endOpen } = this.state;
    const { form, modalType, loading, equipment, isCloning } = this.props;
    const startMoment = modalType === 'create' ? null : moment(equipment.startDate, "YYYY-MM-DD")
    const purchaseMoment = modalType === 'create' ? null : moment(equipment.datePurchase, "YYYY-MM-DD")
    const { getFieldDecorator } = form;
    return (
      <Form
        layout="vertical"
        onSubmit={modalType === 'update' ? this.onUpdateEquipment : this.onCreateEquipment}
      >
        <Row gutter={2}>
          <Col xl={12}>
            <Col xl={12} style={{ padding: '0 2px 0 0' }}>
              {isCloning ?
                <Form.Item label={
                  <>
                    Equipment Code&nbsp;
                <span style={{ marginTop: 3 }}>
                      <Tooltip title='The codes will be applied to each equipment with provided information.'>
                        <Icon type='question-circle' />
                      </Tooltip>
                    </span>
                  </>}
                >

                  <Input disabled />
                </Form.Item> :
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
                    <Input disabled />)}
                </Form.Item>}
            </Col>
            <Col xl={12} style={{ padding: '0 0 0 2px' }}>
              <Form.Item label='Lock status'>
                {getFieldDecorator('lockStatus', {
                  rules: [
                    {
                      required: true,
                      message: 'Please choose one lock status.',
                    },
                  ],
                  initialValue: equipment.lockStatus,
                })(<Cascader options={lockStatusOptions} />)}
              </Form.Item>
            </Col>
            <Col xl={24} style={{ padding: 0 }}>
              <Col xl={12} style={{ padding: '0 5px 0 0' }}>
                <Form.Item label='General Type'>
                  {getFieldDecorator('generalType', {
                    rules: [
                      {
                        required: true,
                        message: 'General type is required.',
                      },
                    ],
                    initialValue: modalType === 'update' ? equipment.generalType : null,
                  })(
                    <Cascader options={generalTypes} placeholder="General Type" onChange={this.choseGenType} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ padding: 0 }}>
                <Form.Item label='Equipment Type'
                >
                  {getFieldDecorator('subtype', {
                    rules: [
                      {
                        required: true,
                        message: 'Equipment type is required.',
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
              </Col>
              <Col xl={24} style={{ padding: 0 }}>
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
              </Col>
              <Col xl={12} style={{ padding: '0 2px 0 0' }}>
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
                        message: 'Please specify.'
                      },
                    ],
                    initialValue: purchaseMoment,
                  })(
                    <DatePicker
                      format='MM/DD/YYYY'
                      style={{ width: '100%' }}
                      disabledDate={this.disabledStartDate}
                      onChange={this.onStartChange}
                      onOpenChange={this.handleStartOpenChange}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ padding: '0 0 0 2px' }}>
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
                        message: 'Please specify.'
                      },
                    ],
                    initialValue: startMoment,
                  })(
                    <DatePicker
                      disabledDate={this.disabledEndDate}
                      format="MM/DD/YYYY"
                      style={{ width: '100%' }}
                      onChange={this.onEndChange}
                      open={endOpen}
                      onOpenChange={this.handleEndOpenChange}
                    />
                  )}
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
                        message: 'Please choose one equipment status.',
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
                        message: 'Please provide batch code.'
                      },
                    ],
                    initialValue: equipment.batch,
                  })(<Cascader options={batches} placeholder="Equipment batch" />)}
                </Form.Item>
              </Col>
            </Row>
            <Col xl={24}>
              <Form.Item label='Equipment Price ($)'>
                {getFieldDecorator('originalPrice', {
                  rules: [
                    {
                      required: true,
                      message: 'Price is required.',
                    },
                  ],
                  initialValue: modalType === 'update' ? equipment.originalPrice : 0,
                })(
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                    placeholder="Original Price of the equipment" />)}
              </Form.Item>

              <Form.Item label='Warranty'
              >
                {getFieldDecorator('warrantyMonths', {
                  rules: [
                    {
                      required: true,
                      message: 'Please specify.',
                    },
                  ],
                  initialValue: equipment.warrantyMonths,
                })(<InputNumber
                  style={{ width: '100%' }}
                  placeholder="Warranty" />)}
              </Form.Item>
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
          <Col xl={24}>
            <Form.Item label='Note'>
              {getFieldDecorator('note', { initialValue: equipment.note })(<TextArea />)}
            </Form.Item>
          </Col>
        </Row>
        <Divider type="horizontal" style={{ margin: '10px 0 10px 0' }} />
        <div
          style={{ textAlign: 'right' }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            <Icon type="save" />
            {modalType === 'update' ? 'Update' : isCloning ? 'Create and clone' : 'Create'}
          </Button>
        </div>
      </Form>
    );
  }
}
const EForm = Form.create({})(EquipmentForm);

export default EForm;