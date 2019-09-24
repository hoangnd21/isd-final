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
import axios from 'axios';

const { TextArea } = Input;
class EquipmentUpdateForm extends React.PureComponent {
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

  createEquipment = e => {
    e.preventDefault();
    const { form, equipment } = this.props;
    form.validateFields((err, newEquipment) => {
      console.log('newEquipment', newEquipment)
      if (err) {
        return
      }

      axios.post('http://localhost:9000/equipments/addEquipment', { ...equipment, ...newEquipment })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
      form.resetFields();
    });
  };

  addEquipment = (equipment) => {
    axios.post('http://localhost:9000/equipments/addEquipment', { equipment })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { form, modalType, loading, equipment } = this.props;
    console.log('equipment', equipment)
    const { getFieldDecorator } = form;

    return (
      <Form
        layout="vertical"
        onSubmit={modalType === 'update' ? this.updateEquipment : this.createEquipment}
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
                initialValue: '',
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
                initialValue: '',
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
                  initialValue: '',
                })(<DatePicker placeholder="startDate" />)}
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
                  initialValue: '',
                })(<DatePicker placeholder="datePurchase" />)}
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
                  initialValue: '',
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
                  initialValue: '',
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
                  initialValue: '',
                })(<Input placeholder="Equipment code" />)}
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
                initialValue: '',
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
                initialValue: '',
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
                initialValue: '',
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
                initialValue: '',
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
                initialValue: '',
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
const EquipmentForm = Form.create({})(EquipmentUpdateForm);

export default EquipmentForm;