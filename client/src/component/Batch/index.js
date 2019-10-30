import React from 'react';
import axios from 'axios'
import {
  Table,
  Modal,
  Button,
  Divider,
  Input
} from 'antd';
import BatchItems from './BatchItems'
import Forbidden from '../../Config/Forbidden';

const { Search } = Input

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
  render() {
    const { allBatch, visible, relatedDataByCode, currentBatch, currentUser } = this.state
    const columns = [
      {
        title: 'Batch Code',
        key: 'code',
        width: 300,
        render: data => <Button type='link' style={{ color: 'black', padding: 0, fontStyle: 'bold' }} onClick={() => this.getAllRelatedToModal(data)}>{data.code}</Button>
      },
      {
        title: 'Contact Person',
        dataIndex: 'contactPerson',
        key: 'contactPerson',
        width: 400
      },
      {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider'
      },
    ]
    return (
      currentUser && currentUser.level > 3 ?
        <>
          <h2>Batch:
          <Divider type='horizontal' />
            {currentUser && currentUser.level > 3 ?
              <div>
                <Search
                  style={{ padding: 0, margin: '3px 5px 0 0', width: 400 }}
                  placeholder={`Search ${allBatch.length} entries`}
                  onSearch={value => console.log(value)}
                  enterButton
                />
                <span style={{ float: 'right' }}>
                  <Button
                    type='primary'
                    icon='plus'
                  >
                    Add a new Batch
                </Button>
                </span>
              </div>
              : null}
          </h2>
          <Table
            dataSource={allBatch}
            columns={columns}
            rowKey={record => record._id}
          />
          <Modal
            title={`Batch ${currentBatch}`}
            visible={visible}
            destroyOnClose
            footer={null}
            centered
            onCancel={this.closeModal}
          >
            <BatchItems allItems={relatedDataByCode} currentBatch={currentBatch} />
          </Modal>
        </>
        : <Forbidden />
    )
  }
}