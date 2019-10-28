import React, { Component } from 'react';
import {
  List,
  Button,
  Modal,
  notification,
  Icon,
  Input,
  Row,
  Col,
  Divider
} from 'antd'
import axios from 'axios'
import EquipmentTypeForm from './EquipmentTypeForm'

const { Search } = Input
export default class EqTypesDrawer extends Component {
  state = {
    equipmentTypesByID: [],
    visible: false,
    loading: true
  }
  componentDidMount() {
    const { generalType } = this.props
    axios.get(`http://localhost:9000/subTypes/genTypeId/${generalType.value}`)
      .then(res => {
        this.setState({
          equipmentTypesByID: res.data,
          loading: false
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  addEqTypeModal = () => {
    this.setState({
      visible: true
    })
  }

  closeModal = () => {
    this.setState({
      visible: false
    })
  }

  getAllEquipmentTypes = () => {
    const { generalType } = this.props
    axios.get(`http://localhost:9000/subTypes/genTypeId/${generalType.value}`)
      .then(res => {
        this.setState({
          equipmentTypesByID: res.data,
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  addEquipmentType = equipmentType => {
    console.log('equipmentType', equipmentType)
    axios.post('http://localhost:9000/subTypes/addSubType', { ...equipmentType })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}
            </span>
          })
          this.setState({
            visible: false
          })
          this.getAllEquipmentTypes()
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    const { equipmentTypesByID, visible, loading } = this.state
    const { generalType } = this.props
    return (
      <>
        <Row gutter={10} style={{ width: 900 }}>
          <Col xl={12}>
            <Search
              placeholder={`Search ${equipmentTypesByID.length} ${equipmentTypesByID.length > 1 ? 'entries' : 'entry'}....`}
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
          <Col xl={12}>
            <div style={{ textAlign: 'right' }}>
              <Button type='primary' icon='plus' onClick={this.addEqTypeModal}>Add a new Equipment type into {generalType.label}</Button>
            </div>
          </Col>
        </Row>
        <Divider type='horizontal' />
        <List
          itemLayout='horizontal'
          dataSource={equipmentTypesByID}
          size='small'
          loading={loading}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.label}
                description={`Equipment type ID: ${item.value}`}
              />
            </List.Item>
          )}
        >
        </List>
        <Modal
          title='Add a new equipment type'
          visible={visible}
          destroyOnClose
          centered
          footer={null}
          onCancel={this.closeModal}
        >
          <EquipmentTypeForm generalTypeID={generalType.value} addEquipmentTypeRequest={this.addEquipmentType} />
        </Modal>
      </>
    )
  }
}
