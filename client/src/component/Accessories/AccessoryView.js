import React, { Component } from 'react'
import axios from 'axios'
import { Button, Divider, Card } from 'antd'

export default class AccessoryView extends Component {
  state = {
    generalType: {},
    subType: {}
  }
  componentDidMount() {
    const { accessory } = this.props
    axios.get(`http://localhost:9000/generalTypes/code/${accessory.genTypeAttached}`)
      .then(res => {
        this.setState({
          generalType: res.data
        })
      })
    axios.get(`http://localhost:9000/subTypes/subType?genTypeId=${accessory.genTypeAttached}&value=${accessory.subTypeAttached}`)
      .then(res => {
        this.setState({
          subType: res.data
        })
      })
  }
  render() {
    const { generalType, subType } = this.state
    const { accessory } = this.props
    return (
      <Card bodystyle={{ padding: 0 }}>
        {/* <p><Button type='danger' onClick={}>Dele this accessory</Button></p> */}
        {/* <Divider type='horizontal' /> */}
        <p>Batch: {accessory.batch}</p>
        <p>This accessory is attached to {generalType.label} and {subType.label}</p>
        <p>Price: ${accessory.price}</p>
        <p>Provider: {accessory.provider}</p>
        <p>Purchase date: {accessory.purchaseDate.slice(8, 10)}/{accessory.purchaseDate.slice(5, 7)}/{accessory.purchaseDate.slice(0, 4)}</p>
      </Card>
    )
  }
}
