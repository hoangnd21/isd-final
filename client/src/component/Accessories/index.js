import React, { Component } from 'react'
import {
  Button,
  Input,
  Table,
  Divider,
  Icon,
  Modal,
  notification,
  Upload,
  message,
  Typography
} from 'antd'
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import CreateAccessoryForm from './CreateAccessoryForm';
import AccessoryView from './AccessoryView'
import AccessoryHanding from './AccessoryHanding'
import AccessorryReclaim from './AccessoryReclaim'

const { Paragraph } = Typography
export default class Accessories extends Component {
  state = {
    currentUser: {},
    allAccessories: [],
    loading: true,
    isCloning: false,
    accCodeList: [],
    currentAccessory: {}
  }
  componentDidMount() {
    document.title = 'Accessories'
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
          currentUser: res.data,
          loading: false
        })

        axios.get(this.state.currentUser.level > 2 ?
          'http://localhost:9000/accessories' :
          `http://localhost:9000/search/accessories?owner=${this.state.currentUser.username}`
        )
          .then(res => {
            this.setState({
              allAccessories: res.data
            })
          })
      })
  }

  getAllAccessories = () => {
    axios.get('http://localhost:9000/accessories')
      .then(res => {
        this.setState({
          allAccessories: res.data,
          loading: false
        })
      })
  }

  createAccessoryModal = () => {
    this.setState({
      modalType: 'create',
      visible: true
    })
  }

  createAccessoryRequest = data => {
    const { isCloning } = this.state
    this.setState({
      loading: true
    })
    axios.post('http://localhost:9000/accessories/addAccessories', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            visible: false,
          })
          isCloning ? console.log('clone') : notification.success({
            message: res.data,
            placement: 'bottomRight'
          })
          this.getAllAccessories()
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  updateAccessoryModal = record => {
    this.setState({
      modalType: 'update',
      visible: true,
      currentAccessory: record
    })
  }

  handAccessoryModal = record => {
    this.setState({
      modalType: 'handing',
      visible: true,
      currentAccessory: record
    })
  }

  reclaimAccessoryModal = record => {
    this.setState({
      modalType: 'reclaim',
      visible: true,
      currentAccessory: record
    })
  }

  updateAccessoryRequest = data => {
    const { modalType } = this.state
    axios.patch(`http://localhost:9000/accessories/updateAccessories/${data._id}`, data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            visible: false,
            loading: true
          }, this.getAllAccessories())
          if (modalType === 'handing' || modalType === 'reclaim') { return } else {
            notification.success({
              message: res.data,
              placement: 'bottomRight'
            })
          }
        }
      })
  }

  handingAccessoryRequest = (handing, update) => {
    axios.post('http://localhost:9000/accDistribution/addAccDistribution', handing)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            visible: false,
            loading: true
          }, this.updateAccessoryRequest(update))
          notification.success({
            message: res.data,
            placement: 'bottomRight'
          })
        }
      })
  }

  reclaimAccessoryRequest = (data, reclaim) => {
    axios.get(`http://localhost:9000/reclaim/accessory/${data.accessory}`)
      .then(res => {
        console.log(res)
        axios.patch(`http://localhost:9000/accDistribution/updateAccDistribution/${res.data._id}`, data)
          .then(res => {
            if (res.status === 200) {
              notification.success({
                message: res.data,
                placement: 'bottomRight'
              })
              this.setState({
                visible: false,
              }, this.updateAccessoryRequest(reclaim))
            }
          })
      })
      .catch(error => {
        console.log(error)
      });
  }

  cloningDone = () => {
    notification.info({
      message: 'Cloning Complete. You may now delete the file.',
      placement: 'bottomRight'
    })
  }

  hideModal = () => {
    document.title = 'Accessories'
    this.setState({
      visible: false,
      currentAccessory: {}
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

  upload = info => {
    if (info.file.status !== 'uploading') {
      if (info.file.status === 'done') {
        message.info(`Code file uploaded successfully. You may now enter further details for accessories.`);
        this.setState({
          accCodeList: info.file.response.map(code => {
            return code.code
          }),
          isCloning: true,
          visible: true,
          modalType: 'create'
        })
      } else if (info.file.status === 'error') {
        message.error(`Upload failed.`);
      }
    }
  }

  render() {
    const { currentUser, allAccessories, loading, visible, isCloning, accCodeList, modalType, currentAccessory } = this.state
    const props = {
      name: 'file',
      action: 'http://localhost:9000/upload/importExcel',
      headers: {
        authorization: 'authorization-text',
      },
    }
    const columns = [
      {
        title: 'Accessory',
        key: 'accName',
        width: 135,
        ...this.getColumnSearchProps('accName'),
        render: data =>
          <Button style={{ color: 'black', padding: 0, fontStyle: 'bold', textAlign: 'left' }} type='link'>
            <Paragraph
              style={{ width: 100 }}
              ellipsis={{ rows: 1 }}>
              {data.accName}
            </Paragraph>
          </Button>
      },
      {
        title: 'Code',
        dataIndex: 'accCode',
        key: 'accCode',
        width: 200,
        ...this.getColumnSearchProps('accCode'),
      },
      {
        title: 'Lock status',
        dataIndex: 'lockStatus',
        key: 'lockStatus',
        width: '10%',
        sorter: (a, b) => a.lockStatus[0].length - b.lockStatus[0].length,
        render: lockStatus =>
          <div style={lockStatus[0] === "Ready" ? { color: 'green' } : { color: 'red' }}>
            {lockStatus}
          </div>
      },
      {
        title: 'Accessory status',
        dataIndex: 'accStatus',
        key: 'accStatus',
        width: '10%',
        render: accStatus =>
          <div style={accStatus[0] === "Storage" ? { color: 'green' } : { color: 'gold' }}>
            {accStatus}
          </div>
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
        width: '10%',
        ...this.getColumnSearchProps('owner'),
      },
      {
        title: 'Warranty starts on',
        dataIndex: 'warrantyStartDate',
        align: 'center',
        key: 'warrantyStartDate',
        width: 200,
        render: warrantyStartDate => `${warrantyStartDate.slice(8, 10)}/${warrantyStartDate.slice(5, 7)}/${warrantyStartDate.slice(0, 4)}`
      },
      {
        title: 'Warranty',
        dataIndex: 'warranty',
        key: 'warranty',
        width: 200,
        align: 'center',
        render: warranty => <span>{warranty} months</span>,
        sorter: (a, b) => a.warranty - b.warranty,
      },
      {
        title: 'Warranty ends on',
        dataIndex: 'warrantyEndDate',
        align: 'center',
        key: 'warrantyEndDate',
        width: 200,
        render: warrantyEndDate => `${warrantyEndDate.slice(8, 10)}/${warrantyEndDate.slice(5, 7)}/${warrantyEndDate.slice(0, 4)}`
      },
    ]
    return (
      <>
        <h2>{currentUser.level > 2 ? 'Accessories' : 'Your Accessories'}
          {currentUser && currentUser.level > 2 ?
            <span style={{ float: 'right' }}>
              <Button
                type='primary'
                icon='plus'
                style={{ marginRight: 5 }}
                onClick={this.createAccessoryModal}
              >
                Add a new Accessory
                </Button>
              <Upload {...props} onChange={this.upload} style={{ width: 'auto' }} accept='.xlsx, .xls, .csv' showUploadList={false} >
                <Button
                  type='secondary'
                  icon='upload'
                >
                  Upload a code file to clone Accessory
                </Button>
              </Upload>
            </span>
            : null}
          <Divider type='horizontal' />
        </h2>
        <Table
          bordered
          dataSource={allAccessories}
          columns={columns}
          rowKey={record => record._id}
          expandedRowRender={record => {
            document.title = document.title === 'Accessories' ? `Accessories - ${record.accName}` : 'Accessories'
            return (<AccessoryView
              accessory={record}
              updateAccessoryModal={() => this.updateAccessoryModal(record)}
              handAccessoryModal={() => this.handAccessoryModal(record)}
              reclaimAccessoryModal={() => this.reclaimAccessoryModal(record)}
            />)
          }
          }
          loading={loading}
          pagination={{
            pageSize: 30,
            size: "small",
            total: allAccessories.length,
            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ y: 600 }}
        />
        <Modal
          title={modalType === 'create' ? 'Create Accessory' :
            modalType === 'update' ? 'Edit Accessory' :
              modalType === 'handing' ? 'Hand Accessory' :
                'Reclaim Accessory'}
          centered
          footer={null}
          visible={visible}
          onCancel={this.hideModal}
          width={1000}
          destroyOnClose
        >

          {modalType === 'create' || modalType === 'update' ?
            <CreateAccessoryForm
              accessory={currentAccessory}
              modalType={modalType}
              createAccessoryRequest={this.createAccessoryRequest}
              updateAccessoryRequest={this.updateAccessoryRequest}
              cloningDone={this.cloningDone}
              loading={loading}
              isCloning={isCloning}
              accCodeList={accCodeList}
            /> : modalType === 'handing' ?
              <AccessoryHanding
                accessory={currentAccessory}
                handingAccessoryRequest={this.handingAccessoryRequest}
              /> :
              <AccessorryReclaim
                accessory={currentAccessory}
                reclaimAccessoryRequest={this.reclaimAccessoryRequest}
              />}
        </Modal>
      </>
    )
  }
}
