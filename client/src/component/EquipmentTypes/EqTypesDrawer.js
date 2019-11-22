import React, { Component } from 'react';
import {
  List,
  Button,
  Modal,
  notification,
  Row,
  Col,
} from 'antd'
import axios from 'axios'
import EquipmentTypeForm from './EquipmentTypeForm'

export default class EqTypesDrawer extends Component {
  state = {
    equipmentTypesByID: [],
    visible: false,
    loading: true
  }
  componentDidMount() {
    const { generalType } = this.props
    axios.get(`http://localhost:9000/subTypes/${generalType.value}`)
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
    axios.post('http://localhost:9000/subTypes/addSubType', { ...equipmentType })
      .then(res => {
        if (res.status === 200) {
          notification.success({
            message: res.data
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
    const { generalType, currentUser } = this.props
    return (
      <>
        <Row gutter={10} style={{ width: 900 }}>
          <Col xl={12}>
            {/* <Search
              placeholder={`Search ${equipmentTypesByID.length} ${equipmentTypesByID.length > 1 ? 'entries' : 'entry'}....`}
              onSearch={value => console.log(value)}
              enterButton
            /> */}
          </Col>
          {currentUser.level > 3 ? <Col xl={12}>
            <div style={{ textAlign: 'right' }}>
              <Button type='primary' icon='plus' onClick={this.addEqTypeModal}>Add a new Equipment type into {generalType.label}</Button>
            </div>
          </Col> : null}
        </Row>
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
