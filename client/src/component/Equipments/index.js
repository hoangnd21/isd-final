import React from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  notification,
  Icon,
  Divider,
  Popconfirm,
  Input,
  Tooltip,
  message,
  Upload
} from 'antd';
import EquipmentForm from './EquipmentForm'
import EquipmentInfo from './EquipmentInfo'
import EquipmentHanding from './EquipmentHanding';
import EquipmentReclaim from './EquipmentReclaim';
import Highlighter from 'react-highlight-words';

export default class Equipments extends React.PureComponent {

  state = {
    equipments: [],
    listLoading: true,
    equipmentModal: false,
    modalType: '',
    equipmentDetail: {},
    currentUser: null,
    searchText: '',
    cloneStep: false
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

  uploadSuccess = () => {
    this.setState({
      equipmentModal: true,
      cloneStep: true
    })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { equipments, equipmentModal, modalType, equipmentDetail, listLoading, currentUser, cloneStep } = this.state;
    const props = {
      name: 'file',
      action: 'http://localhost:9000/upload/importExcel',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const columns = [
      {
        title: 'Equipment Name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        render: data =>
          <Button style={{ color: 'black', padding: 0, fontStyle: 'bold' }} type='link' onClick={() => this.infoModal(data)}>{data.name}</Button>
      },
      {
        title: 'Equipment Code',
        dataIndex: 'code',
        key: 'code',
        ...this.getColumnSearchProps('code'),
      },
      {
        title: 'Lock status',
        dataIndex: 'lockStatus',
        key: 'lockStatus',
        sorter: (a, b) => a.lockStatus[0].length - b.lockStatus[0].length,
        render: lockStatus =>
          <div style={lockStatus[0] === "Ready" ? { color: 'green' } : { color: 'red' }}>
            {lockStatus}
          </div>
      },
      {
        title: 'Equipment status',
        dataIndex: 'eqStatus',
        key: 'eqStatus',
        width: 180,
        ...this.getColumnSearchProps('eqStatus'),
      },
      {
        title: 'Purchased Date',
        dataIndex: 'datePurchase',
        key: 'datePurchase',
        width: 180,
        render: datePurchase => `${datePurchase.slice(8, 10)}/${datePurchase.slice(5, 7)}/${datePurchase.slice(0, 4)}`
      },
      {
        title: 'Equipment Batch',
        dataIndex: 'batch',
        width: 180,
        key: 'batch',
        ...this.getColumnSearchProps('batch'),
      },
      {
        title: <span>Price <Tooltip title='The original price of the equipment.'><Icon type='question-circle' /></Tooltip></span>,
        dataIndex: 'originalPrice',
        key: 'originalPrice',
        align: 'right',
        width: 130,
        sorter: (a, b) => a.originalPrice - b.originalPrice,
        render: originalPrice => `$${originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      },
      {
        title: <span>Warranty <Tooltip title='In months'><Icon type='question-circle' /></Tooltip></span>,
        dataIndex: 'warrantyMonths',
        key: 'warranty',
        align: 'right',
        width: 130,
        sorter: (a, b) => a.warrantyMonths - b.warrantyMonths,
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

            {data.lockStatus[0] !== 'Locked' ?
              <>
                <Divider type='vertical' />
                <Button
                  type='link'
                  style={{ border: 0, padding: 10 }}
                  icon={data.eqStatus[0] !== 'Storage' ? 'share-alt' : 'appstore'}
                  onClick={data.eqStatus[0] !== 'Storage' ? () => this.reclaimModal(data) : () => this.handingModal(data)}
                >
                  &nbsp;{data.eqStatus[0] !== 'Storage' ? 'Reclaim' : 'Handing'}
                </Button>
              </> : null}
            <Popconfirm
              title='Are you sure to delete this equipment?'
              onConfirm={() => this.deleteEquipment(data)}
              placement="bottomRight"
            >
              {/* <Button type='link' style={{ border: 0 }} icon='delete'>
                &nbsp;Delete
            </Button> */}
            </Popconfirm>
          </>
      }

    ]
    return (
      <>
        <h2>{currentUser && currentUser.level > 2 ?
          <> Equipments List
          <span style={{ float: 'right' }}>
              <Button
                type='primary'
                icon='plus'
                style={{ marginRight: 5 }}
                onClick={this.createEquipmentModal}
              >
                Create a new Equipment
            </Button>
              <Upload {...props} uploadSuccess={this.uploadSuccess}>
                <Button
                  type='secondary'
                  icon='plus'
                >
                  Use a file to clone Equipment
                </Button>
              </Upload>
            </span>
          </>
          : 'Your Equipments'}
          <Divider type='horizontal' />
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
                    cloneStep ? 'Clone Equipment' :
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
                    /> :
                    null
          }
        </Modal>
      </>
    )
  }
}