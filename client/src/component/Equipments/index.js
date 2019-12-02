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
  Upload,
  message,
  Typography,
} from 'antd';
import EquipmentForm from './EquipmentForm'
import EquipmentInfo from './EquipmentInfo'
import EquipmentHanding from './EquipmentHanding';
import EquipmentReclaim from './EquipmentReclaim';
import Highlighter from 'react-highlight-words';

const { Paragraph } = Typography

export default class Equipments extends React.PureComponent {

  state = {
    equipments: [],
    loading: true,
    equipmentModal: false,
    modalType: '',
    equipmentDetail: {},
    currentUser: null,
    searchText: '',
    isCloning: false,
    codeList: [],
  }

  componentDidMount() {
    document.title = 'Equipments'
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
        axios.get(this.state.currentUser.level > 2 ? `http://localhost:9000/equipments` : `http://localhost:9000/search/equipments?owner=${this.state.currentUser.username}`)
          .then(res => {
            this.setState({
              equipments: res.data,
              loading: false,
            })
          })
          .catch(error => {
            console.log(error)
          });
      })
  }

  getAllEquipments = () => {
    axios.get('http://localhost:9000/equipments')
      .then(res => {
        this.setState({
          equipments: res.data,
          loading: false,
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

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
            loading: true
          })
          this.state.isCloning ? console.log('clone') :
            notification.success({
              message: res.data
            })
          this.getAllEquipments()
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  infoModal = data => {
    document.title = `Equipments - ${data.name}`
    this.setState({
      equipmentModal: true,
      modalType: 'view',
      equipmentDetail: data
    })
  }

  updateEquipmentModal = data => {
    this.setState({
      equipmentDetail: data,
      modalType: 'update',
      equipmentModal: true
    })
  }

  updateEquipment = data => {
    axios.patch(`http://localhost:9000/equipments/updateEquipment/${data._id}`, data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            equipmentModal: false,
            loading: true
          })

          this.state.modalType === 'handing' || this.state.modalType === 'reclaim' ?
            console.log('handing')
            :
            notification.success({
              message: res.data,
              placement: 'bottomRight'
            })
          this.getAllEquipments()
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  hideEquipmentModal = () => {
    document.title = 'Equipments'
    this.setState({
      equipmentModal: false,
      modalType: '',
      equipmentDetail: {},
      isCloning: false
    })
  }

  deleteEquipment = data => {
    axios.post(`http://localhost:9000/equipments/deleteEquipment/${data._id}`)
      .then(res => {
        if (res.status === 200) {
          notification.success({
            message: res.data,
            placement: 'bottomRight'
          });
          this.getAllEquipments()
        }
      }
      )
      .catch(function (error) {
        console.log(error)
      });
  }

  handingModal = data => {
    this.setState({
      equipmentDetail: data,
      modalType: 'handing',
      equipmentModal: true
    })
  }

  handingEquipment = data => {
    console.log(data)
    axios.post('http://localhost:9000/equipmentDistribution/addEquipmentDistribution', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            equipmentModal: false,
            loading: true
          })
          notification.success({
            message: res.data,
            placement: 'bottomRight'
          })
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  reclaimModal = data => {
    this.setState({
      equipmentDetail: data,
      modalType: 'reclaim',
      equipmentModal: true
    })
  }

  reclaimEquipment = data => {
    axios.get(`http://localhost:9000/reclaim/equipment/${data.device}`)
      .then(res => {
        axios.patch(`http://localhost:9000/equipmentDistribution/updateEquipmentDistribution/${res.data._id}`, data)
          .then(res => {
            if (res.status === 200) {
              notification.success({
                message: res.data,
                placement: 'bottomRight'
              })
              this.setState({
                equipmentModal: false,
                loading: true
              })
            }
          })
      })
      .catch(error => {
        console.log(error)
      });
  }

  cloningDone = () => {
    notification.success({
      message: 'Cloning Complete. You may now delete the file.',
      placement: 'bottomRight'
    })
  }

  upload = info => {
    if (info.file.status !== 'uploading') {
      if (info.file.status === 'done') {
        message.success(`Code file uploaded successfully.`);
        this.setState({
          codeList: info.file.response.map(code => {
            return code.code
          }),
          isCloning: true,
          equipmentModal: true,
          modalType: 'create'
        })
      } else if (info.file.status === 'error') {
        message.error(`Upload failed.`);
      }
    }
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
    const { equipments, equipmentModal, modalType, equipmentDetail, loading, currentUser, isCloning, codeList } = this.state;
    const props = {
      name: 'file',
      action: 'http://localhost:9000/upload/importExcel',
      headers: {
        authorization: 'authorization-text',
      },
    };
    const columns = [
      {
        title: 'Equipment Name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        width: 250,
        render: data =>
          <Button style={{ color: 'black', padding: 0, fontStyle: 'bold', textAlign: 'left' }} type='link' onClick={() => this.infoModal(data)}>
            <Paragraph
              style={{ width: 200 }}
              ellipsis={{ rows: 1 }}>
              {data.name}
            </Paragraph>
          </Button>
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        width: 170,
        ...this.getColumnSearchProps('code'),
      },
      {
        title: 'Lock status',
        dataIndex: 'lockStatus',
        key: 'lockStatus',
        width: 150,
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
        width: 150,
        render: eqStatus =>
          <div style={eqStatus === "Use" ? { color: 'green' } : { color: 'gold' }}>
            {eqStatus}
          </div>,
        ...this.getColumnSearchProps('eqStatus'),
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        width: 150,
        key: 'owner',
        ...this.getColumnSearchProps('owner'),
      },
      // {
      //   title: 'Purchased Date',
      //   dataIndex: 'datePurchase',
      //   key: 'datePurchase',
      //   width: '10%',
      //   render: datePurchase => `${datePurchase.slice(8, 10)}/${datePurchase.slice(5, 7)}/${datePurchase.slice(0, 4)}`
      // },
      // {
      //   title: 'Batch',
      //   dataIndex: 'batch',
      //   key: 'batch',
      //   ...this.getColumnSearchProps('batch'),
      // },
      // {
      //   title: <span>Price <Tooltip title='The original price of the equipment.'><Icon type='question-circle' /></Tooltip></span>,
      //   dataIndex: 'originalPrice',
      //   key: 'originalPrice',
      //   align: 'right',
      //   width: '7%',
      //   sorter: (a, b) => a.originalPrice - b.originalPrice,
      //   render: originalPrice => `$${originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      // },
      // {
      //   title: 'Warranty',
      //   dataIndex: 'warrantyMonths',
      //   key: 'warranty',
      //   align: 'right',
      //   width: '7%',
      //   sorter: (a, b) => a.warrantyMonths - b.warrantyMonths,
      // },
      {
        title: 'Actions',
        width: '15%',
        render: data =>
          <>
            {currentUser.level > 2 ?
              <Button
                type='link'
                style={{ border: 0, padding: 10 }}
                icon='edit'
                onClick={() => this.updateEquipmentModal(data)}
              >
                &nbsp;Edit
              </Button> :
              <Button
                type='danger'
                icon='info-circle'
                onClick={() => this.updateEquipmentModal(data)}
              >
                &nbsp;Report a problem about this device
              </Button>
            }
            {currentUser.level > 2 ? data.lockStatus[0] !== 'Locked' ?
              <>
                <Button
                  type='link'
                  style={{ border: 0, padding: 10 }}
                  icon={data.eqStatus[0] !== 'Storage' ? 'share-alt' : 'appstore'}
                  onClick={data.eqStatus[0] !== 'Storage' ? () => this.reclaimModal(data) : () => this.handingModal(data)}
                >
                  &nbsp;{data.eqStatus[0] !== 'Storage' ? 'Reclaim' : 'Handing'}
                </Button>
              </> : null : null}
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
              <Upload {...props} onChange={this.upload} style={{ width: 'auto' }}>
                <Button
                  type='secondary'
                  icon='upload'
                >
                  Upload a code file to clone Equipment
                </Button>
              </Upload>
            </span>
          </>
          : 'Your Equipments'}
          <Divider type='horizontal' />
        </h2>
        <Table
          bordered
          dataSource={equipments}
          loading={loading}
          columns={columns}
          footer={null}
          pagination={{
            pageSize: 30,
            size: "small",
            total: equipments.length,
            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`
          }}
          rowKey={record => record._id}
          scroll={{ y: 630 }}
        />

        <Modal
          title={
            modalType === 'update' ? 'Update Equipment' :
              modalType === 'create' ? isCloning ? 'Clone Equipment' : 'Create Equipment' :
                modalType === 'reclaim' ? 'Reclaim Equipment' :
                  modalType === 'handing' ? 'Handing Equipment' :
                    isCloning ? 'Clone Equipment' :
                      'Equipment Information'
          }
          maskClosable={isCloning ? false : true}
          destroyOnClose
          visible={equipmentModal}
          footer={null}
          onCancel={this.hideEquipmentModal}
          lockStatus={this.lockStatus}
          modalType={this.modalType}
          width={1000}
          centered
          style={{ maxHeight: '100%', overflowX: 'auto', overflowY: 'hidden' }}
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
                isCloning={isCloning}
                codeList={codeList}
                cloningDone={this.cloningDone}
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
                    null}
        </Modal>
      </>
    )
  }
}