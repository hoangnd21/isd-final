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
  // Popconfirm
} from 'antd';
import EquipmentForm from './EquipmentForm'
import EquipmentInfo from './EquipmentInfo'
import EquipmentHanding from './EquipmentHanding';
import EquipmentReclaim from './EquipmentReclaim';

export default class Equipments extends React.PureComponent {

  state = {
    equipments: [],
    listLoading: true,
    equipmentModal: false,
    modalType: '',
    equipmentDetail: {},
    currentUser: null
  }

  componentDidMount() {
    axios({
      baseURL: '/login',
      method: 'get',
      headers: {
        "charset": "UTF-8",
        "accept": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then(res => {
        this.setState({
          currentUser: res.data
        })
      })
    axios.get('http://localhost:9000/equipments')
      .then(res => {
        this.setState({
          equipments: res.data,
          listLoading: false,
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  getAllEquipments = () => {
    axios.get('http://localhost:9000/equipments')
      .then(res => {
        this.setState({
          equipments: res.data,
          listLoading: false,
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  // create an equipment
  createEquipmentModal = () => {
    this.setState({
      equipmentModal: true,
      modalType: 'create'
    })
  }

  createEquipment = equipment => {
    axios.post('http://localhost:9000/equipments/addEquipment', equipment)
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
      })
      .catch(error => {
        console.log(error)
      });
  }

  // view
  infoModal = data => {
    this.setState({
      equipmentModal: true,
      modalType: 'view',
      equipmentDetail: data
    })
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
    axios.put(`http://localhost:9000/equipments/updateEquipment/${data._id}`, data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            equipmentModal: false,
            listLoading: true
          })

          this.state.modalType !== 'handing' ? notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}
            </span>

          }) : console.log('handed')

          this.getAllEquipments()
        }
      })
      .catch(error => {
        console.log(error)
      });
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

  //handing
  handingModal = data => {
    this.setState({
      equipmentDetail: data,
      modalType: 'handing',
      equipmentModal: true
    })
  }

  handingEquipment = data => {
    axios.post('http://localhost:9000/equipmentDistribution/addEquipmentDistribution', data)
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
        }
      })
      .catch(error => {
        console.log(error)
      });
  }
  // //reclaim

  reclaimModal = data => {
    this.setState({
      equipmentDetail: data,
      modalType: 'reclaim',
      equipmentModal: true
    })
  }
  reclaimEquipment = data => {
    axios.get(`http://localhost:9000/reclaim/${data.device}`).then(res => {
      axios.put(`http://localhost:9000/equipmentDistribution/updateEquipmentDistribution/${res.data._id}`, data)
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
          }
        })
    })
      .catch(error => {
        console.log(error)
      });
  }

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
    const { equipments, equipmentModal, modalType, equipmentDetail, listLoading } = this.state;
    // const { currentUser } = this.props
    const columns = [
      {
        title: <div>Name&nbsp; <Tooltip title='Click for equipment details'><Icon type='question-circle' /></Tooltip></div>,
        key: 'name',
        render: data =>
          <Button style={{ color: 'black', padding: 0, fontStyle: 'bold' }} type='link' onClick={() => this.infoModal(data)}>{data.name}</Button>
      },
      {
        title: 'Equipment Code',
        dataIndex: 'code',
        key: 'code',
        render: code => <span style={{ textAlign: 'justify' }}>{code}</span>
      },
      {
        title: 'Lock status',
        dataIndex: 'lockStatus',
        key: 'lockStatus',
        render: lockStatus =>
          <div style={lockStatus[0] === "Ready" ? { color: 'green' } : lockStatus[0] === 'Preparing' ? { color: '#f0cb65' } : { color: 'red' }}>
            {lockStatus}
          </div>
      },
      // {
      //   title: 'Start Date',
      //   dataIndex: 'startDate',
      //   key: 'startDate',
      //   render: startDate => `${startDate.slice(8, 10)}/${startDate.slice(5, 7)}/${startDate.slice(0, 4)}`
      // },
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
        title: 'Original Price',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
        align: 'right',
        render: originalPrice => `$${originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      },
      {
        title: 'Warranty (months)',
        dataIndex: 'warrantyMonths',
        key: 'warranty',
        align: 'right'
      },

      {
        title: 'Actions',
        align: 'center',
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
              icon={data.lockStatus[0] === 'Preparing' ? 'share-alt' : 'appstore'}
              onClick={data.lockStatus[0] !== 'Ready' ? () => this.reclaimModal(data) : () => this.handingModal(data)}
            >
              &nbsp;{data.lockStatus[0] !== 'Ready' ? 'Reclaim' : 'Handing'}
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
        <h2>Equipments List
          <span style={{ float: 'right' }}>
            <Button
              type='primary'
              icon='plus'
              onClick={this.createEquipmentModal}
            >
              Create a new Equipment
            </Button>
          </span>
        </h2>
        <Table
          dataSource={equipments}
          loading={listLoading}
          columns={columns}
          footer={null}
          pagination={{
            pageSize: 20
          }}
          rowKey={record => record._id}
        />
        <Modal
          title={
            modalType === 'update' ? 'Update Equipment' :
              modalType === 'create' ? 'Create Equipment' :
                modalType === 'reclaim' ? 'Reclaim Equipment' :
                  modalType === 'handing' ? 'Handing Equipment' :
                    'Equipment Information'
          }
          destroyOnClose
          visible={equipmentModal}
          footer={null}
          onCancel={this.hideEquipmentModal}
          lockStatus={this.lockStatus}
          modalType={this.modalType}
          width={1000}
          centered
          bodyStyle={{ padding: 20 }}
          equipment={equipmentDetail}
        >
          {
            modalType === 'create' || modalType === 'update' ?
              <EquipmentForm
                modalType={modalType}
                equipment={equipmentDetail}
                getAllEquipments={this.getAllEquipments}
                hideEquipmentModal={this.hideEquipmentModal}
                createEquipment={this.createEquipment}
                updateEquipment={this.updateEquipment}
                allEq={equipments}
              />
              :
              modalType === 'handing' ?
                <EquipmentHanding
                  equipment={equipmentDetail}
                  handingEquipment={this.handingEquipment}
                  updateEquipment={this.updateEquipment}
                />
                :
                modalType === 'view' ?
                  <EquipmentInfo
                    equipment={equipmentDetail}
                  />
                  :
                  modalType === 'reclaim' ?
                    <EquipmentReclaim
                      equipment={equipmentDetail}
                      reclaimEquipment={this.reclaimEquipment}
                      updateEquipment={this.updateEquipment}
                    />
                    : null
          }
        </Modal>
      </>
    )
  }
}