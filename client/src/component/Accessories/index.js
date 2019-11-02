import React, { Component } from 'react'
import {
  Button,
  Input,
  Table,
  Divider,
  Icon,
} from 'antd'
import axios from 'axios';
import Highlighter from 'react-highlight-words';


export default class Accessories extends Component {
  state = {
    currentUser: {},
    allAccessories: [],
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
    axios.get('http://localhost:9000/accessories')
      .then(res => {
        this.setState({
          allAccessories: res.data
        })
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
    const { currentUser, allAccessories } = this.state
    const columns = [
      {
        title: 'Accessory',
        dataIndex: 'accName',
        key: 'accName',
        ...this.getColumnSearchProps('accName'),
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
        ...this.getColumnSearchProps('provider'),
      },
      {
        title: 'Status',
        dataIndex: 'accStatus',
        key: 'accStatus',
        width: 150,
        ...this.getColumnSearchProps('accStatus'),
      },
      {
        title: 'Purchased Date',
        dataIndex: 'purchaseDate',
        key: 'purchaseDate',
        width: 130,
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
        />
      </>
    )
  }
}
