import React, { Component } from 'react';
import { List } from 'antd'
import axios from 'axios'

export default class EqTypesDrawer extends Component {
  state = {
    equipmentTypesByID: []
  }
  componentDidMount() {
    const { generalType } = this.props
    axios.get(`http://localhost:9000/subTypes/genTypeId/${generalType.value}`)
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
    const { equipmentTypesByID } = this.state
    const { generalType } = this.props
    console.log(`${generalType.label}`, equipmentTypesByID)
    return (
      <>
        The general type {generalType.label} has {equipmentTypesByID.length} subtype(s).
        <List
          itemLayout='horizontal'
          dataSource={equipmentTypesByID}
          size='small'
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  item.label
                }
                description={`ID: ${item.value}`}
              />
            </List.Item>
          )}
        >
        </List>
      </>
    )
  }
}
