import React, { Component } from 'react'
import axios from 'axios'
import {
  Divider,
  Table,
  Button,
  Input,
  Icon,
  Modal,
  notification,
  Popover,
  Typography
} from 'antd'
import Highlighter from 'react-highlight-words';
import Forbidden from '../../Config/Forbidden';
import PersonInfo from './PersonInfo';
import ProviderCreateForm from './ProviderCreateForm'

const { Paragraph } = Typography

export default class Providers extends Component {
  state = {
    currentUser: {},
    loading: true,
    allProviders: []
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
    axios.get('http://localhost:9000/providers')
      .then(res => {
        this.setState({
          allProviders: res.data
        })
      })
  }

  getAllProviders = () => {
    axios.get('http://localhost:9000/providers')
      .then(res => {
        this.setState({
          allProviders: res.data,
          loading: false
        })
      })
  }

  createProviderModal = () => {
    this.setState({
      visible: true,
    })
  }

  createProviderRequest = data => {
    axios.post('http://localhost:9000/providers/addProvider', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            visible: false,
            listLoading: true
          })
          notification.success({
            message: res.data
          })
          this.getAllProviders()
        }
      })
  }

  closeModal = () => {
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
    const { allProviders, currentUser, visible, loading } = this.state;
    const columns = [
      {
        title: 'Provider',
        dataIndex: 'name',
        key: 'name',
        width: 230,
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Address',
        key: 'address',
        width: 230,
        dataIndex: 'address',
        ...this.getColumnSearchProps('address'),
      },
      {
        title: 'Hotline',
        key: 'hotline',
        width: 230,
        dataIndex: 'hotline',
        ...this.getColumnSearchProps('hotline'),
      },
      {
        title: 'Contact Person',
        width: 230,
        key: 'contactPerson',
        ...this.getColumnSearchProps('contactPerson'),
        render: data =>
          <Popover title='Contact Person Information' trigger='click' content={<PersonInfo personInfo={data.contactPerson} />}>
            <Button
              type='link'
              style={{ color: 'black', padding: 0, fontStyle: 'bold' }}
            >
              {data.contactPerson.CPName}
            </Button>
          </Popover>
      },
      {
        title: 'Warranty Person',
        key: 'warrantyPerson',
        width: 230,
        ...this.getColumnSearchProps('warrantyPerson'),
        render: data =>
          <Popover title='Warranty Person Information' trigger='click' content={<PersonInfo personInfo={data.warrantyPerson} />}>
            <Button
              type='link'
              style={{ color: 'black', padding: 0, fontStyle: 'bold' }}
            >
              {data.warrantyPerson.WPName}
            </Button>
          </Popover>
      },
      {
        title: 'Note',
        dataIndex: 'note',
        width: 300,
        key: 'note',
        render: note => <Popover title={null} content={note}>
          <Paragraph
            style={{ width: 230 }}
            ellipsis={{ rows: 1 }}>
            {note}
          </Paragraph>
        </Popover>
      },
    ]
    return (
      currentUser && currentUser.level < 2 ? <Forbidden /> :
        <>
          <h2>Providers
            <span style={{ float: 'right' }}>
              <Button
                type='primary'
                icon='plus'
                style={{ marginRight: 5 }}
                onClick={this.createProviderModal}
              >
                Create a new Provider
            </Button>
            </span>
            <Divider type='horizontal' />
          </h2>
          <Table
            loading={loading}
            columns={columns}
            dataSource={allProviders}
            rowKey={record => record._id}
            pagination={{
              pageSize: 20,
              size: "small",
              total: allProviders.length,
              showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`
            }}
            scroll={{ y: 630 }}
          />
          <Modal
            title='Create a new Provider'
            visible={visible}
            onCancel={this.closeModal}
            destroyOnClose
            centered
            footer={null}
            width={1000}
          >
            <ProviderCreateForm createProvider={this.createProviderRequest} />
          </Modal>
        </>
    )
  }
}
