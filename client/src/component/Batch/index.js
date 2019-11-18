import React from 'react';
import axios from 'axios'
import {
  Table,
  Modal,
  Button,
  Divider,
  Input,
  Icon,
  notification
} from 'antd';
import BatchItems from './BatchItems'
import Forbidden from '../../Config/Forbidden';
import Highlighter from 'react-highlight-words';
import AddBatchForm from './AddBatchForm'
export default class Batch extends React.Component {
  state = {
    currentUser: null,
    allBatch: [],
    visible: false,
    currentBatch: '',
    loading: true,
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
      modalType: 'view',
      currentBatch: data,
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
      visible: false,
    })
  }

  getAllBatch = () => {
    axios.get('http://localhost:9000/batch')
      .then(res => {
        this.setState({
          allBatch: res.data,
          loading: false
        })
      })
  }

  addBatchModal = () => {
    this.setState({
      visible: true,
      modalType: 'create'
    })
  }

  addBatchRequest = data => {
    axios.post('http://localhost:9000/batch/addBatch', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            visible: false,
            listLoading: true
          })
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
              {res.data}<br />
              You can now use this batch to create equiments and accessories.
            </span>
          })
          this.getAllBatch()
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  updateBatchModal = data => {
    this.setState({
      modalType: 'update',
      visible: true,
      currentBatch: data
    })
  }

  updateBatchRequest = data => {
    axios.put(`http://localhost:9000/batch/updateBatch/${data._id}`, data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            visible: false,
            loading: true
          })
          notification.open({
            message: <span>
              <Icon type='check-circle' style={{ color: 'green' }} />&nbsp;
            {res.data}
            </span>
          })
          this.getAllBatch()
        }
      })
      .catch(error => {
        console.log(error)
      });
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
    const { allBatch, visible, relatedDataByCode, currentBatch, currentUser, loading, modalType } = this.state
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
      {
        title: 'Actions',
        key: 'actions',
        render: data =>
          <>
            <Button
              type='link'
              icon='edit'
              onClick={() => this.updateBatchModal(data)}
            >
              Edit
            </Button>
          </>
      },
    ]
    return (
      currentUser && currentUser.level < 2 ? <Forbidden /> :
        <>
          <h2>Batch
            {currentUser && currentUser.level > 3 ?
              <span style={{ float: 'right' }}>
                <Button
                  type='primary'
                  icon='plus'
                  onClick={this.addBatchModal}
                >
                  Add a new Batch
                </Button>
              </span>
              : null}
            <Divider type='horizontal' />
          </h2>
          <Table
            loading={loading}
            dataSource={allBatch}
            columns={columns}
            rowKey={record => record._id}
            pagination={{
              pageSize: 8
            }}
          />
          <Modal
            title={modalType === 'create' ? 'Create a new Batch' : modalType === 'update' ? 'Edit batch' : `Batch: ${currentBatch.code}`}
            visible={visible}
            destroyOnClose
            footer={null}
            centered
            onCancel={this.closeModal}
            width={1000}
            bodyStyle={{ paddingRight: 10 }}
          >
            {modalType === 'create' || modalType === 'update' ?
              <AddBatchForm
                addBatch={this.addBatchRequest}
                updateBatch={this.updateBatchRequest}
                currentBatch={currentBatch}
                modalType={modalType}
              /> :
              <BatchItems allItems={relatedDataByCode} currentBatch={currentBatch} />
            }
          </Modal>
        </>
    )
  }
}

