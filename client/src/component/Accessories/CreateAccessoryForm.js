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

const { RangePicker } = DatePicker

class CreateAccessoryForm extends Component {
  state = {
    generalTypes: [],
    batches: [],
    equipmentTypes: [],
    warrantyMonths: 0,

  }

  componentDidMount() {
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
        accCodeList.map(code => {
          createAccessoryRequest({ ...newAcc, owner: ["None"], accCode: code })
        })
        :
        createAccessoryRequest({ ...newAcc, owner: ["None"] })
      form.resetFields();
    });
  };

  choseGenType = genTypeID => {
    axios.get(`http://localhost:9000/subTypes/${genTypeID}`)
      .then(res => {
        this.setState({
          equipmentTypes: res.data,
          genTypeId: genTypeID
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
    const { generalTypes, batches, equipmentTypes, providers, warrantyMonths, accCode } = this.state
    const { form, loading, isCloning } = this.props

    const { getFieldDecorator } = form
    return (
      <Form layout='vertical' onSubmit={this.onCreateAccessory}>
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
                  initialValue: isCloning ? '' : accCode,
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
                  })(<DatePicker placeholder="yyyy-mm-dd" format="YYYY-MM-DD" style={{ width: '100%' }} />)}
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
                    initialValue: 0
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
                  })(<RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} onChange={this.monthCal} />)}
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
        <Divider type='horizontal' />
        <div style={{ textAlign: 'right' }}>
          <Button type='primary' htmlType='submit' icon='save' loading={loading}>
            {isCloning ? 'Create and clone' : 'Create Accessory'}
          </Button>
        </div>
      </Form>
    )
  }
}
const AForm = Form.create({})(CreateAccessoryForm);

export default AForm;
