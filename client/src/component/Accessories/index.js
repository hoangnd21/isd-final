import React, { Component } from 'react'
import {
  Button,
  Input,
  Table,
  Divider,
  Icon,
  Modal,
  notification
} from 'antd'
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import CreateAccessoryForm from './CreateAccessoryForm';


export default class Accessories extends Component {
  state = {
    currentUser: {},
    allAccessories: [],
    loading: true
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
      modalType: 'create',
      visible: true
    })
  }

  createAccessoryRequest = data => {
    this.setState({
      loading: true
    })
    axios.post('http://localhost:9000/accessories/addAccessories', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            visible: false,
          })
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}
            </span>
          })
          this.getAllAccessories()
        }
      })
      .catch(error => {
        console.log(error)
      });
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

  render() {
    const { currentUser, allAccessories, loading, visible } = this.state
    const columns = [
      {
        title: 'Accessory',
        dataIndex: 'accName',
        key: 'accName',
        ...this.getColumnSearchProps('accName'),
      },
      {
        title: 'Lock status',
        dataIndex: 'lockStatus',
        key: 'lockStatus',
        width: 170,
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
        width: 170,
        ...this.getColumnSearchProps('eqStatus'),
      },
      {
        title: 'Batch',
        dataIndex: 'batch',
        key: 'batch',
        width: 250,
        ...this.getColumnSearchProps('batch'),
      },
      {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
        width: 130,
        ...this.getColumnSearchProps('provider'),
      },
      {
        title: 'Purchased Date',
        dataIndex: 'purchaseDate',
        key: 'purchaseDate',
        width: 120,
        render: purchaseDate => `${purchaseDate.slice(8, 10)}/${purchaseDate.slice(5, 7)}/${purchaseDate.slice(0, 4)}`
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        width: 130,
        render: price => `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      },
      {
        title: 'Warranty starts on',
        dataIndex: 'warrantyStartDate',
        key: 'warrantyStartDate',
        width: 120,
        render: warrantyStartDate => `${warrantyStartDate.slice(8, 10)}/${warrantyStartDate.slice(5, 7)}/${warrantyStartDate.slice(0, 4)}`
      },
      {
        title: 'Warranty',
        dataIndex: 'warranty',
        key: 'warranty',
        align: 'right',
        width: 120,
        render: warranty => <span>{warranty} months</span>,
        sorter: (a, b) => a.warranty - b.warranty,
      },
      {
        title: 'Warranty ends on',
        dataIndex: 'warrantyEndDate',
        key: 'warrantyEndDate',
        width: 120,
        render: warrantyEndDate => `${warrantyEndDate.slice(8, 10)}/${warrantyEndDate.slice(5, 7)}/${warrantyEndDate.slice(0, 4)}`
      },
    ]
    return (
      <>
        <h2>Accessories:
          {currentUser && currentUser.level > 3 ?
            <span style={{ float: 'right' }}>
              <Button
                type='primary'
                icon='plus'
                onClick={this.createAccessoryModal}
              >
                Add a new Accessory
                </Button>
            </span>
            : null}
          <Divider type='horizontal' />
        </h2>
        <Table
          dataSource={allAccessories}
          columns={columns}
          rowKey={record => record._id}
          loading={loading}
        />
        <Modal
          title={'Create Accessory'}
          centered
          footer={null}
          visible={visible}
          onCancel={this.hideModal}
          width={1000}
          destroyOnClose
        >
          <CreateAccessoryForm
            createAccessoryRequest={this.createAccessoryRequest}
            loading={loading}
          />
        </Modal>
      </>
    )
  }
}
