import React from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  notification,
  Icon
} from 'antd';
import EquipmentForm from './EquipmentForm'
import EquipmentInfo from './EquipmentInfo'

export default class Equipments extends React.PureComponent {
  state = {
    equipments: [],
    listLoading: true,
    equipmentModal: false,
    modalType: '',
    equipmentDetail: {}
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

  componentDidUpdate() {
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

  infoModal = data => {
    this.setState({
      equipmentModal: true,
      modalType: 'view',
      equipmentDetail: data
    })
    console.log(this.state.equipment)
  }

  updateEquipmentModal = data => {
    this.setState({
      equipmentDetail: data,
      modalType: 'update',
      equipmentModal: true
    })
  }

  hideEquipmentModal = () => {
    this.setState({
      equipmentModal: false,
      modalType: '',
      equipmentDetail: {}
    })
  }

  deleteEquipment = data => {
    axios.post(`http://localhost:9000/equipments/deleteEquipment/${data._id}`)
      .then(res => {
        if (res.status === 200) {
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}
            </span>
          });
        }
      }
        // GET again
      )
      .catch(function (error) {
        console.log(error)
      });
    // axios.get('http://localhost:9000/equipments')
    //   .then((response) => {
    //     this.setState({
    //       equipments: response.data,
    //       listLoading: true
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  createEquipmentData = data => {
    axios.post('http://localhost:9000/equipments/addEquipment', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({ equipmentModal: false })
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}
            </span>
          });
        }
      }
        //GET again
      )
  }

  render() {
    const { equipments, equipmentModal, modalType, equipmentDetail } = this.state;
    const columns = [
      {
        title: 'Name',
        key: 'name',
        render: data =>
          <Button type='link' onClick={() => this.infoModal(data)}>{data.name}</Button>
      },
      {
        title: 'dataCodename',
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
        title: 'startDate',
        dataIndex: 'startDate',
        key: 'startDate',
        render: startDate => `${startDate.slice(8, 10)}/${startDate.slice(5, 7)}/${startDate.slice(0, 4)}`
      },
      {
        title: 'datePurchase',
        dataIndex: 'datePurchase',
        key: 'datePurchase',
        render: datePurchase => `${datePurchase.slice(8, 10)}/${datePurchase.slice(5, 7)}/${datePurchase.slice(0, 4)}`
      },
      {
        title: 'Equipment Batch',
        dataIndex: 'batch',
        key: 'batch',
      },
      {
        title: 'Original Price ($)',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
        align: 'right'
      },
      {
        title: 'Warranty (months)',
        dataIndex: 'warrantyMonths',
        key: 'warranty',
        align: 'right'
      },

      {
        title: 'Actions',
        render: data =>
          <>
            <Button
              type='link'
              style={{ border: 0 }}
              icon='edit'
              onClick={() => this.updateEquipmentModal(data)}
            >
              &nbsp;Edit
              </Button>
            <Button
              type='link'
              style={{ border: 0 }}
              icon={data.status === 'in use' ? 'share-alt' : 'appstore'}
            >
              &nbsp;{data.status === 'in use' ? 'Reclaim' : 'Handing'}
            </Button>
            {/* <Popconfirm
              title='Are you sure to delete this equipment?'
              onConfirm={() => this.deleteEquipment(data)}
              placement="bottomRight"
            >
              <Button type='link' style={{ border: 0 }} icon='delete'>
                &nbsp;Delete
            </Button>
            </Popconfirm> */}
          </>
      }

    ]
    return (
      <>
        <div style={{ marginBottom: 5, fontSize: 18 }}>
          Equipments List
            <div style={{ float: 'right' }}>
            <Button
              type='primary'
              icon='plus'
              onClick={this.addEquipmentModal}
            >
              Add a new Equipment
            </Button>
          </div>
        </div>
        <Table
          dataSource={equipments}
          columns={columns}
        />
        <Modal
          title={modalType === 'update' ? 'Update Equipment' : modalType === 'view' ? null : 'Add Equipment'}
          destroyOnClose
          visible={equipmentModal}
          footer={null}
          onCancel={this.hideEquipmentModal}
          status={this.status}
          modalType={this.modalType}
          width={1000}
          centered
          bodyStyle={{ padding: 14 }}
          equipment={equipmentDetail}
          createEquipment={() => this.createEquipmentData}
        >
          {modalType === 'create' ?
            <EquipmentForm
              modalType={modalType}
              equipment={equipmentDetail}
              getAllEquipments={this.getAllEquipments}
              hideEquipmentModal={this.hideEquipmentModal}
              createEquipment={this.createEquipmentData}
            /> : modalType === 'view' ?
              <EquipmentInfo
                equipment={equipmentDetail}
              />
              :
              <EquipmentForm
                modalType={modalType}
                equipment={equipmentDetail}
                getAllEquipments={this.getAllEquipments}
                hideEquipmentModal={this.hideEquipmentModal}
                createEquipment={this.createEquipmentData}
              />}
        </Modal>
      </>
    )
  }
}