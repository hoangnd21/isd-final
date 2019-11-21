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

        axios.get(this.state.currentUser.level > 2 ? 'http://localhost:9000/accessories' : `http://localhost:9000/search/accessories?owner=${this.state.currentUser.username}`)
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
            message: <span>
              {res.data}
            </span>,
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
    console.log(this.state.currentAccessory)
  }

  cloningDone = () => {
    notification.success({
      message: 'Cloning Complete. You may now delete the file.',
      placement: 'bottomRight'
    })
  }

  hideModal = () => {
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
        message.success(`Code file uploaded successfully.`);
        this.setState({
          accCodeList: info.file.response.map(code => {
            return code.code
          }),
          isCloning: true,
          visible: true
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
        ...this.getColumnSearchProps('accName'),
        render: data =>
          <Button style={{ color: 'black', padding: 0, fontStyle: 'bold', textAlign: 'left' }} type='link' onClick={() => this.infoModal(data)}>
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
        ...this.getColumnSearchProps('eqStatus'),
      },
      {
        title: 'Warranty starts on',
        dataIndex: 'warrantyStartDate',
        align: 'center',
        key: 'warrantyStartDate',
        width: '15%',
        render: warrantyStartDate => `${warrantyStartDate.slice(8, 10)}/${warrantyStartDate.slice(5, 7)}/${warrantyStartDate.slice(0, 4)}`
      },
      {
        title: 'Warranty',
        dataIndex: 'warranty',
        key: 'warranty',
        align: 'center',
        render: warranty => <span>{warranty} months</span>,
        sorter: (a, b) => a.warranty - b.warranty,
      },
      {
        title: 'Warranty ends on',
        dataIndex: 'warrantyEndDate',
        align: 'center',
        key: 'warrantyEndDate',
        width: '15%',
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
              <Upload {...props} onChange={this.upload} style={{ width: 'auto' }}>
                <Button
                  type='secondary'
                  icon='upload'
                >
                  Upload a code file to clone Equipment
                </Button>
              </Upload>
            </span>
            : null}
          <Divider type='horizontal' />
        </h2>
        <Table
          dataSource={allAccessories}
          columns={columns}
          rowKey={record => record._id}
          expandedRowRender={record => <AccessoryView accessory={record} updateAccessoryModal={() => this.updateAccessoryModal(record)} />}
          loading={loading}
        />
        <Modal
          title={modalType === 'create' ? isCloning ? 'Clone Accessory' : 'Create Accessory' : 'Edit Accessory'}
          centered
          footer={null}
          visible={visible}
          onCancel={this.hideModal}
          width={1000}
          destroyOnClose
        >

          <CreateAccessoryForm
            accessory={currentAccessory}
            modalType={modalType}
            createAccessoryRequest={this.createAccessoryRequest}
            cloningDone={this.cloningDone}
            loading={loading}
            isCloning={isCloning}
            accCodeList={accCodeList}
          />
        </Modal>
      </>
    )
  }
}
