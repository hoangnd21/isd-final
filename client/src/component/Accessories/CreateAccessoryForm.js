import React, { Component } from 'react'
import {
  Form,
  Input,
  Row,
  Col,
  Cascader,
  Tooltip,
  Icon,
  InputNumber,
  DatePicker,
  Divider,
  Button
} from 'antd'
import axios from 'axios'
import { lockStatusOptions, eqStatusOptions } from '../../Config/options'
import moment from 'moment'

const { RangePicker } = DatePicker

class CreateAccessoryForm extends Component {
  state = {
    generalTypes: [],
    batches: [],
    equipmentTypes: [],
    warrantyMonths: 0,
    updateCaseSubtype: []
  }

  componentDidMount() {
    const { accessory, modalType } = this.props
    axios.get(`http://localhost:9000/generalTypes`)
      .then(res => {
        this.setState({
          generalTypes: res.data
        })
      })
    axios.get(`http://localhost:9000/batch`)
      .then(res => {
        this.setState({
          batches: res.data.map(b => {
            return ({
              value: b.code,
              label: b.code
            })
          })
        })
      })
    axios.get(`http://localhost:9000/providers`)
      .then(res => {
        this.setState({
          providers: res.data.map(p => {
            return ({
              value: p.name,
              label: p.name
            })
          })
        })
      })
    this.setState({
      accCode: ['VN'].concat(this.codegen(12)).join('')
    })
    if (modalType === 'update') {
      this.choseGenType(accessory.genTypeAttached)
      this.setState({
        updateCaseSubtype: accessory.subTypeAttached,
        warrantyMonths: accessory.warranty
      })
    }
  }

  onCreateAccessory = e => {
    e.preventDefault();
    const { form, createAccessoryRequest, accCodeList, isCloning, cloningDone } = this.props;
    form.validateFields((err, newAccessory) => {
      if (err) {
        return;

      }
      const newAcc =
      {
        ...newAccessory,
        warrantyStartDate: newAccessory.warrantyRange[0],
        warrantyEndDate: newAccessory.warrantyRange[1],
      }
      delete newAcc.warrantyRange
      isCloning ?
        // eslint-disable-next-line
        accCodeList.map((code, index) => {
          createAccessoryRequest({ ...newAcc, owner: ["None"], accCode: code })
          if (index === accCodeList.length - 1) {
            cloningDone()
          }
        })
        :
        createAccessoryRequest({ ...newAcc, owner: ["None"] })
      form.resetFields();
    });
  };

  onUpDateAccessory = e => {
    e.preventDefault();
    const { form, updateAccessoryRequest, accessory
      //  accCodeList, isCloning, cloningDone 
    } = this.props;
    form.validateFields((err, updatingAccessory) => {
      if (err) {
        return;

      }
      const updatingAcc =
      {
        ...updatingAccessory,
        warrantyStartDate: updatingAccessory.warrantyRange[0],
        warrantyEndDate: updatingAccessory.warrantyRange[1],
      }
      delete updatingAcc.warrantyRange
      // console.log('updatingAcc', { ...accessory, ...updatingAcc })
      updateAccessoryRequest({ ...accessory, ...updatingAcc })
    });
  }

  choseGenType = genTypeID => {
    axios.get(`http://localhost:9000/subTypes/${genTypeID}`)
      .then(res => {
        this.setState({
          equipmentTypes: res.data,
        })
      })
  }

  monthCal = data => {
    this.setState({
      warrantyMonths: data[1].diff(data[0], 'months')
    })
  }

  codegen = length => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  render() {
    const { generalTypes, batches, equipmentTypes, providers, warrantyMonths, accCode, updateCaseSubtype } = this.state
    const { form, loading, isCloning, accessory, modalType } = this.props
    const { getFieldDecorator } = form
    return (
      <Form layout='vertical' onSubmit={modalType === 'create' ? this.onCreateAccessory : this.onUpDateAccessory}>
        <Row gutter={10}>
          <Col xl={12}>
            <Col xl={12} style={{ padding: '0 5px 0 0' }}>
              <Form.Item label={
                <span>Accessory code&nbsp;
                <Tooltip title={isCloning ? 'Auto populate' : 'Auto generate'}>
                    <Icon type='question-circle' />
                  </Tooltip>
                </span>}>
                {getFieldDecorator('accCode', {
                  rules: [
                    {
                      required: isCloning ? false : true,
                      message: 'accCode',
                    },
                  ],
                  initialValue: modalType === 'create' ? isCloning ? '' : accCode : accessory.accCode,
                })(<Input disabled />)}
              </Form.Item>
            </Col>
            <Col xl={12} style={{ padding: '0 0 0 5px' }}>
              <Form.Item label='Batch'
              >
                {getFieldDecorator('batch', {
                  rules: [
                    {
                      required: true,
                      message: 'batch',
                    },
                  ],
                  initialValue: modalType === 'create' ? null : accessory.batch
                })(<Cascader options={batches && batches} />)}
              </Form.Item>
            </Col>
            <Col xl={24} style={{ padding: 0 }}>
              <Col xl={12} style={{ paddingLeft: 0 }}>
                <Form.Item label='Accessory Name'
                >
                  {getFieldDecorator('accName', {
                    rules: [
                      {
                        required: true,
                        message: 'accName',
                      },
                    ],
                    initialValue: modalType === 'create' ? null : accessory.accName
                  })(<Input placeholder="accName" />)}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ paddingRight: 0 }}>
                <Form.Item label='Provider'
                >
                  {getFieldDecorator('provider', {
                    rules: [
                      {
                        required: true,
                        message: 'provider',
                      },
                    ],
                    initialValue: modalType === 'create' ? null : accessory.provider
                  })(<Cascader options={providers} />)}
                </Form.Item>
              </Col>


              <Col xl={12} style={{ paddingLeft: 0 }}>
                <Form.Item label='Purchased Date'
                >
                  {getFieldDecorator('purchaseDate', {
                    rules: [
                      {
                        required: true,
                        message: 'purchaseDate',
                      },
                    ],
                    initialValue: modalType === 'create' ? null : moment(accessory.purchaseDate, "YYYY-MM-DD")

                  })(<DatePicker format="MM/DD/YYYY" style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ paddingRight: 0 }}>
                <Form.Item label='Accessory Price'
                >
                  {getFieldDecorator('price', {
                    rules: [
                      {
                        required: true,
                        message: 'price',
                      },
                    ],
                    initialValue: modalType === 'create' ? null : accessory.price
                  })(
                    <InputNumber
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      style={{ width: '100%' }}
                      placeholder="price"
                      step={10}
                    />)}
                </Form.Item>
              </Col>
            </Col>
          </Col>
          <Col xl={12}>
            <Col xl={24} style={{ padding: 0 }}>
              <Col xl={12} style={{ paddingLeft: 0 }}>
                <Form.Item label='General type attached'
                >
                  {getFieldDecorator('genTypeAttached', {
                    rules: [
                      {
                        required: true,
                        message: 'genTypeAttached',
                      },
                    ],
                    initialValue: modalType === 'create' ? null : accessory.genTypeAttached
                  })(<Cascader options={generalTypes && generalTypes} onChange={this.choseGenType} />)}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ paddingRight: 0 }}>
                <Form.Item label='Equipment type attached'
                >
                  {getFieldDecorator('subTypeAttached', {
                    rules: [
                      {
                        required: true,
                        message: 'subTypeAttached',
                      },
                    ],
                    initialValue: updateCaseSubtype
                  })(<Cascader options={equipmentTypes && equipmentTypes} placeholder='subTypeAttached' />)}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ paddingLeft: 0 }}>
                <Form.Item label='Lock status'>
                  {getFieldDecorator('lockStatus', {
                    rules: [
                      {
                        required: true,
                        message: 'status',
                      },
                    ],
                    initialValue: modalType === 'create' ? null : accessory.lockStatus
                  })(<Cascader options={lockStatusOptions} />)}
                </Form.Item>
              </Col>
              <Col xl={12} style={{ paddingRight: 0 }}>
                <Form.Item label='Accessory status'>
                  {getFieldDecorator('accStatus', {
                    rules: [
                      {
                        required: true,
                        message: 'accStatus',
                      },
                    ],
                    initialValue: modalType === 'create' ? null : accessory.accStatus
                  })(<Cascader options={eqStatusOptions} />)}
                </Form.Item>

              </Col>
              <Col xl={16} style={{ padding: 0 }}>
                <Form.Item label='Warranty range'
                >
                  {getFieldDecorator('warrantyRange', {
                    rules: [
                      {
                        required: true,
                        message: 'warrantyRange',
                      },
                    ],
                    initialValue: modalType === 'create' ? null : [moment(accessory.warrantyStartDate, "YYYY-MM-DD"), moment(accessory.warrantyEndDate, "YYYY-MM-DD")]
                  })(<RangePicker format="DD/MM/YYYY" style={{ width: '100%' }} onChange={this.monthCal} />)}
                </Form.Item>
              </Col>
              <Col xl={8} style={{ paddingRight: 0 }}>
                <Form.Item label={<>Warranty duration <Tooltip title='Auto calculate'><Icon type='question-circle' /></Tooltip></>}
                >
                  {getFieldDecorator('warranty', {
                    rules: [
                      {
                        required: true,
                        message: 'warranty',
                      },
                    ],
                    initialValue: warrantyMonths
                  })(
                    <InputNumber
                      formatter={value => `${value} months`}
                      parser={value => value.replace('months', '')}
                      style={{ width: '100%' }}
                      placeholde='warranty'
                      disabled
                    />)}
                </Form.Item>
              </Col>
            </Col>
          </Col>
        </Row>
        <Divider type='horizontal' style={{ margin: '10px 0 10px 0' }} />
        <div style={{ textAlign: 'right' }}>
          <Button type='primary' htmlType='submit' icon='save' loading={loading}>
            {modalType === 'create' ? isCloning ? 'Create and clone' : 'Create Accessory' : 'Save'}
          </Button>
        </div>
      </Form>
    )
  }
}
const AForm = Form.create({})(CreateAccessoryForm);

export default AForm;
