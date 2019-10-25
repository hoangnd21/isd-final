import React, { Component } from 'react'
import axios from 'axios'
import {
  List,
  Popover,
  Button
} from 'antd';
import EqTypesPopover from './EqTypesPopover'

export default class EquipmentTypes extends Component {
  state = {
    generalTypes: [],
    currentUser: null,
    equipmentTypesByID: null,
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
          currentUser: res.data
        })
      })
    axios.get(`http://localhost:9000/generalTypes`)
      .then(res => {
        this.setState({
          generalTypes: res.data,
          loading: false
        })
      })
  }

  getEqTypes = item => {
    axios.get(`http://localhost:9000/subTypes/genTypeId/${item.id}`)
      .then(res => {
        this.setState({
          equipmentTypesByID: res.data,
        })
      })
      .catch(error => {
        console.log(error)
      });
  }


  render() {
    const { generalTypes, equipmentTypesByID } = this.state;
    const listData = generalTypes.map(g => {
      return (
        {
          title: g.label,
          id: g.value
        }
      )
    })
    return (
      <>
        <List
          itemLayout='horizontal'
          dataSource={listData}
          header='List of general types'
          size='large'
          pagination={{
            pageSize: 10,
          }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Popover
                    trigger='click'
                    content={<EqTypesPopover generalType={item} equipmentTypes={equipmentTypesByID} />}
                    placement='bottomLeft'
                  ><Button style={{ padding: 0 }} type='link' onClick={() => this.getEqTypes(item)}><h3>{item.title}</h3></Button>
                  </Popover>
                }
                description={`ID: ${item.id}`}
              />
            </List.Item>
          )}
        />

      </>
    )
  }
}
