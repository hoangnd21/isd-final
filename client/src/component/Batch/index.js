import React from 'react';
import axios from 'axios'
import {
  Table,
  Modal,
  Button
} from 'antd';
import BatchItems from './BatchItems'

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
    // axios.get(`http://localhost:9000/search/equipments?batch=${data._id}`)
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
    const { allBatch, visible, relatedDataByCode, currentBatch } = this.state
    const columns = [
      {
        title: 'Code',
        key: 'code',
        width: 300,
        render: data => <Button type='link' style={{ color: 'black', padding: 0, fontStyle: 'bold' }} onClick={() => this.getAllRelatedToModal(data)}>{data.code}</Button>
      },
      {
        title: 'Contact Person',
        dataIndex: 'contactPerson',
        key: 'contactPerson'
      },
      {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider'
      },
    ]
    return (
      <>
        <h2>Batch</h2>
        <Table
          dataSource={allBatch}
          columns={columns}
        />
        <Modal
          title={`Batch ${currentBatch}`}
          visible={visible}
          destroyOnClose
          footer={null}
          centered
          onCancel={this.closeModal}
        >
          <BatchItems allItems={relatedDataByCode} />
        </Modal>
      </>
    )
  }
}