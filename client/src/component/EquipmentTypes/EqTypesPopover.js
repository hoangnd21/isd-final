import React, { Component } from 'react';
import {
  // List
} from 'antd'
import axios from 'axios'

export default class EqTypesPopover extends Component {
  state = {
    equipmentTypesByID: []
  }
  componentDidMount() {
    const { generalType } = this.props
    axios.get(`http://localhost:9000/subTypes/genTypeId/${generalType.id}`)
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
    console.log(`${generalType.title}`, equipmentTypesByID)
    return (
      <>
        {generalType.title} has {equipmentTypesByID.length} subtypes.
      </>
    )
  }
}
