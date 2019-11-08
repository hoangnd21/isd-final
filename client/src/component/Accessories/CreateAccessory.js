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
  DatePicker
} from 'antd'
import axios from 'axios'
import { lockStatusOptions, eqStatusOptions } from '../../Config/options'

class CreateAccessory extends Component {
  state = {
    generalTypes: [],
    batches: [],
    equipmentTypes: []
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
  }

  onCreateAccessory = e => {
    e.preventDefault();
    const { form, createAccessoryRequest } = this.props;
    form.validateFields((err, newAccessory) => {
      if (err) {
        return;
      }
      createAccessoryRequest(newAccessory)
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
    const { generalTypes, batches, equipmentTypes, providers } = this.state
    const accCode = ['VN'].concat(this.codegen(12)).join('')
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <>
        <Form layout='vertical' onSubmit={this.createAccessory}>
          <Row gutter={10}>
            <Col xl={12}>
              <Col xl={12} style={{ padding: '0 5px 0 0' }}>
                <Form.Item label={<span>Accessory code <Tooltip title='Auto generate'><Icon type='question-circle' /></Tooltip></span>}>
                  {getFieldDecorator('accCode', {
                    rules: [
                      {
                        required: true,
                        message: 'accCode',
                      },
                    ],
                    initialValue: accCode,
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
                    })(<InputNumber style={{ width: '100%' }} placeholder="price" />)}
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
                          message: 'accName',
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
                <Col xl={12} style={{ paddingRight: 0 }}>
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
                <Col xl={8} style={{ padding: 0 }}>
                  <Form.Item label='Warranty starts on'
                  >
                    {getFieldDecorator('warrantyStartDate', {
                      rules: [
                        {
                          required: true,
                          message: 'warrantyStartDate',
                        },
                      ],
                    })(<DatePicker placeholder="yyyy-mm-dd" format="YYYY-MM-DD" style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col xl={8} style={{ padding: '0 5px 0 5px' }}>
                  <Form.Item label='Warranty duration'
                  >
                    {getFieldDecorator('warranty', {
                      rules: [
                        {
                          required: true,
                          message: 'warranty',
                        },
                      ],
                    })(<InputNumber style={{ width: '100%' }} placeholde='warranty' />)}
                  </Form.Item>
                </Col>
                <Col xl={8} style={{ padding: 0 }}>
                  <Form.Item label='Warranty ends on'
                  >
                    {getFieldDecorator('warrantyEndDate', {
                      rules: [
                        {
                          required: true,
                          message: 'warrantyEndDate',
                        },
                      ],
                    })(<DatePicker placeholder="yyyy-mm-dd" format="YYYY-MM-DD" style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
              </Col>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}
const AForm = Form.create({})(CreateAccessory);

export default AForm;
