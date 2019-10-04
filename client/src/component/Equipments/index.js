import React from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  notification,
  Icon,
  Tooltip,
  Divider,
  Popconfirm

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

  getAllEquipments = () => {
    axios.get('http://localhost:9000/equipments')
      .then(res => {
        this.setState({
          equipments: res.data,
          listLoading: false
        })
      })
  }

  // create an equipment
  createEquipmentModal = () => {
    this.setState({
      equipmentModal: true,
      modalType: 'create'
    })
  }

  createEquipment = data => {
    axios.post('http://localhost:9000/equipments/addEquipment', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            equipmentModal: false,
            listLoading: true
          })
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}
            </span>

          })
          this.getAllEquipments()
        }
      }
      )
  }

  // view
  infoModal = data => {
    this.setState({
      equipmentModal: true,
      modalType: 'view',
      equipmentDetail: data
    })
    console.log(this.state.equipment)
  }

  // update
  updateEquipmentModal = data => {
    this.setState({
      equipmentDetail: data,
      modalType: 'update',
      equipmentModal: true
    })
  }

  updateEquipment = data => {
    axios.post('http://localhost:9000/equipments/addEquipment', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            equipmentModal: false,
            listLoading: true
          })
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}
            </span>

          })
          this.getAllEquipments()
        }
      }
      )
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
          this.getAllEquipments()
        }
      }
      )
      .catch(function (error) {
        console.log(error)
      });
  }

  // //handing
  // handingEquip = (data, dataHanding) => {
  //   axios.get(`http://localhost:9000/equipments/${data._id}`) // search equip theo id trong bảng id (dữ liệu là data)
  //     .then(res => {
  //       if (res) {
  //         axios.get(`http://localhost:9000/user/${dataHanding.user}`) // nếu tìm thấy equip search tiếp xem user nhập vào có đúng ko (data lấy từ handingModal)
  //           .then(response => {
  //             if (response) {
  //               axios.post('http://localhost:9000/equipmentDistribution/addEquipmentDistribution', { //nếu tìm thấy user thì tạo 1 document mới bao gồm các thông tin bên dưới
  //                 handingDate: dataHanding.handingDate,
  //                 reclaimDate: dataHanding.reclaimDate,
  //                 device: res.code,
  //                 user: response.code,
  //                 status: dataHanding.status,
  //                 note: dataHanding.note
  //               })
  //             }
  //           }
  //           )
  //           .catch(function (error) {
  //             console.log(error)
  //           });
  //       }
  //     }
  //     )
  //     .catch(function (error) {
  //       console.log(error)
  //     });
  // }

  // //reclaim
  // reclaimEquip = (data, dataHanding) => {
  //   axios.get(`http://localhost:9000/equipments/${data._id}`) // search equip theo id trong bảng id (dữ liệu là data)
  //     .then(res => {
  //       if (res) {
  //         axios.get(`http://localhost:9000/equipmentDistribution/reclaim`) // nếu tìm thấy equip tìm document có chứ code của equip và status = handing
  //           .then(response => {
  //             if (response) {
  //               axios.post(`http://localhost:9000/equipmentDistribution/updateEquipmentDistribution/${response._id}`, { //nếu tìm thấy thì update document vs info dưới
  //                 handingDate: dataHanding.handingDate,
  //                 reclaimDate: dataHanding.reclaimDate,
  //                 device: res.code,
  //                 user: response.code,
  //                 status: dataHanding.status,
  //                 note: dataHanding.note
  //               })
  //             }
  //           }
  //           )
  //           .catch(function (error) {
  //             console.log(error)
  //           });
  //       }
  //     }
  //     )
  //     .catch(function (error) {
  //       console.log(error)
  //     });
  // }

  // // delete many
  // deleteManyEquipment = data => {
  //   axios.post(`http://localhost:9000/equipments/deleteEquipment/${data._id}`)
  //     .then()
  //     .catch(function (error) {
  //       console.log(error)
  //     });
  // }
  // batchDeleteEquipment = data => { // data là obj hoặc array bao gồm các id của equipment cần xóa
  //   const deleted = data.map(id => { this.deleteManyEquipment(id) })
  //   if (deleted === null) {
  //     this.getAllEquipments()
  //   }
  // }

  render() {
    const { equipments, equipmentModal, modalType, equipmentDetail } = this.state;
    const columns = [
      {
        title: <div>Name&nbsp; <Tooltip title='Click for equipment details'><Icon type='question-circle' /></Tooltip></div>,
        key: 'name',
        render: data =>
          <Button style={{ color: 'black', padding: 0 }} type='link' onClick={() => this.infoModal(data)}>{data.name}</Button>
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
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        render: startDate => `${startDate.slice(8, 10)}/${startDate.slice(5, 7)}/${startDate.slice(0, 4)}`
      },
      {
        title: 'Purchased Date',
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
              style={{ border: 0, padding: 10 }}
              icon='edit'
              onClick={() => this.updateEquipmentModal(data)}
            >
              &nbsp;Edit
              </Button>
            <Divider type='vertical' />
            <Button
              type='link'
              style={{ border: 0, padding: 10 }}

              icon={data.status === 'in use' ? 'share-alt' : 'appstore'}
            >
              &nbsp;{data.status === 'in use' ? 'Reclaim' : 'Handing'}
            </Button>
            <Popconfirm
              title='Are you sure to delete this equipment?'
              onConfirm={() => this.deleteEquipment(data)}
              placement="bottomRight"
            >
              <Button type='link' style={{ border: 0 }} icon='delete'>
                &nbsp;Delete
            </Button>
            </Popconfirm>
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
              onClick={this.createEquipmentModal}
            >
              Create a new Equipment
            </Button>
          </div>
        </div>
        <Table
          dataSource={equipments}
          columns={columns}
          footer={null}
        />
        <Modal
          title={modalType === 'update' ? 'Update Equipment' : modalType === 'view' ? null : 'Create Equipment'}
          destroyOnClose
          visible={equipmentModal}
          footer={null}
          onCancel={this.hideEquipmentModal}
          status={this.status}
          modalType={this.modalType}
          width={1000}
          centered
          bodyStyle={{ padding: 20 }}
          equipment={equipmentDetail}
        >
          {modalType === 'create' || modalType === 'update' ?
            <EquipmentForm
              modalType={modalType}
              equipment={equipmentDetail}
              getAllEquipments={this.getAllEquipments}
              hideEquipmentModal={this.hideEquipmentModal}
              createEquipment={this.createEquipment}
              updateEquipment={this.updateEquipment}
            /> :
            <EquipmentInfo
              equipment={equipmentDetail}
            />}
        </Modal>
      </>
    )
  }
}