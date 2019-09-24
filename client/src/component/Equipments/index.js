import React from 'react';
import axios from 'axios';
import {
  Table,
  Tooltip,
  Button,
  Modal,
  Divider,
  Icon
} from 'antd';
import EquipmentForm from './EquipmentForm'
// axios.get('http://localhost:9000/equipments', {
//     params: {
//         id: equipment.id
//     }
// })
//     .then(function (res) {
//         console.log(res);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

export default class Equipments extends React.Component {
  state = {
    equipments: [],
    listLoading: true,
    equipmentModal: false,
    modalType: '',
    equipment: {}
  }
  componentDidMount() {
    axios.get('http://localhost:9000/equipments')
      .then(res => {
        this.setState({
          equipments: res.data,
          listLoading: false
        })
      })
  }
  addEquipmentModal = () => {
    this.setState({
      equipmentModal: true,
      modalType: 'create'
    })
  }

  hideEquipmentModal = () => {
    this.setState({
      equipmentModal: false
    })
  }

  editEquipment = data => {
    this.setState({
      equipment: data,
      modalType: 'update',
      equipmentModal: true
    })
  }

  render() {
    const { equipments, equipmentModal, modalType, equipment } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Codename',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status =>
          <div style={status === 'available' ? { color: 'green' } : { color: 'red' }}>
            {status}
          </div>
      },
      {
        title: 'Original Price ($)',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
        align: 'right'
      },
      {
        title: 'Warranty (months)',
        dataIndex: 'warranty',
        key: 'warranty',
        align: 'right'
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location'
      },
      {
        title: 'Actions',
        render: data =>
          <>
            <Tooltip title='Edit equipment' onClick={() => this.editEquipment(data)}><Icon type='edit' /></Tooltip>
            <Divider type='vertical' />
            <Tooltip title='Delete equipment' onClick={() => this.deleteEquipment(data)}><Icon type='delete' /></Tooltip>
          </>
      }

    ]
    return (
      <>
        <div style={{ marginBottom: 5, fontSize: 16 }}>
          Equipments List&nbsp;
            <Tooltip
            title='Add a new equipment'
            shape='circle'
          >
            <Button
              type='primary'
              shape='circle'
              icon='plus'
              onClick={this.addEquipmentModal}
            />
          </Tooltip>
        </div>
        <Table
          dataSource={equipments}
          columns={columns}
          size='small'
        />
        <Modal
          title={modalType === 'update' ? 'Update Equipment' : 'Create Equipment'}
          visible={equipmentModal}
          footer={null}
          onCancel={this.hideEquipmentModal}
          hideEquipmentModal={this.hideEquipmentModal}
          status={this.status}
          modalType={this.modalType}
          width={1000}
          centered
          bodyStyle={{ padding: 14 }}
        >
          <EquipmentForm
            equipment={equipment}
          />
        </Modal>
      </>
    )
  }
}