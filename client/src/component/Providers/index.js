import React, { Component } from 'react'
import axios from 'axios'
import {
  Divider,
  Table,
  Button,
  Input,
  Icon,
  Modal
} from 'antd'
import Highlighter from 'react-highlight-words';
import Forbidden from '../../Config/Forbidden';
import PersonInfo from './PersonInfo';
import ProviderCreateForm from './ProviderCreateForm'

export default class Providers extends Component {
  state = {
    currentUser: {},
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
    axios.get('http://localhost:9000/providers')
      .then(res => {
        this.setState({
          allProviders: res.data
        })
      })
  }

  createProvider = () => {
    this.setState({
      visible: true,
      modalType: 'create',
    })
  }

  contactPersonInfo = data => {
    this.setState({
      visible: true,
      contactPerson: data.contactPerson,
      modalType: 'contactPerson'
    })
  }

  warrantyPersonInfo = data => {
    this.setState({
      visible: true,
      warrantyPerson: data.warrantyPerson,
      modalType: 'warrantyPerson',
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
    const { allProviders, currentUser, visible, modalType, contactPerson, warrantyPerson, loading } = this.state;
    const columns = [
      {
        title: 'Provider',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Address',
        key: 'address',
        dataIndex: 'address',
        ...this.getColumnSearchProps('address'),
      },
      {
        title: 'Hotline',
        key: 'hotline',
        dataIndex: 'hotline',
        ...this.getColumnSearchProps('hotline'),
      },
      {
        title: 'Contact Person',
        key: 'contactPerson',
        ...this.getColumnSearchProps('contactPerson'),
        render: data => <Button type='link' style={{ color: 'black', padding: 0, fontStyle: 'bold' }} onClick={() => this.contactPersonInfo(data)}>{data.contactPerson.CPName}</Button>
      },
      {
        title: 'Warranty Person',
        key: 'warrantyPerson',
        ...this.getColumnSearchProps('warrantyPerson'),
        render: data => <Button type='link' style={{ color: 'black', padding: 0, fontStyle: 'bold' }} onClick={() => this.warrantyPersonInfo(data)}>{data.warrantyPerson.WPName}</Button>
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
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
                onClick={this.createProvider}
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
          />
          <Modal
            title={modalType !== 'warrantyPerson' ? 'Contact Person' : 'Warranty Person'}
            visible={visible}
            onCancel={this.closeModal}
            destroyOnClose
            centered
            footer={null}
          >
            {modalType === 'create' ?
              <ProviderCreateForm />
              :
              <PersonInfo personInfo={modalType === 'warrantyPerson' ? warrantyPerson : contactPerson} />}
          </Modal>
        </>
    )
  }
}
