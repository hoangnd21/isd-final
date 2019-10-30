import React, { Component } from 'react'
import {
  Button,
  Input,
  Table,
  Divider
} from 'antd'
import axios from 'axios'

const { Search } = Input

export default class Accessories extends Component {
  state = {
    currentUser: {},
    allAccessories: []
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
  render() {
    const { currentUser, allAccessories } = this.state
    const columns = [
      {
        title: 'Accessory Name',
        dataIndex: 'accName',
        key: 'accName',
        width: 150
      },
      {
        title: 'Batch',
        dataIndex: 'batch',
        key: 'batch',
        width: 250,
      },
      {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
      },
      {
        title: 'Accessory Status',
        dataIndex: 'accStatus',
        key: 'accStatus',
        width: 250,
      },
      {
        title: 'Purchased Date',
        dataIndex: 'purchaseDate',
        key: 'purchaseDate',
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
        render: warrantyStartDate => `${warrantyStartDate.slice(8, 10)}/${warrantyStartDate.slice(5, 7)}/${warrantyStartDate.slice(0, 4)}`
      },
      {
        title: 'Warranty (months)',
        dataIndex: 'warranty',
        key: 'warranty',
        align: 'right',
        width: 180,
        sorter: (a, b) => a.warranty - b.warranty,
      },
      {
        title: 'Warranty ends on',
        dataIndex: 'warrantyEndDate',
        key: 'warrantyEndDate',
        render: warrantyEndDate => `${warrantyEndDate.slice(8, 10)}/${warrantyEndDate.slice(5, 7)}/${warrantyEndDate.slice(0, 4)}`
      },
    ]
    return (
      <>
        <h2>Accessories:
          <Divider type='horizontal' />
          {currentUser && currentUser.level > 3 ?
            <div>
              <Search
                style={{ padding: 0, margin: '3px 5px 0 0', width: 400 }}
                placeholder={`Search ${allAccessories.length} entries`}
                onSearch={value => console.log(value)}
                enterButton
              />
              <span style={{ float: 'right' }}>
                <Button
                  type='primary'
                  icon='plus'
                >
                  Add a new Accessory
                </Button>
              </span>
            </div>
            : null}
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
