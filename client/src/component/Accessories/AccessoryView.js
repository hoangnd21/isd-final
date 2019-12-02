import React, { Component } from 'react'
import axios from 'axios'
import {
  Card,
  Button,
  Divider
} from 'antd'
// import AccessoryHanding from './AccessoryHanding'

export default class AccessoryView extends Component {
  state = {
    generalType: {},
    subType: {},
    loading: true
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
          subType: res.data,
          loading: false
        })
      })
  }
  render() {
    const { generalType, subType, loading } = this.state
    const { accessory, updateAccessoryModal, handAccessoryModal, reclaimAccessoryModal } = this.props
    return (
      <Card loading={loading}>
        <p>Batch: {accessory.batch}</p>
        <p>This accessory is attached to {generalType.label} and {subType.label}</p>
        <p>Owner: {accessory.owner}</p>
        <p>Price: ${accessory.price}</p>
        <p>Provider: {accessory.provider}</p>
        <p>Purchase date: {accessory.purchaseDate.slice(8, 10)}-{accessory.purchaseDate.slice(5, 7)}-{accessory.purchaseDate.slice(0, 4)}</p>
        <Divider type='horizontal' style={{ margin: '10px 0 10px 0' }} />
        <Button
          type='primary'
          icon='edit'
          onClick={updateAccessoryModal}
        >
          Edit this accessory
        </Button>
        <Button
          icon='appstore'
          onClick={accessory.owner[0] === 'None' ? handAccessoryModal : reclaimAccessoryModal}
          style={{ marginLeft: 5 }}
        >
          {accessory.owner[0] === 'None' ? 'Hand this accessory' : 'Reclaim this accessory'}
        </Button>
      </Card>
    )
  }
}
