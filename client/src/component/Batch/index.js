import React from 'react';
import axios from 'axios'
import {
  Table,
  Modal,
  Button,
  Divider,
  Input,
  Icon
} from 'antd';
import BatchItems from './BatchItems'
import Forbidden from '../../Config/Forbidden';
import Highlighter from 'react-highlight-words';
export default class Batch extends React.Component {
  state = {
    currentUser: null,
    allBatch: [],
    visible: false,
    currentBatch: ''
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
    axios.get('http://localhost:9000/batch')
      .then(res => {
        this.setState({
          allBatch: res.data
        })
      })
  }

  getAllRelatedToModal = data => {
    this.setState({
      visible: true,
      currentBatch: data.code
    })
    // axios.get(`http://localhost:9000/search/equipments?batch=${data.code}`)
    //   .then(res => {
    //     this.setState({
    //       relatedDataByCode: res.data,
    //     })
    //   })
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
    const { allBatch, visible, relatedDataByCode, currentBatch, currentUser } = this.state
    const columns = [
      {
        title: 'Batch Code',
        key: 'code',
        width: 300,
        ...this.getColumnSearchProps('code'),
        render: data => <Button type='link' style={{ color: 'black', padding: 0, fontStyle: 'bold' }} onClick={() => this.getAllRelatedToModal(data)}>{data.code}</Button>
      },
      {
        title: 'Contact Person',
        dataIndex: 'contactPerson',
        key: 'contactPerson',
        width: 400,
        ...this.getColumnSearchProps('contactPerson'),
      },
      {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
        width: 300,
        ...this.getColumnSearchProps('provider'),
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
          <h2>Batch:
            {currentUser && currentUser.level > 3 ?
              <span style={{ float: 'right' }}>
                <Button
                  type='primary'
                  icon='plus'
                >
                  Add a new Batch
                </Button>
              </span>
              : null}
            <Divider type='horizontal' />
          </h2>
          <Table
            dataSource={allBatch}
            columns={columns}
            rowKey={record => record._id}
          />
          <Modal
            title={`Batch: ${currentBatch}`}
            visible={visible}
            destroyOnClose
            footer={null}
            centered
            onCancel={this.closeModal}
            width={1000}
          >
            <BatchItems allItems={relatedDataByCode} currentBatch={currentBatch} />
          </Modal>
        </>
    )
  }
}