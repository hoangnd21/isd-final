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
  message
} from 'antd'
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import CreateAccessoryForm from './CreateAccessoryForm';
import AccessoryView from './AccessoryView'


export default class Accessories extends Component {
  state = {
    currentUser: {},
    allAccessories: [],
    loading: true,
    isCloning: false,
    accCodeList: [],
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
      })
    axios.get('http://localhost:9000/accessories')
      .then(res => {
        this.setState({
          allAccessories: res.data
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
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
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

  cloningDone = () => {
    notification.success({
      message: 'Cloning Complete. You may now delete the file.',
      placement: 'bottomRight'
    })
  }

  hideModal = () => {
    this.setState({
      visible: false
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
    const { currentUser, allAccessories, loading, visible, isCloning, accCodeList, } = this.state
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
        dataIndex: 'accName',
        ...this.getColumnSearchProps('accName'),
        // render: data =>
        //   <Button style={{ color: 'black', padding: 0, fontStyle: 'bold' }} type='link' onClick={() => this.infoModal(data)}>{data.accName}</Button>
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
      // {
      //   title: 'Batch',
      //   dataIndex: 'batch',
      //   key: 'batch',
      //   width: 250,
      //   ...this.getColumnSearchProps('batch'),
      // },
      // {
      //   title: 'Provider',
      //   dataIndex: 'provider',
      //   key: 'provider',
      //   width: 130,
      //   ...this.getColumnSearchProps('provider'),
      // },
      // {
      //   title: 'Purchased Date',
      //   dataIndex: 'purchaseDate',
      //   key: 'purchaseDate',
      //   render: purchaseDate => `${purchaseDate.slice(8, 10)}/${purchaseDate.slice(5, 7)}/${purchaseDate.slice(0, 4)}`
      // },
      // {
      //   title: 'Price',
      //   dataIndex: 'price',
      //   key: 'price',
      //   align: 'right',
      //   render: price => `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      // },
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
        <h2>Accessories
          {currentUser && currentUser.level > 3 ?
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
          expandedRowRender={record => <AccessoryView accessory={record} />}
          loading={loading}
        />
        <Modal
          title={isCloning ? 'Clone Accessory' : 'Create Accessory'}
          centered
          footer={null}
          visible={visible}
          onCancel={this.hideModal}
          width={1000}
          destroyOnClose
        >

          <CreateAccessoryForm
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
